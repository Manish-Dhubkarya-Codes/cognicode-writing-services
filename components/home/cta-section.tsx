import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-primary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Start Your Academic Journey?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/80">
            Get expert guidance for your thesis, research papers, or any
            academic project. Our team of PhD experts is ready to help you
            succeed.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-base"
            >
              <Link href="/contact">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Schedule a Call
              </Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-primary-foreground/60">
            Free consultation available. No commitment required.
          </p>
        </div>
      </div>
    </section>
  );
}
