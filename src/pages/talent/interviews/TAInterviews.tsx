import React, { useState } from "react";
import TalentLayout from "@/components/layouts/TalentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Video,
  Phone,
  CheckCircle,
  AlertCircle,
  Play,
  Download,
} from "lucide-react";

interface Interview {
  id: number;
  company: string;
  companyLogo: string;
  jobTitle: string;
  recruiterName: string;
  recruiterRole: string;
  date: string;
  time: string;
  duration: string;
  type: "video" | "phone" | "in-person";
  meetingLink?: string;
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
}

const TAInterviews = () => {
  const { toast } = useToast();
  const [interviews] = useState<Interview[]>([
    {
      id: 1,
      company: "Hi Talents",
      companyLogo: "HT",
      jobTitle: "Content & Social Media Manager",
      recruiterName: "Sarah Johnson",
      recruiterRole: "Senior Recruiter",
      date: "20/11/2025",
      time: "10:00 AM",
      duration: "30 mins",
      type: "video",
      meetingLink: "https://zoom.us/meeting/123456",
      status: "upcoming",
      notes: "Talent Acquisition focused on content strategy and social media analytics",
    },
    {
      id: 2,
      company: "Tech Innovations Inc",
      companyLogo: "TI",
      jobTitle: "Senior React Developer",
      recruiterName: "Mike Chen",
      recruiterRole: "Technical Recruiter",
      date: "18/11/2025",
      time: "02:00 PM",
      duration: "45 mins",
      type: "video",
      meetingLink: "https://meet.google.com/abc-def-ghi",
      status: "completed",
      notes: "Assessment covering React fundamentals, state management, and performance optimization",
    },
  ]);

  const handleJoinMeeting = (link?: string) => {
    if (link) {
      window.open(link, "_blank");
      toast({
        title: "Opening meeting link",
        description: "Joining the interview...",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800";
      case "completed":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
      case "cancelled":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      default:
        return "";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-5 h-5" />;
      case "phone":
        return <Phone className="w-5 h-5" />;
      case "in-person":
        return <MapPin className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Upcoming
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  const upcomingInterviews = interviews.filter((i) => i.status === "upcoming");
  const completedInterviews = interviews.filter((i) => i.status === "completed");

  const InterviewCard = ({ interview }: { interview: Interview }) => (
    <div
      className={`rounded-xl border-2 p-6 transition-all hover:shadow-lg ${getStatusColor(
        interview.status
      )}`}
    >
      <div className="space-y-5">
        {/* Header with Company and Status */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md">
              {interview.companyLogo}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {interview.jobTitle}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {interview.company}
              </p>
            </div>
          </div>
          {getStatusBadge(interview.status)}
        </div>

        {/* Recruiter Info */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 dark:text-white text-sm">
              {interview.recruiterName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {interview.recruiterRole}
            </p>
          </div>
        </div>

        {/* Interview Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {interview.date}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {interview.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
              {interview.duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-primary">{getTypeIcon(interview.type)}</div>
            <span className="text-sm text-slate-700 dark:text-slate-300 capitalize">
              {interview.type}
            </span>
          </div>
        </div>

        {/* Notes */}
        {interview.notes && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border-l-4 border-primary">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {interview.notes}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap">
          {interview.status === "upcoming" && (
            <>
              <Button
                onClick={() => handleJoinMeeting(interview.meetingLink)}
                className="flex-1 gap-2 bg-gradient-primary hover:opacity-90"
              >
                <Play className="w-4 h-4" />
                Join Meeting
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Materials
              </Button>
            </>
          )}
          {interview.status === "completed" && (
            <>
              <Button
                variant="outline"
                className="flex-1 gap-2 text-green-600 border-green-200 hover:bg-green-50"
              >
                <CheckCircle className="w-4 h-4" />
                View Feedback
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Recording
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <TalentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Talent Acquisition Interviews
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Upcoming TA interviews and past assessments
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming" className="gap-2">
              <AlertCircle className="w-4 h-4" />
              Upcoming ({upcomingInterviews.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Completed ({completedInterviews.length})
            </TabsTrigger>
          </TabsList>

          {/* Upcoming */}
          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {upcomingInterviews.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {upcomingInterviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-12 pb-12 text-center">
                  <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">
                    No upcoming interviews scheduled
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Completed */}
          <TabsContent value="completed" className="space-y-4 mt-6">
            {completedInterviews.length > 0 ? (
              <div className="grid gap-4 lg:grid-cols-2">
                {completedInterviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-12 pb-12 text-center">
                  <CheckCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">
                    No completed interviews yet
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </TalentLayout>
  );
};

export default TAInterviews;
