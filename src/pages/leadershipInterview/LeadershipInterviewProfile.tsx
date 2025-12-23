import LeadershipInterviewLayout from "@/components/layouts/leadershipInterview/LeadershipInterviewLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, Building, Briefcase, Save, Lock, Eye, EyeOff } from "lucide-react";

const LeadershipInterviewProfile = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@talentek.com",
    phone: "+1 (555) 987-6543",
    company: "TalenTek",
    role: "ceo",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Profile updated successfully.",
      });
      setLoading(false);
    }, 1000);
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Password changed successfully.",
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <LeadershipInterviewLayout>
      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account and security settings</p>
        </div>

        <div className="space-y-6">
          {/* Account Settings */}
          <Card className="shadow-lg border-gray-200">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b">
              <CardTitle className="flex items-center gap-2 text-xl">
                <User className="w-6 h-6 text-orange-500" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-semibold text-gray-900">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => handleProfileChange("firstName", e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-semibold text-gray-900">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => handleProfileChange("lastName", e.target.value)}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleProfileChange("phone", e.target.value)}
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Building className="w-4 h-4 text-orange-500" />
                  Company
                </Label>
                <Input
                  id="company"
                  value={profileData.company}
                  disabled
                  className="border-gray-300 bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-orange-500" />
                  Leadership Role
                </Label>
                <Select value={profileData.role} onValueChange={(value) => handleProfileChange("role", value)}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ceo">CEO</SelectItem>
                    <SelectItem value="cto">CTO</SelectItem>
                    <SelectItem value="cfo">CFO</SelectItem>
                    <SelectItem value="vp_engineering">VP of Engineering</SelectItem>
                    <SelectItem value="vp_product">VP of Product</SelectItem>
                    <SelectItem value="director">Director</SelectItem>
                    <SelectItem value="senior_manager">Senior Manager</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
                >
                  <Save className="w-4 h-4" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-6" />

          {/* Change Password */}
          <Card className="shadow-lg border-gray-200">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Lock className="w-6 h-6 text-orange-500" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-semibold text-gray-900">
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                  placeholder="Enter your current password"
                  className="border-gray-300"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm font-semibold text-gray-900">
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                      placeholder="Enter new password"
                      className="border-gray-300 pr-10"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-900">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                    placeholder="Confirm new password"
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  ℹ️ Password must be at least 6 characters long and contain a mix of uppercase, lowercase, and numbers.
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleChangePassword}
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {loading ? "Updating..." : "Change Password"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LeadershipInterviewLayout>
  );
};

export default LeadershipInterviewProfile;
