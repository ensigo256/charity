"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { SponsorshipProfile } from "@/lib/child-profile";
import type { SponsorshipFormSubmission } from "@/lib/sponsorship-form-types";
import { formatSubmissionDate } from "@/lib/sponsorship-storage";

interface SponsorshipSuccessModalProps {
  isOpen: boolean;
  submissionData: SponsorshipFormSubmission;
  childProfile: SponsorshipProfile;
}

export default function SponsorshipSuccessModal({
  isOpen,
  submissionData,
  childProfile,
}: SponsorshipSuccessModalProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    window.location.href = "/donate";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto"
      >
        <Card className="border-0 bg-white p-8 sm:p-12 rounded-4xl shadow-2xl">
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 animate-pulse bg-primary/20 rounded-full blur-xl" />
                <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-linear-to-br from-primary to-emerald-600">
                  <Check className="h-10 w-10 text-white" strokeWidth={3} />
                </div>
              </div>
            </motion.div>

            {/* Thank You Heading */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Thank You!
              </h1>
              <p className="text-lg text-muted-foreground">
                Your sponsorship is confirmed
              </p>
            </motion.div>

            {/* Confirmation Details */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid gap-4 sm:grid-cols-2 bg-background rounded-3xl p-6 my-6"
            >
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Sponsor Name
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {submissionData.sponsor.fullName}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Child selected
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {submissionData.childName}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Monthly Commitment
                </p>
                <p className="text-lg font-semibold text-primary">
                  ${submissionData.donation.amount}/
                  {submissionData.donation.period}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Submitted
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {formatSubmissionDate(submissionData.submittedAt)}
                </p>
              </div>
            </motion.div>

            {/* Sponsorship ID */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-4"
            >
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-1">
                Sponsorship ID
              </p>
              <p className="font-mono text-sm font-semibold text-foreground break-all">
                {submissionData.submissionId}
              </p>
            </motion.div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4 pt-4"
            >
              <p className="text-foreground leading-relaxed">
                Your commitment to {submissionData.childName}'s future will make
                a tremendous impact. You'll receive regular updates about their
                progress and how your sponsorship is making a difference.
              </p>
              <p className="text-sm text-muted-foreground">
                A confirmation email has been sent to{" "}
                <span className="font-semibold">
                  {submissionData.sponsor.email}
                </span>
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <Button
                onClick={handleClose}
                variant="outline"
                className="rounded-full"
              >
                Browse Other Children
              </Button>
              <Button
                onClick={handleClose}
                className="rounded-full bg-primary text-white hover:bg-green-700"
              >
                Return Home
              </Button>
            </motion.div>

            {/* Auto-redirect Notice */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs text-muted-foreground pt-2"
            >
              Redirecting in a few seconds...
            </motion.p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
