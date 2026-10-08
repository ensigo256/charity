"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { QuoteIcon } from "lucide-react";

interface PublicReview {
  _id: string;
  name: string;
  role: string;
  review: string;
  photo?: { url?: string };
}

export function TestimonialsSection() {
  const { data: reviews, isLoading, isError } = useQuery<PublicReview[]>({
    queryKey: ["reviews", "public"],
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  if (isLoading || isError || !reviews?.length) return null;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-section">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What People Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real stories from those impacted by our programs and community.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((testimonial) => (
            <Card
              key={testimonial._id}
              className="testimonial-card about-card p-8 bg-white border-l-4 border-blue-500 hover:shadow-lg"
            >
              {/* Quote Icon */}
              <QuoteIcon className="w-8 h-8 text-blue-400 mb-4" />

              {/* Quote */}
              <p className="text-lg text-gray-700 italic mb-6">
                "{testimonial.review}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={testimonial.photo?.url || "/user.avif"}
                    alt={testimonial.name}
                    fill
                    className="object-cover image-fade-in"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
