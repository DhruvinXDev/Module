const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const signupValidation = [
  body('full_name').trim().isLength({ min: 2, max: 50 }).withMessage('Full name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', signupValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { full_name, email, password } = req.body;

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        error: 'User with this email already exists' 
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const [result] = await pool.execute(
      'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)',
      [full_name, email, hashedPassword]
    );

    // Get the created user (without password)
    const [newUser] = await pool.execute(
      'SELECT id, full_name, email, role, is_verified, created_at FROM users WHERE id = ?',
      [result.insertId]
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser[0].id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Create welcome notification
    try {
      await pool.execute(
        'INSERT INTO notifications (user_id, type, title, message, priority) VALUES (?, ?, ?, ?, ?)',
        [newUser[0].id, 'system', 'Welcome to NexaUI!', `Welcome ${newUser[0].full_name}! Your account has been created successfully.`, 'high']
      );
      
      // Add setup notification
      await pool.execute(
        'INSERT INTO notifications (user_id, type, title, message, priority) VALUES (?, ?, ?, ?, ?)',
        [newUser[0].id, 'promotion', 'Complete Your Profile', `Welcome! Complete your profile to get the most out of NexaUI. Add your bio, location, and profile picture.`, 'medium']
      );
      
      // Add security notification
      await pool.execute(
        'INSERT INTO notifications (user_id, type, title, message, priority) VALUES (?, ?, ?, ?, ?)',
        [newUser[0].id, 'system', 'Security Setup', `For better security, consider enabling two-factor authentication in your account settings.`, 'medium']
      );
    } catch (notificationError) {
      console.error('Failed to create welcome notification:', notificationError);
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser[0],
      token
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const [users] = await pool.execute(
      'SELECT id, full_name, email, password, role, is_verified FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ 
        error: 'Invalid credentials' 
      });
    }

    const user = users[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Create login notification
    try {
      await pool.execute(
        'INSERT INTO notifications (user_id, type, title, message, priority) VALUES (?, ?, ?, ?, ?)',
        [user.id, 'system', 'Login Successful', `Welcome back ${user.full_name}! You have successfully logged in.`, 'medium']
      );
      
      // Add activity notification
      await pool.execute(
        'INSERT INTO notifications (user_id, type, title, message, priority) VALUES (?, ?, ?, ?, ?)',
        [user.id, 'system', 'Account Activity', `Your account was accessed from a new session. If this wasn't you, please review your security settings.`, 'low']
      );
    } catch (notificationError) {
      console.error('Failed to create login notification:', notificationError);
    }

    // Remove password from response
    delete user.password;

    res.json({
      message: 'Login successful',
      user,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (invalidate token)
// @access  Private
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // In a real application, you might want to blacklist the token
    // For now, we'll just return a success message
    // The client should remove the token from storage
    
    res.json({ 
      message: 'Logged out successfully' 
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user info
// @access  Private
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.execute(
      'SELECT id, full_name, email, role, is_verified, avatar, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    res.json({
      user: users[0]
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// @route   POST /api/auth/refresh
// @desc    Refresh JWT token
// @access  Private
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    // Generate new token
    const token = jwt.sign(
      { userId: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Token refreshed successfully',
      token
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

module.exports = router; 