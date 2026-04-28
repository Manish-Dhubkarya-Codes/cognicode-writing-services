import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, ScanSearch, Target, Zap, Eye, GitBranch, FileText, Box } from "lucide-react";

export const metadata: Metadata = {
  title: "Object Detection & Recognition | CogniCode",
  description: "Expert object detection and recognition for PhD research. YOLO, Faster R-CNN, SSD, DETR, and transformer-based models with state-of-the-art accuracy, real-time performance, and full academic documentation.",
};

const models = [
  { title: "YOLO Series (v5–v11)", desc: "Ultra-fast real-time object detection with exceptional speed-accuracy trade-off" },
  { title: "Faster R-CNN & Mask R-CNN", desc: "Two-stage detectors for high-precision localization and instance segmentation" },
  { title: "SSD & RetinaNet", desc: "Single-shot detectors optimized for speed and small object detection" },
  { title: "DETR & Transformer-based", desc: "End-to-end object detection using attention mechanisms and Vision Transformers" },
];

const deliverables = [
  "Fully trained detection models (YOLO, Faster R-CNN, DETR, etc.) with inference scripts",
  "High-precision bounding box annotations and evaluation metrics (mAP, IoU, Precision, Recall)",
  "Real-time inference pipeline with optimized deployment (TensorRT, ONNX, OpenVINO)",
  "Detection visualizations, heatmaps, and confusion matrices",
  "Detailed methodology chapter ready for thesis and journal submission",
  "Git repository with reproducible training and evaluation code",
  "Publication-ready figures, PR curves, and comparative analysis tables",
  "One-to-one training session + 6 months of free model fine-tuning support",
];

const steps = [
  {
    step: "01",
    title: "Dataset & Annotation Review",
    desc: "Analyze your dataset, perform quality checks, and create or refine high-quality bounding box annotations.",
    icon: Box,
  },
  {
    step: "02",
    title: "Model Selection & Training",
    desc: "Choose and train the best architecture (YOLO, Faster R-CNN, DETR, etc.) with transfer learning and GPU acceleration.",
    icon: Target,
  },
  {
    step: "03",
    title: "Evaluation & Fine-tuning",
    desc: "Rigorous benchmarking with mAP, IoU, FPS, and domain-specific metrics followed by hyperparameter optimization.",
    icon: Eye,
  },
  {
    step: "04",
    title: "Deployment & Documentation",
    desc: "Deliver production-ready inference pipeline with complete academic documentation and visualization suite.",
    icon: Zap,
  },
];

const benefits = [
  "PhD-level computer vision researchers with multiple publications in CVPR, ICCV, ECCV",
  "Expertise in YOLO, Faster R-CNN, DETR, SSD, and Vision Transformers",
  "Real-time and high-accuracy detection solutions",
  "Custom datasets and domain-specific fine-tuning",
  "Support for medical, autonomous vehicles, surveillance, and industrial applications",
  "100% reproducible and well-documented pipelines",
  "Free revisions until your thesis committee approves",
  "Lifetime access to model updates and improvements",
];

export default function ObjectDetectionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-violet-50 via-purple-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-violet-600/10 px-4 py-2 text-sm font-medium text-violet-700 mb-6">
                  <ScanSearch className="h-4 w-4" />
                  OBJECT DETECTION &amp; RECOGNITION
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Object Detection &amp; Recognition
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  State-of-the-art object detection models (YOLO, Faster R-CNN, DETR, etc.) built for your PhD research with real-time performance and publication-ready accuracy.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Build Your Detection Model</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Detection Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Target className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">96.2</p>
                        <p className="text-sm opacity-75">mAP@0.5</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-violet-200">
{`results = model.predict(
    source="test.mp4",
    conf=0.25,
    iou=0.45
)`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">YOLOv11 • Trained • Evaluated • Ready for thesis &amp; publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Models */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Object Detection Models We Master</h2>
              <p className="mt-3 text-muted-foreground">From real-time to high-precision — we implement the latest architectures</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {models.map((model, i) => (
                <Card key={i} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="font-semibold text-xl mb-3">{model.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{model.desc}</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Object Detection Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Academic-grade pipeline from annotation to deployment</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, publication-ready package for your thesis and research papers.</p>
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
                            <p className="font-semibold">Reproducible Training Pipeline</p>
                            <p className="text-sm text-muted-foreground">Full code + Weights &amp; Biases logs</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Documentation</p>
                            <p className="text-sm text-muted-foreground">Methodology + results chapter</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Detection Visualizations</p>
                            <p className="text-sm text-muted-foreground">Bounding boxes, confidence scores &amp; heatmaps</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Support</p>
                            <p className="text-sm text-muted-foreground">mAP tables, PR curves &amp; LaTeX figures</p>
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
                <h2 className="text-4xl font-bold">Why Top Researchers Choose Us</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Object Detection Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your detection requirements and receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your dataset, detection classes, and research goals" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready for State-of-the-Art Object Detection?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From YOLO to DETR — we deliver accurate, fast, and publication-ready detection systems for your research.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Detection Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services/data-driven/computer-vision">Back to Computer Vision Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}