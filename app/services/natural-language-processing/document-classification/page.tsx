import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, FileSearch, Layers, Target, Zap, Eye, GitBranch, FileText, FolderTree } from "lucide-react";

export const metadata: Metadata = {
  title: "Document Classification | CogniCode",
  description: "Expert document classification for PhD research. Automated categorization of research papers, legal documents, medical records, and large text corpora using BERT, RoBERTa, and transformer-based multi-label & hierarchical classifiers.",
};

const classificationTypes = [
  { title: "Multi-Class Document Classification", desc: "Categorize documents into mutually exclusive classes (e.g., research domains, subject areas)" },
  { title: "Multi-Label Classification", desc: "Assign multiple relevant categories to a single document (common in academic and legal texts)" },
  { title: "Hierarchical Classification", desc: "Organize documents into taxonomy trees with parent-child category relationships" },
  { title: "Zero/Few-Shot Classification", desc: "Classify documents with minimal or no labeled training data using modern LLM techniques" },
];

const deliverables = [
  "Fully trained document classification models with inference pipelines",
  "High-accuracy multi-label and hierarchical classification system",
  "Comprehensive evaluation report with F1-score, precision, recall, and confusion matrices",
  "Interactive classification dashboard for testing new documents",
  "Detailed methodology chapter ready for thesis and journal submission",
  "Git repository with reproducible training and evaluation code",
  "Publication-ready figures, tables, and comparative analysis",
  "One-to-one training session + 6 months of free model fine-tuning support",
];

const steps = [
  {
    step: "01",
    title: "Corpus Analysis & Labeling",
    desc: "Analyze your document collection, define taxonomy, and prepare high-quality labeled training data.",
    icon: FolderTree,
  },
  {
    step: "02",
    title: "Feature Engineering & Modeling",
    desc: "Build transformer-based classifiers (BERT, RoBERTa, Longformer) with advanced text preprocessing.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Training & Optimization",
    desc: "Train multi-label/hierarchical models with rigorous cross-validation and hyperparameter tuning.",
    icon: Target,
  },
  {
    step: "04",
    title: "Evaluation & Deployment",
    desc: "Benchmark performance and deliver production-ready classification system with full documentation.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level NLP researchers with extensive publication record",
  "Expertise in Hugging Face, scikit-learn, and transformer architectures",
  "Support for large-scale document corpora and long documents",
  "Multi-label and hierarchical classification specialists",
  "Reproducible experiments with full experiment tracking",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your thesis committee approves",
  "Lifetime access to models and improvements",
];

export default function DocumentClassificationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-4 py-2 text-sm font-medium text-emerald-700 mb-6">
                  <FileSearch className="h-4 w-4" />
                  DOCUMENT CLASSIFICATION
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Document Classification
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Automated, high-accuracy classification of research papers, legal documents, medical records, and large text corpora using state-of-the-art transformer models.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Classification Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Classification Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Target className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">97.3%</p>
                        <p className="text-sm opacity-75">F1-Score</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-emerald-200">
{`classifier = pipeline("text-classification", 
    model="your-fine-tuned-model")`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">BERT • RoBERTa • Multi-label • Ready for thesis &amp; publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Classification Types */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Document Classification Solutions We Deliver</h2>
              <p className="mt-3 text-muted-foreground">From simple categories to complex hierarchical taxonomies</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {classificationTypes.map((type, i) => (
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
              <h2 className="font-serif text-4xl font-bold">Our Document Classification Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Research-grade pipeline for accurate and scalable classification</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete academic-ready classification system.</p>
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
                            <p className="text-sm text-muted-foreground">Full training + inference code</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Report</p>
                            <p className="text-sm text-muted-foreground">Methodology + evaluation results</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Classification Dashboard</p>
                            <p className="text-sm text-muted-foreground">Test new documents instantly</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Support</p>
                            <p className="text-sm text-muted-foreground">F1-scores, confusion matrices &amp; LaTeX tables</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our Document Classification Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Document Classification Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your document corpus and classification needs — receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your document collection and desired classification categories" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready to Automate Document Classification?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From research papers to legal and medical documents — we deliver high-accuracy, publication-ready classification systems.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Classification Project</Link>
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