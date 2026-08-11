import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BlogCard } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import {
  blogCategories,
  getCategoryBySlug,
  getPostsByCategory,
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

  const posts = getPostsByCategory(category.slug as BlogCategorySlug);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        <section className="bg-foreground py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-background/60">
                Blog Category
              </p>
              <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-background sm:text-5xl">
                {category.name}
              </h1>
              <p className="mt-6 text-lg leading-8 text-background/70">
                {category.description}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button variant="secondary" asChild>
                  <Link prefetch={false} href={category.serviceHref}>
                    {category.serviceLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-background/20 bg-transparent text-background hover:bg-background/10 hover:text-background"
                >
                  <Link prefetch={false} href="/blog">
                    All articles
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  Articles in {category.name}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {posts.length} guide{posts.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-background px-6 py-16 text-center">
                <p className="font-medium text-foreground">
                  New guides in this category are coming soon.
                </p>
                <Button className="mt-6" variant="outline" asChild>
                  <Link prefetch={false} href="/blog">
                    Browse all articles
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
              Need hands-on help with {category.name.toLowerCase()}?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Explore our related service or request a free consultation. Soft
              guidance first - conversion only when it truly helps your research.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link prefetch={false} href={category.serviceHref}>
                  {category.serviceLabel}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link prefetch={false} href="/contact">
                  Contact us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
