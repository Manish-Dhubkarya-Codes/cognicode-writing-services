import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Lightbulb, Search, Network, Sparkles, Eye, GitBranch, FileText, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Topic Modeling & Language Understanding | CogniCode",
  description: "Expert topic modeling and language understanding for PhD research. Uncover hidden themes using LDA, BERTopic, NMF, and embedding-based clustering with deep semantic analysis via fine-tuned transformers.",
};

const techniques = [
  { title: "Classic Topic Modeling", desc: "LDA, NMF, and LSA for discovering latent topics in large document collections" },
  { title: "Modern BERTopic & Embedding-Based", desc: "State-of-the-art topic modeling using sentence transformers and hierarchical clustering" },
  { title: "Semantic & Contextual Understanding", desc: "Deep language understanding with fine-tuned BERT, RoBERTa, and transformer models" },
  { title: "Dynamic & Temporal Topic Modeling", desc: "Track topic evolution over time in research papers, news, and longitudinal corpora" },
];

const deliverables = [
  "Fully reproducible topic modeling pipelines with interactive visualizations",
  "BERTopic / LDA models with topic keywords, coherence scores, and hierarchical structures",
  "Interactive topic explorer dashboard (PyLDAvis / BERTopic visualizations)",
  "Detailed semantic analysis report with dominant topics and document-topic distributions",
  "Complete methodology chapter ready for thesis and journal submission",
  "Git repository with clean, well-documented, and version-controlled code",
  "Publication-ready figures, topic-word clouds, and comparative analysis tables",
  "One-to-one training session + 6 months of free model updates and re-training",
];

const steps = [
  {
    step: "01",
    title: "Corpus Preparation & Exploration",
    desc: "Preprocess large text collections, perform EDA, and prepare data for topic modeling.",
    icon: Layers,
  },
  {
    step: "02",
    title: "Topic Modeling & Discovery",
    desc: "Apply LDA, BERTopic, and embedding-based methods to uncover hidden thematic structures.",
    icon: Lightbulb,
  },
  {
    step: "03",
    title: "Semantic Analysis & Interpretation",
    desc: "Analyze topic coherence, label topics, and perform deep language understanding.",
    icon: Search,
  },
  {
    step: "04",
    title: "Visualization & Academic Delivery",
    desc: "Generate interactive visualizations and deliver full documentation for thesis and publication.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level NLP researchers with publications in ACL, EMNLP, and NAACL",
  "Expertise in LDA, BERTopic, Gensim, scikit-learn, and Hugging Face",
  "Support for large-scale corpora and domain-specific topic modeling",
  "Dynamic and temporal topic evolution analysis",
  "100% reproducible experiments with full tracking",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your thesis committee approves",
  "Lifetime access to models, dashboards, and improvements",
];

export default function TopicModelingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-600/10 px-4 py-2 text-sm font-medium text-amber-700 mb-6">
                  <Lightbulb className="h-4 w-4" />
                  TOPIC MODELING &amp; LANGUAGE UNDERSTANDING
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Topic Modeling &amp;<br />Language Understanding
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Uncover hidden themes, semantic structures, and deep insights from large text corpora using LDA, BERTopic, and state-of-the-art transformer models.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Topic Modeling Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Topic Modeling Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Sparkles className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">0.82</p>
                        <p className="text-sm opacity-75">Topic Coherence</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-amber-200">
{`topic_model = BERTopic()
topics, probs = topic_model.fit_transform(docs)`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">BERTopic • LDA • Semantic Analysis • Ready for thesis &amp; publication</p>
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
              <h2 className="font-serif text-4xl font-bold">Topic Modeling &amp; Language Understanding Techniques</h2>
              <p className="mt-3 text-muted-foreground">From classical statistical models to modern transformer-based approaches</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Topic Modeling Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Research-grade pipeline for discovering meaningful topics and semantic structures</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, publication-ready topic modeling solution.</p>
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
                            <p className="text-sm text-muted-foreground">Full code + interactive visualizations</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Report</p>
                            <p className="text-sm text-muted-foreground">Methodology + topic interpretation</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Interactive Topic Explorer</p>
                            <p className="text-sm text-muted-foreground">BERTopic / PyLDAvis dashboards</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Support</p>
                            <p className="text-sm text-muted-foreground">Coherence scores, word clouds &amp; tables</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our Topic Modeling Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Topic Modeling Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your document corpus and research goals — receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your corpus and topic modeling objectives" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready to Discover Hidden Themes in Your Text?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From LDA to BERTopic — we deliver deep semantic understanding and publication-ready topic models.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Topic Modeling Project</Link>
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