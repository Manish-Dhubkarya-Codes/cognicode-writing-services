'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Target, Layers, Eye, Zap, GitBranch, FileText, Award, ZoomIn, X, CheckSquare } from "lucide-react";

const techniques = [
  {
    title: "Model Specification",
    desc: "Define latent constructs, observed indicators, and theoretical relationships before CFA modeling.",
    img: "/data-driven-services/sa-da/cfa/model-specification.png"
  },
  {
    title: "Measurement Model (CFA)",
    desc: "Run CFA to evaluate factor loadings, ensuring indicators meet threshold criteria (≥ 0.5 or 0.7).",
    img: "/data-driven-services/sa-da/cfa/measurement-model-cfa.png"
  },
  {
    title: "Model Fit Evaluation",
    desc: "Assess fit indices including CFI, TLI, RMSEA, SRMR, and χ²/df to validate measurement model adequacy.",
    img: "/data-driven-services/sa-da/cfa/model-fit-evaluation.png"
  },
  {
    title: "Convergent Validity",
    desc: "Evaluate AVE (≥ 0.5), factor loadings, and Composite Reliability (CR) to ensure construct consistency.",
    img: "/data-driven-services/sa-da/cfa/convergent-validity.png"
  },
  {
    title: "Discriminant Validity",
    desc: "Fornell-Larcker criterion and HTMT ratio to confirm constructs are distinct from each other.",
    img: "/data-driven-services/sa-da/cfa/discriminant-validity.png"
  },
  {
    title: "Reliability Testing",
    desc: "Cronbach’s Alpha and Composite Reliability (CR ≥ 0.7) for internal consistency validation.",
    img: "/data-driven-services/sa-da/cfa/reliability-testing.png"
  },
  {
    title: "Item Reduction & Refinement",
    desc: "Remove low-loading items, reduce cross-loadings, and improve model quality based on statistical thresholds.",
    img: "/data-driven-services/sa-da/cfa/item-reduction-refinement.png"
  },
  {
    title: "Measurement Invariance (Multi-Group CFA)",
    desc: "Configural, metric, scalar, and strict invariance testing across groups.",
    img: "/data-driven-services/sa-da/cfa/measurement-invariance.png"
  },
  {
    title: "Model Modification & Validation",
    desc: "Use modification indices with theoretical justification and validate model robustness.",
    img: "/data-driven-services/sa-da/cfa/model-modification-validation.png"
  },
  {
    title: "CFA Interpretation & Reporting",
    desc: "Interpret loadings, validity results, and provide APA-formatted tables and publication-ready diagrams.",
    img: "/data-driven-services/sa-da/cfa/cfa-interpretation-reporting.png"
  }
];

const deliverables = [
  "Complete AMOS/SmartPLS project files with all CFA models",
  "High-resolution model diagrams (publication quality)",
  "Detailed CFA output with all fit indices and parameter estimates",
  "Validity & reliability tables (AVE, CR, Cronbach’s Alpha)",
  "Comprehensive interpretation and academic report",
  "APA 7th edition formatted tables and results section",
  "Power analysis and sample adequacy report",
  "One-to-one explanation session + 6 months free support",
];

const steps = [
  {
    step: "01",
    title: "Theoretical Framework Review",
    desc: "Understand your constructs, hypotheses, and measurement items for proper CFA specification.",
    icon: CheckSquare,
  },
  {
    step: "02",
    title: "Data Screening & Preparation",
    desc: "Normality checks, missing data handling, outlier detection, and data suitability for CFA.",
    icon: Eye,
  },
  {
    step: "03",
    title: "CFA Model Testing",
    desc: "Run CFA, assess model fit, validity, reliability, and perform necessary modifications.",
    icon: Layers,
  },
  {
    step: "04",
    title: "Results & Documentation",
    desc: "Deliver publication-ready outputs, interpretation, and methodology chapter support.",
    icon: Zap,
  },
];

const benefits = [
  "PhD-level experts specialized in CFA & Psychometrics",
  "Experience with AMOS, SmartPLS, and Mplus",
  "Strong focus on scale development and validation",
  "Publication in top-tier SSCI journals",
  "Clear explanation of fit indices and modification indices",
  "APA 7th edition & journal-specific formatting",
  "Defense/viva preparation support",
  "Free revisions until supervisor approval",
];

export default function CFAAnalysisPage() {
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
        <section className="bg-gradient-to-br from-rose-50 via-pink-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-rose-600/10 px-4 py-2 text-sm font-medium text-rose-700 mb-6">
                  <Target className="h-4 w-4" />
                  CONFIRMATORY FACTOR ANALYSIS
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Confirmatory Factor<br />Analysis (CFA)
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Expert CFA services for scale validation, construct measurement, and psychometric evaluation. 
                  Using AMOS and SmartPLS for high-quality academic research.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link prefetch={false} href="/contact">Start CFA Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link prefetch={false} href="/samples">View CFA Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-rose-700 via-pink-700 to-purple-700 text-white shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/10 rounded-2xl">
                          <Layers className="h-10 w-10" />
                        </div>
                        <div>
                          <p className="text-sm opacity-75">Model Fit</p>
                          <p className="text-5xl font-bold tracking-tighter">Excellent</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-2xl p-6 mb-6 font-mono text-sm">
                      <div className="text-pink-300 mb-2">CFA Fit Indices</div>
                      <pre className="text-white/90 text-xs leading-relaxed overflow-auto">
{`CFI = 0.97
TLI = 0.96
RMSEA = 0.038
SRMR = 0.029
χ²/df = 1.68`}
                      </pre>
                    </div>

                    <div className="flex items-center justify-between text-sm opacity-90">
                      <div>AMOS • SmartPLS • AVE • HTMT</div>
                      <div className="text-pink-300 font-medium">Psychometrically Sound</div>
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
              <h2 className="font-serif text-4xl font-bold">CFA Analysis Services We Provide</h2>
              <p className="mt-3 text-muted-foreground">Rigorous psychometric evaluation and scale validation using AMOS &amp; SmartPLS</p>
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
              <h2 className="font-serif text-4xl font-bold">Our CFA Analysis Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Methodologically rigorous and publication-focused</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, high-quality CFA analysis package.</p>
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
                            <p className="font-semibold">AMOS / SmartPLS Files</p>
                            <p className="text-sm text-muted-foreground">Ready to reproduce</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">APA Formatted Report</p>
                            <p className="text-sm text-muted-foreground">Tables + Interpretation</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Validity Tables</p>
                            <p className="text-sm text-muted-foreground">AVE, CR, HTMT</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Quality</p>
                            <p className="text-sm text-muted-foreground">Diagrams &amp; Results</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our CFA Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your CFA Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your scale and research model : receive a detailed proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your constructs, number of items, target population, and specific CFA requirements" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <Button className="w-full h-14 text-base" size="lg">Request Detailed Proposal</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">Ready for Professional CFA Analysis?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">Get accurate, reliable, and publication-ready Confirmatory Factor Analysis results.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link prefetch={false} href="/contact">Start Your CFA Project</Link>
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