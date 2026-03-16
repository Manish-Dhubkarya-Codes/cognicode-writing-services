import {
  GraduationCap,
  Clock,
  Shield,
  HeadphonesIcon,
  BadgeCheck,
  Globe,
} from "lucide-react";

const features = [
  {
    name: "Expert PhD Writers",
    description:
      "Our team consists of qualified PhD holders with extensive experience in academic writing across various disciplines.",
    icon: GraduationCap,
  },
  {
    name: "On-Time Delivery",
    description:
      "We understand deadlines matter. Our commitment to timely delivery ensures you never miss a submission date.",
    icon: Clock,
  },
  {
    name: "100% Original Content",
    description:
      "Every piece of work is crafted from scratch and thoroughly checked for plagiarism before delivery.",
    icon: Shield,
  },
  {
    name: "24/7 Support",
    description:
      "Our dedicated support team is available around the clock to address your queries and concerns.",
    icon: HeadphonesIcon,
  },
  {
    name: "Quality Assurance",
    description:
      "Rigorous quality checks at every stage ensure the highest standards of academic excellence.",
    icon: BadgeCheck,
  },
  {
    name: "Global Reach",
    description:
      "We serve scholars from universities worldwide, understanding diverse academic requirements.",
    icon: Globe,
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Why Choose Us
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your Route to Exceptional Academic Research
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We combine academic expertise with personalized support to help you
            achieve your research goals. Here's what sets us apart.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <feature.icon
                      className="h-6 w-6 text-primary-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
