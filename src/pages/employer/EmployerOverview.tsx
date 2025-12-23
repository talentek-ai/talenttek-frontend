import EmployerLayout from "@/components/layouts/EmployerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, Users, Calendar, CheckCircle, CalendarDays } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useState } from "react";

const EmployerOverview = () => {
  const [selectedMonth, setSelectedMonth] = useState("november-2025");

  // Available months
  const months = [
    { value: "november-2025", label: "November 2025" },
    { value: "october-2025", label: "October 2025" },
    { value: "september-2025", label: "September 2025" },
    { value: "august-2025", label: "August 2025" },
    { value: "july-2025", label: "July 2025" },
    { value: "june-2025", label: "June 2025" },
  ];

  // Mock data for different months
  const monthlyData = {
    "november-2025": {
      stats: [
        { title: "Active Jobs", value: 8, description: "Open positions", icon: Briefcase, gradient: "from-blue-500 to-cyan-500" },
        { title: "Applications", value: 156, description: "Total received", icon: Users, gradient: "from-purple-500 to-pink-500" },
        { title: "Interviews", value: 24, description: "This month", icon: Calendar, gradient: "from-orange-500 to-red-500" },
        { title: "Hired", value: 12, description: "This month", icon: CheckCircle, gradient: "from-green-500 to-emerald-500" },
      ],
      topJobs: [
        { job: "Frontend Developer", applications: 42, interviews: 8 },
        { job: "Backend Developer", applications: 36, interviews: 6 },
        { job: "UI/UX Designer", applications: 28, interviews: 5 },
        { job: "QA Engineer", applications: 25, interviews: 3 },
        { job: "DevOps Engineer", applications: 20, interviews: 2 },
      ]
    },
    "october-2025": {
      stats: [
        { title: "Active Jobs", value: 6, description: "Open positions", icon: Briefcase, gradient: "from-blue-500 to-cyan-500" },
        { title: "Applications", value: 142, description: "Total received", icon: Users, gradient: "from-purple-500 to-pink-500" },
        { title: "Interviews", value: 28, description: "This month", icon: Calendar, gradient: "from-orange-500 to-red-500" },
        { title: "Hired", value: 8, description: "This month", icon: CheckCircle, gradient: "from-green-500 to-emerald-500" },
      ],
      topJobs: [
        { job: "Full Stack Developer", applications: 38, interviews: 9 },
        { job: "Data Scientist", applications: 32, interviews: 7 },
        { job: "Product Manager", applications: 26, interviews: 6 },
        { job: "Mobile Developer", applications: 22, interviews: 4 },
        { job: "System Architect", applications: 18, interviews: 2 },
      ]
    },
    "september-2025": {
      stats: [
        { title: "Active Jobs", value: 10, description: "Open positions", icon: Briefcase, gradient: "from-blue-500 to-cyan-500" },
        { title: "Applications", value: 189, description: "Total received", icon: Users, gradient: "from-purple-500 to-pink-500" },
        { title: "Interviews", value: 35, description: "This month", icon: Calendar, gradient: "from-orange-500 to-red-500" },
        { title: "Hired", value: 15, description: "This month", icon: CheckCircle, gradient: "from-green-500 to-emerald-500" },
      ],
      topJobs: [
        { job: "Senior Engineer", applications: 45, interviews: 10 },
        { job: "Tech Lead", applications: 40, interviews: 8 },
        { job: "Scrum Master", applications: 35, interviews: 7 },
        { job: "Cloud Engineer", applications: 30, interviews: 6 },
        { job: "Security Engineer", applications: 25, interviews: 4 },
      ]
    },
    "august-2025": {
      stats: [
        { title: "Active Jobs", value: 5, description: "Open positions", icon: Briefcase, gradient: "from-blue-500 to-cyan-500" },
        { title: "Applications", value: 98, description: "Total received", icon: Users, gradient: "from-purple-500 to-pink-500" },
        { title: "Interviews", value: 18, description: "This month", icon: Calendar, gradient: "from-orange-500 to-red-500" },
        { title: "Hired", value: 6, description: "This month", icon: CheckCircle, gradient: "from-green-500 to-emerald-500" },
      ],
      topJobs: [
        { job: "JavaScript Developer", applications: 25, interviews: 5 },
        { job: "Python Developer", applications: 22, interviews: 4 },
        { job: "React Developer", applications: 20, interviews: 4 },
        { job: "Node.js Developer", applications: 18, interviews: 3 },
        { job: "Angular Developer", applications: 13, interviews: 2 },
      ]
    },
    "july-2025": {
      stats: [
        { title: "Active Jobs", value: 7, description: "Open positions", icon: Briefcase, gradient: "from-blue-500 to-cyan-500" },
        { title: "Applications", value: 124, description: "Total received", icon: Users, gradient: "from-purple-500 to-pink-500" },
        { title: "Interviews", value: 22, description: "This month", icon: Calendar, gradient: "from-orange-500 to-red-500" },
        { title: "Hired", value: 9, description: "This month", icon: CheckCircle, gradient: "from-green-500 to-emerald-500" },
      ],
      topJobs: [
        { job: "Software Engineer", applications: 35, interviews: 7 },
        { job: "Web Developer", applications: 28, interviews: 5 },
        { job: "Database Admin", applications: 24, interviews: 4 },
        { job: "Network Engineer", applications: 20, interviews: 3 },
        { job: "IT Support", applications: 17, interviews: 3 }, // No change needed here, 'IT Support' is a job title
      ]
    },
    "june-2025": {
      stats: [
        { title: "Active Jobs", value: 9, description: "Open positions", icon: Briefcase, gradient: "from-blue-500 to-cyan-500" },
        { title: "Applications", value: 167, description: "Total received", icon: Users, gradient: "from-purple-500 to-pink-500" },
        { title: "Interviews", value: 31, description: "This month", icon: Calendar, gradient: "from-orange-500 to-red-500" },
        { title: "Hired", value: 11, description: "This month", icon: CheckCircle, gradient: "from-green-500 to-emerald-500" },
      ],
      topJobs: [
        { job: "AI Engineer", applications: 40, interviews: 8 },
        { job: "ML Engineer", applications: 37, interviews: 7 },
        { job: "Data Engineer", applications: 32, interviews: 6 },
        { job: "Business Analyst", applications: 28, interviews: 5 },
        { job: "Project Manager", applications: 24, interviews: 5 },
      ]
    },
  };

  const currentData = monthlyData[selectedMonth] || monthlyData["november-2025"];
  const stats = currentData.stats;
  const topJobs = currentData.topJobs;

  // Pie chart data for statics
  const pieData = [
    { name: "Active Jobs", value: stats[0].value },
    { name: "Applications", value: stats[1].value },
    { name: "Interviews", value: stats[2].value },
    { name: "Hired", value: stats[3].value },
  ];
  const pieColors = ["#3b82f6", "#a21caf", "#f59e42", "#22c55e"];

  return (
    <EmployerLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-1">Monitor your recruitment metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-muted-foreground" />
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="overflow-hidden hover:scale-105 transition-transform">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Statics Pie Chart and Bar Charts */}
        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Recruitment Statistics - {months.find(m => m.value === selectedMonth)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Top 5 Jobs by Applications - {months.find(m => m.value === selectedMonth)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topJobs} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="job" fontSize={12} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="applications" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </EmployerLayout>
  );
};

export default EmployerOverview;
