'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, BarChart3, Calculator, TrendingUp, Layers, Zap, Sparkles, GitBranch, FileText, Eye, ZoomIn, X } from "lucide-react";

const techniques = [
  {
    title: "Data Cleaning & Preparation",
    desc: "Missing value handling, outlier detection, data transformation (recode/compute), normalization, and dataset structuring.",
    img: "/data-driven-services/sa-da/spss/data-cleaning-preparation.png"
  },
  {
    title: "Descriptive Statistics & EDA",
    desc: "Mean, median, standard deviation, frequency analysis, distribution plots, and exploratory data analysis.",
    img: "/data-driven-services/sa-da/spss/descriptive-statistics-eda.png"
  },
  {
    title: "Hypothesis Testing",
    desc: "t-test, ANOVA, chi-square, and non-parametric tests with proper p-value interpretation and significance validation.",
    img: "/data-driven-services/sa-da/spss/hypothesis-testing.png"
  },
  {
    title: "Correlation & Regression Modeling",
    desc: "Pearson correlation, linear & multiple regression, logistic regression, and model evaluation (R², assumptions).",
    img: "/data-driven-services/sa-da/spss/correlation-regression-modeling.png"
  },
  {
    title: "Factor Analysis & Reliability",
    desc: "Exploratory Factor Analysis (EFA), KMO & Bartlett’s test, and Cronbach’s Alpha for scale validation.",
    img: "/data-driven-services/sa-da/spss/factor-analysis-reliability.png"
  },
  {
    title: "Advanced Statistical Modeling",
    desc: "Cluster analysis, discriminant analysis, PCA, and predictive statistical modeling using SPSS.",
    img: "/data-driven-services/sa-da/spss/advanced-statistical-modeling.png"
  },
  {
    title: "Statistical Interpretation & Reporting",
    desc: "Clear explanation of outputs, hypothesis acceptance/rejection, APA-formatted tables, and business/research insights.",
    img: "/data-driven-services/sa-da/spss/statistical-interpretation-reporting.png"
  },
  {
    title: "Assumption Testing & Diagnostics",
    desc: "Normality, multicollinearity (VIF), homoscedasticity, and model validation checks for accurate results.",
    img: "/data-driven-services/sa-da/spss/assumption-testing-diagnostics.png"
  },
  {
    title: "SPSS Syntax & Automation",
    desc: "Reusable syntax scripts, macro automation, reproducible workflows, and efficient large-scale data analysis.",
    img: "/data-driven-services/sa-da/spss/spss-syntax-automation.png"
  },
];

const deliverables = [
  "Cleaned dataset and fully reproducible SPSS output files",
  "Complete SPSS syntax files with detailed comments",
  "Publication-ready tables and high-quality charts/graphs",
  "Comprehensive statistical interpretation report",
  "Assumption checks and diagnostic test results",
  "APA 7th edition formatted results section",
  "One-to-one explanation session via Zoom",
  "6 months of free post-delivery support & revisions",
];

const steps = [
  {
    step: "01",
    title: "Research Objective Review",
    desc: "Understand your hypotheses, variables, and research questions to recommend the best statistical approach.",
    icon: Eye,
  },
  {
    step: "02",
    title: "Data Preparation",
    desc: "Data cleaning, coding, transformation, handling missing values, and creating analysis-ready files.",
    icon: Calculator,
  },
  {
    step: "03",
    title: "Statistical Analysis",
    desc: "Run all required tests using SPSS with syntax and detailed output interpretation.",
    icon: BarChart3,
  },
  {
    step: "04",
    title: "Results & Delivery",
    desc: "Deliver publication-ready outputs, interpretation, and methodology documentation.",
    icon: Zap,
  },
];

const benefits = [
  "PhD-level statisticians with 10+ years SPSS expertise",
  "Full support for theses, dissertations, and journal publications",
  "Expertise in SPSS, AMOS, and SmartPLS integration",
  "APA 7th edition & journal-specific formatting",
  "Clear interpretation and defense-ready explanations",
  "100% reproducible analysis with syntax files",
  "Fast turnaround with strict quality control",
  "Free revisions until supervisor approval",
];

export default function SPSSAnalysisPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Lightweight scroll lock – only prevents background scrolling
  useEffect(() => {
    if (selectedImage !== null) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'visible';
    }
  }, [selectedImage]);

  // ESC key support
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-4 py-2 text-sm font-medium text-indigo-700 mb-6">
                  <BarChart3 className="h-4 w-4" />
                  SPSS ANALYSIS
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Expert SPSS<br />Statistical Analysis
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Professional data analysis using SPSS for PhD research, theses, dissertations, 
                  and academic publications. From basic tests to advanced multivariate modeling.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start SPSS Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View SPSS Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-indigo-700 via-blue-700 to-cyan-700 text-white shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/10 rounded-2xl">
                          <Calculator className="h-10 w-10" />
                        </div>
                        <div>
                          <p className="text-sm opacity-75">Analysis Accuracy</p>
                          <p className="text-5xl font-bold tracking-tighter">100%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-2xl p-6 mb-6 font-mono text-sm">
                      <div className="text-cyan-300 mb-2">SPSS Syntax Example</div>
                      <pre className="text-white/90 text-xs leading-relaxed overflow-auto">
{`REGRESSION
  /DEPENDENT outcome
  /METHOD=ENTER predictor1 predictor2
  /STATISTICS=COEFF R ANOVA.`}
                      </pre>
                    </div>

                    <div className="flex items-center justify-between text-sm opacity-90">
                      <div>SPSS • AMOS • Syntax • APA Ready</div>
                      <div className="text-cyan-300 font-medium">Publication Grade</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">SPSS Analysis Services We Provide</h2>
              <p className="mt-3 text-muted-foreground">From basic statistics to advanced multivariate techniques</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 group-hover:border-transparent transition-colors duration-300 m-2`} />
                    <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:${theme.border.replace('hover:', '')} transition-colors duration-300 m-2`} />
                    <div className={`absolute left-0 top-0 w-1 h-0 ${theme.bar} group-hover:h-full transition-all duration-500 ease-out`} />

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

                    <div className="pl-4 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out mt-0 group-hover:mt-5">
                      <div 
                        className="overflow-hidden relative bg-gray-900 group-hover:bg-transparent transition-colors duration-500 cursor-zoom-in"
                        onClick={() => tech.img && setSelectedImage(i)}
                      >
                        {tech.img ? (
                          <img
                            src={tech.img}
                            alt={tech.title}
                            className="w-full h-auto object-cover origin-top scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-500 ease-out"
                          />
                        ) : (
                          <BarChart3 className="w-full h-52 text-gray-700 opacity-50" />
                        )}

                        {tech.img && (
                          <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(i);
                              }}
                              className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-2xl backdrop-blur-md shadow-xl border border-white/20 transition-transform hover:scale-105"
                              title="View full image"
                            >
                              <ZoomIn className="h-5 w-5" />
                            </button>
                          </div>
                        )}

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

        <section className="py-16 md:py-24 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-serif text-4xl font-bold">Our SPSS Analysis Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Structured, transparent, and publication-focused process</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, ready-to-submit SPSS analysis package.</p>
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
                            <p className="font-semibold">SPSS Syntax Files</p>
                            <p className="text-sm text-muted-foreground">Fully commented & reproducible</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">APA Formatted Output</p>
                            <p className="text-sm text-muted-foreground">Tables & interpretation</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Visual Reports</p>
                            <p className="text-sm text-muted-foreground">Charts & diagnostics</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Defense Ready</p>
                            <p className="text-sm text-muted-foreground">Clear explanations</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our SPSS Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your SPSS Analysis Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your research topic and dataset : receive a detailed proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your research area, variables, hypotheses, and required statistical tests" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <Button className="w-full h-14 text-base" size="lg">Request Detailed Proposal</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">Ready for Professional SPSS Analysis?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">Get accurate, publication-ready statistical results with full academic support.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your SPSS Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services/statistical-analysis-data-analytics">Back to Statistical Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-[9999] bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-[8px] backdrop-saturate-200 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-[95vw] max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 z-50 bg-black/20 hover:bg-black/30 backdrop-blur-2xl text-white border cursor-pointer border-white/30 rounded-2xl p-3 shadow-2xl transition-all hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>

              <img
                src={techniques[selectedImage].img}
                alt={techniques[selectedImage].title}
                className="max-h-[90vh] max-w-full object-contain rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}