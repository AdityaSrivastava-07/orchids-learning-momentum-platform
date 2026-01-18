"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Coffee, Sparkles, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

const presetAmounts = [50, 100, 200, 500, 1000];
const UPI_ID = "7400383305@ybl";

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
          <div className="grid md:grid-cols-2 gap-8 items-center">
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
            </div>

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

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-4">
                <Button
                  onClick={() => {
                    window.parent.postMessage({ type: "OPEN_EXTERNAL_URL", data: { url: upiUrl } }, "*");
                  }}
                  className="bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0 px-6 py-3"
                >
                  <Heart className="h-4 w-4 mr-2 fill-white" />
                  Pay with UPI App
                </Button>
              </motion.div>
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
