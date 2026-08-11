import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import Ready_To_Start from "../../public/Ready_To_Start.png";

export function CTASection() {
  return (
    <section className="relative overflow-hidden mb-1 py-16 sm:py-24">
      {/* Background Image */}
      <Image
        src={Ready_To_Start}
        alt="Academic Journey"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Start Your Academic Journey?
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
            Get expert guidance for your thesis, research papers, or any
            academic project. Our team of PhD experts is ready to help you
            succeed.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-base"
            >
              <Link prefetch={false} href="/contact">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 text-base"
            >
              <Link
                prefetch={false}
                href="/contact"
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Schedule a Call
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-white/70">
            Free consultation available. No commitment required.
          </p>
        </div>
      </div>
    </section>
  );
}