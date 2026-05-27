import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Compass, Search, Target, BarChart3, BookOpen, Globe, Users, Clock, Shield, Award } from "lucide-react";

export const metadata: Metadata = { title: "Research Consultation | CogniCode", description: "Expert research consultation services. Strategic guidance on research design, methodology, analysis, and publication." };

const features = [
  { icon: Compass, title: "Research Design", description: "Strategic guidance on designing your research framework, formulating hypotheses, and selecting appropriate paradigms." },
  { icon: Target, title: "Methodology Selection", description: "Expert advice on choosing the right qualitative, quantitative, or mixed-methods approach for your study." },
  { icon: BarChart3, title: "Data Analysis Advice", description: "Guidance on selecting statistical tests, interpreting results, and presenting findings meaningfully." },
  { icon: BookOpen, title: "Literature Strategy", description: "Help identifying key sources, structuring your literature review, and building a solid theoretical framework." },
  { icon: Globe, title: "Publication Planning", description: "Strategic advice on journal selection, manuscript preparation, and navigating the peer review process." },
  { icon: Search, title: "Ethics & Compliance", description: "Guidance on research ethics, IRB approvals, informed consent, and ensuring ethical standards." },
];

const steps = [
  { step: "01", title: "Research Assessment", description: "Evaluate your current research status, objectives, challenges, and areas needing guidance." },
  { step: "02", title: "Strategic Planning", description: "Develop a customized research roadmap with clear milestones, methods, and deliverables." },
  { step: "03", title: "Guided Execution", description: "Provide ongoing guidance as you execute your research plan with regular check-ins." },
  { step: "04", title: "Publication Readiness", description: "Prepare your findings for publication with journal selection and manuscript guidance." },
];

const benefits = ["Domain-specific research experts", "Flexible consultation packages", "Actionable research roadmaps", "Publication-oriented guidance", "Confidential and ethical service", "Support at any research stage", "Follow-up support after sessions", "Affordable hourly and package rates"];

export default function ResearchConsultationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        <section className="bg-primary/5 py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Research Consultation</p><h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Expert Research Consultation Services</h1><p className="mt-6 text-lg leading-8 text-muted-foreground">Get strategic guidance on every aspect of your research : from formulating questions to publishing results. Our experienced researchers help you produce rigorous, impactful, and publishable work.</p><div className="mt-8 flex flex-col gap-4 sm:flex-row"><Button size="lg" asChild><Link prefetch={false} href="/contact">Get Research Guidance</Link></Button><Button size="lg" variant="outline" asChild><Link prefetch={false} href="/pricing">View Packages</Link></Button></div></div>
          <div className="space-y-4"><Card className="bg-primary text-primary-foreground"><CardContent className="p-6"><div className="flex items-center gap-4"><Compass className="h-12 w-12" /><div><p className="text-3xl font-bold">200+</p><p className="text-sm text-primary-foreground/80">Research Domains Covered</p></div></div></CardContent></Card><div className="grid grid-cols-2 gap-4"><Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-primary">6000+</p><p className="text-sm text-muted-foreground">Scholars Guided</p></CardContent></Card><Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-primary">4.8/5</p><p className="text-sm text-muted-foreground">Satisfaction Rating</p></CardContent></Card></div></div>
        </div></div></section>

        <section className="bg-primary py-8"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-wrap items-center justify-center gap-8">{[{ icon: Shield, text: "Confidential" }, { icon: Clock, text: "Flexible Scheduling" }, { icon: Users, text: "PhD Experts" }, { icon: Award, text: "Actionable Advice" }].map((item, i) => (<div key={i} className="flex items-center gap-2 text-primary-foreground"><item.icon className="h-5 w-5" /><span className="text-sm font-medium">{item.text}</span></div>))}</div></div></section>

        <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Consultation Areas</h2><p className="mt-4 text-lg text-muted-foreground">Comprehensive research guidance covering every critical aspect.</p></div><div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{features.map((f, i) => (<Card key={i} className="border-none shadow-lg hover:shadow-xl transition-shadow"><CardContent className="p-6"><div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"><f.icon className="h-6 w-6 text-primary" /></div><h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3><p className="mt-2 text-muted-foreground">{f.description}</p></CardContent></Card>))}</div></div></section>

        <section className="bg-muted/50 py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-2xl text-center mb-16"><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How Our Consultation Works</h2><p className="mt-4 text-lg text-muted-foreground">A structured approach to accelerate your research progress.</p></div><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{steps.map((s, i) => (<div key={i} className="text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">{s.step}</div><h3 className="mt-4 font-semibold text-foreground">{s.title}</h3><p className="mt-2 text-sm text-muted-foreground">{s.description}</p></div>))}</div></div></section>

        <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Choose Our Research Consultation?</h2><p className="mt-4 text-lg text-muted-foreground">Expert guidance that saves time and accelerates publication.</p><ul className="mt-8 grid gap-3 sm:grid-cols-2">{benefits.map((b, i) => (<li key={i} className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-sm text-muted-foreground">{b}</span></li>))}</ul></div>
          <Card><CardContent className="p-8"><h3 className="text-xl font-semibold text-foreground">Book a Free Research Session</h3><p className="mt-2 text-muted-foreground">Discuss your research challenges with our experts.</p><form className="mt-6 space-y-4"><input type="text" placeholder="Your Name" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><input type="email" placeholder="Email Address" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><input type="tel" placeholder="Phone Number" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"><option value="">Select Area</option><option value="design">Research Design</option><option value="methodology">Methodology</option><option value="analysis">Data Analysis</option><option value="publication">Publication Strategy</option></select><Button className="w-full" size="lg">Book Free Session</Button></form></CardContent></Card>
        </div></div></section>

        <section className="bg-primary py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"><h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">Need Expert Research Guidance?</h2><p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">Our research consultants are ready to help you achieve publication success.</p><div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"><Button size="lg" variant="secondary" asChild><Link prefetch={false} href="/contact">Book Consultation</Link></Button><Button size="lg" variant="outline" className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary" asChild><Link prefetch={false} href="/pricing">View Pricing</Link></Button></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
