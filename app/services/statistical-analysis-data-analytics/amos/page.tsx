'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Layers, Target, Eye, Zap, GitBranch, FileText, Award, ZoomIn, X } from "lucide-react";

const techniques = [
  {
    title: "Model Specification",
    desc: "Translate theoretical framework into path diagrams with latent and observed variables, ensuring proper construct definition.",
    img: "/data-driven-services/sa-da/amos/model-specification.png"
  },
  {
    title: "Measurement Model (CFA)",
    desc: "Confirmatory Factor Analysis including factor loadings, AVE, CR, and discriminant validity to validate constructs.",
    img: "/data-driven-services/sa-da/amos/measurement-model-cfa.png"
  },
  {
    title: "Structural Model (SEM)",
    desc: "Full structural modeling to test hypotheses with direct, indirect, and total effects between variables.",
    img: "/data-driven-services/sa-da/amos/structural-model-sem.png"
  },
  {
    title: "Model Fit Evaluation",
    desc: "Assessment using CMIN/DF, CFI, TLI, RMSEA, and SRMR with strict threshold validation for model acceptance.",
    img: "/data-driven-services/sa-da/amos/model-fit-evaluation.png"
  },
  {
    title: "Mediation Analysis",
    desc: "Bootstrapping-based indirect effect testing with confidence intervals for mediation validation.",
    img: "/data-driven-services/sa-da/amos/mediation-analysis.png"
  },
  {
    title: "Moderation Analysis",
    desc: "Interaction effects testing using multi-group SEM and moderation techniques.",
    img: "/data-driven-services/sa-da/amos/moderation-analysis.png"
  },
  {
    title: "Multi-Group Analysis (MGA)",
    desc: "Measurement invariance testing across groups (configural, metric, scalar invariance).",
    img: "/data-driven-services/sa-da/amos/multi-group-analysis-mga.png"
  },
  {
    title: "Assumption Testing & Data Screening",
    desc: "Normality, multivariate outliers, multicollinearity, and sample adequacy checks before SEM modeling.",
    img: "/data-driven-services/sa-da/amos/assumption-testing-data-screening.png"
  },
  {
    title: "Model Modification & Validation",
    desc: "Modification indices, theory-driven adjustments, and cross-validation to improve model fit.",
    img: "/data-driven-services/sa-da/amos/model-modification-validation.png"
  },
  {
    title: "SEM Interpretation & Reporting",
    desc: "Path coefficient interpretation, hypothesis testing, and APA-formatted reporting with publication-ready diagrams.",
    img: "/data-driven-services/sa-da/amos/sem-interpretation-reporting.png"
  }
];

const deliverables = [
  "Complete AMOS project file (.amw) with all models",
  "High-quality model diagrams (publication-ready)",
  "Detailed output with all fit indices and parameter estimates",
  "Bootstrapping results and confidence intervals",
  "Comprehensive interpretation report with APA formatting",
  "Syntax and Excel export of results",
  "Power analysis and sample size justification (if required)",
  "One-to-one Zoom explanation session + 6 months support",
];

const steps = [
  {
    step: "01",
    title: "Model Specification",
    desc: "Translate your theoretical framework into AMOS measurement and structural models.",
    icon: Target,
  },
  {
    step: "02",
    title: "Data Preparation",
    desc: "Import data, handle missing values, check normality, and prepare covariance matrix.",
    icon: Eye,
  },
  {
    step: "03",
    title: "Model Estimation & Testing",
    desc: "Run CFA, SEM, mediation, moderation with multiple estimation methods.",
    icon: Layers,
  },
  {
    step: "04",
    title: "Results & Reporting",
    desc: "Deliver publication-ready diagrams, tables, interpretation, and methodology.",
    icon: Zap,
  },
];

const benefits = [
  "PhD-level experts with extensive AMOS & SEM experience",
  "Specialized in social sciences, management, psychology & education research",
  "Publication in high-impact SSCI/Scopus journals",
  "Clear visual diagrams using AMOS Graphics",
  "Advanced techniques: Bootstrapping, Bayesian SEM",
  "APA 7th edition & journal-specific formatting",
  "Defense-ready explanations and viva support",
  "Free revisions until supervisor/journal approval",
];

export default function AMOSAnalysisPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    if (selectedImage !== null) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.documentElement.style.overflow = 'visible';
        window.scrollTo(0, scrollY);
      };
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = 'visible';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [selectedImage]);

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
        <section className="bg-gradient-to-br from-purple-50 via-violet-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-violet-600/10 px-4 py-2 text-sm font-medium text-violet-700 mb-6">
                  <Layers className="h-4 w-4" />
                  AMOS ANALYSIS
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Analysis of Moment<br />Structures (AMOS)
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Professional Structural Equation Modeling using AMOS. 
                  Expert support for CFA, SEM, mediation, moderation, and complex path models for theses and publications.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start AMOS Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View AMOS Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-700 text-white shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/10 rounded-2xl">
                          <Target className="h-10 w-10" />
                        </div>
                        <div>
                          <p className="text-sm opacity-75">Model Fit</p>
                          <p className="text-5xl font-bold tracking-tighter">Excellent</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-2xl p-6 mb-6 font-mono text-sm">
                      <div className="text-fuchsia-300 mb-2">AMOS Model Fit</div>
                      <pre className="text-white/90 text-xs leading-relaxed overflow-auto">
{`CMIN/DF = 1.87
CFI = 0.96
TLI = 0.95
RMSEA = 0.042
SRMR = 0.031`}
                      </pre>
                    </div>

                    <div className="flex items-center justify-between text-sm opacity-90">
                      <div>SEM • CFA • Mediation • Multi-Group</div>
                      <div className="text-fuchsia-300 font-medium">Publication Ready</div>
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
              <h2 className="font-serif text-4xl font-bold">AMOS Analysis Services We Provide</h2>
              <p className="mt-3 text-muted-foreground">From model specification to advanced SEM techniques</p>
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
                          <Layers className="w-full h-52 text-gray-700 opacity-50" />
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
              <h2 className="font-serif text-4xl font-bold">Our AMOS Analysis Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Rigorous, transparent, and academically robust process</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, submission-ready AMOS analysis package.</p>
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
                            <p className="font-semibold">AMOS Project Files</p>
                            <p className="text-sm text-muted-foreground">.amw + diagrams</p>
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
                            <p className="font-semibold">High-Quality Diagrams</p>
                            <p className="text-sm text-muted-foreground">Publication standard</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Model Fit Expert</p>
                            <p className="text-sm text-muted-foreground">Bootstrapping included</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Trust Our AMOS Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your AMOS Analysis Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your theoretical model and data : receive a detailed proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your research model, variables, hypotheses, and specific AMOS requirements (CFA, SEM, mediation, etc.)" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <Button className="w-full h-14 text-base" size="lg">Request Detailed Proposal</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">Ready for Professional AMOS Analysis?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">Get expert Structural Equation Modeling support with publication-quality results and diagrams.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your AMOS Project</Link>
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