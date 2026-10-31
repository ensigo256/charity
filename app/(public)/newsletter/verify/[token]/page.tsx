"use client";

import Link from "next/link";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5454/api";

type VerificationState = "idle" | "loading" | "success" | "error";

export default function NewsletterVerificationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const [state, setState] = useState<VerificationState>("idle");
  const [message, setMessage] = useState("Confirm the link below to activate your newsletter subscription.");

  async function verify() {
    setState("loading");
    setMessage("Confirming your newsletter subscription...");
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter/verify/${encodeURIComponent(token)}`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "This verification link is invalid or expired.");
      setState("success");
      setMessage(data.message || "Your newsletter subscription has been confirmed.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Unable to verify your subscription.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-lg rounded-lg border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">
          {state === "loading" ? "Confirming subscription" : state === "success" ? "Subscription confirmed" : "Verification unavailable"}
        </h1>
        <p className="mt-4 text-muted-foreground" role={state === "error" ? "alert" : "status"}>
          {message}
        </p>
        {state !== "success" && (
          <Button className="mt-6" onClick={verify} disabled={state === "loading"}>
            {state === "loading" ? "Confirming..." : "Confirm subscription"}
          </Button>
        )}
        <Button asChild className="mt-3">
          <Link href="/">Return to homepage</Link>
        </Button>
      </section>
    </main>
  );
}
