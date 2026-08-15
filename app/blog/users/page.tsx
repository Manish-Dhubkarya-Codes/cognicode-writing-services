"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Ban,
  Loader2,
  MessageCircle,
  Pin,
  PinOff,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { getData, postData } from "@/app/server/fetch-beckend-services";
import {
  addAdminComment,
  BlogComment,
  deletePostComment,
  fetchAdminComments,
  pinPostComment,
} from "@/lib/blog-engagement";

type Admin = { adminId: number | string; email: string; name?: string };

type SiteUserRow = {
  userId: number;
  username: string;
  displayName?: string;
  email?: string | null;
  mobile?: string | null;
  channel: string;
  isBlocked: boolean;
  lastLoginAt?: string | null;
  lastSeenAt?: string | null;
  loginCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  visitCount: number;
  lastVisitAt?: string | null;
  lastVisitedSlug?: string | null;
  blockedReason?: string | null;
  createdAt?: string | null;
};

type Summary = {
  total: number;
  loggedIn: number;
  blocked: number;
  last24h: number;
};

function authQs(admin: Admin) {
  return `adminId=${encodeURIComponent(String(admin.adminId))}&email=${encodeURIComponent(admin.email)}`;
}

function fmt(value?: string | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}

export default function SiteUsersAdminPage() {
  const { toast } = useToast();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [checking, setChecking] = useState(true);
  const [users, setUsers] = useState<SiteUserRow[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [queryInput, setQueryInput] = useState("");
  const [status, setStatus] = useState("logged-in");
  const [selected, setSelected] = useState<any>(null);
  const [activity, setActivity] = useState<any>(null);
  const [tab, setTab] = useState<"users" | "comments">("users");
  const [allComments, setAllComments] = useState<BlogComment[]>([]);
  const [commentQuery, setCommentQuery] = useState("");
  const [commentQueryInput, setCommentQueryInput] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<number, string>>({});
  const [commentBusy, setCommentBusy] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("admin");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.adminId && parsed?.email) {
          setAdmin({
            adminId: parsed.adminId,
            email: parsed.email,
            name: parsed.name,
          });
        }
      }
      const tabParam = new URLSearchParams(window.location.search).get("tab");
      if (tabParam === "comments") setTab("comments");
    } catch {
      // ignore
    } finally {
      setChecking(false);
    }
  }, []);

  const loadUsers = useCallback(async () => {
    if (!admin) return;
    setLoading(true);
    try {
      const qs = `${authQs(admin)}&q=${encodeURIComponent(query)}&status=${encodeURIComponent(status)}`;
      const res = await getData(`site-users/admin/users?${qs}`);
      if (res?.success) {
        setUsers(res.data || []);
        setSummary(res.summary || null);
      } else {
        toast({
          title: "Could not load users",
          description: res?.message || "Check API and Init user tables",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [admin, query, status, toast]);

  const loadActivity = useCallback(async () => {
    if (!admin) return;
    const res = await getData(`blog-engagement/admin/activity?${authQs(admin)}`);
    if (res?.success) setActivity(res);
  }, [admin]);

  const loadComments = useCallback(async () => {
    if (!admin) return;
    const res = await fetchAdminComments({ q: commentQuery });
    if (res?.success) setAllComments(res.data || []);
  }, [admin, commentQuery]);

  useEffect(() => {
    const t = setTimeout(() => setQuery(queryInput.trim()), 400);
    return () => clearTimeout(t);
  }, [queryInput]);

  useEffect(() => {
    const t = setTimeout(() => setCommentQuery(commentQueryInput.trim()), 400);
    return () => clearTimeout(t);
  }, [commentQueryInput]);

  useEffect(() => {
    if (admin) {
      loadUsers();
      loadActivity();
      loadComments();
    }
  }, [admin, loadUsers, loadActivity, loadComments]);

  const ensureTables = async () => {
    if (!admin) return;
    const res = await postData(`site-users/admin/init-tables?${authQs(admin)}`, {
      adminId: admin.adminId,
      email: admin.email,
    });
    if (res?.success) {
      toast({ title: "Tables ready", description: (res.tables || []).join(", ") });
      loadUsers();
      loadActivity();
    } else {
      toast({
        title: "Init failed",
        description: res?.message || "Could not create tables",
        variant: "destructive",
      });
    }
  };

  const toggleBlock = async (user: SiteUserRow) => {
    if (!admin) return;
    const path = user.isBlocked
      ? `site-users/admin/users/${user.userId}/unblock`
      : `site-users/admin/users/${user.userId}/block`;
    const reason = user.isBlocked
      ? undefined
      : window.prompt("Reason for blocking this user?", "Blocked by admin") ||
        "Blocked by admin";
    const res = await postData(`${path}?${authQs(admin)}`, {
      adminId: admin.adminId,
      email: admin.email,
      reason,
    });
    if (res?.success) {
      toast({ title: res.message });
      loadUsers();
      if (selected?.user?.userId === user.userId) setSelected(null);
    } else {
      toast({
        title: "Action failed",
        description: res?.message || "Try again",
        variant: "destructive",
      });
    }
  };

  const openUser = async (user: SiteUserRow) => {
    if (!admin) return;
    const res = await getData(`site-users/admin/users/${user.userId}?${authQs(admin)}`);
    if (res?.success) setSelected(res.data);
    else toast({ title: "Could not load activity", variant: "destructive" });
  };

  const pinComment = async (comment: BlogComment) => {
    setCommentBusy(comment.id);
    try {
      const res = await pinPostComment(comment.id, !comment.isPinned);
      if (res?.success) {
        toast({ title: comment.isPinned ? "Unpinned" : "Pinned" });
        loadComments();
      } else {
        toast({ title: "Could not pin", description: res?.message, variant: "destructive" });
      }
    } finally {
      setCommentBusy(null);
    }
  };

  const removeComment = async (comment: BlogComment) => {
    if (!confirm("Delete this comment?")) return;
    setCommentBusy(comment.id);
    try {
      const res = await deletePostComment(comment.id);
      if (res?.success) {
        toast({ title: "Comment deleted" });
        loadComments();
      } else {
        toast({ title: "Could not delete", description: res?.message, variant: "destructive" });
      }
    } finally {
      setCommentBusy(null);
    }
  };

  const replyAsAdmin = async (comment: BlogComment) => {
    const body = (replyDrafts[comment.id] || "").trim();
    if (!body) return;
    setCommentBusy(comment.id);
    try {
      const res = await addAdminComment(
        comment.postSlug,
        body,
        comment.parentId || comment.id
      );
      if (res?.success) {
        setReplyDrafts((prev) => ({ ...prev, [comment.id]: "" }));
        toast({ title: "Replied as CogniCode" });
        loadComments();
      } else {
        toast({ title: "Could not reply", description: res?.message, variant: "destructive" });
      }
    } finally {
      setCommentBusy(null);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mt-17 flex flex-1 flex-col items-center justify-center gap-4 px-4">
          <h1 className="font-serif text-2xl font-bold">Admin login required</h1>
          <p className="max-w-md text-center text-sm text-muted-foreground">
            Use Admin login from the Log in dialog, then open Site users again.
          </p>
          <Button className="rounded-full" asChild>
            <Link prefetch={false} href="/blog/">
              Back to feed
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
      <main className="mt-17 min-w-0 flex-1 overflow-x-hidden bg-muted/30">
        <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                prefetch={false}
                href="/blog/manage/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Blog manage
              </Link>
              <h1 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">
                {tab === "comments" ? "All comments" : "Site users"}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {tab === "comments"
                  ? "Every comment on every post. Pin, reply as CogniCode, or delete."
                  : "Members who registered or logged in, plus visit / like / comment activity."}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" className="rounded-full" onClick={ensureTables}>
                Init user tables
              </Button>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => {
                  loadUsers();
                  loadActivity();
                  loadComments();
                }}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={tab === "users" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setTab("users")}
            >
              <Users className="mr-1.5 h-3.5 w-3.5" />
              Users
            </Button>
            <Button
              size="sm"
              variant={tab === "comments" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setTab("comments")}
            >
              <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
              Comments {allComments.length ? `(${allComments.length})` : ""}
            </Button>
          </div>

          {tab === "users" ? (
          <>
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Registered" value={summary?.total ?? 0} />
            <Stat label="Have logged in" value={summary?.loggedIn ?? 0} />
            <Stat label="Last 24 hours" value={summary?.last24h ?? 0} />
            <Stat label="Blocked" value={summary?.blocked ?? 0} />
          </div>

          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <Input
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Search username, email, mobile…"
              className="sm:max-w-sm"
            />
            <div className="flex flex-wrap gap-2">
              {[
                { id: "logged-in", label: "Logged in" },
                { id: "all", label: "All" },
                { id: "active", label: "Active" },
                { id: "blocked", label: "Blocked" },
              ].map((item) => (
                <Button
                  key={item.id}
                  size="sm"
                  variant={status === item.id ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setStatus(item.id)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="min-w-0 overflow-hidden rounded-2xl border bg-card">
              {loading ? (
                <div className="flex justify-center py-16">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : users.length === 0 ? (
                <div className="px-6 py-16 text-center text-sm text-muted-foreground">
                  <Users className="mx-auto mb-3 h-8 w-8 opacity-40" />
                  No users yet. If tables are missing, click Init user tables.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="border-b bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="px-4 py-3">User</th>
                        <th className="px-4 py-3">Contact</th>
                        <th className="px-4 py-3">Last login</th>
                        <th className="px-4 py-3">Activity</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.userId} className="border-b last:border-0">
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              className="text-left"
                              onClick={() => openUser(user)}
                            >
                              <p className="font-semibold">@{user.username}</p>
                              <p className="text-xs text-muted-foreground">
                                {user.displayName}
                              </p>
                            </button>
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <p>{user.email || "—"}</p>
                            <p className="text-muted-foreground">
                              {user.mobile ? `+${user.mobile}` : "—"}
                            </p>
                          </td>
                          <td className="px-4 py-3 text-xs">
                            {fmt(user.lastLoginAt)}
                            <p className="text-muted-foreground">{user.loginCount} logins</p>
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">
                            {user.likeCount} likes · {user.commentCount} comments
                            <br />
                            {user.visitCount} visits
                          </td>
                          <td className="px-4 py-3">
                            {user.isBlocked ? (
                              <Badge variant="destructive">Blocked</Badge>
                            ) : (
                              <Badge variant="secondary">Active</Badge>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              size="sm"
                              variant={user.isBlocked ? "outline" : "destructive"}
                              className="rounded-full"
                              onClick={() => toggleBlock(user)}
                            >
                              {user.isBlocked ? (
                                <>
                                  <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                                  Unblock
                                </>
                              ) : (
                                <>
                                  <Ban className="mr-1 h-3.5 w-3.5" />
                                  Block
                                </>
                              )}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border bg-card p-4 sm:p-5">
                <h2 className="font-semibold">Selected member</h2>
                {!selected ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Click a username to see visits, likes, comments and shares.
                  </p>
                ) : (
                  <div className="mt-3 space-y-4 text-sm">
                    <div>
                      <p className="font-semibold">@{selected.user.username}</p>
                      <p className="text-muted-foreground">
                        {selected.user.email || selected.user.mobile}
                      </p>
                    </div>
                    <ActivityList title="Recent visits" items={selected.visits} kind="visit" />
                    <ActivityList title="Likes" items={selected.likes} kind="like" />
                    <ActivityList title="Comments" items={selected.comments} kind="comment" />
                    <ActivityList title="Shares" items={selected.shares} kind="share" />
                  </div>
                )}
              </div>

              <div className="rounded-2xl border bg-card p-4 sm:p-5">
                <h2 className="font-semibold">Live site activity</h2>
                {activity?.totals ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {activity.totals.likes} likes · {activity.totals.comments} comments ·{" "}
                    {activity.totals.visits} visits ({activity.totals.visits24h} today)
                  </p>
                ) : null}
                <ul className="mt-3 max-h-80 space-y-2 overflow-y-auto text-xs">
                  {(activity?.visits || []).slice(0, 20).map((item: any, i: number) => (
                    <li key={`${item.created_at}-${i}`} className="rounded-lg bg-muted/50 px-3 py-2">
                      <span className="font-medium">
                        {item.username ? `@${item.username}` : "Guest"}
                      </span>{" "}
                      visited {item.postSlug || item.path || "the site"}
                      <span className="block text-muted-foreground">{fmt(item.created_at)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          </>
          ) : (
            <div className="space-y-4">
              <Input
                value={commentQueryInput}
                onChange={(e) => setCommentQueryInput(e.target.value)}
                placeholder="Search comments, usernames, posts…"
                className="sm:max-w-md"
              />
              <div className="overflow-hidden rounded-2xl border bg-card">
                {allComments.length === 0 ? (
                  <div className="px-6 py-16 text-center text-sm text-muted-foreground">
                    <MessageCircle className="mx-auto mb-3 h-8 w-8 opacity-40" />
                    No comments yet.
                  </div>
                ) : (
                  <ul className="divide-y">
                    {allComments.map((comment) => (
                      <li key={comment.id} className="p-4 sm:p-5">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">
                            @{comment.user.username}
                          </span>
                          {comment.isAdmin || comment.user.isAdmin ? (
                            <Badge>Official</Badge>
                          ) : null}
                          {comment.isPinned ? <Badge variant="secondary">Pinned</Badge> : null}
                          {comment.parentId ? <Badge variant="outline">Reply</Badge> : null}
                          <span>{fmt(comment.createdAt)}</span>
                        </div>
                        <p className="mt-2 text-sm leading-6">{comment.body}</p>
                        <Link
                          prefetch={false}
                          href={`/blog/article/?slug=${encodeURIComponent(comment.postSlug)}`}
                          className="mt-1 inline-block text-xs text-primary hover:underline"
                        >
                          {comment.postSlug}
                        </Link>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {!comment.parentId ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full"
                              disabled={commentBusy === comment.id}
                              onClick={() => pinComment(comment)}
                            >
                              {comment.isPinned ? (
                                <PinOff className="mr-1 h-3.5 w-3.5" />
                              ) : (
                                <Pin className="mr-1 h-3.5 w-3.5" />
                              )}
                              {comment.isPinned ? "Unpin" : "Pin"}
                            </Button>
                          ) : null}
                          <Button
                            size="sm"
                            variant="destructive"
                            className="rounded-full"
                            disabled={commentBusy === comment.id}
                            onClick={() => removeComment(comment)}
                          >
                            <Trash2 className="mr-1 h-3.5 w-3.5" />
                            Delete
                          </Button>
                        </div>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                          <Input
                            value={replyDrafts[comment.id] || ""}
                            onChange={(e) =>
                              setReplyDrafts((prev) => ({
                                ...prev,
                                [comment.id]: e.target.value,
                              }))
                            }
                            placeholder="Reply as CogniCode…"
                          />
                          <Button
                            size="sm"
                            className="rounded-full"
                            disabled={commentBusy === comment.id || !(replyDrafts[comment.id] || "").trim()}
                            onClick={() => replyAsAdmin(comment)}
                          >
                            Reply
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border bg-card px-4 py-3">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function ActivityList({
  title,
  items,
  kind,
}: {
  title: string;
  items: any[];
  kind: string;
}) {
  if (!items?.length) {
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">None yet</p>
      </div>
    );
  }
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <ul className="mt-1 space-y-1">
        {items.slice(0, 8).map((item, i) => (
          <li key={`${kind}-${i}`} className="text-xs">
            {item.postSlug || item.path || "—"}
            {kind === "comment" && item.body ? ` — ${item.body.slice(0, 80)}` : ""}
            <span className="text-muted-foreground"> · {fmt(item.created_at)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
