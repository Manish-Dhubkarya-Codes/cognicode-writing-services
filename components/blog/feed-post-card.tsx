"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MoreHorizontal,
  Play,
  Share2,
  BadgeCheck,
} from "lucide-react";
import { FeedPost } from "@/lib/blog-api";
import { getCategoryName } from "@/lib/blog-data";
import { cn } from "@/lib/utils";
import { PostEngagement } from "@/components/blog/post-engagement";
import { PostComments } from "@/components/blog/post-comments";
import { EngagementStats, recordPostShare } from "@/lib/blog-engagement";
import { useBlogLive } from "@/lib/blog-socket";

type FeedPostCardProps = {
  post: FeedPost;
  compact?: boolean;
  stats?: EngagementStats;
  onStats?: (slug: string, next: EngagementStats) => void;
};

export function FeedPostCard({
  post,
  compact = false,
  stats,
  onStats,
}: FeedPostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [copied, setCopied] = useState(false);
  const [localStats, setLocalStats] = useState<EngagementStats>({
    likes: stats?.likes ?? post.likes ?? 0,
    comments: stats?.comments ?? post.commentsCount ?? 0,
    shares: stats?.shares ?? post.sharesCount ?? 0,
    likedByMe: stats?.likedByMe ?? post.likedByMe ?? false,
    previewComments: stats?.previewComments || [],
  });

  useEffect(() => {
    if (!stats) return;
    setLocalStats(stats);
  }, [stats]);

  const likes = localStats.likes;
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
        await recordPostShare(post.slug, "native");
      } else {
        await navigator.clipboard.writeText(url);
        await recordPostShare(post.slug, "copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      // user cancelled
    }
  };

  const onStatsRef = useRef(onStats);
  onStatsRef.current = onStats;

  const pushStats = useCallback((next: EngagementStats) => {
    queueMicrotask(() => onStatsRef.current?.(post.slug, next));
  }, [post.slug]);

  const applyStats = useCallback((next: EngagementStats) => {
    setLocalStats((prev) => {
      const merged = {
        ...next,
        previewComments: next.previewComments ?? prev.previewComments,
      };
      pushStats(merged);
      return merged;
    });
  }, [pushStats]);

  const onLive = useCallback(
    (event: string, payload: any) => {
      if (payload?.slug && payload.slug !== post.slug) return;
      if (event === "blog:like" || event === "blog:share") {
        setLocalStats((prev) => ({
          ...prev,
          likes: typeof payload.likes === "number" ? payload.likes : prev.likes,
          comments: typeof payload.comments === "number" ? payload.comments : prev.comments,
          shares: typeof payload.shares === "number" ? payload.shares : prev.shares,
        }));
      }
      if (event === "blog:comment") {
        setLocalStats((prev) => ({
          ...prev,
          comments: typeof payload.comments === "number" ? payload.comments : prev.comments + 1,
          previewComments:
            payload.comment && !payload.comment.parentId
              ? [payload.comment, ...(prev.previewComments || [])].slice(0, 2)
              : prev.previewComments,
        }));
      }
    },
    [post.slug]
  );
  useBlogLive(onLive, post.slug);

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
      <a href={post.href} className="block min-w-0">
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
      </a>

      {/* Action bar */}
      <div className="px-2 pt-2 sm:px-3 sm:pt-3">
        <PostEngagement
          slug={post.slug}
          href={post.href}
          stats={localStats}
          onStats={applyStats}
          onComment={() => setShowComments((v) => !v)}
          compact
        />
      </div>

      <div className="space-y-1.5 px-3 pb-3 pt-0.5 sm:space-y-2 sm:px-4 sm:pb-4 sm:pt-1">
        <p className="text-xs font-semibold text-foreground sm:text-sm">
          {likes.toLocaleString()} likes
          {localStats.comments ? ` · ${localStats.comments} comments` : ""}
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
          <a href={post.href} className="line-clamp-2 hover:underline">
            {post.title}
          </a>
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

        {showComments && !compact ? (
          <PostComments
            slug={post.slug}
            href={post.href}
            variant="inline"
            onCount={(count) => {
              if (typeof count !== "number") return;
              applyStats({ ...localStats, comments: count });
            }}
          />
        ) : (
          <PostComments
            slug={post.slug}
            href={post.href}
            variant="preview"
            previewComments={localStats.previewComments || []}
            previewCount={localStats.comments}
            onOpen={() => setShowComments(true)}
          />
        )}

        <div className="flex flex-col gap-2 pt-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-2">
          <a
            href={post.href}
            className="text-xs text-muted-foreground hover:text-foreground sm:text-sm"
          >
            View full article · {post.readTime}
          </a>
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
