"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sword, Shield, Zap, Contact, Home } from "lucide-react";

const navigationItems = [
  { id: "home", label: "COMMAND CENTER", icon: Home },
  { id: "about", label: "IMPERIAL FLEET", icon: Shield },
  { id: "skills", label: "DARK POWERS", icon: Zap },
  { id: "projects", label: "ARCHIVES", icon: Sword },
  { id: "contact", label: "TRANSMISSION", icon: Contact },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navigationItems.map((item) =>
        document.getElementById(item.id)
      );
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (
          section &&
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(section.id);
          break;
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
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Navigation Bar */}
      <motion.div
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.nav
          className={`
            relative px-6 py-3 rounded-2xl backdrop-blur-xl
            border border-imperial-red/30 shadow-2xl
            transition-all duration-500 ease-out
            ${
              isScrolled
                ? "bg-black/90 shadow-lightsaber-red"
                : "bg-black/60 shadow-glow-subtle"
            }
          `}
          animate={{
            boxShadow: isScrolled
              ? "0 0 30px rgba(220, 38, 38, 0.3), 0 8px 32px rgba(0, 0, 0, 0.8)"
              : "0 0 20px rgba(59, 130, 246, 0.1), 0 8px 32px rgba(0, 0, 0, 0.6)",
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-imperial-red/20 via-transparent to-imperial-gold/20"
            animate={{
              background: [
                "linear-gradient(90deg, rgba(220, 38, 38, 0.2) 0%, transparent 50%, rgba(212, 175, 55, 0.2) 100%)",
                "linear-gradient(90deg, rgba(212, 175, 55, 0.2) 0%, transparent 50%, rgba(220, 38, 38, 0.2) 100%)",
                "linear-gradient(90deg, rgba(220, 38, 38, 0.2) 0%, transparent 50%, rgba(212, 175, 55, 0.2) 100%)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating particles effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-imperial-gold/40 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>

          <div className="relative flex items-center space-x-6">
            {/* Imperial Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div
                  className="w-8 h-8 border-2 border-imperial-red rounded-full bg-black/50"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="absolute inset-1 border border-imperial-gold rounded-full">
                    <div className="absolute inset-1 bg-imperial-red rounded-full opacity-60" />
                  </div>
                </motion.div>
                <motion.div
                  className="absolute inset-0 w-8 h-8 border border-imperial-gold/30 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-orbitron font-black text-imperial-gold">
                  DARTH LISAN
                </h1>
                <p className="text-xs text-imperial-red/80 font-exo -mt-1">
                  Dark Side Developer
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation Items */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      relative px-4 py-2 rounded-xl font-orbitron text-sm font-medium 
                      transition-all duration-300 group overflow-hidden
                      ${
                        isActive
                          ? "text-imperial-gold bg-imperial-red/20 border border-imperial-red/40"
                          : "text-white/80 hover:text-imperial-gold hover:bg-white/10"
                      }
                    `}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-imperial-red/0 via-imperial-red/10 to-imperial-red/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />

                    <div className="relative flex items-center space-x-2">
                      <IconComponent size={16} />
                      <span className="hidden xl:inline">{item.label}</span>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-imperial-red to-imperial-gold"
                        layoutId="activeIndicator"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}

                    {/* Tooltip for smaller screens */}
                    <motion.div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 
                                 bg-black/90 backdrop-blur-sm rounded-lg text-xs text-imperial-gold 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                                 whitespace-nowrap xl:hidden border border-imperial-red/30"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                    >
                      {item.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 text-white/80 hover:text-imperial-red transition-colors 
                         rounded-xl hover:bg-white/10 border border-white/10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </motion.nav>
      </motion.div>

      {/* Mobile Bottom Sheet Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Floating Mobile Menu */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className="fixed bottom-4 left-4 right-4 z-50 lg:hidden"
            >
              <div className="bg-black/95 backdrop-blur-xl border border-imperial-red/30 rounded-2xl overflow-hidden shadow-2xl shadow-lightsaber-red">
                {/* Handle */}
                <div className="flex justify-center pt-4 pb-2">
                  <div className="w-12 h-1 bg-imperial-red/50 rounded-full" />
                </div>

                {/* Menu Items */}
                <div className="px-6 pb-6 pt-2 space-y-2">
                  {navigationItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`
                          w-full text-left p-4 rounded-xl font-orbitron font-medium 
                          transition-all duration-300 flex items-center space-x-4
                          ${
                            isActive
                              ? "text-imperial-gold bg-imperial-red/20 border border-imperial-red/40"
                              : "text-white/80 hover:text-imperial-gold hover:bg-white/10"
                          }
                        `}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`flex items-center justify-center w-12 h-12 rounded-xl ${
                            isActive ? "bg-imperial-red/30" : "bg-white/10"
                          }`}
                        >
                          <IconComponent size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="text-base font-medium">
                            {item.label}
                          </div>
                        </div>
                        {isActive && (
                          <motion.div
                            className="w-2 h-2 bg-imperial-red rounded-full"
                            layoutId="mobileActiveIndicator"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
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
