import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Database, Zap, Layers, Eye, GitBranch, FileText, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Cleaning & Preprocessing | CogniCode",
  description: "Expert data cleaning and preprocessing for PhD research and big data projects. Handling missing values, outliers, duplicates, normalization, feature scaling, encoding, and automated pipelines using Pandas, NumPy, and PySpark.",
};

const techniques = [
  { title: "Missing Data Handling", desc: "Imputation techniques, deletion strategies, and advanced methods like KNN, MICE, and deep learning-based imputation" },
  { title: "Outlier Detection & Treatment", desc: "Statistical, IQR, Z-score, and isolation forest methods with robust handling strategies" },
  { title: "Feature Engineering & Scaling", desc: "Normalization, standardization, encoding (One-Hot, Label, Target), and advanced transformations" },
  { title: "Automated Data Pipelines", desc: "End-to-end preprocessing pipelines using scikit-learn, Pandas, and PySpark for scalable, reproducible workflows" },
];

const deliverables = [
  "Cleaned, analysis-ready dataset with detailed data quality report",
  "Fully automated, reproducible preprocessing pipeline (Python/R/Spark)",
  "Before/after comparison visualizations and data quality metrics",
  "Comprehensive methodology chapter ready for thesis and publication",
  "Git repository with clean, well-documented, and version-controlled code",
  "Interactive Jupyter notebook for transparency and reproducibility",
  "Publication-ready summary tables and diagnostic plots",
  "One-to-one training session + 6 months of free pipeline updates",
];

const steps = [
  {
    step: "01",
    title: "Data Quality Assessment",
    desc: "Comprehensive audit of missing values, duplicates, outliers, inconsistencies, and data types.",
    icon: Database,
  },
  {
    step: "02",
    title: "Cleaning & Transformation",
    desc: "Handle missing data, remove duplicates, treat outliers, and perform necessary transformations.",
    icon: Zap,
  },
  {
    step: "03",
    title: "Feature Engineering & Scaling",
    desc: "Create new features, encode categorical variables, and apply appropriate scaling/normalization.",
    icon: Layers,
  },
  {
    step: "04",
    title: "Validation & Delivery",
    desc: "Validate data quality, build automated pipeline, and deliver complete documentation.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level data scientists with 10+ years experience",
  "Expertise in Pandas, NumPy, PySpark, scikit-learn, and Dask",
  "Scalable solutions for small to massive datasets",
  "Fully automated and reproducible preprocessing pipelines",
  "Support for structured, unstructured, and big data formats",
  "100% reproducible and transparent workflows",
  "Free revisions until your supervisor approves",
  "Lifetime access to pipelines and future improvements",
];

export default function DataCleaningPreprocessingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-orange-50 via-amber-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-orange-600/10 px-4 py-2 text-sm font-medium text-orange-700 mb-6">
                  <Database className="h-4 w-4" />
                  DATA CLEANING &amp; PREPROCESSING
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Data Cleaning &amp;<br />Preprocessing
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Professional data wrangling and preprocessing services: handling missing values, outliers, feature engineering, and building automated pipelines for reliable downstream analysis.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Data Cleaning Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Cleaning Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-orange-600 to-amber-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Sparkles className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">99.8%</p>
                        <p className="text-sm opacity-75">Data Quality</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-amber-200">
{`df_clean = (df
    .pipe(handle_missing)
    .pipe(remove_outliers)
    .pipe(scale_features))`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">Pandas • PySpark • Automated • Ready for analysis &amp; publication</p>
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
              <h2 className="font-serif text-4xl font-bold">Data Cleaning Techniques We Master</h2>
              <p className="mt-3 text-muted-foreground">From basic cleaning to advanced automated pipelines</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Data Cleaning &amp; Preprocessing Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Systematic, reproducible, and production-ready process</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, ready-to-use clean data pipeline.</p>
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
                            <p className="font-semibold">Automated Pipeline</p>
                            <p className="text-sm text-muted-foreground">Reusable &amp; scalable code</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Documentation</p>
                            <p className="text-sm text-muted-foreground">Full methodology section</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Quality Visualizations</p>
                            <p className="text-sm text-muted-foreground">Before vs After reports</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Support</p>
                            <p className="text-sm text-muted-foreground">Data quality metrics &amp; tables</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our Data Cleaning Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Data Cleaning Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your dataset and challenges : receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your dataset size, issues, and preprocessing goals" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready for Clean, Analysis-Ready Data?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From messy raw data to production-ready datasets : we deliver high-quality, reproducible preprocessing solutions.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Data Cleaning Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services/data-driven/data-science-big-data">Back to Data Science &amp; Big Data Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}