import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Target, Zap, BarChart3, Eye, GitBranch, FileText, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Hypothesis Testing | CogniCode",
  description: "Expert hypothesis testing for PhD research. Parametric and non-parametric tests including t-tests, ANOVA, chi-square, Mann-Whitney, Wilcoxon, and more — with clear interpretation, p-values, effect sizes, and publication-ready reports.",
};

const testTypes = [
  { title: "Parametric Tests", desc: "t-tests (one-sample, independent, paired), ANOVA (one-way, two-way, repeated measures), and more" },
  { title: "Non-Parametric Tests", desc: "Mann-Whitney U, Wilcoxon signed-rank, Kruskal-Wallis, Friedman test, and chi-square tests" },
  { title: "Advanced Tests", desc: "MANOVA, ANCOVA, post-hoc analysis, multiple comparison corrections (Bonferroni, Tukey, FDR)" },
  { title: "Power & Sample Size", desc: "A priori and post-hoc power analysis, sample size determination for reliable conclusions" },
];

const deliverables = [
  "Complete hypothesis testing report with all assumptions checks and interpretations",
  "Detailed statistical output tables (p-values, confidence intervals, effect sizes)",
  "Publication-ready graphs (box plots, QQ plots, interaction plots)",
  "Methodology chapter section ready for thesis and journal submission",
  "Reproducible code/scripts in SPSS, R, or Python",
  "Git repository with full analysis pipeline",
  "Assumption violation diagnostics and recommended alternatives",
  "One-to-one review session + 6 months of free revisions and support",
];

const steps = [
  {
    step: "01",
    title: "Research Question & Hypothesis Formulation",
    desc: "Clearly define null and alternative hypotheses based on your research objectives.",
    icon: Target,
  },
  {
    step: "02",
    title: "Assumption Checking",
    desc: "Test normality, homogeneity of variance, independence, and other required assumptions.",
    icon: Scale,
  },
  {
    step: "03",
    title: "Test Selection & Execution",
    desc: "Choose and run the most appropriate parametric or non-parametric test using SPSS, R, or Python.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Interpretation & Reporting",
    desc: "Provide clear statistical interpretation, effect sizes, and APA/IEEE formatted results.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level statisticians with 10+ years experience",
  "Expertise in SPSS, R, Python, and Stata for hypothesis testing",
  "Rigorous assumption checking and appropriate test selection",
  "Clear, publication-ready interpretation and reporting",
  "Effect size calculations and power analysis included",
  "Full reproducibility and transparent methodology",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your supervisor or journal approves",
];

export default function HypothesisTestingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-50 via-purple-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-violet-600/10 px-4 py-2 text-sm font-medium text-violet-700 mb-6">
                  <Target className="h-4 w-4" />
                  HYPOTHESIS TESTING
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Hypothesis Testing
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Rigorous parametric and non-parametric hypothesis testing for PhD research — with full assumption checks, clear interpretation, and publication-ready results.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Hypothesis Testing Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Testing Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <BarChart3 className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">p &lt; 0.001</p>
                        <p className="text-sm opacity-75">Highly Significant</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-violet-200">
{`t.test(data$group1, data$group2, 
       var.equal = FALSE)`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">t-test • ANOVA • Mann-Whitney • Ready for thesis &amp; publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Test Types */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Hypothesis Tests We Perform</h2>
              <p className="mt-3 text-muted-foreground">Parametric, non-parametric, and advanced statistical tests</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testTypes.map((test, i) => (
                <Card key={i} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="font-semibold text-xl mb-3">{test.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{test.desc}</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Hypothesis Testing Process</h2>
              <p className="mt-4 text-lg text-muted-foreground">Rigorous, transparent, and academically sound</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, publication-ready hypothesis testing package.</p>
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
                            <p className="text-sm text-muted-foreground">Full interpretation &amp; assumptions</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Visual Diagnostics</p>
                            <p className="text-sm text-muted-foreground">QQ plots, boxplots &amp; more</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Ready</p>
                            <p className="text-sm text-muted-foreground">APA/IEEE formatted results</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our Hypothesis Testing Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Hypothesis Testing Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your research questions and data — receive a detailed proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your research hypotheses and dataset" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready for Rigorous Hypothesis Testing?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From simple t-tests to complex MANOVA — we deliver statistically sound, publication-ready results.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Hypothesis Testing Project</Link>
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