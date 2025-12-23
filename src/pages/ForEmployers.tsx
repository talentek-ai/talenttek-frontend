import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { Briefcase, Target, Calendar, BarChart, Users2, Sparkles } from "lucide-react";

const ForEmployers = () => {
  const features = [
    {
      icon: Target,
      title: "AI Talent Matching",
      description: "Advanced algorithms find candidates that perfectly match your requirements.",
    },
    {
      icon: Calendar,
      title: "Interview Scheduling",
      description: "Streamlined scheduling tools that work across time zones.",
    },
    {
      icon: BarChart,
      title: "Analytics Dashboard",
      description: "Track hiring metrics and optimize your recruitment process.",
    },
    {
      icon: Users2,
      title: "Talent Pool Access",
      description: "Browse and connect with millions of verified professionals worldwide.",
    },
    {
      icon: Sparkles,
      title: "Smart Job Posting",
      description: "AI-optimized job descriptions that attract top candidates.",
    },
    {
      icon: Briefcase,
      title: "Onboarding Tools",
      description: "Seamless onboarding experience for new hires.",
    },
  ];

  const successStories = [
    { company: "TechCorp", hired: 50, time: "40% faster" },
    { company: "StartupXYZ", hired: 25, time: "30 days" },
    { company: "GlobalInc", hired: 100, time: "50% cost reduction" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Hire Global Talent with <span className="text-orange-custom">Confidence</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Access AI-powered tools to find, interview, and onboard the best candidates from around the world, faster than ever.
            </p>
            <Button size="lg" asChild className="bg-gradient-primary hover:opacity-90">
              <Link to="/get-started" className="text-white">Create Employer Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Powerful Hiring Tools</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build your dream team
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
            <h2 className="text-4xl font-bold mb-4">How Matching Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform makes hiring efficient and accurate
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "1", title: "Post Your Job", description: "Create detailed job postings with our AI assistant" },
              { step: "2", title: "AI Matching", description: "Our system finds the best candidates automatically" },
              { step: "3", title: "Review & Interview", description: "Schedule interviews with top-matched talent" },
              { step: "4", title: "Hire & Onboard", description: "Seamlessly onboard your new team member" },
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

      {/* Success Stories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how companies are transforming their hiring with TalenTek
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <div key={story.company} className="bg-card p-8 rounded-2xl shadow-card text-center">
                <h3 className="text-2xl font-bold mb-2">{story.company}</h3>
                <p className="text-4xl font-bold text-primary mb-2">{story.hired}</p>
                <p className="text-muted-foreground mb-4">Hires in {story.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "How does AI matching work?",
                a: "Our AI analyzes job requirements, candidate skills, experience, and cultural fit to provide the best matches.",
              },
              {
                q: "Can I hire internationally?",
                a: "Yes! TalenTek supports global hiring with tools for remote work, time zone coordination, and compliance.",
              },
              {
                q: "What's the cost?",
                a: "We offer flexible pricing plans based on your hiring needs. View our pricing page for details.",
              },
            ].map((faq, i) => (
              <div key={i} className="bg-card p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-primary rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Start Hiring Today</h2>
            <p className="text-xl mb-8 opacity-90">
              Join leading companies building exceptional teams with TalenTek
            </p>
            <Button size="lg" variant="secondary" asChild className="text-white">
              <Link to="/get-started">Create Employer Account</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForEmployers;
