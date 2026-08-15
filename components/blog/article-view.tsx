"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Facebook,
  Linkedin,
  Link2,
  List,
  Play,
  Share2,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeedPostCard } from "@/components/blog/feed-post-card";
import { SocialFollow } from "@/components/blog/social-follow";
import { NewsletterForm } from "@/components/blog/newsletter-form";
import { PostEngagement } from "@/components/blog/post-engagement";
import { PostComments } from "@/components/blog/post-comments";
import { FollowButton } from "@/components/blog/follow-button";
import { FeedPost, getRelatedFeedPosts } from "@/lib/blog-api";
import { getCategoryName } from "@/lib/blog-data";
import { companySocials, getYoutubeEmbedUrl } from "@/lib/company-socials";
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

  const toc = post.sections.map((s) => ({ id: s.id, heading: s.heading }));
  const youtubeEmbed = getYoutubeEmbedUrl(post.youtubeUrl);
  const heroMedia =
    post.mediaGallery?.filter(Boolean)?.[0] ||
    post.coverImage ||
    post.coverVideo ||
    "";

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
    <div className="w-full min-w-0 overflow-x-hidden">
      <section className="bg-background pt-5 sm:pt-8 md:pt-12">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <nav className="mb-4 text-xs text-muted-foreground sm:mb-6 sm:text-sm" aria-label="Breadcrumb">
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
              <li className="hidden sm:inline">/</li>
              <li className="hidden min-w-0 max-w-[50%] truncate text-foreground sm:block">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Social post header */}
          <div className="mx-auto max-w-3xl min-w-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400 p-[2px] sm:h-12 sm:w-12">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-background text-xs font-bold text-primary sm:text-sm">
                  CC
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="truncate text-sm font-semibold text-foreground sm:text-base">
                    cognicodeedutech
                  </p>
                  <BadgeCheck className="h-4 w-4 shrink-0 fill-sky-500 text-white" />
                </div>
                <p className="truncate text-xs text-muted-foreground sm:text-sm">
                  {getCategoryName(post.category)} · {post.author.name}
                </p>
              </div>
              <FollowButton source="follow-article" />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:mt-6 sm:gap-3 sm:text-sm">
              <Link
                prefetch={false}
                href={`/blog/category/${post.category}/`}
                className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary sm:px-3 sm:text-xs"
              >
                {getCategoryName(post.category)}
              </Link>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {post.readTime}
              </span>
            </div>

            <h1 className="mt-4 break-words font-serif text-2xl font-bold tracking-tight text-foreground sm:mt-5 sm:text-3xl md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:mt-5 sm:text-base sm:leading-7 md:text-lg md:leading-8">
              {post.excerpt}
            </p>

            <div className="mt-4 sm:mt-5">
              <SocialFollow variant="pills" />
            </div>
          </div>

          {/* Hero media */}
          <div className="relative mx-auto mt-6 max-w-4xl overflow-hidden rounded-xl border border-border/70 bg-muted sm:mt-10 sm:rounded-2xl md:rounded-3xl">
            {youtubeEmbed ? (
              <div className="aspect-video w-full">
                <iframe
                  src={youtubeEmbed}
                  title={post.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : heroMedia && !/\.(mp4|webm|mov)(\?|$)/i.test(heroMedia) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroMedia}
                alt={post.title}
                className="aspect-[16/10] w-full object-cover sm:aspect-[16/9]"
              />
            ) : heroMedia ? (
              <video
                src={heroMedia}
                className="aspect-video w-full object-cover"
                controls
                playsInline
              />
            ) : (
              <div
                className={cn(
                  "relative aspect-[16/10] bg-gradient-to-br sm:aspect-[16/9]",
                  post.imageGradient
                )}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
                <div className="absolute inset-0 flex items-end p-4 sm:p-8 md:p-12">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/70 sm:text-sm sm:tracking-[0.2em]">
                      CogniCode Insights
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold text-white sm:mt-2 sm:text-3xl md:text-4xl">
                      {post.imageLabel}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* IG-style actions */}
          <div className="mx-auto mt-3 max-w-4xl sm:mt-4">
            <PostEngagement
              slug={post.slug}
              href={post.href}
              stats={stats}
              onStats={setStats}
              onComment={() => {
                document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>
          <p className="mx-auto mt-1 max-w-4xl text-xs font-semibold leading-5 text-foreground sm:text-sm">
            {stats.likes.toLocaleString()} likes
            {stats.comments ? ` · ${stats.comments} comments` : ""}
            <span className="hidden sm:inline">
              {" "}
              · Share on Instagram, LinkedIn, Facebook or YouTube
            </span>
          </p>
          <div className="mx-auto mt-5 max-w-4xl border-t border-border pt-5 sm:mt-6 sm:pt-6">
            <PostComments
              slug={post.slug}
              href={post.href}
              onCount={(count) =>
                setStats((prev) => ({ ...prev, comments: count || prev.comments }))
              }
            />
          </div>
        </div>
      </section>

      <section className="bg-background py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="grid min-w-0 gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[260px_minmax(0,1fr)_240px] xl:gap-12">
            <aside className="hidden min-w-0 lg:block">
              <div className="sticky top-24 space-y-4 xl:top-28">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <List className="h-4 w-4" />
                  Table of contents
                </div>
                <nav className="space-y-1 border-l border-border pl-4">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={cn(
                        "block py-1.5 text-sm leading-snug transition-colors",
                        activeId === item.id
                          ? "font-medium text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.heading}
                    </a>
                  ))}
                </nav>

                <div className="rounded-2xl border border-border/80 bg-muted/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Share this post
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
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
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <Link2 className="h-3.5 w-3.5" />
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            <article className="min-w-0 overflow-hidden">
              <div className="rounded-xl border border-primary/15 bg-primary/[0.04] p-4 sm:rounded-2xl sm:p-6 md:p-8">
                <h2 className="font-serif text-lg font-bold text-foreground sm:text-xl">
                  Key Takeaways
                </h2>
                <ul className="mt-3 space-y-2.5 sm:mt-5 sm:space-y-3">
                  {post.keyTakeaways.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-foreground/90 sm:gap-3 sm:text-base"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />
                      <span className="min-w-0 break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <details className="mt-5 rounded-xl border border-border p-3 sm:mt-8 sm:rounded-2xl sm:p-4 lg:hidden">
                <summary className="cursor-pointer list-none text-sm font-semibold text-foreground sm:text-base">
                  <span className="inline-flex items-center gap-2">
                    <List className="h-4 w-4" />
                    Table of contents
                  </span>
                </summary>
                <nav className="mt-3 space-y-2 border-t border-border pt-3 sm:mt-4 sm:pt-4">
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

              <div className="mt-6 space-y-8 sm:mt-10 sm:space-y-12">
                {post.sections.map((section, index) => (
                  <div key={section.id} className="min-w-0">
                    {section.level === 2 ? (
                      <h2
                        id={section.id}
                        className="scroll-mt-28 break-words font-serif text-xl font-bold tracking-tight text-foreground sm:scroll-mt-32 sm:text-2xl md:text-3xl"
                      >
                        {section.heading}
                      </h2>
                    ) : (
                      <h3
                        id={section.id}
                        className="scroll-mt-28 break-words font-serif text-lg font-semibold text-foreground sm:scroll-mt-32 sm:text-xl md:text-2xl"
                      >
                        {section.heading}
                      </h3>
                    )}

                    <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 48)}
                          className="break-words text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 md:text-[1.05rem]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.bullets?.length ? (
                      <ul className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-2.5 text-sm leading-6 text-muted-foreground sm:gap-3 sm:text-base sm:leading-7"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span className="min-w-0 break-words">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {section.callout ? (
                      <div className="mt-5 rounded-xl border border-border bg-muted/50 p-3 text-sm leading-6 text-foreground sm:mt-6 sm:rounded-2xl sm:p-5 sm:leading-7 sm:text-base">
                        {section.callout}
                      </div>
                    ) : null}

                    {index === Math.min(3, post.sections.length - 2) ? (
                      <div className="mt-6 rounded-xl border border-border bg-card p-4 sm:mt-10 sm:rounded-2xl sm:p-6 md:p-8">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary sm:text-xs">
                          Expert support
                        </p>
                        <h3 className="mt-2 font-serif text-lg font-bold text-foreground sm:text-xl md:text-2xl">
                          {post.serviceCta.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground sm:mt-3 sm:leading-7 sm:text-base">
                          {post.serviceCta.description}
                        </p>
                        <Button className="mt-4 w-full rounded-full sm:mt-5 sm:w-auto" asChild>
                          <Link prefetch={false} href={post.serviceCta.href}>
                            {post.serviceCta.buttonLabel}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ) : null}

                    {post.resource &&
                    index === Math.min(2, post.sections.length - 1) ? (
                      <div className="mt-6 overflow-hidden rounded-xl bg-foreground p-4 text-background sm:mt-10 sm:rounded-2xl sm:p-6 md:p-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-background/60 sm:text-xs">
                              Free downloadable resource
                            </p>
                            <h3 className="mt-2 font-serif text-lg font-bold sm:text-xl md:text-2xl">
                              {post.resource.title}
                            </h3>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-background/70 sm:leading-7 sm:text-base">
                              {post.resource.description}
                            </p>
                          </div>
                          <Button
                            variant="secondary"
                            size="lg"
                            asChild
                            className="w-full shrink-0 rounded-full sm:w-auto"
                          >
                            <Link prefetch={false} href="/contact">
                              <Download className="mr-2 h-4 w-4" />
                              {post.resource.fileLabel}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              {/* Company social CTA */}
              <div className="mt-8 rounded-xl border border-border bg-muted/40 p-4 sm:mt-12 sm:rounded-2xl sm:p-6 md:p-8">
                <div className="flex items-start gap-3">
                  <Play className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg font-bold text-foreground sm:text-xl">
                      Prefer short-form tips?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground sm:leading-7">
                      Follow CogniCode on Instagram, Facebook, LinkedIn and YouTube for
                      reels, carousels, and walkthroughs based on guides like this one.
                    </p>
                    <div className="mt-4">
                      <SocialFollow variant="stack" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-primary/15 bg-primary/[0.04] p-4 sm:mt-12 sm:rounded-2xl sm:p-6 md:p-8">
                <h3 className="font-serif text-lg font-bold text-foreground sm:text-2xl">
                  {post.serviceCta.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground sm:mt-3 sm:text-base">
                  {post.serviceCta.description}
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
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

              <div className="mt-8 rounded-xl border border-border p-4 sm:mt-12 sm:rounded-2xl sm:p-6 md:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-base font-bold text-primary sm:h-16 sm:w-16 sm:rounded-2xl sm:text-lg">
                    {post.author.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
                      About the author
                    </p>
                    <h3 className="mt-1 font-serif text-lg font-bold text-foreground sm:text-xl">
                      {post.author.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {post.author.role}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground sm:mt-3 sm:leading-7 sm:text-base">
                      {post.author.bio}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:pt-8">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  <Share2 className="h-4 w-4" />
                  Share this guide
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
            </article>

            <aside className="hidden min-w-0 xl:block">
              <div className="sticky top-28 space-y-4">
                <div className="rounded-2xl border border-border bg-muted/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Need help with this topic?
                  </p>
                  <p className="mt-3 font-serif text-lg font-semibold text-foreground">
                    Soft support, not hard sell
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Talk to a mentor about {getCategoryName(post.category).toLowerCase()}{" "}
                    for your current chapter or manuscript.
                  </p>
                  <Button className="mt-5 w-full rounded-full" asChild>
                    <Link prefetch={false} href={post.serviceCta.href}>
                      Related service
                    </Link>
                  </Button>
                  <Button className="mt-2 w-full rounded-full" variant="outline" asChild>
                    <Link prefetch={false} href="/contact">
                      Contact us
                    </Link>
                  </Button>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Follow CogniCode
                  </p>
                  <SocialFollow variant="stack" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-muted/50 py-10 sm:py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
                  Continue scrolling
                </p>
                <h2 className="mt-1 font-serif text-xl font-bold text-foreground sm:mt-2 sm:text-2xl md:text-3xl">
                  Related posts
                </h2>
              </div>
              <Button variant="outline" className="w-full rounded-full sm:w-auto" asChild>
                <Link prefetch={false} href="/blog/">
                  All posts
                </Link>
              </Button>
            </div>
            <div className="mx-auto grid max-w-xl grid-cols-1 gap-4 sm:gap-6 lg:max-w-none lg:grid-cols-3">
              {related.map((item) => (
                <FeedPostCard key={item.id} post={item} compact />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-primary py-10 sm:py-16">
        <div className="mx-auto max-w-2xl px-3 text-center sm:px-6">
          <h2 className="font-serif text-2xl font-bold text-primary-foreground sm:text-3xl">
            Get the next practical guide
          </h2>
          <p className="mt-3 text-sm text-primary-foreground/80 sm:mt-4 sm:text-base">
            Research tips and templates for scholars — concise and useful.
          </p>
          <div className="mt-6 sm:mt-8">
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
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </a>
  );
}
