"use client";

/**
 * Blog Manage — structured GFG-style composer.
 * Uses getData / postData / putData / deleteData from the shared API helper.
 */

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { blogCategories } from "@/lib/blog-data";
import { estimateReadTime, getPostType, slugifyBlog } from "@/lib/blog-content";
import {
  BlogComposer,
  ComposerForm,
  emptyComposer,
} from "@/components/blog/blog-composer";
import type { MediaKind, UploadRequestOptions } from "@/components/blog/upload-slot";
import {
  getData,
  postData,
  putData,
  deleteData,
  getServerURL,
  mediaUrl,
} from "@/app/server/fetch-beckend-services";
import { uploadBlogFileResumable } from "@/lib/blog-resumable-upload";

const CLIENT_BUILD = "manage-v8-full-page";

type Admin = { adminId: number | string; email: string; name?: string };

function authQs(admin: Admin) {
  return `adminId=${encodeURIComponent(String(admin.adminId))}&email=${encodeURIComponent(admin.email)}`;
}

export default function BlogManagePage() {
  const { toast } = useToast();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [checking, setChecking] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ComposerForm>(emptyComposer());
  const [apiBase, setApiBase] = useState("");

  useEffect(() => {
    setApiBase(getServerURL());
    try {
      const raw = localStorage.getItem("admin");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.adminId && parsed?.email) {
          const nextAdmin = {
            adminId: parsed.adminId,
            email: parsed.email,
            name: parsed.name,
          };
          setAdmin(nextAdmin);
          setForm(emptyComposer(parsed.name || "CogniCode Team"));
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
          description: res?.message || `Check API at ${getServerURL()} and /blog/health`,
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

  const ensureTablesQuiet = useCallback(async () => {
    if (!admin) return false;
    const res = await postData(`blog/admin/init-tables?${authQs(admin)}`, {
      adminId: admin.adminId,
      email: admin.email,
    });
    return Boolean(res?.success);
  }, [admin]);

  useEffect(() => {
    if (!admin) return;
    loadPosts();
    void (async () => {
      const cats = await getData("blog/categories");
      if (!cats?.success || !Array.isArray(cats.data) || cats.data.length === 0) {
        await ensureTablesQuiet();
      }
    })();
  }, [admin, loadPosts, ensureTablesQuiet]);

  const handleUpload = async (
    file: File,
    kind: MediaKind,
    options?: UploadRequestOptions
  ): Promise<string | null> => {
    if (!admin) {
      toast({
        title: "Sign in as admin to upload",
        variant: "destructive",
      });
      return null;
    }
    try {
      const uploadedUrl = await uploadBlogFileResumable({
        file,
        kind,
        admin,
        authQuery: authQs(admin),
        options,
      });
      if (!uploadedUrl) {
        toast({
          title: "Upload failed",
          description: "Could not upload file",
          variant: "destructive",
        });
        return null;
      }
      toast({ title: "Uploaded", description: file.name });
      return uploadedUrl;
    } catch (e: any) {
      if (e?.name === "AbortError") throw e;
      toast({
        title: "Upload failed",
        description: e?.uploadMessage || e?.message || "Upload failed",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSave = async (e: React.FormEvent) => {
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
      const typeMeta = getPostType(form.postType);
      const readyAttachments = form.attachments
        .filter((item) => item.url)
        .map(({ title, description, url, fileLabel, fileType }) => ({
          title,
          description,
          url,
          fileLabel,
          fileType,
        }));
      const payload = {
        title: form.title.trim(),
        subtitle: form.subtitle.trim() || null,
        slug: form.slug.trim() || slugifyBlog(form.title),
        excerpt: form.excerpt.trim(),
        metaDescription: form.excerpt.trim() || form.title.trim(),
        content: JSON.parse(JSON.stringify(form.blocks || [])),
        keyTakeaways:
          takeaways.length > 0
            ? takeaways
            : ["Practical CogniCode guidance", "Built for research workflows"],
        categorySlug: form.categorySlug,
        postType: form.postType,
        tags: form.tags,
        difficulty: form.difficulty,
        attachments: readyAttachments,
        authorName: form.authorName || admin.name || "CogniCode Team",
        authorRole: form.authorRole,
        authorBio: "Insights from the CogniCode academic research team.",
        authorInitials: (form.authorName || admin.name || "CC")
          .split(" ")
          .map((p) => p[0])
          .join("")
          .slice(0, 8)
          .toUpperCase(),
        coverImage: form.coverImage || null,
        coverVideo: form.coverVideo || null,
        youtubeUrl: form.youtubeUrl.trim() || null,
        mediaGallery: form.gallery.length
          ? form.gallery
          : form.coverImage
            ? [form.coverImage]
            : [],
        imageLabel:
          blogCategories.find((c) => c.slug === form.categorySlug)?.name || typeMeta.shortLabel,
        keywords: [...new Set([form.categorySlug, form.postType, ...form.tags, "cognicode"])],
        readTime: form.readTime || estimateReadTime(form.blocks),
        status: form.status,
        featured: Boolean(form.featured),
        adminId: admin.adminId,
        email: admin.email,
        resource: readyAttachments[0]
          ? {
              title: readyAttachments[0].title,
              description: readyAttachments[0].description || "",
              fileLabel: readyAttachments[0].fileLabel || readyAttachments[0].title,
              url: readyAttachments[0].url,
              fileType: readyAttachments[0].fileType || "",
            }
          : undefined,
        serviceCta: {
          title: "Need expert help with this topic?",
          description: "Talk to CogniCode mentors for research support.",
          href: "/contact",
          buttonLabel: "Free consultation",
        },
      };

      const saveOnce = () =>
        form.id
          ? putData(`blog/admin/posts/${form.id}?${authQs(admin)}`, payload)
          : postData(`blog/admin/posts?${authQs(admin)}`, payload);

      let res = await saveOnce();
      if (!res?.success && !form.id) {
        await ensureTablesQuiet();
        res = await saveOnce();
      }

      if (!res?.success) {
        toast({
          title: form.id ? "Could not update" : "Could not publish",
          description: res?.message || "Server rejected the post",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: form.id ? "Article updated" : "Article published",
        description: form.status === "draft" ? "Saved as draft." : "Live on the research archive.",
      });
      setForm(emptyComposer(admin.name || "CogniCode Team"));
      await loadPosts();
    } catch (e: any) {
      toast({
        title: "Save failed",
        description: e?.message || "Could not save",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (post: any) => {
    const content = Array.isArray(post.content) ? post.content : [];
    setForm({
      id: post.id,
      title: post.title || "",
      subtitle: post.subtitle || "",
      slug: post.slug || "",
      excerpt: post.excerpt || "",
      categorySlug: post.categorySlug || "thesis-writing",
      postType: post.postType || "article",
      tags: Array.isArray(post.tags) ? post.tags : [],
      difficulty: post.difficulty || "intermediate",
      authorName: post.author?.name || admin?.name || "CogniCode Team",
      authorRole: post.author?.role || "CogniCode EduTech",
      readTime: post.readTime || "5 min read",
      youtubeUrl: post.youtubeUrl || "",
      status: post.status || "published",
      featured: Boolean(post.featured),
      keyTakeaways: Array.isArray(post.keyTakeaways)
        ? post.keyTakeaways.join("\n")
        : "",
      blocks: (content.length ? content : emptyComposer().blocks).map((block: any) => ({
        ...block,
        imageUrl: mediaUrl(block.imageUrl) || block.imageUrl || "",
        videoUrl: mediaUrl(block.videoUrl) || block.videoUrl || "",
        download: block.download
          ? { ...block.download, url: mediaUrl(block.download.url) || block.download.url || "" }
          : block.download,
      })),
      coverImage: mediaUrl(post.coverImage),
      coverVideo: mediaUrl(post.coverVideo),
      gallery: Array.isArray(post.mediaGallery)
        ? post.mediaGallery.map((u: string) => mediaUrl(u)).filter(Boolean)
        : [],
      attachments: Array.isArray(post.attachments)
        ? post.attachments.map((item: any, index: number) => ({
            title: item.title || item.fileLabel || "Download",
            description: item.description || "",
            url: mediaUrl(item.url),
            fileLabel: item.fileLabel || item.title || "Download",
            fileType: item.fileType || "",
            tempKey: `existing-${post.id}-${index}`,
          }))
        : [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number | string) => {
    if (!admin) return;
    if (!confirm("Delete this post?")) return;
    try {
      const res = await deleteData(`blog/admin/posts/${id}?${authQs(admin)}`);
      if (res?.success) {
        toast({ title: "Deleted" });
        if (String(form.id) === String(id)) {
          setForm(emptyComposer(admin.name || "CogniCode Team"));
        }
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
        <main className="mt-17 flex flex-1 flex-col items-center justify-center gap-4 px-4">
          <h1 className="font-serif text-2xl font-bold">Admin login required</h1>
          <p className="max-w-md text-center text-sm text-muted-foreground">
            Use the site Login button (top right), then open this page again.
          </p>
          <p className="text-xs text-emerald-700">
            {CLIENT_BUILD} · API {apiBase || getServerURL()}
          </p>
          <Button className="rounded-full" asChild>
            <Link prefetch={false} href="/blog/">
              Back to archive
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
                Back to research archive
              </Link>
              <h1 className="mt-2 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                Publish research content
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
                <Link prefetch={false} href="/blog/users/">
                  Site users
                </Link>
              </Button>
              <Button variant="outline" className="w-full rounded-full sm:w-auto" asChild>
                <Link prefetch={false} href="/blog/">
                  View public archive
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid min-w-0 gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
            <BlogComposer
              form={form}
              setForm={setForm}
              saving={saving}
              onUpload={handleUpload}
              onSubmit={handleSave}
              onCancelEdit={() => setForm(emptyComposer(admin.name || "CogniCode Team"))}
            />

            <div className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm sm:rounded-2xl sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h2 className="font-semibold">Your articles</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 rounded-full"
                  onClick={loadPosts}
                  disabled={loadingPosts}
                >
                  {loadingPosts ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
                </Button>
              </div>

              {loadingPosts ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : posts.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  No posts yet. If this is production and tables are missing, click{" "}
                  <strong>Init DB tables</strong>.
                </p>
              ) : (
                <ul className="space-y-3">
                  {posts.map((post) => (
                    <li key={post.id} className="rounded-xl border border-border/80 p-3">
                      <div className="flex items-start gap-3">
                        {post.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={mediaUrl(post.coverImage)}
                            alt=""
                            className="h-14 w-14 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted text-[10px]">
                            {getPostType(post.postType).shortLabel}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{post.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {post.status} · {getPostType(post.postType).shortLabel} · {post.categorySlug}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 rounded-full text-xs"
                              type="button"
                              onClick={() => startEdit(post)}
                            >
                              <Pencil className="mr-1 h-3 w-3" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 rounded-full text-xs" asChild>
                              <a href={`/blog/article/?slug=${encodeURIComponent(post.slug)}`}>
                                <ExternalLink className="mr-1 h-3 w-3" />
                                View
                              </a>
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
