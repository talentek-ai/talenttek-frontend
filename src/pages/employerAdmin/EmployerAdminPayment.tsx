import { useState } from "react";
import EmployerAdminLayout from "@/components/layouts/EmployerAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Check, Calendar, AlertCircle, Download } from "lucide-react";

export default function EmployerAdminPayment() {
  const [currentPlan, setCurrentPlan] = useState("professional");
  const { toast } = useToast();

  const handleUpgrade = (planId: string, planName: string) => {
    setCurrentPlan(planId);
    toast({
      title: "Plan Updated",
      description: `Successfully upgraded to ${planName} plan.`,
    });
  };

  const handleUpdatePayment = () => {
    toast({
      title: "Payment Method",
      description: "Payment method update form will open here.",
    });
  };

  const handleAddPayment = () => {
    toast({
      title: "Add Payment Method",
      description: "Add new payment method form will open here.",
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Downloading Invoice",
      description: `Invoice ${invoiceId} is being downloaded.`,
    });
  };

  const handleContactSupport = () => {
    toast({
      title: "Contact Support",
      description: "Opening support contact form...",
    });
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "15,000",
      currency: "DZD",
      period: "month",
      features: [
        "Up to 3 recruiters",
        "10 job postings",
        "Basic analytics",
        "Email support",
        "Standard templates"
      ],
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      id: "professional",
      name: "Professional",
      price: "35,000",
      currency: "DZD",
      period: "month",
      features: [
        "Up to 10 recruiters",
        "Unlimited job postings",
        "Advanced analytics",
        "Priority support",
        "Custom templates",
        "Interview scheduling",
        "Talent acquisition tools"
      ],
      color: "bg-orange-50 border-orange-200",
      textColor: "text-orange-700",
      buttonColor: "bg-primary hover:bg-primary/90",
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "75,000",
      currency: "DZD",
      period: "month",
      features: [
        "Unlimited recruiters",
        "Unlimited job postings",
        "Enterprise analytics",
        "24/7 dedicated support",
        "White-label solution",
        "API access",
        "Custom integrations",
        "Training & onboarding"
      ],
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  const invoices = [
    { id: "INV-2025-001", date: "2025-11-01", amount: "35,000 DZD", status: "paid", plan: "Professional" },
    { id: "INV-2025-002", date: "2025-10-01", amount: "35,000 DZD", status: "paid", plan: "Professional" },
    { id: "INV-2025-003", date: "2025-09-01", amount: "35,000 DZD", status: "paid", plan: "Professional" },
    { id: "INV-2025-004", date: "2025-08-01", amount: "15,000 DZD", status: "paid", plan: "Starter" },
  ];

  return (
    <EmployerAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Payment & Subscription</h1>
          <p className="text-gray-600 mt-2">Manage your subscription and billing information</p>
        </div>

        {/* Current Subscription */}
        <Card className="border-orange-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b">
            <CardTitle className="flex items-center gap-2 text-xl">
              <CreditCard className="w-6 h-6 text-primary" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Plan</p>
                <p className="text-2xl font-bold text-gray-900">Professional</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Monthly Cost</p>
                <p className="text-2xl font-bold text-gray-900">35,000 DZD</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Next Billing Date</p>
                <p className="text-2xl font-bold text-gray-900">Dec 1, 2025</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <Check className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">Subscription Active</p>
                <p className="text-sm text-green-700">Your subscription is active and will renew automatically</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative shadow-sm border-2 ${plan.color}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className={`text-2xl font-bold ${plan.textColor}`}>{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.currency}/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.buttonColor} text-white`}
                    variant={currentPlan === plan.id ? "outline" : "default"}
                    disabled={currentPlan === plan.id}
                    onClick={() => handleUpgrade(plan.id, plan.name)}
                  >
                    {currentPlan === plan.id ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <Card className="border-orange-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b">
            <CardTitle className="flex items-center gap-2 text-xl">
              <CreditCard className="w-6 h-6 text-primary" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">CIB Bank Card</p>
                  <p className="text-sm text-gray-600">•••• •••• •••• 4532</p>
                  <p className="text-xs text-gray-500">Expires 12/26</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-orange-50 hover:text-primary"
                onClick={handleUpdatePayment}
              >
                Update
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="mt-4 border-primary text-primary hover:bg-orange-50 hover:text-primary"
              onClick={handleAddPayment}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Add New Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card className="border-orange-200 shadow-sm">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar className="w-6 h-6 text-primary" />
              Billing History
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Invoice</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Plan</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{invoice.id}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{invoice.date}</td>
                      <td className="px-4 py-4 text-sm text-gray-600">{invoice.plan}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-gray-900">{invoice.amount}</td>
                      <td className="px-4 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-primary hover:bg-orange-50 hover:text-primary"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="border-orange-200 shadow-sm bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Need help with billing?</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Our support team is available to assist you with any billing questions or concerns.
                </p>
                <Button 
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                  onClick={handleContactSupport}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </EmployerAdminLayout>
  );
}
