"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  Send,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Radio,
  Shield,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { ContactForm } from "@/types";
import ContactBackground3D from "@/components/3d/ContactBackground3D";

const contactMethods = [
  {
    icon: Mail,
    label: "Imperial Transmission",
    value: "darth.lisan@empire.gov",
    href: "mailto:darth.lisan@empire.gov",
    description: "Direct line to the Dark Lord",
  },
  {
    icon: Github,
    label: "Imperial Archives",
    value: "github.com/LisanHsn",
    href: "https://github.com/LisanHsn",
    description: "Repository of Imperial projects",
  },
  {
    icon: Linkedin,
    label: "Professional Network",
    value: "linkedin.com/in/lisan-hsn",
    href: "https://linkedin.com/in/lisan-hsn",
    description: "Imperial career command",
  },
  {
    icon: MapPin,
    label: "Current Location",
    value: "Death Star, Outer Rim",
    href: "#",
    description: "Galactic coordinates classified",
  },
];

const transmissionTypes = [
  {
    value: "urgent",
    label: "URGENT - Immediate Response Required",
    color: "#dc2626",
  },
  {
    value: "standard",
    label: "STANDARD - Regular Imperial Business",
    color: "#d4af37",
  },
  {
    value: "encrypted",
    label: "ENCRYPTED - Top Secret Communication",
    color: "#1e40af",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
    transmission_type: "standard",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3 });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        transmission_type: "standard",
      });
    }, 2000);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative min-h-screen py-10 sm:py-16 lg:py-20 bg-imperial-gradient overflow-hidden glass-section"
    >
      {/* Glass Overlay */}
      <div className="glass-overlay" />

      {/* 3D Background */}
      <ContactBackground3D />

      {/* Transmission Grid Background */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute glass-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Radio className="w-8 h-8 text-energy-blue" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16 glass-panel glass-imperial p-8 rounded-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-black text-imperial-red mb-4 sm:mb-6 sith-text heading-imperial holo-text"
            initial={{ scale: 0.5 }}
            animate={{ scale: inView ? 1 : 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            IMPERIAL TRANSMISSION
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-imperial-gold font-inter max-w-3xl mx-auto text-readable gold-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Establish communication with the Dark Lord. Join the Empire or
            request Imperial services through secure transmission protocols.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card glass-imperial p-6 rounded-3xl"
          >
            <h3 className="text-2xl sm:text-3xl font-orbitron font-bold text-imperial-gold mb-6 sm:mb-8 heading-imperial gold-glow holo-text">
              COMMUNICATION CHANNELS
            </h3>

            <div className="space-y-4 sm:space-y-6">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target={
                      method.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      method.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block glass-card p-6 rounded-3xl hover:glass-gold transition-all duration-300 group holo-panel"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: inView ? 1 : 0,
                      y: inView ? 0 : 30,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + index * 0.1,
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="glass-panel glass-imperial p-3 rounded-2xl group-hover:glass-gold transition-all duration-300">
                        <IconComponent className="w-6 h-6 text-imperial-red group-hover:text-imperial-gold transition-colors duration-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-orbitron font-bold text-imperial-gold mb-1 holo-text">
                          {method.label}
                        </h4>
                        <p className="text-imperial-white text-sm sm:text-base break-all">
                          {method.value}
                        </p>
                        <p className="text-imperial-gold text-xs opacity-80 mt-1">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Imperial Warning */}
            <motion.div
              className="mt-8 glass-panel glass-imperial p-4 rounded-2xl border border-imperial-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-imperial-red" />
                <div>
                  <h4 className="text-imperial-red font-orbitron font-bold text-sm holo-text">
                    IMPERIAL SECURITY NOTICE
                  </h4>
                  <p className="text-imperial-white text-xs opacity-80">
                    All transmissions are monitored and encrypted by Imperial
                    Intelligence
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {!submitted ? (
              <div className="glass-panel glass-imperial rounded-3xl p-4 sm:p-6 lg:p-8 holo-panel">
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <Shield className="w-6 h-6 text-imperial-red" />
                  <h3 className="text-2xl font-orbitron font-bold text-imperial-white holo-text">
                    SECURE TRANSMISSION
                  </h3>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Transmission Type */}
                  <div>
                    <label className="block text-imperial-gold font-orbitron text-sm font-bold mb-3">
                      TRANSMISSION PRIORITY
                    </label>
                    <div className="space-y-2">
                      {transmissionTypes.map((type) => (
                        <label
                          key={type.value}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="transmission_type"
                            value={type.value}
                            checked={formData.transmission_type === type.value}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-imperial-red bg-space-medium border-2 border-imperial-gray focus:ring-imperial-red focus:ring-2"
                          />
                          <span
                            className="text-sm font-medium"
                            style={{ color: type.color }}
                          >
                            {type.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="block text-imperial-gold font-orbitron text-sm font-bold mb-2 holo-text">
                      OPERATIVE NAME
                    </label>
                    <div className="glass-panel glass-imperial p-1 rounded-2xl">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-transparent border-2 border-imperial-gray rounded-2xl text-imperial-white placeholder-imperial-gold placeholder-opacity-70 focus:border-imperial-red focus:ring-2 focus:ring-imperial-red focus:ring-opacity-25 focus:outline-none transition-all duration-300 glass-btn"
                        placeholder="Enter your designation..."
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-imperial-gold font-orbitron text-sm font-bold mb-2 holo-text">
                      TRANSMISSION FREQUENCY
                    </label>
                    <div className="glass-panel glass-imperial p-1 rounded-2xl">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-transparent border-2 border-imperial-gray rounded-2xl text-imperial-white placeholder-imperial-gold placeholder-opacity-70 focus:border-imperial-red focus:ring-2 focus:ring-imperial-red focus:ring-opacity-25 focus:outline-none transition-all duration-300 glass-btn"
                        placeholder="operative@empire.gov"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-imperial-gold font-orbitron text-sm font-bold mb-2 holo-text">
                      MISSION SUBJECT
                    </label>
                    <div className="glass-panel glass-imperial p-1 rounded-2xl">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-transparent border-2 border-imperial-gray rounded-2xl text-imperial-white placeholder-imperial-gold placeholder-opacity-70 focus:border-imperial-red focus:ring-2 focus:ring-imperial-red focus:ring-opacity-25 focus:outline-none transition-all duration-300 glass-btn"
                        placeholder="Brief subject of transmission..."
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-imperial-gold font-orbitron text-sm font-bold mb-2 holo-text">
                      ENCRYPTED MESSAGE
                    </label>
                    <div className="glass-panel glass-imperial p-1 rounded-2xl">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-transparent border-2 border-imperial-gray rounded-2xl text-imperial-white placeholder-imperial-gold placeholder-opacity-70 focus:border-imperial-red focus:ring-2 focus:ring-imperial-red focus:ring-opacity-25 focus:outline-none resize-none transition-all duration-300 glass-btn"
                        placeholder="Your message to the Dark Lord... Choose your words carefully."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full glass-btn glass-imperial px-6 py-4 rounded-2xl font-orbitron font-bold text-imperial-white hover:text-imperial-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-imperial-red hover:glass-gold"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-3">
                        <motion.div
                          className="w-5 h-5 border-2 border-imperial-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <span>TRANSMITTING...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <Send className="w-5 h-5" />
                        <span>EXECUTE TRANSMISSION</span>
                      </div>
                    )}
                  </motion.button>

                  {/* Security Notice */}
                  <div className="bg-imperial-red bg-opacity-10 border border-imperial-red rounded-3xl p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-imperial-red mt-0.5" />
                      <div className="text-sm text-imperial-white">
                        <p className="font-bold text-imperial-red mb-1">
                          SECURITY NOTICE
                        </p>
                        <p>
                          All transmissions are monitored by Imperial
                          Intelligence. Unauthorized communications will result
                          in immediate pursuit by Imperial forces.
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <motion.div
                className="bg-imperial-black bg-opacity-50 border border-green-500 rounded-3xl p-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-16 h-16 bg-green-500 bg-opacity-20 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-8 h-8 text-green-500" />
                </motion.div>

                <h3 className="text-2xl font-orbitron font-bold text-green-500 mb-4">
                  TRANSMISSION SUCCESSFUL
                </h3>
                <p className="text-imperial-white mb-6">
                  Your message has been received by Imperial Command. Lord Vader
                  will review your transmission and respond accordingly.
                </p>
                <p className="text-imperial-gold text-sm">
                  Expected response time: 24-48 Imperial Standard Hours
                </p>

                <motion.button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 border border-imperial-gold text-imperial-gold rounded-2xl hover:bg-imperial-gold hover:text-imperial-black transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Send Another Transmission
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Imperial Quote */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="bg-imperial-black bg-opacity-50 border border-imperial-gold rounded-3xl p-6 max-w-2xl mx-auto">
            <p className="text-lg text-imperial-red font-mono italic sith-text mb-2">
              "You may dispense with the pleasantries, Commander. I am here to
              put you back on schedule."
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
