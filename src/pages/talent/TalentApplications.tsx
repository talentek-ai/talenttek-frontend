import React, { useState } from "react";
import TalentLayout from "@/components/layouts/TalentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { ExternalLink, Eye, Download, Trash2, Search } from "lucide-react";

interface Application {
  id: number;
  company: string;
  companyLogo: string;
  jobTitle: string;
  jobId: number;
  status: "pending" | "interview" | "accepted" | "rejected";
  appliedDate: string;
}

const TalentApplications = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const applications: Application[] = [
    {
      id: 1,
      company: "Hi Talents",
      companyLogo: "HT",
      jobTitle: "Content & Social Media Manager",
      jobId: 1,
      status: "pending",
      appliedDate: "17/11/2025",
    },
    {
      id: 2,
      company: "Tech Innovations Inc",
      companyLogo: "TI",
      jobTitle: "Senior React Developer",
      jobId: 2,
      status: "interview",
      appliedDate: "15/11/2025",
    },
    {
      id: 3,
      company: "Digital Solutions",
      companyLogo: "DS",
      jobTitle: "Full Stack Engineer",
      jobId: 3,
      status: "accepted",
      appliedDate: "10/11/2025",
    },
    {
      id: 4,
      company: "Creative Agency Pro",
      companyLogo: "CA",
      jobTitle: "UI/UX Designer",
      jobId: 4,
      status: "rejected",
      appliedDate: "08/11/2025",
    },
    {
      id: 5,
      company: "StartUp Hub",
      companyLogo: "SH",
      jobTitle: "Product Manager",
      jobId: 5,
      status: "pending",
      appliedDate: "05/11/2025",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "interview":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "accepted":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "interview":
        return "Interview";
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const filteredApplications = applications.filter((app) => {
    const statusMatch = filterStatus === "all" || app.status === filterStatus;
    const searchMatch =
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <TalentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Applications</h1>
          <p className="text-muted-foreground">Track and manage your job applications</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  placeholder="Search by company or job title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Applications ({filteredApplications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredApplications.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-4 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Company
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Job Title
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Status
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Applied Date
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                              {app.companyLogo}
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">
                              {app.company}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Link
                            to={`/job/${app.jobId}`}
                            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 w-fit group"
                          >
                            {app.jobTitle}
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={`${getStatusColor(app.status)} font-medium`}>
                            {getStatusLabel(app.status)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-slate-600 dark:text-slate-400">
                          {app.appliedDate}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              title="View Resume"
                              className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                              <Eye className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Download Resume"
                              className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-700"
                            >
                              <Download className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              title="Withdraw Application"
                              className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900"
                            >
                              <Trash2 className="w-4 h-4 text-slate-600 dark:text-slate-400 hover:text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500 dark:text-slate-400 mb-4">No applications found</p>
                <Link to="/jobs">
                  <Button className="gap-2 bg-gradient-primary hover:opacity-90">
                    Discover More Jobs
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TalentLayout>
  );
};

export default TalentApplications;
