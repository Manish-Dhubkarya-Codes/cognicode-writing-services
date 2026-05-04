import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Target, Layers, BarChart3, Zap, Sparkles, GitBranch, FileText, Eye, CheckSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Confirmatory Factor Analysis (CFA) Services | AMOS & SmartPLS",
  description: "Expert Confirmatory Factor Analysis (CFA) using AMOS and SmartPLS. Scale validation, construct validity, reliability testing, and measurement model assessment for PhD research and publications.",
};

const techniques = [
  { 
    title: "Measurement Model Validation", 
    desc: "Comprehensive CFA to validate latent constructs, factor loadings, and overall measurement model fit." 
  },
  { 
    title: "Construct Validity & Reliability", 
    desc: "Convergent validity (AVE), Composite Reliability (CR), Cronbach’s Alpha, and Discriminant Validity (Fornell-Larcker & HTMT)." 
  },
  { 
    title: "Multi-Group CFA (Measurement Invariance)", 
    desc: "Configural, Metric, Scalar, and Strict invariance testing across groups (gender, culture, age, etc.)." 
  },
  { 
    title: "Higher-Order & Bifactor CFA", 
    desc: "Second-order factor models and bifactor CFA for complex psychological and social science constructs." 
  },
  { 
    title: "Model Comparison & Modification", 
    desc: "Comparing competing models, theoretically justified modifications, and cross-validation." 
  },
  { 
    title: "Scale Development & Validation", 
    desc: "Full psychometric validation of new or adapted scales with CFA and EFA-CFA combination." 
  },
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
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
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
                    <Link href="/contact">Start CFA Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View CFA Samples</Link>
                  </Button>
                </div>
              </div>

              {/* Unique Hero Card */}
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

        {/* Techniques */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">CFA Services We Specialize In</h2>
              <p className="mt-3 text-muted-foreground">Rigorous psychometric evaluation and scale validation</p>
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

        {/* Deliverables */}
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
                            <p className="text-sm text-muted-foreground">Diagrams & Results</p>
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

        {/* Final CTA */}
        <section className="py-20 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">Ready for Professional CFA Analysis?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">Get accurate, reliable, and publication-ready Confirmatory Factor Analysis results.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your CFA Project</Link>
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