import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Layers, Network, Target, BarChart3, Eye, GitBranch, FileText, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Multivariate & Factor Analysis | CogniCode",
  description: "Expert multivariate and factor analysis for PhD research. MANOVA, PCA, Exploratory & Confirmatory Factor Analysis, Cluster Analysis, Discriminant Analysis, and Structural Equation Modeling (SEM) using SPSS, R, and Python.",
};

const techniques = [
  { title: "Multivariate Analysis of Variance (MANOVA)", desc: "Simultaneous analysis of multiple dependent variables across groups with post-hoc tests" },
  { title: "Principal Component Analysis (PCA)", desc: "Dimensionality reduction, data compression, and identification of underlying patterns" },
  { title: "Factor Analysis (EFA & CFA)", desc: "Exploratory and Confirmatory Factor Analysis for scale development and construct validation" },
  { title: "Cluster & Discriminant Analysis", desc: "Grouping similar cases and predictive classification using advanced multivariate techniques" },
];

const deliverables = [
  "Fully reproducible multivariate and factor analysis scripts (SPSS, R, Python)",
  "Detailed factor loadings, communalities, eigenvalues, and scree plots",
  "MANOVA results with Wilks’ Lambda, Pillai’s Trace, and effect sizes",
  "Structural Equation Modeling (SEM) output with model fit indices",
  "Publication-ready tables, path diagrams, and visualization reports",
  "Complete methodology chapter ready for thesis and journal submission",
  "Git repository with clean, well-documented code and experiment logs",
  "One-to-one interpretation session + 6 months of free revisions and updates",
];

const steps = [
  {
    step: "01",
    title: "Data Suitability Assessment",
    desc: "Check multivariate normality, multicollinearity, sample size adequacy, and factorability (KMO, Bartlett’s test).",
    icon: BarChart3,
  },
  {
    step: "02",
    title: "Exploratory Analysis",
    desc: "Perform PCA, EFA, and initial factor extraction with rotation methods (Varimax, Oblimin, etc.).",
    icon: Layers,
  },
  {
    step: "03",
    title: "Advanced Modeling",
    desc: "Run MANOVA, CFA, SEM, Cluster Analysis, and Discriminant Analysis with model validation.",
    icon: Network,
  },
  {
    step: "04",
    title: "Interpretation & Reporting",
    desc: "Provide clear statistical interpretation, path diagrams, and publication-ready results.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level statisticians with 10+ years experience in multivariate methods",
  "Expertise in SPSS, R (lavaan, psych), AMOS, and Python (factor_analyzer)",
  "Full support for Exploratory and Confirmatory Factor Analysis",
  "Structural Equation Modeling (SEM) and path analysis",
  "Rigorous assumption checking and model diagnostics",
  "Publication-ready tables, figures, and path diagrams",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your thesis committee or journal approves",
];

export default function MultivariateFactorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-4 py-2 text-sm font-medium text-indigo-700 mb-6">
                  <Layers className="h-4 w-4" />
                  MULTIVARIATE &amp; FACTOR ANALYSIS
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Multivariate &amp;<br />Factor Analysis
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Advanced multivariate techniques including MANOVA, PCA, Factor Analysis, Cluster Analysis, and Structural Equation Modeling for complex PhD research.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Multivariate Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Multivariate Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Network className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">KMO = 0.89</p>
                        <p className="text-sm opacity-75">Excellent Factorability</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-indigo-200">
{`fa_model <- fa(data, nfactors=4, rotate="varimax")`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">PCA • EFA • CFA • SEM • Ready for thesis &amp; publication</p>
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
              <h2 className="font-serif text-4xl font-bold">Multivariate Techniques We Master</h2>
              <p className="mt-3 text-muted-foreground">From dimensionality reduction to complex causal modeling</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <h2 className="font-serif text-4xl font-bold">Our Multivariate &amp; Factor Analysis Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Rigorous academic-standard process for complex data structures</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, publication-ready multivariate analysis package.</p>
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
                            <p className="font-semibold">Reproducible Pipeline</p>
                            <p className="text-sm text-muted-foreground">Full code in SPSS/R/Python</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Report</p>
                            <p className="text-sm text-muted-foreground">Methodology + results chapter</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Path Diagrams &amp; Visuals</p>
                            <p className="text-sm text-muted-foreground">Factor loadings &amp; SEM diagrams</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Support</p>
                            <p className="text-sm text-muted-foreground">Tables, scree plots &amp; LaTeX ready</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our Multivariate Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Multivariate Analysis Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your research variables and objectives — receive a detailed proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your multivariate / factor analysis requirements" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready for Advanced Multivariate Analysis?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From PCA to SEM — we deliver rigorous, publication-ready multivariate solutions for complex research questions.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Multivariate Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services/data-driven/statistical-analysis-data-analytics">Back to Statistical Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}