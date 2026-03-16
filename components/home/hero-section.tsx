import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star } from "lucide-react";

const features = [
  "Expert PhD Writers",
  "100% Original Content",
  "On-Time Delivery",
  "24/7 Support",
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/30 to-accent/20 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Trust badge */}
          <div className="mb-8 flex items-center justify-center gap-2">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-amber-500 fill-amber-500"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              Trusted by 8,000+ Scholars Worldwide
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-balance font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Unlock Your Research Potential With{" "}
            <span className="text-primary">Expert Support</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
            Professional academic research writing services for PhD thesis,
            research papers, dissertations, and more. Get expert guidance at
            every step of your scholarly journey.
          </p>

          {/* Feature pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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

          {/* CTAs */}
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Button size="lg" asChild className="text-base">
              <Link href="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base">
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">15+</span>
              <span className="text-sm text-muted-foreground">
                Years Experience
              </span>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">12,000+</span>
              <span className="text-sm text-muted-foreground">
                Projects Completed
              </span>
            </div>
            <div className="h-8 w-px bg-border hidden sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">100%</span>
              <span className="text-sm text-muted-foreground">
                On-Time Delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/20 to-accent/10 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
}
