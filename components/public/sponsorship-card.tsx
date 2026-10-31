import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  getChildDisplayName,
  type SponsorshipProfile,
} from "@/lib/child-profile";

interface SponsorshipCardProps {
  profile: SponsorshipProfile;
}

export default function SponsorshipCard({ profile }: SponsorshipCardProps) {
  return (
    <Link href={`/donate/${profile._id}`} className="group">
      <Card className="overflow-hidden pt-0 w-full rounded-3xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-t-3xl bg-muted p-3">
          <img
            src={profile.image.url}
            alt={getChildDisplayName(profile)}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="space-y-4 p-6">
          <div>
            <h3 className="text-xl font-bold text-accent transition-colors group-hover:text-primary">
              {getChildDisplayName(profile)}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Age {profile.age} • {profile.school}
            </p>
            <p className="mt-2 text-sm font-medium text-primary">
              {profile.sponsorCount
                ? `${profile.sponsorCount} current ${profile.sponsorCount === 1 ? "sponsor" : "sponsors"} - additional support welcome`
                : "Sponsorship support welcome"}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm text-foreground/70">
            <span>{profile.location}</span>
            <span className="font-semibold text-primary">See details</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
