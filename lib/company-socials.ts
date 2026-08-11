export type CompanySocial = {
  id: string;
  name: string;
  href: string;
  handle: string;
  description: string;
  color: string;
};

/** Official CogniCode company social channels for blog + share surfaces */
export const companySocials: CompanySocial[] = [
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/cognicodethesiswriting",
    handle: "@cognicodethesiswriting",
    description: "Tips, reels & scholar wins",
    color: "from-fuchsia-500 via-rose-500 to-orange-400",
  },
  {
    id: "facebook",
    name: "Facebook",
    href: "https://www.facebook.com/CogniCode",
    handle: "CogniCode",
    description: "Company updates & community",
    color: "from-blue-600 to-blue-500",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/cognicodindia/",
    handle: "CogniCode India",
    description: "Professional research insights",
    color: "from-sky-700 to-sky-500",
  },
  {
    id: "youtube",
    name: "YouTube",
    href: "https://www.youtube.com/@CogniCodeEduTech",
    handle: "@CogniCodeEduTech",
    description: "Walkthroughs & thesis tips",
    color: "from-red-600 to-red-500",
  },
];

export const companyProfile = {
  name: "CogniCode EduTech",
  tagline: "Academic research writing · AI/ML · Scholar success",
  bio: "Helping 8,000+ scholars with thesis writing, literature reviews, data analysis, publishing, and integrity-first research support since 2009.",
  website: "https://cognicodeedutech.com",
  location: "Gwalior · Global remote support",
  followersLabel: "8K+ scholars",
  ratingLabel: "4.9 Google rating",
};

export function getYoutubeEmbedUrl(url?: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      const parts = u.pathname.split("/");
      const embedIdx = parts.indexOf("embed");
      if (embedIdx >= 0 && parts[embedIdx + 1]) {
        return `https://www.youtube.com/embed/${parts[embedIdx + 1]}`;
      }
      const shortsIdx = parts.indexOf("shorts");
      if (shortsIdx >= 0 && parts[shortsIdx + 1]) {
        return `https://www.youtube.com/embed/${parts[shortsIdx + 1]}`;
      }
    }
  } catch {
    return null;
  }
  return null;
}
