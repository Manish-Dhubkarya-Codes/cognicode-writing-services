import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Lightbulb, Search, Target, TrendingUp, BookOpen, Compass, FileText, Users, Clock, Shield, Award } from "lucide-react";

export const metadata: Metadata = { title: "PhD Topic Selection | CogniCode", description: "Expert PhD topic selection guidance. Get a unique, researchable, and impactful topic aligned with your interests and career goals." };

const features = [
  { icon: Search, title: "Gap Analysis", description: "We analyze existing research in your domain to identify unexplored areas and emerging opportunities for original contribution." },
  { icon: TrendingUp, title: "Trend Identification", description: "Our experts evaluate current and future trends to ensure your topic remains relevant and impactful throughout your PhD journey." },
  { icon: Target, title: "Feasibility Assessment", description: "We assess data availability, resource requirements, and scope to ensure your topic is practically achievable within your timeline." },
  { icon: BookOpen, title: "Literature Mapping", description: "Comprehensive mapping of related literature to position your research within the existing academic landscape." },
  { icon: Compass, title: "Supervisor Alignment", description: "We help align your topic with your supervisor expertise and university research priorities for smoother approval." },
  { icon: FileText, title: "Publication Potential", description: "Every topic is evaluated for its publication potential in Scopus, SCI, and other high-impact indexed journals." },
];

const steps = [
  { step: "01", title: "Interest Mapping", description: "We discuss your academic background, research interests, career aspirations, and domain preferences to identify potential directions." },
  { step: "02", title: "Literature Scanning", description: "Our experts scan recent publications, conference proceedings, and thesis databases to identify gaps and emerging trends." },
  { step: "03", title: "Topic Shortlisting", description: "We present 3-5 viable topic options with detailed rationale, scope analysis, and publication potential for each." },
  { step: "04", title: "Final Refinement", description: "Refine the selected topic, frame research questions and objectives, and prepare for supervisor approval." },
];

const benefits = ["Avoid topic rejection by supervisors", "Save months of uncertainty and confusion", "Get a unique, research-worthy topic", "Expert domain-specific knowledge", "University-approved research frameworks", "Strong foundation for your entire thesis", "Multiple topic options to choose from", "Publication-oriented topic selection"];

export default function TopicSelectionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        <section className="bg-primary/5 py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">PhD Topic Selection</p>
            <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Find the Perfect PhD Research Topic</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">Choosing the right topic is the most critical step in your doctoral journey. Our subject-matter experts help you discover a unique, researchable, and high-impact topic that aligns with your passion and career goals.</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row"><Button size="lg" asChild><Link prefetch={false} href="/contact">Get Topic Guidance</Link></Button><Button size="lg" variant="outline" asChild><Link prefetch={false} href="/samples">View Samples</Link></Button></div>
          </div>
          <div className="space-y-4">
            <Card className="bg-primary text-primary-foreground"><CardContent className="p-6"><div className="flex items-center gap-4"><Lightbulb className="h-12 w-12" /><div><p className="text-3xl font-bold">10,000+</p><p className="text-sm text-primary-foreground/80">Topics Suggested Successfully</p></div></div></CardContent></Card>
            <div className="grid grid-cols-2 gap-4"><Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-primary">95%</p><p className="text-sm text-muted-foreground">Approval Rate</p></CardContent></Card><Card><CardContent className="p-6 text-center"><p className="text-2xl font-bold text-primary">3–5</p><p className="text-sm text-muted-foreground">Topic Options Provided</p></CardContent></Card></div>
          </div>
        </div></div></section>

        <section className="bg-primary py-8"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-wrap items-center justify-center gap-8">{[{ icon: Shield, text: "100% Unique Topics" }, { icon: Clock, text: "Quick Turnaround" }, { icon: Users, text: "Domain Experts" }, { icon: Award, text: "Supervisor Ready" }].map((item, i) => (<div key={i} className="flex items-center gap-2 text-primary-foreground"><item.icon className="h-5 w-5" /><span className="text-sm font-medium">{item.text}</span></div>))}</div></div></section>

        <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center"><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Topic Selection Approach</h2><p className="mt-4 text-lg text-muted-foreground">A systematic, research-driven approach to finding the ideal PhD topic for your academic journey.</p></div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{features.map((f, i) => (<Card key={i} className="border-none shadow-lg hover:shadow-xl transition-shadow"><CardContent className="p-6"><div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"><f.icon className="h-6 w-6 text-primary" /></div><h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3><p className="mt-2 text-muted-foreground">{f.description}</p></CardContent></Card>))}</div>
        </div></section>

        <section className="bg-muted/50 py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16"><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How We Help You Find the Right Topic</h2><p className="mt-4 text-lg text-muted-foreground">A structured 4-step process to discover your ideal research direction.</p></div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{steps.map((s, i) => (<div key={i} className="text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">{s.step}</div><h3 className="mt-4 font-semibold text-foreground">{s.title}</h3><p className="mt-2 text-sm text-muted-foreground">{s.description}</p></div>))}</div>
        </div></section>

        <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div><h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Choose Our Topic Selection Service?</h2><p className="mt-4 text-lg text-muted-foreground">Save months of confusion and get a research-ready topic from day one.</p><ul className="mt-8 grid gap-3 sm:grid-cols-2">{benefits.map((b, i) => (<li key={i} className="flex items-start gap-2"><CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="text-sm text-muted-foreground">{b}</span></li>))}</ul></div>
          <Card><CardContent className="p-8"><h3 className="text-xl font-semibold text-foreground">Free Topic Consultation</h3><p className="mt-2 text-muted-foreground">Discuss your research interests with our experts and discover the perfect PhD topic.</p><form className="mt-6 space-y-4"><input type="text" placeholder="Your Name" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><input type="email" placeholder="Email Address" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><input type="tel" placeholder="Phone Number" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"><option value="">Select Your Subject Area</option><option value="management">Management</option><option value="engineering">Engineering</option><option value="sciences">Sciences</option><option value="humanities">Humanities</option><option value="commerce">Commerce</option><option value="other">Other</option></select><textarea placeholder="Describe your research interests briefly" rows={4} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" /><Button className="w-full" size="lg">Get Free Consultation</Button></form></CardContent></Card>
        </div></div></section>

        <section className="bg-primary py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center"><h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">Start Your PhD with the Right Topic</h2><p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">A well-chosen topic sets the foundation for your entire research journey. Let our experts guide you.</p><div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"><Button size="lg" variant="secondary" asChild><Link prefetch={false} href="/contact">Get Topic Guidance</Link></Button><Button size="lg" variant="outline" className="border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary" asChild><Link prefetch={false} href="/pricing">View Pricing</Link></Button></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
