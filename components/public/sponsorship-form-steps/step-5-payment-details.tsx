"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { motion } from "framer-motion";
import {
  PaymentData,
  formatCardNumber,
  formatExpiry,
  formatPhoneNumber,
} from "@/lib/sponsorship-form-types";

interface Step5PaymentDetailsProps {
  paymentMethod: string;
  donationAmount: number;
  donationPeriod: string;
  defaultName: string;
  defaultEmail: string;
  defaultPhone: string;
  defaultAddress: string;
  data: Partial<PaymentData>;
  onChange: (data: Partial<PaymentData>) => void;
  errors: Partial<Record<string, string>>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

export default function Step5PaymentDetails({
  paymentMethod,
  donationAmount,
  donationPeriod,
  defaultName,
  defaultEmail,
  defaultPhone,
  defaultAddress,
  data,
  onChange,
  errors,
}: Step5PaymentDetailsProps) {
  const defaultPhoneValue = defaultPhone ? formatPhoneNumber(defaultPhone) : "";
  const defaultEmailValue = defaultEmail || "";
  const defaultAddressValue = defaultAddress || "";

  const handleChange = (field: keyof PaymentData, value: string) => {
    if (field === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16);
    } else if (field === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    } else if (field === "expiry") {
      value = formatExpiry(value);
    } else if (field === "zellePhone" || field === "achContactPhone") {
      value = formatPhoneNumber(value);
    }
    onChange({ ...data, [field]: value });
  };

  const displayCardNumber = data.cardNumber
    ? formatCardNumber(data.cardNumber)
    : "";

  if (paymentMethod === "card") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Card Preview */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl bg-linear-to-br from-primary via-emerald-600 to-green-700 p-6 text-white shadow-lg"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">●●●●</span>
              <span className="text-sm font-semibold">VISA</span>
            </div>
            <div>
              <p className="text-xs text-white/70 mb-1">Card Number</p>
              <p className="text-lg font-mono tracking-widest">
                {displayCardNumber || "●●●● ●●●● ●●●● ●●●●"}
              </p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-white/70 mb-1">Cardholder</p>
                <p className="text-sm font-semibold">
                  {data.cardName?.toUpperCase() || "YOUR NAME"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/70 mb-1">Expires</p>
                <p className="text-sm font-semibold">
                  {data.expiry || "MM/YY"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cardholder Name */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Cardholder Name *
          </label>
          <Input
            type="text"
            placeholder="John Doe"
            value={data.cardName || ""}
            onChange={(e) => handleChange("cardName", e.target.value)}
            className={`bg-background rounded-2xl ${errors.cardName ? "border-destructive" : ""}`}
          />
          {errors.cardName && (
            <p className="text-xs text-destructive mt-1">{errors.cardName}</p>
          )}
        </motion.div>

        {/* Card Number */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Card Number *
          </label>
          <Input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={displayCardNumber}
            onChange={(e) => handleChange("cardNumber", e.target.value)}
            className={`bg-background rounded-2xl font-mono tracking-wider ${
              errors.cardNumber ? "border-destructive" : ""
            }`}
            maxLength={19}
          />
          {errors.cardNumber && (
            <p className="text-xs text-destructive mt-1">{errors.cardNumber}</p>
          )}
        </motion.div>

        {/* Expiry and CVV */}
        <motion.div
          variants={itemVariants}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Expiry Date *
            </label>
            <Input
              type="text"
              placeholder="MM/YY"
              value={data.expiry || ""}
              onChange={(e) => handleChange("expiry", e.target.value)}
              className={`bg-background rounded-2xl font-mono ${
                errors.expiry ? "border-destructive" : ""
              }`}
              maxLength={5}
            />
            {errors.expiry && (
              <p className="text-xs text-destructive mt-1">{errors.expiry}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              CVV *
            </label>
            <Input
              type="text"
              placeholder="123"
              value={data.cvv || ""}
              onChange={(e) => handleChange("cvv", e.target.value)}
              className={`bg-background rounded-2xl font-mono ${
                errors.cvv ? "border-destructive" : ""
              }`}
              maxLength={4}
            />
            {errors.cvv && (
              <p className="text-xs text-destructive mt-1">{errors.cvv}</p>
            )}
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4"
        >
          <p className="text-xs text-yellow-800">
            🔒 <span className="font-semibold">Security Note:</span> Your card
            information is stored securely on your device only. We never store
            raw card data on our servers.
          </p>
        </motion.div>

        {/* Terms */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-border bg-background/50 p-4"
        >
          <p className="text-xs text-muted-foreground">
            By completing this purchase, you agree to our payment terms and
            sponsorship agreement.
          </p>
        </motion.div>
      </motion.div>
    );
  } else if (paymentMethod === "stripe") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <div className="text-center space-y-4">
            <img src="/stripe.png" alt="Stripe" className="h-32 w-32 mx-auto" />
            <h3 className="text-lg font-semibold">
              Complete Payment with Stripe
            </h3>
            <p className="text-sm text-muted-foreground">
              Stripe is handled through the child sponsorship pledge flow so
              your payment can be matched to the child you selected.
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              This older form cannot create a pending sponsorship or verify a
              payment. Please use the child sponsorship form instead.
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  } else if (paymentMethod === "zelle") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <div className="space-y-4 text-center">
            <img src="/zelle.png" alt="Zelle" className="h-16 w-16 mx-auto" />
            <h3 className="text-lg font-semibold">Pay with Zelle</h3>
            <p className="text-sm text-muted-foreground">
              This payment method is currently unavailable. Please select
              another option or contact us for assistance.
            </p>
            <p className="text-sm text-muted-foreground">
              ℹ️ To pay with Zelle, send your donation to our charity email:
            </p>
            {/* <p className="text-sm text-muted-foreground">
              Send your donation via Zelle to our charity email. We will reach
              out if any additional details are needed.
            </p> */}
          </div>
        </motion.div>

        {/* <motion.div variants={itemVariants}>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Full Name *
          </label>
          <Input
            type="text"
            placeholder="John Doe"
            value={data.zelleName || defaultName}
            onChange={(e) => handleChange("zelleName", e.target.value)}
            className={`rounded-2xl ${errors.zelleName ? "border-destructive" : ""}`}
          />
          {errors.zelleName && (
            <p className="text-xs text-destructive mt-1">{errors.zelleName}</p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Phone Number *
          </label>
          <Input
            type="tel"
            placeholder="(555) 123-4567"
            value={data.zellePhone || defaultPhoneValue}
            onChange={(e) => handleChange("zellePhone", e.target.value)}
            className={`rounded-2xl ${errors.zellePhone ? "border-destructive" : ""}`}
          />
          {errors.zellePhone && (
            <p className="text-xs text-destructive mt-1">{errors.zellePhone}</p>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-background rounded-2xl border border-border p-4"
        >
          <p className="text-xs text-muted-foreground">
            Send to: donations@charity.org
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Amount: ${donationAmount} ({donationPeriod})
          </p>
        </motion.div> */}
      </motion.div>
    );
  } else if (paymentMethod === "check") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold">Pay by Check</h3>
            <p className="text-sm text-muted-foreground">
              Mail your check to our office address. We'll email you
              confirmation once it's received.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Email (optional)
          </label>
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={data.checkEmail || defaultEmailValue}
            onChange={(e) => handleChange("checkEmail", e.target.value)}
            className={`rounded-2xl ${errors.checkEmail ? "border-destructive" : ""}`}
          />
          {errors.checkEmail && (
            <p className="text-xs text-destructive mt-1">{errors.checkEmail}</p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Mailing Address *
          </label>
          <Input
            type="text"
            placeholder="Street address, city, state, zip"
            value={data.checkAddress || defaultAddressValue}
            onChange={(e) => handleChange("checkAddress", e.target.value)}
            className={`rounded-2xl ${errors.checkAddress ? "border-destructive" : ""}`}
          />
          {errors.checkAddress && (
            <p className="text-xs text-destructive mt-1">
              {errors.checkAddress}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-background rounded-2xl border border-border p-4"
        >
          <p className="text-xs text-muted-foreground">
            Mail to this address and make checks payable to Charity
            Organization.
          </p>
          <p className="text-xs text-muted-foreground">
            <b>Contact Us:</b> +1 (650) 439-3734
          </p>
          <p className="text-xs text-muted-foreground">
            <b>Email:</b> info@tohimglobal.org
          </p>
          <p className="text-xs text-muted-foreground">
            <b>Address:</b> San Carlos, CA 94070 USA
          </p>
        </motion.div>
      </motion.div>
    );
  } else if (paymentMethod === "paypal") {
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test";

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <div className="text-center space-y-4">
            <img src="/paypal.png" alt="PayPal" className="h-32 w-32 mx-auto" />
            <h3 className="text-lg font-semibold">Pay with PayPal</h3>
            <p className="text-sm text-muted-foreground">
              This payment method is currently unavailable. Please select
              another option or contact us for assistance.
            </p>
            {/* <p className="text-sm text-muted-foreground">
              Complete your donation securely using PayPal.
            </p> */}
          </div>
        </motion.div>

        {/* <PayPalScriptProvider
          options={{
            clientId: paypalClientId,
            currency: "USD",
          }}
        >
          <motion.div variants={itemVariants}>
            <PayPalButtons
              style={{
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "paypal",
              }}
              createOrder={(_, actions) =>
                actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: donationAmount.toFixed(2),
                      },
                    },
                  ],
                })
              }
              onApprove={async (_, actions) => {
                const details = await actions.order?.capture();
                if (details) {
                  alert(
                    `Payment completed by ${details?.payer?.name?.given_name || "payer"}.`,
                  );
                }
              }}
              onError={(error) => {
                console.error(error);
                alert(
                  "PayPal payment could not be completed. Please try again.",
                );
              }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-xs text-muted-foreground">
              After your PayPal payment finishes, return to this page and click
              the Complete Sponsorship button to complete the process.
            </p>
          </motion.div>
        </PayPalScriptProvider> */}
      </motion.div>
    );
  } else if (paymentMethod === "ach") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ACH is not available in this form</h3>
            <p className="text-sm text-muted-foreground">
              This legacy form does not submit ACH pledges or send transfer instructions. Use the child sponsorship form to submit a manual bank transfer pledge and receive instructions by email.
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={itemVariants}>
          <p className="text-center text-muted-foreground">
            Please select a payment method first.
          </p>
        </motion.div>
      </motion.div>
    );
  }
}
