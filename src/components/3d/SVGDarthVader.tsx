"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface SVGDarthVaderProps {
  mousePosition?: { x: number; y: number };
  className?: string;
}

export default function SVGDarthVader({
  mousePosition = { x: 0, y: 0 },
  className = "",
}: SVGDarthVaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const vaderRef = useRef<SVGSVGElement>(null);

  // Calculate rotation based on mouse position
  const rotateY = mousePosition.x * 15; // Max 15 degrees rotation
  const rotateX = -mousePosition.y * 10; // Max 10 degrees rotation

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <svg
        ref={vaderRef}
        width="400"
        height="500"
        viewBox="0 0 400 500"
        className="drop-shadow-2xl"
        style={{
          filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))",
        }}
      >
        {/* Gradient Definitions */}
        <defs>
          {/* Helmet Main Gradient */}
          <radialGradient id="helmetGradient" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#4a4a4a" />
            <stop offset="30%" stopColor="#2a2a2a" />
            <stop offset="60%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </radialGradient>

          {/* Face Mask Gradient */}
          <linearGradient
            id="faceMaskGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="50%" stopColor="#0d0d0d" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>

          {/* Eye Lens Gradient */}
          <radialGradient id="eyeGradient" cx="0.5" cy="0.3" r="0.7">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="30%" stopColor="#dc2626" />
            <stop offset="70%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#450a0a" />
          </radialGradient>

          {/* Breathing Apparatus Gradient */}
          <linearGradient
            id="breathingGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#555555" />
            <stop offset="50%" stopColor="#333333" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>

          {/* Cape Gradient */}
          <linearGradient id="capeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="50%" stopColor="#0a0a0a" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>

          {/* Imperial Symbol Gradient */}
          <radialGradient id="imperialGradient" cx="0.5" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#b8860b" />
          </radialGradient>

          {/* Glow Filter */}
          <filter id="redGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Shadow Filter */}
          <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" result="offset" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Cape/Body */}
        <motion.path
          d="M120 180 Q100 220 80 300 Q70 350 80 400 Q90 450 120 480 L280 480 Q310 450 320 400 Q330 350 320 300 Q300 220 280 180 Z"
          fill="url(#capeGradient)"
          filter="url(#dropshadow)"
          animate={{
            d: isHovered
              ? "M115 180 Q95 220 75 300 Q65 350 75 400 Q85 450 115 480 L285 480 Q315 450 325 400 Q335 350 325 300 Q305 220 285 180 Z"
              : "M120 180 Q100 220 80 300 Q70 350 80 400 Q90 450 120 480 L280 480 Q310 450 320 400 Q330 350 320 300 Q300 220 280 180 Z",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Cape Folds */}
        <path
          d="M140 200 Q135 240 130 280 Q125 320 130 360"
          stroke="#333333"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M260 200 Q265 240 270 280 Q275 320 270 360"
          stroke="#333333"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />

        {/* Chest Panel */}
        <rect
          x="160"
          y="220"
          width="80"
          height="100"
          rx="10"
          fill="url(#faceMaskGradient)"
          filter="url(#dropshadow)"
        />

        {/* Chest Panel Details */}
        <rect
          x="170"
          y="230"
          width="15"
          height="4"
          fill="#dc2626"
          opacity="0.8"
        />
        <rect
          x="170"
          y="240"
          width="10"
          height="3"
          fill="#059669"
          opacity="0.8"
        />
        <rect
          x="170"
          y="250"
          width="12"
          height="3"
          fill="#d4af37"
          opacity="0.8"
        />
        <rect
          x="190"
          y="230"
          width="8"
          height="8"
          fill="#1e40af"
          opacity="0.8"
        />
        <rect
          x="205"
          y="235"
          width="6"
          height="6"
          fill="#dc2626"
          opacity="0.8"
        />
        <rect
          x="220"
          y="230"
          width="10"
          height="4"
          fill="#059669"
          opacity="0.8"
        />

        {/* Helmet Main Structure */}
        <motion.ellipse
          cx="200"
          cy="120"
          rx="85"
          ry="90"
          fill="url(#helmetGradient)"
          filter="url(#dropshadow)"
          animate={{
            ry: isHovered ? 92 : 90,
            rx: isHovered ? 87 : 85,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Helmet Top Ridge */}
        <path
          d="M130 80 Q200 70 270 80 Q260 85 200 75 Q140 85 130 80 Z"
          fill="#555555"
          filter="url(#dropshadow)"
        />

        {/* Face Mask */}
        <motion.path
          d="M150 140 Q200 130 250 140 Q250 180 200 190 Q150 180 150 140 Z"
          fill="url(#faceMaskGradient)"
          filter="url(#dropshadow)"
          animate={{
            d: isHovered
              ? "M148 140 Q200 128 252 140 Q252 182 200 192 Q148 182 148 140 Z"
              : "M150 140 Q200 130 250 140 Q250 180 200 190 Q150 180 150 140 Z",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Face Mask Details */}
        <path
          d="M160 150 Q200 145 240 150"
          stroke="#666666"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M165 165 Q200 160 235 165"
          stroke="#666666"
          strokeWidth="1"
          fill="none"
        />

        {/* Eye Lenses */}
        <motion.ellipse
          cx="175"
          cy="155"
          rx="18"
          ry="12"
          fill="url(#eyeGradient)"
          filter="url(#redGlow)"
          animate={{
            rx: isHovered ? 20 : 18,
            ry: isHovered ? 14 : 12,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.ellipse
          cx="225"
          cy="155"
          rx="18"
          ry="12"
          fill="url(#eyeGradient)"
          filter="url(#redGlow)"
          animate={{
            rx: isHovered ? 20 : 18,
            ry: isHovered ? 14 : 12,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Eye Glow Effect */}
        <motion.ellipse
          cx="175"
          cy="155"
          rx="25"
          ry="18"
          fill="rgba(220, 38, 38, 0.3)"
          filter="url(#redGlow)"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.ellipse
          cx="225"
          cy="155"
          rx="25"
          ry="18"
          fill="rgba(220, 38, 38, 0.3)"
          filter="url(#redGlow)"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
        />

        {/* Breathing Apparatus */}
        <motion.rect
          x="185"
          y="170"
          width="30"
          height="40"
          rx="15"
          fill="url(#breathingGradient)"
          filter="url(#dropshadow)"
          animate={{
            scaleY: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Breathing Apparatus Details */}
        <circle cx="192" cy="185" r="2" fill="#dc2626" opacity="0.8" />
        <circle cx="208" cy="185" r="2" fill="#dc2626" opacity="0.8" />
        <rect x="190" y="195" width="4" height="8" fill="#555555" />
        <rect x="206" y="195" width="4" height="8" fill="#555555" />

        {/* Imperial Symbol */}
        <motion.circle
          cx="200"
          cy="100"
          r="12"
          fill="url(#imperialGradient)"
          filter="url(#dropshadow)"
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Imperial Symbol Details */}
        <path
          d="M200 92 L208 100 L200 108 L192 100 Z"
          fill="#000000"
          opacity="0.3"
        />

        {/* Helmet Side Vents */}
        <rect x="120" y="140" width="8" height="20" rx="4" fill="#333333" />
        <rect x="272" y="140" width="8" height="20" rx="4" fill="#333333" />

        {/* Vent Details */}
        <line
          x1="122"
          y1="145"
          x2="126"
          y2="145"
          stroke="#555555"
          strokeWidth="1"
        />
        <line
          x1="122"
          y1="150"
          x2="126"
          y2="150"
          stroke="#555555"
          strokeWidth="1"
        />
        <line
          x1="122"
          y1="155"
          x2="126"
          y2="155"
          stroke="#555555"
          strokeWidth="1"
        />
        <line
          x1="274"
          y1="145"
          x2="278"
          y2="145"
          stroke="#555555"
          strokeWidth="1"
        />
        <line
          x1="274"
          y1="150"
          x2="278"
          y2="150"
          stroke="#555555"
          strokeWidth="1"
        />
        <line
          x1="274"
          y1="155"
          x2="278"
          y2="155"
          stroke="#555555"
          strokeWidth="1"
        />

        {/* Shoulder Pads */}
        <ellipse
          cx="130"
          cy="190"
          rx="25"
          ry="15"
          fill="url(#helmetGradient)"
          filter="url(#dropshadow)"
          transform="rotate(-20 130 190)"
        />
        <ellipse
          cx="270"
          cy="190"
          rx="25"
          ry="15"
          fill="url(#helmetGradient)"
          filter="url(#dropshadow)"
          transform="rotate(20 270 190)"
        />

        {/* Control Panel on Chest */}
        <rect
          x="175"
          y="280"
          width="50"
          height="25"
          rx="5"
          fill="#1a1a1a"
          filter="url(#dropshadow)"
        />

        {/* Control Panel Buttons */}
        <motion.circle
          cx="185"
          cy="292"
          r="3"
          fill="#dc2626"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.circle
          cx="200"
          cy="292"
          r="3"
          fill="#059669"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
        />
        <motion.circle
          cx="215"
          cy="292"
          r="3"
          fill="#d4af37"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
        />
      </svg>

      {/* Animated Aura */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
