"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getSiteAdmin, getSiteUser } from "@/lib/site-user";
import {
  FOLLOW_KEY,
  fetchFollowStatus,
  followCogniCode,
} from "@/lib/blog-engagement";

type FollowButtonProps = {
  source?: string;
  className?: string;
};

export function FollowButton({ source = "follow-post", className }: FollowButtonProps) {
  const { toast } = useToast();
  const [following, setFollowing] = useState(false);
  const [askEmail, setAskEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(FOLLOW_KEY) === "1") setFollowing(true);
    } catch {
      // ignore
    }
    fetchFollowStatus().then((res) => {
      if (res?.following) {
        setFollowing(true);
        try {
          localStorage.setItem(FOLLOW_KEY, "1");
        } catch {
          // ignore
        }
      }
    });
  }, []);

  const subscribe = async (value?: string) => {
    setBusy(true);
    try {
      const res = await followCogniCode({ email: value, source });
      if (res?.needsEmail) {
        setAskEmail(true);
        return;
      }
      if (!res?.success) {
        toast({
          title: "Could not follow",
          description: res?.message || "Try again",
          variant: "destructive",
        });
        return;
      }
      setFollowing(true);
      setAskEmail(false);
      try {
        localStorage.setItem(FOLLOW_KEY, "1");
      } catch {
        // ignore
      }
      toast({
        title: "You’re following CogniCode",
        description: "We’ll email future blog posts and company updates.",
      });
    } finally {
      setBusy(false);
    }
  };

  const onFollow = () => {
    if (following || busy) return;
    const known = getSiteUser()?.email || getSiteAdmin()?.email;
    if (known) {
      subscribe(known);
      return;
    }
    setAskEmail(true);
  };

  if (askEmail && !following) {
    return (
      <form
        className="flex min-w-0 max-w-[240px] items-center gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          subscribe(email.trim());
        }}
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email for updates"
          className="h-8 text-xs"
          autoFocus
        />
        <Button type="submit" size="sm" className="h-8 rounded-full px-3 text-xs" disabled={busy}>
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Join"}
        </Button>
      </form>
    );
  }

  return (
    <Button
      size="sm"
      variant={following ? "secondary" : "default"}
      className={className || "h-8 shrink-0 rounded-full px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"}
      onClick={onFollow}
      disabled={busy || following}
    >
      {busy ? (
        <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
      ) : following ? (
        <Check className="mr-1 h-3.5 w-3.5" />
      ) : null}
      {following ? "Following" : "Follow"}
    </Button>
  );
}
