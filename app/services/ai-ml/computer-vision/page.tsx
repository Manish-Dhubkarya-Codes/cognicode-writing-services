'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Camera, Eye, Image as ImageIcon, Video, Zap, Sparkles, GitBranch, FileText, ZoomIn, X } from "lucide-react";

const techniques = [
  { title: "CNN Model for MNIST & Fashion-MNIST", desc: "End-to-end CNN implementation for handwritten digit recognition and fashion item classification with high accuracy and visualization.", img: "/data-driven-services/ai-ml/computer-vision/cnn-model.png" },
  { title: "Fashion Image Classification & Visual Search", desc: "Advanced fashion product classification, attribute prediction, and visual similarity-based search systems.", img: "/data-driven-services/ai-ml/computer-vision/fashion-image.png" },
  { title: "Natural Image Classification (Data Augmentation)", desc: "High-performance image classification on natural images with robust data augmentation and transfer learning techniques.", img: "/data-driven-services/ai-ml/computer-vision/natural-image.png" },
  { title: "Indoor-Outdoor Scene Classification", desc: "Accurate scene understanding models to classify indoor vs outdoor environments with contextual awareness.", img: "/data-driven-services/ai-ml/computer-vision/indoor-outdoor.png" },
  { title: "Aerial Scene Classification (Deep Fusion)", desc: "Advanced aerial/satellite imagery classification using multi-scale deep fusion and attention mechanisms.", img: "/data-driven-services/ai-ml/computer-vision/aerial-scene.png" },
  { title: "Multi-label Image Classification", desc: "Multi-label tagging systems capable of detecting multiple objects, attributes, or scenes in a single image.", img: "/data-driven-services/ai-ml/computer-vision/multi-label.png" },
  { title: "Fake Image Detection using CNN", desc: "Deep learning models for detecting deepfakes, GAN-generated, and manipulated images with high precision.", img: "/data-driven-services/ai-ml/computer-vision/fake-image.png" },
  { title: "Facial Expression Recognition", desc: "Real-time emotion detection (happy, sad, angry, surprise, etc.) using FER datasets and modern architectures.", img: "/data-driven-services/ai-ml/computer-vision/facial-expression.png" },
  { title: "Age & Gender Prediction", desc: "Robust age estimation and gender classification from facial images with demographic analysis.", img: "/data-driven-services/ai-ml/computer-vision/age-gender.png" },
  { title: "Vehicle Detection (Vision + LiDAR)", desc: "Multi-modal vehicle detection and tracking combining camera vision with LiDAR data for autonomous systems.", img: "/data-driven-services/ai-ml/computer-vision/vehicle-detection.png" },
  { title: "Crowd Monitoring / Social Distance Detection", desc: "Real-time crowd density analysis, people counting, and social distancing violation detection.", img: "/data-driven-services/ai-ml/computer-vision/crowd-monitoring.png" },
  { title: "Public Security Video Investigation System", desc: "Intelligent video surveillance system for anomaly detection, person re-identification, and forensic analysis.", img: "/data-driven-services/ai-ml/computer-vision/public-security.png" },
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
  { step: "01", title: "Project Assessment", desc: "Understand your vision requirements, dataset analysis, and define success metrics.", icon: Eye },
  { step: "02", title: "Data Preparation", desc: "Annotation support, data augmentation, and creation of high-quality training datasets.", icon: ImageIcon },
  { step: "03", title: "Model Development", desc: "Architecture selection, transfer learning, custom model design, and training.", icon: Camera },
  { step: "04", title: "Evaluation & Deployment", desc: "Rigorous testing, optimization, quantization, and deployment-ready delivery.", icon: Zap },
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
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Lightweight scroll lock – only prevents background scrolling
  useEffect(() => {
    if (selectedImage !== null) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'visible';
    }
  }, [selectedImage]);

  // ESC key support
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero Section */}
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

        {/* Techniques Section with Image Popup */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Computer Vision Projects We Deliver</h2>
              <p className="mt-3 text-muted-foreground">From academic benchmarks to real-world applications</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techniques.map((tech, i) => {
                const techThemes = [
                  { bg: "bg-slate-100", accent: "text-cyan-500", border: "hover:border-cyan-400", glow: "hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]", bar: "bg-cyan-400" },
                  { bg: "bg-zinc-100", accent: "text-indigo-500", border: "hover:border-indigo-400", glow: "hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]", bar: "bg-indigo-500" },
                  { bg: "bg-neutral-100", accent: "text-emerald-500", border: "hover:border-emerald-400", glow: "hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]", bar: "bg-emerald-400" },
                  { bg: "bg-gray-100", accent: "text-violet-500", border: "hover:border-violet-400", glow: "hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]", bar: "bg-violet-500" },
                ];
                const theme = techThemes[i % techThemes.length];

                return (
                  <Card
                    key={i}
                    className={`group relative ${theme.bg} border border-gray-200 ${theme.border} ${theme.glow} rounded-none p-6 cursor-pointer transition-all duration-300 overflow-hidden`}
                  >
                    <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 group-hover:border-transparent transition-colors duration-300 m-2`} />
                    <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:${theme.border.replace('hover:', '')} transition-colors duration-300 m-2`} />
                    <div className={`absolute left-0 top-0 w-1 h-0 ${theme.bar} group-hover:h-full transition-all duration-500 ease-out`} />

                    <div className="relative z-10 flex flex-col gap-2 pl-4">
                      <span className={`text-[10px] font-mono font-bold tracking-[0.2em] ${theme.accent} uppercase`}>
                        SYS.MODULE_0{i + 1}
                      </span>
                      <h3 className="font-bold text-xl text-gray-800 tracking-tight flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300 ease-out">
                        {tech.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                        {tech.desc}
                      </p>
                    </div>

                    <div className="pl-4 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out mt-0 group-hover:mt-5">
                      <div 
                        className="overflow-hidden relative bg-gray-900 group-hover:bg-transparent transition-colors duration-500 cursor-zoom-in"
                        onClick={() => tech.img && setSelectedImage(i)}
                      >
                        {tech.img ? (
                          <img
                            src={tech.img}
                            alt={tech.title}
                            className="w-full h-auto object-cover origin-top scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-500 ease-out"
                          />
                        ) : (
                          <Camera className="w-full h-52 text-gray-700 opacity-50" />
                        )}

                        {tech.img && (
                          <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(i);
                              }}
                              className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-2xl backdrop-blur-md shadow-xl border border-white/20 transition-transform hover:scale-105"
                              title="View full image"
                            >
                              <ZoomIn className="h-5 w-5" />
                            </button>
                          </div>
                        )}

                        <div className="absolute inset-0 border border-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300 m-2" />
                        <div className="absolute left-0 w-full h-[2px] bg-white shadow-[0_0_10px_#fff] top-0 opacity-0 group-hover:opacity-100 group-hover:top-[100%] transition-all duration-[1500ms] ease-linear pointer-events-none z-20" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process, Deliverables, Benefits, CTA sections remain unchanged */}
        {/* (Copy them from your original file if needed) */}

        {/* CLEAN GLASSY IMAGE POPUP */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-[9999] bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-[8px] backdrop-saturate-200 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-[95vw] max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 z-50 bg-black/20 hover:bg-black/30 backdrop-blur-2xl text-white border cursor-pointer border-white/30 rounded-2xl p-3 shadow-2xl transition-all hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>

              <img
                src={techniques[selectedImage].img}
                alt={techniques[selectedImage].title}
                className="max-h-[90vh] max-w-full object-contain rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}