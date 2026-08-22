export function isPdfFile(url?: string, fileType?: string, name?: string) {
  const hay = `${url || ""} ${fileType || ""} ${name || ""}`.toLowerCase();
  return hay.includes("application/pdf") || hay.includes(".pdf") || /(^|[^a-z])pdf([^a-z]|$)/.test(hay);
}

export function fileOpenProps(
  url: string,
  opts?: { fileType?: string; name?: string }
) {
  if (isPdfFile(url, opts?.fileType, opts?.name)) {
    return {
      href: url,
      target: "_blank" as const,
      rel: "noopener noreferrer",
    };
  }
  return {
    href: url,
    download: opts?.name || true,
  };
}
