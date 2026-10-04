"use client";

import { useMemo, useState, useEffect } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, Filter, Heart } from "lucide-react";
import {
  AnimatedElement,
  AnimatedContainer,
} from "@/components/motion/animated-elements";
import SponsorshipCard from "@/components/public/sponsorship-card";
import { useQuery } from "@tanstack/react-query";
import { type SponsorshipProfile } from "@/lib/child-profile";

const ageGroups = ["All", "0-5", "6-12", "13-18"] as const;
const familyStatuses = ["All", "Total Orphans", "Single Parent"] as const;
const genderOptions = ["All", "Male", "Female"] as const;
const PROFILES_PER_PAGE = 6;

function matchesAgeRange(profile: SponsorshipProfile, selectedAgeGroup: (typeof ageGroups)[number]) {
  if (selectedAgeGroup === "All") return true;

  const numericAge = typeof profile.age === "number" ? profile.age : Number.NaN;
  if (!Number.isFinite(numericAge)) {
    const rawAgeGroup = typeof profile.ageGroup === "string" ? profile.ageGroup.trim() : "";
    return rawAgeGroup === selectedAgeGroup;
  }

  switch (selectedAgeGroup) {
    case "0-5":
      return numericAge >= 0 && numericAge <= 5;
    case "6-12":
      return numericAge >= 6 && numericAge <= 12;
    case "13-18":
      return numericAge >= 13 && numericAge <= 18;
    default:
      return true;
  }
}

export default function SponsorBrowsePage() {
  const { data: Profiles, isLoading, error } = useQuery<SponsorshipProfile[]>({
    queryKey: ["children", "public", "profiles"],
    refetchInterval: 10_000,
  });

  const profiles = Profiles ?? [];

  const [selectedAgeGroup, setSelectedAgeGroup] =
    useState<(typeof ageGroups)[number]>("All");
  const [selectedFamilyStatus, setSelectedFamilyStatus] =
    useState<(typeof familyStatuses)[number]>("All");
  const [selectedGender, setSelectedGender] =
    useState<(typeof genderOptions)[number]>("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedEducationLevel, setSelectedEducationLevel] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueLocations = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(
          profiles
            .map((profile) => profile.location)
            .filter((location): location is string => Boolean(location && location.trim())),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    ];
  }, [profiles]);

  const uniqueEducationLevels = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(
          profiles
            .map((profile) =>
              profile.education?.currentLevel || profile.education?.educationStage || "",
            )
            .filter((level): level is string => Boolean(level && level.trim())),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    ];
  }, [profiles]);

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const ageMatch = matchesAgeRange(profile, selectedAgeGroup);
      const statusMatch =
        selectedFamilyStatus === "All" ||
        profile.familyStatus === selectedFamilyStatus;
      const genderMatch =
        selectedGender === "All" || profile.gender === selectedGender;
      const locationMatch =
        selectedLocation === "All" || profile.location === selectedLocation;
      const educationMatch =
        selectedEducationLevel === "All" ||
        (profile.education?.currentLevel || profile.education?.educationStage || "") ===
          selectedEducationLevel;

      return ageMatch && statusMatch && genderMatch && locationMatch && educationMatch;
    });
  }, [profiles, selectedAgeGroup, selectedFamilyStatus, selectedGender, selectedLocation, selectedEducationLevel]);

  const totalOrphans = profiles.filter(
    (profile) => profile.familyStatus === "Total Orphans",
  ).length;
  const totalSingleParents = profiles.filter(
    (profile) => profile.familyStatus === "Single Parent",
  ).length;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAgeGroup, selectedFamilyStatus, selectedGender, selectedLocation, selectedEducationLevel]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProfiles.length / PROFILES_PER_PAGE),
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * PROFILES_PER_PAGE,
    currentPage * PROFILES_PER_PAGE,
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden bg-linear-to-r from-green-900 via-emerald-900 to-lime-900 py-16">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-6 text-white">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.24em] text-white/90">
                <Sparkles size={18} /> Child Sponsorship
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Meet the children who need your support
              </h1>
              <p className="max-w-2xl text-lg text-white/85">
                Browse profiles of young learners and families who are waiting
                for sponsorship. Filter by age, family situation, and click
                through to learn more about each child’s story.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur-sm">
                  <p className="text-sm uppercase tracking-[0.24em] text-white/70">
                    Children available
                  </p>
                  {isLoading ? (
                    <Skeleton className="mt-3 h-12 w-32 rounded-full bg-white/20" />
                  ) : (
                    <p className="mt-3 text-3xl font-bold text-white">
                      {profiles?.length}
                    </p>
                  )}
                </Card>
                <Card className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur-sm">
                  <p className="text-sm uppercase tracking-[0.24em] text-white/70">
                    Orphan & family support
                  </p>
                  {isLoading ? (
                    <Skeleton className="mt-3 h-12 w-32 rounded-full bg-white/20" />
                  ) : (
                    <p className="mt-3 text-3xl font-bold text-white">
                      {totalOrphans + totalSingleParents}
                    </p>
                  )}
                </Card>
              </div>
            </div>
            <div className="rounded-4xl border border-white/10 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-white/70">
                    Quick facts
                  </p>
                  <h2 className="mt-3 text-3xl font-bold">
                    Support journeys that matter
                  </h2>
                </div>
                <Heart size={32} className="text-primary" />
              </div>
              <ul className="mt-8 space-y-4 text-sm text-white/80">
                <li className="flex gap-3 leading-relaxed">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  Each sponsorship helps provide education, meals, and
                  stability.
                </li>
                <li className="flex gap-3 leading-relaxed">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  Profiles are curated to show urgent need and long-term impact.
                </li>
                <li className="flex gap-3 leading-relaxed">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  Use the filters to focus on age range or family status.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-6">
            <Card className="rounded-4xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Filter size={20} className="text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Filter profiles
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Refine by age, care situation, gender, location, and education.
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Age Group
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {ageGroups.map((group) => (
                      <button
                        key={group}
                        type="button"
                        onClick={() => setSelectedAgeGroup(group)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                          selectedAgeGroup === group
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-foreground hover:border-primary"
                        }`}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Family Status
                  </p>
                  <div className="grid gap-3">
                    {familyStatuses.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setSelectedFamilyStatus(status)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                          selectedFamilyStatus === status
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-foreground hover:border-primary"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Gender
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {genderOptions.map((gender) => (
                      <button
                        key={gender}
                        type="button"
                        onClick={() => setSelectedGender(gender)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                          selectedGender === gender
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background text-foreground hover:border-primary"
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(event) => setSelectedLocation(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  >
                    {uniqueLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Education Level
                  </label>
                  <select
                    value={selectedEducationLevel}
                    onChange={(event) => setSelectedEducationLevel(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary"
                  >
                    {uniqueEducationLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    setSelectedAgeGroup("All");
                    setSelectedFamilyStatus("All");
                    setSelectedGender("All");
                    setSelectedLocation("All");
                    setSelectedEducationLevel("All");
                  }}
                  className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                >
                  Reset Filters
                </Button>
              </div>
            </Card>

            <Card className="rounded-4xl border border-border bg-card p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                Snapshot
              </p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-3xl border border-border bg-background p-5">
                  <p className="text-sm text-muted-foreground">
                    Total children
                  </p>
                  {isLoading ? (
                    <Skeleton className="mt-2 h-10 w-24 rounded-full" />
                  ) : (
                    <p className="mt-2 text-3xl font-semibold text-foreground">
                      {filteredProfiles.length}
                    </p>
                  )}
                </div>
                <div className="rounded-3xl border border-border bg-background p-5">
                  <p className="text-sm text-muted-foreground">Total orphans</p>
                  {isLoading ? (
                    <Skeleton className="mt-2 h-10 w-24 rounded-full" />
                  ) : (
                    <p className="mt-2 text-3xl font-semibold text-foreground">
                      {totalOrphans}
                    </p>
                  )}
                </div>
                <div className="rounded-3xl border border-border bg-background p-5">
                  <p className="text-sm text-muted-foreground">
                    Single parent homes
                  </p>
                  {isLoading ? (
                    <Skeleton className="mt-2 h-10 w-24 rounded-full" />
                  ) : (
                    <p className="mt-2 text-3xl font-semibold text-foreground">
                      {totalSingleParents}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </aside>

          <div>
            <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                  Profiles
                </p>
                <h2 className="mt-3 text-3xl font-bold text-foreground">
                  Children who need sponsorship
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Showing {paginatedProfiles.length} of{" "}
                  {filteredProfiles.length} profiles on page {currentPage} of{" "}
                  {totalPages}.
                </p>
              </div>
              {/* <div className="rounded-3xl border border-border bg-card px-5 py-3 text-sm text-foreground shadow-sm">
                <p className="text-muted-foreground">Active filters</p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {selectedAgeGroup}, {selectedFamilyStatus}
                </p>
              </div> */}
            </div>

            <AnimatedContainer className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <AnimatedElement key={`skeleton-${index}`} variant="scaleIn">
                    <Card className="rounded-4xl border border-border bg-card p-6">
                      <div className="space-y-4">
                        <Skeleton className="h-44 w-full rounded-3xl" />
                        <div className="space-y-3">
                          <Skeleton className="h-6 w-3/4 rounded-full" />
                          <Skeleton className="h-4 w-1/2 rounded-full" />
                          <Skeleton className="h-10 w-full rounded-full" />
                        </div>
                      </div>
                    </Card>
                  </AnimatedElement>
                ))
              ) : error ? (
                <Card className="rounded-4xl border border-border bg-card p-10 text-center">
                  <p className="text-lg font-semibold text-foreground">
                    Profiles could not be loaded.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Please try again shortly.
                  </p>
                </Card>
              ) : filteredProfiles.length > 0 ? (
                paginatedProfiles.map((profile) => (
                  <AnimatedElement key={profile?._id} variant="scaleIn">
                    <SponsorshipCard profile={profile} />
                  </AnimatedElement>
                ))
              ) : (
                <Card className="rounded-4xl border border-border bg-card p-10 text-center">
                  <p className="text-lg font-semibold text-foreground">
                    No profiles match your filters.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Try resetting filters or choosing a different age group.
                  </p>
                </Card>
              )}
            </AnimatedContainer>

            {!isLoading && filteredProfiles.length > 0 ? (
              <div className="mt-8 flex flex-col gap-3 rounded-3xl border border-border bg-card p-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Page {currentPage} of {totalPages}
                  {filteredProfiles.length > PROFILES_PER_PAGE && (
                    <>
                      {" "}
                      — showing {paginatedProfiles.length} of{" "}
                      {filteredProfiles.length} results
                    </>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      setCurrentPage((page) => Math.min(totalPages, page + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
