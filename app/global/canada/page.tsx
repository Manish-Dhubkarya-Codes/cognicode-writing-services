import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  GraduationCap,
  FileText,
  BookOpen,
  PenTool,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Canada Academic Writing Support | CogniCode",
  description:
    "Professional academic writing support for Canadian universities. Expert guidance for PhD research, MBA dissertations, and academic papers across Canada.",
};

const canadaServices = [
  {
    icon: GraduationCap,
    title: "PhD Research Support",
    description:
      "Comprehensive PhD thesis and research support for scholars in Canadian universities.",
  },
  {
    icon: FileText,
    title: "MBA Dissertations",
    description:
      "Expert support for MBA dissertations and business research projects.",
  },
  {
    icon: BookOpen,
    title: "Research Publications",
    description:
      "Help with publishing research papers in high-impact journals from Canadian institutions.",
  },
  {
    icon: PenTool,
    title: "Academic Writing",
    description:
      "Professional academic writing assistance for essays, reports, and assignments.",
  },
  {
    icon: Award,
    title: "Data Analysis",
    description:
      "Statistical analysis and data interpretation using SPSS, R, NVivo, and other tools.",
  },
  {
    icon: FileText,
    title: "Proofreading & Editing",
    description:
      "Professional editing and proofreading services for academic documents.",
  },
];

const canadaUniversities = [
  "University of Toronto",
  "University of British Columbia",
  "McGill University",
  "McMaster University",
  "University of Alberta",
  "University of Waterloo",
  "Université de Montréal",
  "Queen's University",
  "University of Ottawa",
  "University of Calgary",
  "Western University",
  "Simon Fraser University",
];

const canadaFeatures = [
  "Understanding of Canadian academic standards and citation styles",
  "Bilingual support for English and French research",
  "Knowledge of Tri-Council funding requirements (SSHRC, NSERC, CIHR)",
  "Familiarity with specific Canadian university guidelines",
  "Support across all Canadian time zones (PST to AST)",
  "Experience with Indigenous research methodologies",
  "Understanding of Canadian innovation and sustainability research",
  "Coast-to-coast academic support",
];

export default function CanadaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">🇨🇦</span>
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Canada
                  </p>
                </div>
                <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Academic Writing Support for Canadian Scholars
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Expert academic support tailored for Canadian universities. 
                  CogniCode provides trusted research writing services to scholars 
                  from coast to coast with deep understanding of Canadian academic requirements.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/contact">Get Canadian Support</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/services">View All Services</Link>
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Award className="h-12 w-12" />
                      <div>
                        <p className="text-3xl font-bold">200+</p>
                        <p className="text-sm text-primary-foreground/80">
                          Canadian Projects Completed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">25+</p>
                      <p className="text-sm text-muted-foreground">
                        Canadian Universities
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">Multiple</p>
                      <p className="text-sm text-muted-foreground">
                        Time Zones Support
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Canadian Academic Services
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Comprehensive academic support designed for Canadian university
                requirements.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {canadaServices.map((service, index) => (
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

        {/* Why Canadian Scholars Choose Us */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Why Canadian Scholars Choose Us
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our team understands the unique requirements of Canadian
                  universities and national academic conventions.
                </p>
                <ul className="mt-8 space-y-3">
                  {canadaFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">
                    Universities We Support
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {canadaUniversities.map((uni, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <GraduationCap className="h-4 w-4 text-primary shrink-0" />
                        {uni}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
              Get Expert Canadian Academic Support
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              Join hundreds of Canadian scholars who have achieved academic success
              with our expert support.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary"
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