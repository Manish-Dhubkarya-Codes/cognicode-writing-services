import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Server, Zap, Database, BarChart3, Eye, GitBranch, FileText, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Big Data Analytics | CogniCode",
  description: "Expert Big Data Analytics for PhD research and large-scale projects. Scalable processing with Apache Spark, Hadoop, Hive, Kafka : real-time and batch analytics with distributed computing.",
};

const techniques = [
  { title: "Apache Spark & Distributed Processing", desc: "Scalable data processing using Spark SQL, DataFrames, MLlib, and GraphX for massive datasets" },
  { title: "Hadoop Ecosystem", desc: "HDFS, MapReduce, Hive, Pig, and HBase for storage and batch processing of petabyte-scale data" },
  { title: "Real-Time Streaming Analytics", desc: "Kafka, Spark Streaming, Flink for real-time data ingestion, processing, and analytics" },
  { title: "Big Data Visualization & Insights", desc: "Distributed querying, aggregation, and visualization of insights from large-scale data" },
];

const deliverables = [
  "Scalable Big Data processing pipelines (Spark, Hadoop, Kafka)",
  "Real-time and batch analytics solutions with production-ready code",
  "Optimized distributed computing workflows for large-scale datasets",
  "Interactive dashboards and real-time monitoring systems",
  "Detailed methodology chapter ready for thesis and journal submission",
  "Git repository with reproducible, scalable, and well-documented code",
  "Performance benchmarks and cost-optimization reports",
  "One-to-one training session + 6 months of free pipeline optimization",
];

const steps = [
  {
    step: "01",
    title: "Data Ingestion & Architecture Design",
    desc: "Design scalable architecture and set up data ingestion pipelines for high-volume, high-velocity data.",
    icon: Database,
  },
  {
    step: "02",
    title: "Distributed Processing Setup",
    desc: "Configure Spark, Hadoop, Hive, and Kafka clusters for efficient batch and real-time processing.",
    icon: Server,
  },
  {
    step: "03",
    title: "Analytics & Modeling",
    desc: "Build advanced analytics, machine learning, and aggregation pipelines at scale.",
    icon: Sparkles,
  },
  {
    step: "04",
    title: "Visualization & Delivery",
    desc: "Deliver actionable insights, real-time dashboards, and complete academic documentation.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level big data engineers with 10+ years experience",
  "Expertise in Spark, Hadoop, Kafka, Hive, Flink, and cloud platforms",
  "Scalable solutions for petabyte-scale data processing",
  "Real-time and batch analytics pipelines",
  "Cost-optimized and high-performance architectures",
  "Fully reproducible and production-ready code",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your supervisor approves",
];

export default function BigDataAnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-red-50 via-orange-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-4 py-2 text-sm font-medium text-red-700 mb-6">
                  <Server className="h-4 w-4" />
                  BIG DATA ANALYTICS
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Big Data Analytics
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Scalable processing of massive datasets using Apache Spark, Hadoop, Hive, Kafka, and distributed computing for real-time and batch analytics.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Big Data Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Big Data Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-red-600 to-orange-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Zap className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">Petabyte Scale</p>
                        <p className="text-sm opacity-75">Processed Daily</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-orange-200">
{`spark = SparkSession.builder
    .appName("BigDataAnalytics")
    .getOrCreate()`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">Spark • Hadoop • Kafka • Ready for research &amp; production</p>
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
              <h2 className="font-serif text-4xl font-bold">Big Data Technologies We Master</h2>
              <p className="mt-3 text-muted-foreground">From batch processing to real-time streaming analytics</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Big Data Analytics Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Scalable, distributed, and production-ready pipeline</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, scalable big data analytics solution.</p>
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
                            <p className="font-semibold">Scalable Pipeline</p>
                            <p className="text-sm text-muted-foreground">Spark + Hadoop ready</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Report</p>
                            <p className="text-sm text-muted-foreground">Full architecture &amp; results</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Real-Time Dashboards</p>
                            <p className="text-sm text-muted-foreground">Interactive insights</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Support</p>
                            <p className="text-sm text-muted-foreground">Benchmarks &amp; visualizations</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our Big Data Analytics Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Big Data Analytics Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your data volume and analytics goals : receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your big data volume, sources, and analytics requirements" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready for Scalable Big Data Analytics?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From petabyte-scale batch processing to real-time streaming analytics : we deliver production-grade big data solutions.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Big Data Project</Link>
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