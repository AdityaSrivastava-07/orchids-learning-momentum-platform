"use client";

import { CursorTrail } from "@/components/CursorTrail";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MicroIntelligence } from "@/components/MicroIntelligence";
import { LearningMomentumTimer } from "@/components/LearningMomentumTimer";
import { ConfidenceCheckpoints } from "@/components/ConfidenceCheckpoints";
import { AccountabilitySystem } from "@/components/AccountabilitySystem";
import { DropoutRadar } from "@/components/DropoutRadar";
import { Gamification } from "@/components/Gamification";
import { BrowserExtension } from "@/components/BrowserExtension";
import { AIChatbot } from "@/components/AIChatbot";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <CursorTrail />
      <Navbar />
      <HeroSection />
      <MicroIntelligence />
      <LearningMomentumTimer />
      <ConfidenceCheckpoints />
      <AccountabilitySystem />
      <DropoutRadar />
      <Gamification />
      <BrowserExtension />
      <Footer />
      <AIChatbot />
    </main>
  );
}
