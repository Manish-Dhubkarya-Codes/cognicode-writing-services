import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Monitor, BarChart3, Palette, Eye, GitBranch, FileText, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Tableau, Power BI | CogniCode",
  description: "Expert interactive data visualization and business intelligence dashboard development using Tableau and Power BI : creating publication-ready reports, real-time analytics, and compelling data storytelling for PhD research.",
};

const techniques = [
  {
    title: "Tableau Mastery",
    desc: "Advanced dashboards, calculated fields, parameters, LOD expressions, and story creation",
    img: "/data-driven-services/tools-techno/tableau-powerbi/tableau-mastery.png"
  },
  {
    title: "Power BI Expertise",
    desc: "DAX formulas, Power Query, data modeling, interactive visuals, and real-time streaming",
    img: "/data-driven-services/tools-techno/tableau-powerbi/power-bi-expertise.png"
  },
  {
    title: "Interactive Dashboards",
    desc: "Drill-down, cross-filtering, tooltips, bookmarks, and dynamic user experiences",
    img: "/data-driven-services/tools-techno/tableau-powerbi/interactive-dashboards.png"
  },
  {
    title: "Publication & Storytelling",
    desc: "Executive-level reports, animated visuals, and data storytelling for academic and industry use",
    img: "/data-driven-services/tools-techno/tableau-powerbi/publication-storytelling.png"
  }
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
        {/* Hero - unchanged */}
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
                <Card className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-2xl border-0 overflow-hidden">
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

        {/* === FUTURISTIC HIGH-TECH CARDS === */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Tableau &amp; Power BI Services We Provide</h2>
              <p className="mt-3 text-muted-foreground">Professional business intelligence and data storytelling solutions</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techniques.map((tech, i) => {
                const techThemes = [
                  { bg: "bg-slate-100", accent: "text-cyan-500", border: "hover:border-cyan-400", glow: "hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]", bar: "bg-cyan-400" },
                  { bg: "bg-zinc-100", accent: "text-indigo-500", border: "hover:border-indigo-400", glow: "hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]", bar: "bg-indigo-500" },
                  { bg: "bg-neutral-100", accent: "text-emerald-500", border: "hover:border-emerald-400", glow: "hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]", bar: "bg-emerald-400" },
                  { bg: "bg-gray-100", accent: "text-violet-500", border: "hover:border-violet-400", glow: "hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]", bar: "bg-violet-500" },
                ];
                
                const theme = techThemes[i % techThemes.length];

                return (
                  <Card
                    key={i}
                    className={`group relative ${theme.bg} border border-gray-200 ${theme.border} ${theme.glow} rounded-none p-6 cursor-pointer transition-all duration-300 overflow-hidden font-sans`}
                  >
                    {/* Futuristic UI Accents */}
                    <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 group-hover:border-transparent transition-colors duration-300 m-2`} />
                    <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:${theme.border.replace('hover:', '')} transition-colors duration-300 m-2`} />
                    
                    {/* Animated Data Bar */}
                    <div className={`absolute left-0 top-0 w-1 h-0 ${theme.bar} group-hover:h-full transition-all duration-500 ease-out`} />

                    {/* Text Section */}
                    <div className="relative z-10 flex flex-col gap-2 pl-4">
                      <span className={`text-[10px] font-mono font-bold tracking-[0.2em] ${theme.accent} uppercase`}>
                        SYS.MODULE_0{i + 1}
                      </span>
                      <h3 className="font-bold text-xl text-gray-800 tracking-tight flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300 ease-out">
                        {tech.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                        {tech.desc}
                      </p>
                    </div>

                    {/* Image Unfold Animation */}
                    <div className="pl-4 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out mt-0 group-hover:mt-5">
                      <div className="overflow-hidden relative bg-gray-900 group-hover:bg-transparent transition-colors duration-500">
                        <img
                          src={tech.img}
                          alt={tech.title}
                          className="w-full h-auto object-cover origin-top scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-500 ease-out"
                        />
                        {/* Futuristic Overlays */}
                        <div className="absolute inset-0 border border-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300 m-2" />
                        <div className="absolute left-0 w-full h-[2px] bg-white shadow-[0_0_10px_#fff] top-0 opacity-0 group-hover:opacity-100 group-hover:top-[100%] transition-all duration-[1500ms] ease-linear pointer-events-none z-20" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process, Deliverables, Why Choose Us, Final CTA - unchanged */}
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