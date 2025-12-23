import { useState } from "react";
import EmployerAdminLayout from "@/components/layouts/EmployerAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Lock, Mail, User, Save, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EmployerAdminSettings() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john@company.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Profile updated successfully.",
      });
      setLoading(false);
    }, 1000);
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Password changed successfully.",
      });
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setLoading(false);
    }, 1000);
  };

  return (
    <EmployerAdminLayout>
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
                <User className="w-6 h-6 text-primary" />
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
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-semibold text-gray-900">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="border-gray-300"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="bg-gradient-primary text-white gap-2"
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
                <Lock className="w-6 h-6 text-primary" />
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
                  value={formData.currentPassword}
                  onChange={(e) => handleChange("currentPassword", e.target.value)}
                  placeholder="Enter your current password"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-semibold text-gray-900">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => handleChange("newPassword", e.target.value)}
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
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  placeholder="Confirm new password"
                  className="border-gray-300"
                />
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
                  className="bg-gradient-primary text-white gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {loading ? "Updating..." : "Change Password"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </EmployerAdminLayout>
  );
}
