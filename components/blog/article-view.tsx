"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Facebook,
  Linkedin,
  Link2,
  List,
  Share2,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialFollow } from "@/components/blog/social-follow";
import { NewsletterForm } from "@/components/blog/newsletter-form";
import { PostEngagement } from "@/components/blog/post-engagement";
import { PostComments } from "@/components/blog/post-comments";
import { FeedPost, getRelatedFeedPosts } from "@/lib/blog-api";
import { getCategoryName } from "@/lib/blog-data";
import { isTocBlock } from "@/lib/blog-content";
import { ArchiveArticleCard } from "@/components/blog/archive-article-card";
import { ArticleDocument } from "@/components/blog/article-document";
import { companySocials } from "@/lib/company-socials";
import { cn } from "@/lib/utils";
import {
  EngagementStats,
  fetchPostEngagement,
  recordPostShare,
  recordPostVisit,
} from "@/lib/blog-engagement";
import { useBlogLive } from "@/lib/blog-socket";

type ArticleViewProps = {
  post: FeedPost;
  allPosts?: FeedPost[];
};

export function ArticleView({ post, allPosts = [] }: ArticleViewProps) {
  const [activeId, setActiveId] = useState(post.sections[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<EngagementStats>({
    likes: post.likes || 0,
    comments: post.commentsCount || 0,
    shares: post.sharesCount || 0,
    likedByMe: post.likedByMe || false,
  });

  const related = useMemo(() => {
    if (allPosts.length) return getRelatedFeedPosts(post, allPosts, 3);
    return [];
  }, [post, allPosts]);

  const toc = post.sections
    .filter((s) => isTocBlock(s) && (s.heading || "").trim())
    .map((s) => ({ id: s.id, heading: s.heading || "Section" }));

  useEffect(() => {
    const headings = toc
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  useEffect(() => {
    let active = true;
    fetchPostEngagement(post.slug).then((data) => {
      if (!active) return;
      setStats({
        likes: data.likes || 0,
        comments: data.comments || 0,
        shares: data.shares || 0,
        likedByMe: Boolean(data.likedByMe),
      });
    });
    recordPostVisit(post.slug);
    return () => {
      active = false;
    };
  }, [post.slug]);

  const onLive = useCallback((event: string, payload: any) => {
    if (payload?.slug && payload.slug !== post.slug) return;
    if (event === "blog:like" || event === "blog:share" || event === "blog:comment" || event === "blog:comment-deleted") {
      setStats((prev) => ({
        ...prev,
        likes: typeof payload.likes === "number" ? payload.likes : prev.likes,
        comments: typeof payload.comments === "number" ? payload.comments : prev.comments,
        shares: typeof payload.shares === "number" ? payload.shares : prev.shares,
      }));
    }
  }, [post.slug]);
  useBlogLive(onLive, post.slug);

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://cognicodeedutech.com${post.href}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      await recordPostShare(post.slug, "copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full min-w-0 overflow-x-hidden bg-background">
      <section className="border-b border-border/70 bg-background pt-5 sm:pt-8">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <nav className="mb-5 text-xs text-muted-foreground sm:mb-8 sm:text-sm" aria-label="Breadcrumb">
            <ol className="flex min-w-0 flex-wrap items-center gap-1.5 sm:gap-2">
              <li>
                <Link prefetch={false} href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link prefetch={false} href="/blog/" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  prefetch={false}
                  href={`/blog/category/${post.category}/`}
                  className="hover:text-primary"
                >
                  {getCategoryName(post.category)}
                </Link>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="bg-background py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="grid min-w-0 gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[240px_minmax(0,1fr)_250px] xl:gap-12">
            <aside className="hidden min-w-0 lg:block">
              <div className="sticky top-24 space-y-5 xl:top-28">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <List className="h-4 w-4" />
                    Table of contents
                  </div>
                  <nav className="mt-3 space-y-0.5 border-l border-border pl-3">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={cn(
                          "block py-1.5 text-[13px] leading-snug transition-colors",
                          activeId === item.id
                            ? "font-medium text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.heading}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="rounded-md border border-border bg-muted/40 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Share
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <ShareButton
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      label="LinkedIn"
                      icon={Linkedin}
                      onShare={() => recordPostShare(post.slug, "linkedin")}
                    />
                    <ShareButton
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                      label="X"
                      icon={Twitter}
                      onShare={() => recordPostShare(post.slug, "x")}
                    />
                    <ShareButton
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      label="Facebook"
                      icon={Facebook}
                      onShare={() => recordPostShare(post.slug, "facebook")}
                    />
                    <button
                      type="button"
                      onClick={copyLink}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground"
                    >
                      <Link2 className="h-3.5 w-3.5" />
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            <article className="min-w-0">
              <details className="mb-5 rounded-md border border-border p-3 lg:hidden">
                <summary className="cursor-pointer list-none text-sm font-semibold">
                  <span className="inline-flex items-center gap-2">
                    <List className="h-4 w-4" />
                    Table of contents
                  </span>
                </summary>
                <nav className="mt-3 space-y-2 border-t border-border pt-3">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-muted-foreground hover:text-primary"
                    >
                      {item.heading}
                    </a>
                  ))}
                </nav>
              </details>

              <ArticleDocument post={post} />

              <div className="mt-10 rounded-md border border-primary/15 bg-primary/[0.04] p-4 sm:p-6">
                <h3 className="text-lg font-bold text-foreground sm:text-xl">
                  {post.serviceCta.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  {post.serviceCta.description}
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                  <Button className="w-full rounded-full sm:w-auto" asChild>
                    <Link prefetch={false} href={post.serviceCta.href}>
                      {post.serviceCta.buttonLabel}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full rounded-full sm:w-auto" asChild>
                    <Link prefetch={false} href="/contact">
                      Free consultation
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="mt-8 rounded-md border border-border p-4 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  About the author
                </p>
                <div className="mt-3 flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-sm font-bold text-primary">
                    {post.author.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{post.author.name}</h3>
                    <p className="text-sm text-primary">{post.author.role}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{post.author.bio}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6">
                <span className="inline-flex items-center gap-2 text-sm font-medium">
                  <Share2 className="h-4 w-4" />
                  Share this article
                </span>
                <div className="flex flex-wrap gap-2">
                  {companySocials.map((s) => (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      {s.name}
                    </a>
                  ))}
                  <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <Link2 className="h-3.5 w-3.5" />
                    {copied ? "Link copied" : "Copy link"}
                  </button>
                </div>
              </div>

              <div id="comments" className="mt-10 border-t border-border pt-6">
                <PostEngagement
                  slug={post.slug}
                  href={post.href}
                  stats={stats}
                  onStats={setStats}
                  onComment={() => {
                    document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" });
                  }}
                />
                <p className="mt-2 text-sm font-medium">
                  {stats.likes.toLocaleString()} likes
                  {stats.comments ? ` · ${stats.comments} comments` : ""}
                </p>
                <div className="mt-4">
                  <PostComments
                    slug={post.slug}
                    href={post.href}
                    onCount={(count) =>
                      setStats((prev) => ({ ...prev, comments: count || prev.comments }))
                    }
                  />
                </div>
              </div>
            </article>

            <aside className="hidden min-w-0 xl:block">
              <div className="sticky top-28 space-y-4">
                <div className="rounded-md border border-border bg-muted/40 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Need help with this topic?
                  </p>
                  <p className="mt-2 font-semibold text-foreground">
                    Mentors for {getCategoryName(post.category).toLowerCase()}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Soft support for the chapter or manuscript you are writing now.
                  </p>
                  <Button className="mt-4 w-full rounded-full" asChild>
                    <Link prefetch={false} href={post.serviceCta.href}>
                      Related service
                    </Link>
                  </Button>
                </div>
                <div className="rounded-md border border-border bg-card p-4">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Follow CogniCode
                  </p>
                  <SocialFollow variant="stack" />
                </div>
                {related.length ? (
                  <div className="rounded-md border border-border bg-card p-4">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Similar Topics
                    </p>
                    <ul className="space-y-2">
                      {related.map((item) => (
                        <li key={item.slug}>
                          <Link
                            prefetch={false}
                            href={item.href}
                            className="text-sm leading-5 text-foreground hover:text-primary"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-muted/40 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Similar topics
                </p>
                <h2 className="mt-1 text-2xl font-bold">Recent Articles</h2>
              </div>
              <Button variant="outline" className="hidden rounded-full sm:inline-flex" asChild>
                <Link prefetch={false} href="/blog/">
                  All articles
                </Link>
              </Button>
            </div>
            <div className="space-y-4">
              {related.map((item) => (
                <ArchiveArticleCard key={item.id} post={item} compact />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-primary py-10 sm:py-14">
        <div className="mx-auto max-w-2xl px-3 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
            Get the next practical guide
          </h2>
          <p className="mt-3 text-sm text-primary-foreground/80">
            Research tips and templates for scholars — concise and useful.
          </p>
          <div className="mt-6">
            <NewsletterForm variant="dark" source={`article-${post.slug}`} />
          </div>
        </div>
      </section>
    </div>
  );
}

function ShareButton({
  href,
  label,
  icon: Icon,
  onShare,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onShare?: () => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onShare?.()}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </a>
  );
}
