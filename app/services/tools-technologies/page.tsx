import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Code, BarChart3, Brain, Monitor } from "lucide-react";

export const metadata: Metadata = {
  title: "Tools & Technologies | CogniCode",
  description: "Expert implementation and training in Python, R, MATLAB, SPSS, STATA, TensorFlow, PyTorch, Tableau, and Power BI : professional tool mastery for data science, statistical analysis, machine learning, and research projects.",
};

const features = [
  {
    icon: Code,
    title: "Python, R, MATLAB",
    description: "Advanced programming and scripting in Python, R, and MATLAB for data analysis, statistical modeling, simulations, algorithm development, and reproducible research workflows.",
    href: "/services/tools-technologies/python-r-matlab"
  },
  {
    icon: BarChart3,
    title: "SPSS, STATA",
    description: "Professional statistical analysis using SPSS and STATA : from data management and descriptive statistics to complex econometric modeling and hypothesis testing.",
    href: "/services/tools-technologies/spss-stata"
  },
  {
    icon: Brain,
    title: "TensorFlow, PyTorch",
    description: "Deep learning and machine learning model development with TensorFlow and PyTorch : including custom architectures, training pipelines, transfer learning, and model optimization.",
    href: "/services/tools-technologies/tensorflow-pytorch"
  },
  {
    icon: Monitor,
    title: "Tableau, Power BI",
    description: "Interactive data visualization and business intelligence dashboards using Tableau and Power BI : creating publication-ready reports, real-time analytics, and compelling data storytelling.",
    href: "/services/tools-technologies/tableau-power-bi"
  },
];

const steps = [
  {
    step: "01",
    title: "Tool Selection & Requirement Analysis",
    description: "We analyze your research needs and recommend the most suitable tools and technologies from our extensive stack.",
  },
  {
    step: "02",
    title: "Environment Setup & Configuration",
    description: "Complete setup of development environments, libraries, packages, and cloud infrastructure tailored to your project.",
  },
  {
    step: "03",
    title: "Implementation & Development",
    description: "Expert coding, modeling, analysis, and dashboard creation using the selected tools with best practices and clean code.",
  },
  {
    step: "04",
    title: "Optimization, Training & Delivery",
    description: "Performance optimization, documentation, training sessions, and final delivery of fully functional, reproducible solutions.",
  },
];

const benefits = [
  "PhD-level experts in all major research tools",
  "Python, R, MATLAB, SPSS, STATA mastery",
  "TensorFlow & PyTorch deep learning expertise",
  "Tableau & Power BI dashboard specialists",
  "End-to-end tool integration and automation",
  "Publication-ready code, models & visualizations",
  "Comprehensive documentation and training",
  "Post-delivery support and tool upgrades",
];

export default function ServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Tools & Technologies</p>
                <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Tools & Technologies Research Support
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Master every essential tool in the data science and research ecosystem : from Python &amp; R to TensorFlow, PyTorch, Tableau, and Power BI.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/contact">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Code className="h-12 w-12" />
                      <div>
                        <p className="text-3xl font-bold">600+</p>
                        <p className="text-sm text-primary-foreground/80">Tool Implementation Projects</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">25+</p>
                      <p className="text-sm text-muted-foreground">Industry-Standard Tools</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">100%</p>
                      <p className="text-sm text-muted-foreground">Reproducible Results</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="bg-primary py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {[
                { icon: Shield, text: "Original Research" },
                { icon: Clock, text: "On-Time Delivery" },
                { icon: Users, text: "Tool Experts" },
                { icon: Award, text: "Fully Documented" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-primary-foreground">
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Deliver - Clickable Cards */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What We Deliver in Tools &amp; Technologies
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Click on any service below to explore detailed offerings
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {features.map((f, i) => (
                <Link key={i} href={f.href} className="block group">
                  <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 h-full group-hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <f.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3>
                      <p className="mt-2 text-muted-foreground">{f.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Tools &amp; Technologies Workflow
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From tool selection to final delivery : a structured approach ensuring maximum efficiency and quality.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {s.step}
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us + Form */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Why Choose Our Tools &amp; Technologies Service?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  We don’t just use these tools : we master them and teach you how to leverage them for successful research outcomes.
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground">Get a Free Tools &amp; Technologies Consultation</h3>
                  <p className="mt-2 text-muted-foreground">Tell us which tools you need and we’ll provide a detailed implementation plan.</p>
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
                      <option value="">Select Tool / Technology</option>
                      <option value="python-r-matlab">Python, R, MATLAB</option>
                      <option value="spss-stata">SPSS, STATA</option>
                      <option value="tensorflow-pytorch">TensorFlow, PyTorch</option>
                      <option value="tableau-powerbi">Tableau, Power BI</option>
                      <option value="other">Other Tools</option>
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

        {/* Final CTA */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-black sm:text-4xl">
              Need Expert Tools &amp; Technologies Support?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              From Python to Power BI : our specialists help you master every tool required for cutting-edge research.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get Started</Link>
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