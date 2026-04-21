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
  title: "US Academic Writing Support | CogniCode",
  description:
    "Professional academic writing support for US universities. Expert guidance for doctoral dissertations, research papers, and thesis aligned with American academic standards.",
};

const usServices = [
  {
    icon: GraduationCap,
    title: "Doctoral Dissertation",
    description:
      "Comprehensive dissertation support for PhD and EdD programs following US university guidelines.",
  },
  {
    icon: FileText,
    title: "Research Papers",
    description:
      "Research paper writing with proper APA, MLA, or Chicago citation styles as required.",
  },
  {
    icon: BookOpen,
    title: "Thesis Support",
    description:
      "Master's and doctoral thesis writing assistance aligned with American academic conventions.",
  },
  {
    icon: PenTool,
    title: "Capstone Projects",
    description:
      "Support for capstone projects, comprehensive exams, and qualifying papers.",
  },
  {
    icon: Award,
    title: "Grant Proposals",
    description:
      "Research grant and funding proposal writing for NIH, NSF, and other agencies.",
  },
  {
    icon: FileText,
    title: "IRB Documentation",
    description:
      "Help with Institutional Review Board applications and research ethics documentation.",
  },
];

const usUniversities = [
  "MIT",
  "Stanford University",
  "Harvard University",
  "Yale University",
  "Princeton University",
  "Columbia University",
  "University of Chicago",
  "UC Berkeley",
  "UCLA",
  "University of Michigan",
  "NYU",
  "Duke University",
];

const usFeatures = [
  "American English writing standards",
  "APA, MLA, Chicago, Turabian formatting",
  "Understanding of US degree requirements",
  "IRB and ethics compliance knowledge",
  "Familiarity with US dissertation committees",
  "Support for online/distance programs",
  "Knowledge of US academic calendar",
  "Turnitin and iThenticate verification",
];

export default function USPage() {
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
                  <span className="text-5xl">🇺🇸</span>
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                    United States
                  </p>
                </div>
                <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Academic Writing Support for US Scholars
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Expert academic support designed for American universities.
                  From Ivy League to state schools, we understand US academic
                  requirements and help scholars achieve their research goals.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/contact">Get US Support</Link>
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
                        <p className="text-3xl font-bold">300+</p>
                        <p className="text-sm text-primary-foreground/80">
                          US Projects Completed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">40+</p>
                      <p className="text-sm text-muted-foreground">
                        US Universities
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">EST/PST</p>
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
                Our US Academic Services
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Comprehensive academic support designed for American university
                requirements.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {usServices.map((service, index) => (
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

        {/* Why US Scholars Choose Us */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Why US Scholars Choose Us
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our team is well-versed in American academic conventions and
                  university requirements.
                </p>
                <ul className="mt-8 space-y-3">
                  {usFeatures.map((feature, index) => (
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
                  <div className="grid grid-cols-2 gap-2">
                    {usUniversities.map((uni, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <GraduationCap className="h-4 w-4 text-primary" />
                        {uni}
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    And many more US universities...
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
              Get Expert US Academic Support
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              Join hundreds of US scholars who have achieved academic success
              with our expert support.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get Free Consultation</Link>
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
