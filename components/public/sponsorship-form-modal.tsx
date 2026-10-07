"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Loader2, Upload, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SponsorshipProfile } from "@/lib/child-profile";
import { apiRequest } from "@/lib/query-client";
import { uploadImageToCloudinary } from "@/lib/cloudinary-upload";

interface SponsorshipFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  childProfile: SponsorshipProfile;
}

interface SponsorFormValues {
  name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  state: string;
  region: string;
  zipCode: string;
  bio: string;
  amount: string;
  period: "Monthly" | "3 Months" | "6 Months" | "Yearly";
  paymentMethod: "ach" | "stripe";
  remindByEmail: boolean;
  image: { url: string; public_id: string };
}

interface PledgeReceipt {
  reference: string;
  amount: number;
  currency: string;
  period: string;
  emailDelivery: { status: string; attempts: number };
}

const initialForm: SponsorFormValues = {
  name: "",
  email: "",
  phone: "",
  country: "",
  address: "",
  city: "",
  state: "",
  region: "",
  zipCode: "",
  bio: "",
  amount: "50",
  period: "Monthly",
  paymentMethod: "stripe",
  remindByEmail: true,
  image: { url: "", public_id: "" },
};

const locationFields = [
  ["address", "Address"],
  ["country", "Country of origin"],
  ["city", "City"],
  ["state", "State"],
  ["region", "Region"],
  ["zipCode", "Zip code"],
] as const;

export default function SponsorshipFormModal({
  isOpen,
  onClose,
  childProfile,
}: SponsorshipFormModalProps) {
  const [form, setForm] = useState<SponsorFormValues>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [receipt, setReceipt] = useState<PledgeReceipt | null>(null);
  const [copied, setCopied] = useState(false);
  const requestId = useRef("");

  useEffect(() => {
    if (!isOpen) return;
    requestId.current = crypto.randomUUID();
    setForm(initialForm);
    setErrors({});
    setSubmitError("");
    setReceipt(null);
    setCopied(false);
  }, [isOpen]);

  const updateField = <K extends keyof SponsorFormValues>(
    field: K,
    value: SponsorFormValues[K],
  ) => setForm((current) => ({ ...current, [field]: value }));

  const handleImageUpload = async (file?: File) => {
    if (!file) return;
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 5 * 1024 * 1024
    ) {
      setSubmitError("Choose a JPEG, PNG, or WebP image up to 5 MB.");
      return;
    }

    setIsUploadingImage(true);
    setSubmitError("");
    try {
      const uploaded = await uploadImageToCloudinary(file);
      updateField("image", {
        url: String(uploaded.secure_url || ""),
        public_id: String(uploaded.public_id || ""),
      });
    } catch (error) {
      console.error("Sponsor image upload failed:", error);
      setSubmitError("Unable to upload that photo. Please try again.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Enter the sponsor's full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) nextErrors.phone = "Enter a phone number.";
    const amount = Number(form.amount);
    if (!Number.isFinite(amount) || amount < 5 || amount > 100000) {
      nextErrors.amount = "Enter an amount from $5 to $100,000.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    if (!validate() || isUploadingImage) return;

    setIsSubmitting(true);
    try {
      if (!requestId.current) requestId.current = crypto.randomUUID();

      const payload = {
        requestId: requestId.current,
        profile: {
          fullName: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          bio: form.bio.trim(),
          country: form.country.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          region: form.region.trim(),
          zipCode: form.zipCode.trim(),
        },
        location: {
          address: form.address.trim(),
          country: form.country.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          region: form.region.trim(),
          zipCode: form.zipCode.trim(),
        },
        image: form.image.url ? form.image : undefined,
        donation: {
          amount: Number(form.amount),
          period: form.period,
          remindByEmail: form.remindByEmail,
        },
        paymentMethod: form.paymentMethod,
        childId: childProfile._id,
        child: childProfile._id,
        sponsor: {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
        },
      };

      const endpoint = form.paymentMethod === "stripe"
        ? "/sponsors/stripe/payment-link-pledges"
        : "/sponsors/public/pledges";
      const response = await apiRequest("POST", endpoint, payload);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Unable to submit this pledge.");
      }

      if (form.paymentMethod === "stripe") {
        if (!result.paymentUrl) {
          throw new Error("The Stripe Payment Link was not returned by the server.");
        }

        const paymentUrl = new URL(result.paymentUrl);
        if (paymentUrl.protocol !== "https:") {
          throw new Error("The Stripe Payment Link is not secure.");
        }
        window.location.assign(paymentUrl.toString());
        return;
      }

      setReceipt({
        reference: result.pledge.reference,
        amount: result.pledge.amount,
        currency: result.pledge.currency,
        period: result.pledge.period,
        emailDelivery: result.emailDelivery || { status: "unknown", attempts: 0 },
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit this pledge. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyReference = async () => {
    if (!receipt) return;
    try {
      await navigator.clipboard.writeText(receipt.reference);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setSubmitError("Could not copy the reference. Please select and copy it.");
    }
  };

  const childName = `${childProfile.firstName} ${childProfile.secondName}`.trim();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto bg-card p-0">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-5 py-4 backdrop-blur sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Child sponsorship
            </p>
            <h2 className="mt-1 text-xl font-bold text-foreground">
              {receipt ? "Pledge submitted" : "Sponsor profile and pledge"}
            </h2>
          </div>
          <Button type="button" variant="ghost" size="icon" aria-label="Close sponsorship form" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>

        {receipt ? (
          <section className="space-y-6 p-5 sm:p-8" aria-live="polite">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 text-emerald-950">
              <div className="flex items-center gap-3">
                <Check className="size-5 shrink-0" />
                <div>
                  <h3 className="font-semibold">Your pledge is awaiting transfer verification</h3>
                  <p className="mt-1 text-sm">The child is not reserved until staff confirm the funds arrived.</p>
                </div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-border p-4">
                <p className="text-xs uppercase text-muted-foreground">Child</p>
                <p className="mt-1 font-semibold">{childName}</p>
              </div>
              <div className="rounded-md border border-border p-4">
                <p className="text-xs uppercase text-muted-foreground">Pledge</p>
                <p className="mt-1 font-semibold">{receipt.currency} {receipt.amount} / {receipt.period}</p>
              </div>
              <div className="rounded-md border border-border p-4">
                <p className="text-xs uppercase text-muted-foreground">Reference</p>
                <div className="mt-1 flex items-center gap-2">
                  <code className="break-all text-sm">{receipt.reference}</code>
                  <Button type="button" variant="ghost" size="icon" onClick={copyReference} aria-label="Copy pledge reference">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border p-5">
              <h3 className="font-semibold text-foreground">Transfer instructions</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {receipt.emailDelivery.status === "sent"
                  ? `Transfer steps were emailed to ${form.email}. Check your inbox and spam folder. Use the pledge reference above when you initiate the transfer.`
                  : receipt.emailDelivery.status === "failed"
                    ? "Your pledge was recorded, but the instruction email could not be sent. Please contact the organization and provide the pledge reference above before making a transfer."
                    : "Your pledge was recorded, but we could not confirm the instruction email status. Contact the organization and provide the pledge reference above before making a transfer."}
              </p>
            </div>
            <Button type="button" variant="outline" onClick={onClose}>Close</Button>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 p-5 sm:p-8">
            <section className="rounded-lg border border-border bg-muted/30 p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <img src={childProfile.image?.url || "/no-images3.png"} alt={childName} className="h-24 w-24 rounded-md object-cover" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Child profile</p>
                  <h3 className="mt-1 text-xl font-bold text-foreground">{childName}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {childProfile.ageGroup ? `Age ${childProfile.ageGroup}` : "Child sponsorship"}
                    {childProfile.location ? ` · ${childProfile.location}` : ""}
                  </p>
                  {childProfile.background ? <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/80">{childProfile.background}</p> : null}
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                This pledge is for the child shown above. <Link href="/donate" onClick={onClose} className="font-medium text-primary underline">Return to the child list</Link> to select someone else.
              </p>
            </section>

            <section className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Sponsor basics</h3>
                <p className="text-sm text-muted-foreground">Use the same details the organization records for sponsor profiles.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="publicSponsorName">Full name</Label>
                  <Input className="bg-background" id="publicSponsorName" value={form.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} />
                  {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publicSponsorEmail">Email</Label>
                  <Input className="bg-background" id="publicSponsorEmail" type="email" autoComplete="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} aria-invalid={Boolean(errors.email)} />
                  {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publicSponsorPhone">Phone</Label>
                  <Input className="bg-background" id="publicSponsorPhone" type="tel" autoComplete="tel" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} />
                  {errors.phone ? <p className="text-sm text-destructive">{errors.phone}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publicSponsorImage">Profile photo (optional)</Label>
                  <div className="flex items-center gap-3">
                    {form.image.url ? <img src={form.image.url} alt="Sponsor profile preview" className="h-12 w-12 rounded-full object-cover" /> : null}
                    <Input
className="bg-background min-w-0"                       id="publicSponsorImage"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      disabled={isUploadingImage}
                      onChange={(event) => {
                        void handleImageUpload(event.currentTarget.files?.[0]);
                        event.currentTarget.value = "";
                      }}
                       
                    />
                    {form.image.url ? <Button type="button" variant="ghost" size="icon" aria-label="Remove sponsor photo" onClick={() => updateField("image", { url: "", public_id: "" })}><X size={16} /></Button> : null}
                    {isUploadingImage ? <Loader2 className="size-4 animate-spin" /> : <Upload size={16} />}
                  </div>
                  <p className="text-xs text-muted-foreground">JPEG, PNG, or WebP; maximum 5 MB.</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="publicSponsorBio">Bio</Label>
                <textarea id="publicSponsorBio" maxLength={1000} value={form.bio} onChange={(event) => updateField("bio", event.target.value)} className="min-h-24 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Location</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {locationFields.map(([field, label]) => (
                  <div className="space-y-2" key={field}>
                    <Label htmlFor={`publicSponsor-${field}`}>{label}</Label>
                    <Input
className="bg-background"                       id={`publicSponsor-${field}`}
                      autoComplete={field === "address" ? "street-address" : field === "city" ? "address-level2" : field === "state" ? "address-level1" : field === "zipCode" ? "postal-code" : "off"}
                      value={form[field]}
                      onChange={(event) => updateField(field, event.target.value)}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Donation details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="publicSponsorAmount">Amount</Label>
                  <Input className="bg-background" id="publicSponsorAmount" type="number" min="5" max="100000" step="1" value={form.amount} onChange={(event) => updateField("amount", event.target.value)} aria-invalid={Boolean(errors.amount)} />
                  {errors.amount ? <p className="text-sm text-destructive">{errors.amount}</p> : null}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publicSponsorPeriod">Period</Label>
                  <select id="publicSponsorPeriod" value={form.period} onChange={(event) => updateField("period", event.target.value as SponsorFormValues["period"])} className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm">
                    <option value="Monthly">Monthly</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>
              <label className="flex items-start gap-3 rounded-md border border-border p-3 text-sm">
                <input className="bg-background mt-1" type="checkbox" checked={form.remindByEmail} onChange={(event) => updateField("remindByEmail", event.target.checked)}  />
                <span>Send reminders by email</span>
              </label>
              <div className="space-y-2">
                <Label htmlFor="publicPaymentMethod">Payment method</Label>
                <select
                  id="publicPaymentMethod"
                  value={form.paymentMethod}
                  onChange={(event) =>
                    updateField("paymentMethod", event.target.value as "ach" | "stripe")
                  }
                  className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground"
                >
                  <option value="stripe">Stripe (secure online checkout)</option>
                  <option value="ach">ACH (manual bank transfer)</option>
                </select>
                <p className="text-sm text-muted-foreground">
                  {form.paymentMethod === "stripe"
                    ? "Stripe will redirect you to a secure checkout page to complete the donation." 
                    : "You will initiate a USD transfer from your bank. This form does not collect bank account credentials or record a payment as received."}
                </p>
              </div>
            </section>

            {submitError ? <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{submitError}</p> : null}
            <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-between">
              <Button type="button" variant="outline" onClick={onClose}><ArrowLeft size={16} className="mr-2" /> Close form</Button>
              <Button type="submit" disabled={isSubmitting || isUploadingImage}>
                {isSubmitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                {isSubmitting ? "Submitting pledge..." : "Submit pledge"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}