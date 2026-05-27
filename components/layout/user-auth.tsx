"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { postData } from "@/app/server/fetch-beckend-services";
import { Loader2 } from "lucide-react";

interface UserAuthProps {
  mode: "login" | "edit";
  onSuccess?: (userData: any) => void;
  currentUser?: any;
  onClose?: () => void;
  onProfileUpdated?: (updatedUser: any) => void;
}

export function UserAuth({ 
  mode, 
  onSuccess, 
  currentUser, 
  onClose,
  onProfileUpdated 
}: UserAuthProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Login
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Edit mode
  const [step, setStep] = useState<"send" | "verify" | "edit">("send");
  const [name, setName] = useState(currentUser?.name || "");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");

  // Resend OTP Timer
  const [resendCountdown, setResendCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // ==================== LOGIN ====================
  const handleLogin = async () => {
    if (!identifier || !password) {
      toast({ title: "Error", description: "Name/Email and password are required", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const result = await postData("cogniadmin/login", { identifier, password });
      if (result?.success) {
        toast({ title: "Login Successful", description: `Welcome, ${result.admin.name}` });
        onSuccess?.(result.admin);
      } else {
        toast({ title: "Login Failed", description: result?.message || "Invalid credentials", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // ==================== EDIT FLOW ====================
  const sendOTP = async (isResend = false) => {
    if (!currentUser?.email) return;
    setLoading(true);
    try {
      await postData("cogniadmin/send-otp", { email: currentUser.email });
      setStep("verify");
      setResendCountdown(60);
      setCanResend(false);
      toast({ 
        title: isResend ? "OTP Resent" : "OTP Sent", 
        description: `Check your email (${currentUser.email})` 
      });
    } catch (e) {
      toast({ title: "Error", description: "Failed to send OTP", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Countdown timer for Resend OTP
  useEffect(() => {
    if (step !== "verify") return;

    const timer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step]);

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const res = await postData("cogniadmin/verify-otp", { email: currentUser.email, otp });
      if (res?.success) {
        setStep("edit");
        toast({ title: "OTP Verified", description: "You can now update your details" });
      } else {
        toast({ title: "Invalid OTP", variant: "destructive" });
      }
    } catch (e) {
      toast({ title: "Error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const payload = {
        name: name || currentUser.name,
        email: currentUser.email,
        ...(newEmail && { newEmail }),
        ...(newPassword && { newPassword }),
      };

      const result = await postData("cogniadmin/update", payload);

      if (result?.success) {
        const updatedUser = {
          ...currentUser,
          name: name || currentUser.name,
          email: newEmail || currentUser.email
        };
        onProfileUpdated?.(updatedUser);
        toast({ title: "Success", description: "Profile updated successfully" });
        onClose?.();
      } else {
        toast({ title: "Update Failed", description: result?.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update profile", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (mode === "login") {
    return (
      <div className="space-y-4 py-4">
        <div>
          <Label>Name or Email</Label>
          <Input placeholder="admin@cognicodeedutech.com or your name" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button className="w-full" onClick={handleLogin} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </div>
    );
  }

  // EDIT MODE
  return (
    <div className="space-y-6 py-4">
      {step === "send" && (
        <>
          <p className="text-center text-muted-foreground text-sm">
            Send OTP for make changes in details...!
          </p>
          <Button className="w-full" onClick={() => sendOTP(false)} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send OTP to {currentUser?.email}
          </Button>
        </>
      )}

      {step === "verify" && (
        <>
          <div className="space-y-4">
            <Label>Enter 6-digit OTP</Label>
            <Input 
              placeholder="123456" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              maxLength={6} 
            />
          </div>

          <Button className="w-full" onClick={verifyOTP} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify OTP
          </Button>

          <div className="text-center">
            {resendCountdown > 0 ? (
              <p className="text-sm text-muted-foreground">
                Resend OTP in {resendCountdown} seconds
              </p>
            ) : (
              <Button 
                variant="link" 
                onClick={() => sendOTP(true)} 
                disabled={loading}
                className="text-primary hover:text-primary/80"
              >
                Resend OTP
              </Button>
            )}
          </div>
        </>
      )}

      {step === "edit" && (
        <>
          <div className="space-y-4">
            <Label>New Name (optional)</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="New name" />
          </div>
          <div className="space-y-4">
            <Label>New Email (optional)</Label>
            <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="New email" />
          </div>
          <div className="space-y-4">
            <Label>New Password (optional)</Label>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Leave blank to keep current" />
          </div>
          <Button className="w-full" onClick={handleUpdate} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </>
      )}
    </div>
  );
}