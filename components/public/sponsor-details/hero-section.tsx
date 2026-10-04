"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { SponsorshipProfile } from "@/lib/child-profile";
import { motion } from "framer-motion";
import { use, useEffect } from "react";

interface HeroSectionProps {
  profile: SponsorshipProfile;
  onSponsorClick: () => void;
}

export default function HeroSection({
  profile,
  onSponsorClick,
}: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  useEffect(() => {
    document.title = `${profile.firstName} ${profile.secondName} - Sponsor Details`;
  }, [profile]);

  return (
    <motion.section
      className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-green-50 to-lime-50 py-8 sm:py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Decorative gradient blob */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-linear-to-br from-green-200/40 to-emerald-200/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-linear-to-tr from-lime-200/30 to-green-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back button and breadcrumb */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link
            href="/donate"
            className="inline-flex items-center gap-2 rounded-full border border-green-200/50 bg-white/60 px-4 py-2 text-sm font-medium text-green-700 transition-all hover:bg-white/80 hover:border-green-300/80 backdrop-blur-sm"
          >
            <ArrowLeft size={16} />
            <span>Back to Profiles</span>
          </Link>
        </motion.div>

        {/* Main hero content */}
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_1.2fr]">
          {/* Image side */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 lg:order-1"
          >
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-white/40 shadow-2xl">
              <motion.img
                src={profile.image.url}
                alt={profile.firstName}
                className="h-96 sm:h-125 w-full object-cover"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>

            {/* Quick stats badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 lg:gap-2"
            >
              <div className="flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm px-4 py-2 shadow-md border border-white/50">
                <div className="h-2 w-2 rounded-full bg-green-600" />
                <span className="text-sm font-semibold text-gray-700">
                  {profile.gender}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm px-4 py-2 shadow-md border border-white/50">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-sm font-semibold text-gray-700">
                  {profile.class}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm px-4 py-2 shadow-md border border-white/50">
                <div className="h-2 w-2 rounded-full bg-amber-600" />
                <span className="text-sm font-semibold text-gray-700">
                  Age {profile.age}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center space-y-6"
          >
            {/* Title section */}
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
                Child Sponsorship Program
              </p>
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900"
              >
                {profile.firstName}
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-600">
                  {profile.secondName}
                </span>
              </motion.h1>
              <p className="text-lg text-gray-600 font-medium">
                {profile.givenName}
              </p>
            </div>

            {/* CTA Button */}
            <motion.button
              variants={itemVariants}
              onClick={onSponsorClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 rounded-full bg-linear-to-r from-green-600 to-emerald-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-2xl hover:from-green-700 hover:to-emerald-700 w-fit"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Sponsor {profile.firstName}</span>
            </motion.button>

            {/* Impact badge */}
            {/* <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-green-100/60 to-emerald-100/60 backdrop-blur-sm px-6 py-4 border border-green-200/50 w-fit"
            >
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    fill="none"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 45 * (profile.progress / 100)} ${2 * Math.PI * 45}`}
                      transform="rotate(-90 50 50)"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#16a34a" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-green-700">
                    {profile.progress}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                  Support Progress
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {profile.progress}% of goal reached
                </p>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
