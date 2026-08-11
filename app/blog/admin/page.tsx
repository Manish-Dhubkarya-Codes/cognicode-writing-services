"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

/**
 * Old /blog/admin route - permanently redirects to /blog/manage
 * so browsers cannot keep a broken cached admin bundle.
 */
export default function BlogAdminRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/blog/manage/");
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        Redirecting to the new Blog Manage page…
      </p>
      <a href="/blog/manage/" className="text-sm text-primary underline">
        Click here if not redirected
      </a>
    </div>
  );
}
