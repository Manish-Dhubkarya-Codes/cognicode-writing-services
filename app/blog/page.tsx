import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogListing } from "@/components/blog/blog-listing";
import { blogPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Research Blog | Guides, Tutorials, Templates | CogniCode EduTech",
  description:
    "Structured CogniCode research articles: how-to guides, tutorials, listicles, comparisons, video lessons, and downloadable templates for thesis, literature review, data analysis, and publishing.",
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
    title: "Research Blog | CogniCode EduTech",
    description:
      "Guides, tutorials, listicles, comparisons, video lessons, and downloadable templates for scholars.",
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
