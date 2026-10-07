import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "Payment Submitted for Verification",
  robots: { index: false, follow: false },
};

export default function StripePaymentPendingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <section className="flex flex-1 items-center px-4 py-16 sm:px-6">
        <div className="mx-auto w-full max-w-2xl border-y border-border py-10 text-center sm:py-14">
          <BadgeCheck className="mx-auto size-10 text-primary" aria-hidden="true" />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Seeds of Love
          </p>
          <h1 className="mt-3 text-3xl font-bold text-foreground">Thank you for your support</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            Returning from Stripe does not confirm that a payment was received.
            Our team will verify payments that are connected to a sponsorship pledge.
            For questions, contact us with the donor email and any pledge reference you have.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground"
          >
            Contact the team
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}