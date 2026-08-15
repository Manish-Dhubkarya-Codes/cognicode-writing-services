"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Lock, Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { UserAuth } from "@/components/layout/user-auth";
import {
  AuthMode,
  checkUsernameAvailable,
  loginSiteUser,
  registerSiteUser,
  sendSiteOtp,
  setSiteUser,
  SiteUser,
} from "@/lib/site-user";
import { cn } from "@/lib/utils";

type SiteUserAuthProps = {
  initialMode?: AuthMode;
  reason?: string;
  onUserSuccess?: (user: SiteUser) => void;
  onAdminSuccess?: (admin: any) => void;
};

const reasonCopy: Record<string, string> = {
  like: "Log in to like this post.",
  comment: "Log in to comment on this post.",
  share: "Log in to share from your account.",
};

export function SiteUserAuth({
  initialMode = "login",
  reason,
  onUserSuccess,
  onAdminSuccess,
}: SiteUserAuthProps) {
  const { toast } = useToast();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [usernameHint, setUsernameHint] = useState("");
  const [usernameOk, setUsernameOk] = useState<boolean | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState(false);
  const [blockedMessage, setBlockedMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [masked, setMasked] = useState("");
  const [devOtp, setDevOtp] = useState("");
  const [resendIn, setResendIn] = useState(0);

  useEffect(() => {
    setMode(initialMode);
    setPassword("");
    setConfirmPassword("");
    setStaff(false);
    setBlockedMessage("");
    setOtp("");
    setOtpStep(false);
    setDevOtp("");
  }, [initialMode]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  useEffect(() => {
    if (mode !== "register" || username.length < 3) {
      setUsernameOk(null);
      setUsernameHint("");
      return;
    }
    const handle = setTimeout(async () => {
      const res = await checkUsernameAvailable(username);
      setUsernameOk(Boolean(res?.available));
      setUsernameHint(res?.message || (res?.available ? "Username is available" : ""));
      setSuggestions(Array.isArray(res?.suggestions) ? res.suggestions : []);
    }, 350);
    return () => clearTimeout(handle);
  }, [username, mode]);

  const subtitle = useMemo(() => {
    if (reason && reasonCopy[reason]) return reasonCopy[reason];
    return mode === "register"
      ? "Create your account, then verify the 6-digit code we email you."
      : "Log in with your username or email and password.";
  }, [mode, reason]);

  const finishLogin = (user: SiteUser) => {
    setSiteUser(user);
    onUserSuccess?.(user);
    toast({ title: "Logged in", description: `Welcome, @${user.username}` });
  };

  const handleBlocked = (message?: string) => {
    setBlockedMessage(
      message ||
        "This account has been locked by CogniCode admin. You cannot log in or register with this email."
    );
  };

  const submitLogin = async () => {
    if (!identifier.trim() || !password) {
      toast({ title: "Enter username/email and password", variant: "destructive" });
      return;
    }
    setLoading(true);
    setBlockedMessage("");
    try {
      const res = await loginSiteUser({
        identifier: identifier.trim(),
        password,
      });
      if (res?.blocked) {
        handleBlocked(res.message);
        return;
      }
      if (res?.needsRegister) setMode("register");
      if (!res?.success || !res.user) {
        toast({
          title: "Login failed",
          description: res?.message || "Check your details and try again",
          variant: "destructive",
        });
        return;
      }
      finishLogin(res.user);
    } catch {
      toast({ title: "Login failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const sendRegisterOtp = async () => {
    if (!email.trim() || !username.trim() || !password) {
      toast({ title: "Email, username and password are required", variant: "destructive" });
      return;
    }
    if (password.length < 8) {
      toast({ title: "Password must be at least 8 characters", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    setLoading(true);
    setBlockedMessage("");
    try {
      const res = await sendSiteOtp({
        destination: email.trim(),
        purpose: "register",
      });
      if (res?.blocked) {
        handleBlocked(res.message);
        return;
      }
      if (res?.needsLogin) {
        setMode("login");
        toast({
          title: "Account exists",
          description: res.message || "Please log in with your password",
        });
        return;
      }
      if (!res?.success) {
        toast({
          title: "Could not send OTP",
          description: res?.message || "Try again",
          variant: "destructive",
        });
        return;
      }
      setMasked(res.destinationMasked || email);
      setDevOtp(res.devOtp || "");
      if (res.devOtp) setOtp(String(res.devOtp));
      setOtpStep(true);
      setResendIn(60);
      toast({
        title: res.devOtp ? "Local test OTP" : "OTP sent",
        description: res.message || "Check your email for the 6-digit code",
      });
    } catch {
      toast({ title: "Could not send OTP", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const submitRegister = async () => {
    if (!/^\d{6}$/.test(otp)) {
      toast({ title: "Enter the 6-digit OTP", variant: "destructive" });
      return;
    }
    setLoading(true);
    setBlockedMessage("");
    try {
      const res = await registerSiteUser({
        email: email.trim(),
        password,
        username: username.trim(),
        displayName: displayName.trim() || username.trim(),
        otp,
      });
      if (res?.blocked) {
        handleBlocked(res.message);
        return;
      }
      if (res?.needsLogin) setMode("login");
      if (!res?.success || !res.user) {
        setSuggestions(Array.isArray(res?.suggestions) ? res.suggestions : []);
        toast({
          title: "Could not create account",
          description: res?.message || "Try another username or email",
          variant: "destructive",
        });
        return;
      }
      finishLogin(res.user);
    } catch {
      toast({ title: "Could not create account", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (staff) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          className="text-sm text-muted-foreground hover:text-foreground"
          onClick={() => setStaff(false)}
        >
          ← Back to member login
        </button>
        <p className="text-sm text-muted-foreground">
          Staff only — password login for CogniCode admins.
        </p>
        <UserAuth mode="login" onSuccess={onAdminSuccess} />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400 p-[2px]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-background font-serif text-sm font-bold text-primary">
            CC
          </div>
        </div>
        <h2 className="font-serif text-xl font-bold">
          {mode === "register" ? "Create your account" : "Log in to CogniCode"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 rounded-full bg-muted p-1">
        {(["login", "register"] as AuthMode[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setMode(item);
              setBlockedMessage("");
              setOtp("");
              setOtpStep(false);
              setDevOtp("");
            }}
            className={cn(
              "rounded-full py-2 text-sm font-medium",
              mode === item ? "bg-background shadow-sm" : "text-muted-foreground"
            )}
          >
            {item === "login" ? "Log in" : "Sign up"}
          </button>
        ))}
      </div>

      {blockedMessage ? (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <p className="font-semibold">Account locked</p>
          <p className="mt-1 leading-6">{blockedMessage}</p>
        </div>
      ) : null}

      {mode === "login" ? (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <UserRound className="h-4 w-4 text-primary" />
              Username or email
            </Label>
            <Input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="your.name or you@university.edu"
              autoComplete="username"
              onKeyDown={(e) => {
                if (e.key === "Enter") submitLogin();
              }}
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" />
              Password
            </Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
              onKeyDown={(e) => {
                if (e.key === "Enter") submitLogin();
              }}
            />
          </div>
          <Button className="w-full rounded-full" onClick={submitLogin} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Log in
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Email
            </Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <Label>Username</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                @
              </span>
              <Input
                className="pl-8"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, ""))
                }
                placeholder="your.name"
                maxLength={30}
              />
            </div>
            {usernameHint ? (
              <p className={cn("text-xs", usernameOk ? "text-emerald-600" : "text-destructive")}>
                {usernameHint}
              </p>
            ) : null}
            {suggestions.length ? (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setUsername(s)}
                    className="rounded-full border px-2.5 py-1 text-xs hover:bg-muted"
                  >
                    @{s}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label>Display name (optional)</Label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="How you want to appear"
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-2">
            <Label>Confirm password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeat password"
              autoComplete="new-password"
            />
          </div>
          {otpStep ? (
            <div className="space-y-3">
              <p className="text-center text-sm text-muted-foreground">
                Enter the 6-digit code sent to{" "}
                <span className="font-medium text-foreground">{masked}</span>
              </p>
              {devOtp ? (
                <div className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-center text-sm text-amber-950">
                  Email could not be sent from this machine. Your test OTP is{" "}
                  <span className="font-mono text-base font-bold tracking-[0.3em]">{devOtp}</span>
                </div>
              ) : null}
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button
                className="w-full rounded-full"
                onClick={submitRegister}
                disabled={loading || otp.length !== 6}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Verify & create account
              </Button>
              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setOtpStep(false);
                    setOtp("");
                  }}
                >
                  Change details
                </button>
                {resendIn > 0 ? (
                  <span className="text-muted-foreground">Resend in {resendIn}s</span>
                ) : (
                  <button
                    type="button"
                    className="text-primary"
                    onClick={sendRegisterOtp}
                    disabled={loading}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          ) : (
            <Button
              className="w-full rounded-full"
              onClick={sendRegisterOtp}
              disabled={loading || usernameOk === false}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send email OTP
            </Button>
          )}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">
        CogniCode staff?{" "}
        <button type="button" className="underline" onClick={() => setStaff(true)}>
          Admin login
        </button>
      </p>
    </div>
  );
}
