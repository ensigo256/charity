"use client";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { HeroSection } from "./sections/hero";
import { MissionVisionSection } from "./sections/mission-vision";
import { ValuesSection } from "./sections/values";
import { TeamSection } from "./sections/team";
import { ImpactSection } from "./sections/impact";
import { TestimonialsSection } from "./sections/testimonials";
import { OrganizationSchema } from "@/components/seo/organization-schema";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <OrganizationSchema />
      <Navbar />

      {/* Main Content */}
      <HeroSection />
      <MissionVisionSection />
      <ValuesSection />
      <TeamSection />
      <ImpactSection />
      <TestimonialsSection />

      <Footer />
    </main>
  );
}
