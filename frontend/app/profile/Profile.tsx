"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Edit3, 
  Save, 
  History, 
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Settings,
  Trash2,
  AlertTriangle,
  Shield,
  Key
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/navigation";
import { useRouter } from "next/navigation";

const Profile = ({ profile }: { profile?: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: profile?.full_name?.split(' ')[0] || "John",
    lastName: profile?.full_name?.split(' ').slice(1).join(' ') || "Doe",
    email: profile?.email || "john@example.com",
    phone: profile?.phone || "+1 (555) 123-4567",
    location: profile?.location || "San Francisco, CA",
    bio: profile?.bio || "Full-stack developer passionate about creating amazing user experiences."
  });
  const { toast } = useToast();
  const router = useRouter();

  const activityHistory = [
    { action: "Profile updated", time: "2 hours ago", type: "edit" },
    { action: "Password changed", time: "1 day ago", type: "security" },
    { action: "Account created", time: "30 days ago", type: "system" },
    { action: "Email verified", time: "30 days ago", type: "verification" },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Error",
          description: "No authentication token found.",
        });
        return;
      }

      const res = await fetch("http://localhost:5001/api/users/me", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        toast({
          title: "Account deleted successfully!",
          description: "Your account has been permanently deleted.",
        });
        
        // Redirect to home page
        router.push("/");
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete account");
      }
    } catch (err: any) {
      toast({
        title: "Error deleting account",
        description: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center mb-3">
            <Sparkles className="mr-3 h-8 w-8 text-blue-500 animate-spin-slow" />
            Profile
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your account and view your activity</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 animate-fade-in bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="history">Activity History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Picture */}
              <Card className="lg:col-span-1 bg-white dark:bg-slate-800 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-700">
                <CardHeader className="text-center">
                  <div className="relative mx-auto w-32 h-32 mb-4 group">
                    <Avatar className="w-32 h-32 mx-auto border-4 border-blue-200 dark:border-blue-800 shadow-lg group-hover:shadow-blue-400 transition-all duration-500">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="text-2xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">JD</AvatarFallback>
                    </Avatar>
                    <Button 
                      size="icon" 
                      className="absolute bottom-2 right-2 rounded-full shadow-md bg-blue-500 hover:bg-blue-600 text-white border-2 border-white dark:border-slate-800"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-xl text-slate-800 dark:text-slate-100">{profileData.firstName} {profileData.lastName}</CardTitle>
                  <CardDescription className="text-slate-500 dark:text-slate-400">Full-Stack Developer</CardDescription>
                </CardHeader>
              </Card>

              {/* Profile Form */}
              <div className="lg:col-span-2">
                <Card className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center text-slate-800 dark:text-slate-100">
                        <User className="mr-2 h-5 w-5" />
                        Personal Information
                      </CardTitle>
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        className="group relative overflow-hidden"
                      >
                        {isEditing ? (
                          <>
                            <Save className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <Edit3 className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                            Edit Profile
                          </>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-slate-700 dark:text-slate-200">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                          disabled={!isEditing}
                          className={`rounded-lg ${isEditing ? "border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-blue-700 dark:focus:border-blue-400 dark:focus:ring-blue-900" : "border-slate-200 dark:border-slate-700"} bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100`}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-slate-700 dark:text-slate-200">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                          disabled={!isEditing}
                          className={`rounded-lg ${isEditing ? "border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-blue-700 dark:focus:border-blue-400 dark:focus:ring-blue-900" : "border-slate-200 dark:border-slate-700"} bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center text-slate-700 dark:text-slate-200">
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        disabled={!isEditing}
                        className={`rounded-lg ${isEditing ? "border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-blue-700 dark:focus:border-blue-400 dark:focus:ring-blue-900" : "border-slate-200 dark:border-slate-700"} bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100`}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center text-slate-700 dark:text-slate-200">
                        <Phone className="mr-2 h-4 w-4" />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        disabled={!isEditing}
                        className={`rounded-lg ${isEditing ? "border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-blue-700 dark:focus:border-blue-400 dark:focus:ring-blue-900" : "border-slate-200 dark:border-slate-700"} bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100`}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="flex items-center text-slate-700 dark:text-slate-200">
                        <MapPin className="mr-2 h-4 w-4" />
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        disabled={!isEditing}
                        className={`rounded-lg ${isEditing ? "border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-blue-700 dark:focus:border-blue-400 dark:focus:ring-blue-900" : "border-slate-200 dark:border-slate-700"} bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-8">
            <Card className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-800 dark:text-slate-100">
                  <History className="mr-2 h-5 w-5" />
                  Activity History
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">Your recent account activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityHistory.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-300 group">
                      <div className="w-3 h-3 bg-blue-500 rounded-full group-hover:scale-150 group-hover:shadow-lg transition-all duration-300" />
                      <div className="flex-1">
                        <p className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.action}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {item.time}
                        </p>
                      </div>
                      <Badge variant={item.type === 'security' ? 'destructive' : 'default'} className="group-hover:shadow-lg transition-shadow">
                        {item.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Security Settings */}
              <Card className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-slate-800 dark:text-slate-100">
                    <Shield className="mr-2 h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription className="text-slate-500 dark:text-slate-400">Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Key className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="mr-2 h-4 w-4" />
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Privacy Settings
                  </Button>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl border border-red-200 dark:border-red-700">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-600 dark:text-red-400">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription className="text-slate-500 dark:text-slate-400">Irreversible and destructive actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!showDeleteConfirm ? (
                    <Button 
                      variant="destructive" 
                      className="w-full justify-start"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  ) : (
                    <div className="space-y-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Are you sure? This action cannot be undone. This will permanently delete your account and all associated data.
                      </p>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={handleDeleteAccount}
                        >
                          Yes, Delete Account
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setShowDeleteConfirm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;