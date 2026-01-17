"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Target, ThumbsUp, ThumbsDown, Users, Trophy, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const confidenceQuestions = [
  { id: 1, question: "Do you understand React Hooks?", answered: true, confident: true },
  { id: 2, question: "Can you explain useEffect?", answered: true, confident: true },
  { id: 3, question: "Ready for Custom Hooks?", answered: false, confident: null },
];

const similarStruggles = [
  { avatar: "🧑‍💻", name: "Alex", message: "useEffect was confusing at first, but it clicked after practice!" },
  { avatar: "👩‍🎓", name: "Maria", message: "I rewatched this 3 times. Totally normal!" },
  { avatar: "🧑‍🔬", name: "Chen", message: "The dependency array is tricky. You've got this!" },
];

const microWins = [
  { id: 1, title: "First Module Done!", icon: "🎯", earned: true },
  { id: 2, title: "3-Day Streak", icon: "🔥", earned: true },
  { id: 3, title: "Confidence Master", icon: "💪", earned: false },
  { id: 4, title: "Quiz Ace", icon: "⭐", earned: false },
];

const heatmapData = [
  [0.9, 0.8, 0.7, 0.6, 0.5],
  [0.8, 0.9, 0.6, 0.7, 0.8],
  [0.7, 0.6, 0.4, 0.5, 0.6],
  [0.6, 0.7, 0.8, 0.9, 0.7],
  [0.8, 0.9, 0.7, 0.8, 0.9],
];

export function ConfidenceCheckpoints() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [activeQuestion, setActiveQuestion] = useState(2);

  const getHeatmapColor = (value: number) => {
    if (value >= 0.8) return "#22c55e";
    if (value >= 0.6) return "#00f5ff";
    if (value >= 0.4) return "#a855f7";
    return "#f472b6";
  };

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f472b6]/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#f472b6]/10 border border-[#f472b6]/20 mb-4">
            <Target className="h-4 w-4 text-[#f472b6]" />
            Confidence Checkpoints
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Track Your <span className="gradient-text">Confidence</span>, Get Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            20-second confidence polls, adaptive clarifications, and social proof from learners just like you.
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
              <Target className="h-5 w-5 text-[#f472b6]" />
              Quick Confidence Poll
            </h3>

            <div className="space-y-4">
              {confidenceQuestions.map((q, index) => (
                <motion.div
                  key={q.id}
                  className={`p-4 rounded-xl border transition-all ${
                    index === activeQuestion
                      ? "border-[#f472b6] bg-[#f472b6]/10"
                      : q.answered
                      ? "border-[#22c55e]/50 bg-[#22c55e]/5"
                      : "border-border"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-sm font-medium mb-3">{q.question}</p>
                  {index === activeQuestion ? (
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="flex-1 bg-[#22c55e] hover:bg-[#22c55e]/80"
                        onClick={() => setActiveQuestion(3)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Yes
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#f472b6] text-[#f472b6] hover:bg-[#f472b6]/10"
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Not Yet
                      </Button>
                    </div>
                  ) : q.answered ? (
                    <div className="flex items-center gap-2 text-sm text-[#22c55e]">
                      <ThumbsUp className="h-4 w-4" />
                      Confident!
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">Pending...</div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1 p-6 rounded-3xl bg-card border border-border dark:glass-card"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-[#00f5ff]" />
              Similar Struggles
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              You&apos;re not alone! Others found this tricky too:
            </p>

            <div className="space-y-4">
              {similarStruggles.map((struggle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex gap-3 p-3 rounded-xl bg-background/50 border border-border"
                >
                  <div className="text-2xl">{struggle.avatar}</div>
                  <div>
                    <div className="text-sm font-medium">{struggle.name}</div>
                    <div className="text-xs text-muted-foreground">{struggle.message}</div>
                  </div>
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
              <Trophy className="h-5 w-5 text-[#a855f7]" />
              Micro-Wins Board
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {microWins.map((win, index) => (
                <motion.div
                  key={win.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`p-4 rounded-xl text-center border transition-all ${
                    win.earned
                      ? "border-[#a855f7] bg-[#a855f7]/10"
                      : "border-border opacity-50"
                  }`}
                >
                  <div className="text-3xl mb-2">{win.icon}</div>
                  <div className="text-xs font-medium">{win.title}</div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                Confidence Heatmap
              </h4>
              <div className="grid grid-cols-5 gap-1">
                {heatmapData.flat().map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.02 }}
                    className="aspect-square rounded-md"
                    style={{ backgroundColor: getHeatmapColor(value) }}
                    title={`Confidence: ${Math.round(value * 100)}%`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
