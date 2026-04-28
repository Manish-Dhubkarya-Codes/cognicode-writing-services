import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, TrendingUp, Target, BarChart3, Eye, GitBranch, FileText, LineChart } from "lucide-react";

export const metadata: Metadata = {
  title: "Regression & Correlation Analysis | CogniCode",
  description: "Expert regression and correlation analysis for PhD research. Linear, multiple, logistic, polynomial, and nonlinear regression models with correlation analysis, multicollinearity diagnostics, and publication-ready results using SPSS, R, and Python.",
};

const regressionTypes = [
  { title: "Linear & Multiple Regression", desc: "Simple and multiple linear regression with interaction terms and model selection" },
  { title: "Logistic & Generalized Linear Models", desc: "Binary, multinomial, and ordinal logistic regression for categorical outcomes" },
  { title: "Polynomial & Nonlinear Regression", desc: "Curve fitting, polynomial regression, and nonlinear models with custom equations" },
  { title: "Correlation Analysis", desc: "Pearson, Spearman, Kendall correlation, partial correlation, and multicollinearity diagnostics (VIF)" },
];

const deliverables = [
  "Fully trained regression models with equation, coefficients, and confidence intervals",
  "Comprehensive correlation matrix and multicollinearity report (VIF, tolerance)",
  "Diagnostic plots (residuals, QQ plots, leverage, influence)",
  "Model comparison tables (R², Adjusted R², AIC, BIC, F-statistics)",
  "Publication-ready tables and graphs in APA/MLA/IEEE format",
  "Reproducible code/scripts in SPSS, R, or Python",
  "Detailed methodology chapter ready for thesis submission",
  "One-to-one interpretation session + 6 months of free revisions and updates",
];

const steps = [
  {
    step: "01",
    title: "Exploratory Correlation Analysis",
    desc: "Compute correlation matrices, scatter plots, and identify relationships between variables.",
    icon: LineChart,
  },
  {
    step: "02",
    title: "Model Building & Fitting",
    desc: "Build linear, logistic, polynomial, or nonlinear regression models with appropriate variable selection.",
    icon: TrendingUp,
  },
  {
    step: "03",
    title: "Diagnostics & Validation",
    desc: "Check assumptions, multicollinearity (VIF), heteroscedasticity, and perform cross-validation.",
    icon: Target,
  },
  {
    step: "04",
    title: "Interpretation & Reporting",
    desc: "Provide clear statistical interpretation, effect sizes, and publication-ready results.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level statisticians with 10+ years experience",
  "Expertise in SPSS, R, Python, and Stata for regression analysis",
  "Comprehensive multicollinearity and assumption checking",
  "Publication-ready tables, graphs, and model diagnostics",
  "Support for both simple and complex regression models",
  "Fully reproducible and transparent workflows",
  "Free revisions until your supervisor or journal approves",
  "Lifetime access to scripts and model updates",
];

export default function RegressionCorrelationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-4 py-2 text-sm font-medium text-emerald-700 mb-6">
                  <TrendingUp className="h-4 w-4" />
                  REGRESSION &amp; CORRELATION ANALYSIS
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Regression &amp;<br />Correlation Analysis
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Robust linear, multiple, logistic, polynomial, and nonlinear regression models with comprehensive correlation analysis and multicollinearity diagnostics.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Regression Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Regression Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <BarChart3 className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">R² = 0.89</p>
                        <p className="text-sm opacity-75">Model Fit</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-emerald-200">
{`model <- lm(y ~ x1 + x2 + x1:x2, data = df)`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">Linear • Logistic • Polynomial • Ready for thesis &amp; publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Regression Types */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Regression &amp; Correlation Models We Deliver</h2>
              <p className="mt-3 text-muted-foreground">From simple linear to advanced nonlinear modeling</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {regressionTypes.map((type, i) => (
                <Card key={i} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="font-semibold text-xl mb-3">{type.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{type.desc}</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Regression &amp; Correlation Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Rigorous and publication-ready statistical modeling process</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, publication-ready regression analysis package.</p>
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
                            <p className="font-semibold">Reproducible Scripts</p>
                            <p className="text-sm text-muted-foreground">SPSS, R &amp; Python code</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Report</p>
                            <p className="text-sm text-muted-foreground">Full model interpretation</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Diagnostic Plots</p>
                            <p className="text-sm text-muted-foreground">Residuals, QQ plots &amp; more</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Ready</p>
                            <p className="text-sm text-muted-foreground">APA/IEEE formatted tables</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our Regression Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Regression Analysis Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your variables and research objectives — receive a detailed proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your regression/correlation analysis requirements" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready for Robust Regression Analysis?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From simple linear models to complex nonlinear regression — we deliver statistically sound, publication-ready results.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Regression Project</Link>
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