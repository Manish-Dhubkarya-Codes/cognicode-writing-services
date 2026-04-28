import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Brain, Zap, Layers, Eye, GitBranch, FileText, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "TensorFlow, PyTorch | CogniCode",
  description: "Expert deep learning and machine learning model development with TensorFlow and PyTorch. Custom architectures, training pipelines, transfer learning, model optimization, and deployment for PhD research.",
};

const techniques = [
  { title: "TensorFlow & Keras", desc: "High-level model building, custom layers, distributed training, and TensorFlow Serving deployment" },
  { title: "PyTorch Mastery", desc: "Dynamic computation graphs, custom training loops, TorchScript, and production-ready model export" },
  { title: "Advanced Architectures", desc: "CNNs, RNNs, LSTMs, Transformers, GANs, Diffusion Models, and custom neural networks" },
  { title: "Model Optimization & Deployment", desc: "Hyperparameter tuning, quantization, pruning, ONNX export, and edge/device deployment" },
];

const deliverables = [
  "Fully trained and optimized TensorFlow / PyTorch models with inference scripts",
  "Custom neural network architectures tailored to your research problem",
  "Reproducible training pipelines with experiment tracking (TensorBoard / Weights & Biases)",
  "Model explainability reports (Grad-CAM, SHAP, attention maps)",
  "Complete methodology chapter ready for thesis and journal submission",
  "Git repository with clean, well-documented, and version-controlled code",
  "Publication-ready performance metrics, visualizations, and ablation studies",
  "One-to-one training session + 6 months of free model fine-tuning support",
];

const steps = [
  {
    step: "01",
    title: "Problem Definition & Architecture Design",
    desc: "Translate your research objective into the optimal deep learning architecture and framework choice.",
    icon: Brain,
  },
  {
    step: "02",
    title: "Data Preparation & Augmentation",
    desc: "Build robust data loaders, apply domain-specific augmentations, and set up efficient data pipelines.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Model Training & Optimization",
    desc: "Train models with GPU/TPU acceleration, mixed precision, learning rate scheduling, and hyperparameter tuning.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Evaluation, Explainability & Delivery",
    desc: "Rigorous benchmarking, interpretability analysis, and final delivery with full academic documentation.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level deep learning researchers with multiple publications in top-tier venues",
  "Deep expertise in both TensorFlow/Keras and PyTorch ecosystems",
  "Custom architecture design and state-of-the-art model development",
  "Production-ready training pipelines and model deployment",
  "GPU/TPU optimized and scalable training workflows",
  "Full reproducibility with experiment tracking",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your thesis committee approves",
];

export default function TensorFlowPyTorchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-50 via-indigo-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-purple-600/10 px-4 py-2 text-sm font-medium text-purple-700 mb-6">
                  <Brain className="h-4 w-4" />
                  TENSORFLOW &amp; PYTORCH
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  TensorFlow &amp; PyTorch
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Deep learning and machine learning model development with TensorFlow and PyTorch — custom architectures, training pipelines, transfer learning, and model optimization.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Build Your Deep Learning Model</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View TensorFlow/PyTorch Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Sparkles className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">State-of-the-Art</p>
                        <p className="text-sm opacity-75">Deep Learning</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-purple-200">
{`model = torch.nn.Sequential(
    torch.nn.Linear(784, 512),
    torch.nn.ReLU()
)`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">TensorFlow • PyTorch • Custom Models • Ready for thesis &amp; publication</p>
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
              <h2 className="font-serif text-4xl font-bold">TensorFlow &amp; PyTorch Capabilities We Master</h2>
              <p className="mt-3 text-muted-foreground">From model development to production deployment</p>
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
              <h2 className="font-serif text-4xl font-bold">Our TensorFlow &amp; PyTorch Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Research-grade deep learning development process</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, production-ready deep learning solution.</p>
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
                            <p className="text-sm text-muted-foreground">Full training code + tracking</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Documentation</p>
                            <p className="text-sm text-muted-foreground">Architecture &amp; results chapter</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Explainability Reports</p>
                            <p className="text-sm text-muted-foreground">SHAP, Grad-CAM &amp; attention maps</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Support</p>
                            <p className="text-sm text-muted-foreground">Metrics, ablation studies &amp; figures</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our TensorFlow &amp; PyTorch Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Deep Learning Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your model requirements and receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your deep learning / TensorFlow / PyTorch project requirements" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready to Build Cutting-Edge Deep Learning Models?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From TensorFlow to PyTorch — we deliver state-of-the-art models with full reproducibility and academic rigor.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Deep Learning Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services/data-driven/tools-technologies">Back to Tools &amp; Technologies</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}