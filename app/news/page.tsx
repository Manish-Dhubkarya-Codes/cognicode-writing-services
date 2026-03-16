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

const newsItems = [
  {
    date: "March 11, 2026",
    title: "UGC Releases Important Notice For Students, Warns Against Fake Universities Awarding Degrees",
    excerpt:
      "The University Grants Commission has issued a crucial notice warning students about fake universities that are illegally awarding degrees. Students are advised to verify university credentials before enrollment.",
    category: "UGC Notice",
    isImportant: true,
  },
  {
    date: "March 10, 2026",
    title: "NAAC: What about accreditation of accreditors?",
    excerpt:
      "A detailed analysis on the National Assessment and Accreditation Council and the ongoing debate about accreditation standards and practices in higher education.",
    category: "Accreditation",
    isImportant: false,
  },
  {
    date: "March 8, 2026",
    title: "UGC Introduces Holistic Teacher Appraisal Norms: Major Shift in Academic Performance Evaluation",
    excerpt:
      "The UGC has introduced new comprehensive teacher appraisal norms that take a more holistic approach to evaluating academic performance, moving beyond traditional metrics.",
    category: "UGC Guidelines",
    isImportant: true,
  },
  {
    date: "March 5, 2026",
    title: "UGC bars JJTU from enrolling PhD students for 5 years over violation of norms",
    excerpt:
      "In a significant move, the University Grants Commission has barred Jagadguru Jyotiba Jyotirao Tule Universit from enrolling PhD students for five years due to serious violations of established norms.",
    category: "UGC Action",
    isImportant: true,
  },
  {
    date: "March 2, 2026",
    title: "UGC bars 3 private universities from PhD admissions for 5 years; 30 others are under scrutiny",
    excerpt:
      "The UGC has taken strict action against three private universities for violating PhD admission norms, with 30 more institutions under investigation for similar violations.",
    category: "UGC Action",
    isImportant: true,
  },
  {
    date: "February 28, 2026",
    title: "UGC Discontinues UGC-CARE Journal Listing: New parameters for peer-reviewed journals introduced",
    excerpt:
      "Major changes in academic publishing as UGC discontinues the CARE journal listing and introduces new parameters for identifying quality peer-reviewed journals.",
    category: "Journal Guidelines",
    isImportant: true,
  },
  {
    date: "February 20, 2026",
    title: "New PhD Regulations 2026: Key Changes Every Scholar Must Know",
    excerpt:
      "The new PhD regulations come with significant changes in coursework requirements, publication mandates, and submission timelines. Here is everything you need to know.",
    category: "Regulations",
    isImportant: false,
  },
  {
    date: "February 15, 2026",
    title: "Top Scopus Indexed Journals Accepting Research Papers in 2026",
    excerpt:
      "A comprehensive guide to high-quality Scopus indexed journals across various disciplines that are currently accepting research paper submissions.",
    category: "Publications",
    isImportant: false,
  },
  {
    date: "February 10, 2026",
    title: "Changes in Plagiarism Policy: What Researchers Need to Know",
    excerpt:
      "Updated guidelines on plagiarism detection and acceptable similarity indices for thesis and research paper submissions across Indian universities.",
    category: "Guidelines",
    isImportant: false,
  },
  {
    date: "February 5, 2026",
    title: "Upcoming Academic Conferences and Webinars for PhD Scholars",
    excerpt:
      "A calendar of important academic conferences, seminars, and webinars scheduled for 2026 that PhD scholars should consider for networking and paper presentations.",
    category: "Events",
    isImportant: false,
  },
];

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
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
                      <h2 className="font-serif text-xl font-semibold text-foreground hover:text-primary transition-colors cursor-pointer">
                        {news.title}
                      </h2>
                      <p className="mt-3 text-muted-foreground">
                        {news.excerpt}
                      </p>
                      <Button
                        variant="link"
                        className="mt-4 px-0 text-primary"
                      >
                        Read Full Article
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-center pt-8">
                  <Button variant="outline" size="lg">
                    Load More News
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
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
                        { name: "UGC Official Website", url: "#" },
                        { name: "NAAC Portal", url: "#" },
                        { name: "Scopus Journal Finder", url: "#" },
                        { name: "Shodhganga Thesis Repository", url: "#" },
                        { name: "INFLIBNET", url: "#" },
                      ].map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
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
