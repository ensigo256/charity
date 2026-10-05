export function FAQSchema() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does child sponsorship work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Child sponsorship gives a child and their family consistent support through care, education, meals, and practical assistance. The donation provides meaningful, ongoing support that helps the child thrive in a safe and dignified environment.",
        },
      },
      {
        "@type": "Question",
        name: "Is my donation secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Ensigo of Love uses secure payment flows and a transparent giving process so supporters can contribute with confidence and clarity.",
        },
      },
      {
        "@type": "Question",
        name: "Where does the support go?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Support is directed toward program needs, child care, education, nutrition, family assistance, and community outreach activities designed to improve long-term wellbeing.",
        },
      },
      {
        "@type": "Question",
        name: "Can I support a specific child or program?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can browse available sponsorship profiles and choose the child or support area that resonates most with you.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
    />
  );
}
