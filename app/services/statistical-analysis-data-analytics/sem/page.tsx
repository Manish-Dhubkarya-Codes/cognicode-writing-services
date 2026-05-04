import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Layers, Target, TrendingUp, Zap, Sparkles, GitBranch, FileText, Eye, Network } from "lucide-react";

export const metadata: Metadata = {
  title: "Structural Equation Modeling (SEM) Services | AMOS & SmartPLS",
  description: "Expert Structural Equation Modeling (SEM) using AMOS and SmartPLS. Path analysis, mediation, moderation, multi-group analysis, and complex theoretical model testing for PhD research and publications.",
};

const techniques = [
  { 
    title: "Full Structural Equation Modeling", 
    desc: "Complete SEM model development, estimation, and validation including measurement and structural components." 
  },
  { 
    title: "Mediation & Serial Mediation Analysis", 
    desc: "Simple, parallel, and serial mediation with bootstrapping for robust indirect effect testing." 
  },
  { 
    title: "Moderation & Moderated Mediation", 
    desc: "Interaction effects, conditional process analysis, and advanced moderated mediation models." 
  },
  { 
    title: "Multi-Group & Invariance Testing", 
    desc: "Compare models across groups and test measurement and structural invariance." 
  },
  { 
    title: "Model Comparison & Theoretical Testing", 
    desc: "Competing models comparison, nested models, and theory-driven model evaluation." 
  },
  { 
    title: "Advanced SEM Techniques", 
    desc: "Second-order models, interaction effects, latent growth modeling, and Bayesian SEM." 
  },
];

const deliverables = [
  "Complete AMOS/SmartPLS project files with all SEM models",
  "High-quality publication-ready path diagrams",
  "Detailed output with fit indices, direct/indirect effects, and bootstrapping results",
  "Comprehensive interpretation report with APA formatting",
  "Mediation/moderation analysis tables and visualizations",
  "Model comparison and modification index reports",
  "Full methodology section ready for thesis/journal",
  "One-to-one Zoom explanation + 6 months free support",
];

const steps = [
  {
    step: "01",
    title: "Theoretical Model Specification",
    desc: "Translate your hypotheses into a complete SEM measurement and structural model.",
    icon: Network,
  },
  {
    step: "02",
    title: "Data Preparation & Screening",
    desc: "Assess data suitability, handle missing values, and check assumptions for SEM.",
    icon: Eye,
  },
  {
    step: "03",
    title: "Model Estimation & Analysis",
    desc: "Run CFA → SEM, test mediation/moderation, and evaluate overall model fit.",
    icon: Layers,
  },
  {
    step: "04",
    title: "Results & Interpretation",
    desc: "Deliver publication-ready outputs, diagrams, and detailed academic interpretation.",
    icon: Zap,
  },
];

const benefits = [
  "PhD-level SEM experts with extensive AMOS & SmartPLS experience",
  "Specialized in management, psychology, education, and social sciences",
  "Expert handling of complex mediation and moderation models",
  "Publication in high-impact SSCI/Scopus journals",
  "Clear visual diagrams and easy-to-understand explanations",
  "APA 7th edition & journal-specific formatting",
  "Defense/viva preparation and reviewer response support",
  "Free revisions until supervisor or journal approval",
];

export default function SEMAnalysisPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-4 py-2 text-sm font-medium text-emerald-700 mb-6">
                  <Network className="h-4 w-4" />
                  STRUCTURAL EQUATION MODELING
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Structural Equation<br />Modeling (SEM)
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Expert SEM analysis using AMOS and SmartPLS. Test complex theoretical models with mediation, moderation, and multi-group analysis for high-impact research.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start SEM Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View SEM Samples</Link>
                  </Button>
                </div>
              </div>

              {/* Unique Hero Card */}
              <div className="relative">
                <Card className="bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-700 text-white shadow-2xl border-0 overflow-hidden">
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
                      <div className="text-cyan-300 mb-2">SEM Results Summary</div>
                      <pre className="text-white/90 text-xs leading-relaxed overflow-auto">
{`CFI = 0.958
TLI = 0.947
RMSEA = 0.045
Indirect Effect = 0.312 (p < .001)`}
                      </pre>
                    </div>

                    <div className="flex items-center justify-between text-sm opacity-90">
                      <div>AMOS • SmartPLS • Mediation • Moderation</div>
                      <div className="text-cyan-300 font-medium">Theory Testing</div>
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
              <h2 className="font-serif text-4xl font-bold">SEM Services We Specialize In</h2>
              <p className="mt-3 text-muted-foreground">Advanced structural modeling and hypothesis testing</p>
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
              <h2 className="font-serif text-4xl font-bold">Our SEM Analysis Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Rigorous, theory-driven, and publication-oriented process</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, high-impact SEM analysis package.</p>
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
                            <p className="font-semibold">AMOS/SmartPLS Files</p>
                            <p className="text-sm text-muted-foreground">Fully reproducible</p>
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
                            <p className="font-semibold">Path Diagrams</p>
                            <p className="text-sm text-muted-foreground">Publication quality</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Mediation Analysis</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our SEM Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your SEM Analysis Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your theoretical model and data : receive a detailed proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your research model, key hypotheses, mediation/moderation relationships, and specific SEM requirements" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready for Advanced Structural Equation Modeling?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">Test complex theoretical models with professional SEM analysis and publication-ready results.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your SEM Project</Link>
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