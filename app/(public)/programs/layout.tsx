import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seeds of Love Programs & Impact",
  description:
    "Explore the programs and impact of Seeds of Love, also known as Ensigo of Love, through child sponsorship, education support, and community care.",
  alternates: {
    canonical: "/programs",
  },
  openGraph: {
    title: "Seeds of Love Programs & Impact",
    description:
      "Learn how Seeds of Love and Ensigo of Love support children and families through community-focused programs and impact-driven care.",
    url: "https://ensigoflove.org/programs",
  },
};

export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
