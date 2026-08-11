import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLoader } from "@/components/blog/article-loader";
import {
  blogPosts,
  getCategoryName,
  getPostBySlug,
} from "@/lib/blog-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Article Not Found | CogniCode Blog" };
  }

  return {
    title: `${post.title} | CogniCode Blog`,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.dateISO,
      authors: [post.author.name],
      url: `https://cognicodeedutech.com/blog/${post.slug}/`,
      section: getCategoryName(post.category),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
    alternates: {
      canonical: `https://cognicodeedutech.com/blog/${post.slug}/`,
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return <ArticleLoader slug={slug} />;
}
