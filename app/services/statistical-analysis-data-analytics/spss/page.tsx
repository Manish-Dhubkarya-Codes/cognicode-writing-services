import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, BarChart3, Calculator, TrendingUp, Layers, Zap, Sparkles, GitBranch, FileText, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "SPSS Analysis Services | Statistical Package for the Social Sciences",
  description: "Expert SPSS data analysis for PhD research, theses, and publications. Descriptive statistics, hypothesis testing, regression, multivariate analysis, and publication-ready output.",
};

const techniques = [
  { 
    title: "Descriptive & Inferential Statistics", 
    desc: "Comprehensive statistical analysis including frequencies, cross-tabulations, t-tests, ANOVA, chi-square, and non-parametric tests." 
  },
  { 
    title: "Regression Analysis", 
    desc: "Linear, multiple, logistic, ordinal, and hierarchical regression with assumption checks and model diagnostics." 
  },
  { 
    title: "Multivariate Analysis", 
    desc: "MANOVA, factor analysis, cluster analysis, discriminant analysis, and principal component analysis (PCA)." 
  },
  { 
    title: "Reliability & Validity Testing", 
    desc: "Cronbach's Alpha, test-retest reliability, construct validity, and scale development support." 
  },
  { 
    title: "Advanced SPSS Techniques", 
    desc: "Syntax scripting, macro development, bootstrapping, missing data analysis, and complex survey data handling." 
  },
  { 
    title: "Publication & Thesis Support", 
    desc: "APA/MLA/IEEE formatted tables, graphs, interpretation, and full methodology chapter writing." 
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
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero - Unique SPSS Design */}
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

              {/* Unique Hero Card */}
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

        {/* Techniques */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">SPSS Analysis Services We Provide</h2>
              <p className="mt-3 text-muted-foreground">From basic statistics to advanced multivariate techniques</p>
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

        {/* Deliverables */}
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

        {/* Why Choose Us */}
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

        {/* Final CTA */}
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
      </main>
      <Footer />
    </div>
  );
}