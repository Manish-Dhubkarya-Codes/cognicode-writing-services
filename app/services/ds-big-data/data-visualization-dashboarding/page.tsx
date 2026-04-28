import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, BarChart3, Monitor, Palette, Zap, Eye, GitBranch, FileText, Sparkles, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Visualization & Dashboarding | CogniCode",
  description: "Expert data visualization and interactive dashboard development using Tableau, Power BI, Matplotlib, Seaborn, Plotly, Dash, and Streamlit for PhD research and publication-ready insights.",
};

const techniques = [
  { title: "Interactive Dashboards", desc: "Professional dashboards in Tableau and Power BI with real-time filtering and drill-down capabilities" },
  { title: "Advanced Python Visualizations", desc: "Publication-quality charts using Matplotlib, Seaborn, Plotly, and Altair" },
  { title: "Web-Based Dashboards", desc: "Custom interactive apps with Dash, Streamlit, and Shiny for dynamic data exploration" },
  { title: "Storytelling & Reporting", desc: "Data storytelling, animated visualizations, and executive-level reports" },
];

const deliverables = [
  "Fully interactive dashboards (Tableau, Power BI, Streamlit, Dash)",
  "Publication-ready static and dynamic visualizations",
  "Reproducible Python/R code for all charts and dashboards",
  "Interactive web applications for data exploration",
  "Detailed methodology chapter ready for thesis and journal submission",
  "Git repository with clean, well-documented visualization code",
  "High-resolution export-ready figures and infographics",
  "One-to-one training session + 6 months of free dashboard updates",
];

const steps = [
  {
    step: "01",
    title: "Data Understanding & Requirements",
    desc: "Analyze your dataset and define visualization goals, audience, and key metrics to communicate.",
    icon: Search,
  },
  {
    step: "02",
    title: "Visualization Design & Development",
    desc: "Create effective charts, graphs, and layouts using best practices in data visualization.",
    icon: Palette,
  },
  {
    step: "03",
    title: "Dashboard Building & Interactivity",
    desc: "Develop interactive dashboards with filters, drill-downs, and real-time capabilities.",
    icon: Monitor,
  },
  {
    step: "04",
    title: "Review, Polish & Delivery",
    desc: "Refine visuals, ensure accessibility, and deliver publication-ready dashboards with documentation.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level data visualization experts",
  "Mastery of Tableau, Power BI, Plotly, Dash, Streamlit, and more",
  "Publication-quality and interactive dashboards",
  "Strong focus on clarity, storytelling, and audience needs",
  "Fully reproducible and maintainable visualization code",
  "Support for complex, large-scale, and real-time data",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your supervisor or journal approves",
];

export default function DataVisualizationDashboardingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-50 via-violet-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-violet-600/10 px-4 py-2 text-sm font-medium text-violet-700 mb-6">
                  <BarChart3 className="h-4 w-4" />
                  DATA VISUALIZATION &amp; DASHBOARDING
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Data Visualization &amp;<br />Dashboarding
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Stunning, interactive dashboards and publication-ready visualizations using Tableau, Power BI, Plotly, Dash, Streamlit, and more — turning complex data into clear insights.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Build Your Dashboard</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Visualization Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Palette className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">Clear Insights</p>
                        <p className="text-sm opacity-75">Delivered</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-violet-200">
{`px.bar(df, x="category", y="value", 
       color="group")`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">Tableau • Power BI • Plotly • Ready for thesis &amp; publication</p>
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
              <h2 className="font-serif text-4xl font-bold">Data Visualization &amp; Dashboarding Solutions</h2>
              <p className="mt-3 text-muted-foreground">From static charts to fully interactive dashboards</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Data Visualization Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">From raw data to compelling, publication-ready visuals</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, visually compelling data storytelling package.</p>
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
                            <p className="font-semibold">Reproducible Code</p>
                            <p className="text-sm text-muted-foreground">Plotly, Dash, Streamlit ready</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Visuals</p>
                            <p className="text-sm text-muted-foreground">High-resolution &amp; formatted</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Interactive Dashboards</p>
                            <p className="text-sm text-muted-foreground">Tableau / Power BI / Web apps</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Quality</p>
                            <p className="text-sm text-muted-foreground">Journal &amp; presentation ready</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our Visualization Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Visualization Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your data and storytelling needs — receive a detailed proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your data visualization and dashboard requirements" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready to Turn Data into Compelling Stories?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From insightful charts to interactive dashboards — we make your data visually powerful and publication-ready.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Visualization Project</Link>
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