"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Sword, Clock, Star, Zap, Gift, Target, Flame, Trophy, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Quest {
  id: number;
  title: string;
  description: string;
  xp: number;
  difficulty: "easy" | "medium" | "hard" | "legendary";
  timeLeft: string;
  progress: number;
  total: number;
  icon: string;
  category: string;
  claimed?: boolean;
}

const quests: Quest[] = [
  {
    id: 1,
    title: "Speed Learner",
    description: "Complete 3 lessons in under 30 minutes",
    xp: 150,
    difficulty: "easy",
    timeLeft: "23h",
    progress: 2,
    total: 3,
    icon: "⚡",
    category: "Daily",
  },
  {
    id: 2,
    title: "Quiz Master",
    description: "Score 100% on any quiz",
    xp: 200,
    difficulty: "medium",
    timeLeft: "23h",
    progress: 0,
    total: 1,
    icon: "🎯",
    category: "Daily",
  },
  {
    id: 3,
    title: "Night Owl",
    description: "Study for 1 hour after 10 PM",
    xp: 175,
    difficulty: "medium",
    timeLeft: "23h",
    progress: 0,
    total: 1,
    icon: "🦉",
    category: "Daily",
  },
  {
    id: 4,
    title: "Streak Guardian",
    description: "Maintain a 7-day learning streak",
    xp: 500,
    difficulty: "hard",
    timeLeft: "2d",
    progress: 5,
    total: 7,
    icon: "🔥",
    category: "Weekly",
  },
  {
    id: 5,
    title: "Knowledge Seeker",
    description: "Complete 10 modules this week",
    xp: 400,
    difficulty: "hard",
    timeLeft: "4d",
    progress: 6,
    total: 10,
    icon: "📚",
    category: "Weekly",
  },
  {
    id: 6,
    title: "Social Butterfly",
    description: "Help 3 buddies with their questions",
    xp: 300,
    difficulty: "medium",
    timeLeft: "4d",
    progress: 1,
    total: 3,
    icon: "🦋",
    category: "Weekly",
  },
  {
    id: 7,
    title: "Path Pioneer",
    description: "Complete an entire course path",
    xp: 1000,
    difficulty: "legendary",
    timeLeft: "27d",
    progress: 3,
    total: 7,
    icon: "🏆",
    category: "Monthly",
  },
  {
    id: 8,
    title: "Confidence Champion",
    description: "Achieve 90%+ confidence score across 5 modules",
    xp: 750,
    difficulty: "hard",
    timeLeft: "27d",
    progress: 2,
    total: 5,
    icon: "💪",
    category: "Monthly",
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return { bg: "bg-[#22c55e]/10", border: "border-[#22c55e]/30", text: "text-[#22c55e]" };
    case "medium":
      return { bg: "bg-[#00f5ff]/10", border: "border-[#00f5ff]/30", text: "text-[#00f5ff]" };
    case "hard":
      return { bg: "bg-[#a855f7]/10", border: "border-[#a855f7]/30", text: "text-[#a855f7]" };
    case "legendary":
      return { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-500" };
    default:
      return { bg: "bg-muted", border: "border-border", text: "text-foreground" };
  }
};

export function ActiveQuests() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeTab, setActiveTab] = useState("Daily");
  const [claimedQuests, setClaimedQuests] = useState<number[]>([]);

  const filteredQuests = quests.filter((q) => q.category === activeTab);
  const tabs = ["Daily", "Weekly", "Monthly"];

  const handleClaim = (questId: number) => {
    setClaimedQuests((prev) => [...prev, questId]);
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
            <Sword className="h-4 w-4 text-[#f472b6]" />
            Active Quests
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Complete <span className="gradient-text">Challenges</span> for Extra XP
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take on daily, weekly, and monthly quests to earn bonus XP and climb the leaderboard faster!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-white shadow-lg"
                  : "bg-muted hover:bg-accent"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredQuests.map((quest, index) => {
            const diffColors = getDifficultyColor(quest.difficulty);
            const isComplete = quest.progress >= quest.total;
            const isClaimed = claimedQuests.includes(quest.id);

            return (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`relative p-6 rounded-3xl border-2 transition-all hover-lift ${
                  isClaimed
                    ? "border-[#22c55e]/50 bg-[#22c55e]/5"
                    : isComplete
                    ? "border-yellow-500 bg-yellow-500/10 dark:neon-border"
                    : `${diffColors.border} bg-card dark:glass-card`
                }`}
              >
                {quest.difficulty === "legendary" && (
                  <div className="absolute -top-3 -right-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                    </motion.div>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{quest.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg">{quest.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${diffColors.bg} ${diffColors.text} capitalize`}>
                          {quest.difficulty}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {quest.timeLeft}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{quest.description}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span className="font-medium">
                      {quest.progress}/{quest.total}
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        isComplete
                          ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                          : "bg-gradient-to-r from-[#00f5ff] to-[#a855f7]"
                      }`}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(quest.progress / quest.total) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="font-bold text-lg">{quest.xp} XP</span>
                  </div>

                  {isClaimed ? (
                    <div className="flex items-center gap-2 text-[#22c55e]">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Claimed!</span>
                    </div>
                  ) : isComplete ? (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() => handleClaim(quest.id)}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-medium"
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        Claim Reward
                      </Button>
                    </motion.div>
                  ) : (
                    <Button variant="outline" className="group">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-3xl bg-card border border-border dark:glass-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-[#22c55e]" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Quests Completed</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">This month</div>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-border dark:glass-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">3,450</div>
                <div className="text-sm text-muted-foreground">XP from Quests</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Total earned</div>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-border dark:glass-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#a855f7]/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-[#a855f7]" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Legendary Quests</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Completed all-time</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
