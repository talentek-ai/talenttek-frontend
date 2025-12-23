import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { Rocket, Star, Shield, TrendingUp, FileText, Globe2 } from "lucide-react";

const ForTalents = () => {
  const features = [
    {
      icon: Star,
      title: "Smart Matching",
      description: "Get matched with jobs that truly fit your skills and career goals.",
    },
    {
      icon: Shield,
      title: "Verified Employers",
      description: "Apply only to verified companies with transparent hiring processes.",
    },
    {
      icon: TrendingUp,
      title: "Career Insights",
      description: "Access data-driven insights to advance your career strategically.",
    },
    {
      icon: FileText,
      title: "AI Resume Optimizer",
      description: "Optimize your profile and resume with AI-powered suggestions.",
    },
    {
      icon: Globe2,
      title: "Global Opportunities",
      description: "Access remote and international job opportunities worldwide.",
    },
    {
      icon: Rocket,
      title: "Fast Applications",
      description: "Apply to multiple jobs quickly with your saved profile.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your Dream Job, <span className="text-orange-custom">Globally</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get matched with verified employers, showcase your unique skills, and land opportunities that accelerate your career growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-primary hover:opacity-90">
                <Link to="/get-started" className="text-white">Create Talent Profile</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Talents Choose Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tools and features designed to help you succeed
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Your Journey to Success</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to your dream career
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Create Profile", description: "Build a compelling profile highlighting your skills" },
              { step: "2", title: "Get Matched", description: "Our AI finds perfect job opportunities for you" },
              { step: "3", title: "Apply & Interview", description: "Connect with employers and showcase your talent" },
              { step: "4", title: "Start Your Dream Job", description: "Land the role and advance your career" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Stand Out From the Crowd</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get noticed by top employers with our talent platform
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Skill-Based Ranking",
                description: "Your experience and skills determine your matches, not just keywords.",
                stat: "95% Match Rate",
              },
              {
                title: "Direct Communication",
                description: "Message employers directly and build relationships before applying.",
                stat: "50% Faster Response",
              },
              {
                title: "Career Resources",
                description: "Access interview tips, salary guides, and career development content.",
                stat: "1000+ Resources",
              },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-card p-8 rounded-2xl shadow-card text-center">
                <div className="text-3xl font-bold text-primary mb-2">{benefit.stat}</div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from talents who found their dream jobs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                role: "Software Engineer",
                quote: "Found my dream remote job in 2 weeks. The matching was incredibly accurate!",
              },
              {
                name: "James L.",
                role: "Product Designer",
                quote: "TalenTek helped me transition from freelance to a full-time role at a top company.",
              },
              {
                name: "Maria K.",
                role: "Data Scientist",
                quote: "The AI matching really works. Got multiple interviews with companies I actually wanted to work for.",
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-card p-6 rounded-xl shadow-card">
                <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-primary rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Launch Your Career?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who found their dream jobs on TalenTek
            </p>
            <Button size="lg" variant="secondary" asChild className="text-white">
              <Link to="/get-started">Create Your Profile</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForTalents;
