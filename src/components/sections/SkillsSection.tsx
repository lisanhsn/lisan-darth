"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  Code2,
  Smartphone,
  Database,
  Cloud,
  Shield,
  Zap,
  Globe,
  Cpu,
  GitBranch,
  Palette,
} from "lucide-react";
import SkillsBackground3D from "@/components/3d/SkillsBackground3D";

const skillCategories = {
  frontend: {
    title: "Lightsaber Combat",
    icon: Code2,
    color: "#dc2626",
    description: "Frontend mastery with deadly precision",
    skills: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 92, icon: "▲" },
      { name: "TypeScript", level: 90, icon: "🔷" },
      { name: "Tailwind CSS", level: 95, icon: "🎨" },
      { name: "Framer Motion", level: 88, icon: "🌟" },
      { name: "Three.js", level: 85, icon: "🎯" },
    ],
  },
  backend: {
    title: "Force Lightning",
    icon: Zap,
    color: "#1e40af",
    description: "Backend powers that strike with precision",
    skills: [
      { name: "Node.js", level: 88, icon: "🟢" },
      { name: "Python", level: 85, icon: "🐍" },
      { name: "Express.js", level: 90, icon: "🚂" },
      { name: "GraphQL", level: 82, icon: "🔗" },
      { name: "REST APIs", level: 92, icon: "📡" },
      { name: "Microservices", level: 80, icon: "🏗️" },
    ],
  },
  mobile: {
    title: "Imperial Fleet",
    icon: Smartphone,
    color: "#d4af37",
    description: "Mobile dominance across all platforms",
    skills: [
      { name: "React Native", level: 88, icon: "📱" },
      { name: "Flutter", level: 82, icon: "🦋" },
      { name: "iOS Development", level: 75, icon: "🍎" },
      { name: "Android Development", level: 78, icon: "🤖" },
      { name: "PWA", level: 85, icon: "🌐" },
      { name: "Expo", level: 90, icon: "⚡" },
    ],
  },
  database: {
    title: "Death Star Archives",
    icon: Database,
    color: "#991b1b",
    description: "Data storage and management supremacy",
    skills: [
      { name: "MongoDB", level: 85, icon: "🍃" },
      { name: "PostgreSQL", level: 82, icon: "🐘" },
      { name: "Firebase", level: 88, icon: "🔥" },
      { name: "Redis", level: 78, icon: "💎" },
      { name: "Prisma", level: 80, icon: "🔺" },
      { name: "Supabase", level: 85, icon: "⚡" },
    ],
  },
  cloud: {
    title: "Galactic Network",
    icon: Cloud,
    color: "#059669",
    description: "Cloud infrastructure and deployment mastery",
    skills: [
      { name: "AWS", level: 80, icon: "☁️" },
      { name: "Vercel", level: 92, icon: "▲" },
      { name: "Docker", level: 78, icon: "🐋" },
      { name: "Kubernetes", level: 72, icon: "☸️" },
      { name: "Netlify", level: 85, icon: "🌐" },
      { name: "GitHub Actions", level: 80, icon: "🎬" },
    ],
  },
  tools: {
    title: "Imperial Weapons",
    icon: GitBranch,
    color: "#7c3aed",
    description: "Development tools and workflow mastery",
    skills: [
      { name: "Git", level: 92, icon: "🌿" },
      { name: "VS Code", level: 95, icon: "💻" },
      { name: "Figma", level: 85, icon: "🎨" },
      { name: "Postman", level: 88, icon: "📮" },
      { name: "Jest", level: 80, icon: "🃏" },
      { name: "Webpack", level: 75, icon: "📦" },
    ],
  },
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] =
    useState<keyof typeof skillCategories>("frontend");
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        const categories = Object.keys(
          skillCategories
        ) as (keyof typeof skillCategories)[];
        setActiveCategory((prev) => {
          const currentIndex = categories.indexOf(prev);
          return categories[(currentIndex + 1) % categories.length];
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [inView]);

  const currentCategory = skillCategories[activeCategory];

  return (
    <section
      ref={ref}
      id="skills"
      className="relative min-h-screen py-10 sm:py-16 lg:py-20 bg-sith-gradient overflow-hidden"
    >
      {/* 3D Background */}
      <SkillsBackground3D />

      {/* Simple Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-imperial-red/5 via-transparent to-imperial-blue/5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-orbitron font-black text-imperial-red mb-6"
            initial={{ scale: 0.5 }}
            animate={{ scale: inView ? 1 : 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            LIGHTSABER TRAINING
          </motion.h2>
          <motion.p
            className="text-xl text-imperial-gold max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Witness the Force powers and technical abilities mastered through
            years of dedicated training in the dark arts of development.
          </motion.p>

          {/* Simplified Lightsaber Indicator */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div
              className="w-1 h-16 rounded-full"
              style={{
                backgroundColor: currentCategory.color,
                boxShadow: `0 0 20px ${currentCategory.color}`,
              }}
            ></div>
          </motion.div>
        </motion.div>

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Category Selector */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-3xl font-orbitron font-bold text-imperial-gold mb-8">
              FORCE DISCIPLINES
            </h3>

            <div className="space-y-4">
              {Object.entries(skillCategories).map(([key, category], index) => {
                const IconComponent = category.icon;
                const isActive = activeCategory === key;

                return (
                  <motion.button
                    key={key}
                    onClick={() =>
                      setActiveCategory(key as keyof typeof skillCategories)
                    }
                    className={`w-full p-4 rounded-3xl border text-left transition-all duration-300 group ${
                      isActive
                        ? "border-imperial-red bg-imperial-red bg-opacity-20"
                        : "border-imperial-gray hover:border-imperial-gold"
                    }`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -30 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-3xl border ${
                          isActive
                            ? "border-imperial-red bg-imperial-red bg-opacity-40"
                            : "border-imperial-gray"
                        }`}
                        style={{
                          borderColor: isActive ? category.color : "#333333",
                        }}
                      >
                        <IconComponent
                          className="w-6 h-6"
                          style={{ color: category.color }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-imperial-white font-orbitron font-bold mb-1">
                          {category.title}
                        </h4>
                        <p className="text-imperial-white text-sm opacity-80">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-r-lg"
                        style={{ backgroundColor: category.color }}
                        layoutId="activeCategoryIndicator"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Skills Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              key={activeCategory}
              className="bg-space-dark/80 border border-imperial-red rounded-3xl p-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <currentCategory.icon
                  className="w-16 h-16 mx-auto mb-4"
                  style={{ color: currentCategory.color }}
                />
                <h3 className="text-2xl font-orbitron font-bold text-imperial-white mb-2">
                  {currentCategory.title}
                </h3>
                <p className="text-imperial-gold">
                  {currentCategory.description}
                </p>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentCategory.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="bg-space-dark/60 border border-imperial-gray rounded-3xl p-4 hover:border-imperial-gold transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="text-imperial-white font-medium">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-imperial-gold font-orbitron text-sm font-bold">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Skill Progress Bar */}
                    <div className="w-full bg-imperial-gray rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${currentCategory.color}, #FFD700)`,
                          boxShadow: `0 0 10px ${currentCategory.color}`,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Category Stats */}
              <motion.div
                className="mt-8 grid grid-cols-3 gap-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-imperial-red bg-opacity-20 border border-imperial-red rounded-3xl p-3">
                  <div className="text-2xl font-orbitron font-bold text-imperial-red">
                    {currentCategory.skills.length}
                  </div>
                  <div className="text-xs text-imperial-gold">SKILLS</div>
                </div>
                <div className="bg-imperial-red bg-opacity-20 border border-imperial-red rounded-3xl p-3">
                  <div className="text-2xl font-orbitron font-bold text-imperial-red">
                    {Math.round(
                      currentCategory.skills.reduce(
                        (acc, skill) => acc + skill.level,
                        0
                      ) / currentCategory.skills.length
                    )}
                    %
                  </div>
                  <div className="text-xs text-imperial-gold">MASTERY</div>
                </div>
                <div className="bg-imperial-red bg-opacity-20 border border-imperial-red rounded-3xl p-3">
                  <div className="text-2xl font-orbitron font-bold text-imperial-red">
                    {Math.max(...currentCategory.skills.map((s) => s.level))}%
                  </div>
                  <div className="text-xs text-imperial-gold">PEAK</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Force Mastery Quote */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="bg-space-dark/80 border border-imperial-gold rounded-3xl p-6 max-w-2xl mx-auto">
            <p className="text-lg text-imperial-red font-mono italic mb-2">
              "Your skills are impressive... most impressive."
            </p>
            <p className="text-imperial-gold text-sm font-orbitron">
              - DARTH VADER
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
