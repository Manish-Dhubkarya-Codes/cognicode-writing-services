import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  GraduationCap,
  Target,
  Eye,
  Users,
  Award,
  Globe,
  BookOpen,
  Heart,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | CogniCode",
  description:
    "Learn about CogniCode's mission to support academic excellence. Our team of PhD experts is dedicated to helping scholars succeed.",
};

const team = [
  {
    name: "Dr. Richard Anderson",
    role: "Founder & CEO",
    bio: "PhD in Education with 20+ years of academic writing experience. Former professor at prestigious universities.",
  },
  {
    name: "Dr. Maria Santos",
    role: "Head of Research",
    bio: "PhD in Psychology with expertise in qualitative and quantitative research methodologies.",
  },
  {
    name: "Dr. James Williams",
    role: "Senior Academic Editor",
    bio: "PhD in Literature with extensive experience in academic publishing and editorial work.",
  },
  {
    name: "Dr. Lisa Chen",
    role: "Data Analysis Lead",
    bio: "PhD in Statistics with expertise in SPSS, R, Python, and advanced statistical modeling.",
  },
];

const values = [
  {
    name: "Academic Integrity",
    description:
      "We uphold the highest standards of academic ethics, ensuring all work is original and properly attributed.",
    icon: Award,
  },
  {
    name: "Excellence",
    description:
      "We strive for excellence in every project, delivering work that meets and exceeds academic standards.",
    icon: Target,
  },
  {
    name: "Collaboration",
    description:
      "We work closely with scholars, understanding their unique needs and providing personalized support.",
    icon: Users,
  },
  {
    name: "Global Perspective",
    description:
      "We serve scholars worldwide, understanding diverse academic requirements and cultural contexts.",
    icon: Globe,
  },
];

const milestones = [
  { year: "2009", title: "Founded", description: "CogniCode was established with a vision to support academic research." },
  { year: "2012", title: "1,000 Projects", description: "Reached our first major milestone of completed projects." },
  { year: "2016", title: "Global Expansion", description: "Extended our services to scholars in 50+ countries." },
  { year: "2020", title: "10,000 Projects", description: "Celebrated a decade of academic excellence." },
  { year: "2024", title: "Industry Leader", description: "Recognized as a leading academic support provider." },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-foreground py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-background sm:text-5xl">
                About CogniCode
              </h1>
              <p className="mt-6 text-lg leading-8 text-background/70">
                We are a team of dedicated academic professionals committed to
                helping scholars achieve their research goals. With over 15
                years of experience, we have supported thousands of researchers
                worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <Target className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Our Mission
                  </h2>
                </div>
                <p className="text-lg leading-8 text-muted-foreground">
                  To empower scholars worldwide by providing expert academic
                  writing support that enables them to achieve their research
                  goals and contribute meaningfully to their fields of study.
                  We believe every researcher deserves access to quality
                  guidance.
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <Eye className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">
                    Our Vision
                  </h2>
                </div>
                <p className="text-lg leading-8 text-muted-foreground">
                  To be the most trusted name in academic research support,
                  recognized globally for our commitment to quality, integrity,
                  and scholar success. We envision a world where every
                  researcher can reach their full potential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Core Values
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                These principles guide everything we do at CogniCode.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.name}
                  className="flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-foreground">
                    {value.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Journey
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                From humble beginnings to industry leadership.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-3xl">
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-ml-0.5" />
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <div
                      key={milestone.year}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold absolute left-0 md:left-1/2 md:-ml-4 z-10">
                        {index + 1}
                      </div>
                      <div
                        className={`ml-16 md:ml-0 md:w-1/2 ${
                          index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                        }`}
                      >
                        <div className="rounded-lg bg-card p-6 shadow-sm ring-1 ring-border">
                          <span className="text-sm font-semibold text-primary">
                            {milestone.year}
                          </span>
                          <h3 className="mt-2 text-lg font-semibold text-foreground">
                            {milestone.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        {/* <section className="bg-muted py-24 sm:py-32" id="team">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Meet Our Leadership
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Experienced academics dedicated to your success.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-primary">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA */}
        <section className="bg-primary py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to Work With Us?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
                Join thousands of scholars who have achieved their academic
                goals with our expert support.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link prefetch={false} href="/contact">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
