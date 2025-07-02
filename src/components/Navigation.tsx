"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Home, User, Code, Briefcase, Mail } from "lucide-react";
import {
  useWebGLOptimizations,
  getOptimalAnimationDuration,
} from "@/hooks/useWebGLOptimizations";

const navigationItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Code },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const perfSettings = useWebGLOptimizations();

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 50);

    // Simplified section detection for performance
    const sections = navigationItems.map((item) => ({
      id: item.id,
      element: document.getElementById(item.id),
    }));

    const scrollPosition = scrollY + window.innerHeight / 2;

    for (const section of sections) {
      if (section.element) {
        const { offsetTop, offsetHeight } = section.element;
        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  }, []);

  // Performance-optimized motion variants
  const getNavVariants = () => {
    const duration = getOptimalAnimationDuration(300, perfSettings);
    return {
      hidden: { y: -100, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: shouldReduceMotion ? 0 : duration / 1000,
          ease: "easeOut",
        },
      },
    };
  };

  const getMobileMenuVariants = () => {
    const duration = getOptimalAnimationDuration(150, perfSettings);
    return {
      hidden: { opacity: 0, scale: 0.95, y: -10 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0 : duration / 1000,
          ease: "easeOut",
        },
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: -10,
        transition: {
          duration: shouldReduceMotion ? 0 : (duration * 0.7) / 1000,
        },
      },
    };
  };

  // Optimize animations based on device performance
  const getHoverAnimation = () => {
    if (
      shouldReduceMotion ||
      perfSettings.isMobile ||
      perfSettings.qualityLevel === "low"
    ) {
      return {};
    }

    return perfSettings.supportsHighRefreshRate
      ? { scale: 1.03, transition: { duration: 0.1 } }
      : { scale: 1.02, transition: { duration: 0.15 } };
  };

  const getTapAnimation = () => {
    if (shouldReduceMotion) return {};

    return perfSettings.isMobile
      ? { scale: 0.98, transition: { duration: 0.05 } }
      : { scale: 0.97, transition: { duration: 0.1 } };
  };

  // Dynamic blur amount based on performance
  const getBlurAmount = () => {
    switch (perfSettings.qualityLevel) {
      case "low":
        return "blur(8px)";
      case "medium":
        return "blur(16px)";
      case "high":
        return "blur(24px)";
      default:
        return "blur(16px)";
    }
  };

  return (
    <>
      {/* High-Performance Fixed Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          perfSettings.targetFPS >= 120 ? "duration-100" : "duration-200"
        } ${
          isScrolled
            ? "bg-black/30 backdrop-blur-xl border-b border-white/10"
            : "bg-black/10 backdrop-blur-lg border-b border-white/5"
        }`}
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)",
          backdropFilter: getBlurAmount(),
          WebkitBackdropFilter: getBlurAmount(),
          contain: "layout style paint",
        }}
        variants={getNavVariants()}
        initial="hidden"
        animate="visible"
      >
        {/* Optimized glassmorphism overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/3 via-transparent to-white/3"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Optimized Logo */}
            <motion.div
              className="flex items-center space-x-2 sm:space-x-3"
              style={{ willChange: "transform" }}
              whileHover={getHoverAnimation()}
              whileTap={getTapAnimation()}
            >
              <div
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-imperial-red/80 to-imperial-gold/80 p-0.5"
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              >
                <div className="w-full h-full bg-black/50 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-imperial-red rounded-full" />
                </div>
              </div>
              <span className="text-white font-bold text-lg sm:text-xl tracking-wider">
                DL
              </span>
            </motion.div>

            {/* Desktop Navigation - Performance Optimized */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              <div
                className="flex items-center space-x-1 bg-white/8 backdrop-blur-md rounded-full px-4 py-2 border border-white/15"
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                  backdropFilter: getBlurAmount(),
                }}
              >
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeSection === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative px-3 py-2 rounded-full text-sm font-medium transition-all ${
                        perfSettings.targetFPS >= 120
                          ? "duration-100"
                          : "duration-200"
                      } ${
                        isActive
                          ? "text-imperial-gold bg-white/20"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                      style={{
                        willChange: "transform",
                        transform: "translateZ(0)",
                      }}
                      whileHover={getHoverAnimation()}
                      whileTap={getTapAnimation()}
                    >
                      <div className="flex items-center space-x-2">
                        <IconComponent size={16} />
                        <span className="hidden lg:inline">{item.label}</span>
                      </div>

                      {isActive && !shouldReduceMotion && (
                        <motion.div
                          className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-imperial-red rounded-full"
                          layoutId="activeIndicator"
                          style={{
                            willChange: "transform",
                            transform: "translateZ(0)",
                          }}
                          transition={{
                            duration:
                              getOptimalAnimationDuration(200, perfSettings) /
                              1000,
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Menu Button - Touch Optimized */}
            <motion.button
              className={`md:hidden p-2 sm:p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full backdrop-blur-sm border border-white/20 transition-colors touch-manipulation ${
                perfSettings.targetFPS >= 120 ? "duration-75" : "duration-150"
              }`}
              style={{
                willChange: "transform",
                WebkitTapHighlightColor: "transparent",
                transform: "translateZ(0)",
                minHeight: "44px", // iOS touch target minimum
                minWidth: "44px",
              }}
              whileHover={getHoverAnimation()}
              whileTap={getTapAnimation()}
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{
                  duration: shouldReduceMotion
                    ? 0
                    : getOptimalAnimationDuration(200, perfSettings) / 1000,
                }}
                style={{ willChange: "transform" }}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Performance-Optimized Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: shouldReduceMotion
                  ? 0
                  : getOptimalAnimationDuration(150, perfSettings) / 1000,
              }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              style={{
                willChange: "opacity",
                transform: "translateZ(0)",
                backdropFilter:
                  perfSettings.qualityLevel === "low"
                    ? "blur(4px)"
                    : "blur(8px)",
              }}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              variants={getMobileMenuVariants()}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-16 left-3 right-3 z-50 md:hidden"
              style={{
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
            >
              <div
                className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl"
                style={{
                  willChange: "transform",
                  transform: "translateZ(0)",
                  backdropFilter: getBlurAmount(),
                }}
              >
                <div className="space-y-1">
                  {navigationItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all touch-manipulation ${
                          perfSettings.targetFPS >= 120
                            ? "duration-100"
                            : "duration-200"
                        } ${
                          isActive
                            ? "text-imperial-gold bg-white/20 border border-imperial-gold/30"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                        style={{
                          willChange: "transform",
                          WebkitTapHighlightColor: "transparent",
                          transform: "translateZ(0)",
                          minHeight: "48px", // Larger touch target for mobile
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: {
                            delay: shouldReduceMotion ? 0 : index * 0.02,
                            duration: shouldReduceMotion
                              ? 0
                              : getOptimalAnimationDuration(100, perfSettings) /
                                1000,
                          },
                        }}
                        whileTap={getTapAnimation()}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            isActive ? "bg-imperial-red/20" : "bg-white/10"
                          }`}
                        >
                          <IconComponent size={18} />
                        </div>
                        <span className="font-medium">{item.label}</span>
                        {isActive && !shouldReduceMotion && (
                          <motion.div
                            className="ml-auto w-2 h-2 bg-imperial-red rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: 0.05,
                              duration:
                                getOptimalAnimationDuration(100, perfSettings) /
                                1000,
                            }}
                            style={{ willChange: "transform" }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
