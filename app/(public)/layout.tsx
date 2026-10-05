import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ensigoflove.org"),
  title: {
    default: "Seeds of Love | Ensigo of Love | Child Sponsorship & Community Support",
    template: "%s | Seeds of Love | Ensigo of Love",
  },
  description:
    "Seeds of Love, also known as Ensigo of Love, supports vulnerable children, families, and communities through child sponsorship, care, education, and meaningful giving.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ensigoflove.org",
    siteName: "Seeds of Love | Ensigo of Love",
    title: "Seeds of Love | Ensigo of Love | Child Sponsorship & Community Support",
    description:
      "Seeds of Love, also known as Ensigo of Love, supports vulnerable children, families, and communities through child sponsorship, care, education, and meaningful giving.",
    images: [
      {
        url: "/dark-logo.jpeg",
        width: 1200,
        height: 630,
        alt: "Seeds of Love | Ensigo of Love",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seeds of Love | Ensigo of Love",
    description:
      "Seeds of Love, also known as Ensigo of Love, supports vulnerable children, families, and communities through child sponsorship, care, education, and meaningful giving.",
    images: ["/dark-logo.jpeg"],
  },
  keywords: [
    "Seeds of Love",
    "Ensigo of Love",
    "Seeds of Love Uganda",
    "charity organization",
    "child sponsorship",
    "sponsor a child",
    "support vulnerable children",
    "donate to children",
    "community support",
    "nonprofit charity",
    "education support",
    "monthly giving",
  ],
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
