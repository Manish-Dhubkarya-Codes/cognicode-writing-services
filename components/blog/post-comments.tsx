"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Loader2,
  Pin,
  PinOff,
  Reply,
  Send,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  getSiteAdmin,
  getSiteUser,
  requestOpenAuth,
  SITE_USER_EVENT,
  SiteAdmin,
  SiteUser,
} from "@/lib/site-user";
import {
  addAdminComment,
  addPostComment,
  BlogComment,
  deletePostComment,
  fetchPostEngagement,
  pinPostComment,
} from "@/lib/blog-engagement";
import { useBlogLive } from "@/lib/blog-socket";

type PostCommentsProps = {
  slug: string;
  href?: string;
  variant?: "full" | "preview" | "inline";
  previewComments?: BlogComment[];
  previewCount?: number;
  onCount?: (count: number) => void;
  onOpen?: () => void;
};

function timeAgo(value: string) {
  const then = new Date(value).getTime();
  if (!Number.isFinite(then)) return "";
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return new Date(value).toLocaleDateString();
}

function CommentBody({ text }: { text: string }) {
  const parts = String(text || "").split(/(https?:\/\/[^\s]+)/g);
  return (
    <>
      {parts.map((part, index) =>
        /^https?:\/\//i.test(part) ? (
          <a
            key={`${part}-${index}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-primary underline underline-offset-2"
          >
            {part}
          </a>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        )
      )}
    </>
  );
}

function initials(name?: string) {
  return (name || "?").replace(/[^a-zA-Z0-9]/g, "").slice(0, 2).toUpperCase() || "?";
}

function countThread(comments: BlogComment[]) {
  return comments.reduce(
    (sum, comment) => sum + 1 + (comment.replies?.length || 0),
    0
  );
}

function commentExists(list: BlogComment[], id: number) {
  return list.some(
    (item) =>
      Number(item.id) === Number(id) ||
      (item.replies || []).some((reply) => Number(reply.id) === Number(id))
  );
}

function insertComment(list: BlogComment[], comment: BlogComment): BlogComment[] {
  if (!comment?.id || commentExists(list, comment.id)) return list;
  if (comment.parentId) {
    return list.map((item) =>
      item.id === comment.parentId
        ? {
            ...item,
            replies: commentExists(item.replies || [], comment.id)
              ? item.replies || []
              : [...(item.replies || []), comment],
          }
        : item
    );
  }
  return [comment, ...list];
}

function uniqueComments(list: BlogComment[]) {
  const seen = new Set<number>();
  return list.reduce<BlogComment[]>((acc, item) => {
    const id = Number(item.id);
    if (!id || seen.has(id)) return acc;
    seen.add(id);
    const replies = (item.replies || []).filter((reply) => {
      const replyId = Number(reply.id);
      if (!replyId || seen.has(replyId)) return false;
      seen.add(replyId);
      return true;
    });
    acc.push({ ...item, replies });
    return acc;
  }, []);
}

export function PostComments({
  slug,
  href,
  variant = "full",
  previewComments = [],
  previewCount,
  onCount,
  onOpen,
}: PostCommentsProps) {
  const { toast } = useToast();
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [body, setBody] = useState("");
  const [replyTo, setReplyTo] = useState<BlogComment | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const [loading, setLoading] = useState(variant !== "preview");
  const [sending, setSending] = useState(false);
  const [replying, setReplying] = useState(false);
  const [me, setMe] = useState<SiteUser | null>(null);
  const [admin, setAdmin] = useState<SiteAdmin | null>(null);
  const [asOfficial, setAsOfficial] = useState(false);

  useEffect(() => {
    const sync = () => {
      setMe(getSiteUser());
      const nextAdmin = getSiteAdmin();
      setAdmin(nextAdmin);
      setAsOfficial(Boolean(nextAdmin && !getSiteUser()));
    };
    sync();
    window.addEventListener(SITE_USER_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SITE_USER_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchPostEngagement(slug);
      const list = uniqueComments(Array.isArray(data.commentList) ? data.commentList : []);
      setComments(list);
      onCount?.(typeof data.comments === "number" ? data.comments : countThread(list));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (variant === "preview") return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, variant]);

  const onLive = useCallback(
    (event: string, payload: any) => {
      if (payload?.slug && payload.slug !== slug) return;
      if (event === "blog:comment" && payload?.comment) {
        setComments((prev) => insertComment(prev, payload.comment));
        if (typeof payload.comments === "number") {
          queueMicrotask(() => onCount?.(payload.comments));
        }
      }
      if (event === "blog:comment-deleted" && payload?.commentId) {
        setComments((prev) =>
          prev
            .filter((item) => item.id !== payload.commentId)
            .map((item) => ({
              ...item,
              replies: (item.replies || []).filter((reply) => reply.id !== payload.commentId),
            }))
        );
        if (typeof payload.comments === "number") {
          queueMicrotask(() => onCount?.(payload.comments));
        }
      }
      if (event === "blog:comment-pinned" && payload?.comment) {
        setComments((prev) => {
          const next = prev.map((item) =>
            item.id === payload.comment.id ? { ...item, isPinned: payload.pinned } : item
          );
          return [...next].sort(
            (a, b) => Number(Boolean(b.isPinned)) - Number(Boolean(a.isPinned))
          );
        });
      }
    },
    [slug, onCount]
  );
  useBlogLive(onLive, slug);

  const canWrite = Boolean(me || admin);
  const total = useMemo(
    () => (variant === "preview" ? previewCount ?? previewComments.length : countThread(comments)),
    [variant, previewCount, previewComments, comments]
  );
  const preview = previewComments.slice(0, 2);

  const postComment = async (text: string, parent?: BlogComment | null) => {
    const trimmed = text.trim();
    if (!trimmed) return false;
    const useOfficial = Boolean(admin && (asOfficial || !me));
    if (!useOfficial && !me && !admin) {
      requestOpenAuth({ mode: "login", reason: "comment" });
      return false;
    }
    const res = useOfficial
      ? await addAdminComment(slug, trimmed, parent?.parentId || parent?.id)
      : await addPostComment(slug, trimmed, parent?.parentId || parent?.id);
    if (res?.needsLogin) {
      requestOpenAuth({ mode: "login", reason: "comment" });
      return false;
    }
    if (!res?.success) {
      toast({
        title: "Could not comment",
        description: res?.message || "Try again",
        variant: "destructive",
      });
      return false;
    }
    if (res.data?.comment) {
      setComments((prev) => insertComment(prev, res.data.comment));
      onCount?.(res.data.comments);
    } else {
      await load();
    }
    return true;
  };

  const submit = async () => {
    setSending(true);
    try {
      const ok = await postComment(body);
      if (ok) setBody("");
    } finally {
      setSending(false);
    }
  };

  const submitReply = async () => {
    if (!replyTo) return;
    setReplying(true);
    try {
      const ok = await postComment(replyBody, replyTo);
      if (ok) {
        setReplyBody("");
        setReplyTo(null);
      }
    } finally {
      setReplying(false);
    }
  };

  const remove = async (comment: BlogComment) => {
    const res = await deletePostComment(comment.id);
    if (!res?.success) {
      toast({
        title: "Could not delete",
        description: res?.message || "Try again",
        variant: "destructive",
      });
      return;
    }
    setComments((prev) =>
      prev
        .filter((item) => item.id !== comment.id)
        .map((item) => ({
          ...item,
          replies: (item.replies || []).filter((reply) => reply.id !== comment.id),
        }))
    );
    onCount?.(res.data?.comments);
  };

  const togglePin = async (comment: BlogComment) => {
    const res = await pinPostComment(comment.id, !comment.isPinned);
    if (!res?.success) {
      toast({
        title: "Could not pin",
        description: res?.message || "Try again",
        variant: "destructive",
      });
      return;
    }
    setComments((prev) => {
      const next = prev.map((item) =>
        item.id === comment.id ? { ...item, isPinned: !comment.isPinned } : item
      );
      return [...next].sort((a, b) => Number(Boolean(b.isPinned)) - Number(Boolean(a.isPinned)));
    });
    toast({ title: comment.isPinned ? "Unpinned" : "Pinned to top" });
  };

  const composerPlaceholder = !canWrite
    ? "Log in with email to leave a comment"
    : asOfficial && admin
      ? "Comment as CogniCode"
      : me
        ? `Comment as @${me.username}`
        : "Write a comment";

  if (variant === "preview") {
    return (
      <div className="space-y-2">
        {preview.map((comment) => (
          <p key={comment.id} className="break-words text-xs leading-5 text-foreground sm:text-sm">
            <span className="inline-flex items-center gap-1 font-semibold">
              @{comment.user.username}
              {comment.user.isAdmin || comment.isAdmin ? (
                <BadgeCheck className="h-3.5 w-3.5 fill-sky-500 text-white" />
              ) : null}
            </span>{" "}
            <span className="text-foreground/90">
              <CommentBody text={comment.body} />
            </span>
          </p>
        ))}
        <button
          type="button"
          onClick={() => onOpen?.()}
          className="block text-left text-xs text-muted-foreground hover:text-foreground sm:text-sm"
        >
          {total > 2 ? `View all ${total} comments` : total ? "View comments" : "Be the first to comment"}
        </button>
      </div>
    );
  }

  return (
    <section id="comments" className="scroll-mt-28">
      <div className="flex items-end justify-between gap-3">
        <h3 className="font-serif text-lg font-bold sm:text-xl">
          Comments {total ? `(${total})` : ""}
        </h3>
        {admin ? (
          <Link
            prefetch={false}
            href="/blog/users/?tab=comments"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Manage all comments
          </Link>
        ) : null}
      </div>

      <div className="mt-4 rounded-xl border border-border bg-card p-3 sm:p-4">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={composerPlaceholder}
          rows={3}
          onFocus={() => {
            if (!getSiteUser() && !getSiteAdmin()) {
              requestOpenAuth({ mode: "login", reason: "comment" });
            }
          }}
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          {admin ? (
            <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={asOfficial}
                onChange={(e) => setAsOfficial(e.target.checked)}
              />
              Post as CogniCode
            </label>
          ) : (
            <span />
          )}
          <Button
            className="rounded-full"
            size="sm"
            onClick={submit}
            disabled={sending || !body.trim()}
          >
            {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            Send
          </Button>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading comments…
          </div>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No comments yet. Be the first to share a thought.
          </p>
        ) : (
          uniqueComments(comments).map((comment) => (
            <CommentThread
              key={`comment-${comment.id}`}
              comment={comment}
              me={me}
              admin={admin}
              replyTo={replyTo}
              replyBody={replyBody}
              replying={replying}
              onReplyTo={setReplyTo}
              onReplyBody={setReplyBody}
              onSubmitReply={submitReply}
              onRemove={remove}
              onPin={togglePin}
            />
          ))
        )}
      </div>
    </section>
  );
}

function CommentThread({
  comment,
  me,
  admin,
  replyTo,
  replyBody,
  replying,
  onReplyTo,
  onReplyBody,
  onSubmitReply,
  onRemove,
  onPin,
}: {
  comment: BlogComment;
  me: SiteUser | null;
  admin: SiteAdmin | null;
  replyTo: BlogComment | null;
  replyBody: string;
  replying: boolean;
  onReplyTo: (comment: BlogComment | null) => void;
  onReplyBody: (value: string) => void;
  onSubmitReply: () => void;
  onRemove: (comment: BlogComment) => void;
  onPin: (comment: BlogComment) => void;
}) {
  const replies = comment.replies || [];
  return (
    <div className={cn(comment.isPinned && "rounded-xl border border-primary/20 bg-primary/[0.04] p-3 sm:p-4")}>
      <CommentRow
        comment={comment}
        me={me}
        admin={admin}
        onReply={() => onReplyTo(replyTo?.id === comment.id ? null : comment)}
        onRemove={() => onRemove(comment)}
        onPin={() => onPin(comment)}
      />
      {replyTo?.id === comment.id ? (
        <ReplyBox
          replyTo={replyTo}
          value={replyBody}
          loading={replying}
          onChange={onReplyBody}
          onCancel={() => onReplyTo(null)}
          onSubmit={onSubmitReply}
        />
      ) : null}
      {replies.length ? (
        <div className="ml-10 mt-3 space-y-3 border-l border-border/70 pl-3 sm:ml-12 sm:pl-4">
          {replies.map((reply) => (
            <div key={`reply-${reply.id}`}>
              <CommentRow
                comment={reply}
                me={me}
                admin={admin}
                nested
                onReply={() => onReplyTo(replyTo?.id === reply.id ? null : reply)}
                onRemove={() => onRemove(reply)}
              />
              {replyTo?.id === reply.id ? (
                <ReplyBox
                  replyTo={replyTo}
                  value={replyBody}
                  loading={replying}
                  onChange={onReplyBody}
                  onCancel={() => onReplyTo(null)}
                  onSubmit={onSubmitReply}
                />
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CommentRow({
  comment,
  me,
  admin,
  nested = false,
  onReply,
  onRemove,
  onPin,
}: {
  comment: BlogComment;
  me: SiteUser | null;
  admin: SiteAdmin | null;
  nested?: boolean;
  onReply: () => void;
  onRemove: () => void;
  onPin?: () => void;
}) {
  const official = Boolean(comment.isAdmin || comment.user.isAdmin);
  const mine = me && Number(me.userId) === Number(comment.user.userId) && !official;
  const canDelete = Boolean(admin || mine);
  return (
    <div className="flex gap-3">
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full text-xs font-bold",
          official
            ? "bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400 p-[2px]"
            : "bg-primary/10 text-primary",
          nested ? "h-8 w-8" : "h-9 w-9"
        )}
      >
        {official ? (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-background text-[10px]">
            CC
          </div>
        ) : (
          initials(comment.user.username)
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-x-1.5 text-sm">
          <span className="font-semibold">@{comment.user.username}</span>
          {official ? <BadgeCheck className="h-3.5 w-3.5 fill-sky-500 text-white" /> : null}
          {comment.isPinned ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
              <Pin className="h-3 w-3" />
              Pinned
            </span>
          ) : null}
          {comment.user.isBlocked && admin ? (
            <span className="text-[10px] font-semibold uppercase text-destructive">Blocked</span>
          ) : null}
          <span className="text-muted-foreground">{timeAgo(comment.createdAt)}</span>
        </p>
        <p className="mt-0.5 break-words text-sm leading-6 text-foreground/90">
          <CommentBody text={comment.body} />
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <button type="button" className="inline-flex items-center gap-1 hover:text-foreground" onClick={onReply}>
            <Reply className="h-3.5 w-3.5" />
            Reply
          </button>
          {admin && !nested && onPin ? (
            <button type="button" className="inline-flex items-center gap-1 hover:text-foreground" onClick={onPin}>
              {comment.isPinned ? <PinOff className="h-3.5 w-3.5" /> : <Pin className="h-3.5 w-3.5" />}
              {comment.isPinned ? "Unpin" : "Pin"}
            </button>
          ) : null}
          {canDelete ? (
            <button
              type="button"
              className="inline-flex items-center gap-1 hover:text-destructive"
              onClick={onRemove}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ReplyBox({
  replyTo,
  value,
  loading,
  onChange,
  onCancel,
  onSubmit,
}: {
  replyTo: BlogComment;
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="ml-10 mt-2 sm:ml-12">
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Reply to @${replyTo.user.username}`}
        rows={2}
        autoFocus
      />
      <div className="mt-2 flex justify-end gap-2">
        <Button size="sm" variant="ghost" className="rounded-full" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="sm" className="rounded-full" onClick={onSubmit} disabled={loading || !value.trim()}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Reply className="mr-2 h-4 w-4" />}
          Reply
        </Button>
      </div>
    </div>
  );
}
