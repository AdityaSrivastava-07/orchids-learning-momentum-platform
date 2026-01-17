"use client";

import { motion } from "framer-motion";
import { Sparkles, Twitter, Github, Linkedin, Mail, Heart } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Analytics", "Gamification", "Extension", "Pricing"],
  Company: ["About", "Blog", "Careers", "Press", "Partners"],
  Resources: ["Documentation", "Help Center", "Community", "Contact", "Status"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative py-16 border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-t from-[#00f5ff]/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <motion.a
              href="#"
              className="flex items-center gap-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-8 w-8 text-[#00f5ff]" />
              <span className="text-2xl font-bold">
                <span className="dark:text-[#00f5ff] text-purple-600">ऋ</span>
                <span className="gradient-text">Start</span>
              </span>
            </motion.a>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              The all-in-one learning momentum platform that prevents course dropout and boosts your confidence.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-[#00f5ff]/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {new Date().getFullYear()} ऋStart. Made with{" "}
            <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for learners worldwide.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
