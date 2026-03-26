import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Eye,
  BookOpen,
  GraduationCap,
  Newspaper,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Research Work Samples | CogniCodeWrite",
  description:
    "View samples of our academic writing work including thesis, synopsis, research papers, and more.",
};

const sampleCategories = [
  {
    icon: GraduationCap,
    title: "PhD Thesis Samples",
    description:
      "Complete thesis samples across various disciplines with proper structure and formatting.",
    count: 25,
    samples: [
      { title: "Management Studies - Strategic HRM", pages: "280 pages" },
      { title: "Computer Science - Machine Learning", pages: "310 pages" },
      { title: "Commerce - Financial Analysis", pages: "265 pages" },
      { title: "Education - Pedagogy Research", pages: "245 pages" },
    ],
  },
  {
    icon: FileText,
    title: "Synopsis Samples",
    description:
      "Well-structured synopsis samples with research objectives, methodology, and timeline.",
    count: 40,
    samples: [
      { title: "Engineering - IoT Applications", pages: "25 pages" },
      { title: "Psychology - Behavioral Studies", pages: "22 pages" },
      { title: "Business Administration - Marketing", pages: "28 pages" },
      { title: "Sciences - Environmental Research", pages: "24 pages" },
    ],
  },
  {
    icon: Newspaper,
    title: "Research Paper Samples",
    description:
      "Published research papers in Scopus, SCI, and UGC-approved journals.",
    count: 100,
    samples: [
      { title: "Scopus Q1 - Data Analytics", pages: "18 pages" },
      { title: "SCI Journal - Biotechnology", pages: "22 pages" },
      { title: "UGC Approved - Social Sciences", pages: "15 pages" },
      { title: "IEEE Conference - Network Security", pages: "12 pages" },
    ],
  },
  {
    icon: BookOpen,
    title: "Literature Review Samples",
    description:
      "Comprehensive literature reviews with critical analysis and proper citations.",
    count: 30,
    samples: [
      { title: "Healthcare Management Review", pages: "45 pages" },
      { title: "Artificial Intelligence Trends", pages: "52 pages" },
      { title: "Sustainable Development Goals", pages: "38 pages" },
      { title: "Consumer Behavior Analysis", pages: "42 pages" },
    ],
  },
  {
    icon: FileCheck,
    title: "Research Proposal Samples",
    description:
      "Well-crafted research proposals for PhD admissions and funding applications.",
    count: 35,
    samples: [
      { title: "Humanities - Cultural Studies", pages: "15 pages" },
      { title: "Engineering - Renewable Energy", pages: "18 pages" },
      { title: "Medical Sciences - Drug Research", pages: "20 pages" },
      { title: "Social Sciences - Policy Analysis", pages: "16 pages" },
    ],
  },
];

const disciplines = [
  "Management",
  "Engineering",
  "Computer Science",
  "Commerce",
  "Education",
  "Sciences",
  "Medical",
  "Law",
  "Humanities",
  "Social Sciences",
  "Psychology",
  "Economics",
];

export default function SamplesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Work Samples
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Research Work Samples
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Explore our portfolio of academic writing samples. View the
                quality and standards we maintain in thesis, synopsis, research
                papers, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Disciplines */}
        <section className="border-b py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm font-medium text-muted-foreground mr-2">
                Browse by discipline:
              </span>
              {disciplines.map((discipline) => (
                <Badge
                  key={discipline}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {discipline}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Categories */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {sampleCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">
                        {category.title}
                      </h2>
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {category.count}+ samples
                    </Badge>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {category.samples.map((sample, sampleIndex) => (
                      <Card
                        key={sampleIndex}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <FileText className="h-8 w-8 text-primary/60" />
                            <Badge variant="secondary" className="text-xs">
                              {sample.pages}
                            </Badge>
                          </div>
                          <h3 className="mt-4 font-medium text-foreground line-clamp-2">
                            {sample.title}
                          </h3>
                          <div className="mt-4 flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="mr-1 h-3 w-3" />
                              Preview
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button variant="outline">
                      View All {category.title}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Request Sample */}
        <section className="bg-muted/50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Need a Specific Sample?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Can not find a sample in your subject area? Request a specific
                sample and our team will share relevant work from our portfolio.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/contact">Request Sample</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              Our samples showcase the quality we deliver. Let us help you
              achieve similar results for your academic work.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
