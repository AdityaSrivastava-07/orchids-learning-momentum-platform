"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Trophy, Flame, Heart, Crown, Medal, Star, Zap } from "lucide-react";

const leaderboardData = [
  { rank: 1, name: "Emma W.", avatar: "👩‍🎓", points: 12450, streak: 45, icon: Crown },
  { rank: 2, name: "Alex M.", avatar: "👨‍💻", points: 11230, streak: 38, icon: Medal },
  { rank: 3, name: "Priya S.", avatar: "👩‍🔬", points: 10890, streak: 32, icon: Star },
  { rank: 4, name: "James L.", avatar: "🧑‍🎨", points: 9750, streak: 28 },
  { rank: 5, name: "Sofia R.", avatar: "👩‍🚀", points: 9320, streak: 25 },
];

const streakData = [
  { day: "Mon", completed: true },
  { day: "Tue", completed: true },
  { day: "Wed", completed: true },
  { day: "Thu", completed: true },
  { day: "Fri", completed: true },
  { day: "Sat", completed: false },
  { day: "Sun", completed: false, today: true },
];

const achievements = [
  { id: 1, title: "First Steps", icon: "🎯", description: "Complete your first lesson", earned: true },
  { id: 2, title: "Week Warrior", icon: "🔥", description: "7-day learning streak", earned: true },
  { id: 3, title: "Quiz Master", icon: "⭐", description: "Score 100% on a quiz", earned: true },
  { id: 4, title: "Night Owl", icon: "🦉", description: "Learn after midnight", earned: false },
  { id: 5, title: "Speed Learner", icon: "⚡", description: "Complete 5 lessons in 1 day", earned: false },
  { id: 6, title: "Perfect Month", icon: "🏆", description: "30-day streak", earned: false },
];

export function Gamification() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [lives, setLives] = useState(4);
  const [currentStreak, setCurrentStreak] = useState(5);

  return (
    <section id="gamification" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f5ff]/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#00f5ff]/10 border border-[#00f5ff]/20 mb-4">
            <Trophy className="h-4 w-4 text-[#00f5ff]" />
            Gamification & Retention
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Make Learning <span className="gradient-text">Fun & Addictive</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Leaderboards, streaks, lives system, and achievements to keep you motivated.
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
              <Trophy className="h-5 w-5 text-yellow-500" />
              Leaderboard
            </h3>

            <div className="space-y-3">
              {leaderboardData.map((user, index) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`p-3 rounded-xl border transition-all ${
                    user.rank <= 3
                      ? "border-yellow-500/50 bg-yellow-500/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        user.rank === 1
                          ? "bg-yellow-500 text-black"
                          : user.rank === 2
                          ? "bg-gray-300 text-black"
                          : user.rank === 3
                          ? "bg-amber-600 text-white"
                          : "bg-muted"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <div className="text-2xl">{user.avatar}</div>
                    <div className="flex-1">
                      <div className="font-medium flex items-center gap-2">
                        {user.name}
                        {user.icon && <user.icon className="h-4 w-4 text-yellow-500" />}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {user.points.toLocaleString()} pts • 🔥 {user.streak} days
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="p-6 rounded-3xl bg-card border border-border dark:glass-card">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                Daily Streak
              </h3>

              <div className="text-center mb-6">
                <motion.div
                  className="text-6xl font-bold gradient-text mb-2"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ type: "spring", delay: 0.4 }}
                >
                  {currentStreak}
                </motion.div>
                <p className="text-muted-foreground">day streak</p>
              </div>

              <div className="flex justify-between gap-2">
                {streakData.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        day.completed
                          ? "bg-gradient-to-r from-orange-500 to-red-500"
                          : day.today
                          ? "border-2 border-dashed border-orange-500"
                          : "bg-muted"
                      }`}
                    >
                      {day.completed && <Flame className="h-5 w-5 text-white" />}
                      {day.today && !day.completed && (
                        <span className="text-orange-500 text-xs">?</span>
                      )}
                    </div>
                    <span className={`text-xs ${day.today ? "font-bold text-orange-500" : "text-muted-foreground"}`}>
                      {day.day}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
                <p className="text-sm">
                  <span className="font-medium">2 more days</span> to earn +1 life!
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-card border border-border dark:glass-card">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Lives System
              </h3>

              <div className="flex justify-center gap-3 mb-4">
                {[...Array(5)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Heart
                      className={`h-10 w-10 transition-all ${
                        index < lives
                          ? "text-red-500 fill-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                          : "text-muted"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground mb-4">
                You have <span className="font-bold text-red-500">{lives}</span> lives remaining
              </p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-xl bg-background/50 border border-border text-center">
                  <div className="text-red-500 font-bold">-1 life</div>
                  <div className="text-xs text-muted-foreground">Miss a day</div>
                </div>
                <div className="p-3 rounded-xl bg-background/50 border border-border text-center">
                  <div className="text-green-500 font-bold">+1 life</div>
                  <div className="text-xs text-muted-foreground">7-day streak</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1 p-6 rounded-3xl bg-card border border-border dark:glass-card"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#a855f7]" />
              Achievements
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`p-4 rounded-xl border text-center transition-all hover:scale-105 ${
                    achievement.earned
                      ? "border-[#a855f7] bg-[#a855f7]/10"
                      : "border-border opacity-50 grayscale"
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <div className="text-sm font-medium mb-1">{achievement.title}</div>
                  <div className="text-xs text-muted-foreground">{achievement.description}</div>
                  {achievement.earned && (
                    <div className="mt-2 text-xs text-[#a855f7] font-medium">Earned!</div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#a855f7]/10 to-[#00f5ff]/10 border border-[#a855f7]/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Achievement Progress</div>
                  <div className="text-sm text-muted-foreground">3 of 6 unlocked</div>
                </div>
                <div className="text-2xl font-bold gradient-text">50%</div>
              </div>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#a855f7] to-[#00f5ff] rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: "50%" } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
