"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import { Mail, Download, ArrowRight, Crown, Code, Zap } from "lucide-react";
import DarthVaderHelmet from "@/components/3d/DarthVaderHelmet";
import SVGDarthVader from "@/components/3d/SVGDarthVader";
import EnhancedSVGDarthVader from "@/components/3d/EnhancedSVGDarthVader";
import InteractiveHeroScene from "@/components/3d/InteractiveHeroScene";
import FlyingSpaceship from "@/components/3d/FlyingSpaceship";
import { useMobile } from "../../hooks/useMobile";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });
  const heroRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();

  useEffect(() => {
    setIsVisible(inView);
  }, [inView]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = (-(event.clientY - rect.top) / rect.height) * 2 + 1;
    setMousePosition({ x, y });
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-space-dark via-space-medium to-black pt-24 pb-16"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Star Field with Death Star */}
      <div className="absolute inset-0">
        <motion.div
          className="star-field"
          animate={{
            backgroundPosition: `${mousePosition.x * 20}px ${
              mousePosition.y * 20
            }px`,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />

        {/* Death Star in background */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-imperial-gray to-space-dark opacity-20 shadow-2xl"
          animate={{
            rotate: 360,
            scale: isInteracting ? 1.1 : 1,
          }}
          transition={{
            rotate: { duration: 120, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.3 },
          }}
        >
          <div className="absolute top-4 left-4 w-4 h-4 bg-imperial-red rounded-full shadow-lg shadow-imperial-red/50" />
        </motion.div>
      </div>

      {/* 3D Canvas Background - Simplified on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-30">
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
            <Suspense fallback={null}>
              <Stars
                radius={300}
                depth={60}
                count={500}
                factor={4}
                saturation={0.1}
                fade={true}
              />
              <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.3}>
                <DarthVaderHelmet position={[4, 2, -5]} scale={0.6} />
              </Float>

              {/* Flying Spaceships with boost mode */}
              <FlyingSpaceship delay={2} speed={1.2} boostMode={true} />
              <FlyingSpaceship delay={8} speed={0.8} boostMode={true} />

              <ambientLight intensity={0.3} />
              <pointLight position={[10, 10, 10]} intensity={0.5} />
              <pointLight
                position={[-10, -10, 5]}
                intensity={0.3}
                color="#ff6b35"
              />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Mobile-optimized background with flying spaceship */}
      {isMobile && (
        <div className="absolute inset-0 bg-gradient-to-br from-space-dark via-red-900/20 to-black opacity-60">
          {/* Mobile 2D Flying Spaceship */}
          <motion.div
            className="absolute top-1/3 left-0 w-8 h-8"
            initial={{ x: -50, opacity: 0 }}
            animate={{
              x: typeof window !== "undefined" ? window.innerWidth + 50 : 400,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: 3,
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              {/* Spaceship body */}
              <div className="w-6 h-2 bg-imperial-red rounded-full relative z-10">
                <div className="absolute -left-1 top-0 w-2 h-2 bg-imperial-gold rounded-full"></div>
              </div>
              {/* Engine trail */}
              <motion.div
                className="absolute -right-2 top-0.5 w-4 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded-full"
                animate={{
                  width: [16, 24, 16],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Second mobile spaceship with different timing */}
          <motion.div
            className="absolute top-2/3 left-0 w-6 h-6"
            initial={{ x: -40, opacity: 0 }}
            animate={{
              x: typeof window !== "undefined" ? window.innerWidth + 40 : 380,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: 7,
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              {/* Smaller spaceship */}
              <div className="w-4 h-1.5 bg-energy-blue rounded-full relative z-10">
                <div className="absolute -left-0.5 top-0 w-1.5 h-1.5 bg-imperial-gold rounded-full"></div>
              </div>
              {/* Engine trail */}
              <motion.div
                className="absolute -right-1.5 top-0.5 w-3 h-0.5 bg-gradient-to-r from-orange-400 to-transparent rounded-full"
                animate={{
                  width: [12, 18, 12],
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen lg:min-h-0">
        {/* Left Column - Content */}
        <div className="space-y-8">
          {/* Imperial Title */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : -100,
            }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div className="flex items-center space-x-3 mb-6">
              <Crown className="w-8 h-8 text-imperial-gold" />
              <span className="text-imperial-gold font-orbitron font-bold text-lg tracking-wide">
                SITH LORD OF CODE
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-orbitron font-black leading-tight">
              <span className="text-imperial-white">Lord</span>
              <br />
              <span className="bg-gradient-to-r from-imperial-red via-imperial-gold to-imperial-red bg-clip-text text-transparent">
                Darth Lisan
              </span>
            </h1>

            <motion.div
              className="text-lg sm:text-xl md:text-2xl text-imperial-gold mt-4 sm:mt-6 font-light"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="font-orbitron">
                "Your lack of modern development skills disturbs me."
              </span>
            </motion.div>
          </motion.div>

          {/* Power Description */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : -80,
            }}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-y-6"
          >
            <p className="text-base sm:text-lg md:text-xl text-imperial-white leading-relaxed">
              Self-taught master of the{" "}
              <span className="text-imperial-gold font-bold">
                Digital Dark Arts
              </span>
              . I forge powerful web applications using the Force of modern
              technologies and frameworks.
            </p>

            <p className="text-base sm:text-lg text-imperial-gold leading-relaxed">
              Full-stack developer wielding React, Next.js, TypeScript, and
              Three.js to create immersive digital experiences that command
              respect across the galaxy.
            </p>

            <p className="text-imperial-blue font-medium">
              "Join the dark side. We have better code architecture."
            </p>
          </motion.div>

          {/* Skills Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 30,
            }}
            transition={{ duration: 1, delay: 0.9 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            {[
              { icon: Code, label: "Full-Stack" },
              { icon: Zap, label: "Performance" },
              { icon: Crown, label: "3D Graphics" },
            ].map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.label}
                  className="bg-space-dark/50 backdrop-blur-sm border border-imperial-gray rounded-lg p-4 text-center"
                  whileHover={{
                    scale: 1.05,
                    borderColor: "rgb(220, 38, 38)",
                    boxShadow: "0 0 20px rgba(220, 38, 38, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className="w-8 h-8 text-imperial-gold mx-auto mb-2" />
                  <div className="text-sm font-orbitron font-bold text-imperial-white">
                    {skill.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Imperial CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 30,
            }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              className="relative group px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-imperial-red to-red-900 text-imperial-white font-orbitron font-bold rounded-lg border-2 border-imperial-red overflow-hidden text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="relative z-10 flex items-center space-x-2">
                <Crown className="w-5 h-5" />
                <span>View My Empire</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600 to-imperial-red"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="px-4 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-imperial-gold text-imperial-gold font-orbitron font-bold rounded-lg hover:bg-imperial-gold hover:text-space-dark transition-colors duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document
                  .getElementById("skills")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>My Powers</span>
              </span>
            </motion.button>

            <motion.button
              className="px-4 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-imperial-blue text-imperial-blue font-orbitron font-bold rounded-lg hover:bg-imperial-blue hover:text-imperial-white transition-colors duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Request Audience</span>
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right Column - Interactive 3D Darth Vader */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            x: isVisible ? 0 : 100,
          }}
          transition={{ duration: 1, delay: 0.8 }}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          {/* Interactive SVG Darth Vader */}
          <motion.div
            className="relative z-10"
            animate={{
              rotateY: mousePosition.x * 10,
              rotateX: -mousePosition.y * 5,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <EnhancedSVGDarthVader
              mousePosition={isMobile ? { x: 0, y: 0 } : mousePosition}
              isInteracting={!isMobile && isInteracting}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 drop-shadow-2xl"
            />

            {/* Power Aura */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: isInteracting
                  ? "0 0 100px rgba(220, 38, 38, 0.6), 0 0 200px rgba(220, 38, 38, 0.3)"
                  : "0 0 50px rgba(220, 38, 38, 0.3), 0 0 100px rgba(220, 38, 38, 0.1)",
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Force Lightning Effects - Disabled on mobile for performance */}
          <AnimatePresence>
            {!isMobile && isInteracting && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 bg-gradient-to-t from-imperial-blue to-white rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${10 + i * 10}%`,
                      height: `${50 + Math.random() * 100}px`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          className="flex flex-col items-center space-y-2 text-imperial-gold"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => {
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-xs font-orbitron font-medium cursor-pointer">
            EXPLORE THE EMPIRE
          </span>
          <div className="w-0.5 h-6 bg-gradient-to-b from-imperial-red to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
