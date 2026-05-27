'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, TrendingUp, Layers, Target, Zap, GitBranch, FileText, Eye, Award, BarChart3, ZoomIn, X } from "lucide-react";

const techniques = [
  {
    title: "Model Specification",
    desc: "Define constructs, indicators, and relationships for reflective and formative measurement models.",
    img: "/data-driven-services/sa-da/smartpls-analysis/model-specification.png"
  },
  {
    title: "Measurement Model Evaluation",
    desc: "Assess reliability and validity using outer loadings, Cronbach’s Alpha, Composite Reliability, and AVE.",
    img: "/data-driven-services/sa-da/smartpls-analysis/measurement-model-evaluation.png"
  },
  {
    title: "Discriminant Validity Testing",
    desc: "Fornell-Larcker criterion, cross-loadings, and HTMT ratio to ensure construct distinctiveness.",
    img: "/data-driven-services/sa-da/smartpls-analysis/discriminant-validity-testing.png"
  },
  {
    title: "Structural Model Evaluation",
    desc: "Evaluate path coefficients, significance (bootstrapping), and hypothesis testing.",
    img: "/data-driven-services/sa-da/smartpls-analysis/structural-model-evaluation.png"
  },
  {
    title: "Collinearity & Model Diagnostics",
    desc: "Check VIF values, detect multicollinearity issues, and ensure model stability.",
    img: "/data-driven-services/sa-da/smartpls-analysis/collinearity-model-diagnostics.png"
  },
  {
    title: "Effect Size & Predictive Power",
    desc: "Assess R², f² effect size, and Q² predictive relevance for model strength.",
    img: "/data-driven-services/sa-da/smartpls-analysis/effect-size-predictive-power.png"
  },
  {
    title: "Bootstrapping & Significance Testing",
    desc: "Run bootstrapping to evaluate significance of paths, indirect effects, and confidence intervals.",
    img: "/data-driven-services/sa-da/smartpls-analysis/bootstrapping-significance-testing.png"
  },
  {
    title: "Mediation & Moderation Analysis",
    desc: "Test indirect effects, interaction effects, and moderated relationships using PLS-SEM.",
    img: "/data-driven-services/sa-da/smartpls-analysis/mediation-moderation-analysis.png"
  },
  {
    title: "Advanced Modeling (HCM & IPMA)",
    desc: "Higher-order constructs (reflective/formative) and Importance-Performance Map Analysis for insights.",
    img: "/data-driven-services/sa-da/smartpls-analysis/advanced-modeling-hcm-ipma.png"
  },
  {
    title: "PLS Interpretation & Reporting",
    desc: "Interpret path results, predictive metrics, and deliver APA-formatted tables and actionable insights.",
    img: "/data-driven-services/sa-da/smartpls-analysis/pls-interpretation-reporting.png"
  }
];

const deliverables = [
  "Complete SmartPLS project files (.splsm)",
  "High-resolution publication-ready model diagrams",
  "Full bootstrapping results with confidence intervals",
  "Detailed statistical report with all key metrics (R², Q², f², etc.)",
  "IPMA charts and predictive relevance analysis",
  "APA 7th edition formatted tables and interpretation",
  "Methodology section ready for thesis or journal submission",
  "One-to-one explanation session + 6 months free support",
];

const steps = [
  {
    step: "01",
    title: "Model Conceptualization",
    desc: "Translate your research model into SmartPLS with proper measurement and structural specifications.",
    icon: Layers,
  },
  {
    step: "02",
    title: "Data Preparation",
    desc: "Data screening, missing value handling, and preparation for PLS-SEM analysis.",
    icon: Eye,
  },
  {
    step: "03",
    title: "Model Estimation & Evaluation",
    desc: "Run PLS algorithm, bootstrapping, mediation/moderation, and assess model quality.",
    icon: BarChart3,
  },
  {
    step: "04",
    title: "Results & Reporting",
    desc: "Deliver publication-ready outputs, diagrams, interpretation, and recommendations.",
    icon: Zap,
  },
];

const benefits = [
  "PhD-level SmartPLS & PLS-SEM specialists",
  "Expertise in management, marketing, education, and social sciences",
  "Strong focus on predictive modeling and practical implications",
  "Publication support for high-impact journals",
  "Advanced features: IPMA, PLSpredict, higher-order models",
  "Clear visual diagrams and easy-to-understand explanations",
  "APA 7th edition & journal-specific formatting",
  "Free revisions until supervisor or reviewer approval",
];

export default function SmartPLSAnalysisPage() {
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
        <section className="bg-gradient-to-br from-lime-50 via-green-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-lime-600/10 px-4 py-2 text-sm font-medium text-lime-700 mb-6">
                  <TrendingUp className="h-4 w-4" />
                  SMARTPLS ANALYSIS
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  SmartPLS Analysis<br />& PLS-SEM
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Expert Partial Least Squares Structural Equation Modeling using SmartPLS. 
                  Ideal for complex models, predictive research, and smaller sample sizes.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link prefetch={false} href="/contact">Start SmartPLS Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link prefetch={false} href="/samples">View SmartPLS Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-lime-700 via-green-700 to-emerald-700 text-white shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/10 rounded-2xl">
                          <BarChart3 className="h-10 w-10" />
                        </div>
                        <div>
                          <p className="text-sm opacity-75">Predictive Power</p>
                          <p className="text-5xl font-bold tracking-tighter">Q² = 0.62</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-2xl p-6 mb-6 font-mono text-sm">
                      <div className="text-emerald-300 mb-2">SmartPLS Results</div>
                      <pre className="text-white/90 text-xs leading-relaxed overflow-auto">
{`R² (Satisfaction) = 0.68
Q² = 0.62
f² (Trust → Sat) = 0.31
Bootstrapping: Significant`}
                      </pre>
                    </div>

                    <div className="flex items-center justify-between text-sm opacity-90">
                      <div>SmartPLS 4 • PLS-SEM • IPMA • PLSpredict</div>
                      <div className="text-emerald-300 font-medium">Predictive Focus</div>
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
              <h2 className="font-serif text-4xl font-bold">SmartPLS Analysis Services We Provide</h2>
              <p className="mt-3 text-muted-foreground">Advanced PLS-SEM techniques for robust and predictive research outcomes</p>
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
              <h2 className="font-serif text-4xl font-bold">Our SmartPLS Analysis Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Predictive, rigorous, and publication-ready process</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, ready-to-submit SmartPLS analysis package.</p>
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
                            <p className="font-semibold">SmartPLS Project Files</p>
                            <p className="text-sm text-muted-foreground">.splsm + diagrams</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">APA Formatted Report</p>
                            <p className="text-sm text-muted-foreground">Full interpretation</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">IPMA & PLSpredict</p>
                            <p className="text-sm text-muted-foreground">Actionable insights</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Ready</p>
                            <p className="text-sm text-muted-foreground">High-impact journals</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our SmartPLS Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your SmartPLS Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your research model and data : receive a detailed proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your research model, constructs, hypotheses (mediation/moderation), and specific SmartPLS requirements" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <Button className="w-full h-14 text-base" size="lg">Request Detailed Proposal</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">Ready for Professional SmartPLS Analysis?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">Get powerful PLS-SEM results with strong predictive power and practical implications.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link prefetch={false} href="/contact">Start Your SmartPLS Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link prefetch={false} href="/services/statistical-analysis-data-analytics">Back to Statistical Services</Link>
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