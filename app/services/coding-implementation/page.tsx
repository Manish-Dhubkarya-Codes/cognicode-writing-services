import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, FileText, BookOpen, Search, Target, Globe, Edit, BarChart3, Cpu, FileCode, Code, Database, Terminal } from "lucide-react";

export const metadata: Metadata = { title: "Coding & Implementation | CogniCode", description: "Professional coding and software implementation support for academic research projects. Python, R, MATLAB, Java, and more." };

const features = [
  { icon: Cpu, title: "Algorithm Development", description: "Design and implement custom algorithms for machine learning, optimization, signal processing, and domain-specific research problems." },
  { icon: BarChart3, title: "Statistical Analysis", description: "Coding for statistical analysis using Python, R, and SPSS : from hypothesis testing to advanced multivariate analysis." },
  { icon: Database, title: "Data Processing", description: "Web scraping, data cleaning, transformation pipelines, and database management for large-scale research datasets." },
  { icon: Terminal, title: "Simulation & Modeling", description: "Build computational models and run simulations using MATLAB, Simulink, Python, and specialized research tools." },
  { icon: Globe, title: "Web & App Prototypes", description: "Develop research prototypes, dashboards, and web applications to demonstrate your research concepts effectively." },
  { icon: FileCode, title: "Clean Documentation", description: "Every line of code is well-commented and documented so you understand and can explain your implementation confidently." },
];

const steps = [
  { step: "01", title: "Requirement Gathering", description: "We understand your research objectives, data, expected outputs, and technical requirements in detail." },
  { step: "02", title: "Architecture Planning", description: "Design the solution architecture with appropriate tools, libraries, frameworks, and data flow." },
  { step: "03", title: "Development & Testing", description: "Write clean, efficient code with thorough testing and validation against expected results." },
  { step: "04", title: "Delivery & Walkthrough", description: "Deliver documented code with a walkthrough session so you understand every component." },
];

const benefits = ["Expert developers with research experience", "Clean, well-commented code delivery", "Full walkthrough and knowledge transfer", "Support for 15+ programming languages", "Debugging and optimization included", "Post-delivery support available", "Reproducible research code standards", "Version-controlled delivery via GitHub"];

export default function ServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        <section className="bg-primary/5 py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Coding & Implementation</p><h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Research Coding & Implementation Support</h1><p className="mt-6 text-lg leading-8 text-muted-foreground">From algorithm development to full-stack research prototypes, our developers translate your research requirements into clean, well-documented, and reproducible code.</p><div className="mt-8 flex flex-col gap-4 sm:flex-row"><Button size="lg" asChild><Link prefetch={false} href="/contact">Get Started</Link></Button><Button size="lg" variant="outline" asChild><Link prefetch={false} href="/samples">View Samples</Link></Button></div></div>
          <div className="space-y-4"><Card className="bg-primary text-primary-foreground"><CardContent className="p-6"><div className="flex items-center gap-4"><Code className="h-12 w-12" /><div><p className="text-3xl font-bold">15+</p><p className="text-sm text-primary-foreground/80">Languages Supported</p></div></div></CardContent></Card><div className="grid grid-cols-2 gap-4"><Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-primary">3000+</p><p className="text-sm text-muted-foreground">Projects Delivered</p></CardContent></Card><Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-primary">100%</p><p className="text-sm text-muted-foreground">Code Walkthrough</p></CardContent></Card></div></div>
        </div></div></section>

        <section className="bg-primary py-8"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-wrap items-center justify-center gap-8">{[{ icon: Shield, text: "Original Code" }, { icon: Clock, text: "On-Time Delivery" }, { icon: Users, text: "Expert Developers" }, { icon: Award, text: "Fully Documented" }].map((item, i) => (<div key={i} className="flex items-center gap-2 text-primary-foreground"><item.icon className="h-5 w-5" /><span className="text-sm font-medium">{item.text}</span></div>))}</div></div></section>

        <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What We Build for Researchers</h2><p className="mt-4 text-lg text-muted-foreground">From simple scripts to complex ML pipelines : we handle every coding need.</p></div><div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{features.map((f, i) => (<Card key={i} className="border-none shadow-lg hover:shadow-xl transition-shadow"><CardContent className="p-6"><div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"><f.icon className="h-6 w-6 text-primary" /></div><h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3><p className="mt-2 text-muted-foreground">{f.description}</p></CardContent></Card>))}</div></div></section>

        <section className="bg-muted/50 py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-2xl text-center mb-16"><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Development Process</h2><p className="mt-4 text-lg text-muted-foreground">A structured approach from requirement gathering to delivery with full knowledge transfer.</p></div><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{steps.map((s, i) => (<div key={i} className="text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">{s.step}</div><h3 className="mt-4 font-semibold text-foreground">{s.title}</h3><p className="mt-2 text-sm text-muted-foreground">{s.description}</p></div>))}</div></div></section>

        <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Choose Our Coding Service?</h2><p className="mt-4 text-lg text-muted-foreground">We deliver research-grade code with complete documentation and walkthrough.</p><ul className="mt-8 grid gap-3 sm:grid-cols-2">{benefits.map((b, i) => (<li key={i} className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-sm text-muted-foreground">{b}</span></li>))}</ul></div>
          <Card><CardContent className="p-8"><h3 className="text-xl font-semibold text-foreground">Get a Free Project Estimate</h3><p className="mt-2 text-muted-foreground">Share your coding requirements and get a detailed estimate.</p><form className="mt-6 space-y-4"><input type="text" placeholder="Your Name" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><input type="email" placeholder="Email Address" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><input type="tel" placeholder="Phone Number" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"><option value="">Select Technology</option>
<option value="python">Python</option>
<option value="r">R</option>
<option value="matlab">MATLAB</option>
<option value="java">Java / C++</option>
<option value="ml">Machine Learning</option>
<option value="other">Other</option></select><Button className="w-full" size="lg">Get Free Consultation</Button></form></CardContent></Card>
        </div></div></section>

        <section className="bg-primary py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"><h2 className="font-serif text-3xl font-bold text-black sm:text-4xl">Need Research Coding Support?</h2><p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">From Python scripts to full ML pipelines : our expert developers have you covered.</p><div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"><Button size="lg" variant="secondary" asChild><Link prefetch={false} href="/contact">Get Started</Link></Button><Button size="lg" variant="outline" className="border-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary" asChild><Link prefetch={false} href="/pricing">View Pricing</Link></Button></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
