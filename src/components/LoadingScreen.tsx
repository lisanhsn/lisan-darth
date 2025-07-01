"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("INITIALIZING");

  const phases = [
    "INITIALIZING EMPIRE PROTOCOLS",
    "ACCESSING IMPERIAL ARCHIVES",
    "CONNECTING TO DEATH STAR",
    "LOADING DARK SIDE POWERS",
    "PREPARING FOR IMPERIAL MARCH",
    "READY TO EXECUTE ORDER 66",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress < 100) {
          const phaseIndex = Math.floor((newProgress / 100) * phases.length);
          setPhase(phases[phaseIndex]);
          return newProgress;
        }
        clearInterval(interval);
        return 100;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-imperial-black loading-screen"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="star-field opacity-30" />

        {/* Hyperspace Lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-imperial-blue opacity-20"
              style={{
                width: "2px",
                height: "100px",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scaleY: [1, 20, 1],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto px-6">
        {/* Imperial Logo */}
        <motion.div
          className="mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-24 h-24 mx-auto border-4 border-imperial-red rounded-full relative">
            <div className="absolute inset-2 border-2 border-imperial-gold rounded-full">
              <div className="absolute inset-2 bg-imperial-red rounded-full lightsaber-glow" />
            </div>
          </div>
        </motion.div>

        {/* Imperial Text */}
        <motion.h1
          className="text-4xl font-orbitron font-bold text-imperial-red mb-4 sith-text"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          IMPERIAL ARCHIVES
        </motion.h1>

        <motion.p
          className="text-imperial-gold font-exo text-lg mb-8"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          ACCESSING DARK SIDE DEVELOPER PORTFOLIO
        </motion.p>

        {/* Loading Phase */}
        <motion.div
          className="mb-6"
          key={phase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-imperial-white font-mono text-sm tracking-wider">
            {phase}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full bg-imperial-gray rounded-full h-2 mb-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-imperial-red to-imperial-gold lightsaber-glow"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.p
          className="text-imperial-gold font-orbitron text-xl font-bold"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {Math.round(progress)}%
        </motion.p>

        {/* Warning Message */}
        <motion.div
          className="mt-8 p-4 border border-imperial-red rounded-3xl bg-imperial-black bg-opacity-50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-imperial-red text-xs font-mono">
            ⚠ WARNING: Accessing Imperial classified information. Unauthorized
            access will result in immediate termination.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
