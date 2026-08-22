"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  FileUp,
  ImagePlus,
  Loader2,
  PenLine,
  PlusCircle,
  Settings2,
  Trash2,
  Video,
} from "lucide-react";
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
import { blogCategories, BlogPostTypeSlug, BlogSection } from "@/lib/blog-data";
import {
  blogBlockOptions,
  blogPostTypes,
  createEmptyBlock,
  estimateReadTime,
  getPostType,
  seedBlocksForType,
  slugifyBlog,
  suggestedBlogTags,
} from "@/lib/blog-content";
import { cn } from "@/lib/utils";
import { ArticleDocument } from "@/components/blog/article-document";
import { FeedPost } from "@/lib/blog-api";
import { getCategoryName } from "@/lib/blog-data";
import {
  AttachmentManager,
  FilePicker,
  type ComposerAttachment,
  type UploadFn,
} from "@/components/blog/upload-slot";

export type ComposerForm = {
  id?: number | string;
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  categorySlug: string;
  postType: BlogPostTypeSlug;
  tags: string[];
  difficulty: string;
  authorName: string;
  authorRole: string;
  readTime: string;
  youtubeUrl: string;
  status: string;
  featured: boolean;
  keyTakeaways: string;
  blocks: BlogSection[];
  coverImage: string;
  coverVideo: string;
  gallery: string[];
  attachments: ComposerAttachment[];
};

export const emptyComposer = (authorName = "CogniCode Team"): ComposerForm => ({
  title: "",
  subtitle: "",
  slug: "",
  excerpt: "",
  categorySlug: "thesis-writing",
  postType: "article",
  tags: [],
  difficulty: "intermediate",
  authorName,
  authorRole: "CogniCode EduTech",
  readTime: "5 min read",
  youtubeUrl: "",
  status: "published",
  featured: false,
  keyTakeaways: "",
  blocks: seedBlocksForType("article"),
  coverImage: "",
  coverVideo: "",
  gallery: [],
  attachments: [],
});

type BlogComposerProps = {
  form: ComposerForm;
  setForm: (next: ComposerForm | ((prev: ComposerForm) => ComposerForm)) => void;
  saving: boolean;
  onUpload: UploadFn;
  onSubmit: (e: React.FormEvent) => void;
  onCancelEdit?: () => void;
};

export function BlogComposer({
  form,
  setForm,
  saving,
  onUpload,
  onSubmit,
  onCancelEdit,
}: BlogComposerProps) {
  const [tagDraft, setTagDraft] = useState("");
  const [mode, setMode] = useState<"write" | "preview" | "details">("write");
  const [busyIds, setBusyIds] = useState<string[]>([]);
  const anyUploading = busyIds.length > 0;
  const markBusy = (id: string, busy: boolean) => {
    setBusyIds((prev) => {
      if (busy) return prev.includes(id) ? prev : [...prev, id];
      return prev.filter((item) => item !== id);
    });
  };
  const typeMeta = getPostType(form.postType);
  const previewSlug = form.slug || slugifyBlog(form.title);

  const onField = <K extends keyof ComposerForm>(key: K, value: ComposerForm[K]) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !prev.slug) next.slug = slugifyBlog(String(value));
      if (key === "postType" && !prev.id) {
        next.blocks = seedBlocksForType(value as BlogPostTypeSlug);
      }
      if (key === "blocks") next.readTime = estimateReadTime(value as BlogSection[]);
      return next;
    });
  };

  const updateBlock = (id: string, patch: Partial<BlogSection>) => {
    setForm((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)),
      readTime: estimateReadTime(
        prev.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b))
      ),
    }));
  };

  const addBlock = (type: BlogSection["type"], index?: number) => {
    const block = createEmptyBlock(type || "paragraphs");
    setForm((prev) => {
      const blocks = [...prev.blocks];
      if (index === undefined || index >= blocks.length) blocks.push(block);
      else blocks.splice(index, 0, block);
      return { ...prev, blocks, readTime: estimateReadTime(blocks) };
    });
    setMode("write");
  };

  const previewPost = useMemo<FeedPost>(() => {
    const slug = form.slug || slugifyBlog(form.title) || "preview";
    return {
      id: String(form.id || "preview"),
      slug,
      title: form.title || "Untitled article",
      subtitle: form.subtitle,
      excerpt: form.excerpt,
      metaDescription: form.excerpt || form.title,
      category: form.categorySlug as FeedPost["category"],
      postType: form.postType,
      tags: form.tags,
      difficulty: (form.difficulty as FeedPost["difficulty"]) || "intermediate",
      author: {
        name: form.authorName || "CogniCode Team",
        role: form.authorRole,
        bio: "Insights from the CogniCode academic research team.",
        initials: (form.authorName || "CC")
          .split(" ")
          .map((p) => p[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      },
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      dateISO: new Date().toISOString().slice(0, 10),
      updatedISO: new Date().toISOString().slice(0, 10),
      readTime: form.readTime || estimateReadTime(form.blocks),
      featured: form.featured,
      imageGradient: "from-slate-900 via-indigo-900 to-blue-800",
      imageLabel: getCategoryName(form.categorySlug as FeedPost["category"]),
      keywords: form.tags,
      keyTakeaways: form.keyTakeaways.split("\n").map((t) => t.trim()).filter(Boolean),
      attachments: form.attachments,
      sections: form.blocks,
      serviceCta: {
        title: "Need expert help with this topic?",
        description: "Talk to CogniCode mentors for research support.",
        href: "/contact",
        buttonLabel: "Free consultation",
      },
      source: "api",
      coverImage: form.coverImage,
      coverVideo: form.coverVideo,
      youtubeUrl: form.youtubeUrl,
      mediaGallery: form.gallery,
      href: `/blog/article/?slug=${encodeURIComponent(slug)}`,
    };
  }, [form]);

  const moveBlock = (index: number, dir: -1 | 1) => {
    setForm((prev) => {
      const next = [...prev.blocks];
      const to = index + dir;
      if (to < 0 || to >= next.length) return prev;
      [next[index], next[to]] = [next[to], next[index]];
      return { ...prev, blocks: next };
    });
  };

  const removeBlock = (id: string) => {
    setForm((prev) => ({ ...prev, blocks: prev.blocks.filter((b) => b.id !== id) }));
  };

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag || form.tags.includes(tag)) return;
    onField("tags", [...form.tags, tag].slice(0, 16));
    setTagDraft("");
  };

  const suggestedLeft = useMemo(
    () => suggestedBlogTags.filter((t) => !form.tags.includes(t)),
    [form.tags]
  );

  return (
    <form onSubmit={onSubmit} className="min-w-0 space-y-5 rounded-xl border border-border bg-card p-4 shadow-sm sm:rounded-2xl sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-semibold">
            {form.id ? "Edit full article page" : "Write a full article page"}
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {typeMeta.name} · one page with text, tables, images, video, code, and files
          </p>
        </div>
        {form.id && onCancelEdit ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => {
              setBusyIds([]);
              onCancelEdit();
            }}
          >
            New post
          </Button>
        ) : null}
      </div>

      <div>
        <Label className="mb-2 block">Format</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {blogPostTypes.map((type) => (
            <button
              key={type.slug}
              type="button"
              onClick={() => onField("postType", type.slug)}
              className={cn(
                "rounded-xl border px-2.5 py-2 text-left transition-colors",
                form.postType === type.slug
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/40"
              )}
            >
              <p className="text-xs font-semibold">{type.shortLabel}</p>
              <p className="mt-0.5 line-clamp-2 text-[10px] leading-4">{type.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 rounded-xl border border-border bg-muted/40 p-1">
        {(
          [
            { id: "write", label: "Write page", icon: PenLine },
            { id: "preview", label: "Full page preview", icon: Eye },
            { id: "details", label: "Details", icon: Settings2 },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium sm:flex-none sm:text-sm",
                mode === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {mode === "preview" ? (
        <div className="overflow-hidden rounded-xl border border-border bg-background p-4 sm:p-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Full article page — text, tables, images, and media together
          </p>
          <ArticleDocument post={previewPost} />
        </div>
      ) : (
      <>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={form.title}
          onChange={(e) => onField("title", e.target.value)}
          required
          placeholder="How to structure a PhD thesis in 2026"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input
          id="subtitle"
          value={form.subtitle}
          onChange={(e) => onField("subtitle", e.target.value)}
          placeholder="Optional supporting line under the title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Lead paragraph</Label>
        <Textarea
          id="excerpt"
          value={form.excerpt}
          onChange={(e) => onField("excerpt", e.target.value)}
          rows={3}
          placeholder="Opening paragraph of the article page. Also used in the archive listing."
        />
      </div>

      <div className={cn("space-y-4", mode === "write" && "hidden")}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={form.slug}
            onChange={(e) => onField("slug", slugifyBlog(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={form.categorySlug} onValueChange={(v) => onField("categorySlug", v)}>
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
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-1.5">
          {form.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => onField("tags", form.tags.filter((t) => t !== tag))}
              className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary"
            >
              {tag} ×
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={tagDraft}
            onChange={(e) => setTagDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(tagDraft);
              }
            }}
            placeholder="Add a tag and press Enter"
          />
          <Button type="button" variant="outline" onClick={() => addTag(tagDraft)}>
            Add
          </Button>
        </div>
        {suggestedLeft.length ? (
          <div className="flex flex-wrap gap-1.5">
            {suggestedLeft.slice(0, 10).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => addTag(tag)}
                className="rounded-md border border-dashed border-border px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
              >
                + {tag}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Difficulty</Label>
          <Select value={form.difficulty || "intermediate"} onValueChange={(v) => onField("difficulty", v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
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

      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4">
        <p className="text-sm font-medium">Cover media</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <FilePicker
            key={`cover-image-${form.id || "new"}`}
            label="Cover image"
            accept="image/*"
            icon={ImagePlus}
            kind="image"
            preview="image"
            currentUrl={form.coverImage}
            onUpload={onUpload}
            onBusyChange={(busy) => markBusy("cover-image", busy)}
            onComplete={(url) =>
              setForm((p) => ({
                ...p,
                coverImage: url,
                gallery: p.gallery.includes(url) ? p.gallery : [...p.gallery, url],
              }))
            }
            onClear={() =>
              setForm((p) => ({
                ...p,
                coverImage: "",
                gallery: p.gallery.filter((u) => u !== p.coverImage),
              }))
            }
          />
          <FilePicker
            key={`cover-video-${form.id || "new"}`}
            label="Cover video"
            accept="video/*"
            icon={Video}
            kind="video"
            preview="video"
            currentUrl={form.coverVideo}
            onUpload={onUpload}
            onBusyChange={(busy) => markBusy("cover-video", busy)}
            onComplete={(url) => setForm((p) => ({ ...p, coverVideo: url }))}
            onClear={() => setForm((p) => ({ ...p, coverVideo: "" }))}
          />
          <FilePicker
            key={`extra-image-${form.id || "new"}-${form.gallery.length}`}
            label="Extra image"
            accept="image/*"
            icon={ImagePlus}
            kind="gallery"
            preview="image"
            onUpload={onUpload}
            onBusyChange={(busy) => markBusy("gallery-image", busy)}
            onComplete={(url) =>
              setForm((p) => ({ ...p, gallery: [...p.gallery, url] }))
            }
            onClear={() => {}}
          />
        </div>
        {form.gallery.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {form.gallery.map((url) => (
              <div key={url} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-14 w-14 rounded-lg object-cover" />
                <button
                  type="button"
                  className="absolute -right-1 -top-1 rounded-full bg-background px-1 text-[10px] text-red-600 shadow"
                  onClick={() =>
                    setForm((p) => ({
                      ...p,
                      gallery: p.gallery.filter((item) => item !== url),
                      coverImage: p.coverImage === url ? "" : p.coverImage,
                    }))
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : null}
        <div className="mt-3 space-y-2">
          <Label htmlFor="youtube">Cover YouTube URL</Label>
          <Input
            id="youtube"
            value={form.youtubeUrl}
            onChange={(e) => onField("youtubeUrl", e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>
      </div>
      </div>

      <div className={cn("space-y-3", mode === "details" && "hidden")}>
        <div>
          <p className="text-sm font-medium">Build the article page</p>
          <p className="text-xs text-muted-foreground">
            Insert headings, text, tables, images, video, links, code, files, and Q&amp;A into one page. In text, write [label](https://example.com) to attach a clickable link.
          </p>
        </div>
        <div className="sticky top-20 z-20 flex flex-wrap gap-1.5 rounded-xl border border-border bg-background/95 p-2 shadow-sm backdrop-blur">
          {blogBlockOptions.map((opt) => (
            <Button
              key={opt.type}
              type="button"
              size="sm"
              variant="outline"
              className="h-8 rounded-full text-xs"
              onClick={() => addBlock(opt.type)}
            >
              <PlusCircle className="mr-1 h-3 w-3" />
              {opt.label}
            </Button>
          ))}
        </div>

        <div className="space-y-2 rounded-xl border border-dashed border-primary/30 bg-muted/20 p-3 sm:p-4">
          {form.blocks.map((block, index) => (
            <div key={block.id}>
              {index === 0 ? <InsertRow onInsert={(type) => addBlock(type, 0)} /> : null}
              <BlockEditor
                block={block}
                index={index}
                total={form.blocks.length}
                onChange={(patch) => updateBlock(block.id, patch)}
                onMove={(dir) => moveBlock(index, dir)}
                onRemove={() => removeBlock(block.id)}
                onUpload={onUpload}
                onBusyChange={(busy) => markBusy(`block-${block.id}`, busy)}
              />
              <InsertRow onInsert={(type) => addBlock(type, index + 1)} />
            </div>
          ))}
          {form.blocks.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Insert a heading, text, table, or image to start the page.
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="takeaways">Key takeaways (one per line)</Label>
        <Textarea
          id="takeaways"
          value={form.keyTakeaways}
          onChange={(e) => onField("keyTakeaways", e.target.value)}
          rows={4}
        />
      </div>

      <div className="rounded-xl border border-dashed border-border p-4">
        <p className="text-sm font-medium">Article attachments</p>
        <p className="mt-1 text-xs text-muted-foreground">
          PDF, Word, Excel, PowerPoint, ZIP, CSV, or TXT. Each file has its own progress, stop, resume, and remove.
        </p>
        <div className="mt-3">
          <AttachmentManager
            items={form.attachments}
            onUpload={onUpload}
            onBusyChange={(id, busy) => markBusy(`attachment-${id}`, busy)}
            onChange={(attachments) =>
              setForm((p) => ({
                ...p,
                attachments:
                  typeof attachments === "function" ? attachments(p.attachments) : attachments,
              }))
            }
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={form.status} onValueChange={(v) => onField("status", v)}>
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
            Feature / pick this article
          </label>
        </div>
      </div>

      {previewSlug ? (
        <p className="text-xs text-muted-foreground">
          Public URL: /blog/article/?slug={previewSlug}
        </p>
      ) : null}

      </>
      )}

      <Button type="submit" size="lg" className="w-full rounded-full" disabled={saving || anyUploading}>
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving…
          </>
        ) : anyUploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Waiting for file uploads…
          </>
        ) : (
          <>
            <PlusCircle className="mr-2 h-4 w-4" />
            {form.id ? "Update article" : form.status === "draft" ? "Save draft" : "Publish article"}
          </>
        )}
      </Button>
      {anyUploading ? (
        <p className="text-center text-xs text-muted-foreground">
          Stop or wait for the file currently uploading. Other upload areas stay available.
        </p>
      ) : null}
    </form>
  );
}

function InsertRow({ onInsert }: { onInsert: (type: BlogSection["type"]) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative py-1">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-dashed border-primary/40 bg-background px-2 py-0.5 text-[10px] font-medium text-primary"
        >
          + Insert into page
        </button>
        <div className="h-px flex-1 bg-border" />
      </div>
      {open ? (
        <div className="mt-2 flex flex-wrap justify-center gap-1.5 pb-2">
          {blogBlockOptions.map((opt) => (
            <button
              key={opt.type}
              type="button"
              className="rounded-full border border-border bg-card px-2 py-1 text-[10px] text-muted-foreground hover:text-foreground"
              onClick={() => {
                onInsert(opt.type);
                setOpen(false);
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function BlockEditor({
  block,
  index,
  total,
  onChange,
  onMove,
  onRemove,
  onUpload,
  onBusyChange,
}: {
  block: BlogSection;
  index: number;
  total: number;
  onChange: (patch: Partial<BlogSection>) => void;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
  onUpload: UploadFn;
  onBusyChange?: (busy: boolean) => void;
}) {
  const type = block.type || "section";
  const label = blogBlockOptions.find((o) => o.type === type)?.label || "Section";

  return (
    <div className="rounded-xl border border-border/80 bg-background p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {index + 1}. {label}
        </p>
        <div className="flex items-center gap-1">
          <Button type="button" size="icon" variant="ghost" className="h-7 w-7" disabled={index === 0} onClick={() => onMove(-1)}>
            <ArrowUp className="h-3.5 w-3.5" />
          </Button>
          <Button type="button" size="icon" variant="ghost" className="h-7 w-7" disabled={index === total - 1} onClick={() => onMove(1)}>
            <ArrowDown className="h-3.5 w-3.5" />
          </Button>
          <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-red-600" onClick={onRemove}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {type !== "paragraphs" && type !== "quote" ? (
        <Input
          className="mb-2"
          value={block.heading || ""}
          onChange={(e) => onChange({ heading: e.target.value })}
          placeholder="Block heading (used in table of contents)"
        />
      ) : null}

      {type === "heading" ? (
        <Select
          value={String(block.level || 2)}
          onValueChange={(v) => onChange({ level: Number(v) as 2 | 3 })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">Heading 2</SelectItem>
            <SelectItem value="3">Heading 3</SelectItem>
          </SelectContent>
        </Select>
      ) : null}

      {["section", "paragraphs", "list", "callout"].includes(type) ? (
        <Textarea
          className="mb-2"
          rows={type === "list" ? 4 : 5}
          value={
            type === "list"
              ? (block.bullets || []).join("\n")
              : type === "callout"
                ? block.callout || ""
                : (block.paragraphs || []).join("\n\n")
          }
          onChange={(e) => {
            if (type === "list") onChange({ bullets: e.target.value.split("\n") });
            else if (type === "callout") onChange({ callout: e.target.value });
            else onChange({ paragraphs: e.target.value.split(/\n{2,}/) });
          }}
          placeholder={
            type === "list"
              ? "One item per line"
              : type === "callout"
                ? "Tip, warning, or important note"
                : "Paragraphs. Separate with a blank line. Attach a link as [Scopus](https://www.scopus.com) or paste a full URL."
          }
        />
      ) : null}

      {type === "list" ? (
        <label className="mt-1 inline-flex items-center gap-2 text-xs text-muted-foreground">
          <input
            type="checkbox"
            checked={Boolean(block.ordered)}
            onChange={(e) => onChange({ ordered: e.target.checked })}
          />
          Numbered list
        </label>
      ) : null}

      {type === "image" ? (
        <div className="space-y-2">
          <FilePicker
            label="Upload image"
            accept="image/*"
            icon={ImagePlus}
            kind="image"
            preview="image"
            currentUrl={block.imageUrl}
            onUpload={onUpload}
            onBusyChange={onBusyChange}
            onComplete={(url, file) =>
              onChange({ imageUrl: url, imageAlt: block.imageAlt || file.name })
            }
            onClear={() => onChange({ imageUrl: "", imageAlt: "" })}
          />
          <Input
            value={block.imageAlt || ""}
            onChange={(e) => onChange({ imageAlt: e.target.value })}
            placeholder="Alt text / caption"
          />
        </div>
      ) : null}

      {type === "video" ? (
        <div className="space-y-2">
          <FilePicker
            label="Upload video"
            accept="video/*"
            icon={Video}
            kind="video"
            preview="video"
            currentUrl={block.videoUrl}
            onUpload={onUpload}
            onBusyChange={onBusyChange}
            onComplete={(url) => onChange({ videoUrl: url })}
            onClear={() => onChange({ videoUrl: "" })}
          />
        </div>
      ) : null}

      {type === "youtube" ? (
        <Input
          value={block.youtubeUrl || ""}
          onChange={(e) => onChange({ youtubeUrl: e.target.value })}
          placeholder="https://www.youtube.com/watch?v=..."
        />
      ) : null}

      {type === "code" ? (
        <div className="space-y-2">
          <Input
            value={block.language || "text"}
            onChange={(e) => onChange({ language: e.target.value })}
            placeholder="Language, e.g. python, r, sql"
          />
          <Textarea
            rows={8}
            value={block.code || ""}
            onChange={(e) => onChange({ code: e.target.value })}
            className="font-mono text-xs"
          />
        </div>
      ) : null}

      {type === "table" ? (
        <div className="space-y-2">
          <Input
            value={(block.tableHeaders || []).join(" | ")}
            onChange={(e) =>
              onChange({
                tableHeaders: e.target.value.split("|").map((s) => s.trim()),
              })
            }
            placeholder="Headers separated by |"
          />
          <Textarea
            rows={5}
            value={(block.tableRows || []).map((r) => r.join(" | ")).join("\n")}
            onChange={(e) =>
              onChange({
                tableRows: e.target.value
                  .split("\n")
                  .map((line) => line.split("|").map((s) => s.trim())),
              })
            }
            placeholder="One row per line, cells separated by |"
          />
        </div>
      ) : null}

      {type === "quote" ? (
        <div className="space-y-2">
          <Textarea
            rows={3}
            value={block.quote || ""}
            onChange={(e) => onChange({ quote: e.target.value })}
            placeholder="Quote"
          />
          <Input
            value={block.cite || ""}
            onChange={(e) => onChange({ cite: e.target.value })}
            placeholder="Citation / source"
          />
        </div>
      ) : null}

      {type === "download" ? (
        <div className="space-y-2">
          <Input
            value={block.download?.title || ""}
            onChange={(e) =>
              onChange({ download: { ...(block.download || { url: "" }), title: e.target.value } })
            }
            placeholder="File title"
          />
          <FilePicker
            label="Upload file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.csv,.txt,application/pdf"
            icon={FileUp}
            kind="document"
            currentName={block.download?.fileLabel || block.download?.title}
            currentUrl={block.download?.url}
            onUpload={onUpload}
            onBusyChange={onBusyChange}
            onComplete={(url, file) => {
              const ext = (file.name.split(".").pop() || "file").toUpperCase();
              onChange({
                download: {
                  title: block.download?.title || file.name,
                  description: block.download?.description || "",
                  url,
                  fileLabel: file.name,
                  fileType: ext,
                },
              });
            }}
            onClear={() =>
              onChange({
                download: {
                  title: block.download?.title || "",
                  description: block.download?.description || "",
                  url: "",
                  fileLabel: "",
                  fileType: "",
                },
              })
            }
          />
        </div>
      ) : null}

      {type === "faq" ? (
        <div className="space-y-3">
          {(block.faqs || []).map((item, i) => (
            <div key={`${block.id}-faq-${i}`} className="space-y-1.5 rounded-lg border p-2">
              <Input
                value={item.question}
                onChange={(e) => {
                  const faqs = [...(block.faqs || [])];
                  faqs[i] = { ...faqs[i], question: e.target.value };
                  onChange({ faqs });
                }}
                placeholder="Question"
              />
              <Textarea
                rows={3}
                value={item.answer}
                onChange={(e) => {
                  const faqs = [...(block.faqs || [])];
                  faqs[i] = { ...faqs[i], answer: e.target.value };
                  onChange({ faqs });
                }}
                placeholder="Answer"
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => onChange({ faqs: [...(block.faqs || []), { question: "", answer: "" }] })}
          >
            Add question
          </Button>
        </div>
      ) : null}

      {type === "links" ? (
        <div className="space-y-3">
          <p className="text-[11px] text-muted-foreground">
            Attach website, paper, tool, or internal page links. Use a full URL such as https://...
          </p>
          {(block.links || []).map((item, i) => (
            <div key={`${block.id}-link-${i}`} className="space-y-1.5 rounded-lg border p-2">
              <Input
                value={item.title}
                onChange={(e) => {
                  const links = [...(block.links || [])];
                  links[i] = { ...links[i], title: e.target.value };
                  onChange({ links });
                }}
                placeholder="Link title, e.g. Scopus journal search"
              />
              <Input
                value={item.url}
                onChange={(e) => {
                  const links = [...(block.links || [])];
                  links[i] = { ...links[i], url: e.target.value };
                  onChange({ links });
                }}
                placeholder="https://www.scopus.com or /contact"
              />
              <Input
                value={item.description || ""}
                onChange={(e) => {
                  const links = [...(block.links || [])];
                  links[i] = { ...links[i], description: e.target.value };
                  onChange({ links });
                }}
                placeholder="Optional note"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-red-600"
                onClick={() =>
                  onChange({ links: (block.links || []).filter((_, idx) => idx !== i) })
                }
              >
                Remove link
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() =>
              onChange({
                links: [...(block.links || []), { title: "", url: "", description: "" }],
              })
            }
          >
            Add link
          </Button>
        </div>
      ) : null}
    </div>
  );
}
