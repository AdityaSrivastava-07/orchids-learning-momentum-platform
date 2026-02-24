"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Coffee, Sparkles, QrCode } from "lucide-react";

const presetAmounts = [50, 100, 200, 500, 1000];
const UPI_ID = "7400383305@ybl";

const paymentApps = [
  {
    name: "PhonePe",
    bg: "bg-[#5f259f]",
    hoverBg: "hover:bg-[#4a1d7a]",
    textColor: "text-white",
    getUrl: (amount: number) =>
      `phonepe://pay?pa=${UPI_ID}&pn=RStart&am=${amount}&cu=INR&tn=Donation`,
    icon: (
      <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none">
        <circle cx="24" cy="24" r="24" fill="#5f259f"/>
        <path d="M32.5 14h-7.8l-8.7 13.2 4.2 6.4 3.5-5.3h3.2c4.7 0 8.5-3.2 8.5-7.1 0-3.9-1.3-7.2-2.9-7.2zm-5 10.6h-2.8l2.8-4.3c1 .5 1.7 1.5 1.7 2.5 0 1-.8 1.8-1.7 1.8z" fill="white"/>
      </svg>
    ),
  },
  {
    name: "Google Pay",
    bg: "bg-white",
    hoverBg: "hover:bg-gray-100",
    textColor: "text-gray-800",
    borderColor: "border border-gray-200",
    getUrl: (amount: number) =>
      `tez://upi/pay?pa=${UPI_ID}&pn=RStart&am=${amount}&cu=INR&tn=Donation`,
    icon: (
      <svg viewBox="0 0 48 48" className="h-6 w-6">
        <path d="M43.6 20H24v8.4h11.1C33.6 32.7 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.7 0 5.2 1 7.1 2.6l6-6C33.8 7 29.1 5 24 5 12.4 5 3 14.4 3 26s9.4 21 21 21c10.8 0 20-7.8 20-21 0-1.4-.1-2.7-.4-4z" fill="#FFC107"/>
        <path d="M6.3 15.6l6.9 5.1C15 17.1 19.2 14 24 14c2.7 0 5.2 1 7.1 2.6l6-6C33.8 7 29.1 5 24 5c-7.7 0-14.3 4.4-17.7 10.6z" fill="#FF3D00"/>
        <path d="M24 47c5.2 0 9.9-1.9 13.5-5.1l-6.2-5.2C29.4 38.5 26.8 39.5 24 39.5c-5.2 0-9.6-3.5-11.2-8.2l-6.9 5.3C9.7 43 16.3 47 24 47z" fill="#4CAF50"/>
        <path d="M43.6 20H24v8.4h11.1c-.8 2.2-2.3 4-4.2 5.3l6.2 5.2C40.7 35.6 44 31.1 44 26c0-1.4-.1-2.7-.4-4z" fill="#1976D2"/>
      </svg>
    ),
  },
  {
    name: "Paytm",
    bg: "bg-[#00baf2]",
    hoverBg: "hover:bg-[#0099cc]",
    textColor: "text-white",
    getUrl: (amount: number) =>
      `paytmmp://pay?pa=${UPI_ID}&pn=RStart&am=${amount}&cu=INR&tn=Donation`,
    icon: (
      <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none">
        <rect width="48" height="48" rx="8" fill="#00baf2"/>
        <text x="7" y="30" fontSize="14" fontWeight="bold" fill="white" fontFamily="Arial">Paytm</text>
      </svg>
    ),
  },
  {
    name: "FamPay",
    bg: "bg-[#ffcc00]",
    hoverBg: "hover:bg-[#e6b800]",
    textColor: "text-black",
    getUrl: (amount: number) =>
      `upi://pay?pa=${UPI_ID}&pn=RStart&am=${amount}&cu=INR&tn=Donation`,
    icon: (
      <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none">
        <rect width="48" height="48" rx="8" fill="#ffcc00"/>
        <text x="5" y="30" fontSize="12" fontWeight="bold" fill="black" fontFamily="Arial">FamPay</text>
      </svg>
    ),
  },
];

export function DonateSection() {
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");

  const currentAmount = customAmount ? parseInt(customAmount) || 0 : amount;

  const upiUrl = `upi://pay?pa=${UPI_ID}&pn=RStart&am=${currentAmount}&cu=INR&tn=Donation%20to%20RStart`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-orange-500/5 dark:via-pink-500/10 dark:to-orange-500/10" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-pink-500/20 dark:bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-orange-500/20 dark:bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 dark:border-pink-500/30 mb-6"
          >
            <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
            <span>Support Our Mission</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              Buy Us a Coffee
            </span>
            <Coffee className="inline-block ml-3 h-10 w-10 text-orange-500" />
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your support helps us build better learning tools for everyone.
            Every contribution, big or small, fuels our mission to make education accessible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left: Amount selector */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#00f5ff]" />
                Choose Amount
              </h3>

              <div className="flex flex-wrap gap-3 mb-6">
                {presetAmounts.map((preset) => (
                  <motion.button
                    key={preset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setAmount(preset);
                      setCustomAmount("");
                    }}
                    className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                      amount === preset && !customAmount
                        ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    ₹{preset}
                  </motion.button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm text-muted-foreground mb-2">
                  Or enter custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20">
                <p className="text-sm text-muted-foreground mb-1">You&apos;re donating</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  ₹{currentAmount || 0}
                </p>
              </div>

              {/* Payment App Buttons */}
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  Pay directly with your app
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {paymentApps.map((app) => (
                    <motion.a
                      key={app.name}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      href={app.getUrl(currentAmount)}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${app.bg} ${app.hoverBg} ${app.textColor} ${"borderColor" in app ? app.borderColor : ""}`}
                    >
                      {app.icon}
                      <span className="text-sm">{app.name}</span>
                    </motion.a>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Opens the app with ₹{currentAmount} pre-filled
                </p>
              </div>
            </div>

            {/* Right: QR Code */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <QrCode className="h-5 w-5 text-[#00f5ff]" />
                Scan to Pay
              </h3>

              <motion.div
                key={currentAmount}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative p-4 bg-white rounded-2xl shadow-xl"
              >
                <img
                  src={qrCodeUrl}
                  alt={`UPI QR Code for ₹${currentAmount}`}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl -z-10 blur-sm opacity-50"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              <p className="mt-4 text-sm text-muted-foreground text-center">
                Scan with any UPI app<br />
                <span className="font-mono text-xs">{UPI_ID}</span>
              </p>

              <div className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20">
                <p className="text-sm font-semibold text-center">
                  Amount: <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">₹{currentAmount || 0}</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          🔒 Secure payment via UPI • No transaction fees
        </motion.p>
      </div>
    </section>
  );
}
