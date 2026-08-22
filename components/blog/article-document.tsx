"use client";

import { Calendar, CheckCircle2, Clock, Download } from "lucide-react";
import Link from "next/link";
import { ContentBlockRenderer } from "@/components/blog/content-block-renderer";
import { FeedPost } from "@/lib/blog-api";
import { getCategoryName } from "@/lib/blog-data";
import { getPostType } from "@/lib/blog-content";
import { getYoutubeEmbedUrl } from "@/lib/company-socials";
import { cn } from "@/lib/utils";
import { fileOpenProps, isPdfFile } from "@/lib/blog-file";

type ArticleDocumentProps = {
  post: FeedPost;
  compact?: boolean;
};

function formatUpdated(iso?: string, fallback?: string) {
  const value = iso || fallback;
  if (!value) return fallback || "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return fallback || "";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function ArticleDocument({ post, compact = false }: ArticleDocumentProps) {
  const typeMeta = getPostType(post.postType);
  const tags = (post.tags || post.keywords || []).slice(0, 8);
  const youtubeEmbed = getYoutubeEmbedUrl(post.youtubeUrl);
  const heroMedia =
    post.coverImage ||
    post.mediaGallery?.find((u) => u && !/\.(mp4|webm|mov)(\?|$)/i.test(u)) ||
    post.coverVideo ||
    "";
  const isVideo = Boolean(post.coverVideo) || /\.(mp4|webm|mov)(\?|$)/i.test(heroMedia);

  return (
    <div className={cn("article-document min-w-0", compact && "text-[15px]")}>
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:text-sm">
        <span className="rounded-md bg-primary px-2 py-0.5 font-semibold text-primary-foreground">
          {typeMeta.shortLabel}
        </span>
        <Link
          prefetch={false}
          href={`/blog/category/${post.category}/`}
          className="font-medium text-primary hover:underline"
        >
          {getCategoryName(post.category)}
        </Link>
        {post.difficulty ? <span className="capitalize">· {post.difficulty}</span> : null}
      </div>

      <h1 className="mt-3 break-words text-[1.75rem] font-bold leading-tight tracking-tight text-foreground sm:mt-4 sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
        {post.title || "Untitled article"}
      </h1>
      {post.subtitle ? (
        <p className="mt-2 text-base font-medium text-foreground/80 sm:text-lg">{post.subtitle}</p>
      ) : null}

      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground sm:text-sm">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          Last Updated : {formatUpdated(post.updatedISO, post.dateISO) || post.date}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {post.readTime}
        </span>
        <span>By {post.author.name}</span>
      </p>

      {tags.length ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {post.excerpt ? (
        <p className="mt-5 text-[1.05rem] leading-8 text-foreground/90 sm:text-lg sm:leading-8">
          {post.excerpt}
        </p>
      ) : null}

      {youtubeEmbed ? (
        <div className="mt-6 overflow-hidden rounded-md border border-border">
          <div className="aspect-video">
            <iframe
              src={youtubeEmbed}
              title={post.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ) : heroMedia && !isVideo ? (
        <figure className="mt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroMedia}
            alt={post.title}
            className="w-full rounded-md border border-border object-cover"
          />
        </figure>
      ) : heroMedia ? (
        <video src={heroMedia} className="mt-6 w-full rounded-md border border-border" controls playsInline />
      ) : null}

      {post.keyTakeaways?.length ? (
        <div className="mt-8 rounded-md border border-primary/20 bg-primary/[0.04] p-4 sm:p-5">
          <h2 className="text-lg font-bold text-foreground">Key Takeaways</h2>
          <ul className="mt-3 space-y-2">
            {post.keyTakeaways.filter(Boolean).map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-6 text-foreground/90 sm:text-base">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="article-body mt-8 space-y-5 sm:space-y-6">
        {post.sections.map((block) => (
          <ContentBlockRenderer key={block.id} block={block} />
        ))}
      </div>

      {post.resource?.url ? (
        <a
          {...fileOpenProps(post.resource.url, {
            fileType: post.resource.fileType,
            name: post.resource.title || post.resource.fileLabel,
          })}
          className="mt-8 flex items-start gap-3 rounded-md bg-foreground p-4 text-background transition-opacity hover:opacity-95 sm:gap-4 sm:p-6"
        >
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background/15">
            <Download className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-background/60">
              Free resource
            </p>
            <h3 className="mt-1 text-lg font-bold">{post.resource.title}</h3>
            {post.resource.description ? (
              <p className="mt-1 text-sm text-background/70">{post.resource.description}</p>
            ) : null}
            <p className="mt-2 text-sm font-medium text-background/80">
              {isPdfFile(post.resource.url, post.resource.fileType, post.resource.title)
                ? "Open PDF in a new tab"
                : "Click to download"}
            </p>
          </span>
        </a>
      ) : null}
    </div>
  );
}
