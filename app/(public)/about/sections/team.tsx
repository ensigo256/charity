"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";

interface PublicStaffMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: { url?: string };
}

export function TeamSection() {
  const { data: members, isLoading, isError } = useQuery<PublicStaffMember[]>({
    queryKey: ["staff", "public"],
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  if (isLoading || isError || !members?.length) return null;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-section">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dedicated professionals committed to changing lives through
            education.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <Card
              key={member._id}
              className="fade-in-section pt-0 team-member-card about-card overflow-hidden bg-white text-center"
            >
              {/* Image Container */}
              <div className="relative h-58 bg-gray-200 overflow-hidden">
                <Image
                  src={member.photo?.url || "/user.avif"}
                  alt={member.name}
                  fill
                  className="object-cover image-fade-in"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-600 font-medium mt-1">
                  {member.role}
                </p>
                {member.bio ? (
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    {member.bio}
                  </p>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
