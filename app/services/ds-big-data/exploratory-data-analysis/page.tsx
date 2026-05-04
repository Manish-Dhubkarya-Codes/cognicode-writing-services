import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Search, BarChart3, TrendingUp, Eye, GitBranch, FileText, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Exploratory Data Analysis (EDA) | CogniCode",
  description: "Expert Exploratory Data Analysis (EDA) for PhD research and big data projects. In-depth statistical summaries, correlation analysis, distribution visualization, pattern discovery, and actionable insights using Python, R, and interactive notebooks.",
};

const techniques = [
  { title: "Univariate Analysis", desc: "Descriptive statistics, distributions, histograms, box plots, and outlier identification for individual variables" },
  { title: "Bivariate & Multivariate Analysis", desc: "Correlation matrices, scatter plots, pair plots, and cross-tabulations to uncover relationships" },
  { title: "Data Visualization & Pattern Discovery", desc: "Interactive visualizations using Matplotlib, Seaborn, Plotly, and ggplot2 for clear insights" },
  { title: "Advanced EDA Techniques", desc: "Dimensionality reduction (PCA), clustering, time-series decomposition, and automated EDA reports" },
];

const deliverables = [
  "Comprehensive EDA report with statistical summaries and visualizations",
  "Interactive Jupyter Notebook / R Markdown for full transparency",
  "Correlation heatmaps, distribution plots, and relationship visualizations",
  "Actionable insights and recommendations for further modeling",
  "Detailed methodology section ready for thesis and journal submission",
  "Git repository with clean, reproducible, and well-documented code",
  "Publication-ready figures and summary tables",
  "One-to-one walkthrough session + 6 months of free updates and revisions",
];

const steps = [
  {
    step: "01",
    title: "Data Understanding & Loading",
    desc: "Load datasets, inspect structure, data types, and initial quality overview.",
    icon: Search,
  },
  {
    step: "02",
    title: "Univariate & Descriptive Analysis",
    desc: "Compute summary statistics, visualize distributions, and identify anomalies.",
    icon: BarChart3,
  },
  {
    step: "03",
    title: "Bivariate & Multivariate Exploration",
    desc: "Analyze relationships, correlations, and interactions between variables.",
    icon: TrendingUp,
  },
  {
    step: "04",
    title: "Insights & Visualization Delivery",
    desc: "Summarize key findings, generate publication-ready visuals, and provide actionable recommendations.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level data scientists with 10+ years experience",
  "Expertise in Python (Pandas, Seaborn, Plotly) and R (ggplot2, tidyverse)",
  "Interactive and publication-quality visualizations",
  "Deep pattern discovery and hypothesis generation",
  "Fully reproducible EDA notebooks and reports",
  "Support for structured, unstructured, and big data",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your supervisor approves",
];

export default function ExploratoryDataAnalysisPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-cyan-50 via-teal-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-cyan-600/10 px-4 py-2 text-sm font-medium text-cyan-700 mb-6">
                  <Search className="h-4 w-4" />
                  EXPLORATORY DATA ANALYSIS (EDA)
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Exploratory Data Analysis
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  In-depth EDA to uncover patterns, relationships, and insights from your data : using Python, R, and interactive visualizations for PhD research and data-driven decisions.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start EDA Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View EDA Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-cyan-600 to-teal-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Sparkles className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">Deep Insights</p>
                        <p className="text-sm opacity-75">Discovered</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-cyan-200">
{`sns.pairplot(df, hue="target")
plt.show()`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">Python • R • Interactive • Ready for modeling &amp; publication</p>
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
              <h2 className="font-serif text-4xl font-bold">Exploratory Data Analysis Techniques We Master</h2>
              <p className="mt-3 text-muted-foreground">From basic summaries to advanced pattern discovery</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Exploratory Data Analysis Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Systematic discovery of insights from your data</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, insight-rich EDA package for your research.</p>
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
                            <p className="font-semibold">Interactive Notebook</p>
                            <p className="text-sm text-muted-foreground">Jupyter / R Markdown</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Report</p>
                            <p className="text-sm text-muted-foreground">Full insights &amp; visualizations</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Rich Visualizations</p>
                            <p className="text-sm text-muted-foreground">Seaborn, Plotly, ggplot2</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Support</p>
                            <p className="text-sm text-muted-foreground">High-quality figures &amp; summaries</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our EDA Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your EDA Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your dataset and research goals : receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your dataset and EDA objectives" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready to Discover Hidden Insights in Your Data?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From raw data to deep understanding : we deliver comprehensive, publication-ready Exploratory Data Analysis.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your EDA Project</Link>
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