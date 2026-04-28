"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

// ============================================================
// THIS IS THE FIX: dynamic import with ssr: false
// Leaflet uses "window" which doesn't exist on the server.
// dynamic() loads this component ONLY on the client side.
// ============================================================
const LiveTrackingMap = dynamic(
  () => import("@/app/contact/live-tracking-map"),
  {
    ssr: false,
    loading: () => (
      <div
        className="rounded-2xl border border-border bg-muted/50 flex items-center justify-center"
        style={{ height: 500 }}
      >
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    ),
  }
);

// ===== DATA =====

const contactInfo = [
  {
    name: "Email",
    value: "office.cognicode@gmail.com",
    icon: Mail,
    description: "Send us an email anytime",
  },
  {
    name: "Phone",
    value: "+917000515617",
    icon: Phone,
    description: "Mon-Fri from 9am to 6pm IST",
  },
  {
    name: "Office",
    value:
      "B/2, Mahesh Nagar, Tulsi Vihar Colony, Gwalior, Madhya Pradesh 474002",
    icon: MapPin,
    description: "Visit our office",
  },
  {
    name: "Working Hours",
    value: "24/7 Online Support",
    icon: Clock,
    description: "We're always here to help",
  },
];

const serviceOptions = [
  "Thesis Writing Support",
  "Research Paper Writing",
  "Dissertation Support",
  "Literature Review",
  "Synopsis Writing",
  "Data Analysis",
  "Plagiarism Removal",
  "Editing & Proofreading",
  "Other",
];

const faqs = [
  {
    question: "How long does it take to complete a thesis?",
    answer:
      "The timeline depends on the complexity and length of your thesis. Typically, a complete thesis support project takes 3-6 months. However, we offer expedited services for urgent requirements. Contact us to discuss your specific timeline needs.",
  },
  {
    question: "Do you provide a plagiarism report?",
    answer:
      "Yes, we provide a comprehensive Turnitin plagiarism report with every project. We guarantee that all content is original and falls below the acceptable similarity threshold (typically under 10%).",
  },
  {
    question: "Can I communicate directly with the writer?",
    answer:
      "Yes, our Premium plan includes direct communication with your assigned expert through scheduled Zoom calls. All plans include communication through our project management system.",
  },
  {
    question: "What if I'm not satisfied with the work?",
    answer:
      "We offer revision rounds as part of our service packages. If the delivered work doesn't meet the agreed specifications, we'll revise it at no additional cost. Customer satisfaction is our top priority.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Absolutely. We maintain strict confidentiality policies. Your personal information, research data, and all project details are kept secure and never shared with third parties.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, bank transfers, and popular digital payment methods. For larger projects, we offer installment payment options. Contact us to discuss payment arrangements.",
  },
];

// ===== MAIN PAGE COMPONENT =====

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", service: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-foreground py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-background sm:text-5xl">
                Contact Us
              </h1>
              <p className="mt-6 text-lg leading-8 text-background/70">
                Have a question or ready to start your project? Get in touch with our team.
                We&apos;re here to help you succeed in your academic journey.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info) => (
                <div
                  key={info.name}
                  className="flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-sm ring-1 ring-border"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-foreground">{info.name}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{info.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{info.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form & FAQ */}
        <section className="bg-muted py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <MessageSquare className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">Send Us a Message</h2>
                </div>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <div className="rounded-2xl bg-primary/10 p-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Message Sent Successfully!</h3>
                    <p className="mt-2 text-muted-foreground">We&apos;ll respond within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                        <Input className="bg-white" id="name" type="text" required placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                        <Input className="bg-white" id="email" type="email" required placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                        <Input className="bg-white" id="phone" type="tel" placeholder="+91 70005 15617" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">Service Required *</label>
                        <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                          <SelectTrigger className="bg-white"><SelectValue placeholder="Select a service" /></SelectTrigger>
                          <SelectContent>
                            {serviceOptions.map((service) => (
                              <SelectItem key={service} value={service}>{service}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                      <Input className="bg-white" id="subject" type="text" required placeholder="Brief description of your inquiry" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Message *</label>
                      <Textarea className="bg-white" id="message" required rows={5} placeholder="Please provide details about your project requirements..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : (<>Send Message <Send className="ml-2 h-4 w-4" /></>)}
                    </Button>
                  </form>
                )}
              </div>

              {/* FAQ */}
              <div id="faq">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                    <MessageSquare className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
                </div>
                <p className="text-muted-foreground mb-8">Find quick answers to common questions about our services.</p>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-base font-medium">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* ===== LIVE MAP (dynamically loaded, no SSR) ===== */}
        <section className="bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <LiveTrackingMap />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
                Take the first step toward academic success. Our team is ready to help you achieve your research goals.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
                <Button size="lg" variant="secondary" asChild>
                  <a href="tel:+917000515617" className="flex items-center gap-2"><Phone className="h-4 w-4" />Call Now</a>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <a href="mailto:office.cognicode@gmail.com" className="flex items-center gap-2"><Mail className="h-4 w-4" />Email Us</a>
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