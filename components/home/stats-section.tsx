import { Clock, Users, FileText, Award } from "lucide-react";

const stats = [
  {
    id: 1,
    name: "Years of Experience",
    value: "15+",
    icon: Clock,
    description: "Trusted expertise since 2009",
  },
  {
    id: 2,
    name: "Projects Completed",
    value: "12,000+",
    icon: FileText,
    description: "Across all academic disciplines",
  },
  {
    id: 3,
    name: "Satisfied Clients",
    value: "8,000+",
    icon: Users,
    description: "Scholars worldwide trust us",
  },
  {
    id: 4,
    name: "Delivery Rate",
    value: "100%",
    icon: Award,
    description: "On-time, every time",
  },
];

export function StatsSection() {
  return (
    <section className="bg-foreground py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-background sm:text-4xl">
            Trusted by Scholars Worldwide
          </h2>
          <p className="mt-4 text-lg leading-8 text-background/70">
            Our track record speaks for itself. Join thousands of satisfied
            researchers who have achieved their academic goals with our support.
          </p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center rounded-2xl bg-background/5 p-8 text-center backdrop-blur-sm border border-background/10"
            >
              <dt className="flex flex-col items-center gap-4">
                <div className="rounded-lg bg-primary/20 p-3">
                  <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium text-background/70">
                  {stat.name}
                </span>
              </dt>
              <dd className="mt-2 text-4xl font-bold tracking-tight text-background">
                {stat.value}
              </dd>
              <p className="mt-2 text-sm text-background/50">{stat.description}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
