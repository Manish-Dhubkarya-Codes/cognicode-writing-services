import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Image as ImageIcon, Layers, Zap, Eye, GitBranch, FileText, Palette } from "lucide-react";

export const metadata: Metadata = {
  title: "Image Processing & Analysis | CogniCode",
  description: "Expert image processing and analysis for PhD research. Advanced enhancement, segmentation, feature extraction, morphological operations, and pattern recognition using OpenCV, scikit-image, and deep learning.",
};

const techniques = [
  { title: "Image Enhancement & Restoration", desc: "Contrast adjustment, noise reduction, histogram equalization, sharpening, and inpainting" },
  { title: "Segmentation & Edge Detection", desc: "Thresholding, watershed, region growing, Canny, Sobel, and semantic segmentation" },
  { title: "Feature Extraction & Description", desc: "SIFT, SURF, ORB, HOG, LBP, and deep feature extraction using CNNs" },
  { title: "Morphological Operations & Filtering", desc: "Erosion, dilation, opening, closing, custom kernels, and frequency-domain filtering" },
];

const deliverables = [
  "Fully reproducible Python scripts and Jupyter notebooks",
  "Processed image datasets with before/after comparisons",
  "Detailed methodology chapter ready for thesis submission",
  "Publication-ready visualizations, heatmaps, and statistical tables",
  "Feature extraction pipelines with performance benchmarks",
  "Git repository with clean, commented, and version-controlled code",
  "LaTeX-ready figures and supplementary material",
  "One-to-one training session + 6 months of free support & updates",
];

const steps = [
  {
    step: "01",
    title: "Image Assessment & Preprocessing",
    desc: "Analyze image quality, noise levels, and characteristics. Apply enhancement, normalization, and artifact removal techniques.",
    icon: Palette,
  },
  {
    step: "02",
    title: "Advanced Processing Pipeline",
    desc: "Build custom pipelines for segmentation, feature extraction, filtering, and morphological operations using OpenCV and scikit-image.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Feature Engineering & Analysis",
    desc: "Extract meaningful features and perform pattern recognition with classical and deep learning approaches.",
    icon: Eye,
  },
  {
    step: "04",
    title: "Validation & Academic Delivery",
    desc: "Rigorous quantitative evaluation, visualization, and complete documentation for thesis and journal publication.",
    icon: FileText,
  },
];

const benefits = [
  "PhD-level computer vision researchers with extensive publication record",
  "Expertise in OpenCV, scikit-image, PIL, Mahotas, and deep learning frameworks",
  "Custom solutions for medical, satellite, microscopy, and industrial images",
  "100% reproducible and well-documented pipelines",
  "Support for DICOM, NIfTI, and other scientific image formats",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your supervisor or journal approves",
  "Lifetime access to code and future improvements",
];

export default function ImageProcessingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-4 py-2 text-sm font-medium text-blue-700 mb-6">
                  <ImageIcon className="h-4 w-4" />
                  IMAGE PROCESSING &amp; ANALYSIS
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Image Processing &amp; Analysis
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Advanced classical and modern image processing solutions for PhD research — from enhancement to feature extraction with full reproducibility and publication support.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Image Processing Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Image Processing Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between mb-8">
                      <Palette className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">PSNR</p>
                        <p className="text-sm opacity-75">38.7 dB</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-cyan-200">
{`img = cv2.imread("input.jpg")
enhanced = cv2.equalizeHist(cv2.cvtColor(img, cv2.COLOR_BGR2GRAY))`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">Processed • Analyzed • Documented • Ready for thesis &amp; publication</p>
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
              <h2 className="font-serif text-4xl font-bold">Image Processing Techniques We Master</h2>
              <p className="mt-3 text-muted-foreground">Classical and modern methods tailored to your research domain</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Image Processing Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Research-grade pipeline for reproducible and publication-ready results</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete academic-ready package for thesis and journal submission.</p>
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
                            <p className="text-sm text-muted-foreground">Full code + environment setup</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis Chapter Ready</p>
                            <p className="text-sm text-muted-foreground">Methodology + results section</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Before/After Visuals</p>
                            <p className="text-sm text-muted-foreground">High-quality comparison figures</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Support</p>
                            <p className="text-sm text-muted-foreground">LaTeX-ready figures &amp; tables</p>
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
                  <p className="text-muted-foreground mb-6">Share your image dataset and research goals — receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your image processing requirements (dataset type, goal, current challenges)" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready to Transform Your Images into Insights?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From raw pixels to publication-ready analysis — we deliver research-grade image processing solutions.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Image Processing Project</Link>
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