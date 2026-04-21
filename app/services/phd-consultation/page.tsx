import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, MessageSquare, Target, BarChart3, BookOpen, GraduationCap, CalendarCheck, Users, Clock, Shield, Award } from "lucide-react";

export const metadata: Metadata = { title: "PhD Consultation Services | CogniCode", description: "One-on-one expert PhD consultation services. Get personalized guidance from experienced PhD holders at every stage of your doctoral journey." };

const features = [
  { icon: MessageSquare, title: "One-on-One Sessions", description: "Private consultation sessions with experienced PhD holders who understand the challenges of doctoral research firsthand." },
  { icon: Target, title: "Research Methodology", description: "Expert guidance on selecting the right research design, data collection techniques, and analysis frameworks for your study." },
  { icon: BarChart3, title: "Data Analysis Support", description: "Get help interpreting statistical results, choosing the right tests, and presenting your findings effectively." },
  { icon: BookOpen, title: "Thesis Writing Guidance", description: "Structured guidance on writing each chapter of your thesis with clarity, academic rigor, and proper formatting." },
  { icon: GraduationCap, title: "Viva Preparation", description: "Mock viva sessions and coaching to help you confidently defend your research before the examination committee." },
  { icon: CalendarCheck, title: "Milestone Planning", description: "Create a realistic timeline with clear milestones to keep your PhD journey on track and stress-free." },
];

const steps = [
  { step: "01", title: "Book a Session", description: "Schedule a consultation at your convenience and share your requirements in advance so we can prepare." },
  { step: "02", title: "Expert Matching", description: "We assign a consultant with deep expertise in your specific research domain and methodology." },
  { step: "03", title: "Consultation Session", description: "Receive in-depth, actionable guidance during your session along with detailed follow-up notes." },
  { step: "04", title: "Ongoing Support", description: "Access follow-up sessions and email support to stay on track and overcome research challenges." },
];

const benefits = ["Personalized expert advice tailored to your needs", "Flexible scheduling — weekdays, weekends, evenings", "Domain-specific consultants with PhD credentials", "Actionable takeaways from every session", "Confidential and secure consultations", "Affordable session and package pricing", "Support at any stage of your PhD journey", "Follow-up email support after every session"];

export default function PhDConsultationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        <section className="bg-primary/5 py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div><p className="text-sm font-semibold uppercase tracking-wider text-primary">PhD Consultation</p><h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Expert PhD Consultation Services</h1><p className="mt-6 text-lg leading-8 text-muted-foreground">Get one-on-one guidance from experienced PhD holders who understand the challenges of doctoral research. Whether you are stuck on methodology or need publication advice, our consultants provide actionable solutions.</p><div className="mt-8 flex flex-col gap-4 sm:flex-row"><Button size="lg" asChild><Link href="/contact">Book a Consultation</Link></Button><Button size="lg" variant="outline" asChild><Link href="/pricing">View Packages</Link></Button></div></div>
          <div className="space-y-4"><Card className="bg-primary text-primary-foreground"><CardContent className="p-6"><div className="flex items-center gap-4"><Users className="h-12 w-12" /><div><p className="text-3xl font-bold">500+</p><p className="text-sm text-primary-foreground/80">PhD Experts On Board</p></div></div></CardContent></Card><div className="grid grid-cols-2 gap-4"><Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-primary">8000+</p><p className="text-sm text-muted-foreground">Sessions Completed</p></CardContent></Card><Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-primary">4.9/5</p><p className="text-sm text-muted-foreground">Scholar Rating</p></CardContent></Card></div></div>
        </div></div></section>

        <section className="bg-primary py-8"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-wrap items-center justify-center gap-8">{[{ icon: Shield, text: "Confidential Sessions" }, { icon: Clock, text: "Flexible Scheduling" }, { icon: Users, text: "PhD-Level Experts" }, { icon: Award, text: "Actionable Guidance" }].map((item, i) => (<div key={i} className="flex items-center gap-2 text-primary-foreground"><item.icon className="h-5 w-5" /><span className="text-sm font-medium">{item.text}</span></div>))}</div></div></section>

        <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-2xl text-center"><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What Our Consultation Covers</h2><p className="mt-4 text-lg text-muted-foreground">Comprehensive guidance for every aspect of your doctoral research.</p></div><div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{features.map((f, i) => (<Card key={i} className="border-none shadow-lg hover:shadow-xl transition-shadow"><CardContent className="p-6"><div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"><f.icon className="h-6 w-6 text-primary" /></div><h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3><p className="mt-2 text-muted-foreground">{f.description}</p></CardContent></Card>))}</div></div></section>

        <section className="bg-muted/50 py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-2xl text-center mb-16"><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How It Works</h2><p className="mt-4 text-lg text-muted-foreground">A simple 4-step process to get expert guidance for your PhD.</p></div><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{steps.map((s, i) => (<div key={i} className="text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">{s.step}</div><h3 className="mt-4 font-semibold text-foreground">{s.title}</h3><p className="mt-2 text-sm text-muted-foreground">{s.description}</p></div>))}</div></div></section>

        <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Choose Our PhD Consultation?</h2><p className="mt-4 text-lg text-muted-foreground">Get expert mentorship that keeps you focused and progressing.</p><ul className="mt-8 grid gap-3 sm:grid-cols-2">{benefits.map((b, i) => (<li key={i} className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-sm text-muted-foreground">{b}</span></li>))}</ul></div>
          <Card><CardContent className="p-8"><h3 className="text-xl font-semibold text-foreground">Book Your Free Consultation</h3><p className="mt-2 text-muted-foreground">Discuss your PhD challenges with our experts.</p><form className="mt-6 space-y-4"><input type="text" placeholder="Your Name" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><input type="email" placeholder="Email Address" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><input type="tel" placeholder="Phone Number" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"><option value="">Select Consultation Area</option><option value="topic">Topic Selection</option><option value="methodology">Methodology</option><option value="analysis">Data Analysis</option><option value="writing">Thesis Writing</option><option value="viva">Viva Preparation</option></select><Button className="w-full" size="lg">Book Free Session</Button></form></CardContent></Card>
        </div></div></section>

        <section className="bg-primary py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"><h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">Need Expert PhD Guidance?</h2><p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">Our PhD consultants are here to help you navigate every challenge in your doctoral journey.</p><div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"><Button size="lg" variant="secondary" asChild><Link href="/contact">Book a Consultation</Link></Button><Button size="lg" variant="outline" className="border-primary-foreground  hover:bg-primary-foreground text-black hover:text-primary" asChild><Link href="/pricing">View Pricing</Link></Button></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
