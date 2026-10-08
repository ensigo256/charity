"use client";

import {
  AnimatedElement,
  AnimatedContainer,
} from "@/components/motion/animated-elements";
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  review: string;
  photo?: { url?: string };
}

export function Testimonials() {
  const { data: testimonials, isLoading, isError } = useQuery<Testimonial[]>({
    queryKey: ["reviews", "public"],
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  if (isLoading || isError || !testimonials?.length) return null;

  return (
    <AnimatedElement variant="fadeInUp">
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              style={{ fontFamily: "Quicksand" }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              What People Say About Us
            </h2>
            <p
              style={{ fontFamily: "Quicksand" }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Hear from the communities and individuals whose lives have been
              transformed by our work.
            </p>
          </div>

          <AnimatedContainer staggerDelay={0.2}>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <AnimatedElement
                  key={testimonial._id}
                  variant="scaleIn"
                  delay={index * 0.1}
                >
                  <Card className="p-6 h-full bg-card border-border hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col h-full">
                      {/* Quote icon */}
                      <div className="mb-4">
                        <Quote className="w-8 h-8 text-primary/60" />
                      </div>

                      {/* Content */}
                      <p
                        style={{ fontFamily: "Quicksand" }}
                        className="text-muted-foreground mb-6 flex-1 leading-relaxed"
                      >
                        "{testimonial.review}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.photo?.url || "/user.avif"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4
                            style={{ fontFamily: "Quicksand" }}
                            className="font-semibold text-accent"
                          >
                            {testimonial.name}
                          </h4>
                          <p
                            style={{ fontFamily: "Quicksand" }}
                            className="text-sm text-muted-foreground"
                          >
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </AnimatedElement>
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </section>
    </AnimatedElement>
  );
}
