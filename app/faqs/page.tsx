import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | CogniCode",
  description:
    "Find answers to common questions about our academic research writing services, pricing, and support process.",
};

const faqCategories = [
  {
    title: "General Questions",
    faqs: [
      {
        question: "What services does CogniCode offer?",
        answer:
          "We offer comprehensive academic support services including PhD thesis writing, synopsis writing, research paper writing, dissertation support, journal publication assistance, data analysis, plagiarism removal, proofreading, and editing services. Our team of PhD experts provides guidance across all disciplines.",
      },
      {
        question: "How experienced is your team?",
        answer:
          "Our team consists of PhD holders and subject matter experts with 10-25 years of academic experience. We have over 15 years of experience in academic support services and have helped more than 8,000 clients successfully complete their research.",
      },
      {
        question: "Which subjects and disciplines do you cover?",
        answer:
          "We cover all major academic disciplines including Management, Engineering, Sciences, Humanities, Social Sciences, Commerce, Law, Education, Medical Sciences, and more. Each project is handled by a subject-specific expert.",
      },
      {
        question: "Is your service available globally?",
        answer:
          "Yes, we provide services to students and researchers worldwide. We have successfully worked with clients from India, UK, USA, UAE, Australia, and many other countries. Our team is familiar with university requirements across different regions.",
      },
    ],
  },
  {
    title: "Thesis & Synopsis",
    faqs: [
      {
        question: "How should I choose a thesis topic?",
        answer:
          "Choose a topic that fits your interests, level of knowledge, and available resources. Make sure the subject is interesting to study, relevant to your field, and has sufficient research gaps. We offer free topic consultation to help you select the right topic.",
      },
      {
        question: "What defines a thesis structure?",
        answer:
          "A standard thesis includes: Introduction, Literature Review, Methodology, Results, Discussion, Conclusion, and References. Depending on your university and discipline, additional chapters like Theoretical Framework or Recommendations may be required.",
      },
      {
        question: "What is included in synopsis writing?",
        answer:
          "Our synopsis writing includes: title formulation, introduction, research objectives, literature review summary, research methodology, expected outcomes, timeline, and references. We ensure alignment with your university format.",
      },
      {
        question: "How long does it take to complete a thesis?",
        answer:
          "The timeline depends on the scope and complexity. A complete thesis typically takes 3-6 months. Synopsis usually takes 7-14 days. We also offer expedited services for urgent requirements at additional cost.",
      },
    ],
  },
  {
    title: "Research Papers & Publications",
    faqs: [
      {
        question: "Can you help with Scopus journal publications?",
        answer:
          "Yes, we provide comprehensive support for Scopus indexed journal publications. This includes paper writing, journal selection (Q1-Q4), formatting as per journal guidelines, and assistance with peer review responses.",
      },
      {
        question: "What is your publication success rate?",
        answer:
          "We maintain a 95% acceptance rate for journal submissions. Our experts ensure papers meet publication standards and are submitted to appropriate journals matching the research scope and quality.",
      },
      {
        question: "Do you help with conference papers?",
        answer:
          "Yes, we support conference paper writing for IEEE, Springer, Elsevier, and other conferences. Our services include paper preparation, formatting, and presentation support.",
      },
      {
        question: "What is a literature review?",
        answer:
          "A literature review is a critical evaluation of prior research relevant to your topic. It establishes the context for your research, identifies gaps in existing literature, and justifies your research objectives.",
      },
    ],
  },
  {
    title: "Pricing & Packages",
    faqs: [
      {
        question: "What are your packages or plans?",
        answer:
          "We offer flexible packages: CogniCode Lite (standard academic support with basic features) and CogniCode Premium (expert-guided research with advanced features including dedicated mentorship). Pricing varies based on project type, academic level, and urgency.",
      },
      {
        question: "Do you offer customized pricing?",
        answer:
          "Yes, we provide customized quotes based on your specific requirements. Contact us with your project details for a personalized pricing estimate.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfers, UPI, credit/debit cards, and PayPal for international clients. Payment is typically made in milestones tied to project deliverables.",
      },
      {
        question: "Is there a refund policy?",
        answer:
          "Yes, we have a fair refund policy. If you are not satisfied with our work after multiple revisions, you may be eligible for a partial or full refund based on the work completed. Please contact us for detailed terms.",
      },
    ],
  },
  {
    title: "Quality & Support",
    faqs: [
      {
        question: "How do you ensure originality?",
        answer:
          "All our work is original and plagiarism-free. We use Turnitin for plagiarism verification and provide a detailed similarity report with every submission. Our target is below 10% similarity.",
      },
      {
        question: "Do you provide revisions?",
        answer:
          "Yes, we offer multiple revision rounds to ensure your satisfaction. CogniCode Lite includes 1 revision, while Premium includes up to 3 revisions. Additional revisions are available at nominal cost.",
      },
      {
        question: "Can you help with data collection?",
        answer:
          "Yes, we assist with data collection including survey design, Google Forms creation, questionnaire development, and secondary data sourcing. Primary data collection support is available based on project requirements.",
      },
      {
        question: "How can I track my project progress?",
        answer:
          "We provide regular progress updates via email and WhatsApp. Premium clients get access to scheduled Zoom calls for detailed discussions. You can reach out to your assigned coordinator anytime.",
      },
    ],
  },
];

export default function FAQsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                FAQ
              </p>
              <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Find answers to common questions about our academic research
                writing services. Can not find what you are looking for? Contact
                our support team.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12 last:mb-0">
                <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                    >
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-muted/50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Still have questions?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our support team is here to help you. Reach out through any of
                these channels.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">
                    WhatsApp
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Quick responses within minutes
                  </p>
                  <Button variant="outline" className="mt-4" asChild>
                    <a href="https://wa.me/916264689448" target="_blank">
                      Chat Now
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">Email</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Response within 24 hours
                  </p>
                  <Button variant="outline" className="mt-4" asChild>
                    <a href="mailto:office.cognicode@gmail.com">Send Email</a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">Phone</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Mon-Sat: 9 AM to 6:30 PM
                  </p>
                  <Button variant="outline" className="mt-4" asChild>
                    <a href="tel:+916264689448">Call Us</a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" asChild>
                <Link prefetch={false} href="/contact">Get Free Consultation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
