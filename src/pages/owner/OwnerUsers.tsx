import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerLayout from "@/components/layouts/OwnerLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, Filter, UserPlus, Eye, Trash2, AlertTriangle, Building2, Briefcase, UserCog, Ban, CheckCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Talent", status: "Active", joinDate: "2024-01-15" },
  { id: 2, name: "TechCorp Inc", email: "hr@techcorp.com", role: "Employer", status: "Active", joinDate: "2024-02-20" },
  { id: 3, name: "Jane Smith", email: "jane@example.com", role: "Interviewer", status: "Active", joinDate: "2024-03-10" },
  { id: 4, name: "Mike Johnson", email: "mike@example.com", role: "Talent", status: "Inactive", joinDate: "2024-01-05" },
  { id: 5, name: "StartupX", email: "team@startupx.com", role: "Employer", status: "Active", joinDate: "2024-02-28" },
];

export default function OwnerUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deactivateDialogOpen, setDeactivateDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [userToDeactivate, setUserToDeactivate] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole;
    const matchesTab = activeTab === "all" || 
                       (activeTab === "talents" && user.role === "Talent") ||
                       (activeTab === "employers" && user.role === "Employer") ||
                       (activeTab === "interviewers" && user.role === "Interviewer");
    return matchesSearch && matchesRole && matchesTab;
  });

  function handleDeleteUser(id: number) {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  }

  function confirmDelete() {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete));
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  }

  function handleDeactivateUser(id: number) {
    setUserToDeactivate(id);
    setDeactivateDialogOpen(true);
  }

  function confirmDeactivate() {
    if (userToDeactivate) {
      setUsers(users.map(user => 
        user.id === userToDeactivate 
          ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
          : user
      ));
      setDeactivateDialogOpen(false);
      setUserToDeactivate(null);
    }
  }

  const getRoleIcon = (role: string) => {
    switch(role) {
      case "Employer": return <Building2 className="w-4 h-4" />;
      case "Talent": return <Briefcase className="w-4 h-4" />;
      case "Interviewer": return <UserCog className="w-4 h-4" />;
      default: return null;
    }
  };

  const getRoleColor = (role: string) => {
    switch(role) {
      case "Employer": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Talent": return "bg-purple-100 text-purple-700 border-purple-200";
      case "Interviewer": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-2">Manage all platform users from one place</p>
          </div>
          <Button 
            onClick={() => navigate('/owner/users/add-employer')}
            className="bg-gradient-primary text-white flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Add Employer
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-[200px]">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Roles</SelectItem>
              <SelectItem value="Talent">Talents</SelectItem>
              <SelectItem value="Employer">Employers</SelectItem>
              <SelectItem value="Interviewer">Interviewers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border-b w-full justify-start rounded-none h-auto p-0">
            <TabsTrigger
              value="all"
              className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 data-[state=active]:text-orange-600 rounded-none px-6 py-3"
            >
              All Users <span className="ml-2 text-gray-500">{users.length}</span>
            </TabsTrigger>
            <TabsTrigger
              value="talents"
              className="data-[state=active]:border-b-2 data-[state=active]:border-purple-500 data-[state=active]:text-purple-600 rounded-none px-6 py-3"
            >
              Talents <span className="ml-2 text-gray-500">{users.filter(u => u.role === "Talent").length}</span>
            </TabsTrigger>
            <TabsTrigger
              value="employers"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 rounded-none px-6 py-3"
            >
              Employers <span className="ml-2 text-gray-500">{users.filter(u => u.role === "Employer").length}</span>
            </TabsTrigger>
            <TabsTrigger
              value="interviewers"
              className="data-[state=active]:border-b-2 data-[state=active]:border-green-500 data-[state=active]:text-green-600 rounded-none px-6 py-3"
            >
              Interviewers <span className="ml-2 text-gray-500">{users.filter(u => u.role === "Interviewer").length}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Name</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Role</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Join Date</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600">{user.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={getRoleColor(user.role)}>
                          <span className="flex items-center gap-1">
                            {getRoleIcon(user.role)}
                            {user.role}
                          </span>
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            user.status === "Active"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600">{user.joinDate}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeactivateUser(user.id)}
                            title={user.status === "Active" ? "Deactivate" : "Activate"}
                          >
                            <Ban className={`w-4 h-4 ${user.status === "Active" ? "text-orange-600" : "text-green-600"}`} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>

        {/* Delete Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <AlertDialogTitle className="text-xl">Delete User</AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-base">
                Are you sure you want to delete this user? This action cannot be undone. All user data will be permanently removed from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Deactivate/Activate Dialog */}
        <AlertDialog open={deactivateDialogOpen} onOpenChange={setDeactivateDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-12 h-12 rounded-full ${users.find(u => u.id === userToDeactivate)?.status === "Active" ? "bg-orange-100" : "bg-green-100"} flex items-center justify-center`}>
                  {users.find(u => u.id === userToDeactivate)?.status === "Active" ? (
                    <Ban className="w-6 h-6 text-orange-600" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  )}
                </div>
                <AlertDialogTitle className="text-xl">
                  {users.find(u => u.id === userToDeactivate)?.status === "Active" ? "Deactivate" : "Activate"} User
                </AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-base">
                {users.find(u => u.id === userToDeactivate)?.status === "Active" 
                  ? "Are you sure you want to deactivate this user? They will lose access to the platform but their data will be preserved."
                  : "Are you sure you want to activate this user? They will regain full access to the platform."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeactivate}
                className={users.find(u => u.id === userToDeactivate)?.status === "Active" 
                  ? "bg-orange-600 hover:bg-orange-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"}
              >
                {users.find(u => u.id === userToDeactivate)?.status === "Active" ? "Deactivate" : "Activate"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </OwnerLayout>
  );
}
