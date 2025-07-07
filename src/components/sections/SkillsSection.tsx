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
import { useMobile } from "../../hooks/useMobile";

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
    title: "Death Star Core",
    icon: Database,
    color: "#059669",
    description: "Data management with imperial efficiency",
    skills: [
      { name: "PostgreSQL", level: 90, icon: "🐘" },
      { name: "MongoDB", level: 85, icon: "🍃" },
      { name: "Redis", level: 82, icon: "🔴" },
      { name: "Firebase", level: 88, icon: "🔥" },
      { name: "Supabase", level: 85, icon: "⚡" },
      { name: "MySQL", level: 80, icon: "🐬" },
    ],
  },
  cloud: {
    title: "Imperial Command",
    icon: Cloud,
    color: "#7c3aed",
    description: "Cloud mastery across the galaxy",
    skills: [
      { name: "AWS", level: 88, icon: "☁️" },
      { name: "Docker", level: 85, icon: "🐳" },
      { name: "Kubernetes", level: 80, icon: "⚓" },
      { name: "Vercel", level: 92, icon: "▲" },
      { name: "Netlify", level: 90, icon: "🌐" },
      { name: "GitHub Actions", level: 85, icon: "🔄" },
    ],
  },
  tools: {
    title: "Sith Arsenal",
    icon: Shield,
    color: "#ea580c",
    description: "Development tools of mass construction",
    skills: [
      { name: "VS Code", level: 95, icon: "💻" },
      { name: "Git", level: 92, icon: "🌳" },
      { name: "Figma", level: 85, icon: "🎨" },
      { name: "Postman", level: 88, icon: "📮" },
      { name: "Jest", level: 80, icon: "🧪" },
      { name: "Webpack", level: 78, icon: "📦" },
    ],
  },
};

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const { ref, inView } = useInView({ threshold: 0.1 });
  const isMobile = useMobile();

  const currentCategory =
    skillCategories[activeCategory as keyof typeof skillCategories];

  useEffect(() => {
    let interval: number | null = null;
    
    if (inView || isMobile) {
      interval = setInterval(
        () => {
          const categories = Object.keys(skillCategories);
          const currentIndex = categories.indexOf(activeCategory);
          const nextIndex = (currentIndex + 1) % categories.length;
          setActiveCategory(categories[nextIndex]);
        },
        isMobile ? 4000 : 3000
      );
    }

    // Cleanup function that always runs
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeCategory, inView, isMobile]); // skillCategories is constant, no need to include

  return (
    <section
      ref={ref}
      id="skills"
      className="relative min-h-screen py-10 sm:py-16 lg:py-20 bg-sith-gradient overflow-hidden glass-section"
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Glass Overlay */}
      <div className="glass-overlay" />

      {/* Enhanced Visual Effects for ALL devices */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-imperial-red/5 via-transparent to-imperial-blue/5" />

        {/* Animated skill nodes for mobile */}
        {isMobile && (
          <div className="absolute inset-0">
            {/* CSS-only floating skill icons */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-8 h-8 bg-imperial-red/20 rounded-full flex items-center justify-center"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0 }}
            >
              <Code2 size={16} className="text-imperial-red" />
            </motion.div>

            <motion.div
              className="absolute top-1/3 right-1/3 w-6 h-6 bg-imperial-blue/20 rounded-full flex items-center justify-center"
              animate={{
                y: [0, 15, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <Database size={12} className="text-imperial-blue" />
            </motion.div>

            <motion.div
              className="absolute bottom-1/3 left-1/3 w-7 h-7 bg-imperial-gold/20 rounded-full flex items-center justify-center"
              animate={{
                y: [0, -10, 0],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
            >
              <Smartphone size={14} className="text-imperial-gold" />
            </motion.div>

            {/* More floating elements */}
            <motion.div
              className="absolute top-1/2 right-1/4 w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center"
              animate={{
                x: [0, 10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
            >
              <Cloud size={10} className="text-green-500" />
            </motion.div>
          </div>
        )}
      </div>

      {/* 3D Background for Desktop */}
      {!isMobile && <SkillsBackground3D />}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{
            duration: isMobile ? 0.3 : 0.8,
            delay: isMobile ? 0.1 : 0.2,
          }}
          style={{ willChange: "transform, opacity" }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 glass-panel glass-red px-6 py-3 rounded-full mb-8 holo-panel"
            initial={{ scale: isMobile ? 1 : 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: isMobile ? 0.3 : 0.6,
              delay: isMobile ? 0.2 : 0.4,
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <motion.div
              className="w-3 h-3 bg-imperial-red rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-imperial-red font-orbitron font-bold text-sm tracking-wider holo-text">
              FORCE MASTERY
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-black text-imperial-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-imperial-red via-imperial-gold to-imperial-red bg-clip-text text-transparent holo-text">
              DARK SIDE
            </span>
            <br />
            <span className="text-imperial-blue holo-text">ABILITIES</span>
          </h2>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            "The ability to destroy a planet is insignificant next to the power
            of{" "}
            <span className="text-imperial-gold font-semibold">
              modern development
            </span>
            ."
          </p>

          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: isMobile ? 0.3 : 0.5,
              delay: isMobile ? 0.3 : 0.8,
            }}
            style={{ willChange: "opacity" }}
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
            initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: isMobile ? 0.3 : 0.8,
              delay: isMobile ? 0.4 : 0.6,
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <h3 className="text-3xl font-orbitron font-bold text-imperial-gold mb-8">
              FORCE DISCIPLINES
            </h3>

            <div className="space-y-4">
              {Object.entries(skillCategories).map(([key, category]) => {
                const IconComponent = category.icon;
                const isActive = activeCategory === key;

                return (
                  <motion.button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`w-full text-left p-6 rounded-2xl transition-all duration-300 glass-card border ${
                      isActive
                        ? "border-imperial-gold bg-imperial-gold/10"
                        : "border-imperial-gray hover:border-imperial-blue hover:bg-imperial-blue/5"
                    }`}
                    whileHover={{ scale: isMobile ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      willChange: "transform",
                      boxShadow: isActive
                        ? `0 0 30px ${category.color}30`
                        : "none",
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-br ${
                          isActive
                            ? "from-imperial-gold/20 to-imperial-red/20"
                            : "from-imperial-blue/20 to-imperial-gray/20"
                        }`}
                        animate={
                          isActive
                            ? {
                                boxShadow: [
                                  `0 0 20px ${category.color}40`,
                                  `0 0 30px ${category.color}60`,
                                  `0 0 20px ${category.color}40`,
                                ],
                              }
                            : {}
                        }
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <IconComponent
                          size={24}
                          style={{ color: category.color }}
                        />
                      </motion.div>

                      <div className="flex-1">
                        <h4
                          className={`text-xl font-orbitron font-bold ${
                            isActive
                              ? "text-imperial-gold"
                              : "text-imperial-white"
                          }`}
                        >
                          {category.title}
                        </h4>
                        <p className="text-sm text-text-secondary mt-1">
                          {category.description}
                        </p>
                      </div>

                      {isActive && (
                        <motion.div
                          className="w-3 h-3 rounded-full bg-imperial-gold"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          style={{ willChange: "transform, opacity" }}
                        />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Skills Display */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: isMobile ? 0.2 : 0.5,
              delay: isMobile ? 0.1 : 0.2,
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <div className="glass-panel glass-imperial rounded-3xl p-8 border border-imperial-gray/30 holo-panel">
              {/* Category Header */}
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                  style={{
                    background: `linear-gradient(135deg, ${currentCategory.color}20, ${currentCategory.color}10)`,
                    border: `2px solid ${currentCategory.color}40`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${currentCategory.color}30`,
                      `0 0 40px ${currentCategory.color}50`,
                      `0 0 20px ${currentCategory.color}30`,
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <currentCategory.icon
                    size={32}
                    style={{ color: currentCategory.color }}
                  />
                </motion.div>

                <h4
                  className="text-2xl font-orbitron font-bold text-imperial-white mb-2"
                  style={{ color: currentCategory.color }}
                >
                  {currentCategory.title}
                </h4>
                <p className="text-text-secondary">
                  {currentCategory.description}
                </p>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentCategory.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="glass-card border border-imperial-gray rounded-3xl p-4 hover:border-imperial-gold transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: isMobile ? 1 : 1.02 }}
                    style={{ willChange: "transform" }}
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

              {/* Category Footer */}
              <motion.div
                className="text-center mt-8 pt-6 border-t border-imperial-gray/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-sm text-text-secondary italic">
                  "Power! Unlimited power!" - Emperor Palpatine
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Vader Quote */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="glass-panel glass-gold rounded-3xl p-6 max-w-2xl mx-auto holo-panel">
            <p className="text-lg text-imperial-red font-mono italic mb-2 holo-text">
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
