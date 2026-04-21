import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  FileText,
  Users,
  Clock,
  Shield,
  Award,
  BookOpen,
  PenTool,
  BarChart3,
  Search,
  Edit,
  CheckSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PhD Thesis Writing Services | CogniCode",
  description:
    "Professional PhD thesis writing support services. Expert guidance from topic selection to final submission with guaranteed quality.",
};

const thesisFeatures = [
  {
    icon: Search,
    title: "Topic Formulation",
    description:
      "We help you identify and refine your research topic to ensure it is relevant, researchable, and contributes to your field.",
  },
  {
    icon: BookOpen,
    title: "Literature Review",
    description:
      "Comprehensive review of existing literature with proper citations and critical analysis of relevant research.",
  },
  {
    icon: BarChart3,
    title: "Research Methodology",
    description:
      "Expert guidance on selecting appropriate research methods, data collection techniques, and analysis frameworks.",
  },
  {
    icon: PenTool,
    title: "Content Writing",
    description:
      "Professional academic writing that meets international standards with proper structure and argumentation.",
  },
  {
    icon: Edit,
    title: "Editing & Proofreading",
    description:
      "Thorough editing for grammar, style, and academic conventions with multiple review rounds.",
  },
  {
    icon: CheckSquare,
    title: "Plagiarism Check",
    description:
      "Comprehensive plagiarism verification using Turnitin with detailed reports and revision support.",
  },
];

const thesisChapters = [
  {
    chapter: "Chapter 1",
    title: "Introduction",
    content:
      "Background, problem statement, objectives, scope, and significance of the study.",
  },
  {
    chapter: "Chapter 2",
    title: "Literature Review",
    content:
      "Critical analysis of existing research, theoretical framework, and research gaps.",
  },
  {
    chapter: "Chapter 3",
    title: "Research Methodology",
    content:
      "Research design, data collection methods, sampling techniques, and analysis procedures.",
  },
  {
    chapter: "Chapter 4",
    title: "Data Analysis & Results",
    content:
      "Statistical analysis, data interpretation, findings, and visual representations.",
  },
  {
    chapter: "Chapter 5",
    title: "Discussion",
    content:
      "Interpretation of results, comparison with existing literature, and implications.",
  },
  {
    chapter: "Chapter 6",
    title: "Conclusion",
    content:
      "Summary of findings, contributions, limitations, and future research directions.",
  },
];

const guarantees = [
  { icon: Shield, text: "100% Original Content" },
  { icon: Clock, text: "On-Time Delivery" },
  { icon: Users, text: "Expert PhD Writers" },
  { icon: Award, text: "Quality Assurance" },
  { icon: FileText, text: "Unlimited Revisions" },
  { icon: CheckCircle, text: "Supervisor Alignment" },
];

export default function ThesisWritingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                PhD Thesis Writing
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Expert PhD Thesis Writing Support Services
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Get comprehensive thesis writing support from topic selection to
                final submission. Our team of PhD experts ensures your thesis
                meets the highest academic standards.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/contact">Get Started Today</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/samples">View Samples</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="bg-primary py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {guarantees.map((item, index) => (
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
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Comprehensive Thesis Writing Support
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From the first chapter to the final bibliography, we support
                every aspect of your thesis.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {thesisFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="border-none shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Thesis Structure */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Standard Thesis Structure
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We follow the internationally accepted thesis structure to
                ensure your work meets academic standards.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {thesisChapters.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold text-primary">
                      {item.chapter}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Our Thesis Writing Process
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  A systematic approach to ensure your thesis meets all
                  requirements and exceeds expectations.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Initial consultation to understand your requirements",
                    "Topic refinement and research scope definition",
                    "Comprehensive literature review and gap identification",
                    "Methodology design and data collection planning",
                    "Chapter-by-chapter writing with regular updates",
                    "Multiple review rounds and quality checks",
                    "Plagiarism verification and final formatting",
                    "Revision support until supervisor approval",
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="bg-card">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground">
                    Get Your Free Thesis Consultation
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Discuss your thesis requirements with our experts and get a
                    customized support plan.
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
                      <option value="">Select Your Subject Area</option>
                      <option value="management">Management</option>
                      <option value="engineering">Engineering</option>
                      <option value="sciences">Sciences</option>
                      <option value="humanities">Humanities</option>
                      <option value="commerce">Commerce</option>
                      <option value="other">Other</option>
                    </select>
                    <textarea
                      placeholder="Brief description of your thesis topic"
                      rows={4}
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
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
              Ready to Complete Your PhD Thesis?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              Join thousands of successful scholars who completed their PhD
              thesis with our expert support.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Start Your Thesis Journey</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary"
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
