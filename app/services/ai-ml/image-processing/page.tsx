import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Image, Palette, Filter, Zap, Sparkles, GitBranch, FileText, Eye, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Image Processing Services | Enhancement, Restoration & Analysis",
  description: "Expert Image Processing solutions using OpenCV, Pillow, scikit-image, and Deep Learning. Medical imaging, fingerprint enhancement, X-ray processing, and automated pipelines.",
};

const techniques = [
  { 
    title: "Tissue Image Segmentation using DL", 
    desc: "Advanced deep learning-based semantic segmentation for histopathological tissue images using U-Net, DeepLab, and custom architectures." 
  },
  { 
    title: "X-ray Image Enhancement", 
    desc: "Contrast enhancement, noise reduction, edge sharpening, and artifact removal for medical X-ray and radiographic images." 
  },
  { 
    title: "Latent Fingerprint Enhancement", 
    desc: "Advanced techniques for enhancing poor-quality latent fingerprints using Gabor filters, frequency domain processing, and deep learning." 
  },
  { 
    title: "Feature Extraction from Fingerprints", 
    desc: "Robust minutiae extraction, ridge orientation, singular point detection, and quality assessment for biometric systems." 
  },
  { 
    title: "Fingerprint Matching (Latent-to-Rolled)", 
    desc: "High-accuracy latent fingerprint matching against rolled/print databases using deep learning and traditional algorithms." 
  },
  { 
    title: "CNN Benchmarking for Fingerprints", 
    desc: "Comprehensive benchmarking of CNN architectures for fingerprint classification, enhancement, and recognition tasks." 
  },
];

const deliverables = [
  "Fully optimized and documented image processing pipeline",
  "Clean, reproducible Python code with OpenCV & Deep Learning models",
  "Automated batch processing scripts and API endpoints",
  "Before/after comparison reports with quality metrics",
  "High-resolution processed images and visualization dashboards",
  "Git repository with version-controlled, well-documented code",
  "Interactive Streamlit/Gradio demo for easy testing",
  "One-to-one training session + 6 months of free support & updates",
];

const steps = [
  {
    step: "01",
    title: "Image Quality Assessment",
    desc: "Analyze dataset, identify issues like noise, blur, lighting, and define processing goals.",
    icon: Eye,
  },
  {
    step: "02",
    title: "Preprocessing & Cleaning",
    desc: "Denoising, contrast enhancement, color correction, and artifact removal.",
    icon: RefreshCw,
  },
  {
    step: "03",
    title: "Advanced Processing",
    desc: "Feature extraction, segmentation, super-resolution, and custom transformations.",
    icon: Palette,
  },
  {
    step: "04",
    title: "Automation & Delivery",
    desc: "Build scalable pipeline, validate results, and deliver production-ready solution.",
    icon: Zap,
  },
];

const benefits = [
  "PhD-level image processing experts with 10+ years experience",
  "Deep expertise in OpenCV, scikit-image, Pillow & Deep Learning",
  "Custom solutions for medical, biometric, and forensic images",
  "High-performance pipelines for large-scale batch processing",
  "Publication-ready visualizations and methodology documentation",
  "100% reproducible and scalable workflows",
  "Support for real-time and edge device deployment",
  "Free revisions until your supervisor or client approves",
];

export default function ImageProcessingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero - Unique Design */}
        <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-orange-600/10 px-4 py-2 text-sm font-medium text-orange-700 mb-6">
                  <Image className="h-4 w-4" />
                  IMAGE PROCESSING
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Professional Image<br />Processing
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Transform low-quality, noisy, or raw images into clear, analysis-ready visuals. 
                  Specialized in medical imaging, fingerprint enhancement, and forensic applications.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Image Processing Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Image Samples</Link>
                  </Button>
                </div>
              </div>

              {/* Unique Hero Card */}
              <div className="relative">
                <Card className="bg-gradient-to-br from-orange-700 via-amber-700 to-red-700 text-white shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/10 rounded-2xl">
                          <Palette className="h-10 w-10" />
                        </div>
                        <div>
                          <p className="text-sm opacity-75">Quality Improvement</p>
                          <p className="text-5xl font-bold tracking-tighter">4.8x</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-2xl p-6 mb-6 font-mono text-sm">
                      <div className="text-amber-300 mb-2">OpenCV Pipeline</div>
                      <pre className="text-white/90 text-xs leading-relaxed overflow-auto">
{`img = cv2.imread("input.jpg")
enhanced = cv2.fastNlMeansDenoisingColored(img)
clahe = cv2.createCLAHE()
result = clahe.apply(cv2.cvtColor(enhanced, cv2.COLOR_BGR2GRAY))`}
                      </pre>
                    </div>

                    <div className="flex items-center justify-between text-sm opacity-90">
                      <div>OpenCV • Pillow • scikit-image • Deep Learning</div>
                      <div className="text-amber-300 font-medium">Batch Ready</div>
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
              <h2 className="font-serif text-4xl font-bold">Image Processing Techniques We Master</h2>
              <p className="mt-3 text-muted-foreground">Specialized in medical, biometric & forensic imaging</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Image Processing Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Systematic, reproducible, and production-ready process</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, ready-to-use image processing solution.</p>
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
                            <p className="font-semibold">Automated Pipeline</p>
                            <p className="text-sm text-muted-foreground">Batch + Real-time ready</p>
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
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Visual Reports</p>
                            <p className="text-sm text-muted-foreground">Before vs After analysis</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Performance Metrics</p>
                            <p className="text-sm text-muted-foreground">PSNR, SSIM, MSE</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our Image Processing Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Image Processing Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your images and requirements — receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University / Company Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your image dataset, challenges (noise, blur, low resolution, etc.), and goals" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready to Transform Your Images?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From raw noisy images to publication-quality visuals — we deliver fast, accurate, and scalable image processing solutions.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Image Processing Project</Link>
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