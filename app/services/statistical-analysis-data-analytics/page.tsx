import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, BarChart3, Target, TrendingUp, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "SPSS, AMOS, CFA, SEM & SmartPLS Analysis | CogniCode",
  description: "Expert statistical analysis using SPSS, AMOS, SmartPLS : Confirmatory Factor Analysis (CFA), Structural Equation Modeling (SEM) for PhD research and academic publications.",
};

const features = [
  {
    icon: BarChart3,
    title: "Statistical Package for the Social Sciences (SPSS)",
    description: "Complete SPSS-based statistical analysis including data cleaning, descriptive statistics, hypothesis testing, regression, and advanced multivariate analysis with publication-ready output.",
    href: "/services/statistical-analysis-data-analytics/spss",
    image: "/data-driven-services/sa-da/spss/spss.png"
  },
  {
    icon: Layers,
    title: "Analysis of Moment Structures (AMOS)",
    description: "Professional AMOS modeling for path analysis, structural equation modeling, and complex relationships with excellent visual diagrams and model fit assessment.",
    href: "/services/statistical-analysis-data-analytics/amos",
    image: "/data-driven-services/sa-da/amos/amos.png"
  },
  {
    icon: Target,
    title: "Confirmatory Factor Analysis (CFA)",
    description: "Advanced CFA using AMOS and SmartPLS to validate measurement models, assess construct validity, reliability, and model fit indices for research instruments.",
    href: "/services/statistical-analysis-data-analytics/cfa",
    image: "/data-driven-services/sa-da/cfa/cfa.png"
  },
  {
    icon: TrendingUp,
    title: "Structural Equation Modeling (SEM)",
    description: "Comprehensive Structural Equation Modeling (SEM) using AMOS and SmartPLS including mediation, moderation, and multi-group analysis with detailed interpretation.",
    href: "/services/statistical-analysis-data-analytics/sem",
    image: "/data-driven-services/sa-da/sem/sem.png"
  },
  {
    icon: Layers,
    title: "SmartPLS Analysis",
    description: "Expert Partial Least Squares Structural Equation Modeling (PLS-SEM) using SmartPLS for predictive modeling, complex models, and exploratory research with bootstrapping.",
    href: "/services/statistical-analysis-data-analytics/smartpls",
    image: "/data-driven-services/sa-da/smartpls-analysis/smartpls.png"
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
    description: "Apply SPSS, AMOS, CFA, SEM, and SmartPLS techniques with full code/scripts and detailed methodology documentation.",
  },
  {
    step: "04",
    title: "Results Interpretation & Reporting",
    description: "Deliver publication-ready tables, graphs, model fit indices, interpretation, and APA/MLA/IEEE formatted results.",
  },
];

const benefits = [
  "PhD-level statisticians with 10+ years experience",
  "Expertise in SPSS, AMOS, and SmartPLS",
  "Confirmatory Factor Analysis (CFA)",
  "Structural Equation Modeling (SEM)",
  "Publication-ready tables, charts & diagrams",
  "APA, MLA, IEEE & journal-specific formatting",
  "Fully reproducible analysis files provided",
  "Detailed methodology & assumption checks",
  "Model fit assessment and validation",
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
                  SPSS, AMOS, CFA, SEM & SmartPLS Analysis
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Expert statistical analysis and structural equation modeling using SPSS, AMOS, and SmartPLS for PhD research, theses, and high-impact academic publications.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link prefetch={false} href="/contact">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link prefetch={false} href="/samples">View Samples</Link>
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
                      <p className="text-sm text-muted-foreground">Statistical Tools</p>
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

        {/* What We Deliver - Clickable Cards with Banner Images */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Statistical Analysis Services
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Click on any service below to explore detailed offerings
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <Link prefetch={false} key={i} href={f.href} className="block group">
                  <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 h-full group-hover:-translate-y-1">
                    
                    {/* Background Image - Full Visibility */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={f.image} 
                        alt={f.title}
                        className="h-full w-full object-cover transition-transform duration-700 scale-105"
                      />
                      {/* Soft Gradient Overlay: Dark only at the bottom, clear at the top */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    </div>

                    {/* Content Container - Pushed to the bottom */}
                    <CardContent className="relative z-10 p-6 flex flex-col h-full justify-end min-h-[300px]">
                      {/* Icon with a subtle backdrop blur */}
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-white/20 backdrop-blur-md border border-white/30">
                        <f.icon className="h-5 w-5 text-white" />
                      </div>
                      
                      {/* Text with subtle shadow for legibility */}
                      <h3 className="text-xl font-bold text-white drop-shadow-md">
                        {f.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-100/90 drop-shadow-sm">
                        {f.description}
                      </p>
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
                  We specialize in SPSS, AMOS, CFA, SEM, and SmartPLS with complete transparency and publication standards.
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
                      <option value="spss">SPSS Analysis</option>
                      <option value="amos">AMOS Analysis</option>
                      <option value="cfa">Confirmatory Factor Analysis (CFA)</option>
                      <option value="sem">Structural Equation Modeling (SEM)</option>
                      <option value="smartpls">SmartPLS Analysis</option>
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
              Need Expert SPSS, AMOS or SmartPLS Support?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              From CFA and SEM to advanced PLS-SEM modeling : our experts deliver high-quality, publication-ready statistical analysis.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link prefetch={false} href="/contact">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary" asChild>
                <Link prefetch={false} href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}