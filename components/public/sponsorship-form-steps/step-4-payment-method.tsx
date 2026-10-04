"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { PaymentMethodData } from "@/lib/sponsorship-form-types";

interface Step4PaymentMethodProps {
  data: Partial<PaymentMethodData>;
  onChange: (data: Partial<PaymentMethodData>) => void;
  errors: Partial<Record<keyof PaymentMethodData, string>>;
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

const paymentMethods = [
  //   { icon: "/card.png", value: "card", label: "Card" },
  { icon: "/paypal.png", value: "paypal", label: "PayPal" },
  { icon: "/stripe.png", value: "stripe", label: "Stripe" },
  { icon: "/zelle.png", value: "zelle", label: "Zelle" },
  { icon: "/check.png", value: "check", label: "Check" },
  { icon: "/ach.png", value: "ach", label: "ACH" },
];

export default function Step4PaymentMethod({
  data,
  onChange,
  errors,
}: Step4PaymentMethodProps) {
  const handleChange = (value: string) => {
    onChange({ paymentMethod: value as PaymentMethodData["paymentMethod"] });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-semibold text-foreground mb-4">
          Select Payment Method *
        </label>
        <RadioGroup
          value={data.paymentMethod || ""}
          onValueChange={handleChange}
          className="space-y-3"
        >
          {paymentMethods.map((method) => (
            <div
              key={method.value}
              className="flex items-center rounded-md bg-accent/10 p-5 space-x-3"
            >
              <RadioGroupItem
                value={method.value}
                id={method.value}
                className={`${errors.paymentMethod ? "border-destructive" : ""} bg-card h-4 w-4 border border-border checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm cursor-pointer`}
              />
              <Label
                htmlFor={method.value}
                className="text-sm  font-medium cursor-pointer"
              >
                {method.label}
              </Label>

              <img
                src={method.icon}
                alt={method.label}
                className={`h-6 w-6 object-contain ${errors.paymentMethod ? "grayscale opacity-50" : ""} ${method.value === "stripe" || method.value === "check" || method.value === "ach" ? "h-12 w-12" : ""}`}
              />
            </div>
          ))}
        </RadioGroup>
        {errors.paymentMethod && (
          <p className="text-xs text-destructive mt-2">
            {errors.paymentMethod}
          </p>
        )}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="bg-background rounded-2xl border border-border bg-background/50 p-4"
      >
        <p className="text-xs text-muted-foreground">
          ℹ️ Choose your preferred payment method. Some methods may require
          additional steps.
        </p>
      </motion.div>
    </motion.div>
  );
}
