"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bookmark,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Facebook,
  Heart,
  Linkedin,
  Link2,
  List,
  MessageCircle,
  Play,
  Send,
  Share2,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeedPostCard } from "@/components/blog/feed-post-card";
import { SocialFollow } from "@/components/blog/social-follow";
import { NewsletterForm } from "@/components/blog/newsletter-form";
import { FeedPost, getRelatedFeedPosts } from "@/lib/blog-api";
import { getCategoryName } from "@/lib/blog-data";
import { companySocials, getYoutubeEmbedUrl } from "@/lib/company-socials";
import { cn } from "@/lib/utils";

type ArticleViewProps = {
  post: FeedPost;
  allPosts?: FeedPost[];
};

export function ArticleView({ post, allPosts = [] }: ArticleViewProps) {
  const [activeId, setActiveId] = useState(post.sections[0]?.id ?? "");
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://cognicodeedutech.com${post.href}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const shareNative = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
      } else {
        await copyLink();
      }
    } catch {
      // cancelled
    }
  };

  return (
    <>
      <section className="bg-background pt-8 sm:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
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
              <li className="line-clamp-1 text-foreground">{post.title}</li>
            </ol>
          </nav>

          {/* Social post header */}
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400 p-[2px]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-background text-sm font-bold text-primary">
                  CC
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <p className="font-semibold text-foreground">cognicodeedutech</p>
                  <BadgeCheck className="h-4 w-4 fill-sky-500 text-white" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {getCategoryName(post.category)} · {post.author.name}
                </p>
              </div>
              <Button size="sm" className="rounded-full" asChild>
                <a
                  href="https://www.instagram.com/cognicodethesiswriting"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow
                </a>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Link
                prefetch={false}
                href={`/blog/category/${post.category}/`}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
              >
                {getCategoryName(post.category)}
              </Link>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>

            <h1 className="mt-5 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="mt-5">
              <SocialFollow variant="pills" />
            </div>
          </div>

          {/* Hero media */}
          <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-border/70 bg-muted">
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
                className="aspect-[16/9] w-full object-cover"
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
                  "relative aspect-[16/9] bg-gradient-to-br",
                  post.imageGradient
                )}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />
                <div className="absolute inset-0 flex items-end p-8 sm:p-12">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-white/70">
                      CogniCode Insights
                    </p>
                    <p className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
                      {post.imageLabel}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* IG-style actions */}
          <div className="mx-auto mt-4 flex max-w-4xl items-center justify-between px-1">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setLiked((v) => !v)}
                className="rounded-full p-2 hover:bg-muted"
                aria-label="Like"
              >
                <Heart
                  className={cn(
                    "h-6 w-6",
                    liked ? "fill-rose-500 text-rose-500" : "text-foreground"
                  )}
                />
              </button>
              <button type="button" className="rounded-full p-2 hover:bg-muted" aria-label="Comment">
                <MessageCircle className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={shareNative}
                className="rounded-full p-2 hover:bg-muted"
                aria-label="Share"
              >
                <Send className="h-5 w-5" />
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
          <p className="mx-auto mt-1 max-w-4xl px-2 text-sm font-semibold text-foreground">
            {((post.likes || 120) + (liked ? 1 : 0)).toLocaleString()} likes · Share on
            Instagram, LinkedIn, Facebook or YouTube community
          </p>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_260px]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-4">
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
                    />
                    <ShareButton
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                      label="X"
                      icon={Twitter}
                    />
                    <ShareButton
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      label="Facebook"
                      icon={Facebook}
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

            <article className="min-w-0">
              <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] p-6 sm:p-8">
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Key Takeaways
                </h2>
                <ul className="mt-5 space-y-3">
                  {post.keyTakeaways.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-foreground/90 sm:text-base"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <details className="mt-8 rounded-2xl border border-border p-4 lg:hidden">
                <summary className="cursor-pointer list-none font-semibold text-foreground">
                  <span className="inline-flex items-center gap-2">
                    <List className="h-4 w-4" />
                    Table of contents
                  </span>
                </summary>
                <nav className="mt-4 space-y-2 border-t border-border pt-4">
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

              <div className="mt-10 space-y-12">
                {post.sections.map((section, index) => (
                  <div key={section.id}>
                    {section.level === 2 ? (
                      <h2
                        id={section.id}
                        className="scroll-mt-32 font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                      >
                        {section.heading}
                      </h2>
                    ) : (
                      <h3
                        id={section.id}
                        className="scroll-mt-32 font-serif text-xl font-semibold text-foreground sm:text-2xl"
                      >
                        {section.heading}
                      </h3>
                    )}

                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 48)}
                          className="text-base leading-8 text-muted-foreground sm:text-[1.05rem]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.bullets?.length ? (
                      <ul className="mt-5 space-y-2.5">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-base leading-7 text-muted-foreground"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {section.callout ? (
                      <div className="mt-6 rounded-2xl border border-border bg-muted/50 p-5 text-sm leading-7 text-foreground sm:text-base">
                        {section.callout}
                      </div>
                    ) : null}

                    {index === Math.min(3, post.sections.length - 2) ? (
                      <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                          Expert support
                        </p>
                        <h3 className="mt-2 font-serif text-xl font-bold text-foreground sm:text-2xl">
                          {post.serviceCta.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                          {post.serviceCta.description}
                        </p>
                        <Button className="mt-5 rounded-full" asChild>
                          <Link prefetch={false} href={post.serviceCta.href}>
                            {post.serviceCta.buttonLabel}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ) : null}

                    {post.resource &&
                    index === Math.min(2, post.sections.length - 1) ? (
                      <div className="mt-10 overflow-hidden rounded-2xl bg-foreground p-6 text-background sm:p-8">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-background/60">
                              Free downloadable resource
                            </p>
                            <h3 className="mt-2 font-serif text-xl font-bold sm:text-2xl">
                              {post.resource.title}
                            </h3>
                            <p className="mt-2 max-w-xl text-sm leading-7 text-background/70 sm:text-base">
                              {post.resource.description}
                            </p>
                          </div>
                          <Button
                            variant="secondary"
                            size="lg"
                            asChild
                            className="shrink-0 rounded-full"
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
              <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <Play className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Prefer short-form tips?
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Follow CogniCode on Instagram, Facebook, LinkedIn and YouTube for
                      reels, carousels, and walkthroughs based on guides like this one.
                    </p>
                    <div className="mt-4">
                      <SocialFollow variant="stack" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-2xl border border-primary/15 bg-primary/[0.04] p-6 sm:p-8">
                <h3 className="font-serif text-2xl font-bold text-foreground">
                  {post.serviceCta.title}
                </h3>
                <p className="mt-3 text-muted-foreground">
                  {post.serviceCta.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button className="rounded-full" asChild>
                    <Link prefetch={false} href={post.serviceCta.href}>
                      {post.serviceCta.buttonLabel}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="rounded-full" asChild>
                    <Link prefetch={false} href="/contact">
                      Free consultation
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="mt-12 rounded-2xl border border-border p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-lg font-bold text-primary">
                    {post.author.initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      About the author
                    </p>
                    <h3 className="mt-1 font-serif text-xl font-bold text-foreground">
                      {post.author.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {post.author.role}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                      {post.author.bio}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-8">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  <Share2 className="h-4 w-4" />
                  Share this guide
                </span>
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
            </article>

            <aside className="hidden xl:block">
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
        <section className="bg-muted/50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Continue scrolling
                </p>
                <h2 className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  Related posts
                </h2>
              </div>
              <Button variant="outline" className="rounded-full" asChild>
                <Link prefetch={false} href="/blog/">
                  All posts
                </Link>
              </Button>
            </div>
            <div className="mx-auto grid max-w-xl gap-6 lg:max-w-none lg:grid-cols-3">
              {related.map((item) => (
                <FeedPostCard key={item.id} post={item} compact />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-primary py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground">
            Get the next practical guide
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Research tips and templates for scholars - concise and useful.
          </p>
          <div className="mt-8">
            <NewsletterForm variant="dark" source={`article-${post.slug}`} />
          </div>
        </div>
      </section>
    </>
  );
}

function ShareButton({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </a>
  );
}
