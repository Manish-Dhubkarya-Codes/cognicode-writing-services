import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Cpu, Code, Zap, GitBranch, Eye, FileText, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Machine Learning Model Development | CogniCode",
  description: "End-to-end custom Machine Learning model development for PhD research. Supervised, unsupervised, reinforcement learning with full reproducibility, documentation, and publication-ready deliverables.",
};

const modelTypes = [
  { title: "Supervised Learning", desc: "Classification, Regression, Ensemble methods (Random Forest, XGBoost, LightGBM)" },
  { title: "Unsupervised Learning", desc: "Clustering (K-Means, DBSCAN), Dimensionality Reduction (PCA, t-SNE, UMAP)" },
  { title: "Reinforcement Learning", desc: "Q-Learning, Deep Q-Networks, Policy Gradient methods, Multi-agent systems" },
  { title: "Time-Series & Sequential", desc: "ARIMA, Prophet, LSTM, Transformer-based forecasting models" },
];

const deliverables = [
  "Fully functional, reproducible Jupyter Notebook / Python scripts",
  "Trained model artifacts (.pkl, .h5, ONNX) with version control",
  "Comprehensive methodology chapter / documentation for thesis",
  "Performance metrics, confusion matrices, ROC curves, SHAP explanations",
  "Hyperparameter tuning report and ablation study",
  "Git repository with clean, commented code and README",
  "Publication-ready graphs, tables, and LaTeX-ready figures",
  "One-to-one training session + lifetime support & updates",
];

const steps = [
  {
    step: "01",
    title: "Research Problem Framing",
    desc: "We translate your research objectives into a well-defined ML problem with success metrics and baseline benchmarks.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Data Exploration & Feature Engineering",
    desc: "Advanced EDA, feature selection, engineering, and synthetic data generation tailored to your domain.",
    icon: Database,
  },
  {
    step: "03",
    title: "Model Architecture & Training",
    desc: "Build, train, and iterate multiple architectures with GPU acceleration and experiment tracking (MLflow/WandB).",
    icon: Cpu,
  },
  {
    step: "04",
    title: "Evaluation, Optimization & Documentation",
    desc: "Rigorous validation, explainability analysis, hyperparameter optimization, and full academic documentation.",
    icon: Eye,
  },
];

const benefits = [
  "PhD holders & published AI researchers with 10+ years experience",
  "100% original, plagiarism-free, and reproducible code",
  "Full compliance with academic integrity standards",
  "Confidentiality guaranteed (NDA available)",
  "Support for thesis, journal papers, and conference presentations",
  "Free revisions until you are fully satisfied",
  "Lifetime access to model updates and improvements",
];

export default function MLModelPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero - Technical & Academic Focus */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
                  <Cpu className="h-4 w-4" />
                  MACHINE LEARNING MODEL DEVELOPMENT
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Custom Machine Learning Models for<br />PhD Research
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  End-to-end development of supervised, unsupervised, and reinforcement learning models — built specifically for your research objectives with full reproducibility and academic rigor.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Your ML Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Sample Models</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-primary text-primary-foreground shadow-2xl">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-white/20 flex items-center justify-center">
                          <Code className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-mono text-sm">98.7% Accuracy</p>
                          <p className="text-xs opacity-75">on latest benchmark</p>
                        </div>
                      </div>
                      <Zap className="h-10 w-10 text-yellow-300" />
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-4 rounded-xl mb-6 overflow-hidden">
                      <pre className="text-emerald-300">
{`model = XGBClassifier(
    n_estimators=500,
    learning_rate=0.05,
    max_depth=8,
    eval_metric="auc"
)`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">Built • Trained • Documented • Delivered for thesis &amp; publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Model Types Supported */}
        <section className="py-16 md:py-24 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Machine Learning Models We Develop</h2>
              <p className="mt-3 text-muted-foreground">Tailored to your specific research domain and data characteristics</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {modelTypes.map((type, i) => (
                <Card key={i} className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="font-semibold text-xl mb-3">{type.title}</h3>
                    <p className="text-muted-foreground">{type.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process - Technical Workflow */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-serif text-4xl font-bold">Our Proven ML Development Process</h2>
              <p className="mt-4 text-lg text-muted-foreground">Academic-grade workflow used by PhD scholars worldwide</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((s, i) => (
                <div key={i} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mb-6">
                      {s.step}
                    </div>
                    <s.icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-border -z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Receive */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5">
                <h2 className="font-serif text-4xl font-bold">Everything You Receive</h2>
                <p className="mt-4 text-lg text-muted-foreground">Complete, ready-to-submit deliverables for your thesis, paper, or defense.</p>
                <ul className="mt-10 space-y-6">
                  {deliverables.map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-7">
                <Card>
                  <CardContent className="p-10">
                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-8">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <GitBranch className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Version Controlled Code</span>
                          </div>
                          <p className="text-sm text-muted-foreground">GitHub/GitLab repository with complete history</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Thesis-Ready Documentation</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Methodology chapter + results section in LaTeX/Word</p>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <Eye className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Explainability Reports</span>
                          </div>
                          <p className="text-sm text-muted-foreground">SHAP, LIME, feature importance visualizations</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <Award className="h-5 w-5 text-primary" />
                            <span className="font-semibold">Publication Support</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Ready for IEEE, Elsevier, Springer, or your target journal</p>
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
                <h2 className="text-4xl font-bold">Why Top Researchers Choose Us</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Custom ML Model Quote</h3>
                  <p className="text-muted-foreground mb-6">Tell us about your research and get a detailed proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Brief description of your research problem & dataset" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <Button className="w-full h-14 text-base" size="lg">Request Detailed Proposal</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-background border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">Ready to Build Your Next Breakthrough Model?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From idea to publication — we handle the entire machine learning pipeline.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Project Today</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/ai-ml">Back to AI &amp; ML Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}