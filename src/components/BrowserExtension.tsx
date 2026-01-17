"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Chrome, Youtube, BookOpen, FileText, GraduationCap, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const platforms = [
  { name: "Udemy", icon: BookOpen, color: "#a855f7", users: "2.5K+" },
  { name: "Coursera", icon: GraduationCap, color: "#00f5ff", users: "1.8K+" },
  { name: "YouTube", icon: Youtube, color: "#f472b6", users: "5.2K+" },
  { name: "Notion", icon: FileText, color: "#22c55e", users: "980+" },
];

const features = [
  "Auto-splits videos into 10-min chunks",
  "AI learning summaries while you watch",
  "Confidence polls every 20 minutes",
  "Streak tracking across all platforms",
  "Progress synced to your dashboard",
];

export function BrowserExtension() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="extension" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f472b6]/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[#f472b6]/10 border border-[#f472b6]/20 mb-6">
              <Chrome className="h-4 w-4 text-[#f472b6]" />
              Browser Extension
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Learn Smarter <span className="gradient-text">Everywhere</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Install our browser extension once and supercharge your learning on all major platforms. 
              No more switching between apps.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#a855f7] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-white px-8 dark:neon-glow"
                >
                  <Chrome className="h-5 w-5 mr-2" />
                  Add to Chrome
                  <span className="ml-2 text-xs opacity-80">Free</span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="px-8">
                  <Download className="h-5 w-5 mr-2" />
                  Firefox
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative p-8 rounded-3xl bg-card border border-border dark:glass-card dark:neon-border">
              <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-white text-sm font-medium">
                10K+ Active Users
              </div>

              <h3 className="text-xl font-semibold mb-6">Supported Platforms</h3>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {platforms.map((platform, index) => (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 rounded-xl border border-border hover:border-[#00f5ff]/50 transition-all group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${platform.color}20` }}
                      >
                        <platform.icon className="h-5 w-5" style={{ color: platform.color }} />
                      </div>
                      <div>
                        <div className="font-medium">{platform.name}</div>
                        <div className="text-xs text-muted-foreground">{platform.users} users</div>
                      </div>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: platform.color }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: "100%" } : {}}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-[#00f5ff]/10 via-[#a855f7]/10 to-[#f472b6]/10 border border-[#00f5ff]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium mb-1">More platforms coming soon!</div>
                    <div className="text-sm text-muted-foreground">Khan Academy, Skillshare, LinkedIn Learning...</div>
                  </div>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-5 w-5 text-[#00f5ff]" />
                  </motion.div>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-card border border-border dark:glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["👩‍💻", "👨‍🎓", "👩‍🔬", "🧑‍🎨"].map((emoji, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-sm"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-medium">Join 10,000+ learners</div>
                  <div className="text-xs text-muted-foreground">using ऋStart today</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
