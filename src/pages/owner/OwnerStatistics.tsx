import OwnerLayout from "@/components/layouts/OwnerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import { TrendingUp, Users, Building2, Briefcase, DollarSign, Calendar } from "lucide-react";
import { useState } from "react";

const monthlyData = [
  { month: "Jan", talents: 65, employers: 12, interviewers: 8, revenue: 15000 },
  { month: "Feb", talents: 85, employers: 18, interviewers: 12, revenue: 21000 },
  { month: "Mar", talents: 110, employers: 25, interviewers: 15, revenue: 28000 },
  { month: "Apr", talents: 145, employers: 32, interviewers: 20, revenue: 35000 },
  { month: "May", talents: 180, employers: 40, interviewers: 28, revenue: 44000 },
  { month: "Jun", talents: 220, employers: 53, interviewers: 35, revenue: 56000 },
];

const revenueData = [
  { month: "Jan", subscriptions: 12000, services: 3000 },
  { month: "Feb", subscriptions: 16000, services: 5000 },
  { month: "Mar", subscriptions: 20000, services: 8000 },
  { month: "Apr", subscriptions: 25000, services: 10000 },
  { month: "May", subscriptions: 32000, services: 12000 },
  { month: "Jun", subscriptions: 40000, services: 16000 },
];

export default function OwnerStatistics() {
  const [timeRange, setTimeRange] = useState("6months");

  return (
    <OwnerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Platform Statistics</h1>
            <p className="text-gray-600 mt-2">Comprehensive analytics and insights</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[200px]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-orange-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Total Growth</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">+238%</p>
              <p className="text-sm text-gray-500 mt-2">User base expansion</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Employer Growth</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">+342%</p>
              <p className="text-sm text-gray-500 mt-2">Companies joined</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-orange-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Job Matches</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">1,245</p>
              <p className="text-sm text-gray-500 mt-2">Successful placements</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">$56K</p>
              <p className="text-sm text-gray-500 mt-2">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth by Type */}
          <Card className="border-orange-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">User Growth by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip />
                  <Bar dataKey="talents" fill="#a855f7" name="Talents" />
                  <Bar dataKey="employers" fill="#3b82f6" name="Employers" />
                  <Bar dataKey="interviewers" fill="#10b981" name="Interviewers" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Breakdown */}
          <Card className="border-orange-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip />
                  <Area type="monotone" dataKey="subscriptions" stackId="1" stroke="#ea580c" fill="#fb923c" name="Subscriptions" />
                  <Area type="monotone" dataKey="services" stackId="1" stroke="#f97316" fill="#fdba74" name="Services" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Total User Growth Trend */}
        <Card className="border-orange-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Total User Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Line type="monotone" dataKey="talents" stroke="#a855f7" strokeWidth={3} name="Talents" />
                <Line type="monotone" dataKey="employers" stroke="#3b82f6" strokeWidth={3} name="Employers" />
                <Line type="monotone" dataKey="interviewers" stroke="#10b981" strokeWidth={3} name="Interviewers" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </OwnerLayout>
  );
}
