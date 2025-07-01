"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import ImperialFooter from "@/components/ImperialFooter";

// Dynamically import 3D components for better performance
const Scene3D = dynamic(() => import("@/components/3d/Scene3D"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function ImperialPortfolio() {
  return (
    <main className="relative min-h-screen bg-space-gradient">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<LoadingScreen />}>
          <Scene3D />
        </Suspense>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section - Command Center */}
        <section id="home" className="min-h-screen">
          <HeroSection />
        </section>

        {/* About Section - Imperial Fleet */}
        <section id="about" className="min-h-screen">
          <AboutSection />
        </section>

        {/* Skills Section - Lightsaber Training */}
        <section id="skills" className="min-h-screen">
          <SkillsSection />
        </section>

        {/* Projects Section - Imperial Archives */}
        <section id="projects" className="min-h-screen">
          <ProjectsSection />
        </section>

        {/* Contact Section - Imperial Communications */}
        <section id="contact" className="min-h-screen">
          <ContactSection />
        </section>
      </div>

      {/* Imperial Footer */}
      <ImperialFooter />
    </main>
  );
}
