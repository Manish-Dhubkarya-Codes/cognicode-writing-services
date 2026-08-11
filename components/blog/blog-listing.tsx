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
    <div className="w-full min-w-0 overflow-x-hidden">
      {/* Social-style hero */}
      <section className="border-b border-border/70 bg-gradient-to-b from-muted/70 to-background">
        <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="min-w-0">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground sm:px-3 sm:text-xs">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="truncate">Company feed · Research tips · Free resources</span>
              </div>
              <h1 className="mt-3 font-serif text-2xl font-bold tracking-tight text-foreground xs:text-3xl sm:mt-4 sm:text-4xl md:text-5xl">
                CogniCode on social-style insights
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-base sm:leading-7 md:text-lg md:leading-8">
                Scroll like Instagram. Learn like a mentor session. Practical
                thesis, literature review, data analysis, publishing, and AI
                research posts — plus free templates for scholars.
              </p>

              <form
                className="mt-5 flex w-full max-w-xl flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3"
                onSubmit={(e) => e.preventDefault()}
                role="search"
              >
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setVisibleCount(9);
                    }}
                    placeholder="Search posts, e.g. SPSS, viva..."
                    className="h-11 w-full rounded-full border-border/80 bg-background pl-10 text-sm sm:h-12 sm:text-base"
                    aria-label="Search blog"
                  />
                </div>
                <Button type="button" size="lg" className="h-11 w-full shrink-0 rounded-full px-6 sm:h-12 sm:w-auto">
                  Search
                </Button>
              </form>

              <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Follow CogniCode
                </p>
                <SocialFollow variant="row" />
              </div>
            </div>

            {/* Company profile card — compact on mobile */}
            <div className="min-w-0 rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:rounded-3xl sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400 p-[2px] sm:h-16 sm:w-16">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-background font-serif text-base font-bold text-primary sm:text-lg">
                    CC
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h2 className="truncate text-sm font-semibold text-foreground sm:text-base">
                      {companyProfile.name}
                    </h2>
                    <BadgeCheck className="h-4 w-4 shrink-0 fill-sky-500 text-white" />
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                    {companyProfile.tagline}
                  </p>
                </div>
              </div>

              <p className="mt-3 line-clamp-3 text-xs leading-5 text-muted-foreground sm:mt-4 sm:line-clamp-none sm:text-sm sm:leading-6">
                {companyProfile.bio}
              </p>

              <div className="mt-3 grid grid-cols-3 gap-1.5 text-center sm:mt-4 sm:gap-2">
                <div className="rounded-lg bg-muted/60 px-1 py-2 sm:rounded-xl sm:px-2 sm:py-3">
                  <p className="text-xs font-bold text-foreground sm:text-sm">
                    {posts.length || "12+"}
                  </p>
                  <p className="text-[10px] text-muted-foreground sm:text-[11px]">Posts</p>
                </div>
                <div className="rounded-lg bg-muted/60 px-1 py-2 sm:rounded-xl sm:px-2 sm:py-3">
                  <p className="text-xs font-bold text-foreground sm:text-sm">8K+</p>
                  <p className="text-[10px] text-muted-foreground sm:text-[11px]">Scholars</p>
                </div>
                <div className="rounded-lg bg-muted/60 px-1 py-2 sm:rounded-xl sm:px-2 sm:py-3">
                  <p className="text-xs font-bold text-foreground sm:text-sm">4.9</p>
                  <p className="text-[10px] text-muted-foreground sm:text-[11px]">Rating</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:flex-wrap">
                <Button className="w-full rounded-full sm:flex-1" asChild>
                  <Link prefetch={false} href="/contact">
                    Message us
                  </Link>
                </Button>
                <Button variant="outline" className="w-full rounded-full sm:flex-1" asChild>
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
                  className="mt-3 w-full rounded-full text-sm"
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

      {/* Stories-style categories — full-bleed horizontal scroll on mobile */}
      <section className="sticky top-14 z-30 border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:top-16 md:top-[4.5rem]">
        <div className="mx-auto max-w-7xl px-0 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div
            className="flex gap-3 overflow-x-auto px-3 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setVisibleCount(9);
              }}
              className="flex w-14 shrink-0 flex-col items-center gap-1 sm:w-16 sm:gap-1.5"
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full p-[2px] sm:h-16 sm:w-16",
                  category === "all"
                    ? "bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400"
                    : "bg-border"
                )}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-background text-[10px] font-semibold sm:text-xs">
                  All
                </div>
              </div>
              <span className="w-full truncate text-center text-[10px] text-muted-foreground sm:text-[11px]">
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
                className="flex w-14 shrink-0 flex-col items-center gap-1 sm:w-16 sm:gap-1.5"
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full p-[2px] sm:h-16 sm:w-16",
                    category === cat.slug
                      ? "bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400"
                      : "bg-border"
                  )}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-background px-0.5 text-center text-[9px] font-semibold leading-tight sm:px-1 sm:text-[10px]">
                    {cat.name.split(" ")[0]}
                  </div>
                </div>
                <span className="w-full truncate text-center text-[10px] text-muted-foreground sm:text-[11px]">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Feed + sidebar */}
      <section className="bg-muted/30 py-6 sm:py-10 md:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-3 sm:gap-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <div className="mx-auto w-full min-w-0 max-w-xl space-y-4 sm:space-y-6 lg:mx-0 lg:max-w-none">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card px-4 py-14 sm:flex-row sm:py-20">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Loading company feed…
                </span>
              </div>
            ) : visible.length > 0 ? (
              <>
                {featured && category === "all" && !query ? (
                  <div className="rounded-xl border border-primary/15 bg-primary/[0.04] px-3 py-2.5 text-xs text-foreground sm:rounded-2xl sm:px-4 sm:py-3 sm:text-sm">
                    <span className="font-semibold">Pinned · </span>
                    <span className="line-clamp-2 sm:line-clamp-none">{featured.title}</span>
                  </div>
                ) : null}
                {visible.map((post) => (
                  <FeedPostCard key={`${post.source}-${post.id}`} post={post} />
                ))}
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-card px-4 py-12 text-center sm:px-6 sm:py-16">
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
                  className="w-full rounded-full sm:w-auto"
                  onClick={() => setVisibleCount((c) => c + 6)}
                >
                  Load more posts
                </Button>
              </div>
            ) : null}
          </div>

          {/* Sidebar — stacks under feed on mobile */}
          <aside className="min-w-0 space-y-4 sm:space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl border border-border/80 bg-card p-4 sm:rounded-2xl sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
                Follow us
              </p>
              <p className="mt-2 font-serif text-base font-semibold text-foreground sm:text-lg">
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

            <div className="rounded-xl border border-border/80 bg-card p-4 sm:rounded-2xl sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
                Free resources
              </p>
              <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
                {freeResources.slice(0, 4).map((resource) => {
                  const Icon = resourceIcon[resource.type];
                  return (
                    <Link
                      key={resource.id}
                      prefetch={false}
                      href={resource.href}
                      className="flex items-start gap-3 rounded-xl border border-border/60 px-3 py-2.5 transition-colors hover:bg-muted/50 sm:py-3"
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div className="min-w-0">
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

            <div className="rounded-xl border border-border/80 bg-card p-4 sm:rounded-2xl sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
                Soft next step
              </p>
              <p className="mt-2 font-serif text-base font-semibold text-foreground sm:text-lg">
                Need help applying this advice?
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Free consultation for thesis, literature review, data analysis,
                or publishing — no hard sell.
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
      <section className="bg-background py-10 sm:py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              Free Research Resources
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              Downloadable tools for real research work
            </h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {freeResources.map((resource) => {
              const Icon = resourceIcon[resource.type];
              return (
                <div
                  key={resource.id}
                  className="min-w-0 rounded-2xl border border-border/80 bg-card p-4 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-10 sm:w-10">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-base font-semibold sm:mt-4 sm:text-lg">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                  <Button variant="outline" className="mt-4 w-full rounded-full sm:mt-5" asChild>
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
      <section className="bg-primary py-10 sm:py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-3 text-center sm:px-6">
          <h2 className="font-serif text-2xl font-bold text-primary-foreground sm:text-3xl md:text-4xl">
            Get posts in your inbox
          </h2>
          <p className="mt-3 text-sm text-primary-foreground/80 sm:mt-4 sm:text-base">
            Research tips, templates, and company updates — no spam.
          </p>
          <div className="mt-6 sm:mt-8">
            <NewsletterForm variant="dark" source="blog-home-social" />
          </div>
          <div className="mt-6 flex justify-center sm:mt-8">
            <SocialFollow variant="pills" />
          </div>
        </div>
      </section>
    </div>
  );
}
