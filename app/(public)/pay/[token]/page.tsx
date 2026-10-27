import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import StripePaymentButton from "@/components/public/stripe-payment-button";

export const metadata: Metadata = {
  title: "Complete Your Sponsorship Payment",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

interface PaymentPageDetails {
  amount: number;
  currency: string;
  cadence: string;
  childName: string;
  dueDate: string;
  pledgeReference: string;
}

async function getPaymentPageDetails(token: string): Promise<PaymentPageDetails | null> {
  const apiBase =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:5000/api";
  const response = await fetch(
    `${apiBase}/sponsors/stripe/payment-pages/${encodeURIComponent(token)}`,
    { cache: "no-store" },
  );
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error("Unable to load payment information. Please try again later.");
  }
  return response.json();
}

export default async function StripePaymentPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const details = await getPaymentPageDetails(token);
  if (!details) notFound();

  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: details.currency || "USD",
  }).format(details.amount);

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <section className="flex flex-1 items-center px-4 py-12 sm:px-6">
        <div className="mx-auto w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Sponsorship payment
          </p>
          <h1 className="mt-3 text-3xl font-bold text-foreground">
            Complete your payment
          </h1>
          <p className="mt-3 text-muted-foreground">
            This is a one-time Stripe payment for your {details.cadence} pledge
            supporting {details.childName}.
          </p>

          <div className="my-7 rounded-lg bg-muted/50 p-5">
            <p className="text-sm text-muted-foreground">Please pay this amount only</p>
            <p className="mt-1 text-3xl font-bold text-foreground">{amount}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Pledge reference: {details.pledgeReference}
            </p>
          </div>

          <div className="mb-6 space-y-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <p>
              Please enter only the amount shown above in Stripe. Extra funds
              will not be applied to this sponsorship. To change your pledge,
              contact management at{" "}
              <a className="font-semibold underline" href="mailto:info@ensigooflove.org">
                info@ensigooflove.org
              </a>{" "}
              before paying.
            </p>
            <p>
              Clicking Continue creates a payment attempt for staff to verify;
              it does not confirm that a payment was made. After Stripe
              confirms checkout, you may close the Stripe page. Staff will
              verify the payment manually before updating your sponsorship.
            </p>
          </div>

          <StripePaymentButton token={token} />
          <p className="mt-5 text-center text-xs text-muted-foreground">
            Need help?{" "}
            <Link href="/contact" className="underline underline-offset-2">
              Contact our team
            </Link>
            .
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
