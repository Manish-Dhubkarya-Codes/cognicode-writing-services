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
  title: "Germany Academic Writing Support | CogniCode",
  description:
    "Professional academic writing support for German universities. Expert guidance for PhD research, MBA dissertations, and academic papers across Germany.",
};

const germanyServices = [
  {
    icon: GraduationCap,
    title: "PhD Research Support",
    description:
      "Comprehensive PhD thesis and research support for scholars in German universities.",
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
      "Help with publishing research papers in high-impact journals from German institutions.",
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

const germanyUniversities = [
  "Technical University of Munich",
  "Ludwig-Maximilians-Universität München",
  "Heidelberg University",
  "Humboldt-Universität zu Berlin",
  "RWTH Aachen University",
  "University of Freiburg",
  "Karlsruhe Institute of Technology",
  "University of Tübingen",
  "University of Hamburg",
  "Goethe University Frankfurt",
  "University of Bonn",
  "Technische Universität Berlin",
];

const germanyFeatures = [
  "Understanding of German academic standards and citation styles",
  "Bilingual support for English and German research",
  "Knowledge of DFG (Deutsche Forschungsgemeinschaft) funding requirements",
  "Familiarity with German university Promotionsordnungen and guidelines",
  "Support for Central European Time (CET/CEST) zone",
  "Experience with German engineering, innovation, and sustainability research",
  "Support for international students studying in Germany",
  "Deep knowledge of EU and German research ethics",
];

export default function GermanyPage() {
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
                  <span className="text-5xl">🇩🇪</span>
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Germany
                  </p>
                </div>
                <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Academic Writing Support for German Scholars
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Expert academic support tailored for German universities. 
                  CogniCode provides trusted research writing services to scholars 
                  across Germany with deep understanding of German academic requirements.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/contact">Get German Support</Link>
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
                          German Projects Completed
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
                        German Universities
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">CET/CEST</p>
                      <p className="text-sm text-muted-foreground">
                        Time Zone Support
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
                Our German Academic Services
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Comprehensive academic support designed for German university
                requirements.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {germanyServices.map((service, index) => (
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

        {/* Why German Scholars Choose Us */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Why German Scholars Choose Us
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our team understands the unique requirements of German
                  universities and national academic conventions.
                </p>
                <ul className="mt-8 space-y-3">
                  {germanyFeatures.map((feature, index) => (
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
                    {germanyUniversities.map((uni, index) => (
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
              Get Expert German Academic Support
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              Join hundreds of German scholars who have achieved academic success
              with our expert support.
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