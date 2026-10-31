"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5454/api";

type UnsubscribeState = "idle" | "loading" | "success" | "error";

export default function NewsletterUnsubscribePage() {
  const [state, setState] = useState<UnsubscribeState>("idle");
  const [message, setMessage] = useState("Confirm below to stop receiving newsletter emails.");

  async function unsubscribe() {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      setState("error");
      setMessage("This unsubscribe link is missing a valid token.");
      return;
    }
    setState("loading");
    setMessage("Updating your newsletter preferences...");
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter/unsubscribe/${encodeURIComponent(token)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Unable to unsubscribe right now.");
      setState("success");
      setMessage(data.message || "You have been unsubscribed from the newsletter.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Unable to unsubscribe right now.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-lg rounded-lg border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">
          {state === "loading" ? "Updating preferences" : state === "success" ? "You are unsubscribed" : state === "idle" ? "Confirm unsubscribe" : "Unsubscribe unavailable"}
        </h1>
        <p className="mt-4 text-muted-foreground" role={state === "error" ? "alert" : "status"}>
          {message}
        </p>
        {state !== "success" && (
          <Button className="mt-6" onClick={unsubscribe} disabled={state === "loading"}>
            {state === "loading" ? "Unsubscribing..." : "Unsubscribe"}
          </Button>
        )}
        <Button asChild className="mt-3">
          <Link href="/">Return to homepage</Link>
        </Button>
      </section>
    </main>
  );
}
