import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, BarChart3, Code, Database, FileText, Eye, GitBranch, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "SPSS / R / Python-Based Analysis | CogniCode",
  description: "Expert end-to-end statistical analysis using SPSS, R, and Python. Data cleaning, visualization, scripting, automation, and reproducible research pipelines for PhD thesis and academic publications.",
};

const tools = [
  { title: "SPSS", desc: "Comprehensive statistical analysis, data management, and advanced graphical reporting" },
  { title: "R Programming", desc: "Advanced statistical modeling, custom visualizations, and reproducible research with R Markdown" },
  { title: "Python (Pandas, NumPy, Statsmodels)", desc: "Scalable data wrangling, automation, machine learning integration, and production-ready scripts" },
  { title: "Cross-Tool Integration", desc: "Seamless workflows combining SPSS, R, and Python for maximum flexibility and efficiency" },
];

const deliverables = [
  "Fully reproducible analysis scripts and notebooks (R Markdown, Jupyter, SPSS Syntax)",
  "Cleaned and validated datasets with detailed data dictionary",
  "Publication-ready tables, charts, and statistical summaries",
  "Complete methodology chapter with code explanations for thesis",
  "Git repository with version-controlled, well-documented code",
  "Interactive dashboards and visualizations (ggplot2, seaborn, plotly)",
  "APA / MLA / IEEE formatted results and supplementary material",
  "One-to-one walkthrough session + 6 months of free revisions and updates",
];

const steps = [
  {
    step: "01",
    title: "Data Import & Exploration",
    desc: "Import data from any format, perform exploratory analysis, and identify data quality issues.",
    icon: Database,
  },
  {
    step: "02",
    title: "Cleaning & Preprocessing",
    desc: "Handle missing values, outliers, transformations, and create analysis-ready datasets.",
    icon: Zap,
  },
  {
    step: "03",
    title: "Statistical Analysis & Modeling",
    desc: "Run descriptive statistics, hypothesis tests, regression, and advanced modeling using your preferred tool.",
    icon: BarChart3,
  },
  {
    step: "04",
    title: "Visualization & Reporting",
    desc: "Generate publication-quality graphs and deliver complete, reproducible reports.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level statisticians with 10+ years experience in SPSS, R & Python",
  "Expertise in both GUI-based (SPSS) and code-based (R/Python) analysis",
  "Fully reproducible and transparent workflows",
  "Publication-ready outputs in APA, MLA, IEEE formats",
  "Support for large datasets and complex statistical models",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your supervisor approves",
  "Lifetime access to scripts and future updates",
];

export default function SpssRPythonPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-2 text-sm font-medium text-blue-700 mb-6">
                  <BarChart3 className="h-4 w-4" />
                  SPSS / R / PYTHON-BASED ANALYSIS
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  SPSS, R &amp; Python<br />Statistical Analysis
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  End-to-end data analysis using industry-standard tools. From data cleaning to publication-ready results — fully reproducible and academically rigorous.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Your Analysis Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Analysis Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Code className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">100%</p>
                        <p className="text-sm opacity-75">Reproducible</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-cyan-200">
{`# Python / R / SPSS
df = pd.read_csv("data.csv")
model = sm.OLS(y, X).fit()`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">SPSS • R • Python • Ready for thesis &amp; publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Tools We Master */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Tools &amp; Technologies We Master</h2>
              <p className="mt-3 text-muted-foreground">Choose any tool — we deliver expert-level analysis</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, i) => (
                <Card key={i} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="font-semibold text-xl mb-3">{tool.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{tool.desc}</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Statistical Analysis Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Tool-agnostic yet highly specialized process</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, publication-ready statistical analysis package.</p>
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
                            <p className="text-sm text-muted-foreground">SPSS Syntax, R Markdown, Jupyter</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Report</p>
                            <p className="text-sm text-muted-foreground">Full methodology &amp; results</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Visuals</p>
                            <p className="text-sm text-muted-foreground">High-quality charts &amp; tables</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">APA/IEEE Ready</p>
                            <p className="text-sm text-muted-foreground">Formatted outputs for journals</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our SPSS/R/Python Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Statistical Analysis Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your dataset and research objectives — receive a detailed proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your dataset and statistical analysis requirements" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready for Professional Statistical Analysis?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From SPSS to Python — we deliver accurate, reproducible, and publication-ready results.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Analysis Project</Link>
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