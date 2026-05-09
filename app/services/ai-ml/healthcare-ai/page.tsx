import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Heart, Microscope, Activity, Brain, Zap, Sparkles, GitBranch, FileText, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Healthcare AI & Biomedical Systems | Medical Imaging & Clinical AI",
  description: "Expert Healthcare AI solutions for brain tumor detection, lung disease prediction, glaucoma, skin lesions, heart disease, diabetes, and smart health monitoring using deep learning.",
};

const techniques = [
  { 
    title: "Brain Tumor Detection (ML & DL)", 
    desc: "Advanced MRI-based brain tumor detection and segmentation using CNNs, U-Net, and hybrid machine learning + deep learning approaches.",
    img: "/data-driven-services/ai-ml/healthcare-ai/brain-tumor-detection.png"
  },
  { 
    title: "MRI Tumor Detection (Wavelet + SVM)", 
    desc: "Hybrid wavelet transform and SVM models for accurate brain tumor classification from MRI scans.",
    img: "/data-driven-services/ai-ml/healthcare-ai/mri-tumor-detection.png"
  },
  { 
    title: "Fuzzy + SVM Tumor Detection", 
    desc: "Fuzzy logic combined with Support Vector Machines for improved tumor boundary detection and classification.",
    img: "/data-driven-services/ai-ml/healthcare-ai/fuzzy-svm-tumor-detection.png"
  },
  { 
    title: "Lung Severity Prediction", 
    desc: "Deep learning models for assessing lung disease severity from CT scans and X-rays (COVID-19, pneumonia, etc.).",
    img: "/data-driven-services/ai-ml/healthcare-ai/lung-severity-prediction.png"
  },
  { 
    title: "Glaucoma Detection", 
    desc: "AI-powered early glaucoma detection from retinal fundus images using CNNs and optic disc/cup segmentation.",
    img: "/data-driven-services/ai-ml/healthcare-ai/glaucoma-detection.png"
  },
  { 
    title: "Skin Lesion Classification", 
    desc: "Melanoma and skin cancer detection using deep convolutional networks on dermoscopy images (HAM10000, ISIC dataset).",
    img: "/data-driven-services/ai-ml/healthcare-ai/skin-lesion-classification.png"
  },
  { 
    title: "Heart Disease Prediction", 
    desc: "Multimodal predictive models for cardiovascular disease risk assessment using clinical and imaging data.",
    img: "/data-driven-services/ai-ml/healthcare-ai/heart-disease-prediction.png"
  },
  { 
    title: "Diabetes Prediction", 
    desc: "Machine learning and deep learning models for early diabetes prediction and complication risk assessment.",
    img: "/data-driven-services/ai-ml/healthcare-ai/diabetes-prediction.png"
  },
  { 
    title: "Lung Cancer Risk Prediction", 
    desc: "Low-dose CT-based lung cancer screening and risk prediction using advanced deep learning architectures.",
    img: "/data-driven-services/ai-ml/healthcare-ai/lung-cancer-risk-prediction.png"
  },
  { 
    title: "Smart Healthcare Monitoring (IoT + AI)", 
    desc: "Real-time patient monitoring systems combining wearable IoT devices with AI for anomaly detection and predictive alerts.",
    img: "/data-driven-services/ai-ml/healthcare-ai/smart-healthcare-monitoring.png"
  },
];

const deliverables = [
  "Fully trained, validated, and explainable Healthcare AI model",
  "Complete source code with HIPAA/GDPR-compliant documentation",
  "Automated inference pipeline with audit logs and version control",
  "Comprehensive validation report including clinical metrics (Sensitivity, Specificity, AUC)",
  "Model explainability visualizations (SHAP, Grad-CAM)",
  "Git repository with reproducible experiments and secure code",
  "Interactive demo dashboard (Streamlit/Gradio) for clinicians",
  "One-to-one training session + 6 months of free model updates & support",
];

const steps = [
  {
    step: "01",
    title: "Clinical Requirement Analysis",
    desc: "Understand medical problem, regulatory needs, and define success metrics with domain experts.",
    icon: Stethoscope,
  },
  {
    step: "02",
    title: "Data Curation & Annotation",
    desc: "Secure handling of medical data, annotation support, and privacy-preserving preprocessing.",
    icon: Microscope,
  },
  {
    step: "03",
    title: "Model Development",
    desc: "Custom architecture design, transfer learning from medical foundation models, and rigorous training.",
    icon: Brain,
  },
  {
    step: "04",
    title: "Validation & Deployment",
    desc: "Clinical validation, explainability, regulatory documentation, and secure deployment.",
    icon: Zap,
  },
];

const benefits = [
  "PhD-level Healthcare AI researchers with clinical domain expertise",
  "Experience with HIPAA, GDPR, FDA, and CE regulatory compliance",
  "Expertise in PyTorch, TensorFlow, MONAI, and Hugging Face",
  "Explainable AI (XAI) for clinical trust and adoption",
  "Support for multimodal medical data (imaging + EHR + genomics)",
  "Publication-ready results for high-impact journals",
  "100% reproducible and auditable workflows",
  "Free revisions until clinical/supervisor approval",
];

export default function HealthcareAIPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero - unchanged */}
        <section className="bg-gradient-to-br from-teal-50 via-cyan-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-600/10 px-4 py-2 text-sm font-medium text-teal-700 mb-6">
                  <Heart className="h-4 w-4" />
                  HEALTHCARE AI
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Healthcare AI &<br />Biomedical Systems
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Specialized AI solutions for medical imaging, tumor detection, disease prediction, and smart healthcare monitoring. 
                  Improving patient outcomes with accurate and explainable AI.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Healthcare AI Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Healthcare Samples</Link>
                  </Button>
                </div>
              </div>

              {/* Unique Hero Card for Healthcare AI - unchanged */}
              <div className="relative">
                <Card className="bg-gradient-to-br from-teal-700 via-cyan-700 to-emerald-700 text-white shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/10 rounded-2xl">
                          <Activity className="h-10 w-10" />
                        </div>
                        <div>
                          <p className="text-sm opacity-75">Clinical Accuracy</p>
                          <p className="text-5xl font-bold tracking-tighter">94.7%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-2xl p-6 mb-6 font-mono text-sm">
                      <div className="text-cyan-300 mb-2">MONAI Medical Model</div>
                      <pre className="text-white/90 text-xs leading-relaxed overflow-auto">
{`model = monai.networks.nets.UNet(
    spatial_dims=3,
    in_channels=1,
    out_channels=2,
    channels=(16, 32, 64, 128, 256),
    strides=(2, 2, 2, 2)
)`}
                      </pre>
                    </div>

                    <div className="flex items-center justify-between text-sm opacity-90">
                      <div>MONAI • PyTorch • DICOM • HIPAA Ready</div>
                      <div className="text-cyan-300 font-medium">Clinically Validated</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* === FUTURISTIC HIGH-TECH CARDS (Same design as CV, NLP, Image Processing, Deep Learning) === */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Healthcare AI & Biomedical Projects We Deliver</h2>
              <p className="mt-3 text-muted-foreground">Specialized in medical imaging, disease prediction & clinical AI</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techniques.map((tech, i) => {
                // High-Tech "Lab" Color Palettes (same as all other service pages)
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
                    className={`group relative ${theme.bg} border border-gray-200 ${theme.border} ${theme.glow} rounded-none p-6 cursor-pointer transition-all duration-300 overflow-hidden font-sans`}
                  >
                    {/* 1. FUTURISTIC UI ACCENTS */}
                    {/* Top Left Tech Corner */}
                    <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 group-hover:border-transparent transition-colors duration-300 m-2`} />
                    <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:${theme.border.replace('hover:', '')} transition-colors duration-300 m-2`} />
                    
                    {/* Animated Data Bar on the left */}
                    <div className={`absolute left-0 top-0 w-1 h-0 ${theme.bar} group-hover:h-full transition-all duration-500 ease-out`} />

                    {/* 2. TEXT SECTION */}
                    <div className="relative z-10 flex flex-col gap-2 pl-4">
                      {/* Tech Subheading/Index */}
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

                    {/* 3. VERTICAL UNFOLD ANIMATION WITH IMAGE */}
                    <div className="pl-4 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out mt-0 group-hover:mt-5">
                      <div className="overflow-hidden relative bg-gray-900 group-hover:bg-transparent transition-colors duration-500">
                        {tech.img?
                        <img
                          src={tech.img}
                          alt={tech.title}
                          className="w-full h-auto object-cover origin-top scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-500 ease-out"
                        />:
                        <Heart className="w-full h-52 text-gray-700 opacity-50" />}

                        {/* Futuristic Overlays */}
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

        {/* Process, Deliverables, Why Choose Us, Final CTA - unchanged */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-serif text-4xl font-bold">Our Healthcare AI Development Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Compliant, ethical, and clinically validated process</p>
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

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-4xl font-bold">Everything You Receive</h2>
                <p className="mt-4 text-lg text-muted-foreground">Complete, regulatory-ready healthcare AI solution.</p>
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
                            <p className="font-semibold">Secure Pipeline</p>
                            <p className="text-sm text-muted-foreground">HIPAA/GDPR compliant</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Clinical Documentation</p>
                            <p className="text-sm text-muted-foreground">Ready for trials & publication</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Brain className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Explainable AI</p>
                            <p className="text-sm text-muted-foreground">SHAP & Grad-CAM reports</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Clinical Metrics</p>
                            <p className="text-sm text-muted-foreground">AUC, Sensitivity, Specificity</p>
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

        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl font-bold">Why Healthcare Organizations & Researchers Choose Us</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Healthcare AI Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your clinical challenge or dataset — receive a detailed technical & regulatory proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University / Hospital Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your healthcare AI project (e.g., tumor detection, disease prediction, medical imaging) and key requirements" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <Button className="w-full h-14 text-base" size="lg">Request Detailed Proposal</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">Ready to Transform Healthcare with AI?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From research to clinical deployment — we deliver accurate, ethical, and impactful biomedical AI solutions.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Healthcare AI Project</Link>
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