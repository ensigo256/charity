import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ensigooflove.org"),
  title: {
    default:
      "Seeds of Love | Ensigo of Love | Child Sponsorship & Community Support",
    template: "%s | Seeds of Love | Ensigo of Love",
  },

  description:
    "Seeds of Love is a charity and nonprofit organization in Uganda supporting orphans, vulnerable children, and families through child sponsorship, education, care, and community support.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ensigooflove.org",
    siteName: "Seeds of Love | Ensigo of Love",
    title:
      "Seeds of Love | Ensigo of Love | Child Sponsorship & Community Support",
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
    "charity in Uganda",
    "charities in Uganda",
    "charity organization in Uganda",
    "charity foundation in Uganda",
    "NGOs in Uganda",
    "NGO in Uganda",
    "nonprofit organizations in Uganda",
    "orphan support in Uganda",
    "orphans in Uganda",
    "help orphans in Uganda",
    "support children in Uganda",
    "help in Africa",
    "donate to charity in Uganda",
    "donation for orphans in Uganda",
    "children's charity Uganda",
    "orphanage charity Uganda",
    "foundation in Uganda",
    "child sponsorship Uganda",
    "community support Uganda",
    "education support Uganda",
    "support vulnerable children in Uganda",
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
