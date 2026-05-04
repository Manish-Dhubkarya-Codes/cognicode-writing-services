import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Brain, Network, Zap, Sparkles, GitBranch, FileText, TrendingUp, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Deep Learning Services | Neural Networks, Transformers & Advanced AI",
  description: "Expert Deep Learning solutions including CNNs, GANs, anomaly detection, time-series forecasting, and EEG classification using PyTorch and TensorFlow.",
};

const techniques = [
  { 
    title: "CNN & GAN for Visual Perception", 
    desc: "Advanced convolutional neural networks combined with Generative Adversarial Networks for high-quality image generation, enhancement, and visual understanding tasks." 
  },
  { 
    title: "Time-Aware CNN Recommender System", 
    desc: "Temporal CNN-based recommendation engines that incorporate time dynamics for personalized and context-aware recommendations." 
  },
  { 
    title: "Deep Learning-based Anomaly Detection", 
    desc: "Autoencoders, GANs, and hybrid deep models for robust anomaly detection in industrial, financial, and security applications." 
  },
  { 
    title: "Air Pollution Forecasting (CNN + BiGRU)", 
    desc: "Hybrid deep learning models combining CNN and BiGRU for accurate spatiotemporal air quality and pollution level forecasting." 
  },
  { 
    title: "EEG Classification using CNN", 
    desc: "Deep CNN architectures for EEG signal classification, brain-computer interface (BCI), and neurological disorder detection." 
  },
];

const deliverables = [
  "Fully trained, optimized, and production-ready deep learning model",
  "Complete PyTorch/TensorFlow source code with detailed documentation",
  "Automated training and inference pipelines with experiment tracking",
  "Comprehensive performance evaluation report and ablation studies",
  "Model weights, checkpoints, and deployment-ready artifacts",
  "Git repository with reproducible experiments and version control",
  "Interactive Gradio/Streamlit demo application",
  "One-to-one training session + 6 months of free model support",
];

const steps = [
  {
    step: "01",
    title: "Problem Analysis",
    desc: "Define objectives, analyze data, and select the most suitable deep learning architecture.",
    icon: Brain,
  },
  {
    step: "02",
    title: "Data Preparation",
    desc: "Data augmentation, preprocessing, and creation of robust training/validation pipelines.",
    icon: Cpu,
  },
  {
    step: "03",
    title: "Model Development",
    desc: "Architecture design, transfer learning, training with hyperparameter optimization.",
    icon: Network,
  },
  {
    step: "04",
    title: "Optimization & Delivery",
    desc: "Model compression, evaluation, deployment, and full documentation handover.",
    icon: Zap,
  },
];

const benefits = [
  "PhD-level Deep Learning researchers with 10+ years experience",
  "Expertise in PyTorch, TensorFlow, Keras, and Hugging Face",
  "Custom architecture design tailored to your research or business needs",
  "State-of-the-art models with cutting-edge techniques",
  "High-performance training on multi-GPU and distributed systems",
  "Publication-ready results, visualizations, and methodology",
  "100% reproducible experiments with MLflow/WandB tracking",
  "Free revisions until your supervisor or client approves",
];

export default function DeepLearningPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero - Unique Deep Learning Design */}
        <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-4 py-2 text-sm font-medium text-indigo-700 mb-6">
                  <Network className="h-4 w-4" />
                  DEEP LEARNING
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Advanced Deep<br />Learning Solutions
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  From CNN-GAN architectures to time-series forecasting and EEG classification. 
                  We deliver cutting-edge deep learning systems tailored to complex real-world problems.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Deep Learning Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View DL Samples</Link>
                  </Button>
                </div>
              </div>

              {/* Unique Hero Card for Deep Learning */}
              <div className="relative">
                <Card className="bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-700 text-white shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/10 rounded-2xl">
                          <TrendingUp className="h-10 w-10" />
                        </div>
                        <div>
                          <p className="text-sm opacity-75">Validation Accuracy</p>
                          <p className="text-5xl font-bold tracking-tighter">96.8%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-2xl p-6 mb-6 font-mono text-sm">
                      <div className="text-violet-300 mb-2">PyTorch Training Loop</div>
                      <pre className="text-white/90 text-xs leading-relaxed overflow-auto">
{`for epoch in range(epochs):
    for batch in dataloader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()`}
                      </pre>
                    </div>

                    <div className="flex items-center justify-between text-sm opacity-90">
                      <div>PyTorch • TensorFlow • CNN • GAN • BiGRU</div>
                      <div className="text-violet-300 font-medium">Research Grade</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Techniques - Updated */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Deep Learning Projects We Deliver</h2>
              <p className="mt-3 text-muted-foreground">From computer vision to time-series and biomedical applications</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Deep Learning Development Workflow</h2>
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
                            <p className="font-semibold">Training Pipeline</p>
                            <p className="text-sm text-muted-foreground">Reproducible & Scalable</p>
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
                          <Cpu className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Optimized Models</p>
                            <p className="text-sm text-muted-foreground">Edge & Cloud Ready</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Performance Benchmarks</p>
                            <p className="text-sm text-muted-foreground">Accuracy, Speed, Efficiency</p>
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
                <h2 className="text-4xl font-bold">Why Researchers & Organizations Choose Our Deep Learning Service</h2>
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
                  <p className="text-muted-foreground mb-6">Share your project requirements and data — receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University / Company Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your deep learning goal, dataset type, and expected outcomes" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready to Build State-of-the-Art Deep Learning Models?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From research prototypes to production-grade systems — we deliver high-performance, reproducible deep learning solutions.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Deep Learning Project</Link>
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