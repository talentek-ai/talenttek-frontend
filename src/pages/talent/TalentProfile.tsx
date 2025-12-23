import React, { useState } from "react";
import TalentLayout from "@/components/layouts/TalentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Save, X, Edit2, Upload, Download, Briefcase, MapPin, Mail, Phone, Link as LinkIcon, Lock, CreditCard } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";

const TalentProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [skills, setSkills] = useState<string[]>([
    "React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
  ]);
  const [skillInput, setSkillInput] = useState("");
  const [hasCarteEntrepreneur, setHasCarteEntrepreneur] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    city: "New York",
    currentPosition: "Senior Software Developer",
    yearsOfExperience: "5-10",
    educationLevel: "bachelor",
    jobTypes: ["Full-time", "Remote"],
    workLocation: ["Remote", "Hybrid"],
    availabilityStatus: "actively-looking",
    shortBio: "Passionate software developer with 8 years of experience building scalable web applications. Specialized in React, TypeScript, and modern JavaScript frameworks.",
    linkedinUrl: "https://linkedin.com/in/johndoe",
    githubUrl: "https://github.com/johndoe",
    portfolioUrl: "https://johndoe.dev",
    hasCarteEntrepreneur: false,
  });

  const [editData, setEditData] = useState(profileData);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleEditChange = (field: string, value: string | string[] | boolean) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setEditData(prev => {
      const arr = prev[field as keyof typeof prev] as string[];
      if (checked) {
        return { ...prev, [field]: [...arr, value] };
      } else {
        return { ...prev, [field]: arr.filter(item => item !== value) };
      }
    });
  };

  const handleSave = async () => {
    setProfileData(editData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdatePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "New password must be at least 8 characters long",
      });
      return;
    }

    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully",
    });

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <TalentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Profile</h1>
            <p className="text-muted-foreground">Manage your professional profile and settings</p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
            className="gap-2"
          >
            <Edit2 className="w-4 h-4" />
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </Button>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={isEditing ? editData.firstName : profileData.firstName}
                      onChange={(e) => isEditing && handleEditChange('firstName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={isEditing ? editData.lastName : profileData.lastName}
                      onChange={(e) => isEditing && handleEditChange('lastName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editData.email : profileData.email}
                      onChange={(e) => isEditing && handleEditChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={isEditing ? editData.phoneNumber : profileData.phoneNumber}
                      onChange={(e) => isEditing && handleEditChange('phoneNumber', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    City
                  </Label>
                  <Input
                    id="city"
                    value={isEditing ? editData.city : profileData.city}
                    onChange={(e) => isEditing && handleEditChange('city', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                {/* Entrepreneur Card Section */}
                <Card className="border-2 border-primary bg-primary/5 p-6 mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl text-primary">
                      <CreditCard className="w-8 h-8 text-primary" />
                      Entrepreneur Card (Carte Entrepreneur)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={isEditing ? editData.hasCarteEntrepreneur : profileData.hasCarteEntrepreneur}
                        onCheckedChange={(checked) => isEditing && handleEditChange('hasCarteEntrepreneur', checked as boolean)}
                        disabled={!isEditing}
                        className="mt-1 scale-125"
                      />
                      <span className="text-lg text-slate-700 dark:text-slate-300">
                        I have an Entrepreneur Card (Carte Entrepreneur)
                      </span>
                    </label>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Information Tab */}
          <TabsContent value="professional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Professional Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPosition">Current Position</Label>
                    <Input
                      id="currentPosition"
                      value={isEditing ? editData.currentPosition : profileData.currentPosition}
                      onChange={(e) => isEditing && handleEditChange('currentPosition', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                    <Select
                      value={isEditing ? editData.yearsOfExperience : profileData.yearsOfExperience}
                      onOpenChange={() => {}}
                      disabled={!isEditing}
                    >
                      <SelectTrigger disabled={!isEditing}>
                        <SelectValue />
                      </SelectTrigger>
                      {isEditing && (
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      )}
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="educationLevel">Education Level</Label>
                  <Select
                    value={isEditing ? editData.educationLevel : profileData.educationLevel}
                    onOpenChange={() => {}}
                    disabled={!isEditing}
                  >
                    <SelectTrigger disabled={!isEditing}>
                      <SelectValue />
                    </SelectTrigger>
                    {isEditing && (
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="master">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    )}
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortBio">Professional Bio</Label>
                  <Textarea
                    id="shortBio"
                    value={isEditing ? editData.shortBio : profileData.shortBio}
                    onChange={(e) => isEditing && handleEditChange('shortBio', e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    maxLength={500}
                  />
                  {isEditing && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {editData.shortBio.length}/500
                    </p>
                  )}
                </div>

                {/* Skills Section */}
                <div className="space-y-3">
                  <Label>Skills</Label>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={handleAddSkill}
                        placeholder="Type a skill and press Enter"
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Add skills that best represent your expertise
                      </p>
                    </div>
                  ) : null}
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-1">
                          <Badge variant="secondary" className="gap-1">
                            {skill}
                            {isEditing && (
                              <button
                                onClick={() => handleRemoveSkill(skill)}
                                className="hover:text-red-500"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Job Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Preferred Job Types</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Full-time", "Part-time", "Contract", "Freelance"].map((type) => (
                      <label
                        key={type}
                        className={`flex items-center gap-2 cursor-pointer p-3 rounded-lg border ${
                          isEditing
                            ? "hover:bg-slate-50 dark:hover:bg-slate-700"
                            : "pointer-events-none"
                        }`}
                      >
                        <Checkbox
                          checked={
                            isEditing
                              ? editData.jobTypes.includes(type)
                              : profileData.jobTypes.includes(type)
                          }
                          onCheckedChange={(checked) =>
                            isEditing && handleCheckboxChange('jobTypes', type, checked as boolean)
                          }
                          disabled={!isEditing}
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Work Location Preferences</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Remote", "Hybrid", "On-site"].map((location) => (
                      <label
                        key={location}
                        className={`flex items-center gap-2 cursor-pointer p-3 rounded-lg border ${
                          isEditing
                            ? "hover:bg-slate-50 dark:hover:bg-slate-700"
                            : "pointer-events-none"
                        }`}
                      >
                        <Checkbox
                          checked={
                            isEditing
                              ? editData.workLocation.includes(location)
                              : profileData.workLocation.includes(location)
                          }
                          onCheckedChange={(checked) =>
                            isEditing && handleCheckboxChange('workLocation', location, checked as boolean)
                          }
                          disabled={!isEditing}
                        />
                        <span className="text-sm">{location}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Availability Status</Label>
                  <Select
                    value={isEditing ? editData.availabilityStatus : profileData.availabilityStatus}
                    onOpenChange={() => {}}
                    disabled={!isEditing}
                  >
                    <SelectTrigger disabled={!isEditing}>
                      <SelectValue />
                    </SelectTrigger>
                    {isEditing && (
                      <SelectContent>
                        <SelectItem value="actively-looking">Actively looking for a job</SelectItem>
                        <SelectItem value="open-to-opportunities">Open to opportunities</SelectItem>
                        <SelectItem value="passively-considering">Passively considering offers</SelectItem>
                        <SelectItem value="not-looking">Not looking (but stay in database)</SelectItem>
                      </SelectContent>
                    )}
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Links Tab */}
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="w-5 h-5 text-primary" />
                  Professional Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    value={isEditing ? editData.linkedinUrl : profileData.linkedinUrl}
                    onChange={(e) => isEditing && handleEditChange('linkedinUrl', e.target.value)}
                    disabled={!isEditing}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    type="url"
                    value={isEditing ? editData.githubUrl : profileData.githubUrl}
                    onChange={(e) => isEditing && handleEditChange('githubUrl', e.target.value)}
                    disabled={!isEditing}
                    placeholder="https://github.com/yourusername"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                  <Input
                    id="portfolioUrl"
                    type="url"
                    value={isEditing ? editData.portfolioUrl : profileData.portfolioUrl}
                    onChange={(e) => isEditing && handleEditChange('portfolioUrl', e.target.value)}
                    disabled={!isEditing}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  CV/Resume
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setCvFile(e.target.files[0]);
                          toast({
                            title: "File selected",
                            description: `${e.target.files[0].name} is ready to upload`,
                          });
                        }
                      }}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label htmlFor="cv-upload" className="cursor-pointer block">
                      {cvFile ? (
                        <div className="space-y-2">
                          <Upload className="w-12 h-12 text-green-500 mx-auto" />
                          <p className="font-medium text-slate-900 dark:text-white">{cvFile.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Click to change</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-12 h-12 text-slate-400 mx-auto" />
                          <p className="font-medium text-slate-900 dark:text-white">
                            Drag and drop your CV
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            or click to select
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            PDF, DOC, or DOCX (max 5MB)
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Download className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">resume.pdf</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Last updated: Nov 15, 2024
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Password Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <PasswordInput
                        id="currentPassword"
                        placeholder="Enter your current password"
                        value={passwordData.currentPassword}
                        onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <PasswordInput
                        id="newPassword"
                        placeholder="Enter new password"
                        value={passwordData.newPassword}
                        onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Must be at least 8 characters long
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <PasswordInput
                        id="confirmPassword"
                        placeholder="Confirm new password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      />
                    </div>

                    <Button
                      onClick={handleUpdatePassword}
                      className="gap-2 bg-gradient-primary hover:opacity-90 w-full"
                    >
                      <Lock className="w-4 h-4" />
                      Update Password
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Two-Factor Authentication
                  </h3>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Active Sessions
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          Current Session
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Chrome • New York • Active now
                        </p>
                      </div>
                      <Badge variant="secondary">Current</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save/Cancel Buttons */}
        {isEditing && (
          <div className="flex gap-3 sticky bottom-4">
            <Button onClick={handleCancel} variant="outline" className="gap-2">
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2 bg-gradient-primary hover:opacity-90">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </TalentLayout>
  );
};

export default TalentProfile;
