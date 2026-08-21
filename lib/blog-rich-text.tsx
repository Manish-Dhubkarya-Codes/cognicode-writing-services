import { Fragment, type ReactNode } from "react";

const TOKEN =
  /\[([^\]]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s<]+)|(www\.[^\s<]+)/gi;

export function sanitizeHref(raw: string): string | null {
  const value = String(raw || "").trim();
  if (!value) return null;
  if (/^(javascript|data|vbscript):/i.test(value)) return null;
  if (/^https?:\/\//i.test(value) || value.startsWith("/") || value.startsWith("mailto:")) {
    return value;
  }
  if (/^www\./i.test(value)) return `https://${value}`;
  if (/^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}([/:?#].*)?$/i.test(value)) {
    return `https://${value}`;
  }
  return null;
}

export function LinkedText({ text }: { text: string }) {
  if (!text) return null;
  const nodes: ReactNode[] = [];
  let last = 0;
  const re = new RegExp(TOKEN.source, "gi");
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = re.exec(text))) {
    if (match.index > last) {
      nodes.push(
        <Fragment key={`t-${i++}`}>{text.slice(last, match.index)}</Fragment>
      );
    }
    const label = match[1];
    const markdownHref = match[2];
    const bareHttp = match[3];
    const bareWww = match[4];
    const href = sanitizeHref(markdownHref || bareHttp || bareWww || "");
    const visible = label || bareHttp || bareWww || href || "";
    if (href) {
      const external = /^https?:\/\//i.test(href);
      nodes.push(
        <a
          key={`a-${i++}`}
          href={href}
          className="font-medium text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {visible.replace(/[.,;:!?)]+$/, "")}
        </a>
      );
    } else {
      nodes.push(<Fragment key={`t-${i++}`}>{match[0]}</Fragment>);
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    nodes.push(<Fragment key={`t-${i++}`}>{text.slice(last)}</Fragment>);
  }

  return <>{nodes}</>;
}
