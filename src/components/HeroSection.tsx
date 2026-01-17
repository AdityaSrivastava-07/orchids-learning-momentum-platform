"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Zap, Brain, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const typingTexts = [
  "Learn Smarter",
  "Stay Motivated",
  "Track Progress",
  "Never Dropout",
];

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = typingTexts[currentTextIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayText === currentFullText) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentFullText.substring(0, displayText.length - 1)
          : currentFullText.substring(0, displayText.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex]);

  const floatingIcons = [
    { Icon: Zap, delay: 0, x: -120, y: -80 },
    { Icon: Brain, delay: 0.5, x: 140, y: -60 },
    { Icon: Target, delay: 1, x: -100, y: 100 },
    { Icon: Users, delay: 1.5, x: 160, y: 80 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-cyan-500/5 dark:via-purple-500/10 dark:to-cyan-500/10" />
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00f5ff]/30 dark:bg-[#00f5ff]/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#00f5ff]/20 dark:bg-[#00f5ff]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-[#a855f7]/20 dark:bg-[#a855f7]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-[#00f5ff]/10 to-[#a855f7]/10 border border-[#00f5ff]/20 dark:border-[#00f5ff]/30">
            <motion.span
              className="w-2 h-2 rounded-full bg-[#00f5ff]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="dark:neon-text">Learning Momentum Platform</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="block mb-2">
            <span className="dark:animate-text-glow dark:text-[#00f5ff] text-purple-600">ऋ</span>
            <span className="gradient-text">Start</span>
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl text-muted-foreground">
            {displayText}
            <motion.span
              className="inline-block w-1 h-8 sm:h-10 md:h-12 bg-[#00f5ff] ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          The all-in-one platform that prevents course dropout and boosts your confidence. 
          Learn in 10-minute micro-sessions with AI-powered guidance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-white border-0 px-8 py-6 text-lg dark:neon-glow group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Learning Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-2 dark:border-[#00f5ff]/50 dark:hover:border-[#00f5ff] group"
            >
              <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        <div className="relative mt-16">
          {floatingIcons.map(({ Icon, delay, x, y }, index) => (
            <motion.div
              key={index}
              className="absolute left-1/2 top-1/2 hidden md:block"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                x,
                y,
              }}
              transition={{ delay: 0.8 + delay, duration: 0.5 }}
            >
              <motion.div
                className="p-4 rounded-2xl glass-card dark:neon-border"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay }}
              >
                <Icon className="h-6 w-6 text-[#00f5ff]" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "10K+", label: "Active Learners" },
            { value: "95%", label: "Completion Rate" },
            { value: "500+", label: "Courses Supported" },
            { value: "4.9", label: "User Rating" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
