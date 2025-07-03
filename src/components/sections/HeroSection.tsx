"use client";

import React, { useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { Mail, Download, ArrowRight, Crown, Code, Zap } from "lucide-react";
import DarthVaderModel from "@/components/3d/DarthVaderModel";
import SVGDarthVader from "@/components/3d/SVGDarthVader";
import FlyingSpaceship from "@/components/3d/FlyingSpaceship";
import { useMobile } from "../../hooks/useMobile";

// Error boundary for 3D components
class Canvas3DErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("3D Canvas Error:", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("3D Canvas Error Details:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const { ref } = useInView({ threshold: 0.1 });
  const isMobile = useMobile();

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-space-dark via-space-medium to-black pt-24 pb-16 glass-section"
      onMouseMove={isMobile ? undefined : handleMouseMove}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
    >
      {/* Glass Overlay */}
      <div className="glass-overlay" />

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
          className="absolute top-10 right-10 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-gradient-to-br from-imperial-gray to-space-dark opacity-20 shadow-2xl glass-panel glass-float"
          style={{
            willChange: "transform",
            animation: "spin 120s linear infinite",
            transform: "translateZ(0)",
          }}
        >
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-2 h-2 sm:w-4 sm:h-4 bg-imperial-red rounded-full shadow-lg shadow-imperial-red/50" />
        </div>
      </div>

      {/* 3D Canvas Background - Enhanced for all devices */}
      <div className="absolute inset-0 opacity-40">
        <Canvas3DErrorBoundary
          fallback={
            <div className="w-full h-full bg-gradient-to-br from-space-dark via-red-900/20 to-black flex items-center justify-center">
              <div className="text-imperial-red text-center">
                <div className="w-16 h-16 border-4 border-imperial-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg font-orbitron">
                  Loading Imperial Interface...
                </p>
              </div>
            </div>
          }
        >
          <Canvas
            onError={(error) => {
              console.error("Canvas error:", error);
            }}
            camera={{ position: [0, 0, 8], fov: 75 }}
            gl={{
              antialias: !isMobile,
              alpha: true,
              powerPreference: "high-performance",
              precision: isMobile ? "mediump" : "highp",
            }}
            style={{
              background: "transparent",
              willChange: "transform",
              transform: "translateZ(0)",
            }}
            frameloop="always"
            performance={{ min: 0.5 }}
            onCreated={({ gl }) => {
              gl.setPixelRatio(
                Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)
              );
              gl.outputColorSpace = "srgb"; // Updated from outputEncoding
              gl.toneMapping = 4; // ACESFilmicToneMapping
            }}
          >
            <Suspense fallback={null}>
              {/* Stars - reduced count on mobile */}
              <Stars
                radius={300}
                depth={60}
                count={isMobile ? 500 : 1000}
                factor={4}
                saturation={0.1}
                fade={true}
              />

              {/* Main Darth Vader Model - positioned for maximum impact */}
              <DarthVaderModel
                position={isMobile ? [1.5, 0, 0] : [3, 0, 0]}
                scale={isMobile ? 0.8 : 1.2}
                interactive={!isMobile}
              />

              {/* Flying Spaceships - desktop only for performance */}
              {!isMobile && (
                <>
                  <FlyingSpaceship delay={2} speed={1.2} boostMode={true} />
                  <FlyingSpaceship delay={8} speed={0.8} boostMode={true} />
                </>
              )}

              {/* Enhanced Lighting Setup */}
              <ambientLight intensity={0.4} />
              <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <pointLight
                position={[10, 10, 10]}
                intensity={0.6}
                distance={40}
                decay={2}
              />
              <pointLight
                position={[-5, -5, 5]}
                intensity={0.4}
                color="#ff6b35"
                distance={30}
                decay={2}
              />
              {/* Red accent lighting for Sith atmosphere */}
              <pointLight
                position={[2, 2, 0]}
                intensity={1.2}
                color="#ff3333"
                distance={15}
                decay={2}
              />
            </Suspense>
          </Canvas>
        </Canvas3DErrorBoundary>
      </div>

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
            className="glass-panel glass-imperial p-6 rounded-3xl"
            style={{ willChange: "transform, opacity" }}
          >
            <motion.div className="flex items-center space-x-3 mb-6">
              <Crown className="w-8 h-8 text-imperial-gold" />
              <span className="text-imperial-gold font-orbitron font-bold text-lg tracking-wide holo-text">
                SITH LORD OF CODE
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-orbitron font-black leading-tight">
              <span className="text-imperial-white">Lord</span>
              <br />
              <span className="bg-gradient-to-r from-imperial-red via-imperial-gold to-imperial-red bg-clip-text text-transparent holo-text">
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
            initial={{ opacity: 0, x: isMobile ? 0 : -100 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: isMobile ? 0.3 : 0.8,
              delay: isMobile ? 0 : 0.3,
              ease: "easeOut",
            }}
            className="glass-card p-6 space-y-4"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <Code className="w-6 h-6 text-energy-blue" />
                <Zap className="w-6 h-6 text-imperial-gold" />
              </div>
              <h2 className="text-xl sm:text-2xl font-orbitron font-bold text-imperial-white">
                Master of the Dark Side Development
              </h2>
            </div>

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              Wielding the power of{" "}
              <span className="text-energy-blue font-semibold holo-text">
                React
              </span>
              ,{" "}
              <span className="text-imperial-gold font-semibold">Next.js</span>,
              and{" "}
              <span className="text-imperial-red font-semibold">
                TypeScript
              </span>{" "}
              to build applications that would make even the Emperor proud.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {["React", "Next.js", "TypeScript", "Node.js", "AWS"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-energy-blue/20 to-imperial-gold/20 border border-energy-blue/30 rounded-full text-energy-blue glass-btn"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 0 : 50 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: isMobile ? 0.3 : 0.8,
              delay: isMobile ? 0 : 0.5,
              ease: "easeOut",
            }}
            className="flex flex-col sm:flex-row gap-4"
            style={{ willChange: "transform, opacity" }}
          >
            <motion.button
              className="group px-8 py-4 bg-gradient-to-r from-imperial-red to-imperial-red/80 text-imperial-white font-orbitron font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-imperial-red/20 glass-btn glass-imperial flex items-center justify-center space-x-3"
              whileHover={isMobile ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Mail className="w-5 h-5" />
              <span>Join the Dark Side</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              className="group px-8 py-4 border-2 border-imperial-gold text-imperial-gold font-orbitron font-bold rounded-2xl transition-all duration-300 hover:bg-imperial-gold hover:text-space-dark glass-btn glass-gold flex items-center justify-center space-x-3"
              whileHover={isMobile ? {} : { scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Right Column - Darth Vader Character */}
        <motion.div
          className="relative h-96 lg:h-[600px] flex items-center justify-center"
          initial={{ opacity: 0, scale: isMobile ? 1 : 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: isMobile ? 0.3 : 1,
            delay: isMobile ? 0 : 0.7,
            ease: "easeOut",
          }}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Glass Panel Background */}
          <div className="absolute inset-0 glass-panel glass-imperial rounded-3xl opacity-30" />

          {!isMobile ? (
            <div className="w-full h-full relative">
              {/* Main 3D Darth Vader Model */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Canvas
                  camera={{ position: [0, 0, 6], fov: 60 }}
                  gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    precision: "highp",
                  }}
                  style={{
                    background: "transparent",
                    willChange: "transform",
                    transform: "translateZ(0)",
                  }}
                  frameloop="always"
                  performance={{ min: 0.5 }}
                  onCreated={({ gl }) => {
                    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                    gl.outputEncoding = 3001; // sRGBEncoding
                    gl.toneMapping = 4; // ACESFilmicToneMapping
                  }}
                  onClick={() => setIsInteracting(!isInteracting)}
                >
                  <Suspense fallback={null}>
                    {/* Enhanced lighting for the main model */}
                    <ambientLight intensity={0.4} />
                    <directionalLight
                      position={[5, 5, 5]}
                      intensity={1}
                      castShadow
                      shadow-mapSize-width={2048}
                      shadow-mapSize-height={2048}
                    />
                    <pointLight
                      position={[10, 10, 10]}
                      intensity={0.8}
                      distance={30}
                      decay={2}
                      color="#ffffff"
                    />
                    <pointLight
                      position={[-5, -5, 5]}
                      intensity={0.5}
                      color="#ff3333"
                      distance={25}
                      decay={2}
                    />
                    <pointLight
                      position={[0, -10, 10]}
                      intensity={0.3}
                      color="#660000"
                      distance={20}
                      decay={2}
                    />

                    {/* Main Darth Vader Model - Center Stage */}
                    <DarthVaderModel
                      position={[0, -0.5, 0]}
                      scale={0.5}
                      interactive={true}
                      isHovered={isInteracting}
                    />

                    {/* Background Elements */}
                    <Stars
                      radius={100}
                      depth={50}
                      count={500}
                      factor={4}
                      saturation={0.1}
                      fade={true}
                    />
                  </Suspense>
                </Canvas>
              </div>

              {/* Interactive UI Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-center glass-panel glass-imperial p-3 rounded-2xl">
                <p className="text-imperial-gold text-sm font-orbitron holo-text">
                  {isInteracting
                    ? "The Force is strong with this one..."
                    : "Click to awaken the Dark Lord"}
                </p>
              </div>

              {/* Power indicator */}
              <div className="absolute top-4 right-4 glass-panel glass-imperial p-2 rounded-xl">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-imperial-red rounded-full animate-pulse" />
                  <span className="text-imperial-gold text-xs font-orbitron">
                    DARK SIDE ONLINE
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Mobile Darth Vader Character */
            <div className="w-full h-full relative flex items-center justify-center">
              <motion.div
                className="relative z-10"
                animate={{
                  scale: [1, 1.02, 1],
                  rotateY: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <SVGDarthVader className="w-72 h-80 drop-shadow-2xl" />
              </motion.div>

              {/* Mobile breathing effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-imperial-red/10 via-transparent to-imperial-red/10 rounded-3xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Imperial symbol overlay */}
              <motion.div
                className="absolute top-4 right-4 w-12 h-12 glass-panel glass-imperial rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-6 h-6 bg-imperial-gold rounded-full opacity-80" />
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Force Lightning Effects (Desktop Only) */}
      {!isMobile && isInteracting && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px bg-gradient-to-b from-energy-blue to-transparent"
              style={{
                left: `${20 + i * 30}%`,
                height: "100%",
                filter: "blur(1px)",
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleY: [0, 1, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
