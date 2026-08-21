"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { FeedPost } from "@/lib/blog-api";
import { getCategoryName } from "@/lib/blog-data";
import { getPostType } from "@/lib/blog-content";
import { cn } from "@/lib/utils";

type ArchiveArticleCardProps = {
  post: FeedPost;
  compact?: boolean;
};

function formatUpdated(iso?: string, fallback?: string) {
  const value = iso || fallback;
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return fallback || "";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function ArchiveArticleCard({ post, compact = false }: ArchiveArticleCardProps) {
  const typeMeta = getPostType(post.postType);
  const thumb =
    post.coverImage ||
    post.mediaGallery?.find((u) => u && !/\.(mp4|webm|mov)(\?|$)/i.test(u)) ||
    "";
  const tags = (post.tags || []).slice(0, 5);

  return (
    <article className="group min-w-0 overflow-hidden rounded-xl border border-border/80 bg-card p-3 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-md sm:p-5">
      <div className={cn("grid gap-3 sm:gap-5", compact ? "" : "sm:grid-cols-[minmax(0,1fr)_220px] lg:grid-cols-[minmax(0,1fr)_260px]")}>
        <div className="min-w-0 order-2 sm:order-1">
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">
              {typeMeta.shortLabel}
            </span>
            <Link
              prefetch={false}
              href={`/blog/category/${post.category}/`}
              className="hover:text-primary"
            >
              {getCategoryName(post.category)}
            </Link>
            {post.difficulty ? (
              <span className="capitalize">· {post.difficulty}</span>
            ) : null}
          </div>

          <h2 className="mt-1.5 font-serif text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl md:text-[1.35rem]">
            <Link prefetch={false} href={post.href} className="line-clamp-2">
              {post.title}
            </Link>
          </h2>

          <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground sm:text-sm">
            <Calendar className="h-3.5 w-3.5" />
            Last Updated: {formatUpdated(post.updatedISO, post.date)}
            <span className="hidden sm:inline">· {post.readTime}</span>
          </p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground line-clamp-3 sm:mt-3 sm:leading-7">
            {post.excerpt}
            {" "}
            <Link prefetch={false} href={post.href} className="font-medium text-primary hover:underline">
              read more
            </Link>
          </p>

          {tags.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <Link
          prefetch={false}
          href={post.href}
          className="order-1 block overflow-hidden rounded-lg sm:order-2 sm:rounded-xl"
        >
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumb}
              alt=""
              className="aspect-[16/10] h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] sm:aspect-[4/3] sm:min-h-[140px]"
            />
          ) : (
            <div
              className={cn(
                "flex aspect-[16/10] items-end bg-gradient-to-br p-3 sm:aspect-[4/3] sm:min-h-[140px]",
                post.imageGradient
              )}
            >
              <span className="font-serif text-sm font-semibold text-white sm:text-base">
                {post.imageLabel}
              </span>
            </div>
          )}
        </Link>
      </div>
    </article>
  );
}
