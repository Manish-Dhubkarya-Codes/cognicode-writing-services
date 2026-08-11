"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Download,
  FileSpreadsheet,
  FileText,
  ListChecks,
  Loader2,
  PlusCircle,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FeedPostCard } from "@/components/blog/feed-post-card";
import { SocialFollow } from "@/components/blog/social-follow";
import { NewsletterForm } from "@/components/blog/newsletter-form";
import {
  BlogCategorySlug,
  blogCategories,
  freeResources,
  getCategoryName,
} from "@/lib/blog-data";
import { companyProfile } from "@/lib/company-socials";
import { FeedPost, fetchFeedPosts } from "@/lib/blog-api";
import { cn } from "@/lib/utils";

const resourceIcon = {
  PDF: FileText,
  Excel: FileSpreadsheet,
  Checklist: ListChecks,
};

export function BlogListing() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogCategorySlug | "all">("all");
  const [visibleCount, setVisibleCount] = useState(9);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const admin = localStorage.getItem("admin");
      setIsAdmin(Boolean(admin));
    } catch {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchFeedPosts({ limit: 50 })
      .then((data) => {
        if (active) setPosts(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    let list = posts;
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) =>
        [p.title, p.excerpt, p.author.name, getCategoryName(p.category)]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    return list;
  }, [posts, category, query]);

  const visible = filtered.slice(0, visibleCount);
  const featured = filtered.find((p) => p.featured) || filtered[0];

  return (
    <>
      {/* Social-style hero */}
      <section className="border-b border-border/70 bg-gradient-to-b from-muted/70 to-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Company feed · Research tips · Free resources
              </div>
              <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                CogniCode on social-style insights
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                Scroll like Instagram. Learn like a mentor session. Practical
                thesis, literature review, data analysis, publishing, and AI
                research posts - plus free templates for scholars.
              </p>

              <form
                className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
                role="search"
              >
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setVisibleCount(9);
                    }}
                    placeholder="Search posts, e.g. literature review, SPSS, viva..."
                    className="h-12 rounded-full border-border/80 bg-background pl-10"
                    aria-label="Search blog"
                  />
                </div>
                <Button type="button" size="lg" className="h-12 rounded-full px-6">
                  Search
                </Button>
              </form>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Follow CogniCode
                </p>
                <SocialFollow variant="row" />
              </div>
            </div>

            {/* Company profile card (FB/IG style) */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400 p-[2px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-background font-serif text-lg font-bold text-primary">
                    CC
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h2 className="font-semibold text-foreground">
                      {companyProfile.name}
                    </h2>
                    <BadgeCheck className="h-4 w-4 fill-sky-500 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {companyProfile.tagline}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {companyProfile.bio}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl bg-muted/60 px-2 py-3">
                  <p className="text-sm font-bold text-foreground">
                    {posts.length || "12+"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">Posts</p>
                </div>
                <div className="rounded-xl bg-muted/60 px-2 py-3">
                  <p className="text-sm font-bold text-foreground">8K+</p>
                  <p className="text-[11px] text-muted-foreground">Scholars</p>
                </div>
                <div className="rounded-xl bg-muted/60 px-2 py-3">
                  <p className="text-sm font-bold text-foreground">4.9</p>
                  <p className="text-[11px] text-muted-foreground">Rating</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button className="flex-1 rounded-full" asChild>
                  <Link prefetch={false} href="/contact">
                    Message us
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1 rounded-full" asChild>
                  <a
                    href="https://www.instagram.com/cognicodethesiswriting"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Follow
                  </a>
                </Button>
              </div>

              {isAdmin ? (
                <Button
                  variant="secondary"
                  className="mt-3 w-full rounded-full"
                  asChild
                >
                  <Link prefetch={false} href="/blog/manage/">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Admin · Create blog post
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Stories-style categories */}
      <section className="sticky top-[4.5rem] z-30 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setVisibleCount(9);
              }}
              className="flex shrink-0 flex-col items-center gap-1.5"
            >
              <div
                className={cn(
                  "flex h-16 w-16 items-center justify-center rounded-full p-[2px]",
                  category === "all"
                    ? "bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400"
                    : "bg-border"
                )}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-background text-xs font-semibold">
                  All
                </div>
              </div>
              <span className="max-w-[4.5rem] truncate text-[11px] text-muted-foreground">
                All posts
              </span>
            </button>
            {blogCategories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  setCategory(cat.slug);
                  setVisibleCount(9);
                }}
                className="flex shrink-0 flex-col items-center gap-1.5"
              >
                <div
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full p-[2px]",
                    category === cat.slug
                      ? "bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400"
                      : "bg-border"
                  )}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-background px-1 text-center text-[10px] font-semibold leading-tight">
                    {cat.name.split(" ")[0]}
                  </div>
                </div>
                <span className="max-w-[4.5rem] truncate text-[11px] text-muted-foreground">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Feed + sidebar */}
      <section className="bg-muted/30 py-10 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <div className="mx-auto w-full max-w-xl space-y-6 lg:mx-0 lg:max-w-none">
            {loading ? (
              <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">
                  Loading company feed…
                </span>
              </div>
            ) : visible.length > 0 ? (
              <>
                {featured && category === "all" && !query ? (
                  <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] px-4 py-3 text-sm text-foreground">
                    <span className="font-semibold">Pinned insight · </span>
                    {featured.title}
                  </div>
                ) : null}
                {visible.map((post) => (
                  <FeedPostCard key={`${post.source}-${post.id}`} post={post} />
                ))}
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
                <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/40" />
                <p className="mt-4 font-medium text-foreground">No posts found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try another keyword or clear filters.
                </p>
                <Button
                  className="mt-6 rounded-full"
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                  }}
                >
                  Reset feed
                </Button>
              </div>
            )}

            {visibleCount < filtered.length ? (
              <div className="text-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                  onClick={() => setVisibleCount((c) => c + 6)}
                >
                  Load more posts
                </Button>
              </div>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-36 lg:self-start">
            <div className="rounded-2xl border border-border/80 bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Follow us
              </p>
              <p className="mt-2 font-serif text-lg font-semibold text-foreground">
                Stay connected with CogniCode
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Instagram reels, Facebook updates, LinkedIn carousels, and YouTube
                tip videos.
              </p>
              <div className="mt-4">
                <SocialFollow variant="stack" />
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Free resources
              </p>
              <div className="mt-4 space-y-3">
                {freeResources.slice(0, 4).map((resource) => {
                  const Icon = resourceIcon[resource.type];
                  return (
                    <Link
                      key={resource.id}
                      prefetch={false}
                      href={resource.href}
                      className="flex items-start gap-3 rounded-xl border border-border/60 px-3 py-3 transition-colors hover:bg-muted/50"
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {resource.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {resource.type} · Request download
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Button variant="outline" className="mt-4 w-full rounded-full" asChild>
                <Link prefetch={false} href="/contact">
                  <Download className="mr-2 h-4 w-4" />
                  Get templates
                </Link>
              </Button>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Soft next step
              </p>
              <p className="mt-2 font-serif text-lg font-semibold text-foreground">
                Need help applying this advice?
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Free consultation for thesis, literature review, data analysis,
                or publishing - no hard sell.
              </p>
              <Button className="mt-4 w-full rounded-full" asChild>
                <Link prefetch={false} href="/contact">
                  Talk to a mentor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {/* Resources band */}
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Free Research Resources
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Downloadable tools for real research work
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {freeResources.map((resource) => {
              const Icon = resourceIcon[resource.type];
              return (
                <div
                  key={resource.id}
                  className="rounded-2xl border border-border/80 bg-card p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                  <Button variant="outline" className="mt-5 w-full rounded-full" asChild>
                    <Link prefetch={false} href={resource.href}>
                      Request free download
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
            Get posts in your inbox
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Research tips, templates, and company updates - no spam.
          </p>
          <div className="mt-8">
            <NewsletterForm variant="dark" source="blog-home-social" />
          </div>
          <div className="mt-8 flex justify-center">
            <SocialFollow variant="pills" />
          </div>
        </div>
      </section>
    </>
  );
}
