"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import SponsorDetailsContent from "@/components/public/sponsor-details-content";
import type { SponsorshipProfile } from "@/lib/child-profile";

const SponsorDetailsPageSkeleton = () => (
  <main className="min-h-screen flex flex-col bg-background">
    <div className="flex-1 p-6 sm:p-10">
      <div className="mb-8 space-y-4">
        <Skeleton className="h-10 w-72 rounded-full" />
        <Skeleton className="h-6 w-48 rounded-full" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Skeleton className="h-72 rounded-4xl" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-28 rounded-3xl" />
            <Skeleton className="h-28 rounded-3xl" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 rounded-3xl" />
          <Skeleton className="h-96 rounded-3xl" />
        </div>
      </div>
    </div>
  </main>
);

export default function SponsorDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery<SponsorshipProfile>({
    queryKey: ["children", "public", "profile", id],
  });

  const {
    data: profiles,
    isLoading: isProfilesLoading,
    error: profilesError,
  } = useQuery<SponsorshipProfile[]>({
    queryKey: ["children", "public", "profiles"],
  });

  if (isProfileLoading || isProfilesLoading) {
    return <SponsorDetailsPageSkeleton />;
  }

  if (profileError || profilesError || !profile) {
    notFound();
  }

  const relatedKids = (profiles ?? [])
    .filter(
      (item) => item.ageGroup === profile.ageGroup && item._id !== profile._id,
    )
    .slice(0, 3);

  return <SponsorDetailsContent profile={profile} relatedKids={relatedKids} />;
}
