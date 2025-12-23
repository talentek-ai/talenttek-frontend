import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import ForEmployers from "./pages/ForEmployers";
import ForTalents from "./pages/ForTalents";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import GetStarted from "./pages/GetStarted";
import TalentSignup from "./pages/signup/TalentSignup";
import EmployerSignup from "./pages/signup/EmployerSignup";
import TalentOverview from "./pages/talent/TalentOverview";
import TalentJobs from "./pages/talent/TalentJobs";
import TalentApplications from "./pages/talent/TalentApplications";
import TalentProfile from "./pages/talent/TalentProfile";
import TalentSupportTickets from "./pages/talent/TalentSupportTickets";
import EmployerOverview from "./pages/employer/EmployerOverview";
import EmployerJobs from "./pages/employer/EmployerJobs";
import EmployerInterviewers from "./pages/employer/EmployerInterviewers";
import EmployerInterviews from "./pages/employer/EmployerInterviews";
import EmployerTickets from "./pages/employer/EmployerTickets";
import NotFound from "./pages/NotFound";
import CompanyProfile from "@/pages/employerAdmin/CompanyProfile";
import EmployerSettings from "./pages/employer/EmployerSettings";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import TalentOnboarding from "./pages/talent/TalentOnboarding";
import TalentOffers from "./pages/talent/TalentOffers";
import TAInterviews from "./pages/talent/interviews/TAInterviews";
import ITInterviews from "./pages/talent/interviews/ITInterviews";
import TechnicalInterviewLogin from "./pages/technicalInterview/TechnicalInterviewLogin";
import TechnicalInterviewOverview from "./pages/technicalInterview/TechnicalInterviewOverview";
import TechnicalInterviewInterviews from "./pages/technicalInterview/TechnicalInterviewInterviews";
import TechnicalInterviewReview from "./pages/technicalInterview/TechnicalInterviewReview";
import TechnicalInterviewProfile from "./pages/technicalInterview/TechnicalInterviewProfile";
import TechnicalInterviewSettings from "./pages/technicalInterview/TechnicalInterviewSettings";
import LeadershipInterviewLogin from "./pages/leadershipInterview/LeadershipInterviewLogin";
import LeadershipInterviewOverview from "./pages/leadershipInterview/LeadershipInterviewOverview";
import LeadershipInterviewInterviews from "./pages/leadershipInterview/LeadershipInterviewInterviews";
import LeadershipInterviewReview from "./pages/leadershipInterview/LeadershipInterviewReview";
import LeadershipInterviewProfile from "./pages/leadershipInterview/LeadershipInterviewProfile";
import LeadershipInterviewSettings from "./pages/leadershipInterview/LeadershipInterviewSettings";
import TalentServices from "./pages/talent/TalentServices";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import OwnerLogin from "./pages/owner/OwnerLogin";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OwnerUsers from "./pages/owner/OwnerUsers";
import OwnerStatistics from "./pages/owner/OwnerStatistics";
import OwnerSettings from "./pages/owner/OwnerSettings";
import OwnerAddEmployer from "./pages/owner/OwnerAddEmployer";
import OwnerSubscriptions from "./pages/owner/OwnerSubscriptions";
import EmployerAdminOverview from "./pages/employerAdmin/EmployerAdminOverview";
import EmployerAdminUsers from "./pages/employerAdmin/EmployerAdminUsers";
import EmployerAdminPayment from "./pages/employerAdmin/EmployerAdminPayment";
import EmployerAdminSettings from "./pages/employerAdmin/EmployerAdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/for-employers" element={<ForEmployers />} />
            <Route path="/for-talents" element={<ForTalents />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/signup/talent" element={<TalentSignup />} />
            <Route path="/signup/employer" element={<EmployerSignup />} />
            
            {/* Talent Routes */}
            <Route path="/talent/onboarding" element={<TalentOnboarding />} />
            <Route path="/talent/overview" element={<TalentOverview />} />
            <Route path="/talent/interviews/ta" element={<TAInterviews />} />
            <Route path="/talent/interviews/it" element={<ITInterviews />} />
            <Route path="/talent/applications" element={<TalentApplications />} />
            <Route path="/talent/offers" element={<TalentOffers />} />
            <Route path="/talent/jobs" element={<TalentJobs />} />
            <Route path="/talent/profile" element={<TalentProfile />} />
            <Route path="/talent/messages" element={<TalentSupportTickets />} />
            <Route path="/talent/support-tickets" element={<TalentSupportTickets />} />
            <Route path="/talent/services" element={<TalentServices />} />
            
            {/* Employer Routes */}
            <Route path="/employer/overview" element={<EmployerOverview />} />
            <Route path="/employer/jobs" element={<EmployerJobs />} />
            <Route path="/employer/interviewers" element={<EmployerInterviewers />} />
            <Route path="/employer/pipeline" element={<EmployerInterviews />} />
            <Route path="/employer/interviews" element={<EmployerInterviews />} />
            <Route path="/employer/tickets" element={<EmployerTickets />} />
            <Route path="/employer/settings" element={<EmployerSettings />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDetails />} />

            {/* Company Profile Route */}
            <Route path="/company-profile" element={<CompanyProfile />} />
            
            {/* Technical Interviewer Routes */}
            <Route path="/technical-interviewer/login" element={<TechnicalInterviewLogin />} />
            <Route path="/technical-interviewer/overview" element={<TechnicalInterviewOverview />} />
            <Route path="/technical-interviewer/interviews" element={<TechnicalInterviewInterviews />} />
            <Route path="/technical-interviewer/interviews/:id/review" element={<TechnicalInterviewReview />} />
            <Route path="/technical-interviewer/profile" element={<TechnicalInterviewProfile />} />
            <Route path="/technical-interviewer/settings" element={<TechnicalInterviewSettings />} />
            
            {/* Leadership Interviewer Routes */}
            <Route path="/leadership-interviewer/login" element={<LeadershipInterviewLogin />} />
            <Route path="/leadership-interviewer/overview" element={<LeadershipInterviewOverview />} />
            <Route path="/leadership-interviewer/interviews" element={<LeadershipInterviewInterviews />} />
            <Route path="/leadership-interviewer/interviews/:id/review" element={<LeadershipInterviewReview />} />
            <Route path="/leadership-interviewer/profile" element={<LeadershipInterviewProfile />} />
            <Route path="/leadership-interviewer/settings" element={<LeadershipInterviewSettings />} />
            
            {/* Owner Routes */}
            <Route path="/owner/login" element={<OwnerLogin />} />
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            <Route path="/owner/users" element={<OwnerUsers />} />
            <Route path="/owner/users/add-employer" element={<OwnerAddEmployer />} />
            <Route path="/owner/employers" element={<OwnerUsers />} />
            <Route path="/owner/talents" element={<OwnerUsers />} />
            <Route path="/owner/interviewers" element={<OwnerUsers />} />
            <Route path="/owner/subscriptions" element={<OwnerSubscriptions />} />
            <Route path="/owner/statistics" element={<OwnerStatistics />} />
            <Route path="/owner/settings" element={<OwnerSettings />} />
            
            {/* Employer Admin Routes */}
            <Route path="/employer-admin/overview" element={<EmployerAdminOverview />} />
            <Route path="/employer-admin/users" element={<EmployerAdminUsers />} />
            <Route path="/employer-admin/company-profile" element={<CompanyProfile />} />
            <Route path="/employer-admin/payment" element={<EmployerAdminPayment />} />
            <Route path="/employer-admin/settings" element={<EmployerAdminSettings />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
