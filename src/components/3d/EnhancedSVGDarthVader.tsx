"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface EnhancedSVGDarthVaderProps {
  mousePosition?: { x: number; y: number };
  className?: string;
  isInteracting?: boolean;
  onClick?: () => void;
}

export default function EnhancedSVGDarthVader({
  mousePosition = { x: 0, y: 0 },
  className = "",
  onClick,
}: EnhancedSVGDarthVaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreathingPhase((prev) => (prev + 0.1) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    onClick?.();
  };

  const breathingScale = 1 + Math.sin(breathingPhase) * 0.02;
  const eyeGlow = 0.8 + Math.sin(breathingPhase * 2) * 0.4;
  const rotateY = mousePosition.x * 20;
  const rotateX = -mousePosition.y * 15;

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      animate={{
        scale: isClicked ? 0.95 : isHovered ? 1.05 : 1,
        rotateY: rotateY,
        rotateX: rotateX,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.svg
        width="400"
        height="500"
        viewBox="0 0 400 500"
        className="drop-shadow-2xl"
        animate={{ scale: breathingScale }}
        style={{
          filter: `drop-shadow(0 20px 40px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 ${
            isHovered ? 60 : 30
          }px rgba(220, 38, 38, ${eyeGlow * 0.5}))`,
        }}
      >
        <defs>
          <radialGradient id="enhancedHelmetGradient" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#4a4a4a" />
            <stop offset="60%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>

          <radialGradient id="enhancedEyeGradient" cx="0.5" cy="0.3" r="0.7">
            <stop offset="0%" stopColor="#ff4444" />
            <stop offset="30%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#450a0a" />
          </radialGradient>

          <linearGradient id="capeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>

          <filter id="redGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Cape */}
        <motion.path
          d="M120 180 Q100 220 80 300 Q70 350 80 400 Q90 450 120 480 L280 480 Q310 450 320 400 Q330 350 320 300 Q300 220 280 180 Z"
          fill="url(#capeGradient)"
          animate={{
            d: isHovered
              ? "M115 180 Q95 220 75 300 Q65 350 75 400 Q85 450 115 480 L285 480 Q315 450 325 400 Q335 350 325 300 Q305 220 285 180 Z"
              : "M120 180 Q100 220 80 300 Q70 350 80 400 Q90 450 120 480 L280 480 Q310 450 320 400 Q330 350 320 300 Q300 220 280 180 Z",
          }}
        />

        {/* Helmet */}
        <motion.ellipse
          cx="200"
          cy="120"
          rx="90"
          ry="100"
          fill="url(#enhancedHelmetGradient)"
          animate={{ rx: [90, 92, 90], ry: [100, 102, 100] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Face Mask */}
        <motion.path
          d="M130 140 Q200 130 270 140 Q275 160 270 180 Q200 190 130 180 Q125 160 130 140 Z"
          fill="#0d0d0d"
          animate={{
            d: isHovered
              ? "M125 140 Q200 125 275 140 Q280 160 275 180 Q200 195 125 180 Q120 160 125 140 Z"
              : "M130 140 Q200 130 270 140 Q275 160 270 180 Q200 190 130 180 Q125 160 130 140 Z",
          }}
        />

        {/* Eyes with Glow */}
        <motion.circle
          cx="170"
          cy="145"
          r="12"
          fill="url(#enhancedEyeGradient)"
          filter="url(#redGlow)"
          animate={{
            r: [12, 14, 12],
            opacity: [eyeGlow, 1, eyeGlow],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.circle
          cx="230"
          cy="145"
          r="12"
          fill="url(#enhancedEyeGradient)"
          filter="url(#redGlow)"
          animate={{
            r: [12, 14, 12],
            opacity: [eyeGlow, 1, eyeGlow],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Breathing Apparatus */}
        <motion.ellipse
          cx="200"
          cy="200"
          rx="25"
          ry="35"
          fill="#333333"
          animate={{ ry: [35, 37, 35] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Imperial Symbol */}
        <motion.g
          transform="translate(200, 280)"
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isClicked ? 360 : 0,
          }}
        >
          <circle r="20" fill="#ffd700" opacity="0.8" />
          <path
            d="M-12,-12 L12,12 M12,-12 L-12,12 M0,-15 L0,15 M-15,0 L15,0"
            stroke="#2a1810"
            strokeWidth="2"
          />
        </motion.g>

        {/* Force Lightning when hovered */}
        {isHovered && (
          <g opacity="0.7">
            {[...Array(3)].map((_, i) => (
              <motion.path
                key={i}
                d={`M${100 + i * 50},${300 + i * 20} Q${150 + i * 30},${
                  250 + i * 10
                } ${200 + i * 40},${300 + i * 15}`}
                stroke="#4FC3F7"
                strokeWidth="2"
                fill="none"
                animate={{
                  opacity: [0, 1, 0],
                  pathLength: [0, 1, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </g>
        )}

        {/* Click Effect */}
        {isClicked && (
          <motion.circle
            cx="200"
            cy="200"
            r="0"
            fill="none"
            stroke="#ff0000"
            strokeWidth="3"
            animate={{
              r: [0, 150],
              opacity: [1, 0],
              strokeWidth: [3, 0],
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </motion.svg>

      {/* Power Level Indicator */}
      {isHovered && (
        <motion.div
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-space-dark/80 backdrop-blur-sm border border-imperial-red rounded-lg px-4 py-2">
            <div className="text-imperial-gold text-xs font-orbitron font-bold text-center">
              POWER LEVEL: {Math.round(eyeGlow * 100)}%
            </div>
            <div className="w-16 h-1 bg-space-medium rounded mt-1">
              <motion.div
                className="h-full bg-gradient-to-r from-imperial-red to-imperial-gold rounded"
                animate={{ width: `${eyeGlow * 100}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
