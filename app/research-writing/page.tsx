import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  FileText,
  Award,
  BookOpen,
  PenTool,
  BarChart3,
  Search,
  Globe,
  Newspaper,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Research Paper Writing Services | CogniCode",
  description:
    "Professional research paper writing support for journal publications. Get your research published in Scopus, SCI, and UGC-approved journals.",
};

const researchServices = [
  {
    icon: FileText,
    title: "Research Paper Writing",
    description:
      "Complete research paper writing support from abstract to conclusion with proper methodology and analysis.",
  },
  {
    icon: BookOpen,
    title: "Literature Review",
    description:
      "Comprehensive literature review with critical analysis and proper citation in required format.",
  },
  {
    icon: BarChart3,
    title: "Data Analysis",
    description:
      "Statistical analysis using SPSS, R, Python, and other tools with detailed interpretation.",
  },
  {
    icon: PenTool,
    title: "Editing & Formatting",
    description:
      "Professional editing and formatting as per journal guidelines and academic standards.",
  },
  {
    icon: Globe,
    title: "Journal Selection",
    description:
      "Expert guidance on selecting appropriate Scopus, SCI, or UGC-approved journals for publication.",
  },
  {
    icon: Newspaper,
    title: "Publication Support",
    description:
      "End-to-end publication support including submission, revision, and correspondence with journals.",
  },
];

const journalTypes = [
  {
    title: "Scopus Indexed Journals",
    description:
      "Get published in high-impact Scopus indexed journals across all disciplines.",
    features: [
      "Q1 to Q4 journal selection",
      "Impact factor guidance",
      "Peer review preparation",
    ],
  },
  {
    title: "SCI/SCIE Journals",
    description:
      "Expert support for publication in Science Citation Index journals.",
    features: [
      "High impact publications",
      "Citation optimization",
      "Review response support",
    ],
  },
  {
    title: "UGC-Approved Journals",
    description:
      "Publication support for UGC-approved journals required for PhD completion.",
    features: [
      "UGC CARE list journals",
      "Fast publication options",
      "Compliance assurance",
    ],
  },
  {
    title: "Conference Papers",
    description:
      "Support for IEEE, Springer, and other conference paper publications.",
    features: [
      "Conference selection",
      "Paper preparation",
      "Presentation support",
    ],
  },
];

export default function ResearchWritingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Research Paper Writing
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Get Your Research Published in Top Journals
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Professional research paper writing and publication support for
                Scopus, SCI, and UGC-approved journals. Expert guidance from
                ideation to publication.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link prefetch={false} href="/contact">Start Your Publication Journey</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link prefetch={false} href="/samples">View Published Papers</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-primary py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: "3000+", label: "Papers Published" },
                { value: "500+", label: "Scopus Papers" },
                { value: "95%", label: "Acceptance Rate" },
                { value: "100+", label: "Journal Partners" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-primary-foreground md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-primary-foreground/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Comprehensive Research Support
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From research design to publication, we support every step of
                your scholarly journey.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {researchServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Journal Types */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Publication Support for All Journal Types
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Expert guidance for publishing in various indexed and peer-reviewed
                journals.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {journalTypes.map((journal, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {journal.title}
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          {journal.description}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {journal.features.map((feature, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-primary" />
                              <span className="text-muted-foreground">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Publication Process
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A systematic approach to ensure successful journal publication.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Research Design",
                  description:
                    "Define research objectives, methodology, and data collection approach.",
                },
                {
                  step: "02",
                  title: "Paper Writing",
                  description:
                    "Expert writing following journal guidelines and academic standards.",
                },
                {
                  step: "03",
                  title: "Journal Selection",
                  description:
                    "Choose the right journal based on scope, impact, and publication speed.",
                },
                {
                  step: "04",
                  title: "Publication",
                  description:
                    "Submission, peer review response, and final publication support.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
              Ready to Get Published?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              Start your publication journey today. Our experts will guide you
              through every step.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link prefetch={false} href="/contact">Get Publication Support</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link prefetch={false} href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
