import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, MapPin, Users, Award, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Global Academic Support | CogniCodeWrite",
  description:
    "CogniCodeWrite provides academic research writing support to scholars across the globe - UK, USA, UAE, and more.",
};

const regions = [
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    href: "/global/uk",
    description:
      "Expert support for UK university requirements, British academic standards, and UK-specific formatting guidelines.",
    services: [
      "PhD Thesis Support",
      "Dissertation Writing",
      "Assignment Help",
      "Coursework Support",
    ],
    universities: "Oxford, Cambridge, Imperial, LSE, UCL",
  },
  {
    name: "United States",
    flag: "🇺🇸",
    href: "/global/us",
    description:
      "Academic support aligned with US university standards, APA formatting, and American academic conventions.",
    services: [
      "Doctoral Dissertation",
      "Research Papers",
      "Thesis Support",
      "Capstone Projects",
    ],
    universities: "MIT, Stanford, Harvard, Yale, Princeton",
  },
  {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    href: "/global/uae",
    description:
      "Support for scholars in UAE universities with understanding of regional academic requirements and standards.",
    services: [
      "PhD Research Support",
      "MBA Dissertations",
      "Research Publications",
      "Academic Writing",
    ],
    universities: "UAE University, UAEU, AUS, Khalifa University",
  },
];

const globalStats = [
  { value: "50+", label: "Countries Served" },
  { value: "8,000+", label: "Global Clients" },
  { value: "200+", label: "University Partnerships" },
  { value: "24/7", label: "Global Support" },
];

export default function GlobalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Global Presence
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Academic Support Across the Globe
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                CogniCodeWrite brings trusted academic support to scholars
                worldwide. From India to the UK, USA, UAE, and beyond, we
                understand and cater to diverse university requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Global Stats */}
        <section className="bg-primary py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {globalStats.map((stat, index) => (
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

        {/* Regions */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Global Reach
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Specialized academic support tailored to regional university
                requirements and standards.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {regions.map((region, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <CardHeader className="bg-muted/50 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{region.flag}</span>
                      <CardTitle className="text-xl">{region.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">
                      {region.description}
                    </p>

                    <div className="mt-6">
                      <p className="text-sm font-semibold text-foreground mb-2">
                        Key Services:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {region.services.map((service, idx) => (
                          <span
                            key={idx}
                            className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Top Universities:</span>{" "}
                        {region.universities}
                      </p>
                    </div>

                    <Button className="w-full mt-6" asChild>
                      <Link href={region.href}>
                        Explore {region.name} Support
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Other Regions */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  We Also Serve Scholars From
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our services extend to scholars from various countries,
                  adapting to their specific academic requirements.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {[
                    { country: "Australia", flag: "🇦🇺" },
                    { country: "Canada", flag: "🇨🇦" },
                    { country: "Germany", flag: "🇩🇪" },
                    { country: "Singapore", flag: "🇸🇬" },
                    { country: "Malaysia", flag: "🇲🇾" },
                    { country: "New Zealand", flag: "🇳🇿" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-lg bg-card p-3 shadow-sm"
                    >
                      <span className="text-2xl">{item.flag}</span>
                      <span className="text-sm font-medium text-foreground">
                        {item.country}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <Card>
                <CardContent className="p-8">
                  <MapPin className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground">
                    University Scholars Support
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Specialized support for scholars from specific universities
                    with tailored guidance based on institutional requirements.
                  </p>
                  <Button className="mt-6" variant="outline" asChild>
                    <Link href="/university-support">
                      Explore University Support
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
              Get Academic Support from Anywhere
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              No matter where you are, our team of experts is ready to support
              your academic journey.
            </p>
            <div className="mt-8">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
