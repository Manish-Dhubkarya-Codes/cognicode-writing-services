import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Stethoscope, ScanSearch, Microscope, Zap, Eye, GitBranch, FileText, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Medical Image Analysis | CogniCode",
  description: "Expert medical image analysis for PhD and clinical research. MRI, CT, X-ray, histopathology, and ultrasound segmentation & classification using U-Net, nnU-Net, and transformer-based models.",
};

const modalities = [
  { title: "MRI & CT Analysis", desc: "Brain tumor segmentation, organ volumetry, lesion detection, and multi-modal fusion" },
  { title: "X-ray & Radiography", desc: "Chest X-ray abnormality detection, fracture identification, and bone density analysis" },
  { title: "Histopathology & Microscopy", desc: "Cancer grading, cell segmentation, and digital pathology using whole-slide imaging" },
  { title: "Ultrasound & DICOM Support", desc: "Fetal imaging, cardiac analysis, and real-time ultrasound interpretation" },
];

const deliverables = [
  "Trained segmentation/classification models (U-Net, nnU-Net, TransUNet, etc.) with inference scripts",
  "DICOM-compatible pipelines with full metadata preservation",
  "Quantitative evaluation using Dice, IoU, Hausdorff Distance, Sensitivity, Specificity",
  "Radiomics feature extraction and statistical analysis reports",
  "Detailed methodology chapter ready for thesis and journal submission",
  "Git repository with reproducible training pipelines and experiment tracking",
  "Publication-ready figures, heatmaps, and comparative analysis tables",
  "One-to-one clinical interpretation session + 6 months of free model fine-tuning",
];

const steps = [
  {
    step: "01",
    title: "Medical Data Review",
    desc: "Analyze DICOM/medical datasets, ensure anonymization compliance, and define clinical objectives.",
    icon: Heart,
  },
  {
    step: "02",
    title: "Preprocessing & Annotation",
    desc: "Windowing, normalization, augmentation, and expert-grade annotation for medical-grade datasets.",
    icon: Microscope,
  },
  {
    step: "03",
    title: "Model Development",
    desc: "Build and train U-Net, nnU-Net, Swin-UNet, or transformer-based architectures with 3D/2D support.",
    icon: Stethoscope,
  },
  {
    step: "04",
    title: "Clinical Validation & Delivery",
    desc: "Rigorous clinical validation, explainability analysis, and complete academic/clinical documentation.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level medical imaging researchers with publications in Radiology, MICCAI, and IEEE TMI",
  "Expertise in MONAI, PyTorch, TensorFlow, and nnU-Net frameworks",
  "Full DICOM, NIfTI, and whole-slide imaging support",
  "HIPAA-compliant and ethically approved workflows",
  "Support for oncology, neurology, cardiology, and radiology research",
  "100% reproducible and clinically validated pipelines",
  "Free revisions until your thesis committee or journal approves",
  "Lifetime access to model updates and clinical support",
];

export default function MedicalImageAnalysisPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero - Medical Theme */}
        <section className="bg-gradient-to-br from-teal-50 via-cyan-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-600/10 px-4 py-2 text-sm font-medium text-teal-700 mb-6">
                  <Stethoscope className="h-4 w-4" />
                  MEDICAL IMAGE ANALYSIS
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Medical Image Analysis
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Advanced analysis of MRI, CT, X-ray, and histopathology images using U-Net, nnU-Net, and transformer-based models for precise tumor segmentation, disease classification, and clinical research.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Medical Imaging Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Medical Imaging Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Microscope className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">0.94</p>
                        <p className="text-sm opacity-75">Dice Score</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-teal-200">
{`model = monai.networks.nets.UNet(
    spatial_dims=3,
    in_channels=1,
    out_channels=2,
    ...
)`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">nnU-Net • Trained on clinical data • Ready for thesis &amp; publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Modalities */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Medical Imaging Modalities We Specialize In</h2>
              <p className="mt-3 text-muted-foreground">End-to-end analysis for clinical and research applications</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {modalities.map((mod, i) => (
                <Card key={i} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="font-semibold text-xl mb-3">{mod.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{mod.desc}</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Medical Image Analysis Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Clinically validated pipeline trusted by medical researchers</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, clinically validated package for thesis and journal publication.</p>
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
                            <p className="font-semibold">Reproducible Medical Pipeline</p>
                            <p className="text-sm text-muted-foreground">MONAI + DICOM ready</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis &amp; Journal Ready</p>
                            <p className="text-sm text-muted-foreground">Full methodology chapter</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Clinical Visualizations</p>
                            <p className="text-sm text-muted-foreground">Segmentation overlays &amp; heatmaps</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Clinical Validation</p>
                            <p className="text-sm text-muted-foreground">Dice, IoU, Hausdorff metrics</p>
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
                <h2 className="text-4xl font-bold">Why Medical Researchers Trust Us</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Medical Image Analysis Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your imaging modality and research goals — receive a detailed clinical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University / Hospital Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your medical imaging dataset and research objectives (MRI/CT/etc.)" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready for Precision Medical Image Analysis?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From tumor segmentation to disease classification — we deliver clinically validated, publication-ready medical imaging solutions.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Medical Imaging Project</Link>
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