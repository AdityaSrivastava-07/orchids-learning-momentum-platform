"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Timer, Play, Pause, SkipForward, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockMomentumData = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 62 },
  { day: "Wed", minutes: 38 },
  { day: "Thu", minutes: 71 },
  { day: "Fri", minutes: 55 },
  { day: "Sat", minutes: 89 },
  { day: "Sun", minutes: 67 },
];

const videoChunks = [
  { id: 1, title: "Introduction to React Hooks", duration: "10:00", completed: true },
  { id: 2, title: "useState Deep Dive", duration: "10:00", completed: true },
  { id: 3, title: "useEffect Patterns", duration: "10:00", completed: false, current: true },
  { id: 4, title: "Custom Hooks", duration: "10:00", completed: false },
  { id: 5, title: "Performance Tips", duration: "8:42", completed: false },
];

export function LearningMomentumTimer() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < 600) {
      interval = setInterval(() => {
        setCurrentTime((prev) => Math.min(prev + 1, 600));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = (currentTime / 600) * 100;

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#a855f7]/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#a855f7]/10 border border-[#a855f7]/20 mb-4">
            <Timer className="h-4 w-4 text-[#a855f7]" />
            Learning Momentum Timer
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Track Your <span className="gradient-text">Momentum</span>, Not Just Streaks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Auto-split videos into 10-minute chunks with AI-suggested breakpoints. Visualize your learning time, not just daily check-ins.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-3xl bg-card border border-border dark:glass-card"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Timer className="h-5 w-5 text-[#00f5ff]" />
              AI Stopwatch
            </h3>

            <div className="relative mb-8">
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  className="relative w-48 h-48"
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  style={{ animationPlayState: isPlaying ? "running" : "paused" }}
                >
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted/20"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="88"
                      fill="none"
                      stroke="url(#timerGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={553}
                      strokeDashoffset={553 - (553 * progress) / 100}
                      className="drop-shadow-[0_0_10px_#00f5ff]"
                    />
                    <defs>
                      <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00f5ff" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold gradient-text">{formatTime(currentTime)}</span>
                    <span className="text-sm text-muted-foreground">/ 10:00</span>
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-center gap-3">
                <Button
                  size="lg"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-white"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button size="lg" variant="outline" onClick={() => setCurrentTime(0)}>
                  Reset
                </Button>
                <Button size="lg" variant="outline">
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">Video Chunks</h4>
              {videoChunks.map((chunk) => (
                <motion.div
                  key={chunk.id}
                  className={`p-3 rounded-xl border transition-all ${
                    chunk.current
                      ? "border-[#00f5ff] bg-[#00f5ff]/10 dark:neon-border"
                      : chunk.completed
                      ? "border-[#22c55e]/50 bg-[#22c55e]/5"
                      : "border-border"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          chunk.completed
                            ? "bg-[#22c55e] text-white"
                            : chunk.current
                            ? "bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-white"
                            : "bg-muted"
                        }`}
                      >
                        {chunk.id}
                      </div>
                      <span className={`text-sm ${chunk.current ? "font-medium" : ""}`}>
                        {chunk.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{chunk.duration}</span>
                      {chunk.current && (
                        <Link2 className="h-4 w-4 text-[#00f5ff]" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 rounded-3xl bg-card border border-border dark:glass-card"
          >
            <h3 className="text-xl font-semibold mb-6">Weekly Momentum Graph</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Track your learning time in minutes, not just streak days.
            </p>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockMomentumData}>
                  <defs>
                    <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f5ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00f5ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid #00f5ff",
                      borderRadius: "12px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="minutes"
                    stroke="#00f5ff"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorMinutes)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { label: "Total This Week", value: "6h 27m", color: "#00f5ff" },
                { label: "Daily Average", value: "55m", color: "#a855f7" },
                { label: "Best Day", value: "1h 29m", color: "#22c55e" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-background/50 border border-border text-center"
                >
                  <div className="text-2xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
