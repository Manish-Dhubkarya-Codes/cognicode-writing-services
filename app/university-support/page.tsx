import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  MapPin,
  Users,
  Award,
  ArrowRight,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "University Scholars Support | CogniCodeWrite",
  description:
    "Specialized PhD research support for scholars from specific universities across India. Tailored guidance based on institutional requirements.",
};

const universities = [
  {
    name: "Amity University",
    location: "Noida, UP",
    scholars: "500+",
    specializations: ["Management", "Engineering", "Law", "Sciences"],
  },
  {
    name: "University of Delhi",
    location: "Delhi",
    scholars: "300+",
    specializations: ["Humanities", "Commerce", "Sciences", "Social Sciences"],
  },
  {
    name: "SRM University",
    location: "Chennai, TN",
    scholars: "400+",
    specializations: ["Engineering", "Management", "Sciences", "Medical"],
  },
  {
    name: "Manav Rachna University",
    location: "Faridabad, HR",
    scholars: "200+",
    specializations: ["Engineering", "Management", "Education", "Design"],
  },
  {
    name: "GLA University",
    location: "Mathura, UP",
    scholars: "150+",
    specializations: ["Engineering", "Pharmacy", "Management", "Law"],
  },
  {
    name: "Galgotias University",
    location: "Greater Noida, UP",
    scholars: "250+",
    specializations: ["Engineering", "Management", "Sciences", "Law"],
  },
  {
    name: "Delhi Technological University",
    location: "Delhi",
    scholars: "200+",
    specializations: ["Engineering", "Management", "Sciences"],
  },
  {
    name: "GGSIPU",
    location: "Delhi",
    scholars: "350+",
    specializations: ["Engineering", "Management", "Law", "Education"],
  },
  {
    name: "B.R. Ambedkar University",
    location: "Delhi",
    scholars: "100+",
    specializations: ["Humanities", "Social Sciences", "Development Studies"],
  },
  {
    name: "BML Munjal University",
    location: "Gurugram, HR",
    scholars: "80+",
    specializations: ["Management", "Engineering", "Law"],
  },
  {
    name: "KR Mangalam University",
    location: "Gurugram, HR",
    scholars: "120+",
    specializations: ["Engineering", "Management", "Education", "Sciences"],
  },
  {
    name: "Noida International University",
    location: "Greater Noida, UP",
    scholars: "100+",
    specializations: ["Engineering", "Management", "Law", "Sciences"],
  },
];

export default function UniversitySupportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                University Support
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                University Scholars Support
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Specialized PhD research support tailored for scholars from
                specific universities. We understand your institution
                requirements and provide customized guidance.
              </p>

              {/* Search */}
              <div className="mt-8 relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search your university..."
                  className="w-full rounded-full border border-border bg-background pl-12 pr-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-primary py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: "100+", label: "Universities Covered" },
                { value: "5,000+", label: "University Scholars" },
                { value: "50+", label: "Disciplines" },
                { value: "95%", label: "Success Rate" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl font-bold text-primary-foreground md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-primary-foreground/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Universities Grid */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Universities We Support
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We provide specialized support for scholars from these
                universities and many more.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {universities.map((uni, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary">{uni.scholars} scholars</Badge>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      {uni.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {uni.location}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1">
                      {uni.specializations.map((spec, idx) => (
                        <span
                          key={idx}
                          className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="link"
                      className="mt-4 px-0 text-primary"
                    >
                      Learn More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Do not see your university? We support scholars from all
                universities.
              </p>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact for Your University</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Benefits of University-Specific Support
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Our understanding of individual university requirements
                  ensures faster approvals and better outcomes.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    {
                      icon: GraduationCap,
                      title: "University Format Compliance",
                      description:
                        "Work formatted exactly as per your university guidelines and templates.",
                    },
                    {
                      icon: Users,
                      title: "Supervisor Alignment",
                      description:
                        "Content aligned with typical supervisor expectations at your institution.",
                    },
                    {
                      icon: Award,
                      title: "Higher Approval Rates",
                      description:
                        "Better first-time approval rates due to our institutional knowledge.",
                    },
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold">
                    Get University-Specific Support
                  </h3>
                  <p className="mt-4 text-primary-foreground/90">
                    Tell us about your university and research requirements. We
                    will assign you an expert familiar with your institution.
                  </p>
                  <form className="mt-6 space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full rounded-lg border-0 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
                    />
                    <input
                      type="text"
                      placeholder="Your University"
                      className="w-full rounded-lg border-0 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full rounded-lg border-0 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full rounded-lg border-0 bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
                    />
                    <Button variant="secondary" className="w-full">
                      Get University Support
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
