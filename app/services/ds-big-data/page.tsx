import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Database, Search, Server, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Science & Big Data | CogniCode",
  description: "Expert Data Science and Big Data research support — data cleaning, Exploratory Data Analysis (EDA), Big Data Analytics with Spark/Hadoop, and interactive dashboards using Python, Tableau, Power BI for PhD and industry projects.",
};

const features = [
  {
    icon: Database,
    title: "Data Cleaning & Preprocessing",
    description: "Comprehensive data wrangling — handling missing values, outliers, duplicates, normalization, feature scaling, encoding, and pipeline automation using Pandas, NumPy, and PySpark.",
    href: "/services/ds-big-data/data-cleaning-preprocessing"
  },
  {
    icon: Search,
    title: "Exploratory Data Analysis (EDA)",
    description: "In-depth statistical summaries, correlation analysis, distribution visualization, pattern discovery, and actionable insights using Python, R, and interactive notebooks.",
    href: "/services/ds-big-data/exploratory-data-analysis"
  },
  {
    icon: Server,
    title: "Big Data Analytics",
    description: "Scalable processing of massive datasets with Apache Spark, Hadoop, Hive, Kafka, and distributed computing for real-time analytics and batch processing.",
    href: "/services/ds-big-data/big-data-analytics"
  },
  {
    icon: BarChart3,
    title: "Data Visualization & Dashboarding",
    description: "Interactive dashboards and publication-ready visualizations using Tableau, Power BI, Matplotlib, Seaborn, Plotly, Dash, and Streamlit for clear data storytelling.",
    href: "/services/ds-big-data/data-visualization-dashboarding"
  },
];

const steps = [
  {
    step: "01",
    title: "Data Ingestion & Requirement Analysis",
    description: "We understand your research goals, data sources, volume, and velocity to design the optimal data science and big data architecture.",
  },
  {
    step: "02",
    title: "Data Cleaning & Preprocessing",
    description: "Clean, transform, and prepare high-quality datasets with automated pipelines and rigorous validation for reliable downstream analysis.",
  },
  {
    step: "03",
    title: "EDA & Advanced Analytics",
    description: "Perform deep exploratory analysis and apply big data techniques using Spark, machine learning, and statistical modeling.",
  },
  {
    step: "04",
    title: "Visualization & Delivery",
    description: "Build interactive dashboards and deliver publication-ready insights, code, documentation, and deployment-ready solutions.",
  },
];

const benefits = [
  "PhD-level data scientists with 10+ years experience",
  "Expertise in Python, R, Spark, Hadoop, SQL, and NoSQL",
  "End-to-end scalable big data pipelines",
  "Interactive dashboards with Tableau, Power BI & Streamlit",
  "Publication-ready visualizations and reports",
  "Fully reproducible code and notebooks provided",
  "Real-time & batch analytics solutions",
  "Post-delivery support and model maintenance",
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
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Data Science & Big Data</p>
                <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Data Science & Big Data Research Support
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  From raw data to actionable insights — expert data cleaning, EDA, big data analytics, and stunning interactive dashboards for PhD research and industry applications.
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
                      <Database className="h-12 w-12" />
                      <div>
                        <p className="text-3xl font-bold">450+</p>
                        <p className="text-sm text-primary-foreground/80">Data Science Projects Delivered</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">20+</p>
                      <p className="text-sm text-muted-foreground">Big Data Tools & Frameworks</p>
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
                { icon: Users, text: "Expert Data Scientists" },
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
                What We Deliver in Data Science & Big Data
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
                Our Data Science & Big Data Workflow
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A structured, scalable pipeline from raw data to actionable insights and production-ready dashboards.
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
                  Why Choose Our Data Science & Big Data Service?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  We deliver scalable, reproducible, and production-ready data science solutions with full transparency and documentation.
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
                  <h3 className="text-xl font-semibold text-foreground">Get a Free Data Science Estimate</h3>
                  <p className="mt-2 text-muted-foreground">Share your project requirements and receive a detailed quote within 24 hours.</p>
                  <form className="mt-6 space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                      <option value="">Select Service</option>
                      <option value="data-cleaning">Data Cleaning & Preprocessing</option>
                      <option value="eda">Exploratory Data Analysis (EDA)</option>
                      <option value="big-data">Big Data Analytics</option>
                      <option value="visualization">Data Visualization & Dashboarding</option>
                      <option value="other">Other Data Science Services</option>
                    </select>
                    <Button className="w-full" size="lg">
                      Get Free Consultation
                    </Button>
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
              Need Expert Data Science & Big Data Support?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              From raw data to interactive dashboards — our experts turn complex datasets into powerful insights.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
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