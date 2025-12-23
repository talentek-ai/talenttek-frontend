import { useState } from "react";
import EmployerAdminLayout from "@/components/layouts/EmployerAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Users, UserCheck, Calendar, TrendingUp } from "lucide-react";

const monthlyData = [
  { month: "Jan", recruiters: 8, interviews: 45 },
  { month: "Feb", recruiters: 9, interviews: 62 },
  { month: "Mar", recruiters: 10, interviews: 78 },
  { month: "Apr", recruiters: 11, interviews: 95 },
  { month: "May", recruiters: 12, interviews: 110 },
  { month: "Jun", recruiters: 12, interviews: 128 },
];

const recruiterPerformanceData = [
  { name: "Sarah J.", interviews: 28 },
  { name: "Michael C.", interviews: 25 },
  { name: "Emily D.", interviews: 22 },
  { name: "David M.", interviews: 20 },
  { name: "Lisa A.", interviews: 18 },
  { name: "James W.", interviews: 15 },
];

export default function EmployerAdminOverview() {
  const [selectedMonth, setSelectedMonth] = useState("june");

  return (
    <EmployerAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Recruiter Performance</h1>
            <p className="text-gray-600 mt-2">Track Talent Acquisition interviews and team activity</p>
          </div>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="january">January 2025</SelectItem>
              <SelectItem value="february">February 2025</SelectItem>
              <SelectItem value="march">March 2025</SelectItem>
              <SelectItem value="april">April 2025</SelectItem>
              <SelectItem value="may">May 2025</SelectItem>
              <SelectItem value="june">June 2025</SelectItem>
              <SelectItem value="july">July 2025</SelectItem>
              <SelectItem value="august">August 2025</SelectItem>
              <SelectItem value="september">September 2025</SelectItem>
              <SelectItem value="october">October 2025</SelectItem>
              <SelectItem value="november">November 2025</SelectItem>
              <SelectItem value="december">December 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-orange-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Total Recruiters</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
              <p className="text-sm text-gray-500 mt-2">+2 this month</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Active Recruiters</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">9</p>
              <p className="text-sm text-gray-500 mt-2">75% of team</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Interviews This Month</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">128</p>
              <p className="text-sm text-gray-500 mt-2">Talent Acquisition</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 font-medium">Avg Per Recruiter</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">10.7</p>
              <p className="text-sm text-gray-500 mt-2">Interviews/month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recruiter Growth */}
          <Card className="border-orange-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Recruiter & Interview Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip />
                  <Line type="monotone" dataKey="recruiters" stroke="#a855f7" strokeWidth={3} name="Recruiters" />
                  <Line type="monotone" dataKey="interviews" stroke="#3b82f6" strokeWidth={3} name="TA Interviews" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recruiter Performance */}
          <Card className="border-orange-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Top Recruiters (This Month)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={recruiterPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" />
                  <YAxis stroke="#888888" />
                  <Tooltip />
                  <Bar dataKey="interviews" fill="#3b82f6" name="TA Interviews" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </EmployerAdminLayout>
  );
}
