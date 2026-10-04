"use client";

import { useState } from "react";
import type { SponsorshipProfile } from "@/lib/child-profile";
import SponsorshipFormModal from "@/components/public/sponsorship-form-modal";
import HeroSection from "@/components/public/sponsor-details/hero-section";
import ProfileSection from "@/components/public/sponsor-details/profile-section";
import { ProfileFieldGroup } from "@/components/public/sponsor-details/profile-field";
import ImpactMetrics from "@/components/public/sponsor-details/impact-metrics";
import RelatedProfiles from "@/components/public/sponsor-details/related-profiles";
import { Button } from "@/components/ui/button";
import { downloadChildPoster } from "@/lib/child-poster";
import {
  User,
  Calendar,
  Globe,
  MapPin,
  Book,
  Users,
  Heart,
  Sparkles,
  Banknote,
  Download,
  Loader2,
} from "lucide-react";

interface SponsorDetailsContentProps {
  profile: SponsorshipProfile;
  relatedKids: SponsorshipProfile[];
}

export default function SponsorDetailsContent({
  profile,
  relatedKids,
}: SponsorDetailsContentProps) {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "education" | "family"
  >("overview");
  const [isDownloadingPoster, setIsDownloadingPoster] = useState(false);
  const [posterError, setPosterError] = useState("");

  const handleDownloadPoster = async () => {
    setIsDownloadingPoster(true);
    setPosterError("");
    try {
      await downloadChildPoster(profile);
    } catch (error) {
      console.error("Unable to create child profile poster:", error);
      setPosterError("Unable to create the poster. Please try again.");
    } finally {
      setIsDownloadingPoster(false);
    }
  };

  const needsList = Array.isArray(profile.needs)
    ? profile.needs
    : typeof profile.needs === "string"
      ? profile.needs.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

  const education = profile.education || {};
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "education", label: "Education" },
    { key: "family", label: "Family" },
  ] as const;

  const renderOverview = () => (
    <div className="grid gap-8 lg:gap-12 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <ProfileSection title="Personal Details" icon={<User size={20} />} delay={0.1}>
          <ProfileFieldGroup
            fields={[
              { label: "Given Name", value: profile.givenName, icon: <User size={16} /> },
              { label: "Gender", value: profile.gender, icon: <Sparkles size={16} /> },
              { label: "Age", value: `${profile.age} years old`, icon: <Sparkles size={16} /> },
              { label: "Class/Grade", value: profile.class, icon: <Book size={16} /> },
              { label: "Nationality", value: profile.nationality, icon: <Globe size={16} /> },
            ]}
            columns={2}
          />
        </ProfileSection>

        <ProfileSection title="About the child" icon={<Sparkles size={20} />} delay={0.3}>
          <div className="space-y-6">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-600">
                Background & Story
              </p>
              <p className="text-base leading-relaxed text-gray-700">
                {profile.background || "No background information provided yet."}
              </p>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-600">
                Why support is needed
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                {needsList.length > 0 ? (
                  needsList.map((need, index) => (
                    <li key={`${need}-${index}`} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                      <span>{need}</span>
                    </li>
                  ))
                ) : (
                  <li>No need details provided yet.</li>
                )}
              </ul>
            </div>
          </div>
        </ProfileSection>
      </div>

      <div className="space-y-6">
        <ProfileSection title="Quick Facts" delay={0.3}>
          <div className="space-y-4">
            <div className="rounded-lg border border-amber-200/50 bg-linear-to-br from-amber-50 to-orange-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                Age Group
              </p>
              <p className="mt-2 text-xl font-bold text-gray-900">{profile.ageGroup}</p>
            </div>
            <div className="rounded-lg border border-purple-200/50 bg-linear-to-br from-purple-50 to-pink-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-700">
                Status
              </p>
              <p className="mt-2 text-xl font-bold text-gray-900">{profile.familyStatus}</p>
            </div>
          </div>
        </ProfileSection>

        <ProfileSection title="Sponsorship Details" icon={<Banknote size={20} />} delay={0.4}>
          <ProfileFieldGroup
            fields={[
              { label: "Monthly Support Need", value: profile.monthlyNeed, icon: <Banknote size={16} /> },
              { label: "Location", value: profile.location, icon: <MapPin size={16} /> },
            ]}
            columns={1}
          />
        </ProfileSection>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <ProfileSection title="Education tracking" icon={<Book size={20} />} delay={0.1}>
        <ProfileFieldGroup
          fields={[
            { label: "Current Level", value: education.currentLevel || "Not provided", icon: <Book size={16} /> },
            { label: "Current Class", value: education.currentClass || "Not provided", icon: <Book size={16} /> },
            { label: "School", value: education.schoolName || profile.school || "Not provided", icon: <Book size={16} /> },
            { label: "Academic Year", value: education.academicYear || "Not provided", icon: <Calendar size={16} /> },
            { label: "Expected Graduation", value: education.expectedGraduationYear || "Not provided", icon: <Calendar size={16} /> },
          ]}
          columns={2}
        />
      </ProfileSection>
    </div>
  );

  const renderFamily = () => (
    <div className="grid gap-8 lg:grid-cols-2">
      <ProfileSection title="Family & support" icon={<Users size={20} />} delay={0.1}>
        <ProfileFieldGroup
          fields={[
            { label: "Family Status", value: profile.familyStatus, icon: <Heart size={16} /> },
            { label: "Number of Parents", value: profile.numberOfParents, icon: <Users size={16} /> },
            { label: "School", value: profile.school, icon: <Book size={16} /> },
            { label: "Location", value: profile.location, icon: <MapPin size={16} /> },
          ]}
          columns={2}
        />
      </ProfileSection>

      <ProfileSection title="Guardian information" icon={<User size={20} />} delay={0.2}>
        <ProfileFieldGroup
          fields={[
            { label: "Guardian Name", value: profile.guardianName || "Not provided", icon: <User size={16} /> },
            { label: "Guardian Contact", value: profile.guardianContact || "Not provided", icon: <User size={16} /> },
            { label: "Relationship", value: profile.guardianRelation || "Not provided", icon: <Users size={16} /> },
          ]}
          columns={1}
        />
      </ProfileSection>
    </div>
  );

  return (
    <>
      <main className="min-h-screen bg-white">
        <HeroSection profile={profile} onSponsorClick={() => setIsFormModalOpen(true)} />

        <section className="relative py-8 sm:py-10 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm text-muted-foreground">
                Download a concise copy of this publicly shared profile to review offline.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={handleDownloadPoster}
                disabled={isDownloadingPoster || !profile.publicPosterApproved}
              >
                {isDownloadingPoster ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Download className="mr-2 size-4" />
                )}
                {isDownloadingPoster
                  ? "Preparing poster..."
                  : profile.publicPosterApproved
                    ? "Download profile poster"
                    : "Profile poster not yet approved"}
              </Button>
            </div>
            {!profile.publicPosterApproved ? (
              <p className="mb-4 text-xs text-muted-foreground">
                This profile is not currently approved for offline export.
              </p>
            ) : null}
            {posterError ? (
              <p role="alert" className="mb-4 text-sm text-destructive">
                {posterError}
              </p>
            ) : null}
            <div className="mb-8 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-slate-600 hover:bg-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-8">
              {activeTab === "overview" && renderOverview()}
              {activeTab === "education" && renderEducation()}
              {activeTab === "family" && renderFamily()}
            </div>
          </div>
        </section>

        <ImpactMetrics profile={profile} />

        {relatedKids.length > 0 && (
          <RelatedProfiles profiles={relatedKids} currentProfileId={profile._id} />
        )}
      </main>

      <SponsorshipFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        childProfile={profile}
      />
    </>
  );
}
