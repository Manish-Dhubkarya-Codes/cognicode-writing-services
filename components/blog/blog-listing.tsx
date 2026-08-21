"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  Download,
  FileSpreadsheet,
  FileText,
  Heart,
  ListChecks,
  Loader2,
  PlusCircle,
  Search,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArchiveArticleCard } from "@/components/blog/archive-article-card";
import { SocialFollow } from "@/components/blog/social-follow";
import { NewsletterForm } from "@/components/blog/newsletter-form";
import {
  BlogCategorySlug,
  blogCategories,
  freeResources,
  getCategoryName,
} from "@/lib/blog-data";
import { blogPostTypes } from "@/lib/blog-content";
import { FeedPost, fetchFeedPosts } from "@/lib/blog-api";
import { cn } from "@/lib/utils";
import {
  EngagementStats,
  fetchEngagementStats,
  fetchMyActivity,
  getLocalSavedSlugs,
  recordPostVisit,
  SAVED_POSTS_EVENT,
} from "@/lib/blog-engagement";
import { getSiteAdmin, getSiteUser, requestOpenAuth } from "@/lib/site-user";
import { useBlogLive } from "@/lib/blog-socket";
import { FollowButton } from "@/components/blog/follow-button";

const resourceIcon = {
  PDF: FileText,
  Excel: FileSpreadsheet,
  Checklist: ListChecks,
};

type BlogListingProps = {
  initialCategory?: BlogCategorySlug | "all";
  heading?: string;
  description?: string;
};

export function BlogListing({
  initialCategory = "all",
  heading,
  description,
}: BlogListingProps) {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogCategorySlug | "all">(initialCategory);
  const [postType, setPostType] = useState<string>("all");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [activityFilter, setActivityFilter] = useState<"all" | "saved" | "liked" | "shared">("all");
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [likedSlugs, setLikedSlugs] = useState<string[]>([]);
  const [sharedSlugs, setSharedSlugs] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isAdmin, setIsAdmin] = useState(false);
  const [engagement, setEngagement] = useState<Record<string, EngagementStats>>({});

  useEffect(() => {
    try {
      const admin = localStorage.getItem("admin");
      setIsAdmin(Boolean(admin));
    } catch {
      setIsAdmin(false);
    }
    recordPostVisit("", "/blog/");
    try {
      const view = new URLSearchParams(window.location.search).get("view");
      if (view === "saved" || view === "liked" || view === "shared") {
        setActivityFilter(view);
      }
    } catch {
      // ignore
    }
    fetchMyActivity()
      .then((mine) => {
        setSavedSlugs(mine.saved);
        setLikedSlugs(mine.liked);
        setSharedSlugs(mine.shared);
      })
      .catch(() => {
        setSavedSlugs(getLocalSavedSlugs());
      });
    const onSaved = (event: Event) => {
      const slugs = (event as CustomEvent).detail;
      if (Array.isArray(slugs)) setSavedSlugs(slugs);
    };
    window.addEventListener(SAVED_POSTS_EVENT, onSaved);
    return () => window.removeEventListener(SAVED_POSTS_EVENT, onSaved);
  }, []);

  const onLive = useCallback((event: string, payload: any) => {
    if (!payload?.slug) return;
    setEngagement((prev) => {
      const cur = prev[payload.slug] || {
        likes: 0,
        comments: 0,
        shares: 0,
        likedByMe: false,
        previewComments: [],
      };
      if (event === "blog:like" || event === "blog:share") {
        return {
          ...prev,
          [payload.slug]: {
            ...cur,
            likes: typeof payload.likes === "number" ? payload.likes : cur.likes,
            comments: typeof payload.comments === "number" ? payload.comments : cur.comments,
            shares: typeof payload.shares === "number" ? payload.shares : cur.shares,
          },
        };
      }
      if (event === "blog:comment") {
        const preview =
          payload.comment && !payload.comment.parentId
            ? [payload.comment, ...(cur.previewComments || [])].slice(0, 2)
            : cur.previewComments;
        return {
          ...prev,
          [payload.slug]: {
            ...cur,
            comments: typeof payload.comments === "number" ? payload.comments : cur.comments,
            previewComments: preview,
          },
        };
      }
      return prev;
    });
  }, []);
  useBlogLive(onLive);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchFeedPosts({ limit: 50 })
      .then(async (data) => {
        if (!active) return;
        setPosts(data);
        const stats = await fetchEngagementStats(data.map((p) => p.slug));
        if (active) setEngagement(stats);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of posts) {
      map[p.category] = (map[p.category] || 0) + 1;
    }
    return map;
  }, [posts]);

  const typeCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of posts) {
      const type = p.postType || "article";
      map[type] = (map[type] || 0) + 1;
    }
    return map;
  }, [posts]);

  const tagCounts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of posts) {
      for (const tag of p.tags || []) {
        map[tag] = (map[tag] || 0) + 1;
      }
    }
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 14);
  }, [posts]);

  const filtered = useMemo(() => {
    let list = posts;
    if (activityFilter === "saved") list = list.filter((p) => savedSlugs.includes(p.slug));
    else if (activityFilter === "liked")
      list = list.filter((p) => likedSlugs.includes(p.slug) || engagement[p.slug]?.likedByMe);
    else if (activityFilter === "shared") list = list.filter((p) => sharedSlugs.includes(p.slug));
    else {
      if (category !== "all") list = list.filter((p) => p.category === category);
      if (postType !== "all") list = list.filter((p) => (p.postType || "article") === postType);
      if (activeTag !== "all") {
        list = list.filter((p) =>
          (p.tags || []).some((t) => t.toLowerCase() === activeTag.toLowerCase())
        );
      }
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) =>
        [p.title, p.excerpt, p.author.name, getCategoryName(p.category), p.postType, ...(p.tags || [])]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }
    return list;
  }, [
    posts,
    category,
    query,
    activityFilter,
    savedSlugs,
    likedSlugs,
    sharedSlugs,
    engagement,
    postType,
    activeTag,
  ]);

  const visible = filtered.slice(0, visibleCount);
  const needsLoginForFilter =
    (activityFilter === "liked" || activityFilter === "shared") &&
    !getSiteUser() &&
    !getSiteAdmin();

  const applyFilter = (next: "all" | "saved" | "liked" | "shared") => {
    if ((next === "liked" || next === "shared") && !getSiteUser() && !getSiteAdmin()) {
      requestOpenAuth({ mode: "login", reason: next === "liked" ? "like" : "share" });
    }
    setActivityFilter(next);
    setVisibleCount(20);
    if (next !== "all") {
      setCategory("all");
      setPostType("all");
      setActiveTag("all");
    }
  };

  const title =
    heading ||
    (category === "all" ? "Research Blog" : `${getCategoryName(category)} Archives`);
  const intro =
    description ||
    "Practical thesis, literature review, data analysis, publishing, and AI research articles — structured like a professional knowledge base.";

  return (
    <div className="w-full min-w-0">
      <section className="border-b border-border/70 bg-gradient-to-b from-muted/70 to-background">
        <div className="mx-auto max-w-7xl px-3 py-7 sm:px-6 sm:py-10 lg:px-8">
          <nav className="text-xs text-muted-foreground sm:text-sm" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
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
              {category !== "all" ? (
                <>
                  <li>/</li>
                  <li className="text-foreground">{getCategoryName(category)}</li>
                </>
              ) : null}
            </ol>
          </nav>

          <div className="mt-4 grid items-start gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-xs">
                CogniCode Knowledge Base
              </p>
              <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:mt-4 sm:text-base sm:leading-7">
                {intro}
              </p>

              <form
                className="mt-5 flex w-full max-w-xl flex-col gap-2.5 sm:mt-7 sm:flex-row sm:gap-3"
                onSubmit={(e) => e.preventDefault()}
                role="search"
              >
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setVisibleCount(10);
                    }}
                    placeholder="Search articles, e.g. SPSS, viva, journal..."
                    className="h-11 w-full rounded-full border-border/80 bg-background pl-10 text-sm sm:h-12"
                    aria-label="Search blog"
                  />
                </div>
                <Button type="button" size="lg" className="h-11 w-full shrink-0 rounded-full px-6 sm:h-12 sm:w-auto">
                  Search
                </Button>
              </form>
            </div>

            <div className="min-w-0 rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Follow CogniCode
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {posts.length} articles · templates · mentor notes
              </p>
              <div className="mt-3">
                <SocialFollow variant="row" />
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <FollowButton source="follow-feed" className="w-full rounded-full sm:flex-1" />
                {isAdmin ? (
                  <Button variant="secondary" className="w-full rounded-full sm:flex-1" asChild>
                    <Link prefetch={false} href="/blog/manage/">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Publish
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-14 z-30 border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:top-16 md:top-[3.9rem]">
        <div className="mx-auto max-w-7xl px-3 py-3 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <FilterChip
              active={activityFilter === "all" && category === "all" && postType === "all" && activeTag === "all"}
              onClick={() => {
                setActivityFilter("all");
                setCategory("all");
                setPostType("all");
                setActiveTag("all");
                setVisibleCount(10);
              }}
              label={`All (${posts.length})`}
            />
            {blogPostTypes.map((type) =>
              typeCounts[type.slug] ? (
                <FilterChip
                  key={type.slug}
                  active={activityFilter === "all" && postType === type.slug}
                  onClick={() => {
                    setActivityFilter("all");
                    setPostType(type.slug);
                    setVisibleCount(10);
                  }}
                  label={`${type.shortLabel} (${typeCounts[type.slug]})`}
                />
              ) : null
            )}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-6 sm:py-10 md:py-12">
        <div className="mx-auto grid max-w-7xl items-start gap-6 px-3 sm:gap-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <div className="min-w-0 space-y-4">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: "all", label: "Recent" },
                  { id: "saved", label: "Saved", icon: Bookmark },
                  { id: "liked", label: "Liked", icon: Heart },
                  { id: "shared", label: "Shared", icon: Share2 },
                ] as const
              ).map((item) => {
                const Icon = "icon" in item ? item.icon : null;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => applyFilter(item.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium sm:text-sm",
                      activityFilter === item.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                    {item.label}
                  </button>
                );
              })}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card px-4 py-14 sm:flex-row sm:py-20">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Loading articles…</span>
              </div>
            ) : visible.length > 0 ? (
              <>
                <p className="text-sm font-medium text-foreground">
                  {activityFilter === "all" ? "Recent Articles" : `${activityFilter} articles`}
                  <span className="ml-1 text-muted-foreground">({filtered.length})</span>
                </p>
                <div className="space-y-4">
                  {visible.map((post) => (
                    <ArchiveArticleCard key={`${post.source}-${post.id}`} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-card px-4 py-12 text-center sm:px-6 sm:py-16">
                <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/40" />
                <p className="mt-4 font-medium text-foreground">
                  {needsLoginForFilter ? "Log in to see this filter" : "No articles found"}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {needsLoginForFilter
                    ? "Sign in with email to view liked or shared posts."
                    : "Try another keyword, tag, or format."}
                </p>
                <Button
                  className="mt-6 rounded-full"
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setCategory(initialCategory);
                    setActivityFilter("all");
                    setPostType("all");
                    setActiveTag("all");
                  }}
                >
                  Reset filters
                </Button>
              </div>
            )}

            {visibleCount < filtered.length ? (
              <div className="text-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full sm:w-auto"
                  onClick={() => setVisibleCount((c) => c + 8)}
                >
                  Load more articles
                </Button>
              </div>
            ) : null}
          </div>

          <aside className="min-w-0 space-y-4 sm:space-y-6 lg:sticky lg:top-[13rem] lg:z-10 lg:max-h-[calc(100dvh-13.5rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain [scrollbar-width:thin]">
            <div className="rounded-xl border border-border/80 bg-card p-4 sm:rounded-2xl sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
                Similar Topics
              </p>
              <div className="mt-3 flex flex-col">
                {blogCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => {
                      setActivityFilter("all");
                      setCategory(cat.slug);
                      setVisibleCount(10);
                    }}
                    className={cn(
                      "flex items-center justify-between gap-2 border-b border-border/60 py-2 text-left text-sm last:border-0",
                      category === cat.slug ? "font-semibold text-primary" : "text-foreground hover:text-primary"
                    )}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {(categoryCounts[cat.slug] || 0).toLocaleString()}+
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {tagCounts.length ? (
              <div className="rounded-xl border border-border/80 bg-card p-4 sm:rounded-2xl sm:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
                  Popular tags
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {tagCounts.map(([tag, count]) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setActivityFilter("all");
                        setActiveTag(activeTag === tag ? "all" : tag);
                        setVisibleCount(10);
                      }}
                      className={cn(
                        "rounded-md border px-2 py-1 text-[11px]",
                        activeTag === tag
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-muted/40 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {tag} {count}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-xl border border-border/80 bg-card p-4 sm:rounded-2xl sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
                Free resources
              </p>
              <div className="mt-3 space-y-2.5">
                {freeResources.slice(0, 4).map((resource) => {
                  const Icon = resourceIcon[resource.type];
                  return (
                    <Link
                      key={resource.id}
                      prefetch={false}
                      href={resource.href}
                      className="flex items-start gap-3 rounded-xl border border-border/60 px-3 py-2.5 transition-colors hover:bg-muted/50"
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">{resource.title}</p>
                        <p className="text-xs text-muted-foreground">{resource.type}</p>
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
              <p className="mt-2 font-serif text-base font-semibold text-foreground">
                Need help applying this advice?
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Free consultation for thesis, literature review, data analysis, or publishing.
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

      <section className="bg-background py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Formats you can publish
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl">
              More than a normal blog
            </h2>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 lg:grid-cols-5">
            {blogPostTypes.map((type) => (
              <button
                key={type.slug}
                type="button"
                onClick={() => {
                  setActivityFilter("all");
                  setPostType(type.slug);
                  setVisibleCount(10);
                  window.scrollTo({ top: 280, behavior: "smooth" });
                }}
                className="rounded-2xl border border-border bg-card p-3 text-left hover:border-primary/40"
              >
                <p className="text-sm font-semibold">{type.shortLabel}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{type.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-10 sm:py-16">
        <div className="mx-auto max-w-2xl px-3 text-center sm:px-6">
          <h2 className="font-serif text-2xl font-bold text-primary-foreground sm:text-3xl">
            Get new articles in your inbox
          </h2>
          <p className="mt-3 text-sm text-primary-foreground/80 sm:text-base">
            Research tips, templates, and company updates — no spam.
          </p>
          <div className="mt-6 sm:mt-8">
            <NewsletterForm variant="dark" source="blog-home-archive" />
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium sm:text-sm",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </button>
  );
}
