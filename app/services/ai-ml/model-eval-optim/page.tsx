import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Target, Eye, Zap, Settings, BarChart3, GitBranch, FileText, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Model Evaluation & Optimization | CogniCode",
  description: "Expert model evaluation, hyperparameter tuning, explainability analysis, and optimization for PhD research. Rigorous validation, ablation studies, and publication-ready performance reports using SHAP, LIME, Optuna, and more.",
};

const techniques = [
  { title: "Performance Evaluation", desc: "Cross-validation, confusion matrix, ROC-AUC, Precision-Recall, F1-score, MAE/RMSE, and custom domain-specific metrics" },
  { title: "Hyperparameter Optimization", desc: "Grid Search, Random Search, Bayesian Optimization (Optuna, Hyperopt), and automated tuning pipelines" },
  { title: "Model Explainability & Interpretability", desc: "SHAP, LIME, Grad-CAM, attention visualization, and feature importance analysis" },
  { title: "Advanced Optimization & Compression", desc: "Model pruning, quantization, distillation, and deployment-ready optimization for production environments" },
];

const deliverables = [
  "Comprehensive evaluation report with all key metrics and statistical tests",
  "Hyperparameter tuning logs and ablation study results",
  "Explainability visualizations (SHAP beeswarm, force plots, dependence plots)",
  "Optimized model weights with performance comparison tables",
  "Full methodology section ready for thesis / journal submission",
  "Reproducible Jupyter notebooks and experiment tracking (MLflow / Weights & Biases)",
  "Publication-ready charts, tables, and LaTeX code",
  "One-to-one review session + 6 months of free optimization updates",
];

const steps = [
  {
    step: "01",
    title: "Baseline Evaluation",
    desc: "Establish strong baselines using k-fold cross-validation and multiple performance metrics tailored to your research objectives.",
    icon: BarChart3,
  },
  {
    step: "02",
    title: "Hyperparameter Tuning",
    desc: "Systematic optimization using Bayesian methods, grid search, or evolutionary algorithms to find the best model configuration.",
    icon: Settings,
  },
  {
    step: "03",
    title: "Explainability Analysis",
    desc: "Deep interpretability using SHAP, LIME, and attention mechanisms to understand model decisions and ensure scientific validity.",
    icon: Eye,
  },
  {
    step: "04",
    title: "Optimization & Final Validation",
    desc: "Model compression, robustness testing, bias/variance analysis, and final delivery with complete academic documentation.",
    icon: Zap,
  },
];

const benefits = [
  "PhD-level ML researchers with extensive publication record in top venues",
  "Expertise in scikit-learn, Optuna, SHAP, LIME, and TensorBoard",
  "Rigorous statistical validation and reproducible experiments",
  "Support for both classical ML and deep learning models",
  "Full compliance with academic integrity and reproducibility standards",
  "Confidentiality guaranteed (NDA available on request)",
  "Free revisions until your thesis committee or journal reviewers are satisfied",
  "Lifetime access to evaluation reports and model improvements",
];

export default function ModelEvalOptimPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero - Optimization Theme */}
        <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-600/10 px-4 py-2 text-sm font-medium text-amber-700 mb-6">
                  <Target className="h-4 w-4" />
                  MODEL EVALUATION &amp; OPTIMIZATION
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Model Evaluation<br />&amp; Optimization
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Rigorous evaluation, hyperparameter tuning, explainability analysis, and performance optimization — turning good models into exceptional, publication-ready solutions.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Optimize Your Model</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Evaluation Reports</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <Layers className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">0.973</p>
                        <p className="text-sm opacity-75">AUC-ROC Score</p>
                      </div>
                    </div>
                    <div className="font-mono text-xs bg-black/30 p-5 rounded-2xl mb-6">
                      <pre className="text-amber-200">
{`study = optuna.create_study(direction="maximize")
study.optimize(objective, n_trials=100)`}
                      </pre>
                    </div>
                    <p className="text-sm opacity-90">Optimized • Interpreted • Validated • Ready for thesis &amp; publication</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Key Techniques */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Evaluation &amp; Optimization Techniques We Master</h2>
              <p className="mt-3 text-muted-foreground">From statistical validation to cutting-edge interpretability — we cover every aspect</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Model Evaluation &amp; Optimization Process</h2>
              <p className="mt-4 text-lg text-muted-foreground">Academic-standard workflow used by top researchers worldwide</p>
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
                <h2 className="font-serif text-4xl font-bold">What You Receive</h2>
                <p className="mt-4 text-lg text-muted-foreground">Everything your thesis committee or journal reviewers expect.</p>
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
                            <p className="font-semibold">Reproducible Evaluation Pipeline</p>
                            <p className="text-sm text-muted-foreground">Full code + experiment tracking</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <FileText className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Thesis-Ready Report</p>
                            <p className="text-sm text-muted-foreground">Methodology + results + appendix</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Explainability Dashboard</p>
                            <p className="text-sm text-muted-foreground">SHAP, LIME &amp; attention maps</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Target className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Optimization Summary</p>
                            <p className="text-sm text-muted-foreground">Before vs After comparison tables</p>
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
                <h2 className="text-4xl font-bold">Why Researchers Trust Us for Model Evaluation</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Model Evaluation Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your current model and we will deliver a detailed evaluation &amp; optimization plan within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your model, current metrics, and optimization goals" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <Button className="w-full h-14 text-base" size="lg">Request Evaluation Proposal</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold">Ready to Make Your Model Publication-Ready?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From evaluation to optimization — we turn good models into exceptional, reviewer-approved solutions.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Optimize My Model Now</Link>
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