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
    <main
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900"
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        contain: "layout style paint",
      }}
    >
      {/* Fixed Glassy Navigation */}
      <Navigation />

      {/* Scrollable Content */}
      <div
        className="relative"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <ImperialFooter />
      </div>
    </main>
  );
}
