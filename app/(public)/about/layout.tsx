import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Seeds of Love | Ensigo of Love",
  description:
    "Learn about Seeds of Love, also known as Ensigo of Love, and the mission, values, and community work behind our support for vulnerable children and families.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Seeds of Love | Ensigo of Love",
    description:
      "Learn about the mission, values, and community work behind Seeds of Love and Ensigo of Love.",
    url: "https://ensigoflove.org/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
