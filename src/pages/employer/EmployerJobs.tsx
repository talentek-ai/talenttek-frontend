import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, MapPin, Clock, MoreHorizontal, Edit, Share2, XCircle, Archive, AlertTriangle, CheckCircle, Copy } from "lucide-react";
import EmployerLayout from "@/components/layouts/EmployerLayout";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Mock data for jobs
const jobs = [
	{
		id: "2510100003",
		title: "Mobile Android Engineer",
		location: "Algiers, Algeria",
		employment_type: "full-time",
		applicants_count: 0,
		status: "Published",
	},
	{
		id: "2510100002",
		title: "Full Stack Engineer",
		location: "Algiers, Algeria",
		employment_type: "full-time",
		applicants_count: 0,
		status: "Published",
	},
	{
		id: "2510100004",
		title: "Mobile iOS Engineer",
		location: "Algiers, Algeria",
		employment_type: "full-time",
		applicants_count: 1,
		status: "Published",
	},
];

export default function EmployerJobs() {
	const [jobList, setJobList] = useState(jobs);
	const [open, setOpen] = useState(false);
	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [stage, setStage] = useState(0); // 0: Job Details, 1: Additional Info, 2: Review
	const [activeTab, setActiveTab] = useState("Posted");
	const [unpublishDialogOpen, setUnpublishDialogOpen] = useState(false);
	const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
	const [shareDialogOpen, setShareDialogOpen] = useState(false);
	const [jobToAction, setJobToAction] = useState(null);
	const [selectedJob, setSelectedJob] = useState(null);
	const [copiedJobUrl, setCopiedJobUrl] = useState("");
	const [form, setForm] = useState({
		title: "",
		profession: "",
		workLocation: "",
		workplace: "on-site",
		skills: [] as string[],
		experience: "",
		jobLevel: "",
		education: "",
		employmentType: "full-time",
		contractType: "",
		positions: "1",
		jobLocation: "",
		description: "",
	});

	const [skillInput, setSkillInput] = useState("");

	function handleFormChange(e: any) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	function handleAddSkill(e: any) {
		if (e.key === "Enter" && skillInput.trim()) {
			e.preventDefault();
			setForm((prev) => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
			setSkillInput("");
		}
	}

	function removeSkill(index: number) {
		setForm((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== index) }));
	}

	function handleSubmit(e: any) {
		e.preventDefault();
		// Add job logic here
		setOpen(false);
		setStage(0);
	}

	function resetForm() {
		setForm({
			title: "",
			profession: "",
			workLocation: "",
			workplace: "on-site",
			skills: [],
			experience: "",
			jobLevel: "",
			education: "",
			employmentType: "full-time",
			contractType: "",
			positions: "1",
			jobLocation: "",
			description: "",
		});
		setStage(0);
	}

	function handleUnpublishJob(jobId: string) {
		setJobToAction(jobId);
		setUnpublishDialogOpen(true);
	}

	function confirmUnpublish() {
		if (jobToAction) {
			setJobList(jobList.map(job => 
				job.id === jobToAction ? { ...job, status: "Unpublished" } : job
			));
			setUnpublishDialogOpen(false);
			setJobToAction(null);
		}
	}

	function handleArchiveJob(jobId: string) {
		setJobToAction(jobId);
		setArchiveDialogOpen(true);
	}

	function confirmArchive() {
		if (jobToAction) {
			setJobList(jobList.filter(job => job.id !== jobToAction));
			setArchiveDialogOpen(false);
			setJobToAction(null);
		}
	}

	function handleEditJob(job: any) {
		setSelectedJob(job);
		setForm({
			title: job.title,
			profession: "",
			workLocation: job.location,
			workplace: "on-site",
			skills: [],
			experience: "",
			jobLevel: "",
			education: "",
			employmentType: job.employment_type,
			contractType: "",
			positions: "1",
			jobLocation: job.location,
			description: "",
		});
		setEditDialogOpen(true);
	}

	function handleUpdateJob(e: any) {
		e.preventDefault();
		if (selectedJob) {
			setJobList(jobList.map(job => 
				job.id === selectedJob.id 
					? {
						...job,
						title: form.title,
						location: form.jobLocation || form.workLocation,
						employment_type: form.employmentType,
					}
					: job
			));
			setEditDialogOpen(false);
			setSelectedJob(null);
			resetForm();
		}
	}

	function handleShareJob(job: any) {
		const jobUrl = `${window.location.origin}/job/${job.id}`;
		navigator.clipboard.writeText(jobUrl);
		setCopiedJobUrl(jobUrl);
		setShareDialogOpen(true);
	}

	return (
		<EmployerLayout>
			<div className="max-w-7xl mx-auto py-8 px-6">
				{/* Header */}
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-4xl font-bold text-gray-900">
						Posted Jobs
					</h1>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button className="bg-gradient-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-glow hover:opacity-90 transition-all">
								<Plus className="w-5 h-5" />
								Post a Job
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
							<DialogHeader>
								<DialogTitle className="text-2xl font-bold text-gray-900">
									Create a Job Post
								</DialogTitle>
								<p className="text-muted-foreground">
									Step {stage + 1}/3:{" "}
									{stage === 0
										? "Fill in the following fields to publish your job post."
										: stage === 1
										? "Add more details about the position."
										: "Review your job post before publishing."}
								</p>
							</DialogHeader>

							{/* Progress Steps */}
							<div className="flex items-center justify-between mb-8 mt-4">
								<div className="flex items-center gap-4 flex-1">
									<div
										className={`flex items-center gap-2 ${
											stage >= 0 ? "text-primary" : "text-muted-foreground"
										}`}
									>
										<div
											className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
												stage >= 0
													? "bg-gradient-primary text-white shadow-glow"
													: "bg-muted"
											}`}
										>
											1
										</div>
										<span className="font-semibold hidden sm:block">Job Details</span>
									</div>
									<div className="flex-1 h-[2px] bg-border"></div>
								</div>
								<div className="flex items-center gap-4 flex-1">
									<div
										className={`flex items-center gap-2 ${
											stage >= 1 ? "text-primary" : "text-muted-foreground"
										}`}
									>
										<div
											className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
												stage >= 1
													? "bg-gradient-primary text-white shadow-glow"
													: "bg-muted"
											}`}
										>
											2
										</div>
										<span className="font-semibold hidden sm:block">Additional Information</span>
									</div>
									<div className="flex-1 h-[2px] bg-border"></div>
								</div>
								<div className="flex items-center gap-4">
									<div
										className={`flex items-center gap-2 ${
											stage >= 2 ? "text-primary" : "text-muted-foreground"
										}`}
									>
										<div
											className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
												stage >= 2
													? "bg-gradient-primary text-white shadow-glow"
													: "bg-muted"
											}`}
										>
											3
										</div>
										<span className="font-semibold hidden sm:block">Review & Post</span>
									</div>
								</div>
							</div>

							<form onSubmit={handleSubmit}>
								{/* Stage 1: Job Details */}
								{stage === 0 && (
									<div className="space-y-6">
										<div>
											<Label htmlFor="title" className="text-sm font-semibold">
												Job Title <span className="text-red-500">*</span>
											</Label>
											<Input
												id="title"
												name="title"
												value={form.title}
												onChange={handleFormChange}
												placeholder="e.g., Marketing Manager"
												className="mt-2"
												required
											/>
										</div>

										<div>
											<Label htmlFor="profession" className="text-sm font-semibold">
												Profession <span className="text-red-500">*</span>
											</Label>
											<Select
												name="profession"
												value={form.profession}
												onValueChange={(val) => setForm({ ...form, profession: val })}
											>
												<SelectTrigger className="mt-2">
													<SelectValue placeholder="Select profession" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="software-engineer">Software Engineer</SelectItem>
													<SelectItem value="designer">Designer</SelectItem>
													<SelectItem value="marketing">Marketing</SelectItem>
													<SelectItem value="sales">Sales</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div>
											<Label htmlFor="workLocation" className="text-sm font-semibold">
												Work Location <span className="text-red-500">*</span>
											</Label>
											<Input
												id="workLocation"
												name="workLocation"
												value={form.workLocation}
												onChange={handleFormChange}
												placeholder="Search for a city..."
												className="mt-2"
												required
											/>
										</div>

										<div>
											<Label className="text-sm font-semibold">
												Workplace <span className="text-red-500">*</span>
											</Label>
											<div className="flex gap-4 mt-2">
												{["on-site", "hybrid", "remote"].map((type) => (
													<label
														key={type}
														className="flex items-center gap-2 cursor-pointer"
													>
														<input
															type="radio"
															name="workplace"
															value={type}
															checked={form.workplace === type}
															onChange={handleFormChange}
															className="w-4 h-4"
														/>
														<span className="capitalize">{type}</span>
													</label>
												))}
											</div>
										</div>

										<div>
											<Label htmlFor="skills" className="text-sm font-semibold">
												Skills <span className="text-red-500">*</span>
											</Label>
											<Input
												id="skills"
												value={skillInput}
												onChange={(e) => setSkillInput(e.target.value)}
												onKeyDown={handleAddSkill}
												placeholder="Type a skill and press Enter"
												className="mt-2"
											/>
											<div className="flex flex-wrap gap-2 mt-2">
												{form.skills.map((skill, index) => (
													<Badge key={index} variant="secondary" className="px-3 py-1">
														{skill}
														<button
															type="button"
															onClick={() => removeSkill(index)}
															className="ml-2 text-xs"
														>
															×
														</button>
													</Badge>
												))}
											</div>
										</div>

										<div>
											<Label htmlFor="experience" className="text-sm font-semibold">
												Years of Experience <span className="text-red-500">*</span>
											</Label>
											<Select
												name="experience"
												value={form.experience}
												onValueChange={(val) => setForm({ ...form, experience: val })}
											>
												<SelectTrigger className="mt-2">
													<SelectValue placeholder="Select years of experience" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="0-1">0-1 years</SelectItem>
													<SelectItem value="1-3">1-3 years</SelectItem>
													<SelectItem value="3-5">3-5 years</SelectItem>
													<SelectItem value="5+">5+ years</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div>
											<Label htmlFor="jobLevel" className="text-sm font-semibold">
												Job Level <span className="text-red-500">*</span>
											</Label>
											<Select
												name="jobLevel"
												value={form.jobLevel}
												onValueChange={(val) => setForm({ ...form, jobLevel: val })}
											>
												<SelectTrigger className="mt-2">
													<SelectValue placeholder="Select job level" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="entry">Entry Level</SelectItem>
													<SelectItem value="junior">Junior</SelectItem>
													<SelectItem value="mid">Mid Level</SelectItem>
													<SelectItem value="senior">Senior</SelectItem>
													<SelectItem value="lead">Lead</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div>
											<Label htmlFor="education" className="text-sm font-semibold">
												Education Level <span className="text-red-500">*</span>
											</Label>
											<Select
												name="education"
												value={form.education}
												onValueChange={(val) => setForm({ ...form, education: val })}
											>
												<SelectTrigger className="mt-2">
													<SelectValue placeholder="Select education level" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="high-school">High School</SelectItem>
													<SelectItem value="associate">Associate Degree</SelectItem>
													<SelectItem value="bachelor">Bachelor's Degree</SelectItem>
													<SelectItem value="master">Master's Degree</SelectItem>
													<SelectItem value="phd">PhD</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div className="flex justify-between gap-4 pt-4">
											<Button
												type="button"
												variant="outline"
												onClick={resetForm}
												className="border-primary text-primary hover:bg-primary/10"
											>
												Reset
											</Button>
											<Button
												type="button"
												onClick={() => setStage(1)}
												className="bg-gradient-primary hover:opacity-90 transition-all shadow-glow"
											>
												Continue
											</Button>
										</div>
									</div>
								)}

								{/* Stage 2: Additional Information */}
								{stage === 1 && (
									<div className="space-y-6">
										<div>
											<Label htmlFor="employmentType" className="text-sm font-semibold">
												Employment Type <span className="text-red-500">*</span>
											</Label>
											<Select
												name="employmentType"
												value={form.employmentType}
												onValueChange={(val) => setForm({ ...form, employmentType: val })}
											>
												<SelectTrigger className="mt-2">
													<SelectValue placeholder="Full-time" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="full-time">Full-time</SelectItem>
													<SelectItem value="part-time">Part-time</SelectItem>
													<SelectItem value="contract">Contract</SelectItem>
													<SelectItem value="internship">Internship</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div>
											<Label htmlFor="contractType" className="text-sm font-semibold">
												Contract Type
											</Label>
											<Select
												name="contractType"
												value={form.contractType}
												onValueChange={(val) => setForm({ ...form, contractType: val })}
											>
												<SelectTrigger className="mt-2">
													<SelectValue placeholder="Select contract type" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="permanent">Permanent</SelectItem>
													<SelectItem value="temporary">Temporary</SelectItem>
													<SelectItem value="freelance">Freelance</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div>
											<Label htmlFor="positions" className="text-sm font-semibold">
												Number of Positions
											</Label>
											<Input
												id="positions"
												name="positions"
												type="number"
												value={form.positions}
												onChange={handleFormChange}
												className="mt-2"
												min="1"
											/>
										</div>

										<div>
											<Label htmlFor="jobLocation" className="text-sm font-semibold">
												Job location <span className="text-red-500">*</span>
											</Label>
											<div className="relative mt-2">
												<MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
												<Input
													id="jobLocation"
													name="jobLocation"
													value={form.jobLocation}
													onChange={handleFormChange}
													placeholder="Algiers, Algeria"
													className="pl-10"
													required
												/>
											</div>
										</div>

										<div>
											<Label htmlFor="description" className="text-sm font-semibold">
												Job Description <span className="text-destructive">*</span>
											</Label>
											<Button
												type="button"
												variant="link"
												className="text-primary p-0 h-auto mb-2 hover:opacity-80"
											>
												Generate with AI
											</Button>
											<Textarea
												id="description"
												name="description"
												value={form.description}
												onChange={handleFormChange}
												rows={6}
												className="mt-2"
												required
											/>
										</div>

										<div className="flex justify-between gap-4 pt-4">
											<Button
												type="button"
												variant="outline"
												onClick={() => setStage(0)}
												className="border-primary text-primary hover:bg-primary/10"
											>
												Back
											</Button>
											<Button
												type="button"
												onClick={() => setStage(2)}
												className="bg-gradient-primary hover:opacity-90 transition-all shadow-glow"
											>
												Continue
											</Button>
										</div>
									</div>
								)}

								{/* Stage 3: Review & Post */}
								{stage === 2 && (
									<div className="space-y-6">
									<div className="bg-muted/50 rounded-lg p-6 border border-border">
										<h3 className="text-xl font-bold mb-4">Review Your Job Post</h3>
										<h4 className="text-2xl font-bold text-gray-900 mb-4">
											{form.title}
										</h4>											<div className="grid grid-cols-2 gap-4 text-sm">
												<div>
													<p className="text-muted-foreground">Location</p>
													<p className="font-semibold flex items-center gap-1">
														<MapPin className="w-4 h-4" />
														{form.jobLocation || form.workLocation}
													</p>
												</div>
												<div>
													<p className="text-muted-foreground">Workplace Type</p>
													<p className="font-semibold capitalize">{form.workplace}</p>
												</div>
												<div>
													<p className="text-muted-foreground">Experience Required</p>
													<p className="font-semibold">{form.experience}</p>
												</div>
												<div>
													<p className="text-muted-foreground">Employment Type</p>
													<p className="font-semibold">{form.employmentType}</p>
												</div>
											</div>

											<div className="mt-4">
												<p className="text-muted-foreground">Job Description</p>
												<p className="mt-2">{form.description}</p>
											</div>
										</div>

										<p className="text-xs text-muted-foreground">
											By creating an account you accept the{" "}
											<span className="text-primary underline cursor-pointer hover:opacity-80">
												Terms
											</span>{" "}
											and{" "}
											<span className="text-primary underline cursor-pointer hover:opacity-80">
												Privacy
											</span>
										</p>

										<div className="flex justify-between gap-4 pt-4">
											<Button
												type="button"
												variant="outline"
												onClick={() => setStage(1)}
												className="border-primary text-primary hover:bg-primary/10"
											>
												Back
											</Button>
											<Button
												type="submit"
												className="bg-gradient-primary hover:opacity-90 transition-all shadow-glow"
											>
												Post Job
											</Button>
										</div>
									</div>
								)}
							</form>
						</DialogContent>
					</Dialog>
				</div>

				{/* Tabs */}
				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsList className="bg-white border-b w-full justify-start rounded-none h-auto p-0">
						<TabsTrigger
							value="Posted"
							className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-6 py-3 transition-all text-gray-700"
						>
							Posted{" "}
							<span className="ml-2 text-gray-500">3</span>
						</TabsTrigger>
						<TabsTrigger
							value="Pending"
							className="data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 data-[state=active]:text-yellow-600 rounded-none px-6 py-3 transition-all text-gray-700"
						>
							Pending{" "}
							<span className="ml-2 text-gray-500">0</span>
						</TabsTrigger>
						<TabsTrigger
							value="Unpublished"
							className="data-[state=active]:border-b-2 data-[state=active]:border-gray-500 data-[state=active]:text-gray-700 rounded-none px-6 py-3 transition-all text-gray-700"
						>
							Unpublished{" "}
							<span className="ml-2 text-gray-500">0</span>
						</TabsTrigger>
						<TabsTrigger
							value="Rejected"
							className="data-[state=active]:border-b-2 data-[state=active]:border-red-500 data-[state=active]:text-red-600 rounded-none px-6 py-3 transition-all text-gray-700"
						>
							Rejected{" "}
							<span className="ml-2 text-gray-500">3</span>
						</TabsTrigger>
						<TabsTrigger
							value="Archived"
							className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none px-6 py-3 transition-all text-gray-700"
						>
							Archived{" "}
							<span className="ml-2 text-gray-500">0</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent value="Posted" className="mt-0">
						<div className="bg-white rounded-lg border overflow-hidden shadow-sm">
							<table className="w-full">
								<thead className="bg-gray-50 border-b">
									<tr>
										<th className="text-left px-6 py-4 font-semibold text-gray-700">Job Title</th>
										<th className="text-left px-6 py-4 font-semibold text-gray-700">Details</th>
										<th className="text-left px-6 py-4 font-semibold text-gray-700">Status</th>
										<th className="text-left px-6 py-4 font-semibold text-gray-700">Applications</th>
										<th className="text-left px-6 py-4 font-semibold text-gray-700">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-border">
									{jobList.map((job) => (
										<tr key={job.id} className="hover:bg-accent/5 transition-colors">
											<td className="px-6 py-4">
												<div className="font-semibold text-black">{job.title}</div>
												<div className="text-sm text-muted-foreground">#{job.id}</div>
											</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-2 text-sm text-gray-600">
												<MapPin className="w-4 h-4 text-gray-500" />
												{job.location}
											</div>
											<div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
												<Clock className="w-4 h-4 text-gray-500" />
												{job.employment_type}
											</div>
										</td>
											<td className="px-6 py-4">
												<Badge
													className={`${
														job.status === "Published"
															? "bg-green-100 text-green-800"
															: job.status === "Pending"
															? "bg-yellow-100 text-yellow-800"
															: job.status === "Rejected"
															? "bg-red-100 text-red-800"
															: "bg-gray-100 text-gray-800"
													} border-none`}
												>
													{job.status}
												</Badge>
										</td>
										<td className="px-6 py-4">
											<span className="text-gray-900 font-semibold text-lg">
												{job.applicants_count}
											</span>
										</td>
										<td className="px-6 py-4">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon">
														<MoreHorizontal className="w-5 h-5" />
													</Button>
												</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem 
													className="flex items-center gap-2 cursor-pointer"
													onClick={() => handleEditJob(job)}
												>
													<Edit className="w-4 h-4" />
													Edit Job
												</DropdownMenuItem>
												<DropdownMenuItem 
													className="flex items-center gap-2 cursor-pointer"
													onClick={() => handleShareJob(job)}
												>
													<Share2 className="w-4 h-4" />
													Share
												</DropdownMenuItem>
												<DropdownMenuItem 
													className="flex items-center gap-2 cursor-pointer"
													onClick={() => handleUnpublishJob(job.id)}
												>
													<XCircle className="w-4 h-4" />
													Unpublish
												</DropdownMenuItem>
												<DropdownMenuItem 
													className="flex items-center gap-2 cursor-pointer text-red-600"
													onClick={() => handleArchiveJob(job.id)}
												>
													<Archive className="w-4 h-4" />
													Archive Job
												</DropdownMenuItem>
											</DropdownMenuContent>
											</DropdownMenu>
										</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</TabsContent>

					<TabsContent value="Pending">
						<div className="bg-card rounded-lg border p-8 text-center text-muted-foreground shadow-card">
							No pending jobs.
						</div>
					</TabsContent>

					<TabsContent value="Unpublished">
						<div className="bg-card rounded-lg border p-8 text-center text-muted-foreground shadow-card">
							No unpublished jobs.
						</div>
					</TabsContent>

					<TabsContent value="Rejected">
						<div className="bg-card rounded-lg border p-8 text-center text-muted-foreground shadow-card">
							No rejected jobs.
						</div>
					</TabsContent>

					<TabsContent value="Archived">
						<div className="bg-card rounded-lg border p-8 text-center text-muted-foreground shadow-card">
							No archived jobs.
						</div>
					</TabsContent>
				</Tabs>

				{/* Unpublish Alert Dialog */}
				<AlertDialog open={unpublishDialogOpen} onOpenChange={setUnpublishDialogOpen}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<div className="flex items-center gap-3 mb-2">
								<div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
									<XCircle className="w-6 h-6 text-yellow-600" />
								</div>
								<AlertDialogTitle className="text-xl">Unpublish Job</AlertDialogTitle>
							</div>
							<AlertDialogDescription className="text-base">
								Are you sure you want to unpublish this job? The job will no longer be visible to candidates. You can republish it later.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction 
								onClick={confirmUnpublish}
								className="bg-yellow-600 hover:bg-yellow-700 text-white"
							>
								Unpublish
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

				{/* Archive Alert Dialog */}
				<AlertDialog open={archiveDialogOpen} onOpenChange={setArchiveDialogOpen}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<div className="flex items-center gap-3 mb-2">
								<div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
									<AlertTriangle className="w-6 h-6 text-red-600" />
								</div>
								<AlertDialogTitle className="text-xl">Archive Job</AlertDialogTitle>
							</div>
							<AlertDialogDescription className="text-base">
								Are you sure you want to archive this job? This action will remove the job from the active list and move it to archived jobs. This cannot be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction 
								onClick={confirmArchive}
								className="bg-red-600 hover:bg-red-700 text-white"
							>
								Archive
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

				{/* Edit Job Dialog */}
				<Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
					<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle className="text-2xl font-bold text-gray-900">
								Edit Job Post
							</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleUpdateJob}>
							<div className="space-y-6">
								<div>
									<Label htmlFor="edit-title" className="text-sm font-semibold">
										Job Title <span className="text-red-500">*</span>
									</Label>
									<Input
										id="edit-title"
										name="title"
										value={form.title}
										onChange={handleFormChange}
										placeholder="e.g., Marketing Manager"
										className="mt-2"
										required
									/>
								</div>

								<div>
									<Label htmlFor="edit-jobLocation" className="text-sm font-semibold">
										Job location <span className="text-red-500">*</span>
									</Label>
									<div className="relative mt-2">
										<MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
										<Input
											id="edit-jobLocation"
											name="jobLocation"
											value={form.jobLocation}
											onChange={handleFormChange}
											placeholder="Algiers, Algeria"
											className="pl-10"
											required
										/>
									</div>
								</div>

								<div>
									<Label htmlFor="edit-employmentType" className="text-sm font-semibold">
										Employment Type <span className="text-red-500">*</span>
									</Label>
									<Select
										name="employmentType"
										value={form.employmentType}
										onValueChange={(val) => setForm({ ...form, employmentType: val })}
									>
										<SelectTrigger className="mt-2">
											<SelectValue placeholder="Full-time" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="full-time">Full-time</SelectItem>
											<SelectItem value="part-time">Part-time</SelectItem>
											<SelectItem value="contract">Contract</SelectItem>
											<SelectItem value="internship">Internship</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="flex justify-end gap-4 pt-4">
									<Button
										type="button"
										variant="outline"
										onClick={() => {
											setEditDialogOpen(false);
											resetForm();
										}}
										className="border-primary text-primary hover:bg-primary/10"
									>
										Cancel
									</Button>
									<Button
										type="submit"
										className="bg-gradient-primary hover:opacity-90 transition-all shadow-glow"
									>
										Update Job
									</Button>
								</div>
							</div>
						</form>
					</DialogContent>
				</Dialog>

				{/* Share Job Dialog */}
				<AlertDialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
					<AlertDialogContent>
						<AlertDialogHeader>
							<div className="flex items-center gap-3 mb-2">
								<div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
									<CheckCircle className="w-6 h-6 text-green-600" />
								</div>
								<AlertDialogTitle className="text-xl">Link Copied!</AlertDialogTitle>
							</div>
							<AlertDialogDescription className="text-base">
								The job link has been successfully copied to your clipboard. You can now share it with others.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<div className="bg-gray-50 rounded-lg p-4 flex items-center gap-3 border border-gray-200">
							<Copy className="w-5 h-5 text-gray-500 flex-shrink-0" />
							<code className="text-sm text-gray-700 break-all flex-1">{copiedJobUrl}</code>
						</div>
						<AlertDialogFooter>
							<AlertDialogAction 
								onClick={() => setShareDialogOpen(false)}
								className="bg-green-600 hover:bg-green-700 text-white"
							>
								Done
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</EmployerLayout>
	);
}
