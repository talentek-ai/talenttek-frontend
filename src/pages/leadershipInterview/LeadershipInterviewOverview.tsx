import LeadershipInterviewLayout from "@/components/layouts/leadershipInterview/LeadershipInterviewLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const LeadershipInterviewOverview = () => {
  const [selectedMonth, setSelectedMonth] = useState("all");

  const stats = [
    {
      title: "Upcoming Interviews",
      value: 4,
      description: "Scheduled this week",
      icon: Calendar,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Pending Reviews",
      value: 8,
      description: "Awaiting evaluation",
      icon: Users,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Completed Interviews",
      value: 22,
      description: "This month",
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "In Progress",
      value: 2,
      description: "Today",
      icon: Clock,
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  // Pie chart data for interview statistics
  const pieData = [
    { name: "Completed", value: 22 },
    { name: "Pending Review", value: 8 },
    { name: "Upcoming", value: 4 },
    { name: "In Progress", value: 2 },
  ];
  const pieColors = ["#22c55e", "#a21caf", "#a855f7", "#f59e42"];

  // Leadership competencies assessed
  const leadershipCompetencies = [
    { competency: "Strategic Thinking", count: 15 },
    { competency: "Team Management", count: 20 },
    { competency: "Decision Making", count: 18 },
    { competency: "Communication", count: 22 },
    { competency: "Vision & Planning", count: 12 },
  ];

  return (
    <LeadershipInterviewLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Leadership Interview Dashboard</h1>
            <p className="text-muted-foreground mt-1">Monitor your leadership assessment metrics and performance</p>
          </div>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48 bg-white border-gray-300">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
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
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {stats.map((stat) => {
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

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2 mt-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Interview Status Distribution</CardTitle>
            </CardHeader>
            <CardContent style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Leadership Competencies Assessed</CardTitle>
            </CardHeader>
            <CardContent style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadershipCompetencies} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="competency" fontSize={11} angle={-15} textAnchor="end" height={80} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </LeadershipInterviewLayout>
  );
};

export default LeadershipInterviewOverview;
