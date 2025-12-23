import TechnicalInterviewLayout from "@/components/layouts/technicalInterview/TechnicalInterviewLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Clock, Calendar, User, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const TechnicalInterviewInterviews = () => {
  const interviews = [
    {
      id: 1,
      candidateName: "Alex Chen",
      position: "Senior Backend Engineer",
      date: "2025-11-20",
      time: "10:00 AM",
      status: "Pending Review",
      meetLink: "https://meet.google.com/abc-defg-hij",
      type: "Technical",
      focus: "System Design & Algorithms"
    },
    {
      id: 2,
      candidateName: "Sarah Miller",
      position: "Full Stack Developer",
      date: "2025-11-21",
      time: "2:00 PM",
      status: "Completed",
      meetLink: "https://meet.google.com/xyz-qrst-uvw",
      type: "Technical",
      focus: "Data Structures & Coding"
    },
    {
      id: 3,
      candidateName: "David Park",
      position: "Frontend Engineer",
      date: "2025-11-22",
      time: "11:30 AM",
      status: "Upcoming",
      meetLink: "https://meet.google.com/lmn-opqr-stu",
      type: "Technical",
      focus: "Problem Solving & Architecture"
    },
    {
      id: 4,
      candidateName: "Emma Wilson",
      position: "DevOps Engineer",
      date: "2025-11-23",
      time: "3:00 PM",
      status: "Upcoming",
      meetLink: "https://meet.google.com/abc-xyz-123",
      type: "Technical",
      focus: "Cloud & Infrastructure"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Upcoming":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "Pending Review":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <TechnicalInterviewLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Technical Interviews</h1>
            <p className="text-muted-foreground mt-1">Assess coding skills, algorithms, and system design</p>
          </div>
          <div className="text-sm text-muted-foreground">
            Total: <span className="font-semibold text-foreground">{interviews.length}</span> interviews
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Candidate</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Position</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Schedule</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {interviews.map((interview) => (
                    <tr 
                      key={interview.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-500/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-orange-500" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{interview.candidateName}</div>
                            <div className="text-xs text-muted-foreground">ID: #{interview.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-foreground font-medium">{interview.position}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{interview.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{interview.time}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`${getStatusColor(interview.status)} border-0 font-medium`}>
                          {interview.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm" asChild className="gap-2">
                            <a href={interview.meetLink} target="_blank" rel="noopener noreferrer">
                              <Video className="w-4 h-4" />
                              Join
                            </a>
                          </Button>
                          {interview.status === "Pending Review" && (
                            <Button size="sm" asChild className="bg-orange-500 hover:bg-orange-600 gap-2">
                              <Link to={`/technical-interviewer/interviews/${interview.id}/review`}>
                                <FileText className="w-4 h-4" />
                                Review
                              </Link>
                            </Button>
                          )}
                          {interview.status === "Completed" && (
                            <Button variant="secondary" size="sm" asChild className="gap-2">
                              <Link to={`/technical-interviewer/interviews/${interview.id}/review`}>
                                <Eye className="w-4 h-4" />
                                View
                              </Link>
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </TechnicalInterviewLayout>
  );
};

export default TechnicalInterviewInterviews;
