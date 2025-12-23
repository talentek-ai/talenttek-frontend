import TechnicalInterviewLayout from "@/components/layouts/technicalInterview/TechnicalInterviewLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Star, Send, ArrowLeft, Code } from "lucide-react";

const TechnicalInterviewReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [rating, setRating] = useState(3);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = () => {
    if (!reviewText.trim()) {
      toast({
        title: "Error",
        description: "Please provide review notes",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Technical Review Submitted",
      description: "Your technical assessment has been submitted successfully.",
    });
    navigate("/technical-interviewer/interviews");
  };

  const candidate = {
    name: "Alex Chen",
    position: "Senior Backend Engineer",
    date: "2025-11-20",
    time: "10:00 AM",
    focus: "System Design & Algorithms"
  };


  return (
    <TechnicalInterviewLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/technical-interviewer/interviews")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Technical Interview Evaluation</h1>
            <p className="text-muted-foreground mt-1">Assess technical competencies and coding skills</p>
          </div>
        </div>

        {/* Candidate Info - Orange Theme */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600 p-8 text-white shadow-xl">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
          <div className="relative flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
              <Code className="w-10 h-10" />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{candidate.name}</h2>
              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">{candidate.position}</span>
                </div>
                <div className="h-4 w-px bg-white/40" />
                <span>{candidate.date} at {candidate.time}</span>
                <div className="h-4 w-px bg-white/40" />
                <span className="font-medium">{candidate.focus}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <Card className="border-2 border-orange-500 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-500/5 to-orange-500/10">
            <CardTitle className="text-xl flex items-center gap-3">
              <Star className="w-6 h-6 text-orange-500 fill-orange-500" />
              Technical Interview Review
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Overall Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 transition-colors ${
                        star <= rating
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-3 text-lg font-semibold text-gray-600">
                  {rating} out of 5
                </span>
              </div>
            </div>
            
            {/* Review Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Review Notes
              </label>
              <Textarea
                placeholder="Share your thoughts on this candidate's technical interview performance, coding skills, problem-solving abilities, strengths, areas for improvement, and overall impression..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Include details about algorithms, system design, data structures, coding quality, and problem-solving approach.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => navigate("/technical-interviewer/interviews")}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-orange-500 hover:bg-orange-600 text-white gap-2"
                disabled={!reviewText.trim()}
              >
                <Send className="w-4 h-4" />
                Submit Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TechnicalInterviewLayout>
  );
};

export default TechnicalInterviewReview;
