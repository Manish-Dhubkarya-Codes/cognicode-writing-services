import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ExternalLink,
} from "lucide-react";
import { companySocials } from "@/lib/company-socials";
import { cn } from "@/lib/utils";

const iconMap = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
} as const;

type SocialFollowProps = {
  variant?: "row" | "stack" | "pills";
  className?: string;
  showLabels?: boolean;
};

export function SocialFollow({
  variant = "row",
  className,
  showLabels = true,
}: SocialFollowProps) {
  if (variant === "pills") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {companySocials.map((social) => {
          const Icon = iconMap[social.id as keyof typeof iconMap] || ExternalLink;
          return (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
            >
              <Icon className="h-3.5 w-3.5" />
              {social.name}
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === "stack") {
    return (
      <div className={cn("space-y-2", className)}>
        {companySocials.map((social) => {
          const Icon = iconMap[social.id as keyof typeof iconMap] || ExternalLink;
          return (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-border/80 bg-background px-3 py-2.5 transition-all hover:border-primary/25 hover:bg-muted/40"
            >
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br text-white",
                  social.color
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">{social.name}</p>
                {showLabels ? (
                  <p className="truncate text-xs text-muted-foreground">
                    {social.handle} · {social.description}
                  </p>
                ) : null}
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {companySocials.map((social) => {
        const Icon = iconMap[social.id as keyof typeof iconMap] || ExternalLink;
        return (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-sm transition-transform hover:scale-105",
              social.color
            )}
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
