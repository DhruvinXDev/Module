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
  Activity,
  Award,
  Star,
  Clock,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/navigation";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe", 
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Full-stack developer passionate about creating amazing user experiences."
  });
  const { toast } = useToast();

  const activityHistory = [
    { action: "Profile updated", time: "2 hours ago", type: "edit" },
    { action: "Password changed", time: "1 day ago", type: "security" },
    { action: "Account created", time: "30 days ago", type: "system" },
    { action: "Email verified", time: "30 days ago", type: "verification" },
  ];

  const achievements = [
    { title: "Early Adopter", description: "Joined in the first month", icon: Award },
    { title: "Profile Complete", description: "100% profile completion", icon: CheckCircle },
    { title: "Active User", description: "30+ days active", icon: Activity },
  ];

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved successfully.",
    });
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
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
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

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index} className="group cursor-pointer bg-white dark:bg-slate-800 shadow-xl rounded-2xl border border-slate-200 dark:border-slate-700">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 text-slate-800 dark:text-slate-100 transition-colors">{achievement.title}</CardTitle>
                      <CardDescription className="text-slate-500 dark:text-slate-400">{achievement.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;