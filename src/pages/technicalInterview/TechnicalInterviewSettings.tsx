import TechnicalInterviewLayout from "@/components/layouts/technicalInterview/TechnicalInterviewLayout";
import { Shield, Lock, User, Mail } from "lucide-react";

function AccountTab() {
	return (
		<div className="bg-white rounded-xl shadow-sm p-6">
			<h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-orange-500">
				<User className="w-5 h-5" /> Account Information
			</h2>
			
			{/* Profile Section */}
			<div className="mb-8">
				<h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-700">
					<Shield className="w-4 h-4" /> Profile Details
				</h3>
				<div className="space-y-4">
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">
								Full Name
							</label>
							<input
								type="text"
								className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
								defaultValue="John Smith"
							/>
						</div>
						<div>
							<label className="flex items-center gap-2 text-sm font-medium mb-1">
								<Mail className="w-4 h-4" /> Email Address
							</label>
							<input
								type="email"
								className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
								defaultValue="john.smith@talentek.com"
							/>
						</div>
					</div>
					<div className="max-w-md">
						<label className="block text-sm font-medium mb-1">
							Role
						</label>
						<input
							type="text"
							className="w-full border rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed"
							value="Technical Interviewer"
							disabled
						/>
					</div>
				</div>
			</div>

			<div className="border-t pt-6 mb-6">
				<h3 className="font-semibold mb-4 flex items-center gap-2 text-gray-700">
					<Lock className="w-4 h-4" /> Password Settings
				</h3>
				<form className="space-y-4">
					<div className="max-w-md">
						<label className="block text-sm font-medium mb-1">
							Current Password
						</label>
						<input
							type="password"
							className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
							placeholder="Enter your current password"
						/>
					</div>
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-1">New Password</label>
							<input
								type="password"
								className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
								placeholder="Enter new password"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								Confirm New Password
							</label>
							<input
								type="password"
								className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
								placeholder="Confirm new password"
							/>
						</div>
					</div>
					<button
						type="submit"
						className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
					>
						Update Password
					</button>
				</form>
			</div>
		</div>
	);
}

export default function TechnicalInterviewSettings() {
	return (
		<TechnicalInterviewLayout>
			<div className="max-w-2xl mt-8" style={{ marginLeft: 0 }}>
				<h1 className="text-3xl font-bold mb-6">Settings</h1>
				<AccountTab />
			</div>
		</TechnicalInterviewLayout>
	);
}
