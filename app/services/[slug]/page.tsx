import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  Users,
  Shield,
  Award,
  ArrowRight,
} from "lucide-react";

const services: Record<
  string,
  {
    title: string;
    description: string;
    longDescription: string;
    features: string[];
    process: { step: string; title: string; description: string }[];
    benefits: string[];
  }
> = {
  "phd-thesis-writing": {
    title: "PhD Thesis Writing Services",
    description:
      "Comprehensive PhD thesis writing support from topic selection to final submission.",
    longDescription:
      "Our PhD Thesis Writing Services provide complete support for doctoral scholars. From identifying a research-worthy topic to crafting well-structured chapters, we guide you through every step of your thesis journey. Our team of PhD experts ensures your thesis meets international academic standards and your university requirements.",
    features: [
      "Complete thesis writing from Chapter 1 to Chapter 6",
      "Research methodology design and implementation",
      "Statistical data analysis using SPSS, R, Python",
      "Literature review with proper citations",
      "Plagiarism-free content with Turnitin report",
      "Unlimited revisions until supervisor approval",
      "APA, MLA, Harvard formatting",
      "24/7 support and regular progress updates",
    ],
    process: [
      {
        step: "01",
        title: "Initial Consultation",
        description:
          "We understand your research area, university guidelines, and specific requirements.",
      },
      {
        step: "02",
        title: "Topic Refinement",
        description:
          "Our experts help refine your topic to ensure it is researchable and contributes to your field.",
      },
      {
        step: "03",
        title: "Research & Writing",
        description:
          "Systematic research and chapter-by-chapter writing with regular updates.",
      },
      {
        step: "04",
        title: "Review & Revisions",
        description:
          "Multiple review rounds and revisions until you and your supervisor are satisfied.",
      },
    ],
    benefits: [
      "15+ years of academic writing experience",
      "Subject-specific PhD expert writers",
      "On-time delivery guaranteed",
      "Confidentiality assured",
      "Post-submission support",
      "Viva preparation assistance",
    ],
  },
  "thesis-assistance": {
    title: "PhD Thesis Writing Assistance",
    description:
      "Expert assistance for specific chapters or sections of your PhD thesis.",
    longDescription:
      "Our PhD Thesis Writing Assistance service is perfect for scholars who need help with specific aspects of their thesis. Whether you need support with literature review, methodology, data analysis, or any specific chapter, our experts provide targeted assistance while you maintain control of your research.",
    features: [
      "Chapter-specific writing support",
      "Literature review assistance",
      "Methodology guidance",
      "Data analysis support",
      "Result interpretation",
      "Discussion and conclusion writing",
      "Reference management",
      "Formatting and proofreading",
    ],
    process: [
      {
        step: "01",
        title: "Requirement Analysis",
        description:
          "Share the specific sections or chapters where you need assistance.",
      },
      {
        step: "02",
        title: "Expert Assignment",
        description:
          "We assign a subject-matter expert based on your research area.",
      },
      {
        step: "03",
        title: "Collaborative Work",
        description:
          "Work closely with your assigned expert through regular consultations.",
      },
      {
        step: "04",
        title: "Quality Delivery",
        description:
          "Receive polished content that seamlessly integrates with your thesis.",
      },
    ],
    benefits: [
      "Flexible support options",
      "Cost-effective for specific needs",
      "Maintain ownership of your research",
      "Learn while you get help",
      "Quick turnaround available",
      "Expert guidance on demand",
    ],
  },
  "dissertation-consultation": {
    title: "Dissertation Consultation Services",
    description:
      "Expert consultation for dissertation planning, writing, and completion.",
    longDescription:
      "Our Dissertation Consultation Services provide strategic guidance for Masters and PhD students. Get expert advice on structuring your dissertation, refining your research questions, selecting appropriate methodologies, and ensuring academic rigor throughout your work.",
    features: [
      "Research proposal development",
      "Methodology consultation",
      "Structure and outline planning",
      "Literature review guidance",
      "Data collection strategy",
      "Analysis framework design",
      "Writing strategy sessions",
      "Progress review meetings",
    ],
    process: [
      {
        step: "01",
        title: "Assessment",
        description:
          "Evaluate your current progress and identify areas needing support.",
      },
      {
        step: "02",
        title: "Strategy Development",
        description: "Create a customized plan to complete your dissertation.",
      },
      {
        step: "03",
        title: "Regular Consultations",
        description:
          "Scheduled sessions to review progress and provide guidance.",
      },
      {
        step: "04",
        title: "Completion Support",
        description:
          "Final review and preparation for submission and defense.",
      },
    ],
    benefits: [
      "One-on-one expert mentorship",
      "Personalized guidance",
      "Flexible scheduling",
      "PhD-level consultants",
      "Comprehensive support",
      "Confidence building",
    ],
  },
  "research-paper-writing": {
    title: "Research Paper Writing Services",
    description:
      "Professional research paper writing for journal publication.",
    longDescription:
      "Our Research Paper Writing Services help researchers publish their work in reputable journals. From conceptualization to publication, we support you in crafting high-quality research papers that meet journal standards and increase your chances of acceptance.",
    features: [
      "Complete paper writing",
      "Journal selection guidance",
      "Abstract and introduction writing",
      "Methodology documentation",
      "Results presentation",
      "Discussion and conclusion",
      "Journal formatting",
      "Revision support",
    ],
    process: [
      {
        step: "01",
        title: "Topic Discussion",
        description:
          "Understand your research objectives and target journals.",
      },
      {
        step: "02",
        title: "Paper Development",
        description:
          "Write and structure the paper according to journal guidelines.",
      },
      {
        step: "03",
        title: "Review & Editing",
        description: "Multiple rounds of review to ensure publication quality.",
      },
      {
        step: "04",
        title: "Submission Support",
        description:
          "Guide through the submission process and peer review responses.",
      },
    ],
    benefits: [
      "High acceptance rates",
      "Scopus/SCI journal expertise",
      "Peer review preparation",
      "Fast turnaround",
      "Confidential service",
      "Publication guarantee options",
    ],
  },
  "plagiarism-removal": {
    title: "Plagiarism Check & Removal Services",
    description:
      "Comprehensive plagiarism detection and removal to ensure original content.",
    longDescription:
      "Our Plagiarism Check & Removal Services ensure your academic work is 100% original. Using industry-standard tools like Turnitin, we identify all instances of similarity and professionally rewrite content to reduce plagiarism while maintaining academic integrity.",
    features: [
      "Turnitin plagiarism check",
      "Detailed similarity report",
      "Professional paraphrasing",
      "Citation correction",
      "Reference verification",
      "Multiple revision rounds",
      "Final verification report",
      "Below 10% similarity guarantee",
    ],
    process: [
      {
        step: "01",
        title: "Initial Check",
        description:
          "Run comprehensive plagiarism check using Turnitin or similar tools.",
      },
      {
        step: "02",
        title: "Analysis",
        description:
          "Identify sources of similarity and plan remediation strategy.",
      },
      {
        step: "03",
        title: "Rewriting",
        description:
          "Professional paraphrasing and rewriting of flagged content.",
      },
      {
        step: "04",
        title: "Final Verification",
        description:
          "Re-check to ensure similarity is within acceptable limits.",
      },
    ],
    benefits: [
      "Turnitin-compatible reports",
      "Expert academic rewriting",
      "Maintain original meaning",
      "Quick turnaround",
      "Money-back guarantee",
      "University-accepted format",
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug];

  if (!service) {
    return {
      title: "Service Not Found | CogniCode",
    };
  }

  return {
    title: `${service.title} | CogniCode`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <nav className="mb-4">
                <ol className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/" className="hover:text-primary">
                      Home
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link href="/services" className="hover:text-primary">
                      Services
                    </Link>
                  </li>
                  <li>/</li>
                  <li className="text-foreground">{service.title}</li>
                </ol>
              </nav>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {service.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {service.longDescription}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="bg-primary py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {[
                { icon: Shield, text: "100% Original" },
                { icon: Clock, text: "On-Time Delivery" },
                { icon: Users, text: "Expert Writers" },
                { icon: Award, text: "Quality Assured" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-primary-foreground"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
                  What is Included
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Our comprehensive service includes everything you need for
                  success.
                </p>
                <ul className="mt-8 space-y-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
                  Key Benefits
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Why scholars choose our service for their academic needs.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {service.benefits.map((benefit, index) => (
                    <Card key={index}>
                      <CardContent className="flex items-center gap-3 p-4">
                        <Award className="h-5 w-5 shrink-0 text-primary" />
                        <span className="text-sm text-foreground">
                          {benefit}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Process
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A systematic approach to ensure your success.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {service.process.map((item, index) => (
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
              Ready to Get Started?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              Contact us today for a free consultation and customized quote for
              your project.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({
    slug,
  }));
}
