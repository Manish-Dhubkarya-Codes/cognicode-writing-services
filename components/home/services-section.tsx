import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  Search,
  PenTool,
  BarChart3,
  Shield,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    name: "Thesis Writing Support",
    description:
      "Comprehensive thesis writing assistance from topic selection to final submission. Our experts guide you through every chapter.",
    icon: BookOpen,
    href: "/services#thesis",
  },
  {
    name: "Research Paper Writing",
    description:
      "High-quality research papers crafted by subject matter experts. Perfect for journal publications and academic conferences.",
    icon: FileText,
    href: "/services#research",
  },
  {
    name: "Literature Review",
    description:
      "In-depth literature reviews that critically analyze existing research and identify gaps in your field of study.",
    icon: Search,
    href: "/services#literature",
  },
  {
    name: "Synopsis Writing",
    description:
      "Well-structured research proposals and synopsis writing to get quick university approval for your research.",
    icon: PenTool,
    href: "/services#synopsis",
  },
  {
    name: "Data Analysis",
    description:
      "Expert statistical analysis using SPSS, R, Python, and other tools. We help interpret your data meaningfully.",
    icon: BarChart3,
    href: "/services#data-analysis",
  },
  {
    name: "Plagiarism Removal",
    description:
      "Thorough plagiarism checking and removal services to ensure your work is 100% original and publication-ready.",
    icon: Shield,
    href: "/services#plagiarism",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-background py-24 sm:py-32" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Our Services
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Expert Academic Support Services
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            From thesis writing to data analysis, we offer comprehensive
            academic support services tailored to your specific needs.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {services.map((service) => (
              <div
                key={service.name}
                className="group relative rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <dt className="flex items-center gap-x-4 text-lg font-semibold leading-7 text-foreground">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <service.icon
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  {service.name}
                </dt>
                <dd className="mt-4 text-base leading-7 text-muted-foreground">
                  {service.description}
                </dd>
                <Link
                  href={service.href}
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 flex items-center justify-center">
          <Button size="lg" asChild>
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
