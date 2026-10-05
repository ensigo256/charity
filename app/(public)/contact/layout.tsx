import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Seeds of Love | Ensigo of Love",
  description:
    "Contact Seeds of Love, also known as Ensigo of Love, to ask questions, support our mission, or learn how you can sponsor a child or get involved.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Seeds of Love | Ensigo of Love",
    description:
      "Reach out to Seeds of Love and Ensigo of Love to learn more about sponsorship, volunteering, and giving opportunities.",
    url: "https://ensigoflove.org/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
