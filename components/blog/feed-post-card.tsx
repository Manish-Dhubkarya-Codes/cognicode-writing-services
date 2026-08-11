"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Play,
  Send,
  Share2,
  BadgeCheck,
} from "lucide-react";
import { FeedPost } from "@/lib/blog-api";
import { getCategoryName } from "@/lib/blog-data";
import { companySocials } from "@/lib/company-socials";
import { cn } from "@/lib/utils";

type FeedPostCardProps = {
  post: FeedPost;
  compact?: boolean;
};

export function FeedPostCard({ post, compact = false }: FeedPostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const likes = (post.likes || 120) + (liked ? 1 : 0);
  const media =
    post.mediaGallery?.filter(Boolean)?.[0] ||
    post.coverImage ||
    post.coverVideo ||
    "";
  const isVideo =
    Boolean(post.coverVideo) ||
    Boolean(post.youtubeUrl) ||
    /\.(mp4|webm|mov)(\?|$)/i.test(media);

  const shareNative = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${post.href}`
        : post.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, text: post.excerpt, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      // user cancelled
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md">
      {/* Instagram-style header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400 p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-background text-xs font-bold text-primary">
              CC
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <p className="truncate text-sm font-semibold text-foreground">
              cognicodeedutech
            </p>
            <BadgeCheck className="h-4 w-4 shrink-0 fill-sky-500 text-white" />
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {getCategoryName(post.category)} · {post.date}
          </p>
        </div>
        <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {post.source === "api" ? "Live" : "Guide"}
        </span>
        <button
          type="button"
          className="rounded-full p-1.5 text-muted-foreground hover:bg-muted"
          aria-label="More"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Media */}
      <Link prefetch={false} href={post.href} className="block">
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            compact ? "aspect-square" : "aspect-[4/5] sm:aspect-[16/10]"
          )}
        >
          {media && !isVideo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={media}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          ) : media && isVideo && !post.youtubeUrl ? (
            <video
              src={media}
              className="h-full w-full object-cover"
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <div
              className={cn(
                "flex h-full w-full flex-col justify-end bg-gradient-to-br p-6 sm:p-8",
                post.imageGradient
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_50%)]" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  {post.imageLabel}
                </p>
                <p className="mt-2 max-w-lg font-serif text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  {post.title}
                </p>
              </div>
            </div>
          )}

          {(isVideo || post.youtubeUrl) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/15">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg">
                <Play className="ml-0.5 h-6 w-6 fill-current" />
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Action bar */}
      <div className="flex items-center justify-between px-3 pt-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setLiked((v) => !v)}
            className="rounded-full p-2 transition-colors hover:bg-muted"
            aria-label="Like"
          >
            <Heart
              className={cn(
                "h-6 w-6 transition-colors",
                liked ? "fill-rose-500 text-rose-500" : "text-foreground"
              )}
            />
          </button>
          <Link
            prefetch={false}
            href={post.href}
            className="rounded-full p-2 hover:bg-muted"
            aria-label="Open comments"
          >
            <MessageCircle className="h-6 w-6 text-foreground" />
          </Link>
          <button
            type="button"
            onClick={shareNative}
            className="rounded-full p-2 hover:bg-muted"
            aria-label="Share"
          >
            <Send className="h-5 w-5 text-foreground" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          className="rounded-full p-2 hover:bg-muted"
          aria-label="Save"
        >
          <Bookmark
            className={cn(
              "h-6 w-6",
              saved ? "fill-foreground text-foreground" : "text-foreground"
            )}
          />
        </button>
      </div>

      <div className="space-y-2 px-4 pb-4 pt-1">
        <p className="text-sm font-semibold text-foreground">
          {likes.toLocaleString()} likes
        </p>

        <div className="text-sm leading-relaxed text-foreground">
          <span className="font-semibold">cognicodeedutech</span>{" "}
          <span className="text-foreground/90">
            {expanded || post.excerpt.length < 140
              ? post.excerpt
              : `${post.excerpt.slice(0, 140).trim()}…`}
          </span>
          {post.excerpt.length >= 140 ? (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="ml-1 text-muted-foreground hover:text-foreground"
            >
              {expanded ? "less" : "more"}
            </button>
          ) : null}
        </div>

        <p className="font-serif text-base font-semibold leading-snug text-foreground">
          <Link prefetch={false} href={post.href} className="hover:underline">
            {post.title}
          </Link>
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-sm font-medium text-sky-700">
            #{getCategoryName(post.category).replace(/\s+/g, "")}
          </span>
          <span className="text-sm font-medium text-sky-700">#PhDLife</span>
          <span className="text-sm font-medium text-sky-700">#ResearchTips</span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <Link
            prefetch={false}
            href={post.href}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View full article · {post.readTime}
          </Link>
          <div className="flex items-center gap-1">
            {companySocials.slice(0, 3).map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground hover:text-primary"
              >
                {s.name.slice(0, 2)}
              </a>
            ))}
            <button
              type="button"
              onClick={shareNative}
              className="ml-1 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <Share2 className="h-3.5 w-3.5" />
              {copied ? "Copied" : "Share"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
