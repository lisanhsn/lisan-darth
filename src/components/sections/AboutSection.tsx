"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ImmersiveScrollContainer from "@/components/3d/ImmersiveScrollContainer";
import { useMobile } from "../../hooks/useMobile";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1 });
  const isMobile = useMobile();

  useEffect(() => {
    // Immediate display on mobile for faster loading
    setIsVisible(isMobile ? true : inView);
  }, [isMobile, inView]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative min-h-screen py-10 sm:py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-space-dark via-space-medium to-black glass-section"
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Glass Overlay */}
      <div className="glass-overlay" />
      {/* Imperial Atmosphere Effects - Optimized for mobile */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ willChange: "transform" }}
        >
          {/* Death Star */}
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, #6b7280 0%, #374151 50%, #1f2937 70%, transparent 100%)",
              filter: "blur(1px)",
              border: "2px solid rgba(220, 38, 38, 0.3)",
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 30, repeat: Infinity }}
          >
            {/* Death Star Laser */}
            <div
              className="absolute top-4 left-4 w-3 h-3 rounded-full"
              style={{
                background: "radial-gradient(circle, #dc2626 0%, #991b1b 100%)",
                boxShadow: "0 0 10px rgba(220, 38, 38, 0.8)",
              }}
            />
          </motion.div>

          {/* Imperial Star Destroyer Silhouette */}
          <motion.div
            className="absolute top-40 left-20 opacity-10"
            animate={{
              x: [-50, 50, -50],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          >
            <div
              className="w-40 h-8 bg-gradient-to-r from-transparent via-imperial-gray to-transparent"
              style={{
                clipPath: "polygon(0% 50%, 100% 20%, 100% 80%)",
              }}
            />
          </motion.div>

          {/* Space Debris Particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-imperial-blue rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: "0 0 4px rgba(30, 64, 175, 0.5)",
              }}
              animate={{
                x: [0, 150, -50, 0],
                y: [0, Math.random() * 30 - 15, 0],
                opacity: [0, 0.4, 0.1, 0],
                scale: [0.5, 1, 0.8, 0.5],
              }}
              transition={{
                duration: 12 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Imperial Energy Field */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              background: [
                "linear-gradient(0deg, transparent 0%, rgba(30, 64, 175, 0.05) 50%, transparent 100%)",
                "linear-gradient(180deg, transparent 0%, rgba(220, 38, 38, 0.03) 50%, transparent 100%)",
                "linear-gradient(0deg, transparent 0%, rgba(30, 64, 175, 0.05) 50%, transparent 100%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
      )}

      <ImmersiveScrollContainer
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
        parallaxSpeed="medium"
        revealDirection="up"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Text */}
          <motion.div
            className="space-y-8"
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            {/* Section Badge */}
            <motion.div
              className="inline-flex items-center space-x-3 glass-panel glass-gold px-6 py-3 rounded-full holo-panel"
              initial={{ scale: isMobile ? 1 : 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: isMobile ? 0.3 : 0.8,
                delay: isMobile ? 0 : 0.2,
              }}
              style={{ willChange: "transform, opacity" }}
            >
              <motion.div
                className="w-3 h-3 bg-tatooine-orange rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-hoth-white font-orbitron font-bold text-sm tracking-wider holo-text">
                ORIGIN STORY
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-black leading-tight glass-card p-6 rounded-3xl"
              initial={{ opacity: 0, y: isMobile ? 0 : 50 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: isMobile ? 0.3 : 1,
                delay: isMobile ? 0.1 : 0.3,
              }}
              style={{ willChange: "transform, opacity" }}
            >
              <span className="hologram-blue holo-text">FROM THE</span>
              <br />
              <span className="text-tatooine-sand">OUTER RIM</span>
              <br />
              <span className="text-empire-gold holo-text">TO THE CORE</span>
            </motion.h2>

            {/* Story Content */}
            <motion.div
              className="space-y-6 glass-panel glass-imperial p-6 rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 30,
              }}
              transition={{ duration: 1, delay: 1 }}
            >
              <p className="text-xl text-hoth-white/90 leading-relaxed">
                Like many great adventures, my journey began on the dusty plains
                of
                <span className="text-tatooine-orange font-semibold holo-text">
                  {" "}
                  Tatooine
                </span>
                . A simple farm boy with dreams of something greater, I
                discovered my calling through the ancient art of{" "}
                <span className="text-jedi-blue">code crafting</span>.
              </p>

              <p className="text-lg text-hoth-white/80 leading-relaxed">
                Trained by the wisest masters in the galaxy, I learned the ways
                of
                <span className="text-rebel-orange"> React</span>, the mysteries
                of
                <span className="text-jedi-green"> Node.js</span>, and the power
                of
                <span className="text-nebula-purple"> TypeScript</span>. Each
                line of code became a step closer to bringing balance to the
                digital universe.
              </p>

              <p className="text-lg text-hoth-white/70 leading-relaxed">
                Today, I channel the Force to build applications that serve both
                the
                <span className="text-rebel-orange"> Rebel Alliance</span> and
                the
                <span className="text-empire-gold"> Galactic Empire</span>,
                proving that great software transcends political boundaries.
              </p>
            </motion.div>

            {/* Journey Timeline */}
            <motion.div
              className="pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 30,
              }}
              transition={{ duration: 1, delay: 1.3 }}
            >
              <h3 className="text-xl font-orbitron font-bold text-empire-gold mb-6">
                THE JOURNEY SO FAR
              </h3>

              <div className="space-y-4">
                {[
                  {
                    year: "2019",
                    event: "Discovered the Force (Started Coding)",
                    color: "jedi-blue",
                  },
                  {
                    year: "2021",
                    event: "Jedi Padawan (Full-Stack Training)",
                    color: "jedi-green",
                  },
                  {
                    year: "2023",
                    event: "Jedi Knight (Professional Developer)",
                    color: "empire-gold",
                  },
                  {
                    year: "2024",
                    event: "Jedi Master (Leading Projects)",
                    color: "rebel-orange",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.year}
                    className="flex items-center space-x-4"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{
                      opacity: isVisible ? 1 : 0,
                      x: isVisible ? 0 : -30,
                    }}
                    transition={{ duration: 0.8, delay: 1.5 + index * 0.2 }}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-${item.color} shadow-lg`}
                    />
                    <div className="flex-1 h-px bg-gradient-to-r from-space-medium to-transparent" />
                    <span className="text-empire-gold font-mono font-bold">
                      {item.year}
                    </span>
                    <span className="text-hoth-white/80">{item.event}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Interactive Elements */}
          <motion.div
            className="relative"
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            {/* Holographic Profile */}
            <motion.div
              className="relative bg-space-dark/95 backdrop-blur-sm border border-imperial-blue rounded-2xl p-8 shadow-2xl"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(30, 64, 175, 0.3)",
                  "0 0 50px rgba(59, 130, 246, 0.4)",
                  "0 0 30px rgba(30, 64, 175, 0.3)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {/* Hologram Effect Lines */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-30"
                animate={{
                  background: [
                    "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(30, 64, 175, 0.04) 4px, rgba(30, 64, 175, 0.04) 6px)",
                    "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(59, 130, 246, 0.03) 5px, rgba(59, 130, 246, 0.03) 7px)",
                    "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(30, 64, 175, 0.04) 4px, rgba(30, 64, 175, 0.04) 6px)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Profile Header */}
              <div className="relative z-10 space-y-6">
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-imperial-gold bg-gradient-to-br from-space-dark to-imperial-blue flex items-center justify-center"
                    animate={{
                      rotateY: [0, 360],
                      boxShadow: [
                        "0 0 20px rgba(212, 175, 55, 0.5)",
                        "0 0 30px rgba(30, 64, 175, 0.7)",
                        "0 0 20px rgba(212, 175, 55, 0.5)",
                      ],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <span className="text-2xl font-orbitron font-black text-imperial-white">
                      LH
                    </span>
                  </motion.div>

                  <h3 className="text-2xl font-orbitron font-bold text-imperial-blue">
                    LISAN HSN
                  </h3>
                  <p className="text-imperial-gold font-medium">
                    Imperial Developer
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Systems Built", value: "42+", icon: "🏗️" },
                    { label: "Planets Served", value: "7", icon: "🌍" },
                    { label: "Languages Mastered", value: "12", icon: "💻" },
                    { label: "Force Rating", value: "9.7/10", icon: "⭐" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="bg-space-dark/80 rounded-3xl p-4 text-center border border-imperial-gray/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isVisible ? 1 : 0,
                        scale: isVisible ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.8, delay: 1.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05, borderColor: "#1e40af" }}
                    >
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-xl font-bold text-imperial-gold">
                        {stat.value}
                      </div>
                      <div className="text-sm text-imperial-white/90">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Force Abilities */}
                <div className="space-y-4">
                  <h4 className="text-lg font-orbitron font-bold text-imperial-gold">
                    Force Abilities
                  </h4>

                  {[
                    {
                      name: "Frontend Mastery",
                      level: 95,
                      color: "imperial-blue",
                    },
                    {
                      name: "Backend Power",
                      level: 90,
                      color: "imperial-green",
                    },
                    { name: "DevOps Wisdom", level: 85, color: "imperial-red" },
                    { name: "UI/UX Sight", level: 88, color: "imperial-gold" },
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, width: 0 }}
                      animate={{
                        opacity: isVisible ? 1 : 0,
                        width: isVisible ? "100%" : 0,
                      }}
                      transition={{ duration: 1, delay: 2.2 + index * 0.2 }}
                    >
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-imperial-white font-medium">
                          {skill.name}
                        </span>
                        <span className={`text-${skill.color} font-bold`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-space-dark rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-${skill.color}`}
                          initial={{ width: 0 }}
                          animate={{
                            width: isVisible ? `${skill.level}%` : 0,
                          }}
                          transition={{
                            duration: 1.5,
                            delay: 2.4 + index * 0.2,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Frequency */}
                <motion.div
                  className="text-center pt-4 border-t border-imperial-gray/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ duration: 1, delay: 3 }}
                >
                  <p className="text-sm text-imperial-white/60 mb-2">
                    Transmitting on Imperial frequencies
                  </p>
                  <motion.button
                    className="px-6 py-2 bg-gradient-to-r from-imperial-blue to-imperial-red border border-imperial-gold rounded-3xl text-imperial-white font-semibold hover:from-imperial-red hover:to-imperial-blue transition-all duration-300"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(30, 64, 175, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Open Comm Channel
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Imperial Elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-16 h-16 opacity-30"
              animate={{
                rotate: [0, 360],
                y: [0, -20, 0],
                boxShadow: [
                  "0 0 20px rgba(30, 64, 175, 0.3)",
                  "0 0 30px rgba(220, 38, 38, 0.4)",
                  "0 0 20px rgba(30, 64, 175, 0.3)",
                ],
              }}
              transition={{ duration: 12, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-imperial-blue to-imperial-red border border-imperial-gold/50" />
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -left-8 w-12 h-12 opacity-25"
              animate={{
                rotate: [360, 0],
                x: [0, 15, 0],
                boxShadow: [
                  "0 0 15px rgba(212, 175, 55, 0.4)",
                  "0 0 20px rgba(107, 114, 128, 0.3)",
                  "0 0 15px rgba(212, 175, 55, 0.4)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-imperial-gold to-imperial-gray border border-imperial-blue/30" />
            </motion.div>
          </motion.div>
        </div>
      </ImmersiveScrollContainer>

      {/* Tatooine Landscape Silhouette */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-30"
        style={{
          background: "linear-gradient(to top, #020617 0%, transparent 100%)",
        }}
        initial={{ y: 50 }}
        animate={{ y: isVisible ? 0 : 50 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      >
        <svg
          viewBox="0 0 1200 200"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 L0,120 Q200,80 400,100 Q600,120 800,90 Q1000,60 1200,80 L1200,200 Z"
            fill="rgba(245, 158, 11, 0.3)"
          />
          <path
            d="M0,200 L0,140 Q300,100 600,110 Q900,120 1200,100 L1200,200 Z"
            fill="rgba(234, 88, 12, 0.2)"
          />
        </svg>
      </motion.div>
    </section>
  );
}
