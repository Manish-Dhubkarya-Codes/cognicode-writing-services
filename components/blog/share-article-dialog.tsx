"use client";

import { useState, type ReactNode } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { recordPostShare } from "@/lib/blog-engagement";

export function articleShareUrl(href?: string) {
  if (typeof window === "undefined") {
    if (!href) return "https://cognicodeedutech.com/blog/";
    return href.startsWith("http") ? href : `https://cognicodeedutech.com${href}`;
  }
  if (href?.startsWith("http")) return href;
  if (href) {
    const path = href.startsWith("/") ? href : `/${href}`;
    return `${window.location.origin}${path}`;
  }
  return window.location.href;
}

const channels = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
  },
  {
    id: "email",
    label: "Email",
    href: (url: string, title: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    id: "x",
    label: "X",
    href: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: "telegram",
    label: "Telegram",
    href: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
];

type ShareArticleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  title: string;
  slug: string;
};

export function ShareArticleDialog({
  open,
  onOpenChange,
  url,
  title,
  slug,
}: ShareArticleDialogProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      void recordPostShare(slug, "copy");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const nativeShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ title, url, text: title });
      void recordPostShare(slug, "native");
      onOpenChange(false);
    } catch {
      // cancelled
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this article</DialogTitle>
          <DialogDescription>
            Copy the link or send it through any app below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Input readOnly value={url} className="text-xs sm:text-sm" />
          <Button type="button" className="shrink-0 rounded-full" onClick={copy}>
            {copied ? <Check className="mr-1 h-4 w-4" /> : <Copy className="mr-1 h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {channels.map((channel) => (
            <a
              key={channel.id}
              href={channel.href(url, title)}
              target={channel.id === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              onClick={() => void recordPostShare(slug, channel.id)}
              className="inline-flex items-center justify-center rounded-full border border-border px-3 py-2 text-xs font-medium hover:bg-muted"
            >
              {channel.label}
            </a>
          ))}
        </div>
        {typeof navigator !== "undefined" && typeof navigator.share === "function" ? (
          <Button type="button" variant="outline" className="w-full rounded-full" onClick={nativeShare}>
            <Share2 className="mr-2 h-4 w-4" />
            More apps
          </Button>
        ) : (
          <p className="text-center text-xs text-muted-foreground">
            Paste the copied link in WhatsApp, Instagram, Gmail, or any other app.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ShareArticleButton({
  href,
  title,
  slug,
  className,
  children,
}: {
  href?: string;
  title: string;
  slug: string;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const url = articleShareUrl(href);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      <ShareArticleDialog
        open={open}
        onOpenChange={setOpen}
        url={url}
        title={title}
        slug={slug}
      />
    </>
  );
}
