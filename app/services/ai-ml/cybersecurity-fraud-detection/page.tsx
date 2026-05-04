import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Lock, AlertTriangle, Radar, Zap, Sparkles, GitBranch, FileText, Eye, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Cybersecurity, Fraud Detection & Data Science | AI Security Solutions",
  description: "Expert AI-powered Cybersecurity, Fraud Detection, Anomaly Detection, and Advanced Data Science solutions. Threat intelligence, behavioral analytics, and secure ML systems.",
};

const techniques = [
  { 
    title: "Fraud Detection & Anomaly Detection", 
    desc: "Real-time fraud prevention using isolation forests, autoencoders, graph neural networks, and ensemble models for transaction and user behavior monitoring." 
  },
  { 
    title: "Intrusion Detection & Threat Intelligence", 
    desc: "Network intrusion detection systems (NIDS), malware classification, zero-day attack detection, and automated threat intelligence platforms." 
  },
  { 
    title: "Behavioral Analytics & User Risk Scoring", 
    desc: "Advanced UEBA (User and Entity Behavior Analytics) using deep learning and time-series analysis to detect insider threats and account takeovers." 
  },
  { 
    title: "Secure Data Science & Privacy-Preserving ML", 
    desc: "Federated learning, differential privacy, homomorphic encryption, and secure multi-party computation for sensitive data environments." 
  },
  { 
    title: "Network Security & Forensics", 
    desc: "AI-driven network traffic analysis, ransomware detection, phishing URL classification, and digital forensics automation." 
  },
  { 
    title: "Predictive Risk Modeling", 
    desc: "Risk assessment models, vulnerability prediction, and proactive cybersecurity analytics using graph analytics and large-scale data science." 
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
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero - Unique Cybersecurity Design */}
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
                <div className="mt-10 flex flex-wrap text-black gap-4">
                 <Button size="lg" asChild>
                <Link href="/contact">Start Security Code</Link>
              </Button>
                   <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Security Samples</Link>
                  </Button>
                </div>
              </div>

              {/* Unique Hero Card for Cybersecurity */}
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

        {/* Techniques */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Cybersecurity & Data Science Techniques We Master</h2>
              <p className="mt-3 text-muted-foreground">From fraud prevention to advanced threat intelligence</p>
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

        {/* Deliverables */}
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

        {/* Why Choose Us */}
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
                  <p className="text-muted-foreground mb-6">Share your security challenges or dataset : receive a detailed technical proposal within 24 hours.</p>
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

        {/* Final CTA */}
        <section className="py-20 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">Ready to Strengthen Your Security Posture?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From fraud prevention to advanced threat detection : we deliver intelligent, proactive, and scalable cybersecurity solutions.</p>
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
      </main>
      <Footer />
    </div>
  );
}