import {
  BlogBlockType,
  BlogCategorySlug,
  BlogPostTypeSlug,
  BlogSection,
} from "@/lib/blog-data";

export type BlogPostType = {
  slug: BlogPostTypeSlug;
  name: string;
  shortLabel: string;
  description: string;
  defaultHeading: string;
};

export const blogPostTypes: BlogPostType[] = [
  {
    slug: "article",
    name: "Guide / Article",
    shortLabel: "Article",
    description: "Long-form research guide with headings, takeaways, and structured sections.",
    defaultHeading: "Introduction",
  },
  {
    slug: "tutorial",
    name: "Tutorial",
    shortLabel: "Tutorial",
    description: "Step-by-step walkthrough with screenshots, files, and worked examples.",
    defaultHeading: "What you will learn",
  },
  {
    slug: "how-to",
    name: "How-To",
    shortLabel: "How-To",
    description: "Task-focused article that answers a specific scholar problem.",
    defaultHeading: "How to get started",
  },
  {
    slug: "listicle",
    name: "List / Roundup",
    shortLabel: "List",
    description: "Numbered roundup such as best tools, common mistakes, or checklists.",
    defaultHeading: "The list",
  },
  {
    slug: "news",
    name: "News / Update",
    shortLabel: "News",
    description: "Company or field update with a short recap and source links.",
    defaultHeading: "What changed",
  },
  {
    slug: "comparison",
    name: "Comparison",
    shortLabel: "Compare",
    description: "Side-by-side comparison with tables, pros/cons, and a recommendation.",
    defaultHeading: "Quick comparison",
  },
  {
    slug: "video",
    name: "Video Lesson",
    shortLabel: "Video",
    description: "YouTube or uploaded video with supporting notes and resources.",
    defaultHeading: "Watch the lesson",
  },
  {
    slug: "resource",
    name: "Resource / Template",
    shortLabel: "Resource",
    description: "Downloadable PDF, Excel, checklist, or slide deck with usage notes.",
    defaultHeading: "How to use this resource",
  },
  {
    slug: "faq",
    name: "FAQ / Explainer",
    shortLabel: "FAQ",
    description: "Question-and-answer explainer for viva, methods, or publishing doubts.",
    defaultHeading: "Common questions",
  },
  {
    slug: "case-study",
    name: "Case Study / Gallery",
    shortLabel: "Case Study",
    description: "Illustrated walkthrough with images, captions, and outcomes.",
    defaultHeading: "The brief",
  },
];

export type BlockOption = {
  type: BlogBlockType;
  label: string;
  hint: string;
};

export const blogBlockOptions: BlockOption[] = [
  { type: "heading", label: "Heading", hint: "H2 or H3 section title" },
  { type: "paragraphs", label: "Text", hint: "One or more paragraphs" },
  { type: "list", label: "List", hint: "Bullets or numbered steps" },
  { type: "callout", label: "Callout", hint: "Note, tip, or warning box" },
  { type: "image", label: "Image", hint: "Upload a figure or screenshot" },
  { type: "video", label: "Video file", hint: "Upload MP4 / WebM" },
  { type: "youtube", label: "YouTube", hint: "Embed a YouTube URL" },
  { type: "code", label: "Code", hint: "Syntax-ready snippet" },
  { type: "table", label: "Table", hint: "Comparison or data table" },
  { type: "quote", label: "Quote", hint: "Pull quote with citation" },
  { type: "download", label: "File download", hint: "PDF, Excel, PPT, ZIP" },
  { type: "links", label: "Links", hint: "Attach webpage URLs" },
  { type: "faq", label: "Q&A", hint: "FAQ pair" },
];

export const suggestedBlogTags = [
  "Thesis Writing",
  "Literature Review",
  "Research Gap",
  "Methodology",
  "SPSS",
  "Data Analysis",
  "Academic Publishing",
  "Journal Selection",
  "Plagiarism",
  "AI Tools",
  "ChatGPT",
  "Viva",
  "Time Management",
  "How-To",
  "Templates",
  "Best Practices",
  "News",
  "Picked",
];

export function getPostType(slug?: string | null): BlogPostType {
  return (
    blogPostTypes.find((t) => t.slug === slug) ||
    blogPostTypes[0]
  );
}

export function inferPostType(title: string, category?: BlogCategorySlug): BlogPostTypeSlug {
  const t = title.toLowerCase();
  if (/\bvs\.?\b|versus|compared/.test(t)) return "comparison";
  if (/^\d+\s|best |common mistakes|checklist|roundup/.test(t)) return "listicle";
  if (/^how to\b/.test(t)) return "how-to";
  if (/tutorial|beginner-to-advanced|walkthrough/.test(t)) return "tutorial";
  if (/faq|questions and how to answer|common questions/.test(t)) return "faq";
  if (/news|update 20\d{2}|in 20\d{2}/.test(t) && /news/.test(t)) return "news";
  if (category === "ai-ml" && /machine learning|spss/.test(t)) return "tutorial";
  return "article";
}

export function slugifyBlog(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
}

function blockId() {
  return `block-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function createEmptyBlock(type: BlogBlockType, heading = ""): BlogSection {
  const id = blockId();
  switch (type) {
    case "heading":
      return { id, type, heading: heading || "New heading", level: 2, paragraphs: [] };
    case "paragraphs":
      return { id, type, heading: "", level: 2, paragraphs: [""] };
    case "list":
      return { id, type, heading: heading || "Key points", level: 2, paragraphs: [], bullets: [""], ordered: false };
    case "callout":
      return { id, type, heading: "Note", level: 2, paragraphs: [], callout: "" };
    case "image":
      return { id, type, heading: heading || "Figure", level: 2, paragraphs: [], imageUrl: "", imageAlt: "" };
    case "video":
      return { id, type, heading: heading || "Video", level: 2, paragraphs: [], videoUrl: "" };
    case "youtube":
      return { id, type, heading: heading || "Watch", level: 2, paragraphs: [], youtubeUrl: "" };
    case "code":
      return { id, type, heading: heading || "Code", level: 2, paragraphs: [], code: "", language: "text" };
    case "table":
      return {
        id,
        type,
        heading: heading || "Comparison",
        level: 2,
        paragraphs: [],
        tableHeaders: ["Feature", "Option A", "Option B"],
        tableRows: [
          ["", "", ""],
          ["", "", ""],
        ],
      };
    case "quote":
      return { id, type, heading: "", level: 2, paragraphs: [], quote: "", cite: "" };
    case "download":
      return {
        id,
        type,
        heading: heading || "Download",
        level: 2,
        paragraphs: [],
        download: { title: "", description: "", url: "", fileLabel: "Download file", fileType: "PDF" },
      };
    case "faq":
      return {
        id,
        type,
        heading: heading || "Questions",
        level: 2,
        paragraphs: [],
        faqs: [{ question: "", answer: "" }],
      };
    case "links":
      return {
        id,
        type,
        heading: heading || "Useful links",
        level: 2,
        paragraphs: [],
        links: [{ title: "", url: "", description: "" }],
      };
    default:
      return { id, type: "section", heading: heading || "Section", level: 2, paragraphs: [""] };
  }
}

export function seedBlocksForType(type: BlogPostTypeSlug): BlogSection[] {
  const meta = getPostType(type);
  if (type === "video") {
    return [
      createEmptyBlock("youtube", "Watch the lesson"),
      createEmptyBlock("paragraphs"),
      createEmptyBlock("list", "Key takeaways from the video"),
    ];
  }
  if (type === "resource") {
    return [
      createEmptyBlock("paragraphs"),
      createEmptyBlock("download", "Get the template"),
      createEmptyBlock("links", "Related links"),
      createEmptyBlock("list", "How to fill it in"),
    ];
  }
  if (type === "news") {
    return [
      createEmptyBlock("paragraphs"),
      createEmptyBlock("links", "Sources and further reading"),
    ];
  }
  if (type === "faq") {
    return [createEmptyBlock("faq", meta.defaultHeading), createEmptyBlock("callout")];
  }
  if (type === "comparison") {
    return [
      createEmptyBlock("paragraphs"),
      createEmptyBlock("table", "Feature comparison"),
      createEmptyBlock("list", "How to choose"),
    ];
  }
  if (type === "listicle") {
    return [
      createEmptyBlock("paragraphs"),
      createEmptyBlock("heading", "The list"),
      createEmptyBlock("list", "Items"),
    ];
  }
  if (type === "case-study") {
    return [
      createEmptyBlock("paragraphs"),
      createEmptyBlock("image", "Context"),
      createEmptyBlock("list", "What we did"),
    ];
  }
  return [
    { ...createEmptyBlock("heading", meta.defaultHeading), type: "heading" },
    createEmptyBlock("paragraphs"),
  ];
}

export function estimateReadTime(blocks: BlogSection[]) {
  const text = blocks
    .flatMap((b) => [
      b.heading || "",
      ...(b.paragraphs || []),
      ...(b.bullets || []),
      b.callout || "",
      b.quote || "",
      b.code || "",
      ...(b.faqs || []).flatMap((f) => [f.question, f.answer]),
      ...(b.links || []).flatMap((l) => [l.title, l.description || ""]),
    ])
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.round(words / 180) || 3);
  return `${minutes} min read`;
}

export function sectionHeading(block: BlogSection) {
  return (block.heading || "").trim();
}

export function isTocBlock(block: BlogSection) {
  const type = block.type || "section";
  if (["paragraphs", "quote", "code"].includes(type)) return false;
  return Boolean(sectionHeading(block));
}
