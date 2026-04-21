"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are ऋStart's friendly AI learning assistant. ऋStart (pronounced "Ri-Start") is an all-in-one learning momentum platform that prevents course dropout and boosts learner confidence.

Your personality:
- Friendly, encouraging, and supportive
- Use relevant emojis to make responses engaging
- Keep responses concise but helpful (2-4 short paragraphs max)
- Always be positive and motivating about the user's learning journey

Key features of ऋStart you should know about:
1. **Micro-Intelligence Layer**: AI-powered summaries of learning progress, "next tiny step" recommendations, 10-minute micro-lessons
2. **Learning Momentum Timer**: Auto-splits videos into 10-min chunks, momentum graphs tracking time (not just streak days)
3. **Confidence Checkpoints**: 20-second confidence polls, adaptive clarifications, social proof from other learners
4. **Accountability System**: Learning contracts, timezone-aware buddy matching, weekly check-ins, recovery plans
5. **Dropout Radar Analytics**: ML-powered dropout predictions, quiz difficulty analysis, A/B testing
6. **Gamification**: Leaderboards, daily streaks, 5 lives system (lose 1 life per missed day, gain 1 life per 7-day streak), achievements
7. **Learning Path**: Visual course journey showing completed, current, pending, and locked courses with XP rewards
8. **Active Quests**: Daily/Weekly/Monthly challenges for bonus XP
9. **Browser Extension**: Works on Udemy, Coursera, YouTube, Notion

Always encourage users to keep learning and celebrate their progress!`;

const quickReplies = [
  "How do I track my progress?",
  "What is the streak system?",
  "How do lives work?",
  "Give me study tips",
];

async function callOpenAI(
  message: string,
  history: { text: string; isBot: boolean }[]
): Promise<string> {
  // Try the Next.js API route first (works on dev server / Vercel / any server)
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.reply;
    }
    // If API route returned an error, fall through to client-side call
    const errData = await res.json().catch(() => ({}));
    if (res.status === 429) {
      throw new Error(errData.error || "quota_exceeded");
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("quota") || msg.includes("billing")) throw e;
    // Network error or 404 (static export) — fall through
  }

  // Client-side OpenAI call (GitHub Pages static export)
  const apiKey =
    process.env.NEXT_PUBLIC_OPENAI_API_KEY ||
    (typeof window !== "undefined" ? (window as unknown as Record<string, string>).__OPENAI_KEY__ : undefined);

  if (!apiKey) {
    throw new Error(
      "AI is not configured. Please add your OpenAI key as NEXT_PUBLIC_OPENAI_API_KEY in the environment."
    );
  }

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.slice(-10).map((m) => ({
      role: m.isBot ? "assistant" : "user",
      content: m.text,
    })),
    { role: "user", content: message },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    if (response.status === 429) throw new Error("quota_exceeded");
    throw new Error(err?.error?.message || "OpenAI request failed");
  }

  const data = await response.json();
  return (
    data.choices?.[0]?.message?.content ||
    "I'm sorry, I couldn't generate a response. Please try again!"
  );
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 I'm your ऋStart learning assistant powered by AI. I can help you with anything about learning, progress tracking, gamification, study tips, and more! How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setError(null);

    try {
      const reply = await callOpenAI(
        text.trim(),
        messages.slice(-10).map((m) => ({ text: m.text, isBot: m.isBot }))
      );

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: reply, isBot: true, timestamp: new Date() },
      ]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Unknown error";
      const isQuota =
        errMsg.includes("quota") ||
        errMsg.includes("billing") ||
        errMsg.includes("quota_exceeded");

      setError(
        isQuota
          ? "⚠️ OpenAI quota exceeded. Add billing credits at platform.openai.com/settings/billing."
          : errMsg
      );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: isQuota
            ? "⚠️ My AI brain is out of credits right now! Please ask the site owner to top up their OpenAI account. 🔋"
            : "I'm having trouble connecting right now. Please try again in a moment! 🔄",
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#a855f7] shadow-lg flex items-center justify-center group dark:neon-glow"
          >
            <div className="relative">
              <Bot className="h-8 w-8 text-white" />
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00f5ff]"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <motion.div
              className="absolute -top-2 -left-2 w-6 h-6"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-6 w-6 text-[#00f5ff]" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] rounded-3xl overflow-hidden shadow-2xl border border-border dark:neon-border flex flex-col bg-background"
          >
            <div className="p-4 bg-gradient-to-r from-[#00f5ff] to-[#a855f7] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">ऋStart AI Assistant</div>
                  <div className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                    Powered by AI
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      message.isBot
                        ? "bg-muted rounded-tl-none"
                        : "bg-gradient-to-r from-[#00f5ff] to-[#a855f7] text-white rounded-tr-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isBot ? "text-muted-foreground" : "text-white/70"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-muted p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#00f5ff]"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center"
                >
                  <div className="flex items-center gap-2 text-xs text-red-500 bg-red-500/10 px-3 py-2 rounded-full">
                    <AlertCircle className="h-3 w-3" />
                    {error}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-border">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleSend(reply)}
                    disabled={isTyping}
                    className="px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && handleSend(inputValue)
                  }
                  placeholder="Ask me anything about learning..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-2 rounded-full bg-muted border-0 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] text-sm disabled:opacity-50"
                />
                <Button
                  size="icon"
                  onClick={() => handleSend(inputValue)}
                  disabled={isTyping || !inputValue.trim()}
                  className="rounded-full bg-gradient-to-r from-[#00f5ff] to-[#a855f7] hover:opacity-90 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
