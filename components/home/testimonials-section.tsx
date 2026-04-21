import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content:
      "CogniCode transformed my PhD journey. Their expert guidance helped me complete my thesis ahead of schedule with exceptional quality. The team understood my research area deeply.",
    author: "Dr. Sarah Mitchell",
    role: "PhD in Psychology",
    university: "Stanford University",
    rating: 5,
  },
  {
    id: 2,
    content:
      "The data analysis support I received was outstanding. They helped me interpret complex statistical results and present them clearly. My research paper got accepted in a top-tier journal.",
    author: "Prof. James Chen",
    role: "Associate Professor",
    university: "MIT",
    rating: 5,
  },
  {
    id: 3,
    content:
      "I was struggling with my literature review for months. CogniCode's team helped me structure it properly and identify key gaps in my research. Highly recommended for any PhD scholar.",
    author: "Dr. Emily Rodriguez",
    role: "Postdoctoral Researcher",
    university: "Harvard University",
    rating: 5,
  },
  {
    id: 4,
    content:
      "Their synopsis writing service was exactly what I needed. Got my research proposal approved in the first attempt! The team is responsive and delivers quality work on time.",
    author: "Michael Thompson",
    role: "PhD Candidate",
    university: "UC Berkeley",
    rating: 5,
  },
  {
    id: 5,
    content:
      "Professional, reliable, and incredibly knowledgeable. They helped me navigate the complexities of academic writing and improved my research significantly. Worth every penny.",
    author: "Dr. Amanda Foster",
    role: "Research Scientist",
    university: "Oxford University",
    rating: 5,
  },
  {
    id: 6,
    content:
      "The plagiarism removal service saved my thesis. They ensured my work was 100% original while maintaining the integrity of my research. Exceptional attention to detail.",
    author: "David Park",
    role: "PhD Scholar",
    university: "Columbia University",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-muted py-24 sm:py-32" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Testimonials
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Join thousands of satisfied scholars who have achieved their
            academic goals with our expert support.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.slice(0, 6).map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col justify-between rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-base leading-7 text-muted-foreground">
                  {testimonial.content}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-x-4 border-t border-border pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-foreground">
                    {testimonial.author}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-xs leading-5 text-muted-foreground/70">
                    {testimonial.university}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
