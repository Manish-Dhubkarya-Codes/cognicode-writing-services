import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, BarChart3, Database, FileText, Zap, Eye, GitBranch, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "SPSS, STATA | CogniCode",
  description: "Professional statistical analysis using SPSS and STATA for PhD research. From data management and descriptive statistics to complex econometric modeling, hypothesis testing, and publication-ready outputs.",
};

const techniques = [
  { title: "SPSS Mastery", desc: "Data management, descriptive statistics, advanced inferential tests, GLM, and graphical reporting with SPSS Syntax" },
  { title: "STATA Expertise", desc: "Econometric modeling, panel data analysis, time-series, regression diagnostics, and reproducible do-files" },
  { title: "Data Management & Cleaning", desc: "Import/export, merging, reshaping, labeling, and cleaning large datasets in both tools" },
  { title: "Advanced Statistical Modeling", desc: "Hypothesis testing, ANOVA, regression, survival analysis, and complex survey data handling" },
];

const deliverables = [
  "Fully documented SPSS Syntax and STATA do-files for complete reproducibility",
  "Publication-ready statistical tables and high-quality graphs",
  "Cleaned and validated datasets with detailed data dictionary",
  "Methodology chapter ready for thesis and journal submission",
  "Git repository with version-controlled, well-commented code",
  "Interactive output files and diagnostic reports",
  "APA / MLA / IEEE formatted results and supplementary material",
  "One-to-one training session + 6 months of free revisions and support",
];

const steps = [
  {
    step: "01",
    title: "Data Import & Preparation",
    desc: "Import datasets, perform data cleaning, variable labeling, and ensure data quality in SPSS/STATA.",
    icon: Database,
  },
  {
    step: "02",
    title: "Exploratory & Descriptive Analysis",
    desc: "Generate summary statistics, frequency tables, and initial visualizations.",
    icon: BarChart3,
  },
  {
    step: "03",
    title: "Advanced Modeling & Testing",
    desc: "Run hypothesis tests, regression models, ANOVA, and econometric analyses.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Reporting & Delivery",
    desc: "Produce publication-ready outputs, methodology documentation, and final deliverables.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level statisticians with deep SPSS and STATA expertise",
  "Professional command of both GUI and syntax-based analysis",
  "Publication-ready outputs in APA, MLA, and IEEE formats",
  "Reproducible and transparent statistical workflows",
  "Support for complex survey data and longitudinal studies",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your supervisor approves",
  "Lifetime access to scripts and future updates",
];

export default function SpssStataPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-teal-50 via-cyan-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-600/10 px-4 py-2 text-sm font-medium text-teal-700 mb-6">
                  <BarChart3 className="h-4 w-4" />
                  SPSS, STATA
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  SPSS &amp; STATA
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Professional statistical analysis using SPSS and STATA — from data management and descriptive statistics to complex econometric modeling and hypothesis testing.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start SPSS/STATA Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View SPSS/STATA Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Terminal className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">Publication Ready</p>
                        <p className="text-sm opacity-75">Outputs</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-teal-200">
{`regress y x1 x2 i.group, robust`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">SPSS • STATA • Professional • Ready for thesis &amp; publication</p>
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
              <h2 className="font-serif text-4xl font-bold">SPSS &amp; STATA Capabilities We Master</h2>
              <p className="mt-3 text-muted-foreground">Professional statistical analysis at the highest level</p>
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
              <h2 className="font-serif text-4xl font-bold">Our SPSS &amp; STATA Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">From data import to publication-ready results</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, publication-ready SPSS/STATA analysis package.</p>
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
                            <p className="font-semibold">Reproducible Syntax</p>
                            <p className="text-sm text-muted-foreground">SPSS Syntax + STATA do-files</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Output</p>
                            <p className="text-sm text-muted-foreground">Full methodology &amp; results</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Visuals</p>
                            <p className="text-sm text-muted-foreground">High-quality graphs &amp; tables</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our SPSS/STATA Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your SPSS/STATA Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your research requirements and receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your statistical analysis needs with SPSS or STATA" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready for Professional SPSS &amp; STATA Analysis?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From data management to complex econometric modeling — we deliver publication-ready results using SPSS and STATA.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your SPSS/STATA Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services/data-driven/tools-technologies">Back to Tools &amp; Technologies</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}