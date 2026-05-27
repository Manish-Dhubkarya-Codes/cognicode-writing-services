"use client";

import { useState, useEffect } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, CheckCircle } from "lucide-react";
import { postData, getData } from "../server/fetch-beckend-services";

// Dynamic Map
const LiveTrackingMap = dynamic(() => import("@/app/contact/live-tracking-map"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border bg-muted/50 flex items-center justify-center" style={{ height: 500 }}>
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
});

// Static Data
const contactInfo = [
  { name: "Email", value: "office.cognicode@gmail.com", icon: Mail, description: "Send us an email anytime" },
  { name: "Phone", value: "+917000515617", icon: Phone, description: "Mon-Fri from 9am to 6pm IST" },
  { name: "Office", value: "B/2, Mahesh Nagar, Tulsi Vihar Colony, Gwalior, Madhya Pradesh 474002", icon: MapPin, description: "Visit our office" },
  { name: "Working Hours", value: "24/7 Online Support", icon: Clock, description: "We're always here to help" },
];

const serviceOptions = [
  "Thesis Writing Support", "Research Paper Writing", "Dissertation Support",
  "Literature Review", "Synopsis Writing", "Data Analysis",
  "Plagiarism Removal", "Editing & Proofreading", "Other",
];

const faqs = [
  { question: "How long does it take to complete a thesis?", answer: "Typically 3-6 months depending on complexity." },
  { question: "Do you provide a plagiarism report?", answer: "Yes, we provide a comprehensive Turnitin report." },
  { question: "Can I communicate directly with the writer?", answer: "Yes, direct communication is available." },
  { question: "What if I'm not satisfied with the work?", answer: "We offer free revisions." },
  { question: "Is my information kept confidential?", answer: "Absolutely. Strict confidentiality is maintained." },
  { question: "What payment methods do you accept?", answer: "Credit cards, bank transfers, and digital payments." },
];

export default function ContactPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  // Form states for normal users
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", subject: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check if admin is logged in
  useEffect(() => {
    const stored = localStorage.getItem("admin");
    if (stored) {
      setIsAdmin(true);
      fetchAllRequests();
    }
  }, []);

  // Fetch all client requests
  const fetchAllRequests = async () => {
    setLoadingRequests(true);
    try {
      const result = await getData("clientrequests/get_clientrequests");
      if (result?.success && Array.isArray(result.requests)) {
        setRequests(result.requests);
      }
    } catch (error) {
      console.error("Error fetching client requests:", error);
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await postData("clientrequests/clientrequests", formData);
      if (result?.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", email: "", phone: "", service: "", subject: "", message: "" });
        }, 3000);
      } else {
        alert(result?.message || "Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                {isAdmin ? "Client Requests List" : "Contact Us"}
              </h1>
              <p className="mt-6 text-lg leading-8 text-background/70">
                {isAdmin
                  ? "View and manage all incoming client inquiries"
                  : "Have a question or ready to start your project? Get in touch with our team."}
              </p>
            </div>
          </div>
        </section>

        {/* ADMIN TABLE VIEW */}
        {isAdmin ? (
          <section className="bg-background py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-6">Client Requests List</h2>
              
              <div className="rounded-2xl border bg-card overflow-hidden max-h-[650px] overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-card z-10">
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingRequests ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-12">Loading requests...</TableCell>
                      </TableRow>
                    ) : requests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                          No client requests yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      requests.map((req: any) => (
                        <TableRow key={req.clientId}>
                          <TableCell className="font-medium">{req.clientId}</TableCell>
                          <TableCell>{req.name}</TableCell>
                          <TableCell>
                            <a 
                              href={`mailto:${req.email}`} 
                              className="text-blue-600 hover:underline"
                            >
                              {req.email}
                            </a>
                          </TableCell>
                          <TableCell>{req.phone || "—"}</TableCell>
                          <TableCell>{req.service || "—"}</TableCell>
                          <TableCell className="max-w-[200px] truncate">{req.subject}</TableCell>
                          <TableCell className="max-w-[280px] truncate text-sm">{req.message}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(req.created_at).toLocaleDateString("en-IN")}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </section>
        ) : (
          // NORMAL USER VIEW (unchanged)
          <>
            {/* Contact Info Cards */}
            <section className="bg-background py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {contactInfo.map((info) => (
                    <div key={info.name} className="flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-sm ring-1 ring-border">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-4 text-sm font-semibold">{info.name}</h3>
                      <p className="mt-1 text-sm font-medium text-primary">{info.value}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{info.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Form + FAQ */}
            <section className="bg-muted py-16 sm:py-24">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                  {/* Form Section - unchanged */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <MessageSquare className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <h2 className="font-serif text-2xl font-bold">Send Us a Message</h2>
                    </div>
                    <p className="text-muted-foreground mb-8">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

                    {isSubmitted ? (
                      <div className="rounded-2xl bg-primary/10 p-8 text-center">
                        <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">Message Sent Successfully!</h3>
                        <p className="text-muted-foreground mt-2">We&apos;ll respond within 24 hours.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium mb-2">Full Name *</label>
                            <Input className="bg-white" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Email Address *</label>
                            <Input className="bg-white" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium mb-2">Phone Number</label>
                            <Input className="bg-white" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Service Required *</label>
                            <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                              <SelectTrigger className="bg-white"><SelectValue placeholder="Select a service" /></SelectTrigger>
                              <SelectContent>
                                {serviceOptions.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Subject *</label>
                          <Input className="bg-white" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Message *</label>
                          <Textarea className="bg-white" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? "Sending..." : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
                        </Button>
                      </form>
                    )}
                  </div>

                  {/* FAQ */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                        <MessageSquare className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <h2 className="font-serif text-2xl font-bold">Frequently Asked Questions</h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                      {faqs.map((faq, i) => (
                        <AccordionItem key={i} value={`faq-${i}`}>
                          <AccordionTrigger>{faq.question}</AccordionTrigger>
                          <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              </div>
            </section>

            {/* Live Map */}
            <section className="bg-background py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <LiveTrackingMap />
              </div>
            </section>
          </>
        )}

        {/* CTA */}
        <section className="bg-primary py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">Ready to Get Started?</h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">Take the first step toward academic success.</p>
              <div className="mt-10 flex justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <a href="tel:+917000515617"><Phone className="mr-2 h-4 w-4" /> Call Now</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:office.cognicode@gmail.com"><Mail className="mr-2 h-4 w-4" /> Email Us</a>
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