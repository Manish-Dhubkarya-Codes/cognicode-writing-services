import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { BlogPost, getCategoryName } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: BlogPost;
  className?: string;
};

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl bg-card ring-1 ring-border/80 transition-all duration-300 hover:-translate-y-0.5 hover:ring-primary/20",
        className
      )}
    >
      <Link prefetch={false} href={`/blog/${post.slug}`} className="block">
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden bg-gradient-to-br",
            post.imageGradient
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_50%)]" />
          <div className="absolute inset-0 flex items-end p-5">
            <span className="font-serif text-2xl font-semibold tracking-tight text-white/90 sm:text-3xl">
              {post.imageLabel}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
            {getCategoryName(post.category)}
          </span>
        </div>

        <h3 className="mt-3 font-serif text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          <Link prefetch={false} href={`/blog/${post.slug}`} className="line-clamp-2">
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-4 text-xs text-muted-foreground">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary">
              {post.author.initials}
            </div>
            <span className="truncate">{post.author.name}</span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.date.replace(/,.*/, "")}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime.replace(" read", "")}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
