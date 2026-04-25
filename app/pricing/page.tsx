import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Check,
  X,
  ArrowRight,
  Clock,
  Headphones,
  FileText,
  BarChart3,
  Users,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | CogniCode",
  description:
    "Flexible pricing plans for academic writing support services. Choose the plan that fits your needs and budget.",
};

const plans = [
  {
    name: "Basic",
    subtitle: "Free Starter Consultation",
    description:
      "Get started at no cost. Discuss your project, explore topics, and understand how we can help — completely free.",
    price: "Free",
    priceNote: "no commitment",
    featured: false,
    badge: "Start Here",
    ctaLabel: "Book Free Call",
    features: [
      { name: "Free first consultation call", included: true },
      { name: "Research topic selection guidance", included: true },
      { name: "Initial work & requirement discussion", included: true },
      { name: "Project scope & feasibility review", included: true },
      { name: "Preliminary advice from experts", included: true },
      { name: "Custom quote & plan recommendation", included: true },
      { name: "WhatsApp & email query support", included: true },
      { name: "No obligation to purchase", included: true },
      { name: "Content writing & delivery", included: false },
      { name: "Data analysis & methodology", included: false },
      { name: "Plagiarism report (Turnitin)", included: false },
      { name: "Revisions & formatting", included: false },
      { name: "Dedicated mentor", included: false },
    ],
  },
  {
    name: "Standard",
    subtitle: "Essential Academic Support",
    description:
      "Budget-friendly writing support with essential features for basic academic needs.",
    price: "Contact",
    priceNote: "for custom quote",
    featured: false,
    ctaLabel: "Get Started",
    features: [
      { name: "Standard delivery timeline", included: true },
      { name: "Email & WhatsApp support", included: true },
      { name: "1 consultation call", included: true },
      { name: "1 round of revisions", included: true },
      { name: "Basic data analysis theory", included: true },
      { name: "Basic methodology write-up", included: true },
      { name: "General content approach", included: true },
      { name: "Standard university format", included: true },
      { name: "Academic writers", included: true },
      { name: "Plagiarism report (Turnitin)", included: true },
      { name: "Priority support", included: false },
      { name: "Multiple revision rounds", included: false },
      { name: "Advanced statistical analysis", included: false },
      { name: "Dedicated mentor", included: false },
    ],
  },
  {
    name: "Premium",
    subtitle: "High-Impact Expert-Guided Research",
    description:
      "Advanced expert-led research support for journals, dissertations, and PhD scholars.",
    price: "Contact",
    priceNote: "for custom quote",
    featured: true,
    badge: "Most Popular",
    ctaLabel: "Get Started",
    features: [
      { name: "Fast-track & urgent delivery", included: true },
      { name: "Priority support 24/7", included: true },
      { name: "3 Zoom consultation calls", included: true },
      { name: "Up to 3 revision rounds", included: true },
      { name: "SPSS/R analysis with visuals", included: true },
      { name: "Genuine research methodology", included: true },
      { name: "Fully customized content", included: true },
      { name: "Supervisor-aligned formatting", included: true },
      { name: "Senior expert writers", included: true },
      { name: "Full plagiarism & AI report", included: true },
      { name: "Priority support", included: true },
      { name: "Multiple revision rounds", included: true },
      { name: "Advanced statistical analysis", included: true },
      { name: "Dedicated mentor", included: true },
    ],
  },
];

const features = [
  {
    name: "Flexible Deadlines",
    description: "Choose your delivery timeline based on your schedule.",
    icon: Clock,
  },
  {
    name: "Expert Writers",
    description: "PhD-qualified writers with domain expertise.",
    icon: Users,
  },
  {
    name: "24/7 Support",
    description: "Round-the-clock assistance for all your queries.",
    icon: Headphones,
  },
  {
    name: "Quality Assured",
    description: "Rigorous quality checks at every stage.",
    icon: Shield,
  },
  {
    name: "Original Content",
    description: "100% plagiarism-free work with reports.",
    icon: FileText,
  },
  {
    name: "Data Analysis",
    description: "Statistical analysis using industry tools.",
    icon: BarChart3,
  },
];

const faqs = [
  {
    question: "Is the Basic plan really free?",
    answer:
      "Yes, completely free with no obligation. The Basic plan is our way of helping you get started — we'll discuss your project, help you shape your topic, and recommend the best path forward. You only pay if you decide to move ahead with Standard or Premium.",
  },
  {
    question: "How is the pricing determined?",
    answer:
      "Pricing depends on factors such as project type, academic level, complexity, word count, and deadline. Contact us for a personalized quote based on your specific requirements.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes, we offer flexible payment options. You can pay in installments for larger projects. Contact our team to discuss payment plans that work for you.",
  },
  {
    question: "What if I need revisions?",
    answer:
      "Revisions are included in Standard and Premium plans. Standard includes 1 revision round, while Premium includes up to 3 revision rounds to ensure your complete satisfaction.",
  },
  {
    question: "Can I upgrade my plan mid-project?",
    answer:
      "Yes, you can upgrade from Basic to Standard, or Standard to Premium at any point. We'll adjust the pricing and services accordingly.",
  },
];

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-foreground py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-background sm:text-5xl">
                Flexible Pricing Plans
              </h1>
              <p className="mt-6 text-lg leading-8 text-background/70">
                Start with a free consultation, then choose a plan that matches
                your academic goals and budget. Transparent pricing, no hidden fees.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-6xl lg:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`flex flex-col justify-between rounded-3xl p-8 ring-1 ${
                    plan.featured
                      ? "bg-foreground text-background ring-foreground"
                      : "bg-card ring-border"
                  }`}
                >
                  <div>
                    {plan.badge && (
                      <p
                        className={`mb-4 inline-flex rounded-full px-4 py-1 text-xs font-semibold ${
                          plan.featured
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {plan.badge}
                      </p>
                    )}
                    <h3
                      className={`font-serif text-2xl font-bold ${
                        plan.featured ? "text-background" : "text-foreground"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`mt-1 text-sm font-medium ${
                        plan.featured ? "text-primary" : "text-primary"
                      }`}
                    >
                      {plan.subtitle}
                    </p>
                    <p
                      className={`mt-4 text-sm leading-6 ${
                        plan.featured
                          ? "text-background/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {plan.description}
                    </p>
                    <p className="mt-6 flex items-baseline gap-x-2">
                      <span
                        className={`text-4xl font-bold tracking-tight ${
                          plan.featured ? "text-background" : "text-foreground"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`text-sm ${
                          plan.featured
                            ? "text-background/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {plan.priceNote}
                      </span>
                    </p>
                    <ul className="mt-8 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature.name} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check
                              className={`h-5 w-5 flex-shrink-0 ${
                                plan.featured ? "text-primary" : "text-primary"
                              }`}
                            />
                          ) : (
                            <X
                              className={`h-5 w-5 flex-shrink-0 ${
                                plan.featured
                                  ? "text-background/40"
                                  : "text-muted-foreground/40"
                              }`}
                            />
                          )}
                          <span
                            className={`text-sm ${
                              feature.included
                                ? plan.featured
                                  ? "text-background"
                                  : "text-foreground"
                                : plan.featured
                                ? "text-background/40"
                                : "text-muted-foreground/40"
                            }`}
                          >
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    size="lg"
                    className={`mt-8 w-full ${
                      plan.featured
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-foreground hover:bg-foreground/90"
                    }`}
                    asChild
                  >
                    <Link href="/contact">
                      {plan.ctaLabel ?? "Get Started"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What's Included in Every Plan
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                All our plans come with these essential features to ensure your
                success.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {feature.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Pricing FAQs
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Common questions about our pricing and plans.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-3xl">
              <dl className="space-y-8">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-lg bg-card p-6 ring-1 ring-border"
                  >
                    <dt className="text-lg font-semibold text-foreground">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 text-muted-foreground">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Get a Custom Quote
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
                Every project is unique. Contact us to discuss your
                requirements and get a personalized quote.
              </p>
              <div className="mt-10">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Request a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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