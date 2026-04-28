import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Clock, Shield, Award, TrendingUp, Calendar, LineChart, Target, Zap, Eye, GitBranch, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Predictive Modeling & Forecasting | CogniCode",
  description: "Expert predictive modeling and time-series forecasting for PhD research. ARIMA, Prophet, LSTM, XGBoost, Transformer-based forecasting with statistical validation and publication-ready results.",
};

const forecastingTypes = [
  { title: "Time-Series Forecasting", desc: "ARIMA, SARIMA, Prophet, Exponential Smoothing, and advanced deep learning models for trend & seasonality prediction" },
  { title: "Regression-Based Prediction", desc: "Linear, Polynomial, Ridge, Lasso, Random Forest, and Gradient Boosting for continuous outcome prediction" },
  { title: "Classification & Probability Forecasting", desc: "Logistic regression, survival analysis, and probabilistic forecasting with confidence intervals" },
  { title: "Multivariate & Causal Forecasting", desc: "Vector Autoregression (VAR), Granger Causality, and hybrid models incorporating external variables" },
];

const deliverables = [
  "Fully trained predictive models with inference pipelines",
  "Complete forecasting report with confidence intervals and error metrics",
  "Interactive dashboards (Plotly, Streamlit, or Power BI)",
  "Backtesting results and out-of-sample validation",
  "Methodology chapter ready for thesis submission",
  "Git repository with reproducible code and experiment logs",
  "Publication-ready charts, tables, and statistical summaries",
  "One-to-one walkthrough session + 6 months of free model updates",
];

const steps = [
  {
    step: "01",
    title: "Problem & Data Analysis",
    desc: "We analyze your time-series or predictive problem, perform stationarity tests, and identify seasonality/trend patterns.",
    icon: Calendar,
  },
  {
    step: "02",
    title: "Feature Engineering & Modeling",
    desc: "Advanced feature creation, lag variables, rolling statistics, and selection of best-performing algorithms.",
    icon: LineChart,
  },
  {
    step: "03",
    title: "Model Training & Validation",
    desc: "Train multiple models (statistical + ML/DL), perform cross-validation, and hyperparameter optimization.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Forecasting & Delivery",
    desc: "Generate future predictions with confidence intervals and deliver complete academic documentation.",
    icon: Eye,
  },
];

const benefits = [
  "PhD-level statisticians and forecasters with 10+ years experience",
  "Expertise in Python (Prophet, statsmodels, scikit-learn), R, and deep learning frameworks",
  "Rigorous statistical validation and backtesting",
  "Reproducible, production-ready forecasting pipelines",
  "Support for short-term, medium-term, and long-term forecasting",
  "Confidentiality and academic integrity guaranteed",
  "Free revisions until your supervisor approves",
  "Lifetime support for model retraining and updates",
];

export default function PredictiveModelingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mt-17">
        {/* Hero - Forecasting Theme */}
        <section className="bg-gradient-to-br from-emerald-50 via-cyan-50 to-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-4 py-2 text-sm font-medium text-emerald-700 mb-6">
                  <TrendingUp className="h-4 w-4" />
                  PREDICTIVE MODELING &amp; FORECASTING
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-none">
                  Predictive Modeling<br />&amp; Forecasting
                </h1>
                <p className="mt-6 text-xl text-muted-foreground max-w-lg">
                  Accurate, statistically validated forecasting models for time-series, regression, and causal prediction — built for PhD research and publication.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/contact">Start Forecasting Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/samples">View Forecasting Samples</Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-emerald-600 to-cyan-600 text-white shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="flex justify-between mb-8">
                      <TrendingUp className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-5xl font-bold">92.4%</p>
                        <p className="text-sm opacity-75">Forecast Accuracy</p>
                      </div>
                    </div>
                    <div className="h-2 bg-white/30 rounded-full mb-2 overflow-hidden">
                      <div className="h-2 w-[92%] bg-white rounded-full"></div>
                    </div>
                    <p className="text-xs opacity-75 mb-6">Next 12-month forecast with 95% confidence interval</p>
                    <div className="font-mono text-xs bg-black/30 p-4 rounded-2xl">
                      <pre className="text-emerald-200">
{`forecast = model.predict(
    periods=12,
    return_conf_int=True
)`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Forecasting Types */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold">Forecasting Solutions We Deliver</h2>
              <p className="mt-3 text-muted-foreground">Tailored to your research domain and data characteristics</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {forecastingTypes.map((type, i) => (
                <Card key={i} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="font-semibold text-xl mb-3">{type.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{type.desc}</p>
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
              <h2 className="font-serif text-4xl font-bold">Our Predictive Modeling Process</h2>
              <p className="mt-4 text-lg text-muted-foreground">Proven academic workflow for reliable, publishable forecasts</p>
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
                <p className="mt-4 text-lg text-muted-foreground">Everything needed for thesis, journal submission, and defense.</p>
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
                            <p className="font-semibold">Thesis-Ready Report</p>
                            <p className="text-sm text-muted-foreground">Methodology + results chapter</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-8">
                        <div className="flex gap-4">
                          <Eye className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Interactive Forecasts</p>
                            <p className="text-sm text-muted-foreground">Dashboards with confidence bands</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Target className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <p className="font-semibold">Statistical Validation</p>
                            <p className="text-sm text-muted-foreground">MAE, RMSE, MAPE, backtesting</p>
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
                <h2 className="text-4xl font-bold">Why PhD Scholars Choose Our Forecasting Service</h2>
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
                  <h3 className="text-2xl font-semibold mb-2">Get Your Predictive Model Proposal</h3>
                  <p className="text-muted-foreground mb-6">Share your forecasting requirements and receive a detailed technical proposal within 24 hours.</p>
                  <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <input type="email" placeholder="University Email" className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
                    <textarea placeholder="Describe your dataset, forecasting horizon, and research objectives" rows={4} className="w-full rounded-xl border border-border bg-background px-5 py-4 text-sm" />
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
            <h2 className="text-4xl font-bold">Ready to Create Accurate Future Predictions?</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">From simple trends to complex multivariate forecasts — we deliver publication-ready predictive models.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Forecasting Project</Link>
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