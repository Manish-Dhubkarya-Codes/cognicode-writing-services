import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, MessageSquareHeart, Languages, TrendingUp, Smile, Eye, GitBranch, FileText, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Text Mining & Sentiment Analysis | CogniCode",
  description: "Expert text mining and sentiment analysis for PhD research. Advanced sentiment scoring, aspect-based analysis, emotion detection, and opinion mining using BERT, RoBERTa, VADER, and custom NLP pipelines.",
};

const techniques = [
  { title: "Sentiment Analysis", desc: "Binary, multi-class, and fine-grained sentiment classification with VADER, TextBlob, and transformer-based models" },
  { title: "Aspect-Based Sentiment Analysis", desc: "Identify specific aspects and their associated sentiment in reviews, feedback, and research documents" },
  { title: "Emotion Detection & Opinion Mining", desc: "Detect joy, anger, sadness, fear, and nuanced opinions from large text corpora" },
  { title: "Advanced Text Mining", desc: "Keyword extraction, topic modeling, named entity recognition (NER), and semantic pattern discovery" },
];

const deliverables = [
  "Fully reproducible Jupyter notebooks and Python scripts",
  "Trained sentiment and text mining models with inference pipelines",
  "Comprehensive sentiment reports with visualizations and statistical analysis",
  "Aspect-based and emotion detection results with confidence scores",
  "Detailed methodology chapter ready for thesis and journal submission",
  "Git repository with clean, version-controlled, and well-documented code",
  "Publication-ready charts, word clouds, confusion matrices, and tables",
  "One-to-one training session + 6 months of free model improvements",
];

const steps = [
  {
    step: "01",
    title: "Corpus Analysis & Preprocessing",
    desc: "Clean, tokenize, lemmatize, and prepare text data with domain-specific handling for multilingual and noisy content.",
    icon: Languages,
  },
  {
    step: "02",
    title: "Feature Engineering & Modeling",
    desc: "Build classical (VADER, TF-IDF) and modern transformer-based (BERT, RoBERTa) models for sentiment and text mining.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Aspect & Emotion Analysis",
    desc: "Implement aspect-based sentiment analysis and multi-label emotion detection with rigorous validation.",
    icon: Smile,
  },
  {
    step: "04",
    title: "Evaluation & Academic Delivery",
    desc: "Benchmark with F1-score, accuracy, ROUGE, and deliver complete documentation for thesis and publication.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level NLP researchers with publications in ACL, EMNLP, and COLING",
  "Expertise in Hugging Face, spaCy, NLTK, TextBlob, and LangChain",
  "Multilingual and domain-specific sentiment analysis",
  "Custom dataset annotation and augmentation support",
  "Reproducible experiments with full experiment tracking",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your thesis committee approves",
  "Lifetime access to models and future improvements",
];

export default function TextMiningSentimentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-50 via-violet-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-violet-600/10 px-4 py-2 text-sm font-medium text-violet-700 mb-6">
                  <MessageSquareHeart className="h-4 w-4" />
                  TEXT MINING &amp; SENTIMENT ANALYSIS
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Text Mining &amp;<br />Sentiment Analysis
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Extract deep insights from text using advanced sentiment analysis, aspect-based mining, emotion detection, and opinion mining — fully reproducible and publication-ready.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Text Mining Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Sentiment Analysis Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <TrendingUp className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">92%</p>
                        <p className="text-sm opacity-75">Sentiment Accuracy</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-violet-200">
{`sentiment = pipeline("sentiment-analysis")
result = sentiment("The paper presents groundbreaking results!")`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">BERT • RoBERTa • VADER • Ready for thesis &amp; publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Techniques */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Text Mining &amp; Sentiment Techniques We Master</h2>
              <p className="mt-3 text-muted-foreground">From classical methods to state-of-the-art transformers</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <h2 className="font-serif text-4xl font-bold">Our Text Mining &amp; Sentiment Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Academic-grade pipeline for reproducible NLP research</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete academic-ready package for thesis and publication.</p>
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
                            <p className="font-semibold">Reproducible Pipeline</p>
                            <p className="text-sm text-muted-foreground">Full code + experiment tracking</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Report</p>
                            <p className="text-sm text-muted-foreground">Methodology + results chapter</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Sentiment Visualizations</p>
                            <p className="text-sm text-muted-foreground">Word clouds, sentiment timelines &amp; heatmaps</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Support</p>
                            <p className="text-sm text-muted-foreground">F1-scores, confusion matrices &amp; LaTeX figures</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Trust Us for Text Mining</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Text Mining Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your text corpus and research goals — receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your text mining or sentiment analysis requirements" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From sentiment analysis to deep opinion mining — we turn unstructured text into publication-ready insights.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Text Mining Project</Link>
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