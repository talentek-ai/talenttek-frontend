import Navbar from "@/components/Navbar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Video, Users, Calendar, FileText, Eye, EyeOff, Target, TrendingUp, MessageSquare, Award } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LeadershipInterviewLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Please enter a valid password (minimum 6 characters).");
      return;
    }
    setError("");
    navigate("/leadership-interviewer/overview");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 dark:from-slate-900 dark:to-slate-800" style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)] mt-16">
        <Card className="w-full max-w-6xl shadow-2xl rounded-3xl border-2 bg-white/95 dark:bg-slate-900/95" style={{ borderColor: '#fb923c' }}>
          <div className="grid md:grid-cols-2 gap-0">
            {/* Features List - Left Side */}
            <div className="flex flex-col justify-center items-start p-12 bg-gradient-to-br from-orange-400/10 to-orange-400/5 rounded-l-3xl">
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop" 
                  alt="Leadership interview"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg mb-8"
                />
              </div>
              <CardTitle className="text-3xl font-bold mb-8" style={{ color: '#fb923c' }}>
                What You Can Do
              </CardTitle>
              <ul className="space-y-8 text-lg text-black dark:text-slate-300">
                <li className="flex items-start gap-4">
                  <Target className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#fb923c' }} />
                  <div>
                    <p className="font-semibold">Assess strategic thinking</p>
                    <p className="text-sm text-gray-700">Evaluate vision and long-term planning abilities</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Users className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#fb923c' }} />
                  <div>
                    <p className="font-semibold">Evaluate team management</p>
                    <p className="text-sm text-gray-700">Review delegation and talent development skills</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MessageSquare className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#fb923c' }} />
                  <div>
                    <p className="font-semibold">Assess communication skills</p>
                    <p className="text-sm text-gray-700">Test stakeholder management and influence</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Award className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#fb923c' }} />
                  <div>
                    <p className="font-semibold">Track leadership documentation</p>
                    <p className="text-sm text-gray-700">Manage competency assessments and feedback</p>
                  </div>
                </li>
              </ul>
              <div className="flex items-center gap-3 mt-10 p-4 bg-orange-50 rounded-xl" style={{ border: '1px solid #fed7aa' }}>
                <Video className="w-10 h-10" style={{ color: '#fb923c' }} />
                <span className="text-lg text-black font-medium">
                  We use Google Meet for all interviews
                </span>
              </div>
            </div>
            {/* Login Form - Right Side */}
            <div className="flex flex-col justify-center items-center p-12">
              <div className="flex flex-col items-center mb-8 w-full">
                <div className="w-24 h-24 rounded-full bg-orange-400 flex items-center justify-center mb-6 shadow-lg">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-center mb-3" style={{ color: '#fb923c' }}>
                  Leadership Interviewer Login
                </CardTitle>
                <p className="text-lg text-muted-foreground text-center mb-2">
                  Access your leadership assessment dashboard
                </p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6 w-full max-w-md">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-black">Email Address</label>
                  <Input
                    type="email"
                    placeholder="leadership.interviewer@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-lg py-3"
                    style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-black">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="text-lg py-3 pr-12"
                      style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
                {error && <div className="text-red-500 text-base font-medium">{error}</div>}
                <Button
                  type="submit"
                  className="w-full hover:opacity-90 text-xl py-4 shadow-lg rounded-xl"
                  style={{ background: '#fb923c', color: '#fff', fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
                >
                  Login to Dashboard
                </Button>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LeadershipInterviewLogin;
