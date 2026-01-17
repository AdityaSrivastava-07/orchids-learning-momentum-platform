"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Map, CheckCircle, Circle, Lock, Play, Star, Clock, BookOpen } from "lucide-react";

const courses = [
  { id: 1, title: "HTML & CSS Fundamentals", status: "completed", duration: "4h 30m", xp: 500, progress: 100 },
  { id: 2, title: "JavaScript Essentials", status: "completed", duration: "8h 15m", xp: 800, progress: 100 },
  { id: 3, title: "React Basics", status: "completed", duration: "6h 45m", xp: 700, progress: 100 },
  { id: 4, title: "React Hooks Deep Dive", status: "current", duration: "5h 20m", xp: 650, progress: 65 },
  { id: 5, title: "State Management with Redux", status: "pending", duration: "4h 10m", xp: 600, progress: 0 },
  { id: 6, title: "Next.js Fundamentals", status: "locked", duration: "7h 30m", xp: 850, progress: 0 },
  { id: 7, title: "Full Stack Project", status: "locked", duration: "12h", xp: 1200, progress: 0 },
];

export function LearningPath() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-[#22c55e]" />;
      case "current":
        return <Play className="h-6 w-6 text-white" />;
      case "pending":
        return <Circle className="h-6 w-6 text-[#a855f7]" />;
      case "locked":
        return <Lock className="h-6 w-6 text-muted-foreground" />;
      default:
        return <Circle className="h-6 w-6" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return "border-[#22c55e] bg-[#22c55e]/10";
      case "current":
        return "border-[#00f5ff] bg-gradient-to-r from-[#00f5ff]/20 to-[#a855f7]/20 dark:neon-border";
      case "pending":
        return "border-[#a855f7]/50 bg-[#a855f7]/5";
      case "locked":
        return "border-border bg-muted/30 opacity-60";
      default:
        return "border-border";
    }
  };

  const getConnectorColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#22c55e]";
      case "current":
        return "bg-gradient-to-b from-[#22c55e] to-[#00f5ff]";
      default:
        return "bg-muted";
    }
  };

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
            <Map className="h-4 w-4 text-[#22c55e]" />
            Learning Path
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Your <span className="gradient-text">Course Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your progress through the curriculum. Complete courses to unlock new challenges.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#22c55e] via-[#00f5ff] to-muted rounded-full" />

            <div className="space-y-4">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`relative pl-20 pr-4 py-4 rounded-2xl border-2 transition-all ${getStatusStyles(course.status)} ${
                    course.status === "current" ? "scale-105 shadow-lg" : ""
                  }`}
                >
                  <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      course.status === "current"
                        ? "bg-gradient-to-r from-[#00f5ff] to-[#a855f7] animate-pulse"
                        : course.status === "completed"
                        ? "bg-[#22c55e]"
                        : "bg-background border-2 border-current"
                    }`}
                  >
                    {getStatusIcon(course.status)}
                  </div>

                  {index < courses.length - 1 && (
                    <div
                      className={`absolute left-[1.85rem] top-[calc(50%+1.25rem)] w-1 h-[calc(100%-0.5rem)] ${getConnectorColor(course.status)}`}
                    />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${course.status === "current" ? "text-lg" : ""}`}>
                          {course.title}
                        </h3>
                        {course.status === "current" && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-[#00f5ff] text-black font-medium">
                            IN PROGRESS
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {course.xp} XP
                        </span>
                      </div>

                      {(course.status === "current" || course.status === "completed") && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                course.status === "completed"
                                  ? "bg-[#22c55e]"
                                  : "bg-gradient-to-r from-[#00f5ff] to-[#a855f7]"
                              }`}
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${course.progress}%` } : {}}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {course.status === "current" && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-white text-sm font-medium"
                      >
                        Continue
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:sticky lg:top-24 space-y-6"
          >
            <div className="p-6 rounded-3xl bg-card border border-border dark:glass-card">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#00f5ff]" />
                Path Statistics
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Completed", value: "3", color: "#22c55e" },
                  { label: "In Progress", value: "1", color: "#00f5ff" },
                  { label: "Pending", value: "1", color: "#a855f7" },
                  { label: "Locked", value: "2", color: "#6b7280" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl bg-background/50 border border-border text-center"
                  >
                    <div className="text-3xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-[#00f5ff]/10 to-[#a855f7]/10 border border-[#00f5ff]/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Overall Progress</span>
                  <span className="text-lg font-bold gradient-text">52%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#22c55e] via-[#00f5ff] to-[#a855f7] rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "52%" } : {}}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-card border border-border dark:glass-card">
              <h3 className="text-xl font-semibold mb-4">Total XP Earned</h3>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold gradient-text">2,650</span>
                <span className="text-muted-foreground mb-2">/ 5,300 XP</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Complete more courses to earn XP and climb the leaderboard!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
