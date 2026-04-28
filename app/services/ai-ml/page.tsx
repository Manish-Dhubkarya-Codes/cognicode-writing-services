import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, Brain, Network, TrendingUp, Target, Cpu } from "lucide-react";

export const metadata: Metadata = { 
  title: "Artificial Intelligence & Machine Learning | CogniCode", 
  description: "Expert AI and Machine Learning research support — ML model development, deep learning, neural networks, predictive modeling, and model optimization." 
};

const features = [
  { 
    icon: Cpu, 
    title: "Machine Learning Model Development", 
    description: "End-to-end development of supervised, unsupervised, and reinforcement learning models — from data preprocessing to deployment-ready solutions tailored to your research objectives.",
    href: "/services/ai-ml/ml-model"
  },
  { 
    icon: Network, 
    title: "Deep Learning & Neural Networks", 
    description: "Design and train advanced architectures including CNNs, RNNs, LSTMs, GANs, and Transformers using TensorFlow, PyTorch, and Keras for cutting-edge research applications.",
    href: "/services/ai-ml/dl-neural-network"
  },
  { 
    icon: TrendingUp, 
    title: "Predictive Modeling & Forecasting", 
    description: "Build robust predictive systems for time-series forecasting, classification, regression, and trend analysis with high accuracy and statistical reliability.",
    href: "/services/ai-ml/predict-modelling-forecast"
  },
  { 
    icon: Target, 
    title: "Model Evaluation & Optimization", 
    description: "Rigorous evaluation through cross-validation, hyperparameter tuning, and performance benchmarking to deliver optimized, publication-ready models.",
    href: "/services/ai-ml/model-eval-optim"
  },
];

const steps = [
  { step: "01", title: "Problem Definition", description: "We understand your research problem, dataset, and target outcomes to frame it as a well-defined ML task with measurable goals." },
  { step: "02", title: "Data Preparation", description: "Clean, preprocess, and engineer features from your dataset to maximize model performance, reproducibility, and reliability." },
  { step: "03", title: "Model Building & Training", description: "Develop, train, and iterate on appropriate ML/DL architectures with rigorous experimentation, validation, and tracking." },
  { step: "04", title: "Evaluation & Delivery", description: "Evaluate against benchmarks, optimize hyperparameters, and deliver the model with full documentation and code walkthrough." },
];

const benefits = ["Expert AI/ML researchers and engineers", "TensorFlow, PyTorch, Keras, Scikit-learn expertise", "Custom architecture design for your problem", "Hyperparameter tuning & model optimization", "Reproducible experiments and clean codebases", "GPU-accelerated training support", "Publication-ready results and visualizations", "Post-delivery support and consultations"];

export default function ServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">Artificial Intelligence & Machine Learning</p>
                <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">AI & Machine Learning Research Support</h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">From classical ML algorithms to state-of-the-art deep learning architectures, our AI experts turn your research ideas into production-grade, reproducible models with measurable impact.</p>
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
                        <p className="text-sm text-primary-foreground/80">AI/ML Models Delivered</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl font-bold text-primary">20+</p>
                      <p className="text-sm text-muted-foreground">ML Frameworks</p>
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
                { icon: Users, text: "Expert AI Engineers" },
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
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What We Deliver in AI & ML</h2>
              <p className="mt-4 text-lg text-muted-foreground">Click on any service below to explore detailed offerings</p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2">
              {features.map((f, i) => (
                <Link key={i} href={f.href} className="block group">
                  <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 h-full group-hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <f.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3>
                      <p className="mt-2 text-muted-foreground">{f.description}</p>
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
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our AI/ML Development Process</h2>
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
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Why Choose Our AI/ML Service?</h2>
                <p className="mt-4 text-lg text-muted-foreground">We deliver research-grade AI solutions with complete reproducibility and full documentation.</p>
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
                  <h3 className="text-xl font-semibold text-foreground">Get a Free AI/ML Project Estimate</h3>
                  <p className="mt-2 text-muted-foreground">Share your AI/ML requirements and get a detailed estimate.</p>
                  <form className="mt-6 space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    <input type="email" placeholder="Email Address" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    <input type="tel" placeholder="Phone Number" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                    <select className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                      <option value="">Select AI/ML Area</option>
                      <option value="ml-development">Machine Learning Model Development</option>
                      <option value="deep-learning">Deep Learning & Neural Networks</option>
                      <option value="predictive">Predictive Modeling & Forecasting</option>
                      <option value="optimization">Model Evaluation & Optimization</option>
                      <option value="tensorflow">TensorFlow / PyTorch</option>
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
            <h2 className="font-serif text-3xl font-bold text-black sm:text-4xl">Need AI & Machine Learning Support?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">From classical ML to cutting-edge deep learning — our AI experts turn ideas into research-grade models.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
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