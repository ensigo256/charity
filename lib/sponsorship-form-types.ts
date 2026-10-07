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

export const paymentSchema = z.object({
  cardName: z.string().min(3, "Cardholder name must be at least 3 characters"),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must be 16 digits")
    .refine((val) => luhnCheck(val), "Invalid card number"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format")
    .refine((val) => !isExpired(val), "Card has expired"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3-4 digits"),
});

export const zellePaymentSchema = z.object({
  zelleName: z.string().min(2, "Full name must be at least 2 characters"),
  zellePhone: z.string().regex(/^\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/, "Phone must be a valid 10-digit number"),
});

export const checkPaymentSchema = z.object({
  checkEmail: z
    .string()
    .optional()
    .refine((val) => !val || /\S+@\S+\.\S+/.test(val), "Invalid email address"),
  checkAddress: z.string().min(5, "Address must be at least 5 characters"),
  checkDescription: z.string().optional(),
});

export const achPaymentSchema = z.object({
  achContactPhone: z.string().regex(/^\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/, "Phone must be a valid 10-digit number"),
  achContactEmail: z
    .string()
    .optional()
    .refine((val) => !val || /\S+@\S+\.\S+/.test(val), "Invalid email address"),
});

export const paymentMethodSchema = z.object({
  paymentMethod: z.enum(['zelle', 'stripe', 'check', 'paypal', 'ach', 'card'], {
    errorMap: () => ({ message: "Please select a payment method" }),
  }),
});

// Combined form data type
export type SponsorData = z.infer<typeof sponsorBioSchema>;
export type LocationData = z.infer<typeof locationSchema>;
export type DonationData = z.infer<typeof donationSchema>;
export type PaymentData = z.infer<typeof paymentSchema> &
  Partial<z.infer<typeof zellePaymentSchema>> &
  Partial<z.infer<typeof checkPaymentSchema>> &
  Partial<z.infer<typeof achPaymentSchema>>;
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
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    zelleName: "",
    zellePhone: "",
    checkEmail: "",
    checkAddress: "",
    checkDescription: "",
    achContactPhone: "",
    achContactEmail: "",
  },
};

// Helper functions
export function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length !== 16) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

export function isExpired(expiry: string): boolean {
  const [month, year] = expiry.split("/");
  const expiryDate = new Date(2000 + parseInt(year, 10), parseInt(month, 10), 0);
  return expiryDate < new Date();
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  const chunks = digits.match(/.{1,4}/g) || [];
  return chunks.join(" ");
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  }
  return digits;
}

export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length >= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
  if (digits.length >= 3) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return digits;
}

export function maskCardNumber(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 4) return cardNumber;
  const last4 = digits.slice(-4);
  return `**** **** **** ${last4}`;
}

export function generateSubmissionId(): string {
  return `sponsor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
