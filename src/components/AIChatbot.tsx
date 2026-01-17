"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const quickReplies = [
  "How do I track my progress?",
  "What is the streak system?",
  "How do lives work?",
  "Show my learning stats",
];

const botResponses: Record<string, string> = {
  "how do i track my progress?": "Great question! 📊 Your progress is tracked automatically across all connected platforms. Check your dashboard to see:\n\n• Weekly momentum graphs\n• Module completion rates\n• Confidence scores\n• Time spent learning\n\nWant me to show you how to connect a platform?",
  "what is the streak system?": "The streak system keeps you motivated! 🔥\n\n• Learn every day to maintain your streak\n• Current streak shown on your dashboard\n• Reach 7-day streaks to earn extra lives\n• Compete on the leaderboard\n\nYour current streak helps you stay consistent!",
  "how do lives work?": "The lives system is designed to keep you accountable! ❤️\n\n• You start with 5 lives\n• Miss a day = lose 1 life\n• Complete a 7-day streak = gain 1 life\n• Lose all lives = your streak resets\n\nIt's like a game - but for your education!",
  "show my learning stats": "Here are your quick stats! 📈\n\n• Current Streak: 5 days 🔥\n• Weekly Time: 6h 27m\n• Modules Completed: 12\n• Confidence Score: 85%\n• Leaderboard Rank: #47\n\nKeep up the great work!",
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 I'm your ऋStart learning assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const lowerText = text.toLowerCase().trim();
      let response = botResponses[lowerText];

      if (!response) {
        const keys = Object.keys(botResponses);
        const match = keys.find((key) => lowerText.includes(key.split(" ").slice(0, 3).join(" ")));
        response = match
          ? botResponses[match]
          : "I'd love to help with that! 🤔 For specific questions about your learning journey, try asking about:\n\n• Progress tracking\n• Streak system\n• Lives & gamification\n• Platform connections\n\nOr check out our features section for more info!";
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        isBot: true,
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
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
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1],
                }}
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
                  <div className="font-semibold text-white">ऋStart Assistant</div>
                  <div className="text-xs text-white/80">Always here to help</div>
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
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#00f5ff]"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
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
                    className="px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-accent transition-colors"
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
                  onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full bg-muted border-0 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] text-sm"
                />
                <Button
                  size="icon"
                  onClick={() => handleSend(inputValue)}
                  className="rounded-full bg-gradient-to-r from-[#00f5ff] to-[#a855f7] hover:opacity-90"
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
