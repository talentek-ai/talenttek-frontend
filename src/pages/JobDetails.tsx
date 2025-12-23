import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Briefcase, Clock, Share2, Bookmark, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JobDetails() {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/jobs")}
            className="flex items-center gap-2 text-primary hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            ← All Jobs
          </button>

          <div className="grid grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="col-span-2">
              {/* Job Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Content & Social Media Manager
                </h1>
                <div className="flex gap-3 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Algiers, Algeria
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded">Technology</span>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">Full-Time</span>
                  <span className="text-gray-500">2 days ago</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed">
                  <strong>TalenTek</strong> is seeking a creative and organized individual to manage our content across
                  social media and our website. You'll help us build our presence, engage with our audience, and support
                  our brand with simple visuals and clear communication.
                </p>
              </div>

              {/* What you'll do */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What you'll do</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Create and publish content for LinkedIn, Instagram, X, and other channels
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Write captions, short posts, and simple blog-style content
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Update and push content on the website (news, pages, announcements)
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Handle daily social media activity: posting, engagement, replying to messages
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Create simple visuals using Canva, Figma, or similar
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Support community growth and conversations
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Bring ideas to help strengthen our brand and reach
                  </li>
                </ul>
              </div>

              {/* What we're looking for */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What we're looking for</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Experience in content creation and social media
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Strong writing skills in English (French/Arabic is a plus)
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Basic graphic design skills
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Ability to work independently and stay organised
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Interest in startups, tech, or talent ecosystems is a plus
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Comfortable working fully remote
                  </li>
                </ul>
              </div>

              {/* Nice to have */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Nice to have</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Video editing (short clips)
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Experience with community management
                  </li>
                </ul>
              </div>

              {/* What we offer */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What we offer</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Full-time freelance contract
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Remote and flexible work
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    Opportunity to grow with an early-stage startup
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">•</span>
                    High ownership and impact
                  </li>
                </ul>
              </div>

              {/* Required Skills */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {["Digital Marketing", "Graphic Design", "Social media management", "Content writing", "Canva", "Adobe Suite"].map(skill => (
                    <span key={skill} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold text-lg">
                Apply for this position
              </button>
            </div>

            {/* Sidebar */}
            <div>
              {/* Company Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="w-16 h-16 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-2xl mb-4">
                  HT
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">TalenTek</h3>
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-yellow-400">★</span>
                  <span className="font-semibold">4.2</span>
                  <span className="text-gray-500 text-sm">1.2k reviews</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  AI-driven platform helping startups hire African product and tech talent better. TalenTek connects skilled professionals with companies for growth, matching people to roles that align with their skills, experience, and interests.
                </p>
                <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg font-semibold mb-4">
                  Apply for this position
                </button>
              </div>

              {/* Job Alerts */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-2">Want to receive job alerts for similar jobs?</h3>
                <button className="w-full border border-primary text-primary hover:bg-primary/5 py-2 rounded-lg font-semibold">
                  Get Job Alerts
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:text-primary py-2">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 ${isSaved ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                  <span className="text-sm">Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
