import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Briefcase, Bookmark, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const jobsData = [
  {
    id: 1,
    title: "Content & Social Media Manager",
    company: "TalenTek",
    logo: "HT",
    location: "Algiers, Algeria",
    category: "Technology",
    type: "Full-Time",
    description: "TalenTek is seeking a creative and organized individual to manage our content across social media and our website. You'll help us build our presence, engage with our audience, and support our brand with simple visuals and clear communication.",
    tags: ["Digital Marketing", "Graphic Design", "Social media management", "Content writing", "Canva", "+1 more"],
    postedTime: "2 days ago",
  },
  {
    id: 2,
    title: "Mobile iOS Engineer",
    company: "Talent Hub",
    logo: "TH",
    location: "Algiers, Algeria",
    category: "It consulting",
    type: "Full-Time",
    description: "Mobile iOS Engineer Location: Algiers, Algeria Years of Experience: 1-3 years Position Level: Mid Educational Level: Master+ Contact Type: Permanent Number of Positions: 2 Description: We are seeking a highly skilled Mobile iOS Engineer to join our engineering team.",
    tags: ["iOS SDK", "Swift", "SwiftUI"],
    postedTime: "about 1 month ago",
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "Talent Hub",
    logo: "TH",
    location: "Algiers, Algeria",
    category: "It consulting",
    type: "Full-Time",
    description: "Full Stack Engineer Location: Algiers, Algeria Years of Experience: 1-3 years Position Level: Mid Educational Level: Master+ Contact Type: Permanent Number of Positions: 5 Description: We are seeking a highly skilled Full Stack Engineer to join our Engineering team.",
    tags: ["Java script", "react"],
    postedTime: "about 1 month ago",
  },
];

export default function Jobs() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        {/* Search Section */}
        <div className="bg-gradient-to-r from-primary to-orange-600 py-8 mt-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-4">
              <div className="flex-1 bg-white rounded-lg flex items-center px-4 py-3">
                <Briefcase className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Job title or keyword..."
                  className="flex-1 outline-none"
                />
              </div>
              <div className="flex-1 bg-white rounded-lg flex items-center px-4 py-3">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Location"
                  className="flex-1 outline-none"
                />
              </div>
              <button className="bg-white hover:bg-gray-50 text-primary px-8 py-3 rounded-lg font-semibold shadow transition">
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className="w-64 bg-white rounded-xl shadow-sm p-6 h-fit">
            <h3 className="text-lg font-bold mb-4">Filter Jobs</h3>

            {/* Suggested Filters */}
            <div className="mb-6">
              <h4 className="text-primary font-semibold mb-3 flex items-center gap-2">
                <span className="text-xl">✨</span> Suggested Filters
              </h4>
              <div className="space-y-2">
                <div className="text-sm">
                  <p className="font-medium mb-1">Job Level</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">Mid Level (6)</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">Senior Level (6)</span>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">Employment Type</p>
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">Full-time (13)</span>
                </div>
              </div>
              <button className="text-primary text-sm mt-2 flex items-center gap-1">
                Show more suggestions →
              </button>
            </div>

            {/* Job Types */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Job Types</h4>
              <label className="flex items-center gap-2 text-sm mb-2">
                <input type="checkbox" className="rounded" />
                Full-time
              </label>
            </div>

            {/* Industry */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Industry</h4>
              <label className="flex items-center gap-2 text-sm mb-2">
                <input type="checkbox" className="rounded" />
                It consulting
              </label>
              <label className="flex items-center gap-2 text-sm mb-2">
                <input type="checkbox" className="rounded" />
                Technology
              </label>
              <label className="flex items-center gap-2 text-sm mb-2">
                <input type="checkbox" className="rounded" />
                Transportation
              </label>
            </div>

            {/* Experience Level */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Experience Level</h4>
              <label className="flex items-center gap-2 text-sm mb-2">
                <input type="checkbox" className="rounded" />
                Mid Level
              </label>
              <label className="flex items-center gap-2 text-sm mb-2">
                <input type="checkbox" className="rounded" />
                Senior Level
              </label>
              <label className="flex items-center gap-2 text-sm mb-2">
                <input type="checkbox" className="rounded" />
                Entry Level
              </label>
            </div>

            <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg font-semibold">
              Apply Filters
            </button>
          </aside>

          {/* Jobs List */}
          <div className="flex-1">
            <div className="space-y-4">
              {jobsData.map((job, idx) => (
                <Link
                  key={job.id}
                  to={`/job/${job.id}`}
                  className="block bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition cursor-pointer"
                >
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {job.logo}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-primary">{job.title}</h3>
                          <p className="text-gray-600">{job.company}</p>
                        </div>
                        <span className="text-sm text-gray-500">{job.postedTime}</span>
                      </div>
                      <div className="flex gap-3 mb-3 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded">{job.category}</span>
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">{job.type}</span>
                      </div>
                      <p className="text-gray-700 mb-3 line-clamp-2">{job.description}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.tags.map((tag, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <button className="flex items-center gap-1 text-gray-600 hover:text-primary">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                        <button className="flex items-center gap-1 text-gray-600 hover:text-primary">
                          <Bookmark className="w-4 h-4" />
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
                ← Previous
              </button>
              <button className="px-3 py-2 text-sm bg-primary text-white rounded">1</button>
              <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">2</button>
              <button className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
                Next →
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
