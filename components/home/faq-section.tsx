"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How should I choose a thesis topic?",
    answer:
      "For choosing a topic for your thesis, select a subject that aligns with your interests, level of knowledge, and available resources. Ensure the subject is interesting to study, relevant, and valuable to your field. Our experts can help you refine your topic to ensure it meets academic standards.",
  },
  {
    question: "What defines a proper thesis structure?",
    answer:
      "A typical thesis structure includes: Introduction, Literature Review, Methodology, Results, Discussion, Conclusion, and References. Each section serves a specific purpose in presenting your research. We can help you structure your thesis according to your university's guidelines.",
  },
  {
    question: "What is included in a literature review?",
    answer:
      "A literature review is a critical evaluation of prior research relevant to your subject. It defines the setting for your research and identifies gaps that your work attempts to fill. Our experts help you analyze, synthesize, and present existing literature effectively.",
  },
  {
    question: "What are your pricing plans?",
    answer:
      "We offer flexible packages based on project type, academic level, and urgency. Our Standard plan is budget-friendly with essential features, while our Premium plan offers advanced expert-led support with priority handling. Contact us for a custom quote tailored to your needs.",
  },
  {
    question: "Can you help with data collection and analysis?",
    answer:
      "Yes, we provide comprehensive data support including survey design, Google Forms creation, secondary data sourcing, and statistical analysis using SPSS, R, Python, and other tools. We help you interpret results and present them clearly.",
  },
  {
    question: "How do you ensure content originality?",
    answer:
      "Every piece of work is crafted from scratch by our expert writers. We use advanced plagiarism detection tools and provide Turnitin reports to ensure your content is 100% original. Our plagiarism rate is consistently below 10%.",
  },
];

export function FAQSection() {
  return (
    <section className="bg-background py-24 sm:py-32" id="faq">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            FAQ
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Find answers to common questions about our academic writing support
            services.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
