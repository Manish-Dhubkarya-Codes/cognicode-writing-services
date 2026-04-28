import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Network, Brain, Layers, Zap, Eye, GitBranch, FileText, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Deep Learning & Neural Networks | CogniCode",
  description: "Expert Deep Learning and Neural Network development for PhD research. CNNs, RNNs, LSTMs, GANs, Transformers built with TensorFlow, PyTorch & Keras — fully reproducible and publication-ready.",
};

const architectures = [
  { title: "Convolutional Neural Networks (CNNs)", desc: "ResNet, EfficientNet, DenseNet, Vision Transformers for image classification, segmentation & object detection" },
  { title: "Recurrent Neural Networks (RNNs / LSTMs)", desc: "Sequence modeling, time-series forecasting, NLP tasks and speech recognition" },
  { title: "Generative Adversarial Networks (GANs)", desc: "StyleGAN, CycleGAN, Pix2Pix for data augmentation, synthetic data generation and creative AI" },
  { title: "Transformers & Attention Models", desc: "BERT, GPT-style, ViT, Swin Transformer for NLP, vision, and multimodal research" },
];

const deliverables = [
  "Complete trained model weights (.pth, .h5, ONNX) with inference scripts",
  "Full training pipeline with experiment tracking (TensorBoard / Weights & Biases)",
  "Detailed architecture diagram and methodology chapter for thesis",
  "Performance benchmarks, ablation studies, and visualization reports",
  "Grad-CAM, SHAP, and attention map explainability analysis",
  "Clean, well-documented Git repository with Docker support",
  "Publication-ready figures, tables, and LaTeX code",
  "One-to-one training session + 6 months of free model improvements",
];

const steps = [
  {
    step: "01",
    title: "Problem & Architecture Selection",
    desc: "We analyze your data and research goals to choose the optimal neural architecture (CNN, Transformer, Hybrid, etc.).",
    icon: Network,
  },
  {
    step: "02",
    title: "Data Augmentation & Preprocessing",
    desc: "Advanced augmentation strategies, transfer learning setup, and large-scale dataset handling.",
    icon: Database,
  },
  {
    step: "03",
    title: "Model Training & Optimization",
    desc: "GPU/TPU accelerated training with mixed precision, learning rate scheduling, and distributed training.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Evaluation, Explainability & Delivery",
    desc: "Rigorous testing, interpretability analysis, and complete academic documentation delivery.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level deep learning researchers with multiple publications in top-tier journals",
  "Expertise in TensorFlow, PyTorch, Keras, JAX and Hugging Face",
  "State-of-the-art architectures and custom model design",
  "Reproducible training pipelines with full experiment logs",
  "Support for computer vision, NLP, multimodal and time-series research",
  "Confidentiality & NDA available for sensitive research",
  "Free revisions until your thesis committee is satisfied",
  "Lifetime access to model updates and fine-tuning support",
];

export default function DeepLearningPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero - Neural Network Inspired */}
        <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
                  <Brain className="h-4 w-4" />
                  DEEP LEARNING &amp; NEURAL NETWORKS
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Advanced Deep Learning<br />and Neural Networks
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Design, train, and optimize state-of-the-art neural architectures including CNNs, RNNs, LSTMs, GANs, and Transformers for your PhD research.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Build Your Neural Network</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View DL Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Layers className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-4xl font-bold">94.8%</p>
                        <p className="text-sm opacity-75">Top-1 Accuracy</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-emerald-300 overflow-x-auto">
{`class CustomViT(nn.Module):
    def __init__(self):
        super().__init__()
        self.transformer = ...`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">Built with PyTorch • Trained on GPU cluster • Ready for thesis &amp; publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Architectures */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Neural Architectures We Master</h2>
              <p className="mt-3 text-muted-foreground">From classical CNNs to modern Transformers — we build exactly what your research needs</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {architectures.map((arch, i) => (
                <Card key={i} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="font-semibold text-xl mb-3">{arch.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{arch.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Deep Learning Process */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-serif text-4xl font-bold">Our Deep Learning Development Process</h2>
              <p className="mt-4 text-lg text-muted-foreground">Research-grade pipeline trusted by PhD scholars in top universities</p>
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
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Receive */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-4xl font-bold">Everything You Get With Your Neural Network</h2>
                <p className="mt-4 text-lg text-muted-foreground">Complete academic-ready package for thesis submission and journal publication.</p>
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
                            <p className="font-semibold">Full Training Repository</p>
                            <p className="text-sm text-muted-foreground">Git + Docker + experiment tracking</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis Chapter Ready</p>
                            <p className="text-sm text-muted-foreground">Methodology + results section in LaTeX</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Interpretability Suite</p>
                            <p className="text-sm text-muted-foreground">Grad-CAM, attention maps, SHAP values</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Journal-Ready Output</p>
                            <p className="text-sm text-muted-foreground">Figures, tables &amp; supplementary material</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Trust Us for Deep Learning</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Deep Learning Project Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your research area and we will send a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email Address" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your deep learning research problem (dataset, architecture preference, etc.)" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <Button className="w-full h-14 text-base" size="lg">Request Technical Proposal</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">Ready to Build Cutting-Edge Neural Networks?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From idea to publication — we deliver production-grade deep learning solutions for PhD research.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Deep Learning Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/ai-ml">Back to AI &amp; ML Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}