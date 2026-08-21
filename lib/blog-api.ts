import {
  BlogCategorySlug,
  BlogPost,
  BlogPostTypeSlug,
  BlogSection,
  blogPosts as staticPosts,
  getCategoryName,
  getPostBySlug as getStaticPost,
} from "@/lib/blog-data";
import { inferPostType } from "@/lib/blog-content";
import { getData, mediaUrl } from "@/app/server/fetch-beckend-services";

async function publicGet(path: string) {
  return getData(path);
}

export type FeedPost = BlogPost & {
  source: "api" | "static";
  coverImage?: string;
  coverVideo?: string;
  youtubeUrl?: string;
  mediaGallery?: string[];
  likes?: number;
  commentsCount?: number;
  sharesCount?: number;
  likedByMe?: boolean;
  href: string;
};

const GRADIENTS = [
  "from-violet-900 via-purple-800 to-fuchsia-700",
  "from-slate-900 via-indigo-900 to-blue-800",
  "from-rose-900 via-red-800 to-orange-700",
  "from-cyan-900 via-teal-800 to-emerald-700",
  "from-amber-900 via-yellow-800 to-lime-700",
  "from-blue-950 via-indigo-900 to-violet-800",
  "from-emerald-950 via-green-900 to-teal-800",
];

function hashGradient(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h + seed.charCodeAt(i) * 17) % GRADIENTS.length;
  return GRADIENTS[h];
}

function parseSections(content: unknown, excerpt?: string): BlogSection[] {
  if (Array.isArray(content) && content.length > 0) {
    return content.map((section: any, index: number) => {
      const download = section.download
        ? {
            title: section.download.title || "Download",
            description: section.download.description || "",
            url: mediaUrl(section.download.url),
            fileLabel: section.download.fileLabel || "Download file",
            fileType: section.download.fileType || "file",
          }
        : undefined;

      return {
        id: section.id || `section-${index + 1}`,
        type: section.type || (section.heading ? "section" : "paragraphs"),
        heading: section.heading || "",
        level: (section.level === 3 ? 3 : 2) as 2 | 3,
        paragraphs: Array.isArray(section.paragraphs)
          ? section.paragraphs
          : section.body
            ? [String(section.body)]
            : [],
        bullets: Array.isArray(section.bullets) ? section.bullets : undefined,
        ordered: Boolean(section.ordered),
        callout: section.callout,
        imageUrl: mediaUrl(section.imageUrl || section.image_url),
        imageAlt: section.imageAlt || section.image_alt || "",
        videoUrl: mediaUrl(section.videoUrl || section.video_url),
        youtubeUrl: section.youtubeUrl || section.youtube_url || "",
        code: section.code || "",
        language: section.language || "text",
        tableHeaders: Array.isArray(section.tableHeaders) ? section.tableHeaders : undefined,
        tableRows: Array.isArray(section.tableRows) ? section.tableRows : undefined,
        quote: section.quote || "",
        cite: section.cite || "",
        download,
        faqs: Array.isArray(section.faqs)
          ? section.faqs.map((f: any) => ({
              question: String(f.question || f.q || ""),
              answer: String(f.answer || f.a || ""),
            }))
          : undefined,
        links: Array.isArray(section.links)
          ? section.links
              .map((item: any) => ({
                title: String(item.title || item.label || item.url || "Link"),
                url: String(item.url || ""),
                description: String(item.description || item.note || ""),
              }))
              .filter((item: { url: string }) => item.url)
          : undefined,
      } as BlogSection;
    });
  }

  if (typeof content === "string" && content.trim()) {
    const blocks = content
      .split(/\n{2,}/)
      .map((b) => b.trim())
      .filter(Boolean);
    return blocks.map((block, index) => ({
      id: `section-${index + 1}`,
      type: "section" as const,
      heading: index === 0 ? "Overview" : `Insight ${index}`,
      level: 2 as const,
      paragraphs: [block],
    }));
  }

  return [
    {
      id: "overview",
      type: "section",
      heading: "Overview",
      level: 2,
      paragraphs: [excerpt || "Read this CogniCode insight for practical academic guidance."],
    },
  ];
}

function initialsFromName(name?: string) {
  if (!name) return "CC";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() || "")
    .join("");
}

/** Map backend post payload → UI FeedPost */
export function mapApiPostToFeed(api: any): FeedPost {
  const slug = api.slug || String(api.id);
  const category = (api.categorySlug || api.category_slug || "scholar-success") as BlogCategorySlug;
  const dateISO = api.publishedAt || api.published_at || api.createdAt || api.created_at || new Date().toISOString();
  const date = new Date(dateISO).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const authorName = api.author?.name || api.authorName || api.author_name || "CogniCode Team";
  const coverImage = mediaUrl(api.coverImage || api.cover_image);
  const coverVideo = mediaUrl(api.coverVideo || api.cover_video);
  const gallery = Array.isArray(api.mediaGallery || api.media_gallery)
    ? (api.mediaGallery || api.media_gallery).map((u: string) => mediaUrl(u))
    : coverImage
      ? [coverImage]
      : [];

  const tags = Array.isArray(api.tags)
    ? api.tags.map((t: string) => String(t).trim()).filter(Boolean)
    : Array.isArray(api.keywords)
      ? api.keywords.slice(0, 6)
      : [];

  const attachments = Array.isArray(api.attachments)
    ? api.attachments.map((item: any) => ({
        title: item.title || "Download",
        description: item.description || "",
        url: mediaUrl(item.url),
        fileLabel: item.fileLabel || "Download",
        fileType: item.fileType || "file",
      }))
    : [];

  const post: FeedPost = {
    id: String(api.id || slug),
    slug,
    title: api.title,
    subtitle: api.subtitle || "",
    excerpt: api.excerpt || api.metaDescription || api.meta_description || "",
    metaDescription: api.metaDescription || api.meta_description || api.excerpt || "",
    category,
    postType: (api.postType || api.post_type || inferPostType(api.title || "", category)) as BlogPostTypeSlug,
    tags,
    difficulty: api.difficulty || "",
    attachments,
    author: {
      name: authorName,
      role: api.author?.role || api.authorRole || api.author_role || "CogniCode EduTech",
      bio:
        api.author?.bio ||
        api.authorBio ||
        api.author_bio ||
        "Insights from the CogniCode academic research team.",
      initials: api.author?.initials || api.authorInitials || initialsFromName(authorName),
    },
    date,
    dateISO: String(dateISO).slice(0, 10),
    updatedISO: String(api.updatedAt || api.updated_at || dateISO).slice(0, 10),
    readTime: api.readTime || api.read_time || "5 min read",
    featured: Boolean(api.featured),
    imageGradient: api.imageGradient || api.image_gradient || hashGradient(slug),
    imageLabel: api.imageLabel || api.image_label || getCategoryName(category),
    keywords: Array.isArray(api.keywords) ? api.keywords : [],
    keyTakeaways: Array.isArray(api.keyTakeaways || api.key_takeaways)
      ? api.keyTakeaways || api.key_takeaways
      : [
          "Practical guidance from CogniCode PhD mentors",
          "Designed for real thesis and publication workflows",
          "Soft next steps if you need expert support",
        ],
    sections: parseSections(api.content, api.excerpt),
    resource: api.resource || undefined,
    serviceCta: api.serviceCta || api.service_cta || {
      title: "Need expert help with this topic?",
      description:
        "Talk to CogniCode mentors for thesis, literature review, data analysis, or publishing support.",
      href: "/contact",
      buttonLabel: "Free consultation",
    },
    source: "api",
    coverImage,
    coverVideo,
    youtubeUrl: api.youtubeUrl || api.youtube_url || undefined,
    mediaGallery: gallery,
    likes: typeof api.likes === "number" ? api.likes : 0,
    href: `/blog/article/?slug=${encodeURIComponent(slug)}`,
  };

  return post;
}

export function mapStaticPostToFeed(post: BlogPost): FeedPost {
  return {
    ...post,
    postType: post.postType || inferPostType(post.title, post.category),
    tags: post.tags?.length
      ? post.tags
      : [getCategoryName(post.category), ...post.keywords].slice(0, 6),
    difficulty: post.difficulty || "intermediate",
    updatedISO: post.updatedISO || post.dateISO,
    source: "static",
    likes: 0,
    href: `/blog/${post.slug}/`,
  };
}

/** Load published posts: API first, merge with static seeds */
export async function fetchFeedPosts(options?: {
  category?: string;
  search?: string;
  type?: string;
  tag?: string;
  limit?: number;
}): Promise<FeedPost[]> {
  const params = new URLSearchParams();
  params.set("limit", String(options?.limit || 40));
  if (options?.category && options.category !== "all") {
    params.set("category", options.category);
  }
  if (options?.type && options.type !== "all") {
    params.set("type", options.type);
  }
  if (options?.tag && options.tag !== "all") {
    params.set("tag", options.tag);
  }
  if (options?.search) params.set("search", options.search);

  let apiPosts: FeedPost[] = [];
  try {
    const res = await publicGet(`blog/posts?${params.toString()}`);
    if (res?.success && Array.isArray(res.data)) {
      apiPosts = res.data.map(mapApiPostToFeed);
    }
  } catch {
    apiPosts = [];
  }

  const staticFeed = staticPosts.map(mapStaticPostToFeed);
  const apiSlugs = new Set(apiPosts.map((p) => p.slug));

  // Prefer API posts; keep static seeds that are not overridden
  const merged = [
    ...apiPosts,
    ...staticFeed.filter((p) => !apiSlugs.has(p.slug)),
  ];

  let list = merged;
  if (options?.category && options.category !== "all") {
    list = list.filter((p) => p.category === options.category);
  }
  if (options?.type && options.type !== "all") {
    list = list.filter((p) => (p.postType || "article") === options.type);
  }
  if (options?.tag && options.tag !== "all") {
    const tag = options.tag.toLowerCase();
    list = list.filter((p) =>
      (p.tags || p.keywords || []).some((t) => String(t).toLowerCase() === tag)
    );
  }
  if (options?.search?.trim()) {
    const q = options.search.trim().toLowerCase();
    list = list.filter((p) =>
      [
        p.title,
        p.subtitle,
        p.excerpt,
        p.author.name,
        getCategoryName(p.category),
        p.postType,
        ...(p.tags || []),
        ...p.keywords,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }

  return list.sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );
}

export async function fetchPostBySlug(slug: string): Promise<FeedPost | null> {
  try {
    const res = await publicGet(`blog/posts/${encodeURIComponent(slug)}`);
    if (res?.success && res.data) return mapApiPostToFeed(res.data);
  } catch {
    // fall through
  }

  const staticPost = getStaticPost(slug);
  return staticPost ? mapStaticPostToFeed(staticPost) : null;
}

export function getRelatedFeedPosts(post: FeedPost, all: FeedPost[], limit = 3) {
  const sameType = all.filter(
    (p) => p.postType === post.postType && p.slug !== post.slug
  );
  const same = all.filter((p) => p.category === post.category && p.slug !== post.slug);
  const merged = [
    ...sameType,
    ...same.filter((p) => !sameType.some((s) => s.slug === p.slug)),
  ];
  if (merged.length >= limit) return merged.slice(0, limit);
  const others = all.filter(
    (p) => p.slug !== post.slug && !merged.some((s) => s.slug === p.slug)
  );
  return [...merged, ...others].slice(0, limit);
}

export async function fetchBlogTaxonomy() {
  const empty = { types: [] as { slug: string; post_count: number }[], tags: [] as { slug: string; post_count: number }[] };
  try {
    const [types, tags] = await Promise.all([
      publicGet("blog/types"),
      publicGet("blog/tags"),
    ]);
    return {
      types: types?.success && Array.isArray(types.data) ? types.data : empty.types,
      tags: tags?.success && Array.isArray(tags.data) ? tags.data : empty.tags,
    };
  } catch {
    return empty;
  }
}
