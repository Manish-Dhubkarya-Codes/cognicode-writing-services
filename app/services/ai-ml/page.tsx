import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Brain, Network, TrendingUp, Target, Cpu } from "lucide-react";
import Img from "@/public/data-driven-services/ai-ml/computer-vision/computer-vision.png"

export const metadata: Metadata = { 
  title: "Computer Vision, NLP, Deep Learning & AI Solutions | CogniCode", 
  description: "Expert AI solutions including Computer Vision, Natural Language Processing, Image Processing, Healthcare AI, Cybersecurity, Fraud Detection and advanced Deep Learning systems." 
};

const features = [
  { 
    icon: Cpu, 
    title: "Computer Vision", 
    description: "Advanced computer vision solutions including object detection, image segmentation, facial recognition, and video analysis using YOLO, Detectron2, and custom CNN architectures.",
    href: "/services/ai-ml/computer-vision",
    image:"/data-driven-services/ai-ml/computer-vision/computer-vision.png"
  },
  { 
    icon: Brain, 
    title: "Natural Language Processing (NLP)", 
    description: "Build powerful NLP systems for text classification, sentiment analysis, named entity recognition, question answering, and large language model fine-tuning with Transformers.",
    href: "/services/ai-ml/nlp"
  },
  { 
    icon: Network, 
    title: "Image Processing", 
    description: "Professional image enhancement, restoration, feature extraction, and preprocessing pipelines using OpenCV, Pillow, and deep learning-based techniques.",
    href: "/services/ai-ml/image-processing"
  },
  { 
    icon: TrendingUp, 
    title: "Deep Learning", 
    description: "End-to-end deep learning solutions with modern architectures (CNNs, RNNs, Transformers, Diffusion Models) using PyTorch and TensorFlow for complex research problems.",
    href: "/services/ai-ml/deep-learning"
  },
  { 
    icon: Shield, 
    title: "Healthcare AI & Biomedical Systems", 
    description: "Specialized AI for medical imaging, disease prediction, drug discovery, genomics analysis, and clinical decision support systems with regulatory compliance focus.",
    href: "/services/ai-ml/healthcare-ai"
  },
  { 
    icon: Target, 
    title: "Cybersecurity, Fraud Detection & Data Science", 
    description: "AI-powered fraud detection, anomaly detection, threat intelligence, and advanced data science solutions to secure systems and extract actionable insights from complex data.",
    href: "/services/ai-ml/cybersecurity-fraud-detection"
  },
];

const steps = [
  { step: "01", title: "Problem Definition", description: "We understand your research problem, dataset, and target outcomes to frame it as a well-defined AI task with measurable goals." },
  { step: "02", title: "Data Preparation", description: "Clean, preprocess, and engineer features from your dataset to maximize model performance, reproducibility, and reliability." },
  { step: "03", title: "Model Building & Training", description: "Develop, train, and iterate on appropriate AI architectures with rigorous experimentation, validation, and tracking." },
  { step: "04", title: "Evaluation & Delivery", description: "Evaluate against benchmarks, optimize hyperparameters, and deliver the model with full documentation and code walkthrough." },
];

const benefits = [
  "Expert researchers in Computer Vision & NLP",
  "Deep Learning & Transformer model specialists",
  "Healthcare AI and Biomedical domain expertise",
  "Cybersecurity & Fraud Detection solutions",
  "TensorFlow, PyTorch, OpenCV & Hugging Face expertise",
  "Custom architecture design for your specific use case",
  "Hyperparameter tuning & model optimization",
  "Reproducible experiments and clean codebases",
  "GPU-accelerated training support",
  "Publication-ready results and visualizations",
  "Post-delivery support and consultations"
];

export default function ServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Artificial Intelligence, Machine Learning & Deep Learning</p>
                <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">AI, Machine Learning & DL Research Support</h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">From Computer Vision and Natural Language Processing to Healthcare AI, Cybersecurity, and advanced Deep Learning : we deliver specialized AI systems tailored to your research and business needs.</p>
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
                      <Brain className="h-12 w-12" />
                      <div>
                        <p className="text-3xl font-bold">500+</p>
                        <p className="text-sm text-primary-foreground/80">AI Projects Delivered</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">25+</p>
                      <p className="text-sm text-muted-foreground">AI Specializations</p>
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
                { icon: Users, text: "Domain Experts" },
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
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our AI Specializations</h2>
              <p className="mt-4 text-lg text-muted-foreground">Click on any service below to explore detailed offerings</p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
  <Link key={i} href={f.href} className="block group">
    <Card className="relative overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 h-full group-hover:-translate-y-1">
      
      {/* Background Image - Full Visibility */}
      <div className="absolute inset-0 z-0">
        <img 
          src={f.image} 
          alt={f.title}
          className="h-full w-full object-cover transition-transform duration-700 scale-105"
        />
        {/* Soft Gradient Overlay: Dark only at the bottom, clear at the top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>

      {/* Content Container - Pushed to the bottom */}
      <CardContent className="relative z-10 p-6 flex flex-col h-full justify-end min-h-[300px]">
        {/* Icon with a subtle backdrop blur */}
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-white/20 backdrop-blur-md border border-white/30">
          <f.icon className="h-5 w-5 text-white" />
        </div>
        
        {/* Text with subtle shadow for legibility */}
        <h3 className="text-xl font-bold text-white drop-shadow-md">
          {f.title}
        </h3>
        <p className="mt-2 text-sm text-gray-100/90 drop-shadow-sm">
          {f.description}
        </p>
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
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our AI Development Process</h2>
              <p className="mt-4 text-lg text-muted-foreground">A structured, research-grade workflow from problem definition to model delivery with full knowledge transfer.</p>
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
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Choose Our AI Solutions?</h2>
                <p className="mt-4 text-lg text-muted-foreground">We deliver production-ready, research-grade AI systems across multiple domains with complete reproducibility and documentation.</p>
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
                  <h3 className="text-xl font-semibold text-foreground">Get a Free AI Project Estimate</h3>
                  <p className="mt-2 text-muted-foreground">Share your requirements and receive a detailed proposal within 24 hours.</p>
                  <form className="mt-6 space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    <input type="email" placeholder="Email Address" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    <input type="tel" placeholder="Phone Number" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    <select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                      <option value="">Select AI Specialization</option>
                      <option value="computer-vision">Computer Vision</option>
                      <option value="nlp">Natural Language Processing (NLP)</option>
                      <option value="image-processing">Image Processing</option>
                      <option value="deep-learning">Deep Learning</option>
                      <option value="healthcare-ai">Healthcare AI & Biomedical</option>
                      <option value="cybersecurity">Cybersecurity & Fraud Detection</option>
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
            <h2 className="font-serif text-3xl font-bold text-black sm:text-4xl">Ready to Build Your AI Solution?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">From Computer Vision and NLP to Healthcare AI and Cybersecurity : our experts deliver cutting-edge AI systems tailored to your needs.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary" asChild>
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