"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Shield,
  Zap,
  Code,
  Heart,
  ArrowUp,
} from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    label: "Imperial Archives",
    href: "https://github.com/LisanHsn",
    description: "Source code repository",
  },
  {
    icon: Linkedin,
    label: "Professional Network",
    href: "https://linkedin.com/in/lisan-hsn",
    description: "Career command center",
  },
  {
    icon: Twitter,
    label: "Imperial Broadcasts",
    href: "https://twitter.com/LisanHsn",
    description: "Real-time updates",
  },
  {
    icon: Mail,
    label: "Direct Transmission",
    href: "mailto:darth.lisan@empire.gov",
    description: "Encrypted communication",
  },
];

const quickLinks = [
  { label: "Command Center", href: "#home" },
  { label: "Imperial Fleet", href: "#about" },
  { label: "Dark Powers", href: "#skills" },
  { label: "Archives", href: "#projects" },
  { label: "Transmission", href: "#contact" },
];

const technologiesUsed = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Three.js",
  "Vercel",
];

export default function ImperialFooter() {
  const [currentYear, setCurrentYear] = useState(2024);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-imperial-black border-t border-imperial-red overflow-hidden glass-section">
      {/* Glass Overlay */}
      <div className="glass-overlay" />

      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern" />

        {/* Floating Imperial Symbols */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 border border-imperial-red rounded-full glass-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Imperial Identity */}
          <div className="lg:col-span-2">
            <motion.div
              className="mb-8 glass-panel glass-imperial p-6 rounded-3xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Imperial Logo */}
              <div className="flex items-center space-x-4 mb-6">
                <motion.div
                  className="w-12 h-12 border-2 border-imperial-red rounded-full bg-imperial-black relative glass-float"
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
                <div>
                  <h3 className="text-2xl font-orbitron font-bold text-imperial-red sith-text holo-text">
                    DARTH LISAN
                  </h3>
                  <p className="text-imperial-gold font-exo">
                    Dark Side Developer
                  </p>
                </div>
              </div>

              <p className="text-imperial-white leading-relaxed mb-6">
                A self-taught developer who has embraced the dark side of
                programming. Building digital empires across web and mobile
                platforms with the power of modern frameworks and the wisdom of
                the Sith.
              </p>

              {/* Imperial Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel glass-imperial rounded-3xl p-3 text-center">
                  <div className="text-2xl font-orbitron font-bold text-imperial-red holo-text">
                    42
                  </div>
                  <div className="text-xs text-imperial-gold">PROJECTS</div>
                </div>
                <div className="glass-panel glass-imperial rounded-3xl p-3 text-center">
                  <div className="text-2xl font-orbitron font-bold text-imperial-red holo-text">
                    100%
                  </div>
                  <div className="text-xs text-imperial-gold">DARK SIDE</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Navigation */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-3xl"
            >
              <h4 className="text-lg font-orbitron font-bold text-imperial-gold mb-6 flex items-center holo-text">
                <Shield className="w-5 h-5 mr-2" />
                IMPERIAL NAVIGATION
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="text-imperial-white hover:text-imperial-gold transition-colors duration-300 flex items-center group glass-btn px-2 py-1 rounded-lg"
                    >
                      <span className="w-2 h-2 bg-imperial-red rounded-full mr-3 group-hover:bg-imperial-gold transition-colors duration-300" />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Technologies */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-3xl"
            >
              <h4 className="text-lg font-orbitron font-bold text-imperial-gold mb-6 flex items-center holo-text">
                <Code className="w-5 h-5 mr-2" />
                IMPERIAL ARSENAL
              </h4>
              <div className="flex flex-wrap gap-2">
                {technologiesUsed.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 glass-panel glass-imperial rounded-full text-xs text-imperial-white border border-imperial-gray hover:border-imperial-gold transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Social Links */}
        <motion.div
          className="border-t border-imperial-gray pt-8 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-btn glass-imperial p-3 rounded-2xl hover:glass-gold transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    title={social.description}
                  >
                    <IconComponent className="w-5 h-5 text-imperial-red group-hover:text-imperial-gold transition-colors duration-300" />
                  </motion.a>
                );
              })}
            </div>

            {/* Scroll to Top */}
            {showScrollTop && (
              <motion.button
                onClick={scrollToTop}
                className="glass-btn glass-imperial p-3 rounded-full hover:glass-gold transition-all duration-300 group"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Return to Command Center"
              >
                <ArrowUp className="w-5 h-5 text-imperial-red group-hover:text-imperial-gold transition-colors duration-300" />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Copyright & Attribution */}
        <motion.div
          className="glass-panel glass-imperial p-6 rounded-3xl text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-imperial-white text-sm">
              © {currentYear} Darth Lisan. All rights reserved to the Empire.
            </p>
            <div className="flex items-center space-x-2 text-imperial-gold text-sm">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-imperial-red" />
              <span>and the power of the dark side</span>
            </div>
          </div>

          {/* Imperial Declaration */}
          <motion.div
            className="mt-4 pt-4 border-t border-imperial-gray"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-xs text-imperial-gold italic holo-text">
              "Your lack of faith in my portfolio is disturbing." - Darth Lisan
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
