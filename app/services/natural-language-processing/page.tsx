import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Languages, MessageSquareHeart, Bot, FileSearch, Lightbulb, MessageSquare } from "lucide-react";

export const metadata: Metadata = { 
  title: "Natural Language Processing (NLP) | CogniCode", 
  description: "Expert NLP research support — text mining, sentiment analysis, chatbot development, document classification, topic modeling, and language understanding." 
};

const features = [
  { 
    icon: MessageSquareHeart, 
    title: "Text Mining & Sentiment Analysis", 
    description: "Extract meaningful insights from unstructured text using advanced NLP pipelines — sentiment scoring, opinion mining, aspect-based analysis, and emotion detection across domains.",
    href: "/services/natural-language-processing/text-mining-sentiment"
  },
  { 
    icon: Bot, 
    title: "Chatbot Development", 
    description: "Build intelligent conversational agents and domain-specific chatbots powered by LLMs, RAG architectures, intent recognition, and dialogue management frameworks.",
    href: "/services/natural-language-processing/chatbot-development"
  },
  { 
    icon: FileSearch, 
    title: "Document Classification", 
    description: "Automate categorization of large document corpora using transformer-based classifiers, BERT, RoBERTa, and few-shot learning approaches for high-accuracy results.",
    href: "/services/natural-language-processing/document-classification"
  },
  { 
    icon: Lightbulb, 
    title: "Topic Modeling & Language Understanding", 
    description: "Uncover hidden themes and semantic structure with LDA, BERTopic, and embedding-based clustering, plus deep language understanding via fine-tuned transformer models.",
    href: "/services/natural-language-processing/topic-modeling"
  },
];

const steps = [
  { step: "01", title: "Problem & Corpus Definition", description: "We understand your NLP objective, language(s), domain, and text data characteristics to frame a well-scoped research task." },
  { step: "02", title: "Text Preprocessing", description: "Clean, tokenize, and prepare text data — handling noise, multilingual content, embeddings, and domain-specific vocabularies." },
  { step: "03", title: "Model Development", description: "Develop and fine-tune transformer architectures, LLMs, or classical NLP models with rigorous experimentation and validation." },
  { step: "04", title: "Evaluation & Delivery", description: "Benchmark using F1, BLEU, ROUGE, perplexity, or task-specific metrics, and deliver the model with full documentation and walkthrough." },
];

const benefits = ["Expert NLP researchers and linguists", "Hugging Face, spaCy, NLTK, LangChain expertise", "Multilingual and low-resource language support", "Custom dataset annotation and augmentation", "LLM fine-tuning and RAG implementation", "Reproducible experiments and clean codebases", "Publication-ready evaluations and visualizations", "Post-delivery support and consultations"];

export default function ServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Natural Language Processing</p>
                <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">NLP Research & Development Support</h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">From classical text mining to state-of-the-art large language models, our NLP experts help you extract meaning from text, build conversational systems, and publish research-grade language understanding solutions.</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/contact">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Samples</Link>
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Languages className="h-12 w-12" />
                      <div>
                        <p className="text-3xl font-bold">350+</p>
                        <p className="text-sm text-primary-foreground/80">NLP Projects Delivered</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">25+</p>
                      <p className="text-sm text-muted-foreground">Languages Supported</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">100%</p>
                      <p className="text-sm text-muted-foreground">Reproducible Results</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-8">
              {[
                { icon: Shield, text: "Original Research" },
                { icon: Clock, text: "On-Time Delivery" },
                { icon: Users, text: "Expert NLP Engineers" },
                { icon: Award, text: "Fully Documented" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-primary-foreground">
                  <item.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What We Deliver in NLP</h2>
              <p className="mt-4 text-lg text-muted-foreground">Click on any service below to explore detailed offerings</p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {features.map((f, i) => (
                <Link key={i} href={f.href} className="block group">
                  <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 h-full group-hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <f.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3>
                      <p className="mt-2 text-muted-foreground">{f.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/50 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our NLP Development Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">A structured, research-grade pipeline from corpus preparation to model delivery with full knowledge transfer.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {s.step}
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Choose Our NLP Service?</h2>
                <p className="mt-4 text-lg text-muted-foreground">We deliver research-grade language solutions with complete reproducibility and full documentation.</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground">Get a Free NLP Project Estimate</h3>
                  <p className="mt-2 text-muted-foreground">Share your NLP requirements and get a detailed estimate.</p>
                  <form className="mt-6 space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    <input type="email" placeholder="Email Address" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    <input type="tel" placeholder="Phone Number" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    <select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                      <option value="">Select NLP Area</option>
                      <option value="text-mining">Text Mining & Sentiment Analysis</option>
                      <option value="chatbot">Chatbot Development</option>
                      <option value="classification">Document Classification</option>
                      <option value="topic-modeling">Topic Modeling & Language Understanding</option>
                      <option value="llm">LLM Fine-tuning / RAG</option>
                      <option value="other">Other</option>
                    </select>
                    <Button className="w-full" size="lg">Get Free Consultation</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-black sm:text-4xl">Need Natural Language Processing Support?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">From sentiment analysis to LLM-powered conversational AI — our NLP experts turn text into insight.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}