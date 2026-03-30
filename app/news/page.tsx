import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Latest News & Updates | CogniCodeWrite",
  description:
    "Stay updated with the latest news, UGC guidelines, and academic updates relevant to PhD scholars and researchers.",
};

// Helper to determine category based on title keywords (mirrors the style of writingtree.in)
const getCategory = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes("ugc")) return "UGC Notice";
  if (t.includes("naac")) return "Accreditation";
  if (t.includes("phd")) return "Regulations";
  if (t.includes("journal")) return "Journal Guidelines";
  if (t.includes("accreditation") || t.includes("teacher appraisal")) return "UGC Guidelines";
  if (t.includes("fake") || t.includes("barred")) return "UGC Action";
  return "Academic News";
};

export default async function NewsPage() {
  // Fetch real news from NewsAPI.org (targeted to PhD / UGC / graduation / higher education news in India)
  // This exactly matches the dynamic feel of https://writingtree.in/category/latest-news-updates/
  let newsItems: {
    date: string;
    title: string;
    excerpt: string;
    category: string;
    isImportant: boolean;
    url: string;
  }[] = [];

  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      throw new Error("NEWS_API_KEY is not set in .env.local");
    }

    // Targeted query for exactly the kind of content on writingtree.in (UGC, PhD, NAAC, fake universities, etc.)
    const query = `(UGC OR "University Grants Commission" OR NAAC OR PhD OR "PhD regulations" OR "PhD admissions" OR "fake universities" OR accreditation OR "higher education") India`;

    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`,
      {
        next: { revalidate: 3600 }, // ISR — refresh every hour (real-time feel without hitting rate limits)
      }
    );

    if (!res.ok) throw new Error("Failed to fetch news");

    const data = await res.json();

    newsItems = data.articles
      .map((article: any) => ({
        date: new Date(article.publishedAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        title: article.title || "Untitled Article",
        excerpt:
          article.description?.replace(/<[^>]+>/g, "") ||
          "Read the full story on the source website.",
        category: getCategory(article.title),
        isImportant: /ugc|phd|fake|barred|warn|ban/i.test(article.title),
        url: article.url,
      }))
      .filter((item: any) => item.title && item.excerpt); // basic cleanup
  } catch (error) {
    console.error("News fetch error:", error);
    // Fallback to your original static data if API fails (so the page never breaks)
    newsItems = [
      {
        date: "March 11, 2026",
        title: "UGC Releases Important Notice For Students, Warns Against Fake Universities Awarding Degrees",
        excerpt:
          "The University Grants Commission has issued a crucial notice warning students about fake universities that are illegally awarding degrees. Students are advised to verify university credentials before enrollment.",
        category: "UGC Notice",
        isImportant: true,
        url: "#",
      },
      // ... (you can keep the rest of your original array here as fallback)
    ];
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Stay Informed
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Latest News & Updates
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Stay updated with the latest UGC guidelines, academic
                regulations, and important news relevant to PhD scholars and
                researchers across India.
              </p>
            </div>
          </div>
        </section>

        {/* Important Alerts */}
        <section className="bg-destructive/10 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Badge variant="destructive">Important</Badge>
              <p className="text-sm font-medium text-foreground">
                UGC has issued warnings against fake universities. Always verify
                credentials before enrollment.
              </p>
              <Link
                href="#"
                className="ml-auto shrink-0 text-sm font-medium text-primary hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {newsItems.map((news, index) => (
                  <Card
                    key={index}
                    className={`overflow-hidden ${news.isImportant ? "border-primary/50" : ""}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge
                          variant={news.isImportant ? "default" : "secondary"}
                        >
                          {news.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {news.date}
                        </div>
                      </div>

                      {/* Make title clickable (opens in new tab like writingtree.in) */}
                      <Link
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <h2 className="font-serif text-xl font-semibold text-foreground hover:text-primary transition-colors">
                          {news.title}
                        </h2>
                      </Link>

                      <p className="mt-3 text-muted-foreground">
                        {news.excerpt}
                      </p>

                      {/* Real external link */}
                      <Link
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 text-primary hover:underline"
                      >
                        Read Full Article
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}

                {newsItems.length === 0 && (
                  <p className="text-center text-muted-foreground py-12">
                    No recent academic news found. Please check back later.
                  </p>
                )}

                <div className="flex justify-center pt-8">
                  <Button variant="outline" size="lg" asChild>
                    <Link href="https://newsapi.org/" target="_blank">
                      Powered by NewsAPI.org • Load More on Source
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Sidebar (unchanged) */}
              <div className="space-y-8">
                {/* Categories */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">
                      Categories
                    </h3>
                    <div className="space-y-2">
                      {[
                        "UGC Guidelines",
                        "Regulations",
                        "Journal Guidelines",
                        "Accreditation",
                        "Publications",
                        "Events",
                        "University News",
                      ].map((category) => (
                        <button
                          key={category}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          <span className="text-muted-foreground">
                            {category}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">
                      Quick Links
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "UGC Official Website", url: "https://www.ugc.gov.in/" },
                        { name: "NAAC Portal", url: "https://naac.gov.in/" },
                        { name: "Scopus Journal Finder", url: "https://www.scopus.com/" },
                        { name: "Shodhganga Thesis Repository", url: "https://shodhganga.inflibnet.ac.in/" },
                        { name: "INFLIBNET", url: "https://www.inflibnet.ac.in/" },
                      ].map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">
                      Subscribe to Updates
                    </h3>
                    <p className="text-sm text-primary-foreground/80 mb-4">
                      Get the latest academic news and UGC updates delivered to
                      your inbox.
                    </p>
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full rounded-lg border-0 bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
                    />
                    <Button
                      variant="secondary"
                      className="w-full mt-3"
                    >
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}