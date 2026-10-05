export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Ensigo of Love",
    url: "https://ensigoflove.org",
    logo: "https://ensigoflove.org/dark-logo.jpeg",
    description:
      "Ensigo of Love supports vulnerable children, families, and communities through child sponsorship, community outreach, education support, and compassionate giving.",
    email: "ensigooflove@gmail.com",
    telephone: "+256 705-300-671",
    sameAs: [
      "https://www.facebook.com/SeedsOfLove",
      "https://twitter.com/SeedsOfLove",
      "https://www.instagram.com/SeedsOfLove",
      "https://www.linkedin.com/company/SeedsOfLove",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gayaza Rd, Kumukaaga, Opposite kumbuzi, Kyadondo East",
      addressLocality: "Wakiso District",
      addressCountry: "UG",
    },
    areaServed: "Uganda",
    missionStatement:
      "To support vulnerable children and families with dignity, hope, and practical care.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "ensigooflove@gmail.com",
      telephone: "+256 705-300-671",
      areaServed: "UG",
      availableLanguage: ["English"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
