"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sword, Shield, Zap, Contact, Home } from "lucide-react";

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-space-black bg-opacity-95 backdrop-blur-md border-b border-imperial-gray"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Imperial Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 relative">
                <motion.div
                  className="w-full h-full border-2 border-imperial-red rounded-full bg-imperial-black"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="absolute inset-1 border border-imperial-gold rounded-full">
                    <div className="absolute inset-1 bg-imperial-red rounded-full lightsaber-glow opacity-80" />
                  </div>
                </motion.div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-orbitron font-black text-imperial-red sith-text heading-imperial">
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
                    className={`relative px-4 py-2 rounded-2xl font-orbitron text-sm font-medium transition-all duration-300 group ${
                      isActive
                        ? "text-imperial-gold bg-imperial-red bg-opacity-20 border border-imperial-red"
                        : "text-imperial-white hover:text-imperial-gold"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center space-x-2">
                      <IconComponent size={16} />
                      <span>{item.label}</span>
                    </div>

                    {/* Hover Quote */}
                    <motion.div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-imperial-black border border-imperial-red rounded-2xl text-xs text-imperial-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
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
              className="md:hidden p-2 text-text-secondary hover:text-imperial-red transition-colors btn-accessible"
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
            className={`md:hidden fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${
              isOpen
                ? "bg-space-black bg-opacity-95 backdrop-blur-md border-b border-imperial-gray"
                : "bg-transparent pointer-events-none"
            }`}
          >
            <div className="flex flex-col p-6 space-y-6">
              <div className="text-center border-b border-imperial-red pb-6">
                <h2 className="text-2xl font-orbitron font-bold text-imperial-red sith-text">
                  IMPERIAL MENU
                </h2>
                <p className="text-imperial-gold text-sm mt-2">
                  Choose your destination
                </p>
              </div>

              {navigationItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full p-4 rounded-3xl border text-left transition-all duration-300 group ${
                      isActive
                        ? "bg-imperial-red bg-opacity-20 border-imperial-red text-imperial-gold"
                        : "border-imperial-gray hover:border-imperial-red text-imperial-white hover:text-imperial-gold"
                    }`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <IconComponent size={20} />
                      <span className="font-orbitron font-medium">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-xs text-imperial-gold opacity-80 group-hover:opacity-100">
                      {item.quote}
                    </p>

                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-imperial-red lightsaber-glow"
                        layoutId="mobileActiveIndicator"
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Imperial Quote */}
              <motion.div
                className="mt-8 p-4 border border-imperial-red rounded-3xl bg-imperial-red bg-opacity-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-imperial-gold text-sm italic text-center">
                  "The Force is strong with this developer"
                </p>
                <p className="text-imperial-red text-xs text-center mt-2 font-orbitron">
                  - DARTH VADER
                </p>
              </motion.div>

              {/* Hidden Admin Access */}
              <motion.div
                className="mt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <button
                  onClick={() => (window.location.href = "/admin")}
                  className="text-xs text-imperial-gray hover:text-imperial-red transition-colors opacity-50 hover:opacity-100"
                  title="Imperial Command Center"
                >
                  ⚡ Command Access ⚡
                </button>
              </motion.div>
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
