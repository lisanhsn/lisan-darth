"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface SVGMillenniumFalconProps {
  mousePosition?: { x: number; y: number };
  className?: string;
}

export default function SVGMillenniumFalcon({
  mousePosition = { x: 0, y: 0 },
  className = "",
}: SVGMillenniumFalconProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate rotation based on mouse position
  const rotateY = mousePosition.x * 8;
  const rotateX = -mousePosition.y * 6;

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
        scale: isHovered ? 1.1 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <svg
        width="400"
        height="300"
        viewBox="0 0 400 300"
        className="drop-shadow-2xl"
      >
        <defs>
          {/* Hull Main Gradient */}
          <linearGradient id="falconHull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="30%" stopColor="#64748b" />
            <stop offset="70%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Engine Glow Gradient */}
          <radialGradient id="engineGlow" cx="0.5" cy="0.5" r="0.8">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="30%" stopColor="#3b82f6" />
            <stop offset="70%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </radialGradient>

          {/* Cockpit Gradient */}
          <radialGradient id="cockpitGlass" cx="0.3" cy="0.3" r="0.7">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </radialGradient>

          {/* Engine Fire Gradient */}
          <linearGradient id="engineFire" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          {/* Shadow Filter */}
          <filter id="shipShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
            <feOffset dx="3" dy="3" result="offset" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Engine Glow Filter */}
          <filter id="engineGlowFilter">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main Hull - Circular Section */}
        <motion.circle
          cx="200"
          cy="150"
          r="80"
          fill="url(#falconHull)"
          filter="url(#shipShadow)"
          animate={{
            r: isHovered ? 82 : 80,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Hull Details - Circular Panels */}
        <circle
          cx="200"
          cy="150"
          r="60"
          fill="none"
          stroke="#6b7280"
          strokeWidth="2"
          opacity="0.6"
        />
        <circle
          cx="200"
          cy="150"
          r="40"
          fill="none"
          stroke="#6b7280"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <circle
          cx="200"
          cy="150"
          r="20"
          fill="none"
          stroke="#6b7280"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Mandibles - Left */}
        <motion.path
          d="M120 150 Q80 130 60 110 Q55 105 60 100 Q65 95 75 100 Q95 110 120 130 Z"
          fill="url(#falconHull)"
          filter="url(#shipShadow)"
          animate={{
            d: isHovered
              ? "M118 150 Q78 130 58 110 Q53 105 58 100 Q63 95 73 100 Q93 110 118 130 Z"
              : "M120 150 Q80 130 60 110 Q55 105 60 100 Q65 95 75 100 Q95 110 120 130 Z",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Mandibles - Right */}
        <motion.path
          d="M280 150 Q320 130 340 110 Q345 105 340 100 Q335 95 325 100 Q305 110 280 130 Z"
          fill="url(#falconHull)"
          filter="url(#shipShadow)"
          animate={{
            d: isHovered
              ? "M282 150 Q322 130 342 110 Q347 105 342 100 Q337 95 327 100 Q307 110 282 130 Z"
              : "M280 150 Q320 130 340 110 Q345 105 340 100 Q335 95 325 100 Q305 110 280 130 Z",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Rear Extension */}
        <motion.ellipse
          cx="200"
          cy="200"
          rx="60"
          ry="30"
          fill="url(#falconHull)"
          filter="url(#shipShadow)"
          animate={{
            ry: isHovered ? 32 : 30,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Cockpit */}
        <motion.circle
          cx="180"
          cy="120"
          r="25"
          fill="url(#cockpitGlass)"
          filter="url(#shipShadow)"
          animate={{
            r: isHovered ? 27 : 25,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Cockpit Details */}
        <circle
          cx="180"
          cy="120"
          r="18"
          fill="none"
          stroke="#0891b2"
          strokeWidth="2"
          opacity="0.7"
        />
        <circle cx="175" cy="115" r="3" fill="#ffffff" opacity="0.8" />
        <circle cx="185" cy="115" r="3" fill="#ffffff" opacity="0.8" />
        <circle cx="180" cy="125" r="2" fill="#fbbf24" opacity="0.9" />

        {/* Top Gun Turret */}
        <circle cx="200" cy="130" r="8" fill="#475569" />
        <rect x="196" y="122" width="8" height="16" rx="2" fill="#64748b" />
        <rect x="198" y="115" width="4" height="12" rx="1" fill="#374151" />

        {/* Bottom Gun Turret */}
        <circle cx="200" cy="170" r="8" fill="#475569" />
        <rect x="196" y="162" width="8" height="16" rx="2" fill="#64748b" />
        <rect x="198" y="170" width="4" height="12" rx="1" fill="#374151" />

        {/* Main Engines */}
        <motion.ellipse
          cx="180"
          cy="210"
          rx="12"
          ry="8"
          fill="url(#engineGlow)"
          filter="url(#engineGlowFilter)"
          animate={{
            rx: [12, 15, 12],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        <motion.ellipse
          cx="220"
          cy="210"
          rx="12"
          ry="8"
          fill="url(#engineGlow)"
          filter="url(#engineGlowFilter)"
          animate={{
            rx: [12, 15, 12],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />

        {/* Engine Exhaust */}
        <motion.ellipse
          cx="180"
          cy="220"
          rx="8"
          ry="15"
          fill="url(#engineFire)"
          opacity="0.7"
          animate={{
            ry: [15, 25, 15],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />

        <motion.ellipse
          cx="220"
          cy="220"
          rx="8"
          ry="15"
          fill="url(#engineFire)"
          opacity="0.7"
          animate={{
            ry: [15, 25, 15],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
        />

        {/* Sensor Dish */}
        <motion.circle
          cx="230"
          cy="140"
          r="15"
          fill="#6b7280"
          filter="url(#shipShadow)"
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            duration: 4,
            ease: "linear",
            repeat: isHovered ? Infinity : 0,
          }}
        />

        <circle cx="230" cy="140" r="10" fill="#94a3b8" />
        <circle cx="230" cy="140" r="6" fill="#475569" />
        <circle cx="230" cy="140" r="2" fill="#fbbf24" />

        {/* Hull Panels */}
        <rect
          x="160"
          y="160"
          width="20"
          height="15"
          rx="2"
          fill="#64748b"
          opacity="0.8"
        />
        <rect
          x="220"
          y="160"
          width="20"
          height="15"
          rx="2"
          fill="#64748b"
          opacity="0.8"
        />
        <rect
          x="190"
          y="180"
          width="20"
          height="10"
          rx="2"
          fill="#64748b"
          opacity="0.8"
        />

        {/* Hull Lines */}
        <path
          d="M120 150 Q200 140 280 150"
          stroke="#94a3b8"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M140 180 Q200 170 260 180"
          stroke="#94a3b8"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
        />

        {/* Landing Gear Indicators */}
        <circle cx="160" cy="190" r="3" fill="#ef4444" opacity="0.8" />
        <circle cx="240" cy="190" r="3" fill="#ef4444" opacity="0.8" />
        <circle cx="200" cy="210" r="3" fill="#ef4444" opacity="0.8" />

        {/* Hyperspace Particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.circle
            key={i}
            cx={100 + i * 30}
            cy={100 + Math.sin(i) * 40}
            r="1.5"
            fill="#60a5fa"
            opacity="0.6"
            animate={{
              x: [0, 200, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Hyperdrive Glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
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
