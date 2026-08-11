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
    <article className="min-w-0 overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md sm:rounded-2xl">
      {/* Instagram-style header */}
      <div className="flex items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400 p-[2px] sm:h-10 sm:w-10">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-background text-[10px] font-bold text-primary sm:text-xs">
            CC
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <p className="truncate text-xs font-semibold text-foreground sm:text-sm">
              cognicodeedutech
            </p>
            <BadgeCheck className="h-3.5 w-3.5 shrink-0 fill-sky-500 text-white sm:h-4 sm:w-4" />
          </div>
          <p className="truncate text-[11px] text-muted-foreground sm:text-xs">
            {getCategoryName(post.category)} · {post.date}
          </p>
        </div>
        <span className="hidden rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground xs:inline-block sm:px-2.5 sm:py-1">
          {post.source === "api" ? "Live" : "Guide"}
        </span>
        <button
          type="button"
          className="shrink-0 rounded-full p-1.5 text-muted-foreground hover:bg-muted"
          aria-label="More"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Media */}
      <Link prefetch={false} href={post.href} className="block min-w-0">
        <div
          className={cn(
            "relative overflow-hidden bg-muted",
            compact
              ? "aspect-square"
              : "aspect-[4/5] min-h-[200px] sm:aspect-[16/10] sm:min-h-0"
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
                "flex h-full w-full flex-col justify-end bg-gradient-to-br p-4 sm:p-6 md:p-8",
                post.imageGradient
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_50%)]" />
              <div className="relative min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 sm:text-xs sm:tracking-[0.2em]">
                  {post.imageLabel}
                </p>
                <p className="mt-1.5 line-clamp-3 font-serif text-lg font-semibold leading-snug text-white sm:mt-2 sm:line-clamp-none sm:text-2xl sm:leading-tight md:text-3xl">
                  {post.title}
                </p>
              </div>
            </div>
          )}

          {(isVideo || post.youtubeUrl) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/15">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg sm:h-14 sm:w-14">
                <Play className="ml-0.5 h-5 w-5 fill-current sm:h-6 sm:w-6" />
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Action bar */}
      <div className="flex items-center justify-between px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setLiked((v) => !v)}
            className="rounded-full p-1.5 transition-colors hover:bg-muted sm:p-2"
            aria-label="Like"
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors sm:h-6 sm:w-6",
                liked ? "fill-rose-500 text-rose-500" : "text-foreground"
              )}
            />
          </button>
          <Link
            prefetch={false}
            href={post.href}
            className="rounded-full p-1.5 hover:bg-muted sm:p-2"
            aria-label="Open comments"
          >
            <MessageCircle className="h-5 w-5 text-foreground sm:h-6 sm:w-6" />
          </Link>
          <button
            type="button"
            onClick={shareNative}
            className="rounded-full p-1.5 hover:bg-muted sm:p-2"
            aria-label="Share"
          >
            <Send className="h-4 w-4 text-foreground sm:h-5 sm:w-5" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          className="rounded-full p-1.5 hover:bg-muted sm:p-2"
          aria-label="Save"
        >
          <Bookmark
            className={cn(
              "h-5 w-5 sm:h-6 sm:w-6",
              saved ? "fill-foreground text-foreground" : "text-foreground"
            )}
          />
        </button>
      </div>

      <div className="space-y-1.5 px-3 pb-3 pt-0.5 sm:space-y-2 sm:px-4 sm:pb-4 sm:pt-1">
        <p className="text-xs font-semibold text-foreground sm:text-sm">
          {likes.toLocaleString()} likes
        </p>

        <div className="break-words text-xs leading-relaxed text-foreground sm:text-sm">
          <span className="font-semibold">cognicodeedutech</span>{" "}
          <span className="text-foreground/90">
            {expanded || post.excerpt.length < 100
              ? post.excerpt
              : `${post.excerpt.slice(0, 100).trim()}…`}
          </span>
          {post.excerpt.length >= 100 ? (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="ml-1 text-muted-foreground hover:text-foreground"
            >
              {expanded ? "less" : "more"}
            </button>
          ) : null}
        </div>

        <p className="font-serif text-sm font-semibold leading-snug text-foreground sm:text-base">
          <Link prefetch={false} href={post.href} className="line-clamp-2 hover:underline">
            {post.title}
          </Link>
        </p>

        <div className="flex flex-wrap gap-x-2 gap-y-1 pt-0.5">
          <span className="text-xs font-medium text-sky-700 sm:text-sm">
            #{getCategoryName(post.category).replace(/\s+/g, "")}
          </span>
          <span className="text-xs font-medium text-sky-700 sm:text-sm">#PhDLife</span>
          <span className="hidden text-xs font-medium text-sky-700 sm:inline sm:text-sm">
            #ResearchTips
          </span>
        </div>

        <div className="flex flex-col gap-2 pt-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-2">
          <Link
            prefetch={false}
            href={post.href}
            className="text-xs text-muted-foreground hover:text-foreground sm:text-sm"
          >
            View full article · {post.readTime}
          </Link>
          <button
            type="button"
            onClick={shareNative}
            className="inline-flex w-fit items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <Share2 className="h-3.5 w-3.5" />
            {copied ? "Copied" : "Share"}
          </button>
        </div>
      </div>
    </article>
  );
}
