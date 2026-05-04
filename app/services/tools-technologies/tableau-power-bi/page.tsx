import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Monitor, BarChart3, Palette, Zap, Eye, GitBranch, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Tableau, Power BI | CogniCode",
  description: "Expert interactive data visualization and business intelligence dashboard development using Tableau and Power BI : creating publication-ready reports, real-time analytics, and compelling data storytelling for PhD research.",
};

const techniques = [
  { title: "Tableau Mastery", desc: "Advanced dashboards, calculated fields, parameters, LOD expressions, and story creation" },
  { title: "Power BI Expertise", desc: "DAX formulas, Power Query, data modeling, interactive visuals, and real-time streaming" },
  { title: "Interactive Dashboards", desc: "Drill-down, cross-filtering, tooltips, bookmarks, and dynamic user experiences" },
  { title: "Publication & Storytelling", desc: "Executive-level reports, animated visuals, and data storytelling for academic and industry use" },
];

const deliverables = [
  "Fully interactive, professional Tableau and Power BI dashboards",
  "Publication-ready static and dynamic visualizations",
  "Reproducible data models and DAX/calculated field documentation",
  "Embedded or standalone dashboard solutions",
  "Detailed methodology chapter ready for thesis and journal submission",
  "Git repository with version-controlled dashboard files and data sources",
  "High-resolution export-ready figures and infographics",
  "One-to-one training session + 6 months of free dashboard updates",
];

const steps = [
  {
    step: "01",
    title: "Requirements & Data Analysis",
    desc: "Understand your data, audience, and storytelling goals to design the optimal dashboard structure.",
    icon: Monitor,
  },
  {
    step: "02",
    title: "Data Modeling & Preparation",
    desc: "Build robust data models, relationships, and calculations in Tableau or Power BI.",
    icon: BarChart3,
  },
  {
    step: "03",
    title: "Dashboard Design & Interactivity",
    desc: "Create visually compelling, interactive dashboards with best practices in data visualization.",
    icon: Palette,
  },
  {
    step: "04",
    title: "Review, Polish & Delivery",
    desc: "Finalize design, ensure accessibility, and deliver publication-ready dashboards with documentation.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level data visualization and BI specialists",
  "Deep expertise in both Tableau and Power BI",
  "Publication-quality and interactive dashboards",
  "Strong focus on clarity, storytelling, and audience engagement",
  "Support for complex, large-scale, and real-time data sources",
  "Fully maintainable and reproducible dashboard solutions",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your supervisor or journal approves",
];

export default function TableauPowerBIPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-teal-50 via-cyan-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-600/10 px-4 py-2 text-sm font-medium text-teal-700 mb-6">
                  <Monitor className="h-4 w-4" />
                  TABLEAU, POWER BI
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Tableau &amp; Power BI
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Interactive data visualization and business intelligence dashboards using Tableau and Power BI : creating publication-ready reports, real-time analytics, and compelling data storytelling.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Build Your Dashboard</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Dashboard Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <BarChart3 className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">Insightful</p>
                        <p className="text-sm opacity-75">Dashboards</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-teal-200">
{`// Tableau / Power BI
SUM(Sales) by Region`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">Tableau • Power BI • Interactive • Ready for thesis &amp; publication</p>
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
              <h2 className="font-serif text-4xl font-bold">Tableau &amp; Power BI Capabilities We Master</h2>
              <p className="mt-3 text-muted-foreground">Professional business intelligence and data storytelling</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Tableau &amp; Power BI Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">From data to compelling visual stories</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, visually powerful dashboard solution.</p>
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
                            <p className="font-semibold">Professional Dashboards</p>
                            <p className="text-sm text-muted-foreground">Tableau + Power BI files</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Visuals</p>
                            <p className="text-sm text-muted-foreground">High-resolution &amp; formatted</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Interactive Experience</p>
                            <p className="text-sm text-muted-foreground">Filters, drill-down &amp; more</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Quality</p>
                            <p className="text-sm text-muted-foreground">Journal &amp; presentation ready</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our Tableau &amp; Power BI Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Visualization Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your data and dashboard needs : receive a detailed proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your Tableau / Power BI dashboard requirements" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready to Create Powerful Dashboards?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From insightful charts to interactive business intelligence dashboards : we make your data visually compelling and publication-ready.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Dashboard Project</Link>
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