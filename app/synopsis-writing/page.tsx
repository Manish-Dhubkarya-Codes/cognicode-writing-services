import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  FileText,
  Target,
  BookOpen,
  Lightbulb,
  List,
  Clock,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Synopsis Writing Services | CogniCodeWrite",
  description:
    "Professional PhD synopsis writing support services. Get your synopsis approved quickly with our expert guidance.",
};

const synopsisComponents = [
  {
    icon: Lightbulb,
    title: "Title & Introduction",
    description:
      "Crafting a compelling title and introduction that clearly states your research problem and context.",
  },
  {
    icon: Target,
    title: "Research Objectives",
    description:
      "Defining clear, measurable research objectives that guide your entire study.",
  },
  {
    icon: BookOpen,
    title: "Literature Review",
    description:
      "Brief overview of existing research and identification of research gaps your study will address.",
  },
  {
    icon: List,
    title: "Research Methodology",
    description:
      "Detailed methodology including research design, data collection methods, and analysis techniques.",
  },
  {
    icon: FileText,
    title: "Expected Outcomes",
    description:
      "Anticipated contributions to knowledge and potential implications of your research.",
  },
  {
    icon: Clock,
    title: "Timeline & References",
    description:
      "Realistic research timeline and comprehensive reference list in proper format.",
  },
];

const benefits = [
  "Quick university approval with well-structured synopsis",
  "Expert guidance on research methodology selection",
  "Alignment with university-specific formats and guidelines",
  "Comprehensive literature review for gap identification",
  "Clear articulation of research objectives and hypotheses",
  "Multiple revision rounds until supervisor approval",
  "Plagiarism-free content with Turnitin report",
  "Fast turnaround time for urgent requirements",
];

export default function SynopsisWritingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Synopsis Writing
                </p>
                <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Professional PhD Synopsis Writing Services
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  A well-crafted synopsis is the foundation of your PhD journey.
                  Our expert team helps you create a compelling research
                  proposal that gets approved quickly.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/contact">Get Synopsis Support</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Sample Synopsis</Link>
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Award className="h-12 w-12" />
                      <div>
                        <p className="text-3xl font-bold">98%</p>
                        <p className="text-sm text-primary-foreground/80">
                          Synopsis Approval Rate
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">5000+</p>
                      <p className="text-sm text-muted-foreground">
                        Synopsis Completed
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">7 Days</p>
                      <p className="text-sm text-muted-foreground">
                        Average Delivery
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Key Components of a PhD Synopsis
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We ensure every essential element is expertly crafted to meet
                university requirements.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {synopsisComponents.map((component, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <component.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      {component.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {component.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Why Choose Our Synopsis Writing Services?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our expert team ensures your synopsis is comprehensive,
                  well-structured, and aligned with your university guidelines.
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground">
                    Free Topic Consultation
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Get a free research topic consultation and synopsis
                    guidance from our PhD experts.
                  </p>
                  <form className="mt-6 space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                      <option value="">Select Service Type</option>
                      <option value="synopsis">Synopsis Writing</option>
                      <option value="topic">Topic Selection</option>
                      <option value="methodology">Methodology Design</option>
                      <option value="review">Literature Review</option>
                    </select>
                    <Button className="w-full" size="lg">
                      Get Free Consultation
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
              Start Your PhD Journey with a Strong Synopsis
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              Get your synopsis approved quickly with our expert guidance. We
              have helped thousands of scholars kickstart their research.
            </p>
            <div className="mt-8">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
