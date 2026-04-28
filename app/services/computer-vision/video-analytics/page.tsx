import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Video, Play, Activity, Zap, Eye, GitBranch, FileText, Film } from "lucide-react";

export const metadata: Metadata = {
  title: "Video Analytics | CogniCode",
  description: "Expert video analytics and understanding for PhD research. Action recognition, activity detection, motion analysis, and surveillance systems using 3D CNNs, SlowFast, Video Transformers, and temporal models.",
};

const applications = [
  { title: "Action Recognition", desc: "Human activity recognition, gesture detection, and behavior analysis in videos" },
  { title: "Video Object Tracking", desc: "Multi-object tracking (SORT, DeepSORT, ByteTrack) across frames with real-time performance" },
  { title: "Motion & Anomaly Detection", desc: "Abnormal event detection, crowd analysis, and motion pattern recognition" },
  { title: "Temporal Video Understanding", desc: "Video captioning, event localization, and long-term video comprehension using transformers" },
];

const deliverables = [
  "Fully trained video understanding models with inference pipelines",
  "Real-time or batch video processing systems (YOLO + tracking, 3D CNNs, etc.)",
  "Action classification reports with temporal accuracy metrics",
  "Interactive video visualization dashboards with annotations",
  "Detailed methodology chapter ready for thesis and journal submission",
  "Git repository with reproducible training and evaluation code",
  "Publication-ready figures, confusion matrices, and temporal analysis",
  "One-to-one training session + 6 months of free model fine-tuning support",
];

const steps = [
  {
    step: "01",
    title: "Video Data Assessment",
    desc: "Analyze video characteristics, frame rate, resolution, and define action classes or detection requirements.",
    icon: Film,
  },
  {
    step: "02",
    title: "Preprocessing & Annotation",
    desc: "Frame extraction, temporal augmentation, keyframe selection, and precise temporal annotation.",
    icon: Activity,
  },
  {
    step: "03",
    title: "Model Development",
    desc: "Build and train 3D CNNs, SlowFast, Video Transformers, or hybrid architectures for video understanding.",
    icon: Play,
  },
  {
    step: "04",
    title: "Evaluation & Deployment",
    desc: "Benchmark with mAP, accuracy, FPS; deliver real-time pipeline with full academic documentation.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level video analytics researchers with publications in CVPR, ICCV, and ECCV",
  "Expertise in 3D CNNs, SlowFast, TimeSformer, and Video Transformers",
  "Real-time video processing pipelines for surveillance and industrial use",
  "Support for multi-camera systems and long-duration video analysis",
  "100% reproducible and well-documented codebases",
  "Confidentiality and ethical research standards guaranteed",
  "Free revisions until your thesis committee approves",
  "Lifetime access to model updates and improvements",
];

export default function VideoAnalyticsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero - Video Theme */}
        <section className="bg-gradient-to-br from-red-50 via-orange-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-4 py-2 text-sm font-medium text-red-700 mb-6">
                  <Video className="h-4 w-4" />
                  VIDEO ANALYTICS
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Video Analytics &amp;<br />Understanding
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Advanced video analytics solutions for action recognition, activity detection, motion analysis, and surveillance using state-of-the-art 3D CNNs and temporal models.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Video Analytics Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Video Analytics Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-red-600 to-orange-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Play className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">94.8%</p>
                        <p className="text-sm opacity-75">Action Accuracy</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-orange-200">
{`results = model.predict(
    source="surveillance.mp4",
    conf=0.4
)`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">SlowFast • 3D CNN • Real-time • Ready for thesis &amp; publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Video Analytics Applications We Deliver</h2>
              <p className="mt-3 text-muted-foreground">From action recognition to intelligent surveillance systems</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {applications.map((app, i) => (
                <Card key={i} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="font-semibold text-xl mb-3">{app.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{app.desc}</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Video Analytics Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Research-grade pipeline for temporal video understanding</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, publication-ready video analytics solution.</p>
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
                            <p className="font-semibold">Reproducible Video Pipeline</p>
                            <p className="text-sm text-muted-foreground">Full code + temporal tracking</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Report</p>
                            <p className="text-sm text-muted-foreground">Methodology + temporal results</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Action Visualizations</p>
                            <p className="text-sm text-muted-foreground">Annotated video outputs &amp; timelines</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Publication Support</p>
                            <p className="text-sm text-muted-foreground">Accuracy tables &amp; PR curves</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Choose Our Video Analytics Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Video Analytics Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your video dataset and research objectives — receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your video analytics requirements (surveillance, action recognition, etc.)" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready to Unlock Insights from Video?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From real-time action recognition to intelligent video surveillance — we deliver cutting-edge video analytics for your research.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Video Analytics Project</Link>
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