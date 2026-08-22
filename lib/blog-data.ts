export type BlogCategorySlug =
  | "thesis-writing"
  | "literature-review"
  | "data-analysis"
  | "academic-publishing"
  | "research-integrity"
  | "ai-ml"
  | "scholar-success";

export type BlogCategory = {
  name: string;
  slug: BlogCategorySlug;
  description: string;
  serviceHref: string;
  serviceLabel: string;
};

export type BlogAuthor = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export type BlogPostTypeSlug =
  | "article"
  | "tutorial"
  | "how-to"
  | "listicle"
  | "news"
  | "comparison"
  | "video"
  | "resource"
  | "faq"
  | "case-study";

export type BlogBlockType =
  | "section"
  | "heading"
  | "paragraphs"
  | "list"
  | "callout"
  | "image"
  | "video"
  | "youtube"
  | "code"
  | "table"
  | "quote"
  | "download"
  | "faq"
  | "links";

export type BlogSection = {
  id: string;
  type?: BlogBlockType;
  heading?: string;
  level?: 2 | 3;
  paragraphs?: string[];
  bullets?: string[];
  ordered?: boolean;
  callout?: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  youtubeUrl?: string;
  code?: string;
  language?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
  quote?: string;
  cite?: string;
  download?: {
    title: string;
    description?: string;
    url: string;
    fileLabel?: string;
    fileType?: string;
  };
  faqs?: { question: string; answer: string }[];
  links?: {
    title: string;
    url: string;
    description?: string;
  }[];
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  metaDescription: string;
  category: BlogCategorySlug;
  postType?: BlogPostTypeSlug;
  tags?: string[];
  difficulty?: "beginner" | "intermediate" | "advanced" | "";
  author: BlogAuthor;
  date: string;
  dateISO: string;
  updatedISO?: string;
  readTime: string;
  featured?: boolean;
  imageGradient: string;
  imageLabel: string;
  keywords: string[];
  keyTakeaways: string[];
  attachments?: {
    title: string;
    description?: string;
    url: string;
    fileLabel?: string;
    fileType?: string;
  }[];
  sections: BlogSection[];
  resource?: {
    title: string;
    description: string;
    fileLabel: string;
    url?: string;
    fileType?: string;
  };
  serviceCta: {
    title: string;
    description: string;
    href: string;
    buttonLabel: string;
  };
};

export type FreeResource = {
  id: string;
  title: string;
  description: string;
  type: "PDF" | "Excel" | "Checklist";
  category: BlogCategorySlug;
  href: string;
};

export const blogCategories: BlogCategory[] = [
  {
    name: "Thesis Writing",
    slug: "thesis-writing",
    description:
      "Step-by-step chapter guidance, structure frameworks, and practical fixes for common thesis pitfalls.",
    serviceHref: "/services/phd-thesis-writing",
    serviceLabel: "Thesis Writing Support",
  },
  {
    name: "Literature Review",
    slug: "literature-review",
    description:
      "Search strategies, critical analysis, research gap identification, and methodology design.",
    serviceHref: "/services/literature-review",
    serviceLabel: "Literature Review Service",
  },
  {
    name: "Data Analysis",
    slug: "data-analysis",
    description:
      "SPSS, R, and Python workflows with clear interpretation for thesis and journal results.",
    serviceHref: "/services/statistical-analysis-data-analytics",
    serviceLabel: "Data Analysis Support",
  },
  {
    name: "Academic Publishing",
    slug: "academic-publishing",
    description:
      "Journal selection, conference papers, peer review responses, and indexing guidance.",
    serviceHref: "/services/publishing",
    serviceLabel: "Publishing Support",
  },
  {
    name: "Research Integrity",
    slug: "research-integrity",
    description:
      "Plagiarism ethics, citation styles, originality assurance, and responsible research practice.",
    serviceHref: "/services/plagiarism-removal",
    serviceLabel: "Originality & Plagiarism Support",
  },
  {
    name: "AI/ML",
    slug: "ai-ml",
    description:
      "Practical AI and machine learning methods for modern academic research workflows.",
    serviceHref: "/services/ai-ml",
    serviceLabel: "AI/ML Research Support",
  },
  {
    name: "Scholar Success",
    slug: "scholar-success",
    description:
      "Motivation, time management, viva preparation, funding, and post-PhD career clarity.",
    serviceHref: "/contact",
    serviceLabel: "Talk to a Research Mentor",
  },
];

/** Public blog posts come from the admin API only. */
export const blogPosts: BlogPost[] = [];

export const freeResources: FreeResource[] = [
  {
    id: "r1",
    title: "Literature Review Matrix Template",
    description: "Compare studies by aim, method, findings, limitations, and gap signals.",
    type: "Excel",
    category: "literature-review",
    href: "/contact",
  },
  {
    id: "r2",
    title: "Thesis Outline Template",
    description: "Chapter-by-chapter outline with purpose prompts for doctoral theses.",
    type: "PDF",
    category: "thesis-writing",
    href: "/contact",
  },
  {
    id: "r3",
    title: "Data Analysis Checklist",
    description: "Assumptions, reporting elements, and interpretation checks for results chapters.",
    type: "Checklist",
    category: "data-analysis",
    href: "/contact",
  },
  {
    id: "r4",
    title: "Journal Selection Scorecard",
    description: "Weighted criteria to shortlist journals and avoid low-quality venues.",
    type: "PDF",
    category: "academic-publishing",
    href: "/contact",
  },
  {
    id: "r5",
    title: "Peer Review Response Letter Template",
    description: "Professional structure for responding to reviewer comments.",
    type: "PDF",
    category: "academic-publishing",
    href: "/contact",
  },
  {
    id: "r6",
    title: "Weekly PhD Planning Template",
    description: "Deep-work planner for full-time professionals pursuing a part-time PhD.",
    type: "Checklist",
    category: "scholar-success",
    href: "/contact",
  },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return blogCategories.find((c) => c.slug === slug);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0];
}

export function getPostsByCategory(slug: BlogCategorySlug | "all"): BlogPost[] {
  if (slug === "all") return blogPosts;
  return blogPosts.filter((p) => p.category === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const sameCategory = blogPosts.filter(
    (p) => p.category === post.category && p.slug !== post.slug
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
  const others = blogPosts.filter(
    (p) => p.slug !== post.slug && !sameCategory.some((s) => s.slug === p.slug)
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getCategoryName(slug: BlogCategorySlug): string {
  return getCategoryBySlug(slug)?.name ?? slug;
}

export function searchPosts(query: string): BlogPost[] {
  const q = query.trim().toLowerCase();
  if (!q) return blogPosts;
  return blogPosts.filter((post) => {
    const haystack = [
      post.title,
      post.excerpt,
      post.metaDescription,
      getCategoryName(post.category),
      post.author.name,
      ...post.keywords,
      ...post.keyTakeaways,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
