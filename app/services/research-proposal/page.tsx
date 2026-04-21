import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, FileText, BookOpen, Search, Target, Globe, Edit, BarChart3, ClipboardList, Lightbulb, Calendar } from "lucide-react";

export const metadata: Metadata = { title: "Research Proposal Writing | CogniCode", description: "Professionally crafted research proposals designed for university approval and funding success." };

const features = [
  { icon: Lightbulb, title: "Problem Statement", description: "Clear articulation of the research problem establishing the need for your study and its academic significance." },
  { icon: Target, title: "Objectives & Questions", description: "Well-defined research objectives and questions that guide your study and demonstrate a focused research direction." },
  { icon: BookOpen, title: "Literature Review", description: "Concise review of existing scholarship that identifies gaps and positions your proposed research within the field." },
  { icon: ClipboardList, title: "Methodology Design", description: "Detailed and justified methodology section covering research design, data collection, sampling, and analysis plans." },
  { icon: Calendar, title: "Timeline & Work Plan", description: "Realistic research timeline with milestones, deliverables, and Gantt charts that demonstrate project feasibility." },
  { icon: FileText, title: "Budget & Outcomes", description: "Budget estimation for grant proposals and clearly stated expected outcomes and significance of the study." },
];

const steps = [
  { step: "01", title: "Understanding Your Research", description: "Detailed discussion about your research idea, objectives, domain, and target audience for the proposal." },
  { step: "02", title: "Literature & Gap Analysis", description: "Review existing research to identify gaps and position your proposal within the academic landscape." },
  { step: "03", title: "Proposal Drafting", description: "Write a structured, persuasive proposal with clear objectives, methodology, and expected outcomes." },
  { step: "04", title: "Review & Finalization", description: "Multiple revision rounds to polish the proposal and ensure it meets university or funding guidelines." },
];

const benefits = ["High approval and acceptance rates", "Experienced academic proposal writers", "Grant-ready proposal preparation", "University format expertise across institutions", "Unlimited revisions until approval", "Quick turnaround for tight deadlines", "Plagiarism-free original content", "Post-submission revision support"];

export default function ServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        <section className="bg-primary/5 py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div><p className="text-sm font-semibold uppercase tracking-wider text-primary">Research Proposal Writing</p><h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Professional Research Proposal Writing Services</h1><p className="mt-6 text-lg leading-8 text-muted-foreground">A compelling research proposal is the gateway to your PhD or funded research project. Our expert writers craft proposals that clearly articulate your vision and maximize your chances of approval.</p><div className="mt-8 flex flex-col gap-4 sm:flex-row"><Button size="lg" asChild><Link href="/contact">Get Started</Link></Button><Button size="lg" variant="outline" asChild><Link href="/samples">View Samples</Link></Button></div></div>
          <div className="space-y-4"><Card className="bg-primary text-primary-foreground"><CardContent className="p-6"><div className="flex items-center gap-4"><FileText className="h-12 w-12" /><div><p className="text-3xl font-bold">96%</p><p className="text-sm text-primary-foreground/80">Proposal Approval Rate</p></div></div></CardContent></Card><div className="grid grid-cols-2 gap-4"><Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-primary">7000+</p><p className="text-sm text-muted-foreground">Proposals Written</p></CardContent></Card><Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-primary">5 Days</p><p className="text-sm text-muted-foreground">Average Delivery</p></CardContent></Card></div></div>
        </div></div></section>

        <section className="bg-primary py-8"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-wrap items-center justify-center gap-8">{[{ icon: Shield, text: "100% Original" }, { icon: Clock, text: "On-Time Delivery" }, { icon: Users, text: "Expert Writers" }, { icon: Award, text: "High Approval Rate" }].map((item, i) => (<div key={i} className="flex items-center gap-2 text-primary-foreground"><item.icon className="h-5 w-5" /><span className="text-sm font-medium">{item.text}</span></div>))}</div></div></section>

        <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Key Components We Cover</h2><p className="mt-4 text-lg text-muted-foreground">Every essential element of a winning research proposal, expertly crafted.</p></div><div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{features.map((f, i) => (<Card key={i} className="border-none shadow-lg hover:shadow-xl transition-shadow"><CardContent className="p-6"><div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"><f.icon className="h-6 w-6 text-primary" /></div><h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3><p className="mt-2 text-muted-foreground">{f.description}</p></CardContent></Card>))}</div></div></section>

        <section className="bg-muted/50 py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-2xl text-center mb-16"><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Proposal Writing Process</h2><p className="mt-4 text-lg text-muted-foreground">From understanding your idea to delivering an approval-ready proposal.</p></div><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{steps.map((s, i) => (<div key={i} className="text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">{s.step}</div><h3 className="mt-4 font-semibold text-foreground">{s.title}</h3><p className="mt-2 text-sm text-muted-foreground">{s.description}</p></div>))}</div></div></section>

        <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Choose Our Proposal Writing?</h2><p className="mt-4 text-lg text-muted-foreground">We write proposals that committees approve.</p><ul className="mt-8 grid gap-3 sm:grid-cols-2">{benefits.map((b, i) => (<li key={i} className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-sm text-muted-foreground">{b}</span></li>))}</ul></div>
          <Card><CardContent className="p-8"><h3 className="text-xl font-semibold text-foreground">Free Proposal Consultation</h3><p className="mt-2 text-muted-foreground">Discuss your research idea and get expert advice on crafting a winning proposal.</p><form className="mt-6 space-y-4"><input type="text" placeholder="Your Name" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><input type="email" placeholder="Email Address" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><input type="tel" placeholder="Phone Number" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"><option value="">Select Proposal Type</option>
<option value="phd">PhD Research Proposal</option>
<option value="grant">Grant Proposal</option>
<option value="masters">Masters Proposal</option>
<option value="conference">Conference Submission</option></select><Button className="w-full" size="lg">Get Free Consultation</Button></form></CardContent></Card>
        </div></div></section>

        <section className="bg-primary py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"><h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">Ready to Write a Winning Proposal?</h2><p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">Let our expert writers craft a compelling proposal that gets approved.</p><div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"><Button size="lg" variant="secondary" asChild><Link href="/contact">Get Started</Link></Button><Button size="lg" variant="outline" className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary" asChild><Link href="/pricing">View Pricing</Link></Button></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
