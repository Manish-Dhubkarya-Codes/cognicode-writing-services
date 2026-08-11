"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ArticleView } from "@/components/blog/article-view";
import { Button } from "@/components/ui/button";
import {
  FeedPost,
  fetchFeedPosts,
  fetchPostBySlug,
  mapStaticPostToFeed,
} from "@/lib/blog-api";
import { getPostBySlug } from "@/lib/blog-data";

type ArticleLoaderProps = {
  /** Prefer explicit slug (static routes). Falls back to ?slug= query. */
  slug?: string;
};

export function ArticleLoader({ slug: slugProp }: ArticleLoaderProps) {
  const [post, setPost] = useState<FeedPost | null>(null);
  const [allPosts, setAllPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    const resolveSlug = () => {
      if (slugProp) return slugProp;
      if (typeof window === "undefined") return "";
      return new URLSearchParams(window.location.search).get("slug") || "";
    };

    const slug = resolveSlug();
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    // Instant static paint when available
    const staticPost = getPostBySlug(slug);
    if (staticPost && active) {
      setPost(mapStaticPostToFeed(staticPost));
    }

    Promise.all([fetchPostBySlug(slug), fetchFeedPosts({ limit: 40 })])
      .then(([fetched, feed]) => {
        if (!active) return;
        if (fetched) setPost(fetched);
        else if (!staticPost) setNotFound(true);
        setAllPosts(feed);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slugProp]);

  if (loading && !post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center mt-17">
          <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">Loading article…</span>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 mt-17">
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Article not found
          </h1>
          <p className="text-sm text-muted-foreground">
            This post may have been removed or is not published yet.
          </p>
          <Button className="rounded-full" asChild>
            <Link prefetch={false} href="/blog/">
              Back to blog feed
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        <ArticleView post={post} allPosts={allPosts} />
      </main>
      <Footer />
    </div>
  );
}
