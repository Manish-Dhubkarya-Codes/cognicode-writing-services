import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, BarChart3, Target, TrendingUp, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Statistical Analysis & Data Analytics | CogniCode",
  description: "Expert statistical analysis and data analytics support using SPSS, R, Python — hypothesis testing, regression, multivariate & factor analysis for PhD research and academic publications.",
};

const features = [
  {
    icon: BarChart3,
    title: "SPSS / R / Python-Based Analysis",
    description: "End-to-end data analysis using industry-standard tools. Data cleaning, visualization, scripting, and automation with SPSS, R, and Python for fully reproducible research results.",
    href: "/services/statistical-analysis-data-analytics/spss-r-python"
  },
  {
    icon: Target,
    title: "Hypothesis Testing",
    description: "Comprehensive parametric and non-parametric tests including t-tests, ANOVA, chi-square, Mann-Whitney, Wilcoxon, and more — with clear interpretation and p-value reporting.",
    href: "/services/statistical-analysis-data-analytics/hypothesis-testing"
  },
  {
    icon: TrendingUp,
    title: "Regression & Correlation Analysis",
    description: "Linear, multiple, logistic, polynomial, and nonlinear regression models. Correlation analysis, multicollinearity diagnostics, and model validation for robust statistical conclusions.",
    href: "/services/statistical-analysis-data-analytics/regression-correlation"
  },
  {
    icon: Layers,
    title: "Multivariate & Factor Analysis",
    description: "Advanced multivariate techniques including MANOVA, PCA, factor analysis, cluster analysis, discriminant analysis, and structural equation modeling (SEM).",
    href: "/services/statistical-analysis-data-analytics/multivariate-factor"
  },
];

const steps = [
  {
    step: "01",
    title: "Research Objective & Data Review",
    description: "We understand your research questions, variables, and dataset structure to define the most appropriate statistical approach.",
  },
  {
    step: "02",
    title: "Data Preparation & Cleaning",
    description: "Handle missing values, outliers, normality checks, data transformation, and create clean, analysis-ready datasets.",
  },
  {
    step: "03",
    title: "Statistical Modeling & Analysis",
    description: "Apply hypothesis testing, regression, multivariate, and factor analysis using SPSS, R, or Python with full code and methodology documentation.",
  },
  {
    step: "04",
    title: "Results Interpretation & Reporting",
    description: "Deliver publication-ready tables, graphs, interpretation, and APA/MLA/IEEE formatted results with complete statistical validation.",
  },
];

const benefits = [
  "PhD-level statisticians with 10+ years experience",
  "SPSS, R, Python, Stata & SAS expertise",
  "Advanced statistical modeling & machine learning",
  "Publication-ready tables, charts & graphs",
  "APA, MLA, IEEE & journal-specific formatting",
  "Fully reproducible code & scripts provided",
  "Detailed methodology & assumption checks",
  "Post-delivery support & revisions included",
];

export default function ServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Statistical Analysis & Data Analytics</p>
                <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Statistical Analysis & Data Analytics Research Support
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  From basic descriptive statistics to advanced multivariate modeling — our experts deliver publication-ready statistical analysis using SPSS, R, and Python.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/contact">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <BarChart3 className="h-12 w-12" />
                      <div>
                        <p className="text-3xl font-bold">500+</p>
                        <p className="text-sm text-primary-foreground/80">Statistical Projects Delivered</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">15+</p>
                      <p className="text-sm text-muted-foreground">Statistical Tools & Languages</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">100%</p>
                      <p className="text-sm text-muted-foreground">Reproducible Results</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="bg-primary py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {[
                { icon: Shield, text: "Original Research" },
                { icon: Clock, text: "On-Time Delivery" },
                { icon: Users, text: "Expert Statisticians" },
                { icon: Award, text: "Fully Documented" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-primary-foreground">
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Deliver - Clickable Cards */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What We Deliver in Statistical Analysis & Data Analytics
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Click on any service below to explore detailed offerings
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {features.map((f, i) => (
                <Link key={i} href={f.href} className="block group">
                  <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 h-full group-hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <f.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3>
                      <p className="mt-2 text-muted-foreground">{f.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Statistical Analysis Workflow
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A structured, research-grade pipeline from data preparation to publication-ready results.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {s.step}
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us + Form */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Why Choose Our Statistical Analysis Service?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  We deliver accurate, reproducible, and publication-ready statistical results with complete transparency.
                </p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground">Get a Free Statistical Analysis Estimate</h3>
                  <p className="mt-2 text-muted-foreground">Share your research requirements and receive a detailed quote within 24 hours.</p>
                  <form className="mt-6 space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    <input type="email" placeholder="Email Address" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    <input type="tel" placeholder="Phone Number" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    <select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                      <option value="">Select Analysis Type</option>
                      <option value="spss-r-python">SPSS / R / Python-Based Analysis</option>
                      <option value="hypothesis-testing">Hypothesis Testing</option>
                      <option value="regression">Regression & Correlation Analysis</option>
                      <option value="multivariate">Multivariate & Factor Analysis</option>
                      <option value="other">Other Statistical Services</option>
                    </select>
                    <Button className="w-full" size="lg">Get Free Consultation</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-black sm:text-4xl">
              Need Expert Statistical Analysis Support?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              From hypothesis testing to multivariate modeling — our statisticians turn raw data into publication-ready insights.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}