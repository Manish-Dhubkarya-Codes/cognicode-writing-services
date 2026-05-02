import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle,
  Users,
  Award,
  Clock,
  Shield,
  FileText,
  HeadphonesIcon,
  TrendingUp,
  Target,
  Sparkles,
  BookOpen,
  GraduationCap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Why Choose Us | CogniCode",
  description:
    "Discover why thousands of PhD scholars trust CogniCode for their academic research writing needs.",
};

const reasons = [
  {
    icon: Users,
    title: "Expert Team of PhD Writers",
    description:
      "Our team consists of PhD holders and subject matter experts with years of academic writing experience across various disciplines.",
  },
  {
    icon: Award,
    title: "15+ Years of Excellence",
    description:
      "With over 15 years in academic support services, we have helped thousands of scholars achieve their research goals successfully.",
  },
  {
    icon: Clock,
    title: "Timely Delivery Guaranteed",
    description:
      "We understand the importance of deadlines. Every project is delivered on time, giving you ample time for review and revisions.",
  },
  {
    icon: Shield,
    title: "100% Original Content",
    description:
      "All our work is original and plagiarism-free. We provide detailed plagiarism reports with every submission using Turnitin.",
  },
  {
    icon: FileText,
    title: "Comprehensive Services",
    description:
      "From topic selection to final thesis submission, we offer end-to-end support for your entire PhD journey.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Dedicated Support",
    description:
      "Our support team is available round the clock to address your queries and provide updates on your project progress.",
  },
  {
    icon: TrendingUp,
    title: "High Success Rate",
    description:
      "Over 95% of our clients have successfully completed their PhD with our guidance and support services.",
  },
  {
    icon: Target,
    title: "Supervisor-Aligned Work",
    description:
      "We work closely with your requirements and ensure all content aligns with your supervisor's expectations and guidelines.",
  },
];

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "12,000+", label: "Projects Completed" },
  { value: "8,000+", label: "Happy Clients" },
  { value: "100%", label: "On-Time Delivery" },
];

const differentiators = [
  {
    icon: Sparkles,
    title: "Quality Assurance",
    points: [
      "Multiple rounds of quality checks",
      "Expert proofreading and editing",
      "Comprehensive plagiarism verification",
      "APA, MLA, Harvard formatting standards",
    ],
  },
  {
    icon: BookOpen,
    title: "Academic Excellence",
    points: [
      "Subject-specific expert writers",
      "In-depth research methodology",
      "Data analysis using SPSS, R, Python",
      "Statistical consultation included",
    ],
  },
  {
    icon: GraduationCap,
    title: "Scholar Support",
    points: [
      "One-on-one mentorship sessions",
      "Viva preparation assistance",
      "Journal publication guidance",
      "Continuous progress updates",
    ],
  },
];

export default function WhyUsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Why Choose Us
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Your Trusted Partner in Academic Excellence
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Discover why thousands of PhD scholars, researchers, and
                academics choose CogniCode for their research writing and
                support needs.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat, index) => (
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

        {/* Reasons Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                8 Reasons to Choose CogniCode
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We are committed to providing exceptional academic support that
                helps you succeed in your research journey.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {reasons.map((reason, index) => (
                <Card
                  key={index}
                  className="border-none shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <reason.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Differentiators Section */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What Sets Us Apart
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our commitment to quality, expertise, and scholar success makes
                us the preferred choice.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {differentiators.map((item, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {item.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Quote */}
        {/* <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <blockquote className="relative">
              <p className="font-serif text-2xl font-medium italic text-foreground md:text-3xl">
                &quot;CogniCode helped me navigate through my entire PhD
                journey. Their expert guidance in thesis writing and data
                analysis was invaluable. I highly recommend their services to
                any PhD scholar.&quot;
              </p>
              <footer className="mt-8">
                <p className="font-semibold text-foreground">
                  Dr. Priya Sharma
                </p>
                <p className="text-sm text-muted-foreground">
                  PhD in Management Studies, University of Delhi
                </p>
              </footer>
            </blockquote>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
              Ready to Start Your Academic Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
              Join thousands of successful scholars who have achieved their
              research goals with our expert support.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="min-w-[200px]"
                asChild
              >
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] border-primary-foreground text-black hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
