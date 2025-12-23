import EmployerLayout from "@/components/layouts/EmployerLayout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, User, Mail, Phone, Briefcase, Edit, Trash2, Plus, AlertTriangle } from "lucide-react";

const initialInterviewers = [
  {
    id: "1",
    full_name: "Amina Bensalem",
    expertise: ["Frontend", "React"],
    email: "amina@example.com",
    rating: 4.8,
    active: true,
    interviewType: "technical",
    role: "senior_engineer",
  },
  {
    id: "2",
    full_name: "Yacine Amrani",
    expertise: ["Behavioral", "Recruitment"],
    email: "yacine@example.com",
    rating: 4.2,
    active: false,
    interviewType: "leadership",
    role: "ceo",
  },
];

export default function EmployerInterviewers() {
  const [interviewers, setInterviewers] = useState(initialInterviewers);
  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [interviewerToDelete, setInterviewerToDelete] = useState(null);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [form, setForm] = useState({
    full_name: "",
    expertise: "",
    email: "",
    password: "",
    active: true,
    interviewType: "",
    role: "",
  });

  function handleFormChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleAddInterviewer(e) {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.password) {
      alert("Please fill in all required fields");
      return;
    }
    
    // Here you would send email with credentials
    console.log("Sending interview credentials to:", form.email);
    
    setInterviewers([
      {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        full_name: form.full_name,
        expertise: form.expertise.split(",").map((s) => s.trim()).filter(Boolean),
        email: form.email,
        rating: 4.5,
        active: form.active,
        interviewType: form.interviewType,
        role: form.role,
      },
      ...interviewers,
    ]);
    setForm({ full_name: "", expertise: "", email: "", password: "", active: true, interviewType: "", role: "" });
    setOpen(false);
  }

  function handleEditInterviewer(interviewer) {
    setSelectedInterviewer(interviewer);
    setForm({
      full_name: interviewer.full_name,
      expertise: Array.isArray(interviewer.expertise) ? interviewer.expertise.join(", ") : "",
      email: interviewer.email,
      password: "",
      active: interviewer.active,
      interviewType: interviewer.interviewType || "",
      role: interviewer.role || "",
    });
    setEditDialogOpen(true);
  }

  function handleUpdateInterviewer(e) {
    e.preventDefault();
    if (!form.full_name || !form.email) {
      alert("Please fill in all required fields");
      return;
    }

    setInterviewers(interviewers.map(i => 
      i.id === selectedInterviewer.id 
        ? {
            ...i,
            full_name: form.full_name,
            expertise: form.expertise.split(",").map((s) => s.trim()).filter(Boolean),
            active: form.active,
            interviewType: form.interviewType,
            role: form.role,
          }
        : i
    ));
    setForm({ full_name: "", expertise: "", email: "", password: "", active: true, interviewType: "", role: "" });
    setEditDialogOpen(false);
    setSelectedInterviewer(null);
  }

  function handleDeleteInterviewer(id) {
    setInterviewerToDelete(id);
    setDeleteDialogOpen(true);
  }

  function confirmDeleteInterviewer() {
    if (interviewerToDelete) {
      setInterviewers(interviewers.filter(i => i.id !== interviewerToDelete));
      setDeleteDialogOpen(false);
      setInterviewerToDelete(null);
    }
  }

  return (
    <EmployerLayout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Interviewers</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-gradient-primary text-white">
                <UserPlus className="w-5 h-5" /> Add Interviewer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl p-0">
              <DialogHeader className="p-6 pb-2">
                <DialogTitle>Add Interviewer</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddInterviewer} className="flex flex-col h-full">
                <div className="flex-1 p-6 pt-2">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 font-medium flex items-center gap-2">
                          <User className="w-4 h-4 text-orange-500" /> Full Name *
                        </label>
                        <Input name="full_name" value={form.full_name} onChange={handleFormChange} required />
                      </div>
                      <div>
                        <label className="mb-2 font-medium flex items-center gap-2">
                          <Mail className="w-4 h-4 text-orange-500" /> Email *
                        </label>
                        <Input name="email" type="email" value={form.email} onChange={handleFormChange} required />
                      </div>
                      <div>
                        <label className="mb-2 font-medium flex items-center gap-2">
                          <User className="w-4 h-4 text-orange-500" /> Password *
                        </label>
                        <Input name="password" type="password" value={form.password} onChange={handleFormChange} required />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 font-medium flex items-center gap-2">
                          <User className="w-4 h-4 text-orange-500" /> Expertise (comma separated)
                        </label>
                        <Input name="expertise" value={form.expertise} onChange={handleFormChange} placeholder="e.g. Frontend, React" />
                      </div>
                      <div>
                        <label className="mb-2 font-medium flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-orange-500" /> Interview Type *
                        </label>
                        <Select value={form.interviewType} onValueChange={(value) => setForm(prev => ({ ...prev, interviewType: value, role: "" }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select interview type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical Interview</SelectItem>
                            <SelectItem value="leadership">Leadership Interview</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {form.interviewType && (
                        <div>
                          <label className="mb-2 font-medium flex items-center gap-2">
                            <User className="w-4 h-4 text-orange-500" /> Role *
                          </label>
                          <Select value={form.role} onValueChange={(value) => setForm(prev => ({ ...prev, role: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              {form.interviewType === "leadership" ? (
                                <>
                                  <SelectItem value="cto">CTO - Chief Technology Officer</SelectItem>
                                  <SelectItem value="ceo">CEO - Chief Executive Officer</SelectItem>
                                  <SelectItem value="coo">COO - Chief Operating Officer</SelectItem>
                                  <SelectItem value="vp_engineering">VP of Engineering</SelectItem>
                                  <SelectItem value="director">Director</SelectItem>
                                </>
                              ) : (
                                <>
                                  <SelectItem value="senior_engineer">Senior Engineer</SelectItem>
                                  <SelectItem value="lead_engineer">Lead Engineer</SelectItem>
                                  <SelectItem value="tech_lead">Tech Lead</SelectItem>
                                  <SelectItem value="architect">Software Architect</SelectItem>
                                  <SelectItem value="principal_engineer">Principal Engineer</SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter className="p-4 pt-0 flex flex-row gap-2 justify-end border-t">
                  <Button type="submit" className="bg-gradient-primary text-white w-full">Add & Send Credentials</Button>
                  <DialogClose asChild>
                    <Button type="button" variant="ghost" className="w-full">Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-card bg-white">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="overflow-y-auto" style={{ maxHeight: '60vh' }}>
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Full Name</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Expertise</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Interview Type</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Role</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-border text-sm">
                  {interviewers.map((i) => (
                    <tr key={i.id} className="hover:bg-muted/30 transition">
                      <td className="px-4 py-3 whitespace-nowrap font-bold">{i.full_name}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{Array.isArray(i.expertise) ? i.expertise.join(", ") : ""}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs">{i.email}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant="outline" className={i.interviewType === "technical" ? "text-blue-600 border-blue-200 bg-blue-50" : "text-purple-600 border-purple-200 bg-purple-50"}>
                          {i.interviewType === "technical" ? "Technical" : "Leadership"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">{i.role?.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {i.active ? (
                          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Active</Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-100">Inactive</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <div className="flex items-center gap-1 justify-center">
                          <Button size="sm" variant="ghost" className="h-8 px-2" onClick={() => handleEditInterviewer(i)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 px-2 text-destructive hover:text-destructive" onClick={() => handleDeleteInterviewer(i.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-border">
            {interviewers.map((i) => (
              <div key={i.id} className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-semibold text-lg flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-500" /> {i.full_name}
                  </div>
                  {i.active ? (
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  ) : (
                    <Badge className="bg-gray-400 text-white">Inactive</Badge>
                  )}
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><User className="w-4 h-4 text-orange-500" />{Array.isArray(i.expertise) ? i.expertise.join(", ") : "-"}</div>
                  <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-orange-500" />{i.email}</div>
                  <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-orange-500" />{i.interviewType === "technical" ? "Technical" : "Leadership"} - {i.role?.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}</div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button size="icon" variant="ghost" onClick={() => handleEditInterviewer(i)}><Edit className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDeleteInterviewer(i.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-3xl p-0">
            <DialogHeader className="p-6 pb-2">
              <DialogTitle>Edit Interviewer</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateInterviewer} className="flex flex-col h-full">
              <div className="flex-1 p-6 pt-2">
                <div className="grid grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 font-medium flex items-center gap-2">
                        <User className="w-4 h-4 text-orange-500" /> Full Name *
                      </label>
                      <Input name="full_name" value={form.full_name} onChange={handleFormChange} required />
                    </div>
                    <div>
                      <label className="mb-2 font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-orange-500" /> Email
                      </label>
                      <Input type="email" value={form.email} disabled className="bg-gray-50 cursor-not-allowed" />
                    </div>
                    <div>
                      <label className="mb-2 font-medium">Status</label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={form.active ? "default" : "outline"}
                          className={form.active ? "bg-green-600 hover:bg-green-700 text-white flex-1" : "flex-1"}
                          onClick={() => setForm(prev => ({ ...prev, active: true }))}
                        >
                          Active
                        </Button>
                        <Button
                          type="button"
                          variant={!form.active ? "default" : "outline"}
                          className={!form.active ? "bg-gray-500 hover:bg-gray-600 text-white flex-1" : "flex-1"}
                          onClick={() => setForm(prev => ({ ...prev, active: false }))}
                        >
                          Inactive
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 font-medium flex items-center gap-2">
                        <User className="w-4 h-4 text-orange-500" /> Expertise (comma separated)
                      </label>
                      <Input name="expertise" value={form.expertise} onChange={handleFormChange} placeholder="e.g. Frontend, React" />
                    </div>
                    <div>
                      <label className="mb-2 font-medium flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-orange-500" /> Interview Type *
                      </label>
                      <Select value={form.interviewType} onValueChange={(value) => setForm(prev => ({ ...prev, interviewType: value, role: "" }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select interview type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Interview</SelectItem>
                          <SelectItem value="leadership">Leadership Interview</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {form.interviewType && (
                      <div>
                        <label className="mb-2 font-medium flex items-center gap-2">
                          <User className="w-4 h-4 text-orange-500" /> Role *
                        </label>
                        <Select value={form.role} onValueChange={(value) => setForm(prev => ({ ...prev, role: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {form.interviewType === "leadership" ? (
                              <>
                                <SelectItem value="cto">CTO - Chief Technology Officer</SelectItem>
                                <SelectItem value="ceo">CEO - Chief Executive Officer</SelectItem>
                                <SelectItem value="coo">COO - Chief Operating Officer</SelectItem>
                                <SelectItem value="vp_engineering">VP of Engineering</SelectItem>
                                <SelectItem value="director">Director</SelectItem>
                              </>
                            ) : (
                              <>
                                <SelectItem value="senior_engineer">Senior Engineer</SelectItem>
                                <SelectItem value="lead_engineer">Lead Engineer</SelectItem>
                                <SelectItem value="tech_lead">Tech Lead</SelectItem>
                                <SelectItem value="architect">Software Architect</SelectItem>
                                <SelectItem value="principal_engineer">Principal Engineer</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter className="p-4 pt-0 flex flex-row gap-2 justify-end border-t">
                <Button type="submit" className="bg-gradient-primary text-white w-full">Update Interviewer</Button>
                <DialogClose asChild>
                  <Button type="button" variant="ghost" className="w-full">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Alert Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <AlertDialogTitle className="text-xl">Delete Interviewer</AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-base">
                Are you sure you want to delete this interviewer? This action cannot be undone. 
                The interviewer will be permanently removed from your system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDeleteInterviewer}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </EmployerLayout>
  );
}
