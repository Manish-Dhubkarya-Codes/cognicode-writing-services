import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Camera, Eye, Image, Video, Zap, Sparkles, GitBranch, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Computer Vision Services | Object Detection, Segmentation & AI Vision",
  description: "Expert Computer Vision solutions for PhD research and industry. Object detection, image segmentation, facial recognition, OCR, video analysis using YOLO, Detectron2, OpenCV, and PyTorch.",
};

const techniques = [
  { 
    title: "Object Detection & Tracking", 
    desc: "Real-time object detection using YOLOv8, YOLOv9, Detectron2, and Faster R-CNN with multi-object tracking capabilities." 
  },
  { 
    title: "Semantic & Instance Segmentation", 
    desc: "Pixel-level segmentation with U-Net, Mask R-CNN, Segment Anything Model (SAM), and DeepLabv3 for medical and industrial use cases." 
  },
  { 
    title: "Image Classification & Recognition", 
    desc: "Advanced classification using CNNs, Vision Transformers (ViT), and EfficientNet with transfer learning and fine-tuning." 
  },
  { 
    title: "Facial Recognition & Analysis", 
    desc: "Face detection, recognition, emotion analysis, age/gender estimation with high accuracy and privacy compliance." 
  },
  { 
    title: "Video Analysis & Action Recognition", 
    desc: "Action detection, anomaly detection, motion tracking, and temporal analysis in video streams." 
  },
  { 
    title: "OCR & Document Understanding", 
    desc: "Intelligent document processing, scene text recognition, and table extraction using advanced deep learning models." 
  },
];

const deliverables = [
  "Fully trained and optimized Computer Vision model (PyTorch/TensorFlow)",
  "Complete source code with detailed documentation and usage guide",
  "Automated inference pipeline (API + Docker-ready)",
  "Comprehensive performance report with metrics and visualizations",
  "Before/after result comparisons and error analysis",
  "Git repository with clean, reproducible, and version-controlled code",
  "Interactive Jupyter notebooks and Streamlit demo app",
  "One-to-one training session + 6 months of free model updates",
];

const steps = [
  {
    step: "01",
    title: "Project Assessment",
    desc: "Understand your vision requirements, dataset analysis, and define success metrics.",
    icon: Eye,
  },
  {
    step: "02",
    title: "Data Preparation",
    desc: "Annotation support, data augmentation, and creation of high-quality training datasets.",
    icon: Image,
  },
  {
    step: "03",
    title: "Model Development",
    desc: "Architecture selection, transfer learning, custom model design, and training.",
    icon: Camera,
  },
  {
    step: "04",
    title: "Evaluation & Deployment",
    desc: "Rigorous testing, optimization, quantization, and deployment-ready delivery.",
    icon: Zap,
  },
];

const benefits = [
  "PhD-level Computer Vision researchers with 10+ years experience",
  "Expertise in YOLO, Detectron2, OpenCV, SAM, and Transformers",
  "Custom model development tailored to your specific domain",
  "High-performance models optimized for speed and accuracy",
  "Support for edge devices, cloud, and real-time applications",
  "100% reproducible experiments and clean codebases",
  "Publication-ready results, visualizations, and methodology",
  "Free revisions until your supervisor or client approves",
];

export default function ComputerVisionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-2 text-sm font-medium text-blue-700 mb-6">
                  <Camera className="h-4 w-4" />
                  COMPUTER VISION
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Computer Vision<br />Solutions
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Advanced object detection, image segmentation, facial recognition, and video analysis. 
                  We transform raw visual data into actionable intelligence for research and industry.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Computer Vision Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View CV Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Sparkles className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">98.7%</p>
                        <p className="text-sm opacity-75">mAP Accuracy</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-blue-200">
{`results = model.predict(
    source="video.mp4",
    conf=0.45,
    iou=0.7
)`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">YOLO • Detectron2 • OpenCV • PyTorch • Real-time Ready</p>
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
              <h2 className="font-serif text-4xl font-bold">Computer Vision Techniques We Master</h2>
              <p className="mt-3 text-muted-foreground">From classic CV to state-of-the-art deep learning models</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Computer Vision Development Workflow</h2>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, production-ready computer vision solution.</p>
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
                            <p className="text-sm text-muted-foreground">Docker + API ready</p>
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
                          <Video className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Demo Applications</p>
                            <p className="text-sm text-muted-foreground">Streamlit / Gradio demos</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Performance Benchmarks</p>
                            <p className="text-sm text-muted-foreground">mAP, IoU, FPS metrics</p>
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
                <h2 className="text-4xl font-bold">Why Researchers & Companies Choose Our Computer Vision Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Computer Vision Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your project details and dataset : receive a technical proposal with timeline and cost within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University / Company Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your computer vision goal, dataset type (images/video), and expected outcomes" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready to Build Your Computer Vision Solution?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From research prototypes to production-grade vision systems : we deliver accurate, fast, and scalable solutions.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Computer Vision Project</Link>
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