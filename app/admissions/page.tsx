import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  GraduationCap,
  FileText,
  Users,
  Calendar,
  BookOpen,
  Award,
  ArrowRight,
  Clock,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PhD Admissions Support | CogniCode",
  description:
    "Get expert guidance for PhD admissions, entrance exam preparation, and university selection. Navigate your doctoral journey with confidence.",
};

const admissionServices = [
  {
    icon: Target,
    title: "University Selection",
    description:
      "Expert guidance in selecting the right university based on your research interests, career goals, and academic profile.",
  },
  {
    icon: FileText,
    title: "Application Preparation",
    description:
      "Comprehensive support in preparing your PhD application, including SOP, research proposal, and CV preparation.",
  },
  {
    icon: BookOpen,
    title: "Entrance Exam Preparation",
    description:
      "Coaching and study materials for PhD entrance exams including UGC NET, CSIR NET, GATE, and university-specific tests.",
  },
  {
    icon: Users,
    title: "Interview Preparation",
    description:
      "Mock interviews and preparation sessions to help you confidently face PhD admission interviews.",
  },
  {
    icon: GraduationCap,
    title: "Supervisor Matching",
    description:
      "Assistance in identifying and approaching potential PhD supervisors aligned with your research interests.",
  },
  {
    icon: Award,
    title: "Fellowship Applications",
    description:
      "Guidance on applying for PhD fellowships including UGC JRF, CSIR JRF, and other funding opportunities.",
  },
];

const admissionProcess = [
  {
    step: "01",
    title: "Initial Consultation",
    description:
      "We assess your academic background, research interests, and career goals to create a personalized admission strategy.",
  },
  {
    step: "02",
    title: "University Shortlisting",
    description:
      "Based on your profile, we shortlist universities that best match your research area and academic aspirations.",
  },
  {
    step: "03",
    title: "Document Preparation",
    description:
      "We help you prepare all required documents including research proposal, SOP, CV, and recommendation letters.",
  },
  {
    step: "04",
    title: "Application Submission",
    description:
      "We guide you through the application process, ensuring all requirements are met and deadlines are followed.",
  },
  {
    step: "05",
    title: "Interview Coaching",
    description:
      "Comprehensive interview preparation with mock sessions and feedback to boost your confidence.",
  },
  {
    step: "06",
    title: "Admission Confirmation",
    description:
      "We assist with final formalities, enrollment procedures, and initial supervisor coordination.",
  },
];

const entranceExams = [
  { name: "UGC NET", description: "National Eligibility Test for Assistant Professor and JRF" },
  { name: "CSIR NET", description: "For Science subjects - Life Sciences, Physical Sciences, etc." },
  { name: "GATE", description: "Graduate Aptitude Test in Engineering" },
  { name: "JEST", description: "Joint Entrance Screening Test for Physics" },
  { name: "SET", description: "State Eligibility Test conducted by state governments" },
  { name: "University Tests", description: "Individual university entrance examinations" },
];

export default function AdmissionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  PhD Admissions
                </p>
                <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Your Gateway to Doctoral Excellence
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Navigate the complex PhD admission process with confidence.
                  From university selection to final enrollment, we provide
                  comprehensive guidance at every step.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/contact">Get Admission Guidance</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6 text-center">
                    <p className="text-4xl font-bold">500+</p>
                    <p className="mt-2 text-sm text-primary-foreground/80">
                      Successful Admissions
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-4xl font-bold text-primary">95%</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Success Rate
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-4xl font-bold text-primary">100+</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Partner Universities
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-muted">
                  <CardContent className="p-6 text-center">
                    <p className="text-4xl font-bold text-foreground">50+</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Research Domains
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Comprehensive Admission Support
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We provide end-to-end guidance to help you secure admission in
                your dream university.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {admissionServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Admission Process */}
        <section className="bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Our Admission Process
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A structured approach to ensure your successful PhD admission.
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {admissionProcess.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Entrance Exams */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Entrance Exam Preparation
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  We provide comprehensive coaching and study materials for all
                  major PhD entrance examinations in India.
                </p>
                <ul className="mt-8 space-y-4">
                  {entranceExams.map((exam, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">
                          {exam.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exam.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary-foreground">
                    Start Your PhD Journey
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-primary-foreground/90">
                    Get expert guidance on PhD admissions, entrance exams, and
                    university selection. Book your free consultation today.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>Free 30-minute consultation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Flexible scheduling</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4" />
                      <span>One-on-one expert guidance</span>
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full mt-4" asChild>
                    <Link href="/contact">
                      Book Free Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
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
