"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sword, Shield, Zap, Contact, Home } from "lucide-react";
import { useMobile } from "../hooks/useMobile";

const navigationItems = [
  {
    id: "home",
    label: "COMMAND CENTER",
    icon: Home,
    quote: "The Empire awaits your orders",
  },
  {
    id: "about",
    label: "IMPERIAL FLEET",
    icon: Shield,
    quote: "Know your commander",
  },
  {
    id: "skills",
    label: "DARK POWERS",
    icon: Zap,
    quote: "Feel the power of the dark side",
  },
  {
    id: "projects",
    label: "ARCHIVES",
    icon: Sword,
    quote: "Witness imperial victories",
  },
  {
    id: "contact",
    label: "TRANSMISSION",
    icon: Contact,
    quote: "Join the Empire",
  },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navigationItems.map((item) => item.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav glass-gpu ${
          isScrolled ? "scrolled" : ""
        }`}
        initial={{ y: isMobile ? 0 : -100 }}
        animate={{ y: 0 }}
        transition={{ duration: isMobile ? 0.3 : 0.6 }}
        style={{ willChange: "transform" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Imperial Logo */}
            <motion.div
              className="flex items-center space-x-3 glass-panel glass-imperial px-3 py-2 rounded-2xl"
              whileHover={isMobile ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: "transform" }}
            >
              <div className="w-10 h-10 relative">
                <motion.div
                  className="w-full h-full border-2 border-imperial-red rounded-full bg-imperial-black glass-float"
                  animate={isMobile ? {} : { rotate: 360 }}
                  transition={
                    isMobile
                      ? {}
                      : {
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }
                  }
                  style={{ willChange: isMobile ? "auto" : "transform" }}
                >
                  <div className="absolute inset-1 border border-imperial-gold rounded-full">
                    <div className="absolute inset-1 bg-imperial-red rounded-full lightsaber-glow opacity-80" />
                  </div>
                </motion.div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-orbitron font-black text-imperial-red sith-text heading-imperial holo-text">
                  DARTH LISAN
                </h1>
                <p className="text-xs text-imperial-gold font-exo">
                  Dark Side Developer
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 rounded-2xl font-orbitron text-sm font-medium transition-all duration-300 group glass-btn ${
                      isActive
                        ? "text-imperial-gold glass-gold border-imperial-red"
                        : "text-imperial-white hover:text-imperial-gold"
                    }`}
                    whileHover={isMobile ? {} : { scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ willChange: "transform" }}
                  >
                    <div className="flex items-center space-x-2">
                      <IconComponent size={16} />
                      <span>{item.label}</span>
                    </div>

                    {/* Hover Quote */}
                    <motion.div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 glass-panel glass-imperial rounded-2xl text-xs text-imperial-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap holo-panel"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                    >
                      {item.quote}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-imperial-red" />
                    </motion.div>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-imperial-red lightsaber-glow"
                        layoutId="activeIndicator"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-text-secondary hover:text-imperial-red transition-colors btn-accessible glass-btn"
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-16 right-0 bottom-0 w-80 glass-section glass-imperial z-40 overflow-hidden"
          >
            <div className="glass-overlay" />
            <div className="relative z-10 p-6 space-y-4">
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left p-4 rounded-2xl font-orbitron font-medium transition-all duration-300 glass-card ${
                      isActive
                        ? "text-imperial-gold glass-gold border-imperial-red"
                        : "text-imperial-white hover:text-imperial-gold"
                    }`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent size={20} />
                      <div>
                        <div className="text-lg">{item.label}</div>
                        <div className="text-xs text-imperial-gold opacity-70">
                          {item.quote}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-imperial-black bg-opacity-50 z-30 lg:hidden"
        />
      )}
    </>
  );
}
