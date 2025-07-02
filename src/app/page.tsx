"use client";

import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import ImperialFooter from "@/components/ImperialFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Darth Lisan Portfolio</h1>
        <p className="text-xl">Dark Side Developer</p>
        <p className="mt-4 text-gray-400">Site is loading...</p>
      </div>
    </div>
  );
}
