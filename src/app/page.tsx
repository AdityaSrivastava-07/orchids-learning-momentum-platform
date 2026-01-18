"use client";

import { CursorTrail } from "@/components/CursorTrail";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { MicroIntelligence } from "@/components/MicroIntelligence";
import { LearningMomentumTimer } from "@/components/LearningMomentumTimer";
import { ConfidenceCheckpoints } from "@/components/ConfidenceCheckpoints";
import { AccountabilitySystem } from "@/components/AccountabilitySystem";
import { LearningPath } from "@/components/LearningPath";
import { ActiveQuests } from "@/components/ActiveQuests";
import { DropoutRadar } from "@/components/DropoutRadar";
import { Gamification } from "@/components/Gamification";
import { BrowserExtension } from "@/components/BrowserExtension";
import { DonateSection } from "@/components/DonateSection";
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
      <LearningPath />
      <ActiveQuests />
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
