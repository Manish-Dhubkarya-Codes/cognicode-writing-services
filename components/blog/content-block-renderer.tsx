"use client";

import { Download, ExternalLink } from "lucide-react";
import { BlogSection } from "@/lib/blog-data";
import { getYoutubeEmbedUrl } from "@/lib/company-socials";
import { mediaUrl } from "@/app/server/fetch-beckend-services";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LinkedText, sanitizeHref } from "@/lib/blog-rich-text";

type ContentBlockRendererProps = {
  block: BlogSection;
};

export function ContentBlockRenderer({ block }: ContentBlockRendererProps) {
  const type = block.type || "section";
  const heading = (block.heading || "").trim();
  const HeadingTag = block.level === 3 ? "h3" : "h2";
  const headingClass =
    block.level === 3
      ? "scroll-mt-28 break-words text-lg font-semibold text-foreground sm:scroll-mt-32 sm:text-xl"
      : "scroll-mt-28 break-words text-xl font-bold tracking-tight text-foreground sm:scroll-mt-32 sm:text-2xl";

  const showHeading =
    Boolean(heading) &&
    !["quote", "paragraphs"].includes(type);

  return (
    <div className="min-w-0">
      {showHeading ? (
        <HeadingTag id={block.id} className={headingClass}>
          {heading}
        </HeadingTag>
      ) : heading ? (
        <span id={block.id} className="sr-only">
          {heading}
        </span>
      ) : (
        <span id={block.id} className="sr-only">
          {type}
        </span>
      )}

      {type === "image" && block.imageUrl ? (
        <figure className={cn(showHeading ? "mt-4" : "mt-0")}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mediaUrl(block.imageUrl)}
            alt={block.imageAlt || heading || "Article figure"}
            className="w-full rounded-md border border-border object-cover"
          />
          {block.imageAlt ? (
            <figcaption className="mt-2 text-center text-xs text-muted-foreground sm:text-sm">
              {block.imageAlt}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      {type === "video" && block.videoUrl ? (
        <video
          src={mediaUrl(block.videoUrl)}
          className={cn("w-full rounded-md border border-border", showHeading ? "mt-4" : "mt-0")}
          controls
          playsInline
        />
      ) : null}

      {type === "youtube" && getYoutubeEmbedUrl(block.youtubeUrl) ? (
        <div className={cn("aspect-video overflow-hidden rounded-md border border-border", showHeading ? "mt-4" : "mt-0")}>
          <iframe
            src={getYoutubeEmbedUrl(block.youtubeUrl) || ""}
            title={heading || "YouTube video"}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : null}

      {(block.paragraphs || []).filter(Boolean).length > 0 ? (
        <div className={cn("space-y-3 sm:space-y-4", showHeading || ["image", "video", "youtube"].includes(type) ? "mt-3 sm:mt-4" : "mt-0")}>
          {(block.paragraphs || []).filter(Boolean).map((paragraph, i) => (
            <p
              key={`${block.id}-p-${i}`}
              className="break-words text-[15px] leading-7 text-foreground/90 sm:text-base sm:leading-8"
            >
              <LinkedText text={paragraph} />
            </p>
          ))}
        </div>
      ) : null}

      {(block.bullets || []).filter(Boolean).length > 0 ? (
        block.ordered ? (
          <ol className="mt-4 list-decimal space-y-2 pl-5 sm:mt-5 sm:space-y-2.5">
            {(block.bullets || []).filter(Boolean).map((bullet, i) => (
              <li
                key={`${block.id}-li-${i}`}
                className="text-[15px] leading-7 text-foreground/90 sm:text-base"
              >
                <LinkedText text={bullet} />
              </li>
            ))}
          </ol>
        ) : (
          <ul className="mt-4 space-y-2 sm:mt-5 sm:space-y-2.5">
            {(block.bullets || []).filter(Boolean).map((bullet, i) => (
              <li
                key={`${block.id}-li-${i}`}
                className="flex gap-2.5 text-[15px] leading-7 text-foreground/90 sm:gap-3 sm:text-base"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="min-w-0 break-words">
                  <LinkedText text={bullet} />
                </span>
              </li>
            ))}
          </ul>
        )
      ) : null}

      {block.callout ? (
        <div className="mt-4 rounded-md border-l-4 border-primary bg-primary/[0.06] p-3 text-[15px] leading-7 text-foreground sm:p-4 sm:text-base">
          <LinkedText text={block.callout} />
        </div>
      ) : null}

      {type === "code" && block.code ? (
        <div className={cn("overflow-hidden rounded-xl border border-border bg-zinc-950 text-zinc-50 sm:rounded-2xl", showHeading ? "mt-4" : "mt-2")}>
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-[11px] uppercase tracking-wider text-zinc-400">
            <span>{block.language || "code"}</span>
          </div>
          <pre className="overflow-x-auto p-4 text-[12px] leading-6 sm:text-[13px]">
            <code>{block.code}</code>
          </pre>
        </div>
      ) : null}

      {type === "table" && (block.tableHeaders?.length || block.tableRows?.length) ? (
        <div className={cn("overflow-x-auto rounded-md border border-border", showHeading ? "mt-4" : "mt-2")}>
          <table className="min-w-full border-collapse text-left text-sm">
            {block.tableHeaders?.length ? (
              <thead>
                <tr>
                  {block.tableHeaders.map((h, i) => (
                    <th
                      key={`${block.id}-th-${i}`}
                      className="border border-border bg-primary px-3 py-2.5 font-semibold text-primary-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {(block.tableRows || []).map((row, ri) => (
                <tr key={`${block.id}-tr-${ri}`} className="odd:bg-background even:bg-muted/40">
                  {row.map((cell, ci) => (
                    <td
                      key={`${block.id}-td-${ri}-${ci}`}
                      className="border border-border px-3 py-2.5 text-foreground/90"
                    >
                      <LinkedText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {type === "quote" && block.quote ? (
        <blockquote className="mt-2 border-l-4 border-primary bg-primary/[0.04] px-4 py-3 text-sm leading-7 text-foreground sm:px-5 sm:py-4 sm:text-base sm:leading-8">
          <p>
            “<LinkedText text={block.quote} />”
          </p>
          {block.cite ? (
            <footer className="mt-2 text-xs text-muted-foreground sm:text-sm">— {block.cite}</footer>
          ) : null}
        </blockquote>
      ) : null}

      {type === "download" && block.download?.url ? (
        <div className="mt-4 overflow-hidden rounded-xl bg-foreground p-4 text-background sm:rounded-2xl sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-background/60">
                {block.download.fileType || "File"}
              </p>
              <h3 className="mt-1 font-serif text-lg font-bold">
                {block.download.title || heading || "Download"}
              </h3>
              {block.download.description ? (
                <p className="mt-1 text-sm text-background/70">{block.download.description}</p>
              ) : null}
            </div>
            <Button variant="secondary" className="w-full shrink-0 rounded-full sm:w-auto" asChild>
              <a href={mediaUrl(block.download.url)} target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                {block.download.fileLabel || "Download"}
              </a>
            </Button>
          </div>
        </div>
      ) : null}

      {type === "faq" && (block.faqs || []).length > 0 ? (
        <div className="mt-4 space-y-3">
          {(block.faqs || [])
            .filter((f) => f.question)
            .map((item, i) => (
              <details
                key={`${block.id}-faq-${i}`}
                className="rounded-xl border border-border bg-card px-4 py-3 sm:rounded-2xl"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-foreground sm:text-base">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:leading-7">
                  <LinkedText text={item.answer} />
                </p>
              </details>
            ))}
        </div>
      ) : null}

      {type === "links" && (block.links || []).some((item) => item.url) ? (
        <ul className={cn("space-y-3", showHeading ? "mt-4" : "mt-2")}>
          {(block.links || [])
            .map((item) => ({ ...item, href: sanitizeHref(item.url) }))
            .filter((item) => item.href)
            .map((item, i) => (
              <li
                key={`${block.id}-link-${i}`}
                className="rounded-md border border-border bg-card px-3 py-3 sm:px-4"
              >
                <a
                  href={item.href || item.url}
                  target={/^https?:\/\//i.test(item.href || "") ? "_blank" : undefined}
                  rel={/^https?:\/\//i.test(item.href || "") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" />
                  <span>{item.title || item.url}</span>
                </a>
                <p className="mt-1 break-all text-xs text-muted-foreground">{item.href}</p>
                {item.description ? (
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                ) : null}
              </li>
            ))}
        </ul>
      ) : null}
    </div>
  );
}
