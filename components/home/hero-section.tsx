"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star, Quote, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const features = [
  "Expert PhD Writers",
  "100% Original Content",
  "On-Time Delivery",
  "24/7 Support",
];

const globalPages = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Samples", href: "/samples" },
  { name: "Blogs", href: "/blog" },
  { name: "News", href: "/news" },
  { name: "FAQs", href: "/faqs" },
  { name: "Contact", href: "/contact" },
];

// ─────────────────────────────────────────────────────────────
// ✏️  PASTE YOUR REAL GOOGLE REVIEWS HERE
// ─────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: "Rahul Sharma",
    avatar: "RS",
    rating: 5,
    date: "2 months ago",
    text: "CogniCode IT Solutions delivered my thesis work with exceptional quality. The team was professional, responsive and met every deadline. Highly recommended!",
  },
  {
    name: "Priya Verma",
    avatar: "PV",
    rating: 5,
    date: "3 months ago",
    text: "Outstanding service! My dissertation was handled by an expert who truly understood the subject. Original, well-structured and passed plagiarism checks with ease.",
  },
  {
    name: "Mohammed Al-Rashid",
    avatar: "MA",
    rating: 5,
    date: "1 month ago",
    text: "CogniCode exceeded all expectations. The PhD-level writer had deep domain expertise and communicated clearly throughout the entire project.",
  },
  {
    name: "Ananya Singh",
    avatar: "AS",
    rating: 5,
    date: "4 months ago",
    text: "Superb research paper writing service. On-time delivery, excellent references, and the content was exactly what my professor was looking for.",
  },
  {
    name: "James Okonkwo",
    avatar: "JO",
    rating: 5,
    date: "2 weeks ago",
    text: "The 24/7 support is real — I had queries at midnight and got prompt responses. The final deliverable was polished and 100% original.",
  },
  {
    name: "Sneha Kulkarni",
    avatar: "SK",
    rating: 4.5,
    date: "5 months ago",
    text: "Very good experience overall. Minor revisions were handled quickly without extra charges. Great value for the quality provided.",
  },
];

const GOOGLE_URL = "https://www.google.com/search?sca_esv=2a30541cd13cdf7a&sxsrf=ANbL-n4ebNVIUo-pnfnvodBhBzOhnbOZFg:1776946927091&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOaKzvS6iLQr1Wcw9_vlRMeznwwQvI-PT8fgp6Nk3vQmWYY5c5IpyfFCCgetzc3r-sbco03r1EQKa0OsL-39GIEFMNxXGatGCi-0L8IZUAg-Or8uQOQ%3D%3D&q=CogniCode+IT+Solutions+Reviews&sa=X&ved=2ahUKEwit2v6S-4OUAxWDTmwGHcedAbUQ0bkNegQIIhAH&biw=1440&bih=791&dpr=1.5";

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-300"}
        />
      ))}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  const hue = initials.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-semibold text-xs select-none shrink-0"
      style={{ width: 36, height: 36, background: `hsl(${hue}, 60%, 48%)` }}
    >
      {initials}
    </div>
  );
}

const GoogleG = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" style={{ width: size, height: size }} aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = REVIEWS.length;

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => setCurrent((c) => (c + 1) % total), 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, total]);

  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / total).toFixed(1);
  const visible = [REVIEWS[current % total], REVIEWS[(current + 1) % total], REVIEWS[(current + 2) % total]];

  return (
    <section className="relative isolate overflow-hidden bg-background">

      {/* Background decoration */}
      <div className="absolute inset-x-0 -top-40 -z-10 blur-3xl">
        <div className="relative mx-auto w-[600px] h-[400px] bg-gradient-to-tr from-primary/30 to-accent/20 opacity-30 rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">

          {/* TRUST BADGE */}
          <div className="mb-8 flex items-center justify-center gap-2">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              Trusted by 8,000+ Scholars Worldwide
            </span>
          </div>

          {/* HEADLINE */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Unlock Your Research Potential With{" "}
            <span className="text-primary">Expert Support</span>
          </h1>

          {/* SUBHEADLINE */}
          <p className="mt-6 text-lg text-muted-foreground">
            Professional academic research writing services for PhD thesis,
            research papers, dissertations, and more.
          </p>

          {/* FEATURE PILLS */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
              >
                <CheckCircle className="h-4 w-4" />
                {feature}
              </div>
            ))}
          </div>

          {/* CTA BUTTONS */}
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Button size="lg" asChild>
              <Link href="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>

          {/* GLOBAL NAVIGATION */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {globalPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="rounded-full border border-border bg-muted px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition"
              >
                {page.name}
              </Link>
            ))}
          </div>

          {/* SOCIAL PROOF STATS */}
          <div className="mt-14 flex flex-col items-center gap-6 sm:flex-row sm:gap-12 sm:justify-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">15+</span>
              <span className="text-sm text-muted-foreground">Years Experience</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">12,000+</span>
              <span className="text-sm text-muted-foreground">Projects Completed</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">100%</span>
              <span className="text-sm text-muted-foreground">On-Time Delivery</span>
            </div>
          </div>

          {/* ───── GOOGLE REVIEWS ───── */}
          <div className="mt-16">

            {/* Section header */}
            <div className="flex flex-col items-center gap-3 mb-8">
              <a
                href={GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition"
              >
                <GoogleG size={16} />
                Google Reviews
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>

              <div className="flex items-center gap-3">
                <span className="text-4xl font-extrabold text-primary">{avg}</span>
                <div className="flex flex-col items-start gap-1">
                  <StarRow rating={5} size={18} />
                  <span className="text-xs text-muted-foreground">50+ verified reviews</span>
                </div>
              </div>
            </div>

            {/* Cards carousel */}
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {visible.map((review, idx) => (
                  <div
                    key={`${current}-${idx}`}
                    className="relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
                    style={{ animation: "heroReviewIn 0.4s ease both", animationDelay: `${idx * 60}ms` }}
                  >
                    <Quote className="absolute top-3 right-4 h-7 w-7 text-primary/10" />

                    <div className="flex items-center gap-2.5">
                      <Avatar initials={review.avatar} />
                      <div>
                        <p className="font-semibold text-sm leading-tight">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>

                    <StarRow rating={review.rating} size={13} />

                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                      {review.text}
                    </p>

                    <div className="mt-auto flex justify-end">
                      <GoogleG size={14} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots + arrows */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => setCurrent((c) => (c - 1 + total) % total)}
                  className="rounded-full border border-border bg-muted p-1.5 hover:bg-primary hover:text-primary-foreground transition"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>

                <div className="flex gap-1.5">
                  {REVIEWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-1.5 rounded-full transition-all ${i === current ? "w-5 bg-primary" : "w-1.5 bg-border"}`}
                      aria-label={`Review ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrent((c) => (c + 1) % total)}
                  className="rounded-full border border-border bg-muted p-1.5 hover:bg-primary hover:text-primary-foreground transition"
                  aria-label="Next"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <a
                href={GOOGLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition"
              >
                Read all reviews on Google <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
          {/* ───── END GOOGLE REVIEWS ───── */}

        </div>
      </div>

      <style>{`
        @keyframes heroReviewIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}