const express = require('express');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const updateProfileValidation = [
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be less than 500 characters'),
  body('location').optional().trim().isLength({ max: 255 }).withMessage('Location must be less than 255 characters'),
  body('website').optional().isURL().withMessage('Website must be a valid URL'),
  body('social_links').optional().isObject().withMessage('Social links must be an object')
];

// @route   GET /api/profile
// @desc    Get user profile
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user profile with user info
    const [profiles] = await pool.execute(`
      SELECT 
        up.id,
        up.user_id,
        up.bio,
        up.location,
        up.website,
        up.social_links,
        up.preferences,
        up.created_at,
        up.updated_at,
        u.full_name,
        u.email,
        u.avatar,
        u.role,
        u.is_verified
      FROM user_profiles up
      RIGHT JOIN users u ON up.user_id = u.id
      WHERE u.id = ?
    `, [userId]);

    if (profiles.length === 0) {
      return res.status(404).json({ 
        error: 'Profile not found' 
      });
    }

    const profile = profiles[0];

    // If no profile exists, create one
    if (!profile.id) {
      const [result] = await pool.execute(
        'INSERT INTO user_profiles (user_id) VALUES (?)',
        [userId]
      );

      // Get the created profile
      const [newProfiles] = await pool.execute(`
        SELECT 
          up.id,
          up.user_id,
          up.bio,
          up.location,
          up.website,
          up.social_links,
          up.preferences,
          up.created_at,
          up.updated_at,
          u.full_name,
          u.email,
          u.avatar,
          u.role,
          u.is_verified
        FROM user_profiles up
        RIGHT JOIN users u ON up.user_id = u.id
        WHERE u.id = ?
      `, [userId]);

      return res.json({
        profile: newProfiles[0]
      });
    }

    res.json({
      profile
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// @route   PUT /api/profile
// @desc    Update user profile
// @access  Private
router.put('/', authenticateToken, updateProfileValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const userId = req.user.id;
    const { bio, location, website, social_links, preferences } = req.body;

    // Check if profile exists
    const [existingProfiles] = await pool.execute(
      'SELECT id FROM user_profiles WHERE user_id = ?',
      [userId]
    );

    if (existingProfiles.length === 0) {
      // Create new profile
      const [result] = await pool.execute(
        'INSERT INTO user_profiles (user_id, bio, location, website, social_links, preferences) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, bio || null, location || null, website || null, 
         social_links ? JSON.stringify(social_links) : null,
         preferences ? JSON.stringify(preferences) : null]
      );
    } else {
      // Update existing profile
      const updateFields = [];
      const updateValues = [];

      if (bio !== undefined) {
        updateFields.push('bio = ?');
        updateValues.push(bio);
      }

      if (location !== undefined) {
        updateFields.push('location = ?');
        updateValues.push(location);
      }

      if (website !== undefined) {
        updateFields.push('website = ?');
        updateValues.push(website);
      }

      if (social_links !== undefined) {
        updateFields.push('social_links = ?');
        updateValues.push(JSON.stringify(social_links));
      }

      if (preferences !== undefined) {
        updateFields.push('preferences = ?');
        updateValues.push(JSON.stringify(preferences));
      }

      if (updateFields.length > 0) {
        updateFields.push('updated_at = CURRENT_TIMESTAMP');
        updateValues.push(userId);

        await pool.execute(
          `UPDATE user_profiles SET ${updateFields.join(', ')} WHERE user_id = ?`,
          updateValues
        );
      }
    }

    // Get updated profile
    const [profiles] = await pool.execute(`
      SELECT 
        up.id,
        up.user_id,
        up.bio,
        up.location,
        up.website,
        up.social_links,
        up.preferences,
        up.created_at,
        up.updated_at,
        u.full_name,
        u.email,
        u.avatar,
        u.role,
        u.is_verified
      FROM user_profiles up
      RIGHT JOIN users u ON up.user_id = u.id
      WHERE u.id = ?
    `, [userId]);

    res.json({
      message: 'Profile updated successfully',
      profile: profiles[0]
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// @route   GET /api/profile/:userId
// @desc    Get public profile by user ID
// @access  Public
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get public profile info
    const [profiles] = await pool.execute(`
      SELECT 
        up.bio,
        up.location,
        up.website,
        up.social_links,
        up.created_at,
        u.full_name,
        u.avatar,
        u.created_at as user_created_at
      FROM user_profiles up
      RIGHT JOIN users u ON up.user_id = u.id
      WHERE u.id = ?
    `, [userId]);

    if (profiles.length === 0) {
      return res.status(404).json({ 
        error: 'Profile not found' 
      });
    }

    res.json({
      profile: profiles[0]
    });

  } catch (error) {
    console.error('Get public profile error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// @route   DELETE /api/profile
// @desc    Delete user profile (reset to default)
// @access  Private
router.delete('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Reset profile to default values
    await pool.execute(
      'UPDATE user_profiles SET bio = NULL, location = NULL, website = NULL, social_links = NULL, preferences = NULL, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?',
      [userId]
    );

    res.json({
      message: 'Profile reset successfully'
    });

  } catch (error) {
    console.error('Delete profile error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

module.exports = router; 