import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogListing } from "@/components/blog/blog-listing";
import {
  blogCategories,
  getCategoryBySlug,
  BlogCategorySlug,
} from "@/lib/blog-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found | CogniCode Blog" };

  return {
    title: `${category.name} Guides | CogniCode Blog`,
    description: category.description,
    openGraph: {
      title: `${category.name} Guides | CogniCode Blog`,
      description: category.description,
      type: "website",
      url: `https://cognicodeedutech.com/blog/category/${category.slug}/`,
    },
    alternates: {
      canonical: `https://cognicodeedutech.com/blog/category/${category.slug}/`,
    },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        <BlogListing
          initialCategory={category.slug as BlogCategorySlug}
          heading={`${category.name} Archives`}
          description={category.description}
        />
      </main>
      <Footer />
    </div>
  );
}
