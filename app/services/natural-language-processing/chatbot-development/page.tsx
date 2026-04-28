import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Bot, MessageSquare, Zap, Brain, Eye, GitBranch, FileText, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Chatbot Development | CogniCode",
  description: "Expert chatbot development for PhD research. Intelligent conversational agents, domain-specific chatbots, RAG systems, intent recognition, and dialogue management powered by LLMs.",
};

const chatbotTypes = [
  { title: "Domain-Specific Chatbots", desc: "Custom chatbots for healthcare, legal, education, research assistance, and academic advising" },
  { title: "RAG-Powered Conversational AI", desc: "Retrieval-Augmented Generation systems that ground responses in your documents and research papers" },
  { title: "Multi-Turn Dialogue Systems", desc: "Advanced dialogue management with context retention, intent classification, and slot filling" },
  { title: "LLM-Based Agents", desc: "Autonomous agents with tool calling, reasoning chains, and multi-modal capabilities" },
];

const deliverables = [
  "Fully functional, deployable chatbot with web/Telegram/WhatsApp interfaces",
  "RAG architecture with vector database (Pinecone, Weaviate, Chroma) integration",
  "Intent recognition and dialogue management system",
  "Complete source code with experiment tracking (LangSmith / LangChain)",
  "Detailed methodology chapter ready for thesis and journal submission",
  "Git repository with clean, reproducible, and production-ready code",
  "Interactive demo + performance evaluation report",
  "One-to-one training session + 6 months of free updates and fine-tuning",
];

const steps = [
  {
    step: "01",
    title: "Requirements & Knowledge Base",
    desc: "Define use-case, collect domain documents, and design conversation flows and intents.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "RAG & LLM Integration",
    desc: "Build retrieval pipeline, embed documents, and integrate with LLMs (GPT, Llama, Mistral, etc.).",
    icon: Brain,
  },
  {
    step: "03",
    title: "Dialogue & Agent Development",
    desc: "Implement intent recognition, memory, tool calling, and multi-turn conversation logic.",
    icon: Bot,
  },
  {
    step: "04",
    title: "Evaluation & Deployment",
    desc: "Test with real conversations, measure accuracy, and deliver production-ready chatbot with full documentation.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level NLP & LLM researchers with publications in ACL and NeurIPS",
  "Expertise in LangChain, LlamaIndex, Haystack, and Hugging Face",
  "Domain-specific RAG systems for research and academic use",
  "Multi-modal and voice-enabled chatbot capabilities",
  "100% reproducible and production-ready architectures",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your thesis committee approves",
  "Lifetime access to chatbot updates and improvements",
];

export default function ChatbotDevelopmentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero - Conversational AI Theme */}
        <section className="bg-gradient-to-br from-indigo-50 via-blue-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-4 py-2 text-sm font-medium text-indigo-700 mb-6">
                  <Bot className="h-4 w-4" />
                  CHATBOT DEVELOPMENT
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Intelligent Chatbot<br />Development
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Build domain-specific, RAG-powered conversational agents and research assistants using the latest LLMs and dialogue frameworks.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Build Your Chatbot</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Chatbot Demos</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Sparkles className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">98%</p>
                        <p className="text-sm opacity-75">Response Relevance</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-indigo-200">
{`rag_chain = create_retrieval_chain(
    retriever, 
    llm
)`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">RAG • LangChain • LLM • Ready for thesis &amp; publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Chatbot Types */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Chatbot Solutions We Develop</h2>
              <p className="mt-3 text-muted-foreground">From simple Q&amp;A bots to advanced research assistants</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {chatbotTypes.map((type, i) => (
                <Card key={i} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="font-semibold text-xl mb-3">{type.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{type.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-serif text-4xl font-bold">Our Chatbot Development Process</h2>
              <p className="mt-4 text-lg text-muted-foreground">Research-grade pipeline for intelligent conversational systems</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((s, i) => (
                <div key={i} className="relative text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mb-6">
                    {s.step}
                  </div>
                  <s.icon className="mx-auto h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground px-4">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deliverables */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-4xl font-bold">Everything You Receive</h2>
                <p className="mt-4 text-lg text-muted-foreground">Complete, production-ready conversational AI solution.</p>
                <ul className="mt-10 space-y-6">
                  {deliverables.map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-7">
                <Card className="shadow-xl">
                  <CardContent className="p-10">
                    <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <GitBranch className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Reproducible RAG Pipeline</p>
                            <p className="text-sm text-muted-foreground">LangChain + vector DB ready</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Documentation</p>
                            <p className="text-sm text-muted-foreground">Full architecture + evaluation</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Interactive Demo</p>
                            <p className="text-sm text-muted-foreground">Live chatbot interface</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Support</p>
                            <p className="text-sm text-muted-foreground">Accuracy metrics &amp; system diagrams</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl font-bold">Why Researchers Choose Our Chatbot Service</h2>
                <ul className="mt-10 space-y-6">
                  {benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-4">
                      <CheckCircle className="h-6 w-6 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className="bg-white text-foreground">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-2">Get Your Chatbot Development Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your domain and requirements — receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your chatbot use case, domain, and desired features" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <Button className="w-full h-14 text-base" size="lg">Request Detailed Proposal</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">Ready to Build Your Intelligent Chatbot?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From domain-specific assistants to advanced RAG systems — we deliver research-grade conversational AI.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Chatbot Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services/data-driven/natural-language-processing">Back to NLP Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}