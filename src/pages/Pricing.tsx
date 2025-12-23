import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingCard from "@/components/PricingCard";

const Pricing = () => {
  const pricingPlans = [
    {
      title: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Create talent or employer profile",
        "Basic job matching",
        "Up to 5 applications/postings per month",
        "Support Ticket access",
        "Access to community resources",
      ],
    },
    {
      title: "Pro",
      price: "$49",
      description: "For serious job seekers and growing companies",
      features: [
        "Everything in Free",
        "Advanced AI matching",
        "Unlimited applications/postings",
        "Priority Support Ticket access",
        "Analytics dashboard",
        "Interview scheduling tools",
        "Resume optimization",
        "Featured profile/listings",
      ],
      popular: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      description: "For large organizations with unique needs",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom integrations",
        "API access",
        "Advanced analytics & reporting",
        "Custom branding",
        "SLA guarantees",
        "Onboarding & training",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Simple, Transparent{" "}
              <span className="text-orange-custom">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the plan that fits your needs. Upgrade or downgrade anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.title} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Compare Plans</h2>
            <p className="text-xl text-muted-foreground">
              See what's included in each plan
            </p>
          </div>
          <div className="bg-card rounded-2xl p-8 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4">Free</th>
                  <th className="text-center py-4 px-4">Pro</th>
                  <th className="text-center py-4 px-4">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { feature: "Profile/Listing Creation", free: "✓", pro: "✓", enterprise: "✓" },
                  { feature: "AI Matching", free: "Basic", pro: "Advanced", enterprise: "Advanced" },
                  { feature: "Applications/Postings", free: "5/month", pro: "Unlimited", enterprise: "Unlimited" },
                  { feature: "Analytics", free: "—", pro: "✓", enterprise: "Advanced" },
                  { feature: "Priority Support Ticket access", free: "—", pro: "✓", enterprise: "✓" },
                  { feature: "API Access", free: "—", pro: "—", enterprise: "✓" },
                ].map((row) => (
                  <tr key={row.feature}>
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-muted-foreground">{row.free}</td>
                    <td className="py-4 px-4 text-center">{row.pro}</td>
                    <td className="py-4 px-4 text-center">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I switch plans anytime?",
                a: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                q: "Is there a free trial for Pro?",
                a: "We offer a 14-day free trial of Pro features. No credit card required.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
              },
              {
                q: "Do you offer discounts for annual billing?",
                a: "Yes! Save 20% when you choose annual billing on Pro or Enterprise plans.",
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

      <Footer />
    </div>
  );
};

export default Pricing;
