"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "@/components/ui/SearchBar";

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


export function HeroSection() {

  return (
    <section className="relative isolate overflow-hidden bg-background">

      {/* Background decoration */}
      <div className="absolute inset-x-0 -top-40 -z-10 blur-3xl">
        <div className="relative mx-auto w-[600px] h-[400px] bg-gradient-to-tr from-primary/30 to-accent/20 opacity-30 rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">

          {/* SEARCH BAR */}
<div className="mb-10">
  <SearchBar />
</div>

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

          {/* SOCIAL PROOF */}
          <div className="mt-14 flex flex-col items-center gap-6 sm:flex-row sm:gap-12">

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

        </div>
      </div>
    </section>
  );
}