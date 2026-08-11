import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogListing } from "@/components/blog/blog-listing";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog & Company Feed | CogniCode EduTech",
  description:
    "Scroll CogniCode research insights in a social-style feed - thesis writing, literature reviews, data analysis, publishing, AI/ML tips, free templates, and company updates from Instagram, Facebook, LinkedIn and YouTube.",
  keywords: [
    "PhD thesis writing guide",
    "literature review",
    "SPSS for thesis",
    "academic publishing",
    "research integrity",
    "CogniCode blog",
    "CogniCode Instagram",
  ],
  openGraph: {
    title: "Blog & Company Feed | CogniCode EduTech",
    description:
      "Social-style academic guides and free research templates for scholars worldwide.",
    type: "website",
    url: "https://cognicodeedutech.com/blog",
  },
  alternates: {
    canonical: "https://cognicodeedutech.com/blog",
  },
};

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "CogniCode EduTech Blog",
    description:
      "Research writing guides, company social updates, and scholar success resources from CogniCode EduTech.",
    url: "https://cognicodeedutech.com/blog",
    publisher: {
      "@type": "Organization",
      name: "CogniCode EduTech",
      url: "https://cognicodeedutech.com",
      sameAs: [
        "https://www.instagram.com/cognicodethesiswriting",
        "https://www.facebook.com/CogniCode",
        "https://www.linkedin.com/company/cognicodindia/",
        "https://www.youtube.com/@CogniCodeEduTech",
      ],
    },
    blogPost: blogPosts.slice(0, 12).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.dateISO,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
      url: `https://cognicodeedutech.com/blog/${post.slug}/`,
    })),
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BlogListing />
      </main>
      <Footer />
    </div>
  );
}
