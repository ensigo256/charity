import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const termsSections = [
  {
    title: "Acceptance of Terms",
    body:
      "By accessing or using the Seeds of Love Foundation website, you agree to these Terms of Service. If you do not agree with any part of these terms, please do not use the website.",
  },
  {
    title: "Website Use",
    body:
      "This website is intended to share information about our mission, programs, and opportunities for support. You agree to use the website only for lawful and appropriate purposes and not to interfere with or disrupt the website or its services.",
  },
  {
    title: "Donations and Support",
    body:
      "Donations made through our website or affiliated payment channels are voluntary and are used in support of the Foundation’s programs and mission. We may update donation processes, policies, and payment details from time to time. We do not guarantee any specific outcome from any donation.",
  },
  {
    title: "Content and Intellectual Property",
    body:
      "All content on this site, including text, images, logos, and program material, is protected by intellectual property rights and is owned by or licensed to the Foundation unless otherwise stated. You may not reproduce or reuse our content without permission.",
  },
  {
    title: "Limitation of Liability",
    body:
      "Seeds of Love Foundation is committed to providing accurate information, but we do not guarantee that the site will always be error-free or uninterrupted. We shall not be liable for any loss or damage arising from the use of this website or reliance on information provided here.",
  },
  {
    title: "Changes to Terms",
    body:
      "We may update these Terms of Service from time to time to reflect changes in our operations, legal requirements, or website features. Continued use of the website after updates means you accept the revised terms.",
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="relative overflow-hidden bg-linear-to-r from-green-900 via-emerald-800 to-lime-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center text-white">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-green-100">
            Important Information
          </p>
          <h1
            style={{ fontFamily: "Quicksand" }}
            className="text-4xl font-bold sm:text-5xl lg:text-6xl"
          >
            Terms of Service
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/85 sm:text-lg">
            These terms govern how you may use our website and interact with our community and support initiatives.
          </p>
        </div>
      </section>

      <section className="flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <Card className="border-border bg-white p-6 sm:p-8">
            <p className="text-base leading-8 text-foreground/80">
              These Terms of Service apply to all visitors and users of the Seeds of Love Foundation website. By using this website, you agree to these terms and understand that the Foundation may update them periodically to reflect changes in practice, policy, or law.
            </p>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {termsSections.map((section) => (
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
              Questions?
            </h2>
            <p className="mt-3 text-sm leading-7 text-foreground/75">
              If you have questions about these terms, please contact our team through the contact page and we will be happy to help.
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
