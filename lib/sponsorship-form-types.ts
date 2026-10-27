import { z } from "zod";

// Zod schemas for form validation
export const sponsorBioSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10,}$/, "Phone must be at least 10 digits"),
  bio: z.string().max(1000, "Bio must be 1000 characters or less").optional(),
});

export const locationSchema = z.object({
  address: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  region: z.string().optional(),
  zipCode: z.string().optional(),
});

export const donationSchema = z.object({
  amount: z
    .number()
    .min(5, "Minimum donation is $5")
    .max(100000, "Maximum donation is $100,000"),
  period: z.enum(["Monthly", "3 Months", "6 Months", "Yearly"], {
    errorMap: () => ({ message: "Please select a sponsorship period" }),
  }),
  remindByEmail: z.boolean().default(false),
});

export const achPaymentSchema = z.object({
  achContactPhone: z.string().regex(/^\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/, "Phone must be a valid 10-digit number"),
  achContactEmail: z
    .string()
    .optional()
    .refine((val) => !val || /\S+@\S+\.\S+/.test(val), "Invalid email address"),
});

export const paymentMethodSchema = z.object({
  paymentMethod: z.enum(["stripe", "ach"], {
    errorMap: () => ({ message: "Please select a payment method" }),
  }),
});

// Combined form data type
export type SponsorData = z.infer<typeof sponsorBioSchema>;
export type LocationData = z.infer<typeof locationSchema>;
export type DonationData = z.infer<typeof donationSchema>;
export type PaymentData = Partial<z.infer<typeof achPaymentSchema>>;
export type PaymentMethodData = z.infer<typeof paymentMethodSchema>;

export interface SponsorshipFormData {
  sponsor: Partial<SponsorData>;
  location: Partial<LocationData>;
  donation: Partial<DonationData>;
  paymentMethod: Partial<PaymentMethodData>;
  payment: Partial<PaymentData>;
}

export interface SponsorshipFormSubmission extends SponsorshipFormData {
  childId: string;
  childName: string;
  submittedAt: string;
  submissionId: string;
}

// Constants
export const PRESET_AMOUNTS = [10, 50, 100, 500] as const;
export const SPONSORSHIP_PERIODS = [
  "Monthly",
  "3 Months",
  "6 Months",
  "Yearly",
] as const;

// Default form data
export const DEFAULT_FORM_DATA: SponsorshipFormData = {
  sponsor: { fullName: "", email: "", phone: "", bio: "" },
  location: { address: "", country: "", city: "", state: "", region: "", zipCode: "" },
  donation: { amount: 50, period: "Monthly", remindByEmail: false },
  paymentMethod: { paymentMethod: "stripe" },
  payment: {
    achContactPhone: "",
    achContactEmail: "",
  },
};

export function generateSubmissionId(): string {
  return `sponsor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
