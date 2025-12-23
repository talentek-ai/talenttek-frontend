import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Briefcase, UserCircle } from "lucide-react";

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              Get Started — Choose Your <span className="text-orange-custom">Account Type</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Select how you'd like to use TalenTek
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Talent Card */}
            <Card className="shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <UserCircle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Sign Up as Talent</CardTitle>
                <CardDescription className="text-base">
                  Looking for opportunities? Create your talent profile and connect with leading companies.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 mb-6">
                  {[
                    "Build your professional profile",
                    "Get matched with dream jobs",
                    "Access global opportunities",
                    "Apply with one click",
                    "Track your applications",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup/talent" className="w-full">
                  <Button className="w-full bg-gradient-primary hover:opacity-90" size="lg">
                    Create Talent Account
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Employer Card */}
            <Card className="shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Sign Up as Employer</CardTitle>
                <CardDescription className="text-base">
                  Hiring top talent? Create your employer account and access our global talent pool.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 mb-6">
                  {[
                    "Post unlimited job listings",
                    "AI-powered candidate matching",
                    "Schedule and manage interviews",
                    "Access verified talent profiles",
                    "Analytics and insights dashboard",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup/employer" className="w-full">
                  <Button className="w-full bg-gradient-primary hover:opacity-90" size="lg">
                    Create Employer Account
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
