"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type VerificationResult = {
  status?: "verified" | "duplicate" | "identity_review";
  message?: string;
  paymentMethod?: "ach" | "stripe";
  paymentPagePath?: string;
  pledge?: {
    reference: string;
    amount: number;
    currency: string;
    period: string;
  };
  emailDelivery?: { status: string };
  existingSponsorship?: { status: string; reference?: string };
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export default function SponsorEmailVerificationPage() {
  const [requestId, setRequestId] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const token = fragment.get("token") || "";
    const id = fragment.get("requestId") || "";
    setRequestId(id);
    setVerificationToken(token);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${id ? `?requestId=${encodeURIComponent(id)}` : ""}`,
    );
    if (!token) {
      setError("This verification link is missing its one-time token.");
    }
  }, []);

  const verifyEmail = async () => {
    if (!verificationToken) return;
    setIsVerifying(true);
    setError("");
    try {
      const response = await fetch(
        `${API_BASE}/sponsors/public/verification-requests/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: verificationToken }),
        },
      );
      const body = await response.json() as VerificationResult;
      if (!response.ok && response.status !== 202 && body.status !== "duplicate") {
        throw new Error(body.message || "This verification link is invalid or expired.");
      }
      if (body.status === "duplicate") {
        setResult(body);
        setVerificationToken("");
        return;
      }
      if (body.paymentMethod === "stripe" && body.paymentPagePath) {
        if (!/^\/pay\/[A-Za-z0-9_-]{40,60}$/.test(body.paymentPagePath)) {
          throw new Error("The secure payment page was not returned by the server.");
        }
        window.location.assign(body.paymentPagePath);
        return;
      }
      setResult(body);
      setVerificationToken("");
    } catch (verificationError) {
      setError(
        verificationError instanceof Error
          ? verificationError.message
          : "Unable to verify this email.",
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const resendVerification = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!requestId || !email.trim()) return;
    setIsResending(true);
    setError("");
    try {
      const response = await fetch(
        `${API_BASE}/sponsors/public/verification-requests/resend`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requestId, email: email.trim().toLowerCase() }),
        },
      );
      const body = await response.json();
      if (!response.ok) throw new Error(body.message || "Unable to resend the link.");
      setError(body.message || "If the request can be resent, a new link will arrive shortly.");
    } catch (resendError) {
      setError(
        resendError instanceof Error ? resendError.message : "Unable to resend the link.",
      );
    } finally {
      setIsResending(false);
    }
  };

  const identityReview = result?.status === "identity_review";
  const duplicate = result?.status === "duplicate";

  return (
    <main className="mx-auto flex min-h-[65vh] max-w-2xl items-center px-5 py-16">
      <section className="w-full space-y-5 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Sponsor email verification
        </p>
        <h1 className="text-2xl font-bold text-foreground">
          {isVerifying
            ? "Verifying your email..."
            : verificationToken
              ? "Confirm your email address"
            : identityReview
              ? "Email verified; review needed"
              : duplicate
                ? "Existing sponsorship found"
                : result?.status === "verified"
                  ? "Email verified"
                  : "Verification could not be completed"}
        </h1>

        {isVerifying ? (
          <p className="text-sm text-muted-foreground" aria-live="polite">
            We are verifying the one-time link. No payment will begin until this step succeeds.
          </p>
        ) : null}
        {!isVerifying && verificationToken ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Confirm your email to create the sponsor relationship and continue to payment.
              This link is single-use and expires after 24 hours.
            </p>
            <Button type="button" onClick={verifyEmail}>
              Verify email and continue
            </Button>
          </div>
        ) : null}

        {identityReview ? (
          <p className="text-sm text-muted-foreground">
            {result.message} The team will follow up using the contact details you provided.
          </p>
        ) : null}

        {duplicate ? (
          <p className="text-sm text-muted-foreground">
            {result.message} Existing relationship status: {result.existingSponsorship?.status || "Pending or active"}.
            Contact the organization if you intended to make an additional contribution.
          </p>
        ) : null}

        {result?.status === "verified" && result.paymentMethod === "ach" ? (
          <div className="space-y-2 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-950">
            <p className="font-semibold">Your pledge is ready</p>
            <p className="text-sm">
              Reference: {result.pledge?.reference || "Pending"}
            </p>
            <p className="text-sm">
              {result.emailDelivery?.status === "sent"
                ? "Transfer instructions were sent to your email."
                : "We could not confirm delivery of your transfer instructions. Please contact the organization before sending funds."}
            </p>
          </div>
        ) : null}

        {error ? (
          <div className="space-y-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950" role="alert">
            <p>{error}</p>
            {requestId && !result ? (
              <form onSubmit={resendVerification} className="space-y-2">
                <label htmlFor="verification-email" className="block font-medium">
                  Email used for the pledge
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    id="verification-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <Button type="submit" disabled={isResending}>
                    {isResending ? "Sending..." : "Resend link"}
                  </Button>
                </div>
              </form>
            ) : null}
          </div>
        ) : null}

        <Button asChild variant="outline">
          <Link href="/donate">Back to sponsorships</Link>
        </Button>
      </section>
    </main>
  );
}
