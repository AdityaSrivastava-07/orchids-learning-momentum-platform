"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BarChart3, AlertTriangle, Brain, Shuffle, Scissors } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

const dropoutData = [
  { module: "Intro", dropout: 5, color: "#22c55e" },
  { module: "Basics", dropout: 12, color: "#00f5ff" },
  { module: "Advanced", dropout: 35, color: "#f472b6" },
  { module: "Practice", dropout: 18, color: "#a855f7" },
  { module: "Final", dropout: 8, color: "#22c55e" },
];

const dropoutReasons = [
  { name: "Too Difficult", value: 35, color: "#f472b6" },
  { name: "Time Constraints", value: 28, color: "#a855f7" },
  { name: "Lost Interest", value: 22, color: "#00f5ff" },
  { name: "Technical Issues", value: 15, color: "#22c55e" },
];

const quizInsights = [
  { quiz: "Quiz 1", difficulty: 3, retention: 92 },
  { quiz: "Quiz 2", difficulty: 5, retention: 78 },
  { quiz: "Quiz 3", difficulty: 8, retention: 45 },
  { quiz: "Quiz 4", difficulty: 6, retention: 68 },
];

const abTests = [
  { id: "A", order: "Intro → Theory → Practice", retention: 72 },
  { id: "B", order: "Intro → Practice → Theory", retention: 85 },
];

export function DropoutRadar() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="analytics" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#a855f7]/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#a855f7]/10 border border-[#a855f7]/20 mb-4">
            <BarChart3 className="h-4 w-4 text-[#a855f7]" />
            Dropout Radar Analytics
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Predict & Prevent</span> Dropouts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ML-powered analytics to identify at-risk learners and optimize course content.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-3xl bg-card border border-border dark:glass-card"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-[#f472b6]" />
              Dropout Heatmap by Module
            </h3>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dropoutData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="module" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid #a855f7",
                      borderRadius: "12px",
                    }}
                    formatter={(value) => [`${value}% dropout`, "Rate"]}
                  />
                  <Bar dataKey="dropout" radius={[8, 8, 0, 0]}>
                    {dropoutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-[#f472b6]/10 border border-[#f472b6]/20">
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-[#f472b6]" />
                <span className="font-medium">Alert:</span>
                <span className="text-muted-foreground">Advanced module has 35% dropout rate</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-3xl bg-card border border-border dark:glass-card"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Brain className="h-5 w-5 text-[#00f5ff]" />
              ML Dropout Reasons Clustering
            </h3>

            <div className="flex items-center justify-center h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dropoutReasons}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dropoutReasons.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid #00f5ff",
                      borderRadius: "12px",
                    }}
                    formatter={(value) => [`${value}%`, "Percentage"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              {dropoutReasons.map((reason) => (
                <div key={reason.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: reason.color }} />
                  <span className="text-muted-foreground">{reason.name}</span>
                  <span className="font-medium ml-auto">{reason.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-3xl bg-card border border-border dark:glass-card"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#a855f7]" />
              Quiz Difficulty vs Retention
            </h3>

            <div className="space-y-4">
              {quizInsights.map((quiz, index) => (
                <motion.div
                  key={quiz.quiz}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 rounded-xl border border-border"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{quiz.quiz}</span>
                    <div className="flex gap-4 text-sm">
                      <span className="text-muted-foreground">
                        Difficulty: <span className="text-[#a855f7]">{quiz.difficulty}/10</span>
                      </span>
                      <span className="text-muted-foreground">
                        Retention: <span className="text-[#22c55e]">{quiz.retention}%</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#a855f7] rounded-full"
                          style={{ width: `${quiz.difficulty * 10}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#22c55e] rounded-full"
                          style={{ width: `${quiz.retention}%` }}
                        />
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
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-6 rounded-3xl bg-card border border-border dark:glass-card"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Shuffle className="h-5 w-5 text-[#22c55e]" />
              A/B Testing Module Order
            </h3>

            <div className="space-y-4 mb-6">
              {abTests.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`p-4 rounded-xl border transition-all ${
                    test.retention > 80
                      ? "border-[#22c55e] bg-[#22c55e]/10"
                      : "border-border"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Variant {test.id}</span>
                    <span
                      className={`text-lg font-bold ${
                        test.retention > 80 ? "text-[#22c55e]" : "text-muted-foreground"
                      }`}
                    >
                      {test.retention}% retention
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{test.order}</p>
                </motion.div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-[#22c55e]/10 to-[#00f5ff]/10 border border-[#22c55e]/20">
              <div className="flex items-center gap-3 mb-2">
                <Scissors className="h-5 w-5 text-[#22c55e]" />
                <span className="font-medium">AI Suggestion</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Consider shortening the &quot;Advanced&quot; module by 20% based on engagement data.
                Expected improvement: +12% retention.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
