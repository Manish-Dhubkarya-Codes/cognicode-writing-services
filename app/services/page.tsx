import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  Search,
  PenTool,
  BarChart3,
  Shield,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  FileCheck,
  Edit3,
  Globe,
} from "lucide-react";

import Thesis from "../../public/Services/Thesis.png"
import Research_Paper from "../../public/Services/Research_Paper.jpg"
import Image from "next/image";

export const metadata: Metadata = {
  title: "Services | CogniCode",
  description:
    "Explore our comprehensive academic writing services including thesis writing, research papers, data analysis, and more.",
};

const mainServices = [
  {
    id: "thesis",
    name: "Thesis Writing Support",
    description:
      "Comprehensive thesis writing assistance from topic selection to final submission. Our PhD experts guide you through every chapter, ensuring your thesis meets the highest academic standards.",
    icon: BookOpen,
    image: Thesis,
    features: [
      "Topic selection and refinement",
      "Chapter-by-chapter guidance",
      "Research methodology support",
      "Literature review assistance",
      "Formatting and citation help",
      "Revision and editing support",
    ],
  },
  {
    id: "research",
    name: "Research Paper Writing",
    description:
      "High-quality research papers crafted by subject matter experts. Perfect for journal publications, academic conferences, and course requirements.",
    icon: FileText,
    image: Research_Paper,
    features: [
      "Original research development",
      "Journal-ready formatting",
      "Abstract and keywords optimization",
      "Reference management",
      "Peer review preparation",
      "Publication strategy guidance",
    ],
  },
  {
    id: "dissertation",
    name: "Dissertation Support",
    description:
      "End-to-end dissertation support for doctoral candidates. We help you navigate the complex process of completing your doctoral research.",
    icon: GraduationCap,
    image: Thesis,
    features: [
      "Proposal development",
      "Research design consultation",
      "Data collection support",
      "Analysis and interpretation",
      "Defense preparation",
      "Post-defense revisions",
    ],
  },
  {
    id: "literature",
    name: "Literature Review",
    description:
      "In-depth literature reviews that critically analyze existing research and identify gaps in your field of study. Essential for establishing your research foundation.",
    icon: Search,
    image: Thesis,
    features: [
      "Comprehensive source identification",
      "Critical analysis and synthesis",
      "Gap identification",
      "Theoretical framework development",
      "Citation management",
      "Visual mapping of literature",
    ],
  },
  {
    id: "synopsis",
    name: "Synopsis Writing",
    description:
      "Well-structured research proposals and synopsis writing to get quick university approval for your research projects.",
    icon: PenTool,
    image: Thesis,
    features: [
      "Problem statement formulation",
      "Research objectives alignment",
      "Methodology justification",
      "Timeline development",
      "Budget planning support",
      "University format compliance",
    ],
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    description:
      "Expert statistical analysis using SPSS, R, Python, and other tools. We help interpret your data meaningfully and present results effectively.",
    icon: BarChart3,
    image: Thesis,
    features: [
      "Statistical test selection",
      "SPSS, R, Python analysis",
      "Data visualization",
      "Results interpretation",
      "Findings presentation",
      "Methodology write-up",
    ],
  },
  {
    id: "plagiarism",
    name: "Plagiarism Removal",
    description:
      "Thorough plagiarism checking and removal services to ensure your work is 100% original and publication-ready.",
    icon: Shield,
    image: Thesis,
    features: [
      "Turnitin similarity check",
      "AI detection screening",
      "Content rewriting",
      "Paraphrasing assistance",
      "Citation correction",
      "Final originality report",
    ],
  },
  {
    id: "editing",
    name: "Editing & Proofreading",
    description:
      "Professional academic editing and proofreading services to polish your work before submission.",
    icon: Edit3,
    image: Thesis,
    features: [
      "Grammar and spelling correction",
      "Style and clarity enhancement",
      "Structural improvements",
      "Academic tone refinement",
      "Consistency checking",
      "Format verification",
    ],
  },
];

const additionalServices = [
  {
    name: "Book Writing Support",
    description: "Assistance with academic book writing and publication.",
    icon: BookOpen,
  },
  {
    name: "Journal Selection",
    description: "Help finding the right journals for your research.",
    icon: FileCheck,
  },
  {
    name: "Conference Papers",
    description: "Preparation of papers for academic conferences.",
    icon: Globe,
  },
  {
    name: "Grant Proposals",
    description: "Writing compelling grant and funding proposals.",
    icon: PenTool,
  },
];

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-foreground py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-background sm:text-5xl">
                Our Services
              </h1>
              <p className="mt-6 text-lg leading-8 text-background/70">
                Comprehensive academic writing support services tailored to your
                specific needs. From thesis writing to data analysis, we have
                you covered.
              </p>
            </div>
          </div>
        </section>

        {/* Main Services */}
        <section className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {mainServices.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className={`flex flex-col gap-12 lg:flex-row lg:items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                        <service.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                        {service.name}
                      </h2>
                    </div>
                    <p className="text-lg leading-8 text-muted-foreground">
                      {service.description}
                    </p>
                    <ul className="mt-8 space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button asChild>
                        <Link href="/contact">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex aspect-4/4 items-center justify-center rounded-lg bg-primary overflow-hidden">
  {service.image ? (
    <Image
      src={service.image}
      alt={service.name}
      className="h-full w-full object-contain"
    />
  ) : (
    <service.icon className="h-6 w-6 text-primary-foreground" />
  )}
</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="bg-muted py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Additional Services
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Beyond our core offerings, we provide specialized support for
                various academic needs.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4">
              {additionalServices.map((service) => (
                <div
                  key={service.name}
                  className="flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-foreground">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Need a Custom Solution?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
                Our services can be tailored to meet your specific academic
                requirements. Contact us to discuss your unique needs.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-transparent border-primary-foreground/30 text-black hover:bg-primary-foreground/10"
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
