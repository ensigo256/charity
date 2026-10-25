import type { Metadata } from "next";
import { Geist, Geist_Mono, Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@/components/seo/google-analytics";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ensigooflove.org"),
  title: {
    default: "Seeds of Love | Ensigo of Love | Child Sponsorship & Community Support",
    template: "%s | Seeds of Love | Ensigo of Love",
  },
  description:
    "Seeds of Love is a charity and nonprofit organization in Uganda supporting orphans, vulnerable children, and families through child sponsorship, education, care, and community support.",
  applicationName: "Seeds of Love",
  generator: "Next.js",
  keywords: [
    "Seeds of Love",
    "Ensigo of Love",
    "Seeds of Love Uganda",
    "Ensigo of Love charity",
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
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ensigooflove.org",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/dark-logo.jpeg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/dark-logo.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/dark-logo.jpeg",
        type: "image/svg+xml",
      },
    ],
    apple: "/dark-logo.jpeg",
  },
  other: {
    "facebook-domain-verification": "",
  },
  verification: {
    google: "",
  },
  category: "nonprofit",
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Ensigo of Love" }],
  creator: "Ensigo of Love",
  publisher: "Ensigo of Love",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quicksand.className}>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
