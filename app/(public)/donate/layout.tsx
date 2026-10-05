import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate with Seeds of Love | Sponsor a Child in Uganda",
  description:
    "Support vulnerable children, families, and education programs in Uganda through safe, transparent giving with Seeds of Love, also known as Ensigo of Love.",
  alternates: {
    canonical: "/donate",
  },
  openGraph: {
    title: "Donate with Seeds of Love | Sponsor a Child in Uganda",
    description:
      "Make a secure donation to help provide education, care, meals, and hope for children and families in need.",
    url: "https://ensigoflove.org/donate",
  },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
