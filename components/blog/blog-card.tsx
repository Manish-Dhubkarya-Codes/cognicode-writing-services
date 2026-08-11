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
        "group flex h-full min-w-0 flex-col overflow-hidden rounded-xl bg-card ring-1 ring-border/80 transition-all duration-300 hover:-translate-y-0.5 hover:ring-primary/20 sm:rounded-2xl",
        className
      )}
    >
      <Link prefetch={false} href={`/blog/${post.slug}`} className="block min-w-0">
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden bg-gradient-to-br",
            post.imageGradient
          )}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_50%)]" />
          <div className="absolute inset-0 flex items-end p-3 sm:p-5">
            <span className="font-serif text-lg font-semibold tracking-tight text-white/90 sm:text-2xl md:text-3xl">
              {post.imageLabel}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="rounded-full bg-primary/8 px-2.5 py-0.5 text-[11px] font-medium text-primary sm:px-3 sm:py-1 sm:text-xs">
            {getCategoryName(post.category)}
          </span>
        </div>

        <h3 className="mt-2 font-serif text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:mt-3 sm:text-lg">
          <Link prefetch={false} href={`/blog/${post.slug}`} className="line-clamp-2">
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3 sm:mt-3">
          {post.excerpt}
        </p>

        <div className="mt-4 flex flex-col gap-2 border-t border-border/70 pt-3 text-xs text-muted-foreground sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-4">
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
