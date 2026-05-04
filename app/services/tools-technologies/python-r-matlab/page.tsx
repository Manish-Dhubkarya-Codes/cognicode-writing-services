import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Code, Terminal, Zap, Eye, GitBranch, FileText, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Python, R, MATLAB | CogniCode",
  description: "Expert advanced programming and scripting in Python, R, and MATLAB for PhD research. Data analysis, statistical modeling, simulations, algorithm development, and reproducible research workflows.",
};

const techniques = [
  { title: "Python Programming", desc: "Advanced data analysis, machine learning, automation, and scientific computing with Pandas, NumPy, SciPy, and scikit-learn" },
  { title: "R Programming", desc: "Statistical computing, data visualization, reproducible research with R Markdown, and advanced modeling using tidyverse" },
  { title: "MATLAB Programming", desc: "Mathematical modeling, simulations, algorithm development, and matrix-based computations for engineering and scientific research" },
  { title: "Cross-Language Integration", desc: "Seamless workflows combining Python, R, and MATLAB for maximum flexibility and reproducibility" },
];

const deliverables = [
  "Fully functional, well-documented scripts and notebooks in Python, R, and MATLAB",
  "Reproducible research pipelines with version control",
  "Custom algorithms and simulation models tailored to your research",
  "Publication-ready code, visualizations, and methodology documentation",
  "Git repository with clean, commented, and production-ready code",
  "Interactive notebooks (Jupyter, R Markdown, MATLAB Live Scripts)",
  "Performance optimization and benchmarking reports",
  "One-to-one training session + 6 months of free code updates and support",
];

const steps = [
  {
    step: "01",
    title: "Requirement Analysis & Tool Selection",
    desc: "Understand your research goals and recommend the best combination of Python, R, and MATLAB.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Environment Setup & Configuration",
    desc: "Set up complete development environments, packages, and reproducible workflows.",
    icon: Terminal,
  },
  {
    step: "03",
    title: "Implementation & Development",
    desc: "Write advanced scripts, algorithms, simulations, and analysis pipelines with best practices.",
    icon: Code,
  },
  {
    step: "04",
    title: "Optimization & Delivery",
    desc: "Optimize performance, document code, and deliver fully reproducible research-ready solutions.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level experts in Python, R, and MATLAB",
  "Advanced scientific computing and algorithm development",
  "Reproducible and production-ready research workflows",
  "Seamless integration between all three languages",
  "Support for large-scale simulations and data analysis",
  "Publication-ready code and documentation",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your supervisor approves",
];

export default function PythonRMatlabPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-2 text-sm font-medium text-blue-700 mb-6">
                  <Code className="h-4 w-4" />
                  PYTHON, R, MATLAB
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Python, R &amp; MATLAB
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Advanced programming and scripting in Python, R, and MATLAB for data analysis, statistical modeling, simulations, algorithm development, and reproducible research workflows.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Programming Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Code Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Terminal className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">Reproducible</p>
                        <p className="text-sm opacity-75">Research Code</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-cyan-200">
{`# Python / R / MATLAB
import numpy as np
df = pd.read_csv("data.csv")`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">Python • R • MATLAB • Ready for thesis &amp; publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Techniques */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Programming Tools We Master</h2>
              <p className="mt-3 text-muted-foreground">Professional-grade mastery across all three languages</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techniques.map((tech, i) => (
                <Card key={i} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="font-semibold text-xl mb-3">{tech.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{tech.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-serif text-4xl font-bold">Our Python, R &amp; MATLAB Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">From requirement analysis to publication-ready code</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((s, i) => (
                <div key={i} className="relative text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mb-6">
                    {s.step}
                  </div>
                  <s.icon className="mx-auto h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground px-4">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-4xl font-bold">Everything You Receive</h2>
                <p className="mt-4 text-lg text-muted-foreground">Complete, reproducible programming solutions.</p>
                <ul className="mt-10 space-y-6">
                  {deliverables.map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-7">
                <Card className="shadow-xl">
                  <CardContent className="p-10">
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <GitBranch className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Version-Controlled Code</p>
                            <p className="text-sm text-muted-foreground">Git + reproducible scripts</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Documentation</p>
                            <p className="text-sm text-muted-foreground">Full code explanations</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Interactive Notebooks</p>
                            <p className="text-sm text-muted-foreground">Jupyter + R Markdown + MATLAB Live</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Support</p>
                            <p className="text-sm text-muted-foreground">Clean, documented code</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl font-bold">Why Researchers Choose Our Python, R &amp; MATLAB Service</h2>
                <ul className="mt-10 space-y-6">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-4">
                      <CheckCircle className="h-6 w-6 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="bg-white text-foreground">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-2">Get Your Programming Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your research needs and we’ll provide a detailed implementation plan within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your Python, R, or MATLAB programming requirements" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <Button className="w-full h-14 text-base" size="lg">Request Detailed Proposal</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">Ready to Master Python, R &amp; MATLAB?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From data analysis to advanced simulations : we deliver professional, reproducible programming solutions for your research.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Programming Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services/data-driven/tools-technologies">Back to Tools &amp; Technologies</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}