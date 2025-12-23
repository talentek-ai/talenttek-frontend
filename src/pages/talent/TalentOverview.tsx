import TalentLayout from "@/components/layouts/TalentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Calendar, Eye, TrendingUp } from "lucide-react";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const applicationsData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Applications per Month",
      data: [
        45, 60, 75, 50, 90, 100, 80, 70, 85, 95, 110, 120
      ],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const acceptanceData = {
  labels: ["Technical", "HR", "Managerial", "Other"],
  datasets: [
    {
      label: "Acceptance Rate per Interview Type",
      data: [70, 50, 60, 40],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderWidth: 1,
    },
  ],
};

const TalentOverview = () => {
  const [selectedMonth, setSelectedMonth] = useState("all");

  const stats = [
    {
      title: "Applications",
      value: "12",
      description: "Active applications",
      icon: FileText,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Interviews",
      value: "3",
      description: "Upcoming interviews",
      icon: Calendar,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Profile Views",
      value: "45",
      description: "This month",
      icon: Eye,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Response Rate",
      value: "68%",
      description: "From employers",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <TalentLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-muted-foreground mt-1">
              Track your job search progress
            </p>
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="overflow-hidden hover-scale">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}`}
                    >
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              Applications per Month
            </h2>
            <Bar
              data={applicationsData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: "Applications per Month",
                  },
                },
              }}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              Acceptance Rate per Interview Type
            </h2>
            <Line
              data={acceptanceData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: "Acceptance Rate per Interview Type",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </TalentLayout>
  );
};

export default TalentOverview;
