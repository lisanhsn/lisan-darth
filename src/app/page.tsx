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
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Fixed Glassy Navigation */}
      <Navigation />

      {/* Scrollable Content */}
      <div className="relative">
        {/* Hero Section */}
        <section id="home" className="min-h-screen pt-20">
          <HeroSection />
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen">
          <AboutSection />
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen">
          <SkillsSection />
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen">
          <ProjectsSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen">
          <ContactSection />
        </section>

        {/* Footer */}
        <ImperialFooter />
      </div>
    </main>
  );
}
