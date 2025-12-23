import { useState } from "react";
import OwnerLayout from "@/components/layouts/OwnerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { User, Mail, Phone, MapPin, Building, Upload, Save, Lock, CheckCircle } from "lucide-react";

export default function OwnerSettings() {
  const [profileImage, setProfileImage] = useState<string>("");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: "Platform Owner",
    email: "owner@talentek.com",
    phone: "+213 555 123 456",
    location: "Algiers, Algeria",
    company: "TalenTek",
    bio: "Platform owner and administrator of TalenTek - Empowering the future workforce.",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaveDialogOpen(true);
  }

  function handleSavePassword(e: React.FormEvent) {
    e.preventDefault();
    // Add password update logic here
    alert("Password updated successfully!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  }

  return (
    <OwnerLayout>
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your profile and account settings</p>
        </div>

        {/* Profile Settings */}
        <Card className="border-orange-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Profile Information</CardTitle>
            <CardDescription>Update your personal information and profile photo</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileImage} />
                  <AvatarFallback className="bg-gradient-primary text-white text-2xl font-bold">
                    {form.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="profile-photo" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg border-2 border-orange-200 hover:bg-orange-100 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span className="font-medium">Upload Photo</span>
                    </div>
                  </Label>
                  <Input
                    id="profile-photo"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF (max. 2MB)</p>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <User className="w-4 h-4 text-orange-500" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleFormChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Mail className="w-4 h-4 text-orange-500" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Phone className="w-4 h-4 text-orange-500" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleFormChange}
                    placeholder="+213 555 000 000"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleFormChange}
                    placeholder="City, Country"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="company" className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Building className="w-4 h-4 text-orange-500" />
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleFormChange}
                    placeholder="Company name"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="bio" className="flex items-center gap-2 text-sm font-semibold mb-2">
                    Bio
                  </Label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={form.bio}
                    onChange={handleFormChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-gradient-primary text-white flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-orange-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Security</CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSavePassword} className="space-y-6">
              <div>
                <Label htmlFor="currentPassword" className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <Lock className="w-4 h-4 text-orange-500" />
                  Current Password
                </Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="newPassword" className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Lock className="w-4 h-4 text-orange-500" />
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Lock className="w-4 h-4 text-orange-500" />
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-gradient-primary text-white flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Update Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Save Success Dialog */}
        <AlertDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <AlertDialogTitle className="text-xl">Profile Updated!</AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-base">
                Your profile information has been successfully updated.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => setSaveDialogOpen(false)}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Done
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </OwnerLayout>
  );
}
