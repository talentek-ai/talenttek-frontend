import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import sha256 from 'crypto-js/sha256';
import { Briefcase, Globe, User, CheckCircle } from "lucide-react";

// Helper to upload file to Supabase Storage
async function uploadProfileImage(file: File, userId: string): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}.${fileExt}`;
  const { data, error } = await supabase.storage.from('profile').upload(filePath, file, {
    upsert: true,
  });
  if (error) return null;
  // Get public URL
  const { data: publicUrlData } = supabase.storage.from('profile').getPublicUrl(filePath);
  return publicUrlData?.publicUrl || null;
}

const EmployerSignup = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    companyName: "",
    tagline: "",
    description: "",
    industry: "",
    website: "",
    companySize: "",
    yearFounded: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    linkedinUrl: "",
    facebookUrl: "",
    plan: "",
    subscriptionType: "",
    subscriptionStartDate: "",
    subscriptionEndDate: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // 1. Hash password
    const password_hash = sha256(formData.password).toString();
    // 2. Check if email exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', formData.email)
      .maybeSingle();
    if (existingUser) {
      toast({ title: 'Signup failed', description: 'Email already exists.' });
      return;
    }
    // 3. Insert into users table (let DB generate id)
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          email: formData.email,
          password_hash,
          user_role: 'employer',
          is_active: true,
          email_verified: false,
          profile_completed: true,
          first_name: formData.firstName,
          last_name: formData.lastName,
        }
      ])
      .select();
    if (userError || !userData || !userData[0]) {
      toast({ title: 'Signup failed', description: userError?.message || 'Could not create user.' });
      return;
    }
    const user_id = userData[0].id;
    // 4. Upload logo if present
    let logo_url = null;
    if (logoFile) {
      logo_url = await uploadProfileImage(logoFile, user_id);
      if (!logo_url) {
        toast({ title: 'Signup failed', description: 'Failed to upload logo.' });
        return;
      }
    }
    // 5. Insert into employers table
    const { error: empError } = await supabase
      .from('employers')
      .insert([
        {
          user_id,
          company_name: formData.companyName,
          tagline: formData.tagline,
          description: formData.description,
          industry: formData.industry,
          website: formData.website,
          company_size: formData.companySize,
          year_founded: formData.yearFounded,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          zip_code: formData.zipCode,
          linkedin_url: formData.linkedinUrl,
          facebook_url: formData.facebookUrl,
          plan: formData.plan || 'Free',
          subscription_type: formData.subscriptionType || 'Free',
          subscription_start_date: formData.subscriptionStartDate || null,
          subscription_end_date: formData.subscriptionEndDate || null,
          logo_url,
          rep_first_name: formData.firstName,
          rep_last_name: formData.lastName,
        }
      ]);
    if (empError) {
      toast({ title: 'Signup failed', description: empError.message });
      return;
    }
    login({
      id: user_id,
      email: formData.email,
      name: formData.companyName,
      role: 'employer'
    });
    toast({
      title: "Company account created!",
      description: "Welcome to TalenTek",
    });
    navigate('/employer/overview');
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[1fr,300px] gap-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl">
                {step === 1 && "Account Setup"}
                {step === 2 && "Company Details"}
                {step === 3 && "Company Contact"}
                {step === 4 && "Plan & Confirmation"}
              </CardTitle>
              <CardDescription>Step {step} of 4</CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Company Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput 
                      id="password" 
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <PasswordInput 
                      id="confirmPassword" 
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full bg-gradient-primary hover:opacity-90">
                    Continue
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-orange-600" />
                      Company Name
                    </Label>
                    <Input 
                      id="companyName" 
                      value={formData.companyName}
                      onChange={(e) => handleChange('companyName', e.target.value)}
                      placeholder="Enter company name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tagline">Company Tagline</Label>
                    <Input 
                      id="tagline" 
                      value={formData.tagline}
                      onChange={(e) => handleChange('tagline', e.target.value)}
                      placeholder="e.g., Scaling Startups with World-Class Talent"
                      maxLength={120}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Tell us about your company, mission, and what you do..."
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={5}
                      maxLength={1000}
                    />
                    <p className="text-xs text-muted-foreground">{formData.description.length}/1000</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select onValueChange={(value) => handleChange('industry', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subscriptionType">Subscription Type</Label>
                    <Select onValueChange={(value) => handleChange('subscriptionType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subscription" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Free">Free</SelectItem>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Pro">Pro</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="subscriptionStartDate">Subscription Start Date</Label>
                      <Input
                        id="subscriptionStartDate"
                        type="date"
                        value={formData.subscriptionStartDate}
                        onChange={(e) => handleChange('subscriptionStartDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subscriptionEndDate">Subscription End Date</Label>
                      <Input
                        id="subscriptionEndDate"
                        type="date"
                        value={formData.subscriptionEndDate}
                        onChange={(e) => handleChange('subscriptionEndDate', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={() => setStep(1)} variant="outline" className="w-full">
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="w-full bg-gradient-primary hover:opacity-90">
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-orange-600" />
                      Website
                    </Label>
                    <Input 
                      id="website" 
                      type="url"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select onValueChange={(value) => handleChange('companySize', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearFounded">Year Founded</Label>
                      <Input 
                        id="yearFounded" 
                        type="number"
                        placeholder="2020"
                        value={formData.yearFounded}
                        onChange={(e) => handleChange('yearFounded', e.target.value)}
                        min="1900"
                        max={new Date().getFullYear()}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input 
                      id="address" 
                      placeholder="123 Main Street, Suite 100"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        placeholder="New York"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input 
                        id="country" 
                        placeholder="United States"
                        value={formData.country}
                        onChange={(e) => handleChange('country', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input 
                        id="zipCode" 
                        placeholder="10018"
                        value={formData.zipCode}
                        onChange={(e) => handleChange('zipCode', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input 
                      id="linkedinUrl" 
                      type="url"
                      placeholder="https://linkedin.com/company/yourcompany"
                      value={formData.linkedinUrl}
                      onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebookUrl">Facebook URL</Label>
                    <Input 
                      id="facebookUrl" 
                      type="url"
                      placeholder="https://facebook.com/yourcompany"
                      value={formData.facebookUrl}
                      onChange={(e) => handleChange('facebookUrl', e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={() => setStep(2)} variant="outline" className="w-full">
                      Back
                    </Button>
                    <Button onClick={() => setStep(4)} className="w-full bg-gradient-primary hover:opacity-90">
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Choose Plan</Label>
                    <div className="grid gap-3">
                      {['Free', 'Pro', 'Enterprise'].map((plan) => (
                        <div
                          key={plan}
                          onClick={() => handleChange('plan', plan)}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.plan === plan 
                              ? 'border-primary bg-primary/5 ring-2 ring-primary' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {formData.plan === plan && <CheckCircle className="w-5 h-5 text-primary" />}
                            <div className="font-semibold">{plan}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo">Upload Company Logo</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          if (e.target.files && e.target.files[0]) {
                            setLogoFile(e.target.files[0]);
                          } else {
                            setLogoFile(null);
                          }
                        }}
                      />
                      <label htmlFor="logo" className="cursor-pointer block">
                        {logoFile ? (
                          <div className="text-sm">
                            <p className="font-medium text-primary">{logoFile.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">Click to change</p>
                          </div>
                        ) : (
                          <div className="text-sm">
                            <p className="font-medium">Drag and drop or click to upload</p>
                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG or GIF (max 5MB)</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      ✓ You're almost done! Review your information and create your employer account.
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button onClick={() => setStep(3)} variant="outline" className="w-full">
                      Back
                    </Button>
                    <Button onClick={handleSubmit} className="w-full bg-gradient-primary hover:opacity-90">
                      Create Employer Account
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="bg-card rounded-lg p-6 shadow-card">
              <h3 className="font-semibold mb-3">Hiring top talent?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create your employer account and access our global talent pool.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Post unlimited job listings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>AI-powered candidate matching</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Manage interviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Access verified profiles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  <span>Analytics dashboard</span>
                </li>
              </ul>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerSignup;
