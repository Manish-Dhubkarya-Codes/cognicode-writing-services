import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, TrendingUp, Layers, Target, Zap, Sparkles, GitBranch, FileText, Eye, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "SmartPLS Analysis Services | PLS-SEM for Research & Publications",
  description: "Expert SmartPLS analysis for Partial Least Squares Structural Equation Modeling (PLS-SEM). Advanced mediation, moderation, IPMA, higher-order models, and predictive analytics for PhD research.",
};

const techniques = [
  { 
    title: "PLS-SEM Model Development", 
    desc: "Complete PLS-SEM model building, estimation, and evaluation using SmartPLS 4 for complex theoretical frameworks." 
  },
  { 
    title: "Mediation & Moderation Analysis", 
    desc: "Advanced mediation (specific, parallel, serial), moderation, and moderated mediation with bootstrapping." 
  },
  { 
    title: "Higher-Order & Hierarchical Models", 
    desc: "Reflective-formative, reflective-reflective, and formative-formative higher-order constructs." 
  },
  { 
    title: "Importance-Performance Map Analysis (IPMA)", 
    desc: "IPMA for identifying key drivers and prioritizing actionable insights from PLS-SEM results." 
  },
  { 
    title: "Predictive Relevance & Model Comparison", 
    desc: "Blindfolding, PLSpredict, model comparison, and out-of-sample predictive power assessment." 
  },
  { 
    title: "Advanced SmartPLS Techniques", 
    desc: "Multi-group analysis, longitudinal data, unobserved heterogeneity (FIMIX-PLS), and robustness checks." 
  },
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
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
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
                    <Link href="/contact">Start SmartPLS Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View SmartPLS Samples</Link>
                  </Button>
                </div>
              </div>

              {/* Unique Hero Card */}
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

        {/* Techniques */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">SmartPLS Analysis Services</h2>
              <p className="mt-3 text-muted-foreground">Advanced PLS-SEM techniques for robust research outcomes</p>
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

        {/* Deliverables */}
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

        {/* Why Choose Us */}
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

        {/* Final CTA */}
        <section className="py-20 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">Ready for Professional SmartPLS Analysis?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">Get powerful PLS-SEM results with strong predictive power and practical implications.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your SmartPLS Project</Link>
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