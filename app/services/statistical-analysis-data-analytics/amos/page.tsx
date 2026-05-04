import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Layers, Target, TrendingUp, Zap, Sparkles, GitBranch, FileText, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "AMOS Analysis Services | Analysis of Moment Structures (SEM)",
  description: "Expert AMOS Structural Equation Modeling (SEM) for PhD research. Path analysis, CFA, mediation, moderation, model fit evaluation, and publication-ready diagrams.",
};

const techniques = [
  { 
    title: "Structural Equation Modeling (SEM)", 
    desc: "Comprehensive SEM model development, estimation, and validation using maximum likelihood and other estimation methods." 
  },
  { 
    title: "Confirmatory Factor Analysis (CFA)", 
    desc: "Validate measurement models, assess construct validity, reliability (CR, AVE), and discriminant validity." 
  },
  { 
    title: "Path Analysis & Causal Modeling", 
    desc: "Test complex theoretical models with direct, indirect, and total effects." 
  },
  { 
    title: "Mediation & Moderation Analysis", 
    desc: "Advanced mediation, moderation, and moderated mediation analysis with bootstrapping." 
  },
  { 
    title: "Multi-Group Analysis (MGA)", 
    desc: "Compare models across different groups (gender, age, country, etc.) for invariance testing." 
  },
  { 
    title: "Model Fit & Modification", 
    desc: "Rigorous model fit assessment (CMIN/DF, CFI, TLI, RMSEA, SRMR) and theoretically justified modifications." 
  },
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
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
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

              {/* Unique Hero Card */}
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

        {/* Techniques */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">AMOS Services We Provide</h2>
              <p className="mt-3 text-muted-foreground">Advanced Structural Equation Modeling solutions</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Deliverables */}
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

        {/* Why Choose Us */}
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

        {/* Final CTA */}
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
      </main>
      <Footer />
    </div>
  );
}