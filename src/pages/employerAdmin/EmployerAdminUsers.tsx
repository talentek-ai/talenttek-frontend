import { useState } from "react";
import EmployerAdminLayout from "@/components/layouts/EmployerAdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { UserPlus, Mail, Edit, Trash2, Eye, AlertTriangle, Search, CheckCircle, XCircle } from "lucide-react";

interface CompanyUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  joinDate: string;
  status: "active" | "inactive";
}

const initialUsers: CompanyUser[] = [
  {
    id: "1",
    fullName: "John Smith",
    email: "john@company.com",
    role: "Recruiter",
    joinDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    fullName: "Emily Davis",
    email: "emily@company.com",
    role: "Recruiter",
    joinDate: "2024-02-20",
    status: "active",
  },
  {
    id: "3",
    fullName: "Michael Johnson",
    email: "michael@company.com",
    role: "Recruiter",
    joinDate: "2024-03-10",
    status: "inactive",
  },
];

export default function EmployerAdminUsers() {
  const [users, setUsers] = useState<CompanyUser[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<CompanyUser | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<CompanyUser | null>(null);
  const [statusDialog, setStatusDialog] = useState(false);
  const [userToToggle, setUserToToggle] = useState<CompanyUser | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "",
  });

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = () => {
    setEditingUser(null);
    setForm({ fullName: "", email: "", role: "" });
    setOpenDialog(true);
  };

  const handleEditUser = (user: CompanyUser) => {
    setEditingUser(user);
    setForm({ fullName: user.fullName, email: user.email, role: user.role });
    setOpenDialog(true);
  };

  const handleSaveUser = () => {
    if (!form.fullName || !form.email || !form.role) {
      alert("Please fill in all fields");
      return;
    }

    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? { ...u, fullName: form.fullName, email: form.email, role: form.role }
            : u
        )
      );
    } else {
      setUsers([
        ...users,
        {
          id: Date.now().toString(),
          fullName: form.fullName,
          email: form.email,
          role: form.role,
          joinDate: new Date().toISOString().split("T")[0],
          status: "active",
        },
      ]);
    }
    setOpenDialog(false);
    setForm({ fullName: "", email: "", role: "" });
  };

  const handleDeleteUser = (user: CompanyUser) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((u) => u.id !== userToDelete.id));
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleToggleStatus = (user: CompanyUser) => {
    setUserToToggle(user);
    setStatusDialog(true);
  };

  const confirmToggleStatus = () => {
    if (userToToggle) {
      setUsers(
        users.map((u) =>
          u.id === userToToggle.id
            ? { ...u, status: u.status === "active" ? "inactive" : "active" }
            : u
        )
      );
      setStatusDialog(false);
      setUserToToggle(null);
    }
  };

  return (
    <EmployerAdminLayout>
      <div className="max-w-6xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Company Recruiters</h1>
            <p className="text-gray-600">Manage recruiters and their access to the platform</p>
          </div>
          <Button
            onClick={handleOpenDialog}
            className="bg-gradient-primary text-white gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Add Recruiter
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Users Table */}
        <Card className="shadow-lg border-gray-200">
          <div className="overflow-x-auto">
            <div className="hidden md:block">
              <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">
                        Email
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">
                        Role
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">
                        Join Date
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-muted-foreground uppercase">
                        Status
                      </th>
                      <th className="px-4 py-2 text-center text-xs font-semibold text-muted-foreground uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-border text-sm">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-muted/30 transition">
                        <td className="px-4 py-3 whitespace-nowrap font-bold">
                          {user.fullName}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-xs">{user.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {user.status === "active" ? (
                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-700">Inactive</Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <div className="flex items-center gap-1 justify-center">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-2"
                              onClick={() => handleToggleStatus(user)}
                            >
                              {user.status === "active" ? (
                                <XCircle className="w-4 h-4 text-red-600" />
                              ) : (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-2"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-2 text-destructive hover:text-destructive"
                              onClick={() => handleDeleteUser(user)}
                            >
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
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900">{user.fullName}</div>
                    <Badge
                      className={
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                    <div>Role: {user.role}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleStatus(user)}
                      className="flex-1"
                    >
                      {user.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEditUser(user)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive"
                      onClick={() => handleDeleteUser(user)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Add/Edit User Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingUser ? "Edit Recruiter" : "Add New Recruiter"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium text-gray-900">Full Name</label>
                <Input
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Enter full name"
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-900">Email</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter email"
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-900">Role</label>
                <Input
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Hiring Manager"
                  className="mt-2"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSaveUser} className="bg-gradient-primary text-white">
                {editingUser ? "Update" : "Add"} Recruiter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <AlertDialogTitle className="text-xl">Delete Recruiter</AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-base">
                Are you sure you want to remove {userToDelete?.fullName} from your recruitment team? This action cannot be undone.
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

        {/* Toggle Status Confirmation */}
        <AlertDialog open={statusDialog} onOpenChange={setStatusDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {userToToggle?.status === "active" ? "Deactivate" : "Activate"} Recruiter
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to{" "}
                {userToToggle?.status === "active" ? "deactivate" : "activate"}{" "}
                {userToToggle?.fullName}? This will affect their access to the recruitment platform.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmToggleStatus}
                className={
                  userToToggle?.status === "active"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }
              >
                {userToToggle?.status === "active" ? "Deactivate" : "Activate"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </EmployerAdminLayout>
  );
}
