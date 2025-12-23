import OwnerLayout from "@/components/layouts/OwnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Briefcase, UserCog, TrendingUp, Activity, DollarSign, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const statsData = [
  { name: "Jan", users: 400, revenue: 2400 },
  { name: "Feb", users: 550, revenue: 3200 },
  { name: "Mar", users: 680, revenue: 4100 },
  { name: "Apr", users: 820, revenue: 5200 },
  { name: "May", users: 950, revenue: 6300 },
  { name: "Jun", users: 1100, revenue: 7800 },
];

const userTypeData = [
  { name: "Talents", value: 450, color: "#ea580c" },
  { name: "Employers", value: 180, color: "#fb923c" },
  { name: "Interviewers", value: 75, color: "#fdba74" },
];

export default function OwnerDashboard() {
  return (
    <OwnerLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with TalenTek.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">1,248</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12.5% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Employers</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">180</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +8.2% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Talents</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">893</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +15.3% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Interviewers</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">175</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +5.7% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <UserCog className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <Card className="border-orange-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={statsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#ea580c" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Distribution */}
          <Card className="border-orange-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">User Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={userTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-orange-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Platform Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", text: "New employer registered: TechCorp Inc." },
                { icon: Users, color: "text-blue-600", bg: "bg-blue-100", text: "15 new talents joined the platform" },
                { icon: Activity, color: "text-orange-600", bg: "bg-orange-100", text: "Job post approved: Senior React Developer" },
                { icon: DollarSign, color: "text-purple-600", bg: "bg-purple-100", text: "Subscription payment received: $499" },
              ].map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 ${activity.bg} rounded-full flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <p className="text-gray-700">{activity.text}</p>
                    <span className="ml-auto text-sm text-gray-500">2h ago</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </OwnerLayout>
  );
}
