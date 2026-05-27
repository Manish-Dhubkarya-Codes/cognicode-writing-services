"use client";

import { useEffect, useState } from "react";
import { UserRoundKey, LogOut, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { postData } from "@/app/server/fetch-beckend-services";  // ← Your existing import

interface Admin {
  adminId: number;
  name: string;
  email: string;
}

interface AdminProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminProfile({
  open,
  onOpenChange,
}: AdminProfileProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [editing, setEditing] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [editData, setEditData] = useState({ name: "", newPassword: "" });

  const { toast } = useToast();

  // ==================== LOGIN ====================
  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      toast({ title: "Error", description: "Email and password are required", variant: "destructive" });
      return;
    }

    try {
      const result = await postData("cogniadmin/login", loginData);

      if (result?.success) {
        localStorage.setItem(
  "admin",
  JSON.stringify(result.admin)
);

setAdmin(result.admin);
        setIsLoggedIn(true);
        onOpenChange(false);
        toast({ 
          title: "Login Successful", 
          description: `Welcome, ${result.admin.name}` 
        });
      } else {
        toast({ 
          title: "Login Failed", 
          description: result?.message || "Invalid credentials", 
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error(error);
      toast({ 
        title: "Error", 
        description: "Something went wrong. Please try again.", 
        variant: "destructive" 
      });
    }
  };

  useEffect(() => {
  const storedAdmin = localStorage.getItem("admin");

  if (storedAdmin) {
    const parsedAdmin = JSON.parse(storedAdmin);

    setAdmin(parsedAdmin);
    setIsLoggedIn(true);
  }
}, []);
  // ==================== UPDATE PROFILE ====================
  const handleUpdate = async () => {
    if (!admin) return;

    const updatePayload = {
      name: editData.name || admin.name,
      email: admin.email,
      ...(editData.newPassword && { newPassword: editData.newPassword })
    };

    try {
      const result = await postData("admin/update", updatePayload);

      if (result?.success) {
        toast({ 
          title: "Success", 
          description: "Profile updated successfully" 
        });

        // Update local state
        setAdmin(prev => prev ? { ...prev, name: editData.name || prev.name } : null);
        setEditing(false);
        setEditData({ name: "", newPassword: "" });
      } else {
        toast({ 
          title: "Update Failed", 
          description: result?.message || "Failed to update profile", 
          variant: "destructive" 
        });
      }
    } catch (error) {
      console.error(error);
      toast({ 
        title: "Error", 
        description: "Network error. Please try again.", 
        variant: "destructive" 
      });
    }
  };

const handleLogout = () => {
  localStorage.removeItem("admin");

  setIsLoggedIn(false);
  setAdmin(null);
  setEditing(false);

  toast({
    title: "Logged Out Successfully"
  });
};

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>

        <SheetHeader>
          <SheetTitle>Admin Access</SheetTitle>
        </SheetHeader>

        {!isLoggedIn ? (
          // Login Form
          <div className="space-y-4 p-3 mt-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                placeholder="admin@cognicodeedutech.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="Enter your password"
              />
            </div>
            <Button className="w-full" onClick={handleLogin}>
              Login
            </Button>
          </div>
        ) : (
          // Profile View
          <div className="mt-6 space-y-6">
            <div className="text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="flex items-center gap-2">
  <UserRoundKey
    className={`
      "h-4 w-4",
      isLoggedIn
        ? "text-green-500"
        : "text-current"
    `}
  />

  {isLoggedIn && (
    <span className="text-sm font-medium">
      {admin?.name}
    </span>
  )}
</div>
              </div>
              <h3 className="mt-4 text-xl font-semibold">{admin?.name}</h3>
              <p className="text-muted-foreground">{admin?.email}</p>
            </div>

            {editing ? (
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    placeholder="New name"
                  />
                </div>
                <div>
                  <Label>New Password (optional)</Label>
                  <Input
                    type="password"
                    value={editData.newPassword}
                    onChange={(e) => setEditData({ ...editData, newPassword: e.target.value })}
                    placeholder="Leave blank to keep current"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={handleUpdate}>
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
                <Button variant="destructive" className="flex-1" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div>
            )}
          </div>
        )}
    </Sheet>
  );
}