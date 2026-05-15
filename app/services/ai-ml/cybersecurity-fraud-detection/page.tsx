'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Lock, AlertTriangle, Radar, Zap, Sparkles, GitBranch, FileText, Eye, Database, TrendingUp, ZoomIn, X } from "lucide-react";

const fraudSecurity = [
  { 
    title: "Credit Card Fraud Detection", 
    desc: "Real-time fraud prevention in financial transactions using ensemble models, autoencoders, and graph neural networks.",
    img: "/data-driven-services/ai-ml/cyber-security-ds/credit-card-fraud.png" 
  },
  { 
    title: "Healthcare Fraud Detection", 
    desc: "Detection of fraudulent claims, billing anomalies, and suspicious patterns in healthcare and insurance data.",
    img: "/data-driven-services/ai-ml/cyber-security-ds/healthcare-fraud.png" 
  },
  { 
    title: "Authorship Verification (Account Hijacking)", 
    desc: "Stylometric and behavioral analysis to detect account takeovers and impersonation.",
    img: "/data-driven-services/ai-ml/cyber-security-ds/authorship-verification.png" 
  },
  { 
    title: "Crime Detection using ML", 
    desc: "Predictive crime analysis and pattern recognition using machine learning on spatiotemporal data.",
    img: "/data-driven-services/ai-ml/cyber-security-ds/crime-detection.png" 
  },
];

const cybersecurity = [
  { 
    title: "Anomaly Traffic Detection", 
    desc: "Network traffic anomaly detection for identifying intrusions and unusual behavior in real-time.",
    img: "/data-driven-services/ai-ml/cyber-security-ds/anomaly-traffic-detection.png" 
  },
  { 
    title: "DDoS Detection", 
    desc: "Advanced deep learning models for early detection and mitigation of Distributed Denial of Service attacks.",
    img: "/data-driven-services/ai-ml/cyber-security-ds/ddos-detection.png" 
  },
  { 
    title: "AI-based Cyber Defense Systems", 
    desc: "Autonomous cyber defense platforms using reinforcement learning and adaptive threat response.",
    img: "/data-driven-services/ai-ml/cyber-security-ds/ai-cyber-defense.png" 
  },
  { 
    title: "Threat Intelligence using ML/DL", 
    desc: "Automated threat intelligence, malware classification, and zero-day attack prediction.",
    img: "/data-driven-services/ai-ml/cyber-security-ds/threat-intelligence.png" 
  },
];

const predictiveAnalytics = [
  { 
    title: "Software Defect Prediction", 
    desc: "Machine learning models to predict defective modules and optimize software testing efforts.",
    img: "/data-driven-services/ai-ml/cyber-security-ds/software-defect-prediction.png" 
  },
  { 
    title: "Air Pollution Forecasting", 
    desc: "Spatiotemporal deep learning models for accurate air quality and pollution level prediction.",
    img: "/data-driven-services/ai-ml/cyber-security-ds/air-pollution-forecasting.png" 
  },
];

const deliverables = [
  "Fully trained, validated, and production-ready security AI model",
  "Complete source code with detailed documentation and security audit",
  "Real-time inference pipeline with low-latency API and monitoring",
  "Comprehensive performance and security evaluation report",
  "Explainability reports and false-positive analysis",
  "Git repository with version-controlled, secure, and reproducible code",
  "Interactive dashboard for monitoring and alerts",
  "One-to-one training session + 6 months of free model updates",
];

const steps = [
  {
    step: "01",
    title: "Security Assessment",
    desc: "Understand threats, data landscape, compliance requirements, and define detection goals.",
    icon: Shield,
  },
  {
    step: "02",
    title: "Data Exploration & Engineering",
    desc: "Secure data processing, feature engineering, and creation of robust training datasets.",
    icon: Database,
  },
  {
    step: "03",
    title: "Model Development",
    desc: "Build and train advanced anomaly detection, classification, and behavioral models.",
    icon: Radar,
  },
  {
    step: "04",
    title: "Deployment & Monitoring",
    desc: "Secure deployment, real-time monitoring, alerting systems, and continuous model improvement.",
    icon: Zap,
  },
];

const benefits = [
  "PhD-level cybersecurity and data science experts",
  "Expertise in PyTorch, TensorFlow, Scikit-learn, and Spark",
  "Experience with banking, fintech, healthcare, and enterprise security",
  "Focus on low false-positive rates and high precision",
  "Regulatory compliance (GDPR, PCI-DSS, ISO 27001)",
  "Real-time capable and scalable solutions",
  "Publication-ready research and detailed methodology",
  "Free revisions until client or auditor approval",
];

export default function CybersecurityFraudDetectionPage() {
  const [selectedImage, setSelectedImage] = useState<{img: string; title: string} | null>(null);

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
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-background py-20 md:py-28 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 mb-6">
                  <Shield className="h-4 w-4" />
                  CYBERSECURITY & FRAUD DETECTION
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Cybersecurity, Fraud<br />Detection & Data Science
                </h1>
                <p className="mt-6 text-xl text-slate-300 max-w-lg">
                  AI-powered defense systems for fraud prevention, threat detection, 
                  and intelligent security analytics. Protect assets with proactive, 
                  high-precision machine learning solutions.
                </p>
                <div className="mt-10 flex text-black flex-wrap gap-4">
                  <Button size="lg" asChild className="bg-blue-600 text-white">
                    <Link href="/contact">Start Security Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary hover:bg-primary hover:text-white" asChild>
                    <Link href="/samples">View Security Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-slate-800 via-blue-900 to-indigo-900 text-white shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/10 rounded-2xl">
                          <AlertTriangle className="h-10 w-10" />
                        </div>
                        <div>
                          <p className="text-sm opacity-75">Fraud Detection Rate</p>
                          <p className="text-5xl font-bold tracking-tighter">99.2%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-6 mb-6 font-mono text-sm">
                      <div className="text-blue-400 mb-2">Anomaly Detection Model</div>
                      <pre className="text-white/90 text-xs leading-relaxed overflow-auto">
{`iso_forest = IsolationForest(
    contamination=0.01,
    random_state=42
)
anomalies = iso_forest.fit_predict(transaction_data)`}
                      </pre>
                    </div>

                    <div className="flex items-center justify-between text-sm opacity-90">
                      <div>Isolation Forest • GNN • Autoencoders • Spark</div>
                      <div className="text-emerald-400 font-medium">Real-time Ready</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Our Cybersecurity & Data Science Solutions</h2>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Lock className="h-6 w-6 text-red-600" /> Fraud & Security
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {fraudSecurity.map((tech, i) => {
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
                      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 group-hover:border-transparent transition-colors duration-300 m-2`} />
                      <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:${theme.border.replace('hover:', '')} transition-colors duration-300 m-2`} />
                      <div className={`absolute left-0 top-0 w-1 h-0 ${theme.bar} group-hover:h-full transition-all duration-500 ease-out`} />

                      <div className="relative z-10 flex flex-col gap-2 pl-4">
                        <span className={`text-[10px] font-mono font-bold tracking-[0.2em] ${theme.accent} uppercase`}>
                          SYS.MODULE_0{i + 1}
                        </span>
                        <h4 className="font-bold text-lg text-gray-800 tracking-tight group-hover:translate-x-2 transition-transform duration-300 ease-out">
                          {tech.title}
                        </h4>
                        <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                          {tech.desc}
                        </p>
                      </div>

                      <div className="pl-4 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out mt-0 group-hover:mt-5">
                        <div 
                          className="overflow-hidden relative bg-gray-900 group-hover:bg-transparent transition-colors duration-500 cursor-zoom-in"
                          onClick={() => tech.img && setSelectedImage({img: tech.img, title: tech.title})}
                        >
                          {tech.img ? (
                            <img
                              src={tech.img}
                              alt={tech.title}
                              className="w-full h-auto object-cover origin-top scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-500 ease-out"
                            />
                          ) : (
                            <Lock className="w-full h-52 text-gray-700 opacity-50" />
                          )}

                          {tech.img && (
                            <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedImage({img: tech.img, title: tech.title});
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

            <div className="mb-16">
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Shield className="h-6 w-6 text-blue-600" /> Cybersecurity
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cybersecurity.map((tech, i) => {
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
                      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 group-hover:border-transparent transition-colors duration-300 m-2`} />
                      <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:${theme.border.replace('hover:', '')} transition-colors duration-300 m-2`} />
                      <div className={`absolute left-0 top-0 w-1 h-0 ${theme.bar} group-hover:h-full transition-all duration-500 ease-out`} />

                      <div className="relative z-10 flex flex-col gap-2 pl-4">
                        <span className={`text-[10px] font-mono font-bold tracking-[0.2em] ${theme.accent} uppercase`}>
                          SYS.MODULE_0{i + 1}
                        </span>
                        <h4 className="font-bold text-lg text-gray-800 tracking-tight group-hover:translate-x-2 transition-transform duration-300 ease-out">
                          {tech.title}
                        </h4>
                        <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                          {tech.desc}
                        </p>
                      </div>

                      <div className="pl-4 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out mt-0 group-hover:mt-5">
                        <div 
                          className="overflow-hidden relative bg-gray-900 group-hover:bg-transparent transition-colors duration-500 cursor-zoom-in"
                          onClick={() => tech.img && setSelectedImage({img: tech.img, title: tech.title})}
                        >
                          {tech.img ? (
                            <img
                              src={tech.img}
                              alt={tech.title}
                              className="w-full h-auto object-cover origin-top scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-500 ease-out"
                            />
                          ) : (
                            <Lock className="w-full h-52 text-gray-700 opacity-50" />
                          )}

                          {tech.img && (
                            <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedImage({img: tech.img, title: tech.title});
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

            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-emerald-600" /> Predictive Analytics
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                {predictiveAnalytics.map((tech, i) => {
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
                      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 group-hover:border-transparent transition-colors duration-300 m-2`} />
                      <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:${theme.border.replace('hover:', '')} transition-colors duration-300 m-2`} />
                      <div className={`absolute left-0 top-0 w-1 h-0 ${theme.bar} group-hover:h-full transition-all duration-500 ease-out`} />

                      <div className="relative z-10 flex flex-col gap-2 pl-4">
                        <span className={`text-[10px] font-mono font-bold tracking-[0.2em] ${theme.accent} uppercase`}>
                          SYS.MODULE_0{i + 1}
                        </span>
                        <h4 className="font-bold text-lg text-gray-800 tracking-tight group-hover:translate-x-2 transition-transform duration-300 ease-out">
                          {tech.title}
                        </h4>
                        <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                          {tech.desc}
                        </p>
                      </div>

                      <div className="pl-4 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out mt-0 group-hover:mt-5">
                        <div 
                          className="overflow-hidden relative bg-gray-900 group-hover:bg-transparent transition-colors duration-500 cursor-zoom-in"
                          onClick={() => tech.img && setSelectedImage({img: tech.img, title: tech.title})}
                        >
                          {tech.img ? (
                            <img
                              src={tech.img}
                              alt={tech.title}
                              className="w-full h-auto object-cover origin-top scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100 transition-all duration-500 ease-out"
                            />
                          ) : (
                            <Lock className="w-full h-52 text-gray-700 opacity-50" />
                          )}

                          {tech.img && (
                            <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedImage({img: tech.img, title: tech.title});
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
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-serif text-4xl font-bold">Our Cybersecurity AI Workflow</h2>
              <p className="mt-4 text-lg text-muted-foreground">Secure, scalable, and production-grade development process</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Complete, secure, and production-ready solution.</p>
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
                            <p className="text-sm text-muted-foreground">Real-time + Scalable</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Compliance Ready</p>
                            <p className="text-sm text-muted-foreground">Audit & Regulatory docs</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Explainable Alerts</p>
                            <p className="text-sm text-muted-foreground">Low false positives</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Award className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Performance Metrics</p>
                            <p className="text-sm text-muted-foreground">Precision, Recall, F1</p>
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
                <h2 className="text-4xl font-bold">Why Organizations Choose Our Cybersecurity & Fraud AI Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Security AI Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your security challenges or dataset: receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="Company / Organization Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your project (fraud detection, threat intelligence, anomaly detection, etc.) and key requirements" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <Button className="w-full h-14 text-base" size="lg">Request Detailed Proposal</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">Ready to Strengthen Your Security Posture?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From fraud prevention to advanced threat detection: we deliver intelligent, proactive, and scalable cybersecurity solutions.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Security Project</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services/ai-ml">Back to AI & Machine Learning Services</Link>
              </Button>
            </div>
          </div>
        </section>

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
                src={selectedImage.img}
                alt={selectedImage.title}
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