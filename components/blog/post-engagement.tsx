"use client";

import { useEffect, useState } from "react";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSiteAdmin, getSiteUser, requestOpenAuth } from "@/lib/site-user";
import {
  EngagementStats,
  getLocalSavedSlugs,
  togglePostLike,
  toggleSavedPost,
} from "@/lib/blog-engagement";
import { useToast } from "@/hooks/use-toast";
import { ShareArticleButton } from "@/components/blog/share-article-dialog";

type PostEngagementProps = {
  slug: string;
  href?: string;
  title?: string;
  stats: EngagementStats;
  onStats: (next: EngagementStats) => void;
  onComment?: () => void;
  compact?: boolean;
};

export function PostEngagement({
  slug,
  href,
  title,
  stats,
  onStats,
  onComment,
  compact = false,
}: PostEngagementProps) {
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setSaved(getLocalSavedSlugs().includes(slug));
  }, [slug]);

  const icon = compact ? "h-5 w-5 sm:h-6 sm:w-6" : "h-5 w-5 sm:h-6 sm:w-6";

  const requireUser = (reason: "like") => {
    if (getSiteUser() || getSiteAdmin()) return true;
    requestOpenAuth({ mode: "login", reason });
    toast({
      title: "Log in required",
      description: "Log in with email to like this post.",
    });
    return false;
  };

  const onLike = async () => {
    if (!requireUser("like") || busy) return;
    setBusy(true);
    const prev = stats;
    onStats({
      ...stats,
      likedByMe: !stats.likedByMe,
      likes: Math.max(0, stats.likes + (stats.likedByMe ? -1 : 1)),
    });
    try {
      const res = await togglePostLike(slug, stats.likedByMe);
      if (res?.needsLogin) {
        onStats(prev);
        requestOpenAuth({ mode: "login", reason: "like" });
        return;
      }
      if (!res?.success) {
        onStats(prev);
        toast({
          title: "Could not like",
          description: res?.message || "Try again",
          variant: "destructive",
        });
        return;
      }
      if (res.data) {
        onStats({
          likes: res.data.likes,
          comments: res.data.comments,
          shares: res.data.shares,
          likedByMe: res.data.likedByMe,
        });
      }
    } finally {
      setBusy(false);
    }
  };



  const toggleSave = async () => {
    const next = !saved;
    setSaved(next);
    try {
      await toggleSavedPost(slug, saved);
    } catch {
      setSaved(saved);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <button
          type="button"
          onClick={onLike}
          className="rounded-full p-1.5 hover:bg-muted sm:p-2"
          aria-label="Like"
          disabled={busy}
        >
          <Heart
            className={cn(
              icon,
              stats.likedByMe ? "fill-rose-500 text-rose-500" : "text-foreground"
            )}
          />
        </button>
        <button
          type="button"
          onClick={() => onComment?.()}
          className="rounded-full p-1.5 hover:bg-muted sm:p-2"
          aria-label="Comment"
        >
          <MessageCircle className={cn(icon, "text-foreground")} />
        </button>
        <ShareArticleButton
          href={href}
          title={title || (typeof document !== "undefined" ? document.title : "CogniCode article")}
          slug={slug}
          className="rounded-full p-1.5 hover:bg-muted sm:p-2"
        >
          <Send className="h-4 w-4 text-foreground sm:h-5 sm:w-5" />
          <span className="sr-only">Share</span>
        </ShareArticleButton>
      </div>
      <button
        type="button"
        onClick={toggleSave}
        className="rounded-full p-1.5 hover:bg-muted sm:p-2"
        aria-label="Save"
      >
        <Bookmark
          className={cn(icon, saved ? "fill-foreground text-foreground" : "text-foreground")}
        />
      </button>
    </div>
  );
}
