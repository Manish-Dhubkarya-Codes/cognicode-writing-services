import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, MessageSquare, Bot, BookOpen, Sparkles, GitBranch, FileText, Zap, Eye, Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "Natural Language Processing (NLP) Services | LLM & Text AI",
  description: "Expert Natural Language Processing solutions including sentiment analysis, text classification, NER, question answering, summarization, and LLM fine-tuning using Hugging Face, PyTorch, and LangChain.",
};

const techniques = [
  { 
    title: "Text Classification & Sentiment Analysis", 
    desc: "Advanced sentiment analysis, emotion detection, topic classification, and intent recognition with BERT, RoBERTa, and custom models." 
  },
  { 
    title: "Named Entity Recognition (NER)", 
    desc: "High-accuracy entity extraction, custom entity recognition, and domain-specific NER for medical, legal, and financial texts." 
  },
  { 
    title: "Question Answering & Chatbots", 
    desc: "Build intelligent QA systems, conversational agents, and RAG-based chatbots using Transformers and LangChain." 
  },
  { 
    title: "Text Summarization & Generation", 
    desc: "Abstractive and extractive summarization, content generation, and paraphrasing using T5, BART, and modern LLMs." 
  },
  { 
    title: "Machine Translation & Multilingual NLP", 
    desc: "Neural machine translation, cross-lingual understanding, and multilingual model fine-tuning." 
  },
  { 
    title: "LLM Fine-tuning & Prompt Engineering", 
    desc: "Fine-tune open-source LLMs (Llama, Mistral, Gemma), RAG implementation, and advanced prompt engineering." 
  },
];

const deliverables = [
  "Fully trained and optimized NLP model (Hugging Face / PyTorch)",
  "Complete source code with detailed documentation and inference scripts",
  "REST API + Docker-ready deployment pipeline",
  "Comprehensive evaluation report with metrics and visualizations",
  "Before/after result comparisons and error analysis",
  "Git repository with clean, reproducible, and version-controlled code",
  "Interactive Gradio / Streamlit demo application",
  "One-to-one training session + 6 months of free model updates",
];

const steps = [
  {
    step: "01",
    title: "Requirement Analysis",
    desc: "Understand your NLP goals, dataset review, and define evaluation metrics.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "Data Preparation",
    desc: "Text cleaning, annotation, augmentation, and dataset splitting.",
    icon: BookOpen,
  },
  {
    step: "03",
    title: "Model Development",
    desc: "Model selection, fine-tuning, prompt engineering, and training.",
    icon: Bot,
  },
  {
    step: "04",
    title: "Evaluation & Deployment",
    desc: "Rigorous testing, optimization, and production deployment.",
    icon: Zap,
  },
];

const benefits = [
  "PhD-level NLP researchers with 10+ years experience",
  "Expertise in Hugging Face, Transformers, LangChain, and LlamaIndex",
  "Custom LLM fine-tuning and domain adaptation",
  "High-accuracy models optimized for your specific use case",
  "Support for English + Indian & regional languages",
  "100% reproducible experiments and clean codebases",
  "Publication-ready results, visualizations, and methodology",
  "Free revisions until your supervisor or client approves",
];

export default function NaturalLanguageProcessingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero - NEW & DIFFERENT DESIGN */}
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-4 py-2 text-sm font-medium text-emerald-700 mb-6">
                  <Brain className="h-4 w-4" />
                  NATURAL LANGUAGE PROCESSING
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Natural Language<br />Processing (NLP)
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Transform unstructured text into intelligence. We build advanced NLP systems : sentiment analysis, intelligent chatbots, document understanding, and custom LLMs.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start NLP Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View NLP Samples</Link>
                  </Button>
                </div>
              </div>

              {/* New Hero Card Design */}
              <div className="relative">
                <Card className="bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-700 text-white shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/10 rounded-2xl">
                          <MessageSquare className="h-10 w-10" />
                        </div>
                        <div>
                          <p className="text-sm opacity-75">Model Accuracy</p>
                          <p className="text-5xl font-bold tracking-tighter">98.6%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-2xl p-6 mb-6 font-mono text-sm">
                      <div className="text-teal-300 mb-2">RAG Pipeline Example</div>
                      <pre className="text-white/90 text-xs leading-relaxed">
{`retriever = vectorstore.as_retriever()
qa_chain = RetrievalQA.from_chain_type(
    llm=llm, 
    chain_type="stuff", 
    retriever=retriever
)`}
                      </pre>
                    </div>

                    <div className="flex items-center justify-between text-sm opacity-90">
                      <div>Hugging Face • LangChain • Llama 3 • RAG</div>
                      <div className="text-teal-300 font-medium">Production Ready</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of the page remains the same (Techniques, Process, etc.) */}
        {/* Techniques */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">NLP Techniques We Master</h2>
              <p className="mt-3 text-muted-foreground">From traditional NLP to cutting-edge Large Language Models</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techniques.map((tech, i) => (
                <Card key={i} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="font-semibold text-xl mb-3">{tech.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{tech.desc}</p>
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
              <h2 className="font-serif text-4xl font-bold">Our NLP Development Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Systematic, research-grade, and production-ready process</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, production-ready NLP solution.</p>
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
                            <p className="font-semibold">Production Pipeline</p>
                            <p className="text-sm text-muted-foreground">API + Docker ready</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis & Publication Ready</p>
                            <p className="text-sm text-muted-foreground">Full methodology + results</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Bot className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Interactive Demo</p>
                            <p className="text-sm text-muted-foreground">Gradio / Streamlit</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Performance Benchmarks</p>
                            <p className="text-sm text-muted-foreground">Accuracy, F1, BLEU, ROUGE</p>
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
                <h2 className="text-4xl font-bold">Why Researchers & Companies Choose Our NLP Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your NLP Project Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your text data and project goals : receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University / Company Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your NLP task (e.g., sentiment analysis, chatbot, summarization), dataset size, and expected outcomes" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready to Unlock Insights from Text?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From research papers to enterprise AI : we deliver powerful, accurate, and scalable NLP solutions.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your NLP Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services/ai-ml">Back to AI & Machine Learning Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}