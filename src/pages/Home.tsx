import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { Briefcase, Users, Zap, Globe, Shield, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-globe.jpg";

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description: "Smart algorithms connect the right talent with the right opportunities instantly.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access talent from around the world or find opportunities across borders.",
    },
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "Trust and transparency with verified employers and talent profiles.",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Tools and resources to help talents and companies grow together.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero -z-10" />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Empowering the <span className="text-orange-custom">future workforce</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Connecting top global talent with leading companies through AI-driven matching and seamless collaboration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-gradient-primary hover:opacity-90">
                  <Link to="/get-started" className="text-white">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/pricing">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Global talent network visualization"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* For Employers & Talents Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card p-8 rounded-2xl shadow-card hover:shadow-glow transition-all duration-300">
              <Briefcase className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold mb-4">For Employers</h2>
              <p className="text-muted-foreground mb-6">
                Hire global talent with confidence. Access our AI-powered platform to find, interview, and onboard the best candidates efficiently.
              </p>
              <Button asChild variant="outline">
                <Link to="/for-employers">Learn More</Link>
              </Button>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-card hover:shadow-glow transition-all duration-300">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold mb-4">For Talents</h2>
              <p className="text-muted-foreground mb-6">
                Find your dream job, globally. Get matched with verified employers, showcase your skills, and advance your career.
              </p>
              <Button asChild variant="outline">
                <Link to="/for-talents">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Sign Up", description: "Create your account as a talent or employer" },
              { step: "2", title: "Get Matched", description: "Our AI connects you with perfect opportunities" },
              { step: "3", title: "Succeed Together", description: "Build lasting professional relationships" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose TalenTek</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Platform features that make talent matching seamless
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-primary rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of talents and employers already on TalenTek
            </p>
            <Button size="lg" variant="secondary" asChild className="text-white">
              <Link to="/get-started">Create Your Account</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
