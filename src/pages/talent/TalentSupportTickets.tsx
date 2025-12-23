import { useState } from "react";
import TalentLayout from "@/components/layouts/TalentLayout";

const initialSupportTickets = [
	{
		id: 1,
		sender: "John Doe",
		subject: "Job Opportunity",
		message: "We are interested in your profile. Let's connect!",
		status: "Unread",
		type: "Job Offer",
	},
	{
		id: 2,
		sender: "Jane Smith",
		subject: "Interview Invitation",
		message: "We would like to invite you for an interview.",
		status: "Read",
		type: "Interview",
	},
];

const supportTicketTypes = ["All", "Job Offer", "Interview", "Other"];

const TalentSupportTickets = () => {
	const [supportTickets, setSupportTickets] = useState(initialSupportTickets);
	const [form, setForm] = useState({ sender: "", subject: "", message: "", type: "Job Offer" });
	const [error, setError] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [filterType, setFilterType] = useState("All");

	function handleInput(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!form.sender || !form.subject || !form.message || !form.type) {
			setError("All fields are required.");
			return;
		}
		setSupportTickets([
			{
				id: Date.now(),
				sender: form.sender,
				subject: form.subject,
				message: form.message,
				status: "Unread",
				type: form.type,
			},
			...supportTickets,
		]);
		setForm({ sender: "", subject: "", message: "", type: "Job Offer" });
		setError("");
		setShowForm(false);
	}

	const filteredSupportTickets =
			filterType === "All"
				? supportTickets
				: supportTickets.filter((t) => t.type === filterType);

	return (
		<TalentLayout>
			<div className="max-w-5xl mx-auto mt-8">
				<h1 className="text-2xl font-bold mb-6">Support Tickets</h1>
				<div className="mb-8">
					{!showForm ? (
						<button
							className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
							onClick={() => setShowForm(true)}
						>
							Create Support Ticket
						</button>
					) : (
						<div className="bg-white rounded-xl shadow-sm p-6">
							<h2 className="text-lg font-semibold mb-4">Create a Support Ticket</h2>
							<form
								className="grid gap-4 md:grid-cols-4"
								onSubmit={handleSubmit}
							>
								<div>
									<label className="block text-sm font-medium mb-1">
										Your Name
									</label>
									<input
										name="sender"
										value={form.sender}
										onChange={handleInput}
										className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
										placeholder="Your name"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">
										Subject
									</label>
									<input
										name="subject"
										value={form.subject}
										onChange={handleInput}
										className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
										placeholder="Subject"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">Type</label>
									<select
										name="type"
										value={form.type}
										onChange={handleInput}
										className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
									>
										{supportTicketTypes.slice(1).map((type) => (
											<option key={type} value={type}>
												{type}
											</option>
										))}
									</select>
								</div>
								<div className="md:col-span-4">
									<label className="block text-sm font-medium mb-1">
										Message
									</label>
									<textarea
										name="message"
										value={form.message}
										onChange={handleInput}
										className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
										placeholder="Write your message"
										rows={3}
									/>
								</div>
								<div className="md:col-span-4 flex gap-2 items-center">
									<button
										type="submit"
										className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
									>
										Create Ticket
									</button>
									<button
										type="button"
										className="px-6 py-2 rounded-lg border font-semibold shadow"
										onClick={() => {
											setShowForm(false);
											setError("");
										}}
									>
										Cancel
									</button>
									{error && (
										<span className="text-red-500 text-sm">{error}</span>
									)}
								</div>
							</form>
						</div>
					)}
				</div>
				<div className="bg-white rounded-xl shadow-sm p-6">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-lg font-semibold">Support Tickets</h2>
						<div>
							<label className="mr-2 text-sm font-medium">
								Filter by Type:
							</label>
							<select
								value={filterType}
								onChange={(e) => setFilterType(e.target.value)}
								className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
							>
								{supportTicketTypes.map((type) => (
									<option key={type} value={type}>
										{type}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className="overflow-x-auto">
						<table className="min-w-full text-sm border-separate border-spacing-y-2">
							<thead>
								<tr className="bg-gray-100 text-left">
									<th className="px-4 py-3 font-semibold rounded-tl-lg">Sender</th>
									<th className="px-4 py-3 font-semibold">Subject</th>
									<th className="px-4 py-3 font-semibold">Type</th>
									<th className="px-4 py-3 font-semibold">Message</th>
									<th className="px-4 py-3 font-semibold">Status</th>
									<th className="px-4 py-3 font-semibold rounded-tr-lg">Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredSupportTickets.length === 0 ? (
									<tr>
										<td colSpan={6} className="text-center py-6 text-gray-500">No Support Tickets found.</td>
									</tr>
								) : (
									filteredSupportTickets.map((ticket, idx) => (
										<tr key={ticket.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
											<td className="px-4 py-3 font-medium text-gray-900 rounded-l-lg">{ticket.sender}</td>
											<td className="px-4 py-3">{ticket.subject}</td>
											<td className="px-4 py-3">
												<span className={`px-2 py-1 rounded text-xs font-semibold ${ticket.type === "Job Offer" ? "bg-blue-100 text-blue-700" : ticket.type === "Interview" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}`}>{ticket.type}</span>
											</td>
											<td className="px-4 py-3 text-gray-700 max-w-xs truncate">{ticket.message}</td>
											<td className="px-4 py-3">
												<span className={`px-2 py-1 rounded text-xs font-semibold ${ticket.status === "Read" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{ticket.status}</span>
											</td>
											<td className="px-4 py-3 flex gap-2 rounded-r-lg">
												{ticket.status !== "Read" && (
													<button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold" onClick={() => setSupportTickets(supportTickets.map((t) => t.id === ticket.id ? { ...t, status: "Read" } : t))}>Mark as Read</button>
												)}
												<button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-xs font-semibold" onClick={() => setSupportTickets(supportTickets.filter((t) => t.id !== ticket.id))}>Delete</button>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</TalentLayout>
	);
};

export default TalentSupportTickets;
