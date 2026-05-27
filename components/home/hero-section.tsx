"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Quote,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────
type Review = {
  name: string;
  rating: number;
  date: string;
  text: string;
  image?: string; // optional; falls back to /ClientsPic/{n}.png by index
};

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
  // { name: "Blogs", href: "/blog" },
  { name: "News", href: "/news" },
  { name: "FAQs", href: "/faqs" },
  { name: "Contact", href: "/contact" },
];

const REVIEWS: Review[] = [
  {
    name: "Nivritti James",
    rating: 5,
    date: "3 months ago",
    text: `I sincerely appreciate the support of Mr. Hemanshu Verma and his team for their valuable assistance during the analysis part of my thesis. Their clarity, accuracy, and timely guidance greatly strengthened the quality of my research.`,
  },
  {
    name: "Manish Dhubkarya",
    rating: 5,
    date: "7 months ago",
    text: `I am working as a Full Stack Developer in the Company, its have ascensive culture and a very diligent colleagues, and a lot of learning towards work and skills impression here.`,
  },
  {
    name: "Saksham Shrivastava",
    rating: 5,
    date: "7 months ago",
    text: `Unarguably the best place for your journey if you are a Data Science enthusiast. The hands-on experience through projects over a vast variety of topics strengthens your theoretical knowledge as well as practical skills. Thanks to Himanshu Sir for their guidance at every step. The place is not just about technical skills; it encourages you to be a better version of yourself.`,
  },
  {
    name: "Anjali Joshi",
    rating: 4,
    date: "a year ago",
    text: `I'm genuinely thankful to Mr Himanshu Verma and their team for their dedicated support on my master's dissertation and research paper. They handled every review comment with care and worked diligently to meet all expectations. More than just professional, their team was understanding and approachable throughout the process. Their commitment and human touch truly set them apart. Highly recommended for academic project and research support.`,
  },
  {
    name: "Vishal Verma",
    rating: 5,
    date: "7 months ago",
    text: `Highly satisfied with their service. Friendly staff and excellent customer support. Truly reliable!`,
  },
    {
    name: "Joshi Babu",
    rating: 5,
    date: "2 years ago",
    text: `Excellent work... I got the project done from him and delivered on time.. followed all the instructions from the institute and the prices are also reasonable . Lots of thanks congnicode. Very friendly and Jovial guys`,
  },
    {
    name: "Ankur Yadav",
    rating: 5,
    date: "4 years ago",
    text: `Simply amazing, the best coder I've ever encountered. Throughout the project, I encountered no difficulties. From start to finish, I received proper direction and assistance. If anybody requires dissertation assistance, they can surely rely on them. I'm pleased with Cognicode's services, and I owe a big debt of gratitude to Himanshu Sir.`,
  },
   {
    name: "Aniket Shakya",
    rating: 5,
    date: "3 years ago",
    text: `I will brief my review with some key points :-
1. The nature towards handling the problems is very polite and delicate.
2. Easy solution of huge research oriented projects.
3. Very efficient and focussed towards result oriented work/projects.
4. Always available to help in any kind of situation and updates.
5. Vast knowledge of interdisciplinary fields in modern projects.
6. Excellent technical and graphical approach.
7. Works hard untill and unless you are satisfied with your work.
8. As a person he is very polite and friendly..
9. You will never get disappointed with his work.
Overall you must give him a chance to serve you.
Best wishes.....`,
  },
   {
    name: "akanksha soni",
    rating: 5,
    date: "4 years ago",
    text: `Just awesome, the best coder I have found. I didn't face any difficulty at any stage throughout the work. I got proper guidance and assistance from beginning to end. If anyone is looking for guidance in dissertation then they can undoubtedly trust them.
Happy with the Cognicode services and a great thanks to Himanshu sir.`,
  },
  {
    name: "Manas Dwivedi",
    rating: 5,
    date: "3 years ago",
    text: `I really appreciate the work done by the team. They are very Punctual and also work done by them is beyond my expectation.
On time delivery with accuracy is main aim of the team, that what i have seen.`,
  },
  {
    name: "Sagrika96 Billahatia",
    rating: 5,
    date: "8 months ago",
    text: `The professionalism in work is top-notch and very helpful and professional dilever projects and services on time`,
  },

  {
    name: "Shefali Bajpai",
    rating: 5,
    date: "a year ago",
    text: `अपने क्षेत्र में बहुत कम मूल्य पर उत्कृष्ट सेवाएं प्रदान करते हैं|आपकी आवश्यकता के अनुसार आपको सेवाएं उपलब्ध कराते हैं ,समय सीमा के भीतर आपको बेहतर परिणाम देते हैं |मैं उनकी सेवाओं से पूर्णता संतुष्ट हूं ,तथा उत्कृष्ट सेवाओं के लिए धन्यवाद के साथ उनके उज्जवल भविष्य की कामना करती हूं`,
  },
  {
    name: "Vishakha Dhore",
    rating: 5,
    date: "11 months ago",
    text: `"Great job! Himanshu Your hard work and dedication truly made a difference."😀`,
  },
  {
    name: "Rashmi_Pandey",
    rating: 4,
    date: "3 years ago",
    text: `Services offered are excellent. Really impressed by the work.
Best place for Research writing service.
Thanks to the team.
`,
  },
   {
    name: "Bharat Verma",
    rating: 5,
    date: "3 years ago",
    text: `Fully satisfied with work and provided services, Himanshu sir well expert in his domain, you must give chance to serve him.

`,
  },
 {
    name: "Ayush Gour",
    rating: 5,
    date: "3 years ago",
    text: `If you're seeking for Quality work, then this is the place where you literally get the quality work.. Thanks for all the guidance and services.
`,
  },

   {
    name: "raman tyagi",
    rating: 5,
    date: "3 years ago",
    text: `Helpful, Easy solution, very efficient, quality work.
Always available to help in any kind of situation.
Thanks a lot.
`,
  },
   {
    name: "charlie mn",
    rating: 5,
    date: "2 years ago",
    text: `Very good Service. Very Frank and on time delivery.
Professional.
`
  },
  {
    name: "Ram Hemareddy",
    rating: 5,
    date: "a year ago",
    text: `Good and Timely delivery with quality Service,

Thank you
`
  },
  {
    name: "Dazzle Dance Studio",
    rating: 5,
    date: "4 years ago",
    text: `Services is very good i am very impressed 😊
`
  },
  {
    name: "Dhruv Dhubkarya",
    rating: 5,
    date: "7 months ago",
    text: `Good Service 👍🏻
`
  },
  {
    name: "Sharmita Ray",
    rating: 5,
    date: "4 years ago",
    text: `Excellent service
`
  },
  {
    name: "Vendhan",
    rating: 5,
    date: "2 years ago",
    text: `
`
  },
  {
    name: "Neha Verma",
    rating: 5,
    date: "3 years ago",
    text: `
`
  },
];

const GOOGLE_URL =
  "https://www.google.com/search?sca_esv=2a30541cd13cdf7a&q=CogniCode+IT+Solutions+Reviews";

const PER_PAGE = 3; // cards per slide

// ─────────────────────────────────────────────────────────────
// Small UI helpers
// ─────────────────────────────────────────────────────────────
function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={
            i <= rating
              ? "text-amber-400 fill-amber-400"
              : "text-gray-300 fill-gray-300"
          }
        />
      ))}
    </div>
  );
}

function Avatar({ src, name }: { src: string; name: string }) {
  return (
    <img
      src={src}
      alt={name}
      width={36}
      height={36}
      className="w-9 h-9 rounded-full object-cover shrink-0 border border-border"
      onError={(e) => {
        const t = e.currentTarget;
        if (t.dataset.fb === "1") return;
        t.dataset.fb = "1";
        t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=3b82f6&color=fff`;
      }}
    />
  );
}

function GoogleG({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Review card : one place that renders a review.
// reviewIndex = its real index in REVIEWS (so avatar is correct).
// ─────────────────────────────────────────────────────────────
function ReviewCard({
  review,
  reviewIndex,
  delay = 0,
}: {
  review: Review;
  reviewIndex: number;
  delay?: number;
}) {
  const avatarSrc = review.image ?? `/ClientsPic/${reviewIndex + 1}.png`;

  return (
    <div
      className="relative flex flex-col gap-3 h-fit rounded-2xl border border-border bg-card p-5 shadow-sm"
      style={{
        animation: "heroReviewIn 0.4s ease both",
        animationDelay: `${delay}ms`,
      }}
    >
      <Quote className="absolute top-3 right-4 h-7 w-7 text-primary/10" />
      <div className="flex items-center gap-2.5">
        <Avatar src={avatarSrc} name={review.name} />
        <div>
          <p className="font-semibold text-sm leading-tight">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.date}</p>
        </div>
      </div>
      <StarRow rating={review.rating} size={13} />
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
        {review.text}
      </p>
      <div className=" flex justify-end">
        <GoogleG size={14} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Hero Section
// ─────────────────────────────────────────────────────────────
export function HeroSection() {
  const total = REVIEWS.length;

  // Chunk REVIEWS into pages of PER_PAGE, keeping each item's ORIGINAL index.
  // e.g. 4 reviews → [[{0},{1},{2}], [{3}]]
  const pages: { review: Review; reviewIndex: number }[][] = [];
  for (let i = 0; i < total; i += PER_PAGE) {
    pages.push(
      REVIEWS.slice(i, i + PER_PAGE).map((review, j) => ({
        review,
        reviewIndex: i + j,
      }))
    );
  }
  const totalPages = pages.length;
  const useSlider = total > PER_PAGE; // >3 reviews → slider

  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!useSlider || paused) return;
    intervalRef.current = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, totalPages, useSlider]);

  const avg =
    total > 0
      ? (REVIEWS.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
      : "5.0";

  if (total === 0) return null;

  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="absolute inset-x-0 -top-40 -z-10 blur-3xl">
        <div className="relative mx-auto w-[600px] h-[400px] bg-gradient-to-tr from-primary/30 to-accent/20 opacity-30 rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
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

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Unlock Your Research Potential With{" "}
            <span className="text-primary">Expert Support</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            Professional academic research writing services for PhD thesis,
            research papers, dissertations, and more.
          </p>

          {/* Feature pills */}
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

          {/* CTAs */}
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Button size="lg" asChild>
              <Link prefetch={false} href="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link prefetch={false} href="/services">Explore Our Services</Link>
            </Button>
          </div>

          {/* Global nav */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {globalPages.map((p) => (
              <Link prefetch={false}
                key={p.href}
                href={p.href}
                className="rounded-full border border-border bg-muted px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition"
              >
                {p.name}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-col items-center gap-6 sm:flex-row sm:gap-12 sm:justify-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">15+</span>
              <span className="text-sm text-muted-foreground">
                Years Experience
              </span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">12,000+</span>
              <span className="text-sm text-muted-foreground">
                Projects Completed
              </span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">100%</span>
              <span className="text-sm text-muted-foreground">
                On-Time Delivery
              </span>
            </div>
          </div>

          {/* ─────────── GOOGLE REVIEWS ─────────── */}
          <div className="mt-16">
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
                <span className="text-4xl font-extrabold text-primary">
                  {avg}
                </span>
                <div className="flex flex-col items-start gap-1">
                  <StarRow rating={5} size={18} />
                  <span className="text-xs text-muted-foreground">
                    50+ verified reviews
                  </span>
                </div>
              </div>
            </div>

            {!useSlider ? (
              /* ─── STATIC: 3 or fewer → simple map ─── */
              <div className="flex justify-center">
                <div
                  className={`grid gap-4 text-left w-full max-w-5xl ${total === 1
                      ? "grid-cols-1"
                      : total === 2
                        ? "grid-cols-1 sm:grid-cols-2"
                        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                >
                  {REVIEWS.map((review, idx) => (
                    <ReviewCard
                      key={idx}
                      review={review}
                      reviewIndex={idx}
                      delay={idx * 60}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* ─── SLIDER: 4+ reviews, paginated ─── */
              <div
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left min-h-[260px]">
                  {pages[page].map(({ review, reviewIndex }, slot) => (
                    <ReviewCard
                      key={`${page}-${reviewIndex}`}
                      review={review}
                      reviewIndex={reviewIndex}
                      delay={slot * 60}
                    />
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    aria-label="Previous page"
                    onClick={() =>
                      setPage((p) => (p - 1 + totalPages) % totalPages)
                    }
                    className="rounded-full border border-border bg-muted p-1.5 hover:bg-primary hover:text-primary-foreground transition"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>

                  <div className="flex gap-1.5">
                    {pages.map((_, i) => (
                      <button
                        type="button"
                        key={i}
                        aria-label={`Go to page ${i + 1}`}
                        onClick={() => setPage(i)}
                        className={`h-1.5 rounded-full transition-all ${i === page ? "w-5 bg-primary" : "w-1.5 bg-border"
                          }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    aria-label="Next page"
                    onClick={() => setPage((p) => (p + 1) % totalPages)}
                    className="rounded-full border border-border bg-muted p-1.5 hover:bg-primary hover:text-primary-foreground transition"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            <a
              href={GOOGLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition text-center"
            >
              Read all reviews on Google <ExternalLink className="h-3 w-3" />
            </a>
          </div>
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

export default HeroSection;