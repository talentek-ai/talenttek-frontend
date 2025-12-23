import EmployerLayout from "@/components/layouts/EmployerLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BarChart3, Filter, ChevronDown, User, Mail, MapPin, CheckCircle, AlertCircle, XCircle, Archive, Phone, Briefcase, Download, Linkedin, Github, Globe, Star, Calendar, Clock, Video, Code, Palette, PenTool, TrendingUp, FileText, Languages, Music, Smartphone, Camera, Megaphone, DollarSign } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

// Mock interviewers data
const interviewers = [
  { id: 1, name: "Sarah Johnson", role: "Technical Lead", email: "sarah.j@company.com" },
  { id: 2, name: "Michael Chen", role: "Senior Developer", email: "michael.c@company.com" },
  { id: 3, name: "Emily Davis", role: "HR Manager", email: "emily.d@company.com" },
  { id: 4, name: "David Martinez", role: "CTO", email: "david.m@company.com" },
];

// Mock scheduled interviews storage (in real app, this would be in database)
const scheduledInterviews = [];

// Mock data for all jobs with their candidates
const allJobsData = {
  "1": {
    all: [
      { 
        id: 1, 
        name: "Abderraouf Abla", 
        email: "abderraouf.education@gmail.com",
        phone: "0699097459",
        location: "Algiers",
        company: "Full stack",
        appliedDate: "10/10/2025",
        matchScore: 25,
        status: "Pending Review",
        stage: null,
        services: [
          {
            id: 1,
            title: "Full-Stack Web Development",
            description: "Custom web applications using React, Node.js, and modern technologies. From concept to deployment.",
            category: "Development",
            startingPrice: 150,
            deliveryTime: "7 days",
            rating: 4.9,
            reviews: 127,
            tags: ["React", "Node.js", "MongoDB", "AWS"],
            icon: "Code"
          },
          {
            id: 2,
            title: "Mobile App Development",
            description: "Native and cross-platform mobile applications for iOS and Android with modern UI/UX.",
            category: "Development",
            startingPrice: 200,
            deliveryTime: "14 days",
            rating: 4.8,
            reviews: 89,
            tags: ["React Native", "Flutter", "iOS", "Android"],
            icon: "Smartphone"
          }
        ]
      },
    ],
    pipeline: {
      toContact: [],
      talentAcquisition: [],
      technical: [],
      leadership: [],
      offer: [],
      rejectedOffers: [],
      hired: [],
    },
    maybe: [],
    Rejected: [],
  },
  "2": {
    all: [],
    pipeline: {
      toContact: [],
      talentAcquisition: [],
      technical: [],
      leadership: [],
      offer: [],
      rejectedOffers: [],
      hired: [],
    },
    maybe: [],
    Rejected: [],
  },
  "3": {
    all: [
      { 
        id: 2, 
        name: "Sara Bensalem", 
        email: "sara.bensalem@email.com",
        phone: "0666112233",
        location: "Algiers",
        company: "Tech Solutions",
        appliedDate: "11/11/2025",
        matchScore: 78,
        status: "Pending Review",
        stage: null,
        services: [
          {
            id: 3,
            title: "Brand Identity & Logo Design",
            description: "Complete brand identity package including logo, color palette, typography, and brand guidelines.",
            category: "Design",
            startingPrice: 89,
            deliveryTime: "5 days",
            rating: 4.8,
            reviews: 89,
            tags: ["Logo Design", "Branding", "Illustrator", "Figma"],
            icon: "Palette"
          },
          {
            id: 4,
            title: "UI/UX Design for Web & Mobile",
            description: "Modern, user-friendly interface designs with prototypes and design systems included.",
            category: "Design",
            startingPrice: 120,
            deliveryTime: "10 days",
            rating: 4.9,
            reviews: 73,
            tags: ["UI/UX", "Figma", "Prototyping", "Responsive"],
            icon: "Palette"
          }
        ]
      },
      { 
        id: 3, 
        name: "Omar Khelifi", 
        email: "omar.khelifi@email.com",
        phone: "0777998877",
        location: "Oran",
        company: "Digital Agency",
        appliedDate: "11/12/2025",
        matchScore: 65,
        status: "Pending Review",
        stage: null
      },
    ],
    pipeline: {
      toContact: [],
      talentAcquisition: [],
      technical: [],
      leadership: [],
      offer: [],
      rejectedOffers: [],
      hired: [],
    },
    maybe: [],
    Rejected: [],
  },
};

const jobs = [
  { id: "1", title: "Mobile iOS Engineer", status: "Published", applicationsCount: 1 },
  { id: "2", title: "Mobile Android Engineer", status: "Archived", applicationsCount: 0 },
  { id: "3", title: "Full Stack Engineer", status: "Published", applicationsCount: 2 },
];

const BigTitle = ({ children }: { children: React.ReactNode }) => (
  <span style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }} className="text-2xl font-bold">
    {children}
  </span>
);

export default function EmployerInterviews() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("pipeline"); // "pipeline" or "table"
  const [selectedJob, setSelectedJob] = useState(jobs[2]); // Start with Full Stack Engineer
  const [jobsData, setJobsData] = useState(allJobsData);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [screeningDialogOpen, setScreeningDialogOpen] = useState(false);
  const [viewingCandidate, setViewingCandidate] = useState(null); // For detailed view
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewingCandidate, setReviewingCandidate] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(3);
  const [viewReviewCandidate, setViewReviewCandidate] = useState(null);
  const [candidateDetailDialog, setCandidateDetailDialog] = useState(false);
  const [detailCandidate, setDetailCandidate] = useState(null);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [schedulingCandidate, setSchedulingCandidate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedHours, setSelectedHours] = useState("10");
  const [selectedMinutes, setSelectedMinutes] = useState("00");
  const [interviewLink, setInterviewLink] = useState("");
  const [interviewHistory, setInterviewHistory] = useState({});
  const [selectedInterviewer, setSelectedInterviewer] = useState("");
  const [interviewType, setInterviewType] = useState(""); // talentAcquisition, technical, leadership
  const [generateOfferDialog, setGenerateOfferDialog] = useState(false);
  const [offerCandidate, setOfferCandidate] = useState(null);
  const [offerDetails, setOfferDetails] = useState({
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    position: "",
    salary: "",
    startDate: "",
    benefits: "",
    workLocation: "",
    contractType: "Full-time"
  });
  const [offerGenerated, setOfferGenerated] = useState(false);
  const [servicesDialogOpen, setServicesDialogOpen] = useState(false);
  const [selectedCandidateServices, setSelectedCandidateServices] = useState(null);

  const currentJobData = jobsData[selectedJob.id];
  const candidates = currentJobData.pipeline;

  // Sync pipeline stages with jobsData
  const pipelineStages = [
    { id: "toContact", label: "To Contact", candidates: candidates.toContact, color: "bg-blue-50 border-blue-200", textColor: "text-blue-700" },
    { id: "talentAcquisition", label: "Talent Acquisition Interview", candidates: candidates.talentAcquisition, color: "bg-purple-50 border-purple-200", textColor: "text-purple-700" },
    { id: "technical", label: "Technical Interview", candidates: candidates.technical, color: "bg-yellow-50 border-yellow-200", textColor: "text-yellow-700" },
    { id: "leadership", label: "Leadership Interview", candidates: candidates.leadership, color: "bg-orange-50 border-orange-200", textColor: "text-orange-700" },
    { id: "offer", label: "Offer", candidates: candidates.offer, color: "bg-pink-50 border-pink-200", textColor: "text-pink-700" },
    { id: "rejectedOffers", label: "Rejected Offers", candidates: candidates.rejectedOffers || [], color: "bg-red-50 border-red-200", textColor: "text-red-700" },
    { id: "hired", label: "Hired", candidates: candidates.hired, color: "bg-green-50 border-green-200", textColor: "text-green-700" },
  ];

  const handleScreenCandidate = (candidate, decision) => {
    const updatedJobsData = { ...jobsData };
    const currentJob = updatedJobsData[selectedJob.id];

    // Add to appropriate pipeline stage
    if (decision === 'toContact') {
      currentJob.pipeline.toContact.push({ ...candidate, stage: 'toContact' });
    } else if (decision === 'talentAcquisition') {
      currentJob.pipeline.talentAcquisition.push({ ...candidate, stage: 'talentAcquisition' });
    } else if (decision === 'technical') {
      currentJob.pipeline.technical.push({ ...candidate, stage: 'technical' });
    } else if (decision === 'leadership') {
      currentJob.pipeline.leadership.push({ ...candidate, stage: 'leadership' });
    } else if (decision === 'offer') {
      currentJob.pipeline.offer.push({ ...candidate, stage: 'offer' });
    } else if (decision === 'hired') {
      currentJob.pipeline.hired.push({ ...candidate, stage: 'hired' });
    } else if (decision === 'maybe') {
      if (!currentJob.maybe) currentJob.maybe = [];
      currentJob.maybe.push({ ...candidate, stage: 'maybe' });
    } else if (decision === 'rejected') {
      currentJob.Rejected.push({ ...candidate, stage: 'rejected' });
    } else if (decision === 'archive') {
      // Add to archive list
      if (!currentJob.archived) currentJob.archived = [];
      currentJob.archived.push({ ...candidate, stage: 'archived' });
    }

    setJobsData(updatedJobsData);
    setScreeningDialogOpen(false);
    setSelectedCandidate(null);
  };

  const checkInterviewConflict = (date, time, interviewerId) => {
    if (!date || !time || !interviewerId) return false;
    
    const dateStr = date.toISOString().split('T')[0];
    const conflict = scheduledInterviews.find(
      interview => 
        interview.date === dateStr && 
        interview.time === time && 
        interview.interviewerId === interviewerId
    );
    
    return conflict;
  };

  const handleScheduleInterview = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please fill all fields");
      return;
    }

    // Only check for conflicts if selecting an external interviewer
    if (selectedInterviewer !== "self") {
      const conflict = checkInterviewConflict(selectedDate, selectedTime, selectedInterviewer);
      if (conflict) {
        alert(`Conflict detected! ${interviewers.find(i => i.id === parseInt(selectedInterviewer))?.name || 'Interviewer'} already has an interview scheduled at this time.`);
        return;
      }
    }

    // Generate interview link
    const candidateId = schedulingCandidate.id;
    const stageType = interviewType;
    const timestamp = Date.now();
    const generatedLink = `${window.location.origin}/interview?candidate=${candidateId}&stage=${stageType}&token=${timestamp}`;
    setInterviewLink(generatedLink);

    const updatedJobsData = { ...jobsData };
    const currentJob = updatedJobsData[selectedJob.id];
    const currentStage = schedulingCandidate.stage;

    // Get the LATEST candidate data from jobsData (in case reviews were added)
    const latestCandidate = currentJob.pipeline[currentStage].find(c => c.id === schedulingCandidate.id) || schedulingCandidate;

    // Remove from current stage
    const stageIndex = currentJob.pipeline[currentStage].findIndex(c => c.id === schedulingCandidate.id);
    if (stageIndex !== -1) {
      currentJob.pipeline[currentStage].splice(stageIndex, 1);
    }

    // Add interview details and move to next stage
    const nextStage = interviewType;
    const interviewerData = selectedInterviewer === "self" 
      ? { id: "self", name: "You", role: "Employer", email: "" }
      : (interviewers.find(i => i.id === parseInt(selectedInterviewer)) || { id: selectedInterviewer, name: "Unknown", role: "Interviewer", email: "" });
    const dateStr = selectedDate.toISOString().split('T')[0];
    
    // Add interview history
    const candidateKey = `${selectedJob.id}_${schedulingCandidate.id}`;
    if (!interviewHistory[candidateKey]) {
      interviewHistory[candidateKey] = [];
    }
    interviewHistory[candidateKey].push({
      stage: currentStage,
      date: dateStr,
      time: selectedTime,
      interviewer: interviewerData,
      link: generatedLink,
      status: 'scheduled',
      review: null
    });
    setInterviewHistory({...interviewHistory});
    
    currentJob.pipeline[nextStage].push({ 
      ...latestCandidate,
      stage: nextStage,
      interview: {
        date: dateStr,
        time: selectedTime,
        interviewer: interviewerData,
        scheduled: true,
        link: generatedLink
      }
    });

    console.log(`📦 Candidate moved to ${nextStage}:`, {
      name: latestCandidate.name,
      stage: nextStage,
      hasTA: !!latestCandidate.talentAcquisitionReview,
      hasTech: !!latestCandidate.technicalReview,
      hasLeader: !!latestCandidate.leadershipReview,
      fullData: currentJob.pipeline[nextStage][currentJob.pipeline[nextStage].length - 1]
    });

    // Add to scheduled interviews (only for external interviewers)
    if (selectedInterviewer !== "self" && interviewerData) {
      scheduledInterviews.push({
        candidateId: schedulingCandidate.id,
        candidateName: schedulingCandidate.name,
        date: dateStr,
        time: selectedTime,
        interviewerId: parseInt(selectedInterviewer),
        interviewerName: interviewerData.name || 'Unknown',
        type: nextStage
      });
    }

    setJobsData(updatedJobsData);
    setScheduleDialogOpen(false);
    setSchedulingCandidate(null);
    setSelectedDate(null);
    setSelectedTime("");
    setSelectedHours("10");
    setSelectedMinutes("00");
    setSelectedInterviewer("");
    setInterviewType("");
  };

  const handleMoveToNextStage = (candidate) => {
    const currentStage = candidate.stage;

    // Define next stage based on current stage
    const stageFlow = {
      'toContact': 'talentAcquisition',
      'talentAcquisition': 'technical',
      'technical': 'leadership',
      'leadership': 'offer',
      'offer': 'hired'
    };

    const nextStage = stageFlow[currentStage];

    // Special handling for moving TO offer stage (generate offer first)
    if (nextStage === 'offer') {
      setOfferCandidate(candidate);
      setOfferDetails({
        candidateName: candidate?.name || '',
        candidateEmail: candidate?.email || '',
        candidatePhone: candidate?.phone || '',
        position: selectedJob.title || "Software Engineer",
        salary: "",
        startDate: "",
        benefits: "",
        workLocation: "Office/Remote",
        contractType: "Full-time"
      });
      setOfferGenerated(false);
      setGenerateOfferDialog(true);
      setCandidateDetailDialog(false);
      return;
    }

    // Stages that require interview scheduling
    if (nextStage === 'talentAcquisition' || nextStage === 'technical' || nextStage === 'leadership') {
      setSchedulingCandidate(candidate);
      setInterviewType(nextStage);
      // Show interviewer selection when moving TO technical or leadership (external interviewers)
      if ((currentStage === 'talentAcquisition' && nextStage === 'technical') || (currentStage === 'technical' && nextStage === 'leadership')) {
        setSelectedInterviewer(""); // Need to select interviewer
      } else {
        setSelectedInterviewer("self"); // We are the interviewer
      }
      setScheduleDialogOpen(true);
      setCandidateDetailDialog(false);
    } else {
      // Direct move for other stages
      const updatedJobsData = { ...jobsData };
      const currentJob = updatedJobsData[selectedJob.id];

      // Remove from current stage
      const stageIndex = currentJob.pipeline[currentStage].findIndex(c => c.id === candidate.id);
      if (stageIndex !== -1) {
        currentJob.pipeline[currentStage].splice(stageIndex, 1);
      }

      if (nextStage) {
        currentJob.pipeline[nextStage].push({ ...candidate, stage: nextStage });
      }

      setJobsData(updatedJobsData);
      setCandidateDetailDialog(false);
      setDetailCandidate(null);
    }
  };

  const handleRejectAndArchive = (candidate) => {
    const updatedJobsData = { ...jobsData };
    const currentJob = updatedJobsData[selectedJob.id];
    const currentStage = candidate.stage;

    // Remove from current stage
    const stageIndex = currentJob.pipeline[currentStage].findIndex(c => c.id === candidate.id);
    if (stageIndex !== -1) {
      currentJob.pipeline[currentStage].splice(stageIndex, 1);
    }

    // Add to rejected
    if (!currentJob.Rejected) currentJob.Rejected = [];
    currentJob.Rejected.push({ ...candidate, stage: 'rejected' });

    // Also add to archived
    if (!currentJob.archived) currentJob.archived = [];
    currentJob.archived.push({ ...candidate, stage: 'archived' });

    setJobsData(updatedJobsData);
    setCandidateDetailDialog(false);
    setDetailCandidate(null);
  };

  const handleGenerateOffer = () => {
    if (!offerDetails.salary || !offerDetails.startDate) {
      alert("Please fill in salary and start date");
      return;
    }
    setOfferGenerated(true);
  };

  const handleSendOffer = () => {
    if (!offerGenerated) {
      alert("Please generate the offer first");
      return;
    }

    const updatedJobsData = { ...jobsData };
    const currentJob = updatedJobsData[selectedJob.id];
    const currentStage = offerCandidate.stage;

    // Get the LATEST candidate data from jobsData (in case reviews were added)
    const latestCandidate = currentJob.pipeline[currentStage].find(c => c.id === offerCandidate.id) || offerCandidate;

    // Remove from current stage
    const stageIndex = currentJob.pipeline[currentStage].findIndex(c => c.id === offerCandidate.id);
    if (stageIndex !== -1) {
      currentJob.pipeline[currentStage].splice(stageIndex, 1);
    }

    // Add to offer stage with offer details
    currentJob.pipeline.offer.push({ 
      ...latestCandidate,
      stage: 'offer',
      offer: {
        ...offerDetails,
        sentAt: new Date().toLocaleDateString(),
        status: 'pending'
      }
    });

    setJobsData(updatedJobsData);
    setGenerateOfferDialog(false);
    setOfferCandidate(null);
    setOfferDetails({
      candidateName: '',
      candidateEmail: '',
      candidatePhone: '',
      position: '',
      salary: '',
      startDate: '',
      benefits: '',
      workLocation: '',
      contractType: 'Full-time'
    });
    setOfferGenerated(false);
  };

  const handleSubmitReview = () => {
    if (!reviewingCandidate || !reviewText.trim()) return;

    const updatedJobsData = { ...jobsData };
    const currentJob = updatedJobsData[selectedJob.id];
    
    // Find and update the candidate in their stage
    const stage = reviewingCandidate.stage;
    const candidateIndex = currentJob.pipeline[stage].findIndex(c => c.id === reviewingCandidate.id);
    
    if (candidateIndex !== -1) {
      // Store review with stage-specific key so it persists when moving
      const reviewKey = stage === 'talentAcquisition' ? 'talentAcquisitionReview' : stage === 'technical' ? 'technicalReview' : 'leadershipReview';
      const ratingKey = stage === 'talentAcquisition' ? 'talentAcquisitionRating' : stage === 'technical' ? 'technicalRating' : 'leadershipRating';
      const reviewedAtKey = stage === 'talentAcquisition' ? 'talentAcquisitionReviewedAt' : stage === 'technical' ? 'technicalReviewedAt' : 'leadershipReviewedAt';
      
      currentJob.pipeline[stage][candidateIndex] = {
        ...currentJob.pipeline[stage][candidateIndex],
        [reviewKey]: reviewText,
        [ratingKey]: reviewRating,
        [reviewedAtKey]: new Date().toLocaleDateString(),
        // Keep legacy fields for backward compatibility
        review: reviewText,
        rating: reviewRating,
        reviewedAt: new Date().toLocaleDateString()
      };

      console.log(`✅ Review saved for ${reviewingCandidate.name} in ${stage} stage:`, {
        reviewKey,
        reviewText,
        candidateData: currentJob.pipeline[stage][candidateIndex]
      });
    }

    // Also add review to interview history
    const candidateKey = `${selectedJob.id}_${reviewingCandidate.id}`;
    if (interviewHistory[candidateKey]) {
      // Find the interview record for this stage and add the review
      const interviewIndex = interviewHistory[candidateKey].findIndex(i => i.stage === stage);
      if (interviewIndex !== -1) {
        interviewHistory[candidateKey][interviewIndex].review = reviewText;
        interviewHistory[candidateKey][interviewIndex].rating = reviewRating;
        interviewHistory[candidateKey][interviewIndex].status = 'completed';
      }
    }
    setInterviewHistory({...interviewHistory});

    setJobsData(updatedJobsData);
    setReviewDialogOpen(false);
    setReviewingCandidate(null);
    setReviewText("");
    setReviewRating(3);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedJobsData = { ...jobsData };
    const currentJob = updatedJobsData[selectedJob.id];

    // Get source and destination stage names
    const sourceStageId = source.droppableId;
    const destStageId = destination.droppableId;

    // Get the candidate being moved
    const [movedCandidate] = currentJob.pipeline[sourceStageId].splice(source.index, 1);
    
    // Update the candidate's stage
    movedCandidate.stage = destStageId;
    
    // Add to destination stage
    currentJob.pipeline[destStageId].splice(destination.index, 0, movedCandidate);

    setJobsData(updatedJobsData);
  };

  const handleArchiveCandidate = (candidate) => {
    const updatedJobsData = { ...jobsData };
    const currentJob = updatedJobsData[selectedJob.id];
    const currentStage = candidate.stage;

    // Remove from current stage
    const stageIndex = currentJob.pipeline[currentStage].findIndex(c => c.id === candidate.id);
    if (stageIndex !== -1) {
      currentJob.pipeline[currentStage].splice(stageIndex, 1);
    }

    // Add to archived
    if (!currentJob.archived) currentJob.archived = [];
    currentJob.archived.push({ ...candidate, stage: 'archived' });

    setJobsData(updatedJobsData);
    setCandidateDetailDialog(false);
    setDetailCandidate(null);
  };

  return (
    <EmployerLayout>
      <div className="max-w-7xl mx-auto py-8 px-6 relative">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Applications</h1>
          
          {/* AI Scoring Banner */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <BarChart3 className="w-5 h-5 text-primary mt-0.5" />
            <p className="text-gray-700">
              AI scoring is enabled for your company. Applications will be automatically scored.
            </p>
          </div>

          {/* Job Selector and Filters */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Select
              value={selectedJob.id}
              onValueChange={(val) => {
                const job = jobs.find((j) => j.id === val);
                if (job) setSelectedJob(job);
              }}
            >
              <SelectTrigger className="flex items-center gap-3 bg-white border rounded-lg px-4 py-2.5 flex-1 max-w-md">
                <div className="flex items-center gap-3 flex-1">
                  <span className="font-semibold text-gray-900">{selectedJob.title}</span>
                  <Badge
                    className={`${
                      selectedJob.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    } border-none`}
                  >
                    {selectedJob.status}
                  </Badge>
                </div>
              </SelectTrigger>
              <SelectContent>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    <div className="flex items-center gap-3">
                      <span>{job.title}</span>
                      <Badge variant="outline" className="text-xs">
                        <User className="w-3 h-3 mr-1" />
                        {job.applicationsCount} applications
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[500px] max-h-[80vh] overflow-y-auto">
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      {/* Employment Type Filter */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Employment Type</h4>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Full-Time
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Part-Time
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Contract
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Internship
                          </label>
                        </div>
                      </div>

                      {/* Workplace Type Filter */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Workplace</h4>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            On-site
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Hybrid
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Remote
                          </label>
                        </div>
                      </div>

                      {/* Experience Level Filter */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Experience Level</h4>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            0-1 years
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            1-3 years
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            3-5 years
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            5+ years
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      {/* Job Level Filter */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Job Level</h4>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Entry Level
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Junior
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Mid Level
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Senior
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Lead
                          </label>
                        </div>
                      </div>

                      {/* Education Level Filter */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Education Level</h4>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            High School
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Associate Degree
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Bachelor's Degree
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Master's Degree
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            PhD
                          </label>
                        </div>
                      </div>

                      {/* Contract Type Filter */}
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Contract Type</h4>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Permanent
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Temporary
                          </label>
                          <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            Freelance
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-2 border-t mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      Reset
                    </Button>
                    <Button size="sm" className="flex-1 bg-gradient-primary">
                      Apply
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border-b w-full justify-start rounded-none h-auto p-0 mb-6">
            <TabsTrigger
              value="all"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 py-3 transition-all text-gray-700"
            >
              All Applications{" "}
              <span className="ml-2 text-gray-500">({currentJobData.all.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="pipeline"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 py-3 transition-all text-gray-700"
            >
              Hiring Pipeline{" "}
              <span className="ml-2 text-gray-500">({Object.values(candidates).flat().length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="maybe"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 py-3 transition-all text-gray-700"
            >
              Maybe{" "}
              <span className="ml-2 text-gray-500">({currentJobData.maybe ? currentJobData.maybe.length : 0})</span>
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 py-3 transition-all text-gray-700"
            >
              Rejected{" "}
              <span className="ml-2 text-gray-500">({currentJobData.Rejected ? currentJobData.Rejected.length : 0})</span>
            </TabsTrigger>
            <TabsTrigger
              value="archived"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 py-3 transition-all text-gray-700"
            >
              Archived{" "}
              <span className="ml-2 text-gray-500">({currentJobData.archived ? currentJobData.archived.length : 0})</span>
            </TabsTrigger>
          </TabsList>

          {/* All Applications Tab */}
          <TabsContent value="all" className="mt-0">
            {currentJobData.all.length === 0 ? (
              <div className="bg-white rounded-lg border p-16 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Applications</h3>
                    <p className="text-gray-500">
                      No applications found for the selected job. Share your job posting to attract more candidates.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Candidates List */}
                <div className="space-y-4">
                  {currentJobData.all.map((candidate) => (
                    <div 
                      key={candidate.id} 
                      className={`bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${viewingCandidate?.id === candidate.id ? 'border-primary shadow-md' : ''}`}
                      onClick={() => setViewingCandidate(candidate)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                            <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                              {candidate.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {candidate.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {candidate.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Applied:</span>
                              {candidate.appliedDate}
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-red-500" />
                            <span className="text-sm font-medium">Match Score</span>
                            <span className="text-lg font-bold text-red-500">{candidate.matchScore}%</span>
                          </div>
                          {candidate.services && candidate.services.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCandidateServices(candidate);
                                  setServicesDialogOpen(true);
                                }}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg border border-orange-200 transition-colors"
                              >
                                <Briefcase className="w-4 h-4" />
                                <span className="text-sm font-medium">View Services ({candidate.services.length})</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Candidate Details Panel - Absolute Position Sidebar - Only show when candidate is selected */}
                {viewingCandidate && (
                  <div className="bg-white border rounded-lg p-6 absolute right-0 top-0 w-96 h-[calc(100vh-120px)] overflow-y-auto shadow-lg z-40 mr-6">
                    <div className="space-y-6">
                      {/* Header */}
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <h2 className="text-xl font-bold text-primary">{viewingCandidate.name}'s application</h2>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-primary border-primary">
                              Pipeline: {viewingCandidate.stage ? pipelineStages.find(s => s.id === viewingCandidate.stage)?.label : 'Pending'}
                            </Badge>
                            <button
                              onClick={() => setViewingCandidate(null)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                              title="Close"
                            >
                              <XCircle className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                            </button>
                          </div>
                        </div>

                        {/* Move to Pipeline Button */}
                        <Button 
                          onClick={() => setScreeningDialogOpen(true)}
                          className="w-full bg-gradient-primary text-white mb-6"
                        >
                          Move to...
                        </Button>

                        {/* AI Candidate Scoring */}
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold text-gray-900">AI Candidate Scoring</h3>
                          </div>
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-red-500" />
                                <span className="font-semibold text-gray-900">Match Score</span>
                              </div>
                              <span className="text-2xl font-bold text-red-500">{viewingCandidate.matchScore}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Contact Details */}
                        <div className="mb-6">
                          <h3 className="font-semibold text-gray-900 mb-3">Contact Details</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Phone className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">Phone</div>
                                <div className="font-medium text-gray-900">{viewingCandidate.phone}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Mail className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">Email</div>
                                <div className="font-medium text-gray-900">{viewingCandidate.email}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Professional Information */}
                        <div className="mb-6">
                          <h3 className="font-semibold text-gray-900 mb-3">Professional Information</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="text-xs text-gray-500">Current Company</div>
                                <div className="font-medium text-gray-900">{viewingCandidate.company}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Personal & Education */}
                        <div className="mb-6">
                          <h3 className="font-semibold text-gray-900 mb-3">Personal & Education</h3>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">Location</div>
                                <div className="font-medium text-gray-900">{viewingCandidate.location}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Professional Links */}
                        <div className="mb-6">
                          <h3 className="font-semibold text-gray-900 mb-3">Professional Links</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-2">
                                <Linkedin className="w-4 h-4 text-gray-600" />
                                <span className="text-sm text-gray-900">LinkedIn</span>
                              </div>
                              <span className="text-sm text-gray-500">Not provided</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-2">
                                <Github className="w-4 h-4 text-gray-600" />
                                <span className="text-sm text-gray-900">GitHub</span>
                              </div>
                              <span className="text-sm text-gray-500">Not provided</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-gray-600" />
                                <span className="text-sm text-gray-900">Portfolio</span>
                              </div>
                              <span className="text-sm text-gray-500">Not provided</span>
                            </div>
                          </div>
                        </div>

                        {/* Interview History */}
                        <div className="mb-6">
                          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Interview History
                          </h3>
                          {(() => {
                            const candidateKey = `${selectedJob.id}_${viewingCandidate.id}`;
                            const history = interviewHistory[candidateKey] || [];
                            return history.length > 0 ? (
                              <div className="space-y-2">
                                {history.map((interview, idx) => {
                                  const stageName = interview.stage === 'talentAcquisition' ? 'Talent Acquisition' : interview.stage === 'technical' ? 'Technical' : 'Leadership';
                                  const reviewTitle = interview.stage === 'talentAcquisition' ? 'TA Review' : interview.stage === 'technical' ? 'Technical Interviewer Review' : 'Leadership Review';
                                  const bgColor = interview.stage === 'technical' ? 'bg-purple-50 border-purple-200' : interview.stage === 'leadership' ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200';
                                  const textColor = interview.stage === 'technical' ? 'text-purple-900' : interview.stage === 'leadership' ? 'text-orange-900' : 'text-blue-900';
                                  
                                  return (
                                    <div key={idx} className={`${bgColor} border rounded-lg p-3 text-sm`}>
                                      <div className="flex items-start justify-between mb-2">
                                        <span className={`font-semibold ${textColor}`}>
                                          {stageName} Interview
                                        </span>
                                        <Badge className={interview.review ? 'bg-green-100 text-green-700 text-xs' : 'bg-blue-100 text-blue-700 text-xs'}>
                                          {interview.review ? '✓ Reviewed' : interview.status}
                                        </Badge>
                                      </div>
                                      <div className="text-gray-700 space-y-1 text-xs">
                                        <div className="flex items-center gap-1">
                                          <Calendar className="w-3 h-3" />
                                          {new Date(interview.date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Clock className="w-3 h-3" />
                                          {interview.time}
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <User className="w-3 h-3" />
                                          Interviewer: {interview.interviewer?.name || 'N/A'}
                                        </div>
                                        {interview.review && (
                                          <div className="mt-2 pt-2 border-t border-current border-opacity-20">
                                            <p className={`font-medium ${textColor} mb-1`}>{reviewTitle}:</p>
                                            {interview.rating && (
                                              <div className="flex items-center gap-1 mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <span key={i} className={`text-xs ${i < interview.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                                                ))}
                                              </div>
                                            )}
                                            <p className="text-gray-700 italic">{interview.review}</p>
                                          </div>
                                        )}
                                        {interview.link && (
                                          <div className="mt-2 text-xs flex gap-1 flex-col">
                                            <button
                                              onClick={() => {
                                                navigator.clipboard.writeText(interview.link);
                                                alert("Interview link copied!");
                                              }}
                                              className="text-blue-600 hover:underline flex items-center gap-1 text-left"
                                            >
                                              <Globe className="w-3 h-3" />
                                              Copy Link
                                            </button>
                                            <a href={interview.link} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline flex items-center gap-1 font-semibold">
                                              <Video className="w-3 h-3" />
                                              Join Interview
                                            </a>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500 italic">No interviews scheduled yet</p>
                            );
                          })()}
                        </div>

                        {/* Services Section */}
                        {viewingCandidate.services && viewingCandidate.services.length > 0 && (
                          <div className="mb-6">
                            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Briefcase className="w-5 h-5 text-orange-500" />
                              Services Offered ({viewingCandidate.services.length})
                            </h3>
                            <Button 
                              onClick={() => {
                                setSelectedCandidateServices(viewingCandidate);
                                setServicesDialogOpen(true);
                              }}
                              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                            >
                              View All Services
                            </Button>
                          </div>
                        )}

                        {/* Resume / CV */}
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Resume</h3>
                          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                            <Globe className="w-4 h-4" />
                            View CV
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Screening Dialog */}
          <Dialog open={screeningDialogOpen} onOpenChange={setScreeningDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  <BigTitle>Move {viewingCandidate?.name} to...</BigTitle>
                </DialogTitle>
                <DialogDescription>
                  Select the new status for this candidate
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-4">
                <button
                  onClick={() => handleScreenCandidate(viewingCandidate, 'toContact')}
                  className="w-full flex items-start gap-3 p-4 rounded-lg border hover:bg-blue-50 transition-colors text-left"
                >
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">To Contact</div>
                    <div className="text-sm text-gray-500">Move to hiring pipeline</div>
                  </div>
                </button>
                <button
                  onClick={() => handleScreenCandidate(viewingCandidate, 'maybe')}
                  className="w-full flex items-start gap-3 p-4 rounded-lg border hover:bg-yellow-50 transition-colors text-left"
                >
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Maybe</div>
                    <div className="text-sm text-gray-500">Keep for consideration</div>
                  </div>
                </button>
                <button
                  onClick={() => handleScreenCandidate(viewingCandidate, 'rejected')}
                  className="w-full flex items-start gap-3 p-4 rounded-lg border hover:bg-red-50 transition-colors text-left"
                >
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Rejected</div>
                    <div className="text-sm text-gray-500">Candidate refused or was rejected</div>
                  </div>
                </button>
                <button
                  onClick={() => handleScreenCandidate(viewingCandidate, 'archive')}
                  className="w-full flex items-start gap-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors text-left"
                >
                  <Archive className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <div className="font-semibold text-gray-900">Archive</div>
                    <div className="text-sm text-gray-500">Remove from active view</div>
                  </div>
                </button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Hiring Pipeline Tab */}
          <TabsContent value="pipeline" className="mt-0">
            <div className="space-y-4">
              {/* Pipeline Selector and View Toggle */}
              <div className="flex items-center gap-4">
                <Select defaultValue="default">
                  <SelectTrigger className="w-64 bg-white">
                    <SelectValue placeholder="Select pipeline..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Select pipeline...</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setViewMode("pipeline")}
                    className={viewMode === "pipeline" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}
                  >
                    Pipeline View
                  </Button>
                  <Button
                    onClick={() => setViewMode("table")}
                    className={viewMode === "table" ? "bg-primary text-white" : "bg-gray-200 text-gray-700"}
                  >
                    Table View
                  </Button>
                </div>
              </div>

              {/* Kanban Board - Pipeline View */}
              {viewMode === "pipeline" && (
                <div className="w-full pb-4 overflow-x-auto">
                  <DragDropContext onDragEnd={onDragEnd}>
                  <div className="flex gap-8 mb-4">
                    {pipelineStages.slice(0, 4).map((stage) => (
                      <Droppable droppableId={stage.id} key={stage.id}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            <div key={stage.id} className={`rounded-lg border min-h-[800px] ${stage.color} px-6 py-6`} style={{ width: '480px' }}>
                              <div className="p-4 border-b">
                                <div className="flex items-center justify-between mb-1">
                                  <h3 className="font-semibold text-gray-900">{stage.label}</h3>
                                  <span className="text-sm bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                    {stage.candidates.length}
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                {stage.candidates.length === 0 ? (
                                  <p className="text-sm text-gray-400 italic text-center py-8">
                                    No candidates in this stage
                                  </p>
                                ) : (
                                  <ul className="space-y-2">
                                    {stage.candidates.map((c, index) => (
                                      <Draggable draggableId={String(c.id)} index={index} key={c.id}>
                                        {(provided) => (
                                          <li 
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            {/* Technical Interview and Leadership Interview - Show status and reviews */}
                                            {stage.id === 'technical' || stage.id === 'leadership' ? (
                                              <div 
                                                className="bg-white rounded-lg shadow-md p-3 space-y-2 hover:shadow-lg transition-shadow cursor-pointer"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  console.log(`🔍 Opening detail for ${c.name} in ${c.stage}:`, {
                                                    hasTA: !!c.talentAcquisitionReview,
                                                    hasTech: !!c.technicalReview,
                                                    hasLeader: !!c.leadershipReview,
                                                    fullData: c
                                                  });
                                                  setDetailCandidate(c);
                                                  setCandidateDetailDialog(true);
                                                }}
                                              >
                                                <div className="flex items-center justify-between">
                                                  <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                                      <User className="w-3 h-3 text-primary" />
                                                    </div>
                                                    <h4 className="font-semibold text-sm text-gray-900 truncate">
                                                      {c.name}
                                                    </h4>
                                                  </div>
                                                  {c.review && (
                                                    <Badge variant="outline" className="text-xs text-green-600 border-green-300 bg-green-50 px-1.5 py-0">
                                                      ✓ Done
                                                    </Badge>
                                                  )}
                                                </div>
                                                
                                                <div className="text-xs text-gray-500 truncate">{c.email}</div>

                                                {/* Interview Status */}
                                                {c.interview?.scheduled && (
                                                  <div className="text-xs">
                                                    {(() => {
                                                      const interviewDate = new Date(c.interview.date + ' ' + c.interview.time);
                                                      const now = new Date();
                                                      const isPast = interviewDate < now;
                                                      const isToday = interviewDate.toDateString() === now.toDateString();
                                                      const isReviewed = c.review;
                                                      
                                                      return (
                                                        <Badge 
                                                          variant="outline" 
                                                          className={`text-xs ${
                                                            isReviewed
                                                              ? 'bg-green-50 text-green-700 border-green-300'
                                                              : isPast 
                                                                ? 'bg-red-50 text-red-700 border-red-300' 
                                                                : isToday 
                                                                  ? 'bg-yellow-50 text-yellow-700 border-yellow-300'
                                                                  : 'bg-blue-50 text-blue-700 border-blue-300'
                                                          }`}
                                                        >
                                                          {isReviewed ? '✓ Done' : isPast ? '⚠ Late' : isToday ? '📅 Today' : '📅 Scheduled'}
                                                        </Badge>
                                                      );
                                                    })()}
                                                  </div>
                                                )}

                                                {/* Show review if completed */}
                                                {c.review ? (
                                                  <div className={`rounded p-2 text-xs border ${stage.id === 'technical' ? 'bg-purple-50 border-purple-200' : 'bg-orange-50 border-orange-200'}`}>
                                                    <p className={`font-semibold text-xs mb-1 ${stage.id === 'technical' ? 'text-purple-900' : 'text-orange-900'}`}>
                                                      {stage.id === 'technical' ? 'Technical Interviewer Review:' : 'Leadership Review:'}
                                                    </p>
                                                    <div className="flex items-center gap-1 mb-1">
                                                      {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={`${i < c.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                                                      ))}
                                                    </div>
                                                    <p className="text-gray-700 line-clamp-2">{c.review}</p>
                                                  </div>
                                                ) : (
                                                  <div className={`rounded p-2 text-xs border ${stage.id === 'technical' ? 'bg-purple-50 border-purple-200' : 'bg-orange-50 border-orange-200'}`}>
                                                    <p className={`font-semibold text-xs ${stage.id === 'technical' ? 'text-purple-900' : 'text-orange-900'}`}>
                                                      {stage.id === 'technical' ? 'Technical Interviewer Review:' : 'Leadership Review:'}
                                                    </p>
                                                    <p className="text-gray-600 italic mt-1">No review yet</p>
                                                  </div>
                                                )}

                                                {/* Show scheduled info */}
                                                {c.interview?.scheduled && (
                                                  <div className="bg-blue-50 border border-blue-200 rounded p-2 text-xs">
                                                    <div className="text-gray-700">
                                                      <div>{new Date(c.interview.date).toLocaleDateString()}</div>
                                                      <div>{c.interview.time}</div>
                                                      <div className="truncate">With: {c.interview.interviewer.name}</div>
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            ) : (
                                              /* All other stages - Enhanced cards with status and actions */
                                              <div 
                                                className="bg-white rounded-lg shadow-md p-3 space-y-2 hover:shadow-lg transition-shadow cursor-pointer"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setDetailCandidate(c);
                                                  setCandidateDetailDialog(true);
                                                }}
                                              >
                                                <div className="flex items-center justify-between">
                                                  <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                                      <User className="w-3 h-3 text-primary" />
                                                    </div>
                                                    <h4 className="font-semibold text-sm text-gray-900 truncate">
                                                      {c.name}
                                                    </h4>
                                                  </div>
                                                  {(stage.id === 'talentAcquisition' || stage.id === 'leadership') && c.review && (
                                                    <Badge variant="outline" className="text-xs text-green-600 border-green-300 bg-green-50 px-1.5 py-0">
                                                      ✓
                                                    </Badge>
                                                  )}
                                                </div>
                                                

                                                <div className="text-xs text-gray-500 truncate">{c.email}</div>

                                                {/* Show Meet Link and Join/Status */}
                                                {c.interview?.link && (
                                                  <div className="mt-2 flex flex-col gap-1">
                                                    <span className="text-xs text-gray-700 flex items-center gap-1">
                                                      <Video className="w-3 h-3" />
                                                      Meet Link:
                                                      <a href={c.interview.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">Open</a>
                                                    </span>
                                                    {(() => {
                                                      const interviewDate = new Date(c.interview.date + ' ' + c.interview.time);
                                                      const now = new Date();
                                                      const isPast = interviewDate < now;
                                                      const isToday = interviewDate.toDateString() === now.toDateString();
                                                      const isDone = c.review;
                                                      if (isDone) {
                                                        return <button className="bg-gray-200 text-gray-500 rounded px-2 py-1 text-xs cursor-not-allowed" disabled>Completed</button>;
                                                      } else if (isPast) {
                                                        return <button className="bg-red-100 text-red-700 rounded px-2 py-1 text-xs cursor-not-allowed" disabled>Late</button>;
                                                      } else {
                                                        return <a href={c.interview.link} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white rounded px-2 py-1 text-xs hover:bg-green-700">Join</a>;
                                                      }
                                                    })()}
                                                  </div>
                                                )}

                                                {/* Show scheduled interview info */}
                                                {c.interview?.scheduled && (
                                                  <div className="bg-blue-50 border border-blue-200 rounded p-2 text-xs mt-2">
                                                    <div className="flex items-center gap-1 text-blue-700 mb-1">
                                                      <Calendar className="w-3 h-3" />
                                                      <span className="font-semibold">Scheduled</span>
                                                    </div>
                                                    <div className="text-gray-700">
                                                      <div>{new Date(c.interview.date).toLocaleDateString()}</div>
                                                      <div>{c.interview.time}</div>
                                                      <div className="truncate">With: {c.interview.interviewer.name}</div>
                                                    </div>
                                                  </div>
                                                )}

                                                {/* Show offer info for Offer stage */}
                                                {stage.id === 'offer' && c.offer && (
                                                  <div className="bg-green-50 border border-green-200 rounded p-2 text-xs">
                                                    <div className="flex items-center gap-1 text-green-700 mb-1">
                                                      <Briefcase className="w-3 h-3" />
                                                      <span className="font-semibold">Offer Sent</span>
                                                    </div>
                                                    <div className="text-gray-700">
                                                      <div className="truncate">{c.offer.position}</div>
                                                      <div>{c.offer.salary}</div>
                                                      <div>Status: {c.offer.status}</div>
                                                    </div>
                                                  </div>
                                                )}

                                                {/* Show review for Talent Acquisition and Leadership */}
                                                {(stage.id === 'talentAcquisition' || stage.id === 'leadership') && (
                                                  <div>
                                                    {c.review ? (
                                                      <div className="bg-green-50 border border-green-200 rounded p-2 text-xs">
                                                        <p className="font-semibold text-green-900 text-xs mb-1">
                                                          {stage.id === 'talentAcquisition' ? 'TA Review:' : 'Leadership Review:'}
                                                        </p>
                                                        <div 
                                                          className="flex items-center gap-1"
                                                          onClick={(e) => {
                                                            e.stopPropagation();
                                                            setViewReviewCandidate(c);
                                                          }}
                                                        >
                                                          {[...Array(5)].map((_, i) => (
                                                            <span key={i} className={`text-xs ${i < c.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                                                          ))}
                                                        </div>
                                                        <p className="text-gray-700 mt-1 line-clamp-2">{c.review}</p>
                                                      </div>
                                                    ) : (
                                                      <Button
                                                        size="sm"
                                                        className="w-full bg-primary text-white text-xs h-6"
                                                        onClick={(e) => {
                                                          e.stopPropagation();
                                                          setReviewingCandidate(c);
                                                          setReviewDialogOpen(true);
                                                        }}
                                                      >
                                                        Review
                                                      </Button>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                          </li>
                                        )}
                                      </Draggable>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    ))}
                  </div>
                  {/* Second Row - 3 Stages */}
                  <div className="flex gap-8">
                    {pipelineStages.slice(4).map((stage) => (
                      <Droppable droppableId={stage.id} key={stage.id}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            <div key={stage.id} className={`rounded-lg border min-h-[400px] ${stage.color} px-6 py-6`} style={{ width: '480px' }}> 
                              <div className="p-4 border-b">
                                <div className="flex items-center justify-between mb-1">
                                  <h3 className="font-semibold text-gray-900">{stage.label}</h3>
                                  <span className="text-sm bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                    {stage.candidates.length}
                                  </span>
                                </div>
                              </div>
                              <div className="p-4">
                                {stage.candidates.length === 0 ? (
                                  <p className="text-sm text-gray-400 italic text-center py-8">
                                    No candidates in this stage
                                  </p>
                                ) : (
                                  <ul className="space-y-2">
                                    {stage.candidates.map((c, index) => (
                                      <Draggable draggableId={String(c.id)} index={index} key={c.id}>
                                        {(provided) => (
                                          <li 
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <div 
                                              className="bg-white rounded-lg shadow-md p-3 space-y-2 hover:shadow-lg transition-shadow cursor-pointer"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setDetailCandidate(c);
                                                setCandidateDetailDialog(true);
                                              }}
                                            >
                                              <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                                                    <User className="w-3 h-3 text-primary" />
                                                  </div>
                                                  <h4 className="font-semibold text-sm text-gray-900 truncate">
                                                    {c.name}
                                                  </h4>
                                                </div>
                                                {(stage.id === 'talentAcquisition' || stage.id === 'leadership') && c.review && (
                                                  <Badge variant="outline" className="text-xs text-green-600 border-green-300 bg-green-50 px-1.5 py-0">
                                                    ✓
                                                  </Badge>
                                                )}
                                              </div>
                                              
                                              <div className="text-xs text-gray-500 truncate">{c.email}</div>

                                              {/* Show scheduled interview info */}
                                              {c.interview?.scheduled && (
                                                <div className="bg-blue-50 border border-blue-200 rounded p-2 text-xs">
                                                  <div className="flex items-center gap-1 text-blue-700 mb-1">
                                                    <Calendar className="w-3 h-3" />
                                                    <span className="font-semibold">Scheduled</span>
                                                  </div>
                                                  <div className="text-gray-700">
                                                    <div>{new Date(c.interview.date).toLocaleDateString()}</div>
                                                    <div>{c.interview.time}</div>
                                                    <div className="truncate">With: {c.interview.interviewer.name}</div>
                                                  </div>
                                                </div>
                                              )}

                                              {/* Show offer info for Offer stage */}
                                              {stage.id === 'offer' && c.offer && (
                                                <div className="bg-green-50 border border-green-200 rounded p-2 text-xs">
                                                  <div className="flex items-center gap-1 text-green-700 mb-1">
                                                    <Briefcase className="w-3 h-3" />
                                                    <span className="font-semibold">Offer Sent</span>
                                                  </div>
                                                  <div className="text-gray-700">
                                                    <div className="truncate">{c.offer.position}</div>
                                                    <div>{c.offer.salary}</div>
                                                    <div>Status: {c.offer.status}</div>
                                                  </div>
                                                </div>
                                              )}

                                              {/* Show review for Talent Acquisition and Leadership */}
                                              {(stage.id === 'talentAcquisition' || stage.id === 'leadership') && (
                                                <div>
                                                  {c.review ? (
                                                    <div 
                                                      className="flex items-center gap-1"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setViewReviewCandidate(c);
                                                      }}
                                                    >
                                                      {[...Array(5)].map((_, i) => (
                                                        <span key={i} className={`text-xs ${i < c.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                                                      ))}
                                                    </div>
                                                  ) : (
                                                    <Button
                                                      size="sm"
                                                      className="w-full bg-primary text-white text-xs h-6"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        setReviewingCandidate(c);
                                                        setReviewDialogOpen(true);
                                                      }}
                                                    >
                                                      Review
                                                    </Button>
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          </li>
                                        )}
                                      </Draggable>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    ))}
                  </div>
                </DragDropContext>
              </div>
              )}

              {/* Table View */}
              {viewMode === "table" && (
                <div className="w-full overflow-x-auto">
                  <table className="w-full border-collapse bg-white rounded-lg shadow">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border p-3 text-left font-semibold">Candidate</th>
                        <th className="border p-3 text-left font-semibold">Email</th>
                        <th className="border p-3 text-left font-semibold">Stage</th>
                        <th className="border p-3 text-left font-semibold">Status</th>
                        <th className="border p-3 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pipelineStages.flatMap(stage => 
                        stage.candidates.map(candidate => (
                          <tr key={candidate.id} className="hover:bg-gray-50">
                            <td className="border p-3">{candidate.name}</td>
                            <td className="border p-3">{candidate.email}</td>
                            <td className="border p-3">
                              <Badge className={`${
                                stage.id === 'toContact' ? 'bg-blue-100 text-blue-800' :
                                stage.id === 'talentAcquisition' ? 'bg-purple-100 text-purple-800' :
                                stage.id === 'technical' ? 'bg-yellow-100 text-yellow-800' :
                                stage.id === 'leadership' ? 'bg-orange-100 text-orange-800' :
                                stage.id === 'offer' ? 'bg-pink-100 text-pink-800' :
                                stage.id === 'rejectedOffers' ? 'bg-red-100 text-red-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {stage.label}
                              </Badge>
                            </td>
                            <td className="border p-3">
                              {candidate.review || candidate.technicalReview ? (
                                <Badge className="bg-green-100 text-green-800">Reviewed</Badge>
                              ) : candidate.interview?.scheduled ? (
                                <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                              ) : (
                                <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
                              )}
                            </td>
                            <td className="border p-3">
                              <Button
                                size="sm"
                                onClick={() => {
                                  setDetailCandidate(candidate);
                                  setCandidateDetailDialog(true);
                                }}
                                className="bg-primary text-white"
                              >
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Maybe Tab */}
          <TabsContent value="maybe" className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              {(currentJobData.maybe && currentJobData.maybe.length > 0) ? (
                currentJobData.maybe.map((candidate) => (
                  <div key={candidate.id} className="bg-white border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <AlertCircle className="w-6 h-6 text-yellow-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-gray-500">Keep for consideration</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic text-center py-8">No candidates kept for consideration.</p>
              )}
            </div>
          </TabsContent>

          {/* Rejected Tab */}
          <TabsContent value="rejected" className="mt-0">
            <div className="flex gap-4 overflow-x-auto">
              {(currentJobData.Rejected && currentJobData.Rejected.length > 0) ? (
                currentJobData.Rejected.map((candidate) => (
                  <div key={candidate.id} className="bg-white border rounded-lg p-4 min-w-[300px]">
                    <div className="flex items-center gap-4">
                      <XCircle className="w-6 h-6 text-red-600" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-gray-500">Candidate refused or was rejected</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic text-center py-8">No rejected candidates.</p>
              )}
            </div>
          </TabsContent>

          {/* Archived Tab */}
          <TabsContent value="archived" className="mt-0">
            <div className="bg-white rounded-lg border p-16 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Archived Applications</h3>
                  <p className="text-gray-500">Archived applications will appear here.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Interview Review for {reviewingCandidate?.name}</DialogTitle>
            <DialogDescription>
              Provide your rating and detailed feedback on the candidate's interview performance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setReviewRating(rating)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        rating <= reviewRating
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {reviewRating} out of 5
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Notes
              </label>
              <Textarea
                placeholder="Share your thoughts on this candidate's interview performance, strengths, areas for improvement, and overall impression..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="min-h-[200px] resize-none"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setReviewDialogOpen(false);
                setReviewText("");
                setReviewRating(3);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              className="bg-primary text-white"
              disabled={!reviewText.trim()}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Review Dialog */}
      <Dialog open={!!viewReviewCandidate} onOpenChange={() => setViewReviewCandidate(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Interview Review - {viewReviewCandidate?.name}</DialogTitle>
            <DialogDescription>
              View the interview review and candidate information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Rating:</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < (viewReviewCandidate?.rating || 0)
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({viewReviewCandidate?.rating || 0}/5)
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  Reviewed: {viewReviewCandidate?.reviewedAt}
                </span>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Review Notes:</h4>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {viewReviewCandidate?.review}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Candidate Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{viewReviewCandidate?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>{viewReviewCandidate?.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{viewReviewCandidate?.location}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setViewReviewCandidate(null)}
              className="bg-primary text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Candidate Detail Dialog with Actions */}
      <Dialog open={candidateDetailDialog} onOpenChange={setCandidateDetailDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Candidate Details - {detailCandidate?.name}</DialogTitle>
            <DialogDescription>
              View candidate information, interview reviews, and available actions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {/* Candidate Info */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{detailCandidate?.name}</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-1 text-gray-700">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{detailCandidate?.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-700">
                      <Phone className="w-3 h-3" />
                      <span className="truncate">{detailCandidate?.phone}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-700">
                      <Briefcase className="w-3 h-3" />
                      <span className="truncate">{detailCandidate?.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Status */}
            <div className="bg-blue-50 rounded-lg p-2 border border-blue-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-gray-900 text-xs">Current Stage:</span>
              <Badge className="bg-blue-600 text-white text-xs px-2 py-0.5">
                {pipelineStages.find(s => s.id === detailCandidate?.stage)?.label || 'Unknown'}
              </Badge>
            </div>

            {/* AI Match Score */}
            {detailCandidate?.matchScore && (
              <div className="bg-red-50 rounded-lg p-2 border border-red-200 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <BarChart3 className="w-4 h-4 text-red-500" />
                  <span className="font-semibold text-gray-900 text-xs">AI Match Score</span>
                </div>
                <span className="text-lg font-bold text-red-500">{detailCandidate.matchScore}%</span>
              </div>
            )}

            {/* Scheduled Interview Info */}
            {detailCandidate?.interview?.scheduled && (
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-xs flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Scheduled Interview
                </h4>
                <div className="space-y-1 text-xs text-gray-700">
                  <div><strong>Date:</strong> {new Date(detailCandidate.interview.date).toLocaleDateString()}</div>
                  <div><strong>Time:</strong> {detailCandidate.interview.time}</div>
                  <div><strong>Interviewer:</strong> {detailCandidate.interview.interviewer.name}</div>
                  <div><strong>Role:</strong> {detailCandidate.interview.interviewer.role}</div>
                  <div><strong>Email:</strong> {detailCandidate.interview.interviewer.email}</div>
                </div>
              </div>
            )}

            {/* Interview Reviews Section - Show all completed reviews */}
            {/* Debug: See console for detailCandidate review data */}
            <div className="space-y-3">
              {/* TA Review - Show in Technical and beyond (not in TA stage itself) */}
              {(detailCandidate?.talentAcquisitionReview || detailCandidate?.review) && (detailCandidate?.stage === 'technical' || detailCandidate?.stage === 'leadership' || detailCandidate?.stage === 'offer' || detailCandidate?.stage === 'rejectedOffers' || detailCandidate?.stage === 'hired') && (
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-1 text-xs flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Talent Acquisition Review
                  </h4>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (detailCandidate.talentAcquisitionRating || detailCandidate.rating || 0)
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-600">({detailCandidate.talentAcquisitionRating || detailCandidate.rating || 0}/5)</span>
                  </div>
                  <p className="text-gray-700 text-xs whitespace-pre-wrap">{detailCandidate.talentAcquisitionReview || detailCandidate.review}
</p>
                  <p className="text-xs text-gray-500 mt-1">Reviewed: {detailCandidate.talentAcquisitionReviewedAt || detailCandidate.reviewedAt}</p>
                </div>
              )}

              {/* Technical Review - Show in Leadership and beyond (not in Technical stage itself) */}
              {detailCandidate?.technicalReview && (detailCandidate?.stage === 'leadership' || detailCandidate?.stage === 'offer' || detailCandidate?.stage === 'rejectedOffers' || detailCandidate?.stage === 'hired') && (
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-1 text-xs flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Technical Interviewer Review
                  </h4>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (detailCandidate.technicalRating || 0)
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-600">({detailCandidate.technicalRating || 0}/5)</span>
                  </div>
                  <p className="text-gray-700 text-xs whitespace-pre-wrap">{detailCandidate.technicalReview}
</p>
                  <p className="text-xs text-gray-500 mt-1">Reviewed: {detailCandidate.technicalReviewedAt || new Date().toLocaleDateString()}</p>
                </div>
              )}

              {/* Leadership Review - Show in Offer and beyond (not in Leadership stage itself) */}
              {detailCandidate?.leadershipReview && (detailCandidate?.stage === 'offer' || detailCandidate?.stage === 'rejectedOffers' || detailCandidate?.stage === 'hired') && (
                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-1 text-xs flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Leadership Review
                  </h4>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (detailCandidate.leadershipRating || 0)
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-600">({detailCandidate.leadershipRating || 0}/5)</span>
                  </div>
                  <p className="text-gray-700 text-xs whitespace-pre-wrap">{detailCandidate.leadershipReview}
</p>
                  <p className="text-xs text-gray-500 mt-1">Reviewed: {detailCandidate.leadershipReviewedAt || new Date().toLocaleDateString()}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2 border-t">
              <h4 className="font-semibold text-gray-900 mb-2 text-xs">Actions</h4>
              {/* Show Send Offer button for Leadership stage, otherwise Move to Next Stage */}
              {detailCandidate?.stage === 'leadership' ? (
                <Button
                  onClick={() => {
                    setOfferCandidate(detailCandidate);
                    setOfferDetails({
                      candidateName: detailCandidate.name,
                      candidateEmail: detailCandidate.email,
                      candidatePhone: detailCandidate.phone,
                      position: selectedJob.title || "Software Engineer",
                      salary: "",
                      startDate: "",
                      benefits: "",
                      workLocation: "Office/Remote",
                      contractType: "Full-time"
                    });
                    setOfferGenerated(false);
                    setGenerateOfferDialog(true);
                    setCandidateDetailDialog(false);
                  }}
                  className="w-full bg-gradient-primary hover:bg-orange-600 text-white hover:text-white text-xs py-2"
                >
                  <Briefcase className="w-4 h-4 mr-1" />
                  Send Offer
                </Button>
              ) : detailCandidate?.stage === 'technical' ? (
                <>
                  <Button
                    onClick={() => handleMoveToNextStage(detailCandidate)}
                    className="w-full bg-gradient-primary hover:bg-orange-600 text-white hover:text-white text-xs py-2"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Move to Leadership Interview
                  </Button>
                  <Button
                    onClick={() => {
                      // Skip Leadership and go directly to Offer
                      setOfferCandidate(detailCandidate);
                      setOfferDetails({
                        candidateName: detailCandidate?.name || '',
                        candidateEmail: detailCandidate?.email || '',
                        candidatePhone: detailCandidate?.phone || '',
                        position: selectedJob.title || "Software Engineer",
                        salary: "",
                        startDate: "",
                        benefits: "",
                        workLocation: "Office/Remote",
                        contractType: "Full-time"
                      });
                      setOfferGenerated(false);
                      setGenerateOfferDialog(true);
                      setCandidateDetailDialog(false);
                    }}
                    variant="outline"
                    className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700 text-xs py-2"
                  >
                    <Briefcase className="w-4 h-4 mr-1" />
                    Skip to Offer (Optional)
                  </Button>
                </>
              ) : detailCandidate?.stage === 'offer' ? (
                <div className="text-xs text-gray-500 text-center py-2">
                  Waiting for candidate response...
                </div>
              ) : detailCandidate?.stage === 'hired' ? (
                <div className="text-xs text-green-600 text-center py-2 font-medium">
                  ✓ Candidate successfully hired
                </div>
              ) : detailCandidate?.stage === 'rejectedOffers' ? (
                <div className="text-xs text-red-600 text-center py-2 font-medium">
                  Candidate rejected offer
                </div>
              ) : (
                <Button
                  onClick={() => handleMoveToNextStage(detailCandidate)}
                  className="w-full bg-gradient-primary hover:bg-orange-600 text-white hover:text-white text-xs py-2"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Move to Next Stage
                </Button>
              )}
              {/* Archive Button - Hide for To Contact, Rejected Offers, and Hired stages */}
              {detailCandidate?.stage !== 'toContact' && detailCandidate?.stage !== 'rejectedOffers' && detailCandidate?.stage !== 'hired' && (
                <Button
                  onClick={() => handleArchiveCandidate(detailCandidate)}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-700 text-xs py-2"
                >
                  <Archive className="w-4 h-4 mr-1" />
                  Move to Archive
                </Button>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setCandidateDetailDialog(false);
                setDetailCandidate(null);
              }}
              className="text-xs"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Interview Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Schedule {interviewType === 'talentAcquisition' ? 'Talent Acquisition' : interviewType === 'technical' ? 'Technical' : 'Leadership'} Interview
            </DialogTitle>
            <DialogDescription>
              Select interviewer, date, time, and interview format for this candidate
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Candidate Info */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{schedulingCandidate?.name}</h4>
                  <p className="text-sm text-gray-600">{schedulingCandidate?.email}</p>
                </div>
              </div>
            </div>

            {/* Show Interviewer Selection ONLY when moving from Talent Acquisition to Technical */}
            {schedulingCandidate?.stage === 'talentAcquisition' && interviewType === 'technical' && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Select Technical Interviewer
                </label>
                <Select value={selectedInterviewer} onValueChange={setSelectedInterviewer}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Choose an interviewer..." />
                  </SelectTrigger>
                  <SelectContent>
                    {interviewers.map((interviewer) => (
                      <SelectItem key={interviewer.id} value={String(interviewer.id)}>
                        <div className="flex flex-col py-1">
                          <span className="font-medium text-gray-900">{interviewer.name}</span>
                          <span className="text-xs text-gray-500">{interviewer.role}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Show Leadership Role Selection when moving from Technical to Leadership */}
            {schedulingCandidate?.stage === 'technical' && interviewType === 'leadership' && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Select Leadership Role
                </label>
                <Select value={selectedInterviewer} onValueChange={setSelectedInterviewer}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Choose leadership role..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cto">
                      <div className="flex flex-col py-1">
                        <span className="font-medium text-gray-900">CTO</span>
                        <span className="text-xs text-gray-500">Chief Technology Officer</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="ceo">
                      <div className="flex flex-col py-1">
                        <span className="font-medium text-gray-900">CEO</span>
                        <span className="text-xs text-gray-500">Chief Executive Officer</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="coo">
                      <div className="flex flex-col py-1">
                        <span className="font-medium text-gray-900">COO</span>
                        <span className="text-xs text-gray-500">Chief Operating Officer</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="vp-engineering">
                      <div className="flex flex-col py-1">
                        <span className="font-medium text-gray-900">VP of Engineering</span>
                        <span className="text-xs text-gray-500">Vice President of Engineering</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="director">
                      <div className="flex flex-col py-1">
                        <span className="font-medium text-gray-900">Director</span>
                        <span className="text-xs text-gray-500">Engineering Director</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Show "You are the interviewer" for other stages */}
            {!(schedulingCandidate?.stage === 'talentAcquisition' && interviewType === 'technical') && !(schedulingCandidate?.stage === 'technical' && interviewType === 'leadership') && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">You are the interviewer</h4>
                  <p className="text-xs text-gray-600">This interview will be conducted by you</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Select Date */}
              <div>
                <label className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Select Date
                </label>
                <div className="border-2 border-orange-200 rounded-lg p-4 bg-white shadow-sm hover:border-primary transition-colors">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-md"
                  />
                </div>
              </div>

              {/* Select Time - Clock/Time Picker */}
              <div>
                <label className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Select Time (Hours & Minutes)
                </label>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Hours</label>
                      <select
                        value={selectedHours}
                        onChange={(e) => {
                          setSelectedHours(e.target.value);
                          setSelectedTime(`${e.target.value}:${selectedMinutes}`);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={String(i).padStart(2, '0')}>
                            {String(i).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 mb-1 block">Minutes</label>
                      <select
                        value={selectedMinutes}
                        onChange={(e) => {
                          setSelectedMinutes(e.target.value);
                          setSelectedTime(`${selectedHours}:${e.target.value}`);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {[0, 15, 30, 45].map((min) => (
                          <option key={min} value={String(min).padStart(2, '0')}>
                            {String(min).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <p className="text-sm font-semibold text-blue-900">
                      Selected Time: <span className="text-lg">{selectedHours}:{selectedMinutes}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conflict Warning */}
            {selectedDate && selectedTime && selectedInterviewer && selectedInterviewer !== "self" && checkInterviewConflict(selectedDate, selectedTime, selectedInterviewer) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 text-sm">Scheduling Conflict Detected</h4>
                  <p className="text-sm text-red-700">
                    {interviewers.find(i => i.id === parseInt(selectedInterviewer))?.name} already has an interview scheduled at this time. Please choose a different time slot.
                  </p>
                </div>
              </div>
            )}

            {/* Summary with Interview Link Generation */}
            {selectedDate && selectedTime && (!selectedInterviewer || selectedInterviewer === "self" || !checkInterviewConflict(selectedDate, selectedTime, selectedInterviewer)) && (
              <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Interview Summary
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                      <span className="font-medium min-w-[120px]">Candidate:</span>
                      <span>{schedulingCandidate?.name}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium min-w-[120px]">Type:</span>
                      <span>{interviewType === 'talentAcquisition' ? 'Talent Acquisition' : interviewType === 'technical' ? 'Technical' : 'Leadership'} Interview</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium min-w-[120px]">Interviewer:</span>
                      <span>
                        {selectedInterviewer === "self" 
                          ? "You (Employer)" 
                          : interviewers.find(i => i.id === parseInt(selectedInterviewer))?.name || "Select Interviewer"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium min-w-[120px]">Date:</span>
                      <span>{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium min-w-[120px]">Time:</span>
                      <span>{selectedHours}:{selectedMinutes}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <div className="w-full flex gap-2 justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setScheduleDialogOpen(false);
                    setSchedulingCandidate(null);
                    setSelectedDate(null);
                    setSelectedTime("");
                    setSelectedInterviewer("");
                    setInterviewType("");
                  }}
                >
                  Cancel
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    // Generate the Meet link, show it, and immediately schedule (move to next stage), but do not open
                    const meetLink = `https://meet.google.com/new`;
                    setInterviewLink(meetLink);
                    setTimeout(() => {
                      handleScheduleInterview();
                    }, 500);
                  }}
                  className="bg-gradient-primary text-white"
                  disabled={!selectedDate || !selectedTime || (schedulingCandidate?.stage === 'talentAcquisition' && interviewType === 'technical' && (!selectedInterviewer || checkInterviewConflict(selectedDate, selectedTime, selectedInterviewer)))}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Generate Meet Link & Schedule
                </Button>
                {interviewLink && (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      value={interviewLink}
                      readOnly
                      className="text-xs px-2 py-1 border border-gray-200 rounded bg-gray-50 flex-1 overflow-x-auto"
                    />
                    <a
                      href={interviewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Open
                    </a>
                  </div>
                )}
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Generate Offer Dialog */}
      <Dialog open={generateOfferDialog} onOpenChange={setGenerateOfferDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Generate Offer - {offerCandidate?.name}
            </DialogTitle>
            <DialogDescription>
              Create and customize an employment offer for this candidate
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
            {/* Offer Form */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Candidate Information
                </h4>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><strong>Name:</strong> {offerCandidate?.name}</p>
                  <p><strong>Email:</strong> {offerCandidate?.email}</p>
                  <p><strong>Phone:</strong> {offerCandidate?.phone}</p>
                  <p><strong>Applied for:</strong> {selectedJob?.title}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Offer Details</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input
                      type="text"
                      value={offerDetails.position}
                      onChange={(e) => setOfferDetails({...offerDetails, position: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Job title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                    <input
                      type="text"
                      value={offerDetails.salary}
                      onChange={(e) => setOfferDetails({...offerDetails, salary: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., $80,000/year"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={offerDetails.startDate}
                      onChange={(e) => setOfferDetails({...offerDetails, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
                    <select
                      value={offerDetails.contractType}
                      onChange={(e) => setOfferDetails({...offerDetails, contractType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelancer">Freelancer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Location</label>
                  <input
                    type="text"
                    value={offerDetails.workLocation}
                    onChange={(e) => setOfferDetails({...offerDetails, workLocation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Office, Remote, Hybrid"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Benefits & Perks</label>
                  <textarea
                    value={offerDetails.benefits}
                    onChange={(e) => setOfferDetails({...offerDetails, benefits: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
                    placeholder="Health insurance, vacation days, stock options, etc."
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleGenerateOffer}
                    className="bg-primary text-white"
                    disabled={!offerDetails.salary || !offerDetails.startDate}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Generate Offer
                  </Button>
                  <Button
                    onClick={handleScheduleInterview}
                    className="bg-gradient-primary text-white"
                    disabled={!selectedDate || !selectedTime || !interviewLink || (schedulingCandidate?.stage === 'talentAcquisition' && interviewType === 'technical' && (!selectedInterviewer || checkInterviewConflict(selectedDate, selectedTime, selectedInterviewer)))}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Interview
                  </Button>
                </div>
              </div>
            </div>

            {/* Offer Preview */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                Offer Preview
              </h4>
              
              {offerGenerated ? (
                <div className="bg-white border-2 border-gray-300 rounded-lg p-6 shadow-sm min-h-[600px]">
                  {/* Company Header */}
                  <div className="border-b border-gray-200 pb-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                        <Briefcase className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">TalentsHub</h3>
                        <p className="text-gray-600">Technology Solutions Company</p>
                      </div>
                    </div>
                  </div>

                  {/* Offer Content */}
                  <div className="space-y-6 text-sm">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Job Offer Letter</h4>
                      <p className="text-gray-700">Date: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div>
                      <p className="text-gray-700 mb-4">Dear {offerCandidate?.name},</p>
                      <p className="text-gray-700 mb-4">
                        We are pleased to offer you the position of <strong>{offerDetails.position}</strong> at TalentsHub. 
                        We believe your skills and experience will be a valuable addition to our team.
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <h5 className="font-semibold text-gray-900">Position Details:</h5>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div><strong>Position:</strong> {offerDetails.position}</div>
                        <div><strong>Salary:</strong> {offerDetails.salary}</div>
                        <div><strong>Start Date:</strong> {new Date(offerDetails.startDate).toLocaleDateString()}</div>
                        <div><strong>Employment Type:</strong> {offerDetails.contractType}</div>
                        <div className="col-span-2"><strong>Work Location:</strong> {offerDetails.workLocation}</div>
                      </div>
                    </div>

                    {offerDetails.benefits && (
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Benefits & Perks:</h5>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-gray-700 text-sm whitespace-pre-line">{offerDetails.benefits}</p>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-gray-700 text-sm mb-4">
                        Please confirm your acceptance by replying to this offer. We look forward to welcoming you to the TalentsHub team!
                      </p>
                      <div className="space-y-2 text-sm">
                        <p><strong>Best regards,</strong></p>
                        <p>HR Department</p>
                        <p>TalentsHub</p>
                        <p className="text-gray-600">hr@talentshub.com | +1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Download className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Offer Preview</h4>
                  <p className="text-gray-500">Fill in the offer details and click "Generate Offer" to see the preview</p>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setGenerateOfferDialog(false);
                setOfferCandidate(null);
                setOfferDetails({
                  candidateName: '',
                  candidateEmail: '',
                  candidatePhone: '',
                  position: '',
                  salary: '',
                  startDate: '',
                  benefits: '',
                  workLocation: '',
                  contractType: 'Full-time'
                });
                setOfferGenerated(false);
              }}
            >
              Cancel
            </Button>
            {offerGenerated && (
              <Button onClick={handleSendOffer} className="bg-green-600 text-white hover:bg-green-700">
                <Mail className="w-4 h-4 mr-2" />
                Send Offer & Move to Offer Stage
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Services Dialog */}
      <Dialog open={servicesDialogOpen} onOpenChange={setServicesDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-orange-500" />
              Services by {selectedCandidateServices?.name}
            </DialogTitle>
            <DialogDescription>
              Explore professional services offered by this candidate
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            {selectedCandidateServices?.services && selectedCandidateServices.services.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {selectedCandidateServices.services.map((service) => {
                  const getIconComponent = (iconName) => {
                    const icons = {
                      Code, Palette, PenTool, Smartphone, TrendingUp, FileText, 
                      Languages, Music, Camera, Megaphone, Globe, Briefcase
                    };
                    return icons[iconName] || Briefcase;
                  };
                  const IconComponent = getIconComponent(service.icon);
                  
                  return (
                    <div
                      key={service.id}
                      className="group border border-orange-100 shadow-sm hover:shadow-lg transition-all duration-200 bg-white rounded-xl overflow-hidden flex flex-col"
                    >
                      <div className="p-6 pb-4 border-b border-orange-100 bg-white">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-7 h-7 text-orange-500" />
                          </div>
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {service.description}
                        </p>
                      </div>
                      <div className="p-6 space-y-4 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Badge className="bg-orange-50 text-orange-700 border-orange-200">
                            {service.category}
                          </Badge>
                          <span>·</span>
                          <Clock className="w-3 h-3" />
                          <span>{service.deliveryTime}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">{service.rating}</span>
                          <span className="text-gray-500">({service.reviews} reviews)</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {service.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-orange-50 text-orange-700 px-2.5 py-1 rounded-md text-xs font-medium border border-orange-100"
                            >
                              {tag}
                            </span>
                          ))}
                          {service.tags.length > 3 && (
                            <span className="text-xs text-gray-400 pt-1">+{service.tags.length - 3} more</span>
                          )}
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-orange-100">
                          <div>
                            <span className="text-2xl font-bold text-orange-600">${service.startingPrice}</span>
                            <span className="text-xs text-gray-500 block">starting at</span>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-orange-500 text-white hover:bg-orange-600"
                          >
                            <DollarSign className="w-4 h-4 mr-1" />
                            Hire
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No services available</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setServicesDialogOpen(false);
                setSelectedCandidateServices(null);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </EmployerLayout>
  );
}