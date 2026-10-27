"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/query-client";

export default function StripePaymentButton({ token }: { token: string }) {
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState("");

  const startCheckout = async () => {
    setIsStarting(true);
    setError("");
    try {
      const response = await apiRequest(
        "POST",
        `/sponsors/stripe/payment-pages/${encodeURIComponent(token)}/attempts`,
      );
      const result = await response.json();
      const paymentUrl = new URL(result.paymentUrl);
      if (
        paymentUrl.protocol !== "https:" ||
        !["buy.stripe.com", "donate.stripe.com"].includes(
          paymentUrl.hostname.toLowerCase(),
        )
      ) {
        throw new Error("The Stripe checkout link is not valid.");
      }
      window.location.assign(paymentUrl.toString());
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to start Stripe checkout. Please try again.",
      );
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div>
      <Button
        type="button"
        className="min-h-12 w-full"
        disabled={isStarting}
        onClick={() => void startCheckout()}
      >
        {isStarting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
        {isStarting ? "Preparing secure checkout..." : "Continue to Stripe"}
      </Button>
      {error ? (
        <p role="alert" className="mt-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
