"use client";

import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { v4 as uuidv4 } from "uuid";

type DonationInput = {
  amount: number;
  email?: string;
  phone?: string;
  name?: string;
};

export default function PayButton({ donation }: { donation: DonationInput }) {
  const config: any = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,

    tx_ref: `donation-${uuidv4()}-${Date.now()}`,

    amount: donation.amount,
    currency: "UGX",

    payment_options: "card,mobilemoneyuganda",

    customer: {
      email: donation.email || "anonymous@email.com",
      phonenumber: donation.phone || "",
      name: donation.name || "Anonymous",
    },

    customizations: {
      title: "Seeds of Love",
      description: "Support our campaign",
      logo: "/dark-logo.png",
    },
  };

  const handlePayment = useFlutterwave(config);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (!donation.name || !donation.email || !donation.amount) {
          return alert("All feilds are needed!");
        }
        handlePayment({
          callback: async (response) => {
            // Send donation + payment info to backend
            await fetch("/api/verify-donation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                transaction_id: response.transaction_id,
                tx_ref: response.tx_ref,
                donation,
              }),
            });

            closePaymentModal();
          },
          onClose: () => {},
        });
      }}
      className="bg-primary text-white px-4 py-2 rounded-full w-full"
    >
      Donate ${donation.amount}
    </button>
  );
}
