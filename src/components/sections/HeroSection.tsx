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
  const { ref, inView } = useInView({ threshold: 0.1 });
  const heroRef = useRef<HTMLElement>(null);
  const isMobile = useMobile();

  useEffect(() => {
    setIsVisible(true); // Show content immediately on mobile
  }, []);

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
      onMouseMove={isMobile ? undefined : handleMouseMove}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
    >
      {/* Optimized Star Field with Death Star */}
      <div className="absolute inset-0" style={{ willChange: "transform" }}>
        {!isMobile ? (
          <motion.div
            className="star-field"
            animate={{
              backgroundPosition: `${mousePosition.x * 10}px ${
                mousePosition.y * 10
              }px`,
            }}
            transition={{ type: "tween", duration: 0.1 }}
          />
        ) : (
          <div className="star-field" />
        )}

        {/* Optimized Death Star */}
        <div
          className="absolute top-10 right-10 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-gradient-to-br from-imperial-gray to-space-dark opacity-20 shadow-2xl"
          style={{
            willChange: "transform",
            animation: "spin 120s linear infinite",
            transform: "translateZ(0)",
          }}
        >
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-2 h-2 sm:w-4 sm:h-4 bg-imperial-red rounded-full shadow-lg shadow-imperial-red/50" />
        </div>
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

      {/* Mobile-optimized GPU accelerated background */}
      {isMobile && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-space-dark via-red-900/20 to-black opacity-60"
          style={{ willChange: "transform" }}
        >
          {/* Lightweight CSS-only spaceships for mobile */}
          <div
            className="absolute top-1/3 w-4 h-2 bg-imperial-red rounded-full"
            style={{
              willChange: "transform",
              animation: "flyAcross 6s ease-in-out infinite",
              animationDelay: "1s",
            }}
          >
            <div className="absolute -left-1 top-0 w-2 h-2 bg-imperial-gold rounded-full" />
            <div
              className="absolute -right-2 top-0.5 w-3 h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full"
              style={{
                animation: "enginePulse 0.5s ease-in-out infinite",
              }}
            />
          </div>

          <div
            className="absolute top-2/3 w-3 h-1.5 bg-energy-blue rounded-full"
            style={{
              willChange: "transform",
              animation: "flyAcross 8s ease-in-out infinite",
              animationDelay: "4s",
            }}
          >
            <div className="absolute -left-0.5 top-0 w-1 h-1 bg-imperial-gold rounded-full" />
            <div
              className="absolute -right-1 top-0.5 w-2 h-0.5 bg-gradient-to-r from-orange-400 to-transparent rounded-full"
              style={{
                animation: "enginePulse 0.3s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen lg:min-h-0"
        style={{ willChange: "transform" }}
      >
        {/* Left Column - Content */}
        <div className="space-y-6 sm:space-y-8">
          {/* Imperial Title - Immediate display on mobile */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -100 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: isMobile ? 0.3 : 0.8,
              delay: isMobile ? 0 : 0.1,
              ease: "easeOut",
            }}
            style={{ willChange: "transform, opacity" }}
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
            initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: isMobile ? 0.3 : 0.6,
              delay: isMobile ? 0.1 : 0.2,
              ease: "easeOut",
            }}
            className="space-y-4 sm:space-y-6"
            style={{ willChange: "transform, opacity" }}
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
            initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: isMobile ? 0.3 : 0.6,
              delay: isMobile ? 0.2 : 0.3,
              ease: "easeOut",
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            style={{ willChange: "transform, opacity" }}
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
                  className="bg-space-dark/50 backdrop-blur-sm border border-imperial-gray rounded-lg p-4 text-center transition-all duration-200"
                  whileHover={
                    isMobile
                      ? {}
                      : {
                          scale: 1.02,
                          borderColor: "rgb(220, 38, 38)",
                        }
                  }
                  transition={{ type: "tween", duration: 0.2 }}
                  style={{ willChange: "transform" }}
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
            initial={{ opacity: 0, y: isMobile ? 0 : 20 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: isMobile ? 0.3 : 0.6,
              delay: isMobile ? 0.3 : 0.4,
              ease: "easeOut",
            }}
            className="flex flex-col sm:flex-row gap-4"
            style={{ willChange: "transform, opacity" }}
          >
            <motion.button
              className="relative group px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-imperial-red to-red-900 text-imperial-white font-orbitron font-bold rounded-lg border-2 border-imperial-red overflow-hidden text-sm sm:text-base transition-transform duration-200"
              whileHover={isMobile ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "tween", duration: 0.2 }}
              onClick={() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ willChange: "transform" }}
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
              className="px-4 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-imperial-gold text-imperial-gold font-orbitron font-bold rounded-lg hover:bg-imperial-gold hover:text-space-dark transition-all duration-200 text-sm sm:text-base"
              whileHover={isMobile ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "tween", duration: 0.2 }}
              onClick={() => {
                document
                  .getElementById("skills")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ willChange: "transform" }}
            >
              <span className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>My Powers</span>
              </span>
            </motion.button>

            <motion.button
              className="px-4 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-imperial-blue text-imperial-blue font-orbitron font-bold rounded-lg hover:bg-imperial-blue hover:text-imperial-white transition-all duration-200 text-sm sm:text-base"
              whileHover={isMobile ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "tween", duration: 0.2 }}
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ willChange: "transform" }}
            >
              <span className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Request Audience</span>
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right Column - Optimized for Mobile */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: isMobile ? 0.4 : 0.8,
            delay: isMobile ? 0.4 : 0.5,
            ease: "easeOut",
          }}
          onMouseEnter={isMobile ? undefined : () => setIsInteracting(true)}
          onMouseLeave={isMobile ? undefined : () => setIsInteracting(false)}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Optimized SVG Darth Vader */}
          <motion.div
            className="relative z-10"
            animate={
              isMobile
                ? {}
                : {
                    rotateY: mousePosition.x * 5,
                    rotateX: -mousePosition.y * 3,
                  }
            }
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              transformStyle: isMobile ? "flat" : "preserve-3d",
              willChange: "transform",
            }}
          >
            <EnhancedSVGDarthVader
              mousePosition={isMobile ? { x: 0, y: 0 } : mousePosition}
              isInteracting={!isMobile && isInteracting}
              className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 drop-shadow-2xl"
            />

            {/* Optimized Power Aura */}
            {!isMobile && (
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: isInteracting
                    ? "0 0 80px rgba(220, 38, 38, 0.4), 0 0 120px rgba(220, 38, 38, 0.2)"
                    : "0 0 40px rgba(220, 38, 38, 0.2), 0 0 80px rgba(220, 38, 38, 0.1)",
                }}
                transition={{ duration: 0.3 }}
                style={{ willChange: "box-shadow" }}
              />
            )}
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

      {/* Scroll Indicator - Hidden on mobile for cleaner UX */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          style={{ willChange: "transform, opacity" }}
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
      )}
    </section>
  );
}
