"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, FileText, Calendar, Camera, Heart, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const contractSlides = [
  { id: 1, title: "Set Your Goal", icon: "🎯", description: "What do you want to learn?" },
  { id: 2, title: "Choose Pace", icon: "⏱️", description: "How many hours per week?" },
  { id: 3, title: "Pick Buddy", icon: "🤝", description: "Who keeps you accountable?" },
  { id: 4, title: "Set Checkpoints", icon: "📍", description: "Weekly milestones to hit" },
  { id: 5, title: "Sign Contract", icon: "✍️", description: "Commit to your journey!" },
];

const buddyMatches = [
  { name: "Sarah K.", timezone: "EST", streak: 14, avatar: "👩‍💻", match: 95 },
  { name: "James L.", timezone: "PST", streak: 21, avatar: "👨‍🎓", match: 88 },
  { name: "Priya R.", timezone: "IST", streak: 7, avatar: "👩‍🔬", match: 82 },
];

const weeklyProgress = [
  { week: "Week 1", completed: 100, target: 100 },
  { week: "Week 2", completed: 85, target: 100 },
  { week: "Week 3", completed: 60, target: 100 },
  { week: "Current", completed: 40, target: 100 },
];

export function AccountabilitySystem() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#22c55e]/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#22c55e]/10 border border-[#22c55e]/20 mb-4">
            <Users className="h-4 w-4 text-[#22c55e]" />
            Accountability System
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Stay <span className="gradient-text">Committed</span> Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learning contracts, accountability buddies, and recovery plans to keep you on track.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 p-6 rounded-3xl bg-card border border-border dark:glass-card"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#22c55e]" />
              5-Slide Learning Contract
            </h3>

            <div className="relative mb-6">
              <div className="flex items-center justify-between mb-4">
                {contractSlides.map((slide, index) => (
                  <motion.div
                    key={slide.id}
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                      index === activeSlide
                        ? "bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-white scale-110"
                        : index < activeSlide
                        ? "bg-[#22c55e] text-white"
                        : "bg-muted"
                    }`}
                    onClick={() => setActiveSlide(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index < activeSlide ? "✓" : slide.id}
                  </motion.div>
                ))}
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00f5ff] to-[#a855f7]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(activeSlide / (contractSlides.length - 1)) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl bg-background/50 border border-border text-center"
            >
              <div className="text-4xl mb-3">{contractSlides[activeSlide].icon}</div>
              <h4 className="text-lg font-semibold mb-2">{contractSlides[activeSlide].title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{contractSlides[activeSlide].description}</p>
              <div className="flex gap-2 justify-center">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
                  disabled={activeSlide === 0}
                >
                  Back
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-white"
                  onClick={() => setActiveSlide(Math.min(contractSlides.length - 1, activeSlide + 1))}
                >
                  {activeSlide === contractSlides.length - 1 ? "Complete" : "Next"}
                </Button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1 p-6 rounded-3xl bg-card border border-border dark:glass-card"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#00f5ff]" />
              Buddy Matching
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Timezone-aware accountability partners:
            </p>

            <div className="space-y-3">
              {buddyMatches.map((buddy, index) => (
                <motion.div
                  key={buddy.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-4 rounded-xl border border-border hover:border-[#00f5ff]/50 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{buddy.avatar}</div>
                      <div>
                        <div className="font-medium">{buddy.name}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {buddy.timezone}
                          <span className="text-[#22c55e]">🔥 {buddy.streak} days</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#00f5ff]">{buddy.match}%</div>
                      <div className="text-xs text-muted-foreground">match</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-white"
                  >
                    Connect
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1 p-6 rounded-3xl bg-card border border-border dark:glass-card"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#a855f7]" />
              Weekly Check-ins
            </h3>

            <div className="space-y-4 mb-6">
              {weeklyProgress.map((week, index) => (
                <motion.div
                  key={week.week}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span>{week.week}</span>
                    <span className="text-muted-foreground">{week.completed}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        week.completed === 100
                          ? "bg-[#22c55e]"
                          : week.completed >= 80
                          ? "bg-[#00f5ff]"
                          : week.completed >= 50
                          ? "bg-[#a855f7]"
                          : "bg-[#f472b6]"
                      }`}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${week.completed}%` } : {}}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-[#f472b6]/10 to-[#a855f7]/10 border border-[#f472b6]/20">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="h-5 w-5 text-[#f472b6]" />
                <span className="font-medium">Recovery Plan Active</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Looks like you missed a few days. Here&apos;s your comeback plan:
              </p>
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-[#00f5ff]" />
                <span className="text-sm">Quick 5-min catch-up session ready</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
