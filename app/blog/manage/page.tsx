"use client";

/**
 * Blog Manage — production-ready.
 * Uses getData / postData / deleteData from the shared API helper
 * (same as login, contact, etc.) so local + live API both work.
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  ImagePlus,
  Loader2,
  PlusCircle,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { blogCategories } from "@/lib/blog-data";
import {
  getData,
  postData,
  deleteData,
  getServerURL,
  mediaUrl,
} from "@/app/server/fetch-beckend-services";

const CLIENT_BUILD = "manage-v5-postData";

type Admin = { adminId: number | string; email: string; name?: string };

type AdminPost = {
  id: number | string;
  slug: string;
  title: string;
  excerpt?: string;
  status?: string;
  categorySlug?: string;
  coverImage?: string;
  coverVideo?: string;
};

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  categorySlug: "thesis-writing",
  authorName: "",
  authorRole: "CogniCode EduTech",
  readTime: "5 min read",
  youtubeUrl: "",
  status: "published",
  featured: false,
  keyTakeaways: "",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

function authQs(admin: Admin) {
  return `adminId=${encodeURIComponent(String(admin.adminId))}&email=${encodeURIComponent(admin.email)}`;
}

export default function BlogManagePage() {
  const { toast } = useToast();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [checking, setChecking] = useState(true);
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [coverImage, setCoverImage] = useState("");
  const [coverVideo, setCoverVideo] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [apiBase, setApiBase] = useState("");

  useEffect(() => {
    setApiBase(getServerURL());
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
          setForm((f) => ({
            ...f,
            authorName: parsed.name || "CogniCode Team",
          }));
        }
      }
    } catch {
      // ignore
    } finally {
      setChecking(false);
    }
  }, []);

  const loadPosts = useCallback(async () => {
    if (!admin) return;
    setLoadingPosts(true);
    try {
      const res = await getData(`blog/admin/posts?${authQs(admin)}`);
      if (res?.success && Array.isArray(res.data)) {
        setPosts(res.data);
      } else {
        setPosts([]);
        toast({
          title: "Could not load posts",
          description:
            res?.message ||
            `Check API at ${getServerURL()} and /blog/health`,
          variant: "destructive",
        });
      }
    } catch (e: any) {
      setPosts([]);
      toast({
        title: "API error",
        description: e?.message || "Failed to load posts",
        variant: "destructive",
      });
    } finally {
      setLoadingPosts(false);
    }
  }, [admin, toast]);

  useEffect(() => {
    if (admin) loadPosts();
  }, [admin, loadPosts]);

  const previewUrl = useMemo(() => {
    if (!form.slug && !form.title) return "";
    const s = form.slug || slugify(form.title);
    return `/blog/article/?slug=${encodeURIComponent(s)}`;
  }, [form.slug, form.title]);

  const onField = (key: keyof typeof emptyForm, value: string | boolean) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !prev.slug) next.slug = slugify(String(value));
      return next;
    });
  };

  const handleUpload = async (
    file: File | null,
    kind: "image" | "video" | "gallery"
  ) => {
    if (!file || !admin) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("adminId", String(admin.adminId));
      formData.append("email", admin.email);
      formData.append("mediaType", kind === "video" ? "video" : "image");

      const res = await postData(
        `blog/admin/upload?${authQs(admin)}`,
        formData
      );
      if (!res?.success || !res?.data?.url) {
        toast({
          title: "Upload failed",
          description: res?.message || "Could not upload file",
          variant: "destructive",
        });
        return;
      }
      const url = mediaUrl(res.data.url);
      if (kind === "image") setCoverImage(url);
      if (kind === "video") setCoverVideo(url);
      if (kind === "gallery") setGallery((g) => [...g, url]);
      toast({ title: "Uploaded", description: file.name });
    } catch (e: any) {
      toast({
        title: "Upload failed",
        description: e?.message || "Upload failed",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!admin) return;
    if (!form.title.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const takeaways = form.keyTakeaways
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean);
      const paragraphs = form.body
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);
      const content = paragraphs.length
        ? paragraphs.map((p, i) => ({
            id: `section-${i + 1}`,
            heading: i === 0 ? "Overview" : `Section ${i + 1}`,
            level: 2,
            paragraphs: [p],
          }))
        : [
            {
              id: "overview",
              heading: "Overview",
              level: 2,
              paragraphs: [form.excerpt || form.title],
            },
          ];

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim() || slugify(form.title),
        excerpt: form.excerpt.trim(),
        metaDescription: form.excerpt.trim() || form.title.trim(),
        content,
        keyTakeaways:
          takeaways.length > 0
            ? takeaways
            : ["Practical CogniCode guidance", "Built for research workflows"],
        categorySlug: form.categorySlug,
        authorName: form.authorName || admin.name || "CogniCode Team",
        authorRole: form.authorRole,
        authorBio: "Insights from the CogniCode academic research team.",
        authorInitials: (form.authorName || admin.name || "CC")
          .split(" ")
          .map((p) => p[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
        coverImage: coverImage || null,
        coverVideo: coverVideo || null,
        youtubeUrl: form.youtubeUrl.trim() || null,
        mediaGallery: gallery.length ? gallery : coverImage ? [coverImage] : [],
        imageLabel:
          blogCategories.find((c) => c.slug === form.categorySlug)?.name ||
          "Research",
        keywords: [form.categorySlug, "cognicode"],
        readTime: form.readTime,
        status: form.status,
        featured: Boolean(form.featured),
        adminId: admin.adminId,
        email: admin.email,
        serviceCta: {
          title: "Need expert help with this topic?",
          description: "Talk to CogniCode mentors for research support.",
          href: "/contact",
          buttonLabel: "Free consultation",
        },
      };

      const res = await postData(
        `blog/admin/posts?${authQs(admin)}`,
        payload
      );
      if (!res?.success) {
        toast({
          title: "Could not publish",
          description: res?.message || "Server rejected the post",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Blog published",
        description: "Live on the company feed.",
      });
      setForm({ ...emptyForm, authorName: admin.name || "CogniCode Team" });
      setCoverImage("");
      setCoverVideo("");
      setGallery([]);
      await loadPosts();
    } catch (e: any) {
      toast({
        title: "Publish failed",
        description: e?.message || "Could not publish",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (!admin) return;
    if (!confirm("Delete this post?")) return;
    try {
      const res = await deleteData(
        `blog/admin/posts/${id}?${authQs(admin)}`
      );
      if (res?.success) {
        toast({ title: "Deleted" });
        loadPosts();
      } else {
        toast({
          title: "Delete failed",
          description: res?.message || "Try again",
          variant: "destructive",
        });
      }
    } catch (e: any) {
      toast({
        title: "Delete failed",
        description: e?.message || "Try again",
        variant: "destructive",
      });
    }
  };

  const ensureTables = async () => {
    if (!admin) return;
    const res = await postData(`blog/admin/init-tables?${authQs(admin)}`, {
      adminId: admin.adminId,
      email: admin.email,
    });
    if (res?.success) {
      toast({
        title: "Tables ready",
        description: (res.tables || []).join(", ") || "OK",
      });
      loadPosts();
    } else {
      toast({
        title: "Init failed",
        description: res?.message || "Could not create tables on server DB",
        variant: "destructive",
      });
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
        <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 mt-17">
          <h1 className="font-serif text-2xl font-bold">Admin login required</h1>
          <p className="max-w-md text-center text-sm text-muted-foreground">
            Use the site Login button (top right), then open this page again.
          </p>
          <p className="text-xs text-emerald-700">
            {CLIENT_BUILD} · API {apiBase || getServerURL()}
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
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="min-w-0">
              <Link
                prefetch={false}
                href="/blog/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to social feed
              </Link>
              <h1 className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                Blog Manage
              </h1>
              <p className="mt-1 break-all text-sm text-muted-foreground">
                Signed in as {admin.name || admin.email}
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button
                variant="outline"
                className="w-full rounded-full sm:w-auto"
                type="button"
                onClick={ensureTables}
              >
                Init DB tables
              </Button>
              <Button variant="outline" className="w-full rounded-full sm:w-auto" asChild>
                <Link prefetch={false} href="/blog/">
                  View public feed
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid min-w-0 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
            <form
              onSubmit={handleCreate}
              className="min-w-0 space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:space-y-5 sm:rounded-2xl sm:p-6"
            >
              <div className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Create & publish blog post</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => onField("title", e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => onField("slug", slugify(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={form.categorySlug}
                    onValueChange={(v) => onField("categorySlug", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {blogCategories.map((c) => (
                        <SelectItem key={c.slug} value={c.slug}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Caption / excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={form.excerpt}
                  onChange={(e) => onField("excerpt", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Post body</Label>
                <Textarea
                  id="body"
                  value={form.body}
                  onChange={(e) => onField("body", e.target.value)}
                  rows={10}
                  placeholder="Separate paragraphs with a blank line."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="takeaways">Key takeaways (one per line)</Label>
                <Textarea
                  id="takeaways"
                  value={form.keyTakeaways}
                  onChange={(e) => onField("keyTakeaways", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={form.authorName}
                    onChange={(e) => onField("authorName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="readTime">Read time</Label>
                  <Input
                    id="readTime"
                    value={form.readTime}
                    onChange={(e) => onField("readTime", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube URL</Label>
                <Input
                  id="youtube"
                  value={form.youtubeUrl}
                  onChange={(e) => onField("youtubeUrl", e.target.value)}
                />
              </div>

              <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4">
                <p className="text-sm font-medium">Media uploads</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border bg-background px-3 py-4 text-xs">
                    <ImagePlus className="h-5 w-5 text-primary" />
                    Cover image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) =>
                        handleUpload(e.target.files?.[0] || null, "image")
                      }
                    />
                  </label>
                  <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border bg-background px-3 py-4 text-xs">
                    <Video className="h-5 w-5 text-primary" />
                    Cover video
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) =>
                        handleUpload(e.target.files?.[0] || null, "video")
                      }
                    />
                  </label>
                  <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border bg-background px-3 py-4 text-xs">
                    <Upload className="h-5 w-5 text-primary" />
                    Gallery
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) =>
                        handleUpload(e.target.files?.[0] || null, "gallery")
                      }
                    />
                  </label>
                </div>
                {uploading ? (
                  <p className="mt-3 text-xs text-muted-foreground">
                    <Loader2 className="mr-1 inline h-3 w-3 animate-spin" />
                    Uploading…
                  </p>
                ) : null}
                {coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={coverImage}
                    alt="cover"
                    className="mt-3 h-16 w-16 rounded-lg object-cover"
                  />
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(v) => onField("status", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => onField("featured", e.target.checked)}
                      className="h-4 w-4 rounded border-border"
                    />
                    Feature / pin
                  </label>
                </div>
              </div>

              {previewUrl ? (
                <p className="text-xs text-muted-foreground">
                  Public URL:{" "}
                  <span className="text-foreground">{previewUrl}</span>
                </p>
              ) : null}

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full"
                disabled={saving || uploading}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing…
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Publish to company feed
                  </>
                )}
              </Button>
            </form>

            <div className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:rounded-2xl sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h2 className="font-semibold">Your posts</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 rounded-full"
                  onClick={loadPosts}
                  disabled={loadingPosts}
                >
                  {loadingPosts ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Refresh"
                  )}
                </Button>
              </div>

              {loadingPosts ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : posts.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  No posts yet. If this is production and tables are missing,
                  click <strong>Init DB tables</strong>.
                </p>
              ) : (
                <ul className="space-y-3">
                  {posts.map((post) => (
                    <li
                      key={post.id}
                      className="rounded-xl border border-border/80 p-3"
                    >
                      <div className="flex items-start gap-3">
                        {post.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={mediaUrl(post.coverImage)}
                            alt=""
                            className="h-14 w-14 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted text-xs">
                            Post
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">
                            {post.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {post.status} · {post.categorySlug}
                          </p>
                          <div className="mt-2 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 rounded-full text-xs"
                              asChild
                            >
                              <Link
                                prefetch={false}
                                href={`/blog/article/?slug=${encodeURIComponent(post.slug)}`}
                              >
                                <ExternalLink className="mr-1 h-3 w-3" />
                                View
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 rounded-full text-xs text-red-600"
                              onClick={() => handleDelete(post.id)}
                            >
                              <Trash2 className="mr-1 h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
