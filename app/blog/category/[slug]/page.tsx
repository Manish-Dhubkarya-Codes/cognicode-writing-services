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
        <section className="bg-foreground py-12 sm:py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60 sm:text-sm">
                Blog Category
              </p>
              <h1 className="mt-3 font-serif text-2xl font-bold tracking-tight text-background sm:mt-4 sm:text-4xl md:text-5xl">
                {category.name}
              </h1>
              <p className="mt-4 text-sm leading-6 text-background/70 sm:mt-6 sm:text-lg sm:leading-8">
                {category.description}
              </p>
              <div className="mt-6 flex flex-col items-stretch justify-center gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                <Button variant="secondary" className="w-full sm:w-auto" asChild>
                  <Link prefetch={false} href={category.serviceHref}>
                    {category.serviceLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="w-full border-background/20 bg-transparent text-background hover:bg-background/10 hover:text-background sm:w-auto"
                >
                  <Link prefetch={false} href="/blog">
                    All articles
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-10 sm:py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="mb-6 sm:mb-10">
              <h2 className="font-serif text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
                Articles in {category.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {posts.length} guide{posts.length === 1 ? "" : "s"}
              </p>
            </div>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border bg-background px-4 py-12 text-center sm:px-6 sm:py-16">
                <p className="font-medium text-foreground">
                  New guides in this category are coming soon.
                </p>
                <Button className="mt-6 w-full rounded-full sm:w-auto" variant="outline" asChild>
                  <Link prefetch={false} href="/blog">
                    Browse all articles
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        <section className="bg-background py-10 sm:py-16">
          <div className="mx-auto max-w-3xl px-3 text-center sm:px-6">
            <h2 className="font-serif text-xl font-bold text-foreground sm:text-2xl md:text-3xl">
              Need hands-on help with {category.name.toLowerCase()}?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">
              Explore our related service or request a free consultation. Soft
              guidance first — conversion only when it truly helps your research.
            </p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link prefetch={false} href={category.serviceHref}>
                  {category.serviceLabel}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
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
