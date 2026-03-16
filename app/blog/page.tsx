import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Calendar, User, Clock, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | CogniCodeWrite",
  description:
    "Expert insights, research tips, and academic writing guides from our team of PhD scholars.",
};

const featuredPost = {
  id: 1,
  title: "Transform Your Thesis into a High-Impact, Publication-Ready Research",
  excerpt:
    "Learn the essential steps to convert your thesis into a journal-ready publication that makes an impact in your field of study.",
  author: "Dr. Richard Anderson",
  date: "December 11, 2025",
  readTime: "8 min read",
  category: "Research Tips",
  image: "/placeholder-blog.jpg",
};

const posts = [
  {
    id: 2,
    title:
      "How Professional Synopsis Writing Support Services Help in Getting Quick University Approvals",
    excerpt:
      "Discover how expert synopsis writing can streamline your research proposal approval process.",
    author: "Dr. Maria Santos",
    date: "April 29, 2025",
    readTime: "6 min read",
    category: "Synopsis Writing",
  },
  {
    id: 3,
    title:
      "What are the Key Benefits of Using a Custom Research Paper Writing Support Service?",
    excerpt:
      "Explore the advantages of working with professional research paper writing services for your academic needs.",
    author: "Dr. James Williams",
    date: "March 15, 2025",
    readTime: "5 min read",
    category: "Research Papers",
  },
  {
    id: 4,
    title: "What to Look for in a Reliable Research Paper Writing Service",
    excerpt:
      "Key factors to consider when choosing an academic writing service for your research projects.",
    author: "Dr. Lisa Chen",
    date: "February 28, 2025",
    readTime: "7 min read",
    category: "Guides",
  },
  {
    id: 5,
    title: "Top Tips for Choosing a Reliable Research Paper Writing Service",
    excerpt:
      "Expert advice on selecting the right academic writing support for your scholarly work.",
    author: "Dr. Richard Anderson",
    date: "February 3, 2025",
    readTime: "4 min read",
    category: "Tips",
  },
  {
    id: 6,
    title:
      "How Research Paper Writing Services Can Simplify Your Academic Journey",
    excerpt:
      "Learn how professional support can help you navigate the complexities of academic writing.",
    author: "Dr. Maria Santos",
    date: "January 30, 2025",
    readTime: "6 min read",
    category: "Academic Writing",
  },
  {
    id: 7,
    title:
      "Top Challenges Students Face While Writing Research Papers and How to Overcome Them",
    excerpt:
      "Common obstacles in academic writing and practical strategies to address them effectively.",
    author: "Dr. James Williams",
    date: "January 24, 2025",
    readTime: "8 min read",
    category: "Challenges",
  },
  {
    id: 8,
    title: "The Ultimate Guide to Writing a Research Paper: Tips for Beginners",
    excerpt:
      "A comprehensive guide for first-time researchers on crafting quality academic papers.",
    author: "Dr. Lisa Chen",
    date: "January 16, 2025",
    readTime: "10 min read",
    category: "Beginner Guide",
  },
  {
    id: 9,
    title:
      "Is it Okay to Submit One Research Paper to Various Conferences or Journals?",
    excerpt:
      "Understanding the ethics and best practices of academic paper submissions.",
    author: "Dr. Richard Anderson",
    date: "December 17, 2024",
    readTime: "5 min read",
    category: "Publication Ethics",
  },
];

const categories = [
  "All",
  "Research Tips",
  "Synopsis Writing",
  "Research Papers",
  "Data Analysis",
  "Publication Ethics",
  "Beginner Guide",
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-foreground py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-background sm:text-5xl">
                Blog & Resources
              </h1>
              <p className="mt-6 text-lg leading-8 text-background/70">
                Expert insights, research tips, and academic writing guides from
                our team of PhD scholars. Stay updated with the latest in
                academic writing.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="border-b border-border bg-background py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="bg-background py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="aspect-[16/9] rounded-2xl bg-muted flex items-center justify-center overflow-hidden">
                  <div className="flex h-full w-full items-center justify-center bg-primary/5">
                    <span className="font-serif text-6xl text-primary/20">Featured</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {featuredPost.date}
                    </span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-muted-foreground">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      {featuredPost.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {featuredPost.author}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {featuredPost.readTime}
                      </p>
                    </div>
                  </div>
                  <Button className="mt-6" asChild>
                    <Link href="#">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="bg-muted py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl mb-12">
              Latest Articles
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col rounded-2xl bg-card shadow-sm ring-1 ring-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[16/9] bg-primary/5 flex items-center justify-center">
                    <Tag className="h-12 w-12 text-primary/20" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      <Link href="#">{post.title}</Link>
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-xs">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date.split(",")[0]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-primary py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Stay Updated
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
                Subscribe to our newsletter for the latest research tips,
                academic writing guides, and industry updates.
              </p>
              <form className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-lg border-0 px-4 py-3 text-foreground shadow-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary"
                />
                <Button
                  type="submit"
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
