import { useState } from "react";
import OwnerLayout from "@/components/layouts/OwnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Search, 
  Filter,
  Download,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Settings,
  Package
} from "lucide-react";

export default function OwnerSubscriptions() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editSubscriptionDialog, setEditSubscriptionDialog] = useState(false);
  const [cancelSubscriptionDialog, setCancelSubscriptionDialog] = useState(false);
  const [addSubscriptionDialog, setAddSubscriptionDialog] = useState(false);
  const [managePlansDialog, setManagePlansDialog] = useState(false);
  const [editPlanDialog, setEditPlanDialog] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeTab, setActiveTab] = useState("subscriptions");

  // Available subscription plans
  const [employerPlans, setEmployerPlans] = useState([
    { id: "EP-1", name: "Starter", price: "15,000 DZD", features: ["5 Job Posts", "50 Applications", "Email Support"], subscribers: 1 },
    { id: "EP-2", name: "Professional", price: "35,000 DZD", features: ["20 Job Posts", "Unlimited Applications", "Priority Support", "Analytics"], subscribers: 3 },
    { id: "EP-3", name: "Enterprise", price: "75,000 DZD", features: ["Unlimited Posts", "Unlimited Applications", "Dedicated Support", "Advanced Analytics", "API Access"], subscribers: 1 }
  ]);

  const [talentPlans, setTalentPlans] = useState([
    { id: "TP-1", name: "Free", price: "0 USD", features: ["Basic Profile", "Apply to Jobs", "Limited Visibility"], subscribers: 2 },
    { id: "TP-2", name: "Premium", price: "9.99 USD", features: ["Enhanced Profile", "Priority Applications", "Profile Boost", "Resume Download"], subscribers: 2 },
    { id: "TP-3", name: "Elite", price: "19.99 USD", features: ["All Premium Features", "Direct Employer Contact", "Career Coaching", "Featured Profile"], subscribers: 1 }
  ]);

  // Mock subscription data
  const employerSubscriptions = [
    {
      id: "ES-001",
      companyName: "Tech Innovators Inc",
      email: "admin@techinnovators.com",
      plan: "Professional",
      price: "35,000 DZD",
      startDate: "2024-11-01",
      nextBilling: "2025-12-01",
      status: "active",
      autoRenew: true,
      paymentMethod: "CIB Card •••• 4532",
      totalPaid: "385,000 DZD"
    },
    {
      id: "ES-002",
      companyName: "Digital Solutions Ltd",
      email: "billing@digitalsolutions.com",
      plan: "Enterprise",
      price: "75,000 DZD",
      startDate: "2024-08-15",
      nextBilling: "2025-12-15",
      status: "active",
      autoRenew: true,
      paymentMethod: "BADR Card •••• 7821",
      totalPaid: "300,000 DZD"
    },
    {
      id: "ES-003",
      companyName: "StartUp Hub",
      email: "finance@startuphub.com",
      plan: "Starter",
      price: "15,000 DZD",
      startDate: "2025-10-01",
      nextBilling: "2025-12-01",
      status: "active",
      autoRenew: false,
      paymentMethod: "CCP Account",
      totalPaid: "30,000 DZD"
    },
    {
      id: "ES-004",
      companyName: "Legacy Corp",
      email: "admin@legacycorp.com",
      plan: "Professional",
      price: "35,000 DZD",
      startDate: "2025-09-01",
      nextBilling: "-",
      status: "cancelled",
      autoRenew: false,
      paymentMethod: "CIB Card •••• 9234",
      totalPaid: "70,000 DZD"
    },
    {
      id: "ES-005",
      companyName: "NextGen Solutions",
      email: "billing@nextgen.com",
      plan: "Enterprise",
      price: "75,000 DZD",
      startDate: "2025-11-15",
      nextBilling: "2025-12-05",
      status: "past_due",
      autoRenew: true,
      paymentMethod: "BADR Card •••• 3421",
      totalPaid: "75,000 DZD"
    }
  ];

  const talentSubscriptions = [
    {
      id: "TS-001",
      talentName: "Abderraouf Abla",
      email: "abderraouf.education@gmail.com",
      plan: "Premium Freelancer",
      price: "$29",
      startDate: "2024-06-01",
      nextBilling: "2025-12-01",
      status: "active",
      autoRenew: true,
      paymentMethod: "Visa •••• 4532",
      totalPaid: "$522"
    },
    {
      id: "TS-002",
      talentName: "Sara Bensalem",
      email: "sara.bensalem@email.com",
      plan: "Elite Professional",
      price: "$99",
      startDate: "2024-03-15",
      nextBilling: "2025-12-15",
      status: "active",
      autoRenew: true,
      paymentMethod: "Mastercard •••• 8821",
      totalPaid: "$1,881"
    },
    {
      id: "TS-003",
      talentName: "Karim Benali",
      email: "karim.benali@email.com",
      plan: "Free",
      price: "$0",
      startDate: "2025-11-01",
      nextBilling: "-",
      status: "active",
      autoRenew: false,
      paymentMethod: "-",
      totalPaid: "$0"
    },
    {
      id: "TS-004",
      talentName: "Yasmine Rahmouni",
      email: "yasmine.r@email.com",
      plan: "Premium Freelancer",
      price: "$29",
      startDate: "2025-10-01",
      nextBilling: "-",
      status: "cancelled",
      autoRenew: false,
      paymentMethod: "Visa •••• 2341",
      totalPaid: "$58"
    },
    {
      id: "TS-005",
      talentName: "Mehdi Touati",
      email: "mehdi.touati@email.com",
      plan: "Premium Freelancer",
      price: "$29",
      startDate: "2025-11-10",
      nextBilling: "2025-12-03",
      status: "past_due",
      autoRenew: true,
      paymentMethod: "Visa •••• 7634",
      totalPaid: "$29"
    }
  ];

  const stats = {
    totalRevenue: "1,437,000 DZD",
    monthlyRevenue: "265,000 DZD",
    activeEmployers: 3,
    activeTalents: 3,
    employerSubscriptions: 5,
    talentSubscriptions: 5,
    pastDueCount: 2
  };

  const handleEditSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    setEditSubscriptionDialog(true);
  };

  const handleCancelSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    setCancelSubscriptionDialog(true);
  };

  const confirmCancelSubscription = () => {
    toast({
      title: "Subscription Cancelled",
      description: `${selectedSubscription?.companyName || selectedSubscription?.talentName}'s subscription has been cancelled.`,
    });
    setCancelSubscriptionDialog(false);
    setSelectedSubscription(null);
  };

  const handleSaveEdit = () => {
    toast({
      title: "Subscription Updated",
      description: "Subscription details have been updated successfully.",
    });
    setEditSubscriptionDialog(false);
    setSelectedSubscription(null);
  };

  const handleAddSubscription = () => {
    toast({
      title: "Subscription Added",
      description: "New subscription has been created successfully.",
    });
    setAddSubscriptionDialog(false);
  };

  const handleExportToExcel = () => {
    const allSubscriptions = [
      ...employerSubscriptions.map(sub => ({
        Type: "Employer",
        ID: sub.id,
        Name: sub.companyName,
        Email: sub.email,
        Plan: sub.plan,
        Price: sub.price,
        "Start Date": sub.startDate,
        "Next Billing": sub.nextBilling,
        Status: sub.status,
        "Auto Renew": sub.autoRenew ? "Yes" : "No",
        "Payment Method": sub.paymentMethod,
        "Total Paid": sub.totalPaid
      })),
      ...talentSubscriptions.map(sub => ({
        Type: "Talent",
        ID: sub.id,
        Name: sub.talentName,
        Email: sub.email,
        Plan: sub.plan,
        Price: sub.price,
        "Start Date": sub.startDate,
        "Next Billing": sub.nextBilling,
        Status: sub.status,
        "Auto Renew": sub.autoRenew ? "Yes" : "No",
        "Payment Method": sub.paymentMethod,
        "Total Paid": sub.totalPaid
      }))
    ];

    // Convert to CSV
    const headers = Object.keys(allSubscriptions[0]).join(",");
    const rows = allSubscriptions.map(sub => 
      Object.values(sub).map(val => `"${val}"`).join(",")
    ).join("\n");
    const csv = `${headers}\n${rows}`;

    // Create blob and download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `subscriptions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: "Subscriptions data exported to CSV file.",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { className: "bg-green-100 text-green-700", icon: CheckCircle, label: "Active" },
      cancelled: { className: "bg-gray-100 text-gray-700", icon: XCircle, label: "Cancelled" },
      past_due: { className: "bg-red-100 text-red-700", icon: AlertCircle, label: "Past Due" }
    };
    const config = statusConfig[status] || statusConfig.active;
    const Icon = config.icon;
    return (
      <Badge className={`${config.className} hover:${config.className} flex items-center gap-1 w-fit`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const SubscriptionTable = ({ subscriptions, type }) => {
    const filtered = subscriptions.filter(sub => {
      const matchesSearch = type === "employer" 
        ? sub.companyName.toLowerCase().includes(searchQuery.toLowerCase())
        : sub.talentName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === "all" || sub.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-orange-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                {type === "employer" ? "Company" : "Talent"}
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Plan</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Next Billing</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total Paid</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{sub.id}</td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {type === "employer" ? sub.companyName : sub.talentName}
                    </p>
                    <p className="text-xs text-gray-500">{sub.email}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    {sub.plan}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-gray-900">{sub.price}</td>
                <td className="px-4 py-4 text-sm text-gray-600">
                  {sub.nextBilling === "-" ? (
                    <span className="text-gray-400">-</span>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {sub.nextBilling}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4">{getStatusBadge(sub.status)}</td>
                <td className="px-4 py-4 text-sm font-semibold text-green-600">{sub.totalPaid}</td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-primary hover:bg-orange-50 hover:text-primary"
                      onClick={() => handleEditSubscription(sub)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    {sub.status === "active" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleCancelSubscription(sub)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No subscriptions found</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <OwnerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Subscriptions Management</h1>
            <p className="text-gray-600 mt-2">Manage subscription plans and subscribers</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setManagePlansDialog(true)}
              variant="outline"
              className="gap-2"
            >
              <Settings className="w-5 h-5" />
              Manage Plans
            </Button>
            <Button
              onClick={() => setAddSubscriptionDialog(true)}
              className="bg-gradient-primary text-white hover:opacity-90 gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Subscriber
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-orange-200 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-xl font-bold text-gray-900">{stats.totalRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-xl font-bold text-gray-900">{stats.monthlyRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Employers</p>
                  <p className="text-xl font-bold text-gray-900">{stats.activeEmployers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Talents</p>
                  <p className="text-xl font-bold text-gray-900">{stats.activeTalents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Subscriptions</p>
                  <p className="text-xl font-bold text-gray-900">{stats.employerSubscriptions + stats.talentSubscriptions}</p>
                  <p className="text-xs text-gray-500 mt-1">{stats.employerSubscriptions} Employers, {stats.talentSubscriptions} Talents</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Past Due</p>
                  <p className="text-xl font-bold text-red-600">{stats.pastDueCount}</p>
                  <p className="text-xs text-gray-500 mt-1">Need attention</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs - Plans vs Subscriptions */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-96 grid-cols-2 bg-orange-50">
            <TabsTrigger value="subscriptions" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Subscribers
            </TabsTrigger>
            <TabsTrigger value="plans" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              Plans
            </TabsTrigger>
          </TabsList>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            {/* Filters */}
            <Card className="border-orange-200 shadow-md">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search by company or talent name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-orange-200 focus:ring-orange-500"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-48 border-orange-200">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="past_due">Past Due</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    className="border-orange-300 text-primary hover:bg-orange-50"
                    onClick={handleExportToExcel}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export to Excel
                  </Button>
                </div>
              </CardContent>
            </Card>

        {/* Subscriptions Tabs */}
        <Tabs defaultValue="employers" className="space-y-6">
          <TabsList className="grid w-full md:w-96 grid-cols-2 bg-orange-50">
            <TabsTrigger value="employers" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Briefcase className="w-4 h-4 mr-2" />
              Employers
            </TabsTrigger>
            <TabsTrigger value="talents" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Talents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employers">
            <Card className="border-orange-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Briefcase className="w-6 h-6 text-primary" />
                  Employer Subscriptions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <SubscriptionTable subscriptions={employerSubscriptions} type="employer" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="talents">
            <Card className="border-orange-200 shadow-md">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Users className="w-6 h-6 text-primary" />
                  Talent Subscriptions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <SubscriptionTable subscriptions={talentSubscriptions} type="talent" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <Tabs defaultValue="employer-plans" className="space-y-6">
              <TabsList className="grid w-full md:w-96 grid-cols-2 bg-orange-50">
                <TabsTrigger value="employer-plans" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Employer Plans
                </TabsTrigger>
                <TabsTrigger value="talent-plans" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  <Users className="w-4 h-4 mr-2" />
                  Talent Plans
                </TabsTrigger>
              </TabsList>

              <TabsContent value="employer-plans">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {employerPlans.map((plan) => (
                    <Card key={plan.id} className="border-orange-200 shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">{plan.name}</CardTitle>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedPlan(plan);
                              setEditPlanDialog(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-2xl font-bold text-primary mt-2">{plan.price}/month</div>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b">
                          <span className="text-sm text-gray-600">Active Subscribers</span>
                          <Badge className="bg-primary">{plan.subscribers}</Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-700">Features:</p>
                          <ul className="space-y-1">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="talent-plans">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {talentPlans.map((plan) => (
                    <Card key={plan.id} className="border-orange-200 shadow-md hover:shadow-lg transition-shadow">
                      <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">{plan.name}</CardTitle>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedPlan(plan);
                              setEditPlanDialog(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-2xl font-bold text-primary mt-2">{plan.price}/month</div>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b">
                          <span className="text-sm text-gray-600">Active Subscribers</span>
                          <Badge className="bg-primary">{plan.subscribers}</Badge>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-gray-700">Features:</p>
                          <ul className="space-y-1">
                            {plan.features.map((feature, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>

        {/* Edit Subscription Dialog */}
        <Dialog open={editSubscriptionDialog} onOpenChange={setEditSubscriptionDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Subscription</DialogTitle>
              <DialogDescription>
                Update subscription details for {selectedSubscription?.companyName || selectedSubscription?.talentName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Plan</label>
                  <Select defaultValue={selectedSubscription?.plan}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Free">Free</SelectItem>
                      <SelectItem value="Starter">Starter</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Premium Freelancer">Premium Freelancer</SelectItem>
                      <SelectItem value="Elite Professional">Elite Professional</SelectItem>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                  <Select defaultValue={selectedSubscription?.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="past_due">Past Due</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Next Billing Date</label>
                <Input type="date" defaultValue={selectedSubscription?.nextBilling} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="autoRenew" defaultChecked={selectedSubscription?.autoRenew} />
                <label htmlFor="autoRenew" className="text-sm text-gray-700">Enable auto-renewal</label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditSubscriptionDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-primary text-white" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Subscription Dialog */}
        <Dialog open={cancelSubscriptionDialog} onOpenChange={setCancelSubscriptionDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Subscription</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel the subscription for {selectedSubscription?.companyName || selectedSubscription?.talentName}?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">
                  This action will immediately cancel the subscription. The user will lose access to premium features.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCancelSubscriptionDialog(false)}>
                Keep Subscription
              </Button>
              <Button className="bg-red-600 text-white hover:bg-red-700" onClick={confirmCancelSubscription}>
                Cancel Subscription
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Subscription Dialog */}
        <Dialog open={addSubscriptionDialog} onOpenChange={setAddSubscriptionDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Subscription</DialogTitle>
              <DialogDescription>
                Create a new subscription for an employer or talent
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">User Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employer">Employer</SelectItem>
                    <SelectItem value="talent">Talent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                <Input placeholder="user@example.com" type="email" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Plan</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter - 15,000 DZD</SelectItem>
                      <SelectItem value="professional">Professional - 35,000 DZD</SelectItem>
                      <SelectItem value="enterprise">Enterprise - 75,000 DZD</SelectItem>
                      <SelectItem value="free">Free - $0</SelectItem>
                      <SelectItem value="premium">Premium Freelancer - $29</SelectItem>
                      <SelectItem value="elite">Elite Professional - $99</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Start Date</label>
                  <Input type="date" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="addAutoRenew" defaultChecked />
                <label htmlFor="addAutoRenew" className="text-sm text-gray-700">Enable auto-renewal</label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddSubscriptionDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-primary text-white" onClick={handleAddSubscription}>
                Create Subscription
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Plan Dialog */}
        <Dialog open={editPlanDialog} onOpenChange={setEditPlanDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Plan</DialogTitle>
              <DialogDescription>
                Update plan details for {selectedPlan?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Plan Name</label>
                <Input defaultValue={selectedPlan?.name} placeholder="e.g., Professional" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Price</label>
                <Input defaultValue={selectedPlan?.price} placeholder="e.g., 35,000 DZD" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Features (one per line)</label>
                <textarea 
                  className="w-full min-h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  defaultValue={selectedPlan?.features.join('\n')}
                  placeholder="Enter features, one per line"
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>{selectedPlan?.subscribers}</strong> subscribers are currently on this plan
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditPlanDialog(false)}>
                Cancel
              </Button>
              <Button className="bg-gradient-primary text-white" onClick={() => {
                toast({
                  title: "Plan Updated",
                  description: "The subscription plan has been updated successfully.",
                });
                setEditPlanDialog(false);
              }}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </OwnerLayout>
  );
}
