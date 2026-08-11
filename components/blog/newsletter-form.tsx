"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { postData } from "@/app/server/fetch-beckend-services";
import { Loader2, CheckCircle2 } from "lucide-react";

type NewsletterFormProps = {
  variant?: "dark" | "light";
  source?: string;
};

export function NewsletterForm({
  variant = "dark",
  source = "blog",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const result = await postData("blog/subscribe", { email, source });
      if (result?.success === false) {
        setError(result.message || "Unable to subscribe right now.");
      } else {
        setDone(true);
        setEmail("");
      }
    } catch {
      setDone(true);
      setEmail("");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div
        className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm ${
          variant === "dark"
            ? "bg-white/10 text-white"
            : "bg-primary/10 text-primary"
        }`}
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        <span>Thanks for subscribing. Watch your inbox for research tips.</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-2.5 sm:flex-row sm:gap-3"
    >
      <div className="min-w-0 flex-1">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your academic email"
          aria-label="Email address"
          className={
            variant === "dark"
              ? "h-11 w-full border-0 bg-white text-sm text-foreground placeholder:text-muted-foreground sm:h-12 sm:text-base"
              : "h-11 w-full text-sm sm:h-12 sm:text-base"
          }
        />
        {error ? (
          <p className="mt-2 text-left text-xs text-red-200 sm:text-red-600">
            {error}
          </p>
        ) : null}
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={loading}
        variant={variant === "dark" ? "secondary" : "default"}
        className="h-11 w-full shrink-0 sm:h-12 sm:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Subscribing
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}
