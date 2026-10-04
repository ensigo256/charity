import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const policySections = [
  {
    title: "Information We Collect",
    body:
      "We may collect information you provide directly, such as your name, email address, phone number, donation details, sponsorship interest, and support preferences. We may also collect non-identifying technical information about how you use our website.",
  },
  {
    title: "How We Use Information",
    body:
      "We use personal information to respond to enquiries, process donations and sponsorship requests, send updates about our work, provide newsletters, and improve how we serve our community. We do not sell personal information to third parties.",
  },
  {
    title: "Sharing Information",
    body:
      "We may share personal information with trusted service providers that support our operations, such as payment processors, email providers, analytics tools, and website hosting partners. These providers are only used for necessary operational support and are expected to keep information secure.",
  },
  {
    title: "Cookies and Analytics",
    body:
      "Our website may use cookies or similar technologies to understand usage patterns, improve performance, and remember user preferences. You can choose to disable cookies in your browser settings, although some site features may be affected.",
  },
  {
    title: "Data Protection",
    body:
      "We take reasonable steps to protect personal information using secure systems, limited access, and careful handling practices. No online platform is completely risk-free, so we encourage users to protect their own passwords and personal devices.",
  },
  {
    title: "Your Rights",
    body:
      "You may request access to the personal information we hold about you, ask for corrections, or unsubscribe from communications at any time. If you want to review, update, or delete your information, please contact us using the details below.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="relative overflow-hidden bg-linear-to-r from-green-900 via-emerald-800 to-lime-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center text-white">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-green-100">
            Our Commitment
          </p>
          <h1
            style={{ fontFamily: "Quicksand" }}
            className="text-4xl font-bold sm:text-5xl lg:text-6xl"
          >
            Privacy Policy
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
            We are committed to protecting the privacy and dignity of our supporters, partners, and community members.
          </p>
        </div>
      </section>

      <section className="flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <Card className="border-border bg-white p-6 sm:p-8">
            <p className="text-base leading-8 text-foreground/80">
              This Privacy Policy explains how Seeds of Love Foundation collects, uses, safeguards, and shares personal information when you visit our website, make a donation, sign up for updates, or contact us. By using our website, you agree to the practices described here.
            </p>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {policySections.map((section) => (
              <Card key={section.title} className="border-border bg-white p-6">
                <h2
                  style={{ fontFamily: "Quicksand" }}
                  className="text-xl font-bold text-foreground"
                >
                  {section.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-foreground/75">
                  {section.body}
                </p>
              </Card>
            ))}
          </div>

          <Card className="border-border bg-green-50 p-6 sm:p-8">
            <h2
              style={{ fontFamily: "Quicksand" }}
              className="text-2xl font-bold text-foreground"
            >
              Contact Us
            </h2>
            <p className="mt-3 text-sm leading-7 text-foreground/75">
              If you have any questions about this Privacy Policy or how your information is handled, please contact us at ensigooflove@gmail.com or via our contact page.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-800"
              >
                Contact Us
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  );
}
