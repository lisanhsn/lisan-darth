"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface SVGXWingFighterProps {
  mousePosition?: { x: number; y: number };
  className?: string;
}

export default function SVGXWingFighter({
  mousePosition = { x: 0, y: 0 },
  className = "",
}: SVGXWingFighterProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate rotation based on mouse position
  const rotateY = mousePosition.x * 12;
  const rotateX = -mousePosition.y * 8;

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
        scale: isHovered ? 1.08 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <svg
        width="350"
        height="280"
        viewBox="0 0 350 280"
        className="drop-shadow-2xl"
      >
        <defs>
          {/* Fuselage Gradient */}
          <linearGradient id="xwingHull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="30%" stopColor="#e2e8f0" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* S-Foil Wing Gradient */}
          <linearGradient id="xwingWing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Engine Glow */}
          <radialGradient id="xwingEngine" cx="0.5" cy="0.5" r="0.8">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="30%" stopColor="#f97316" />
            <stop offset="70%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#dc2626" />
          </radialGradient>

          {/* Laser Cannon Gradient */}
          <linearGradient id="laserCannon" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>

          {/* R2 Unit Gradient */}
          <radialGradient id="r2Unit" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </radialGradient>

          {/* Engine Fire Effect */}
          <filter id="engineFlame">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Ship Shadow */}
          <filter id="xwingShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
            <feOffset dx="4" dy="4" result="offset" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Main Fuselage */}
        <motion.ellipse
          cx="175"
          cy="140"
          rx="80"
          ry="15"
          fill="url(#xwingHull)"
          filter="url(#xwingShadow)"
          animate={{
            rx: isHovered ? 82 : 80,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Cockpit */}
        <motion.ellipse
          cx="210"
          cy="140"
          rx="25"
          ry="12"
          fill="#0891b2"
          opacity="0.8"
          animate={{
            rx: isHovered ? 27 : 25,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* R2 Astromech Unit */}
        <motion.circle
          cx="180"
          cy="140"
          r="8"
          fill="url(#r2Unit)"
          animate={{
            r: isHovered ? 9 : 8,
          }}
          transition={{ duration: 0.3 }}
        />

        <circle cx="180" cy="138" r="3" fill="#ffffff" opacity="0.9" />
        <circle cx="178" cy="142" r="1.5" fill="#dc2626" opacity="0.8" />
        <circle cx="182" cy="142" r="1.5" fill="#22c55e" opacity="0.8" />

        {/* S-Foils - Top Wings */}
        <motion.g
          animate={{
            rotate: isHovered ? 45 : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          transformOrigin="175 140"
        >
          {/* Top Left S-Foil */}
          <rect
            x="100"
            y="60"
            width="70"
            height="15"
            rx="7"
            fill="url(#xwingWing)"
            filter="url(#xwingShadow)"
          />

          {/* Top Right S-Foil */}
          <rect
            x="180"
            y="60"
            width="70"
            height="15"
            rx="7"
            fill="url(#xwingWing)"
            filter="url(#xwingShadow)"
          />
        </motion.g>

        {/* S-Foils - Bottom Wings */}
        <motion.g
          animate={{
            rotate: isHovered ? -45 : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          transformOrigin="175 140"
        >
          {/* Bottom Left S-Foil */}
          <rect
            x="100"
            y="205"
            width="70"
            height="15"
            rx="7"
            fill="url(#xwingWing)"
            filter="url(#xwingShadow)"
          />

          {/* Bottom Right S-Foil */}
          <rect
            x="180"
            y="205"
            width="70"
            height="15"
            rx="7"
            fill="url(#xwingWing)"
            filter="url(#xwingShadow)"
          />
        </motion.g>

        {/* Laser Cannons - Top */}
        <motion.g
          animate={{
            rotate: isHovered ? 45 : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          transformOrigin="175 140"
        >
          <rect x="95" y="65" width="8" height="5" fill="url(#laserCannon)" />
          <rect x="247" y="65" width="8" height="5" fill="url(#laserCannon)" />
        </motion.g>

        {/* Laser Cannons - Bottom */}
        <motion.g
          animate={{
            rotate: isHovered ? -45 : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          transformOrigin="175 140"
        >
          <rect x="95" y="210" width="8" height="5" fill="url(#laserCannon)" />
          <rect x="247" y="210" width="8" height="5" fill="url(#laserCannon)" />
        </motion.g>

        {/* Engine Nacelles */}
        <motion.g
          animate={{
            rotate: isHovered ? 45 : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          transformOrigin="175 140"
        >
          {/* Top Engines */}
          <circle
            cx="110"
            cy="67"
            r="6"
            fill="url(#xwingEngine)"
            filter="url(#engineFlame)"
          />
          <circle
            cx="240"
            cy="67"
            r="6"
            fill="url(#xwingEngine)"
            filter="url(#engineFlame)"
          />
        </motion.g>

        <motion.g
          animate={{
            rotate: isHovered ? -45 : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          transformOrigin="175 140"
        >
          {/* Bottom Engines */}
          <circle
            cx="110"
            cy="213"
            r="6"
            fill="url(#xwingEngine)"
            filter="url(#engineFlame)"
          />
          <circle
            cx="240"
            cy="213"
            r="6"
            fill="url(#xwingEngine)"
            filter="url(#engineFlame)"
          />
        </motion.g>

        {/* Engine Exhaust */}
        <motion.g
          animate={{
            rotate: isHovered ? 45 : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          transformOrigin="175 140"
        >
          <motion.ellipse
            cx="105"
            cy="67"
            rx="4"
            ry="12"
            fill="#fbbf24"
            opacity="0.7"
            animate={{
              rx: [4, 8, 4],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.ellipse
            cx="235"
            cy="67"
            rx="4"
            ry="12"
            fill="#fbbf24"
            opacity="0.7"
            animate={{
              rx: [4, 8, 4],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
        </motion.g>

        <motion.g
          animate={{
            rotate: isHovered ? -45 : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          transformOrigin="175 140"
        >
          <motion.ellipse
            cx="105"
            cy="213"
            rx="4"
            ry="12"
            fill="#fbbf24"
            opacity="0.7"
            animate={{
              rx: [4, 8, 4],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.1 }}
          />
          <motion.ellipse
            cx="235"
            cy="213"
            rx="4"
            ry="12"
            fill="#fbbf24"
            opacity="0.7"
            animate={{
              rx: [4, 8, 4],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
          />
        </motion.g>

        {/* Rebel Alliance Symbol */}
        <motion.circle
          cx="160"
          cy="140"
          r="10"
          fill="#dc2626"
          opacity="0.8"
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 3, ease: "linear" }}
        />

        <path
          d="M160 133 L165 140 L160 147 L155 140 Z"
          fill="#ffffff"
          opacity="0.9"
        />

        {/* Wing Details */}
        <motion.g
          animate={{
            rotate: isHovered ? 45 : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          transformOrigin="175 140"
        >
          <line
            x1="110"
            y1="67"
            x2="160"
            y2="67"
            stroke="#94a3b8"
            strokeWidth="2"
            opacity="0.6"
          />
          <line
            x1="190"
            y1="67"
            x2="240"
            y2="67"
            stroke="#94a3b8"
            strokeWidth="2"
            opacity="0.6"
          />
        </motion.g>

        <motion.g
          animate={{
            rotate: isHovered ? -45 : 0,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          transformOrigin="175 140"
        >
          <line
            x1="110"
            y1="213"
            x2="160"
            y2="213"
            stroke="#94a3b8"
            strokeWidth="2"
            opacity="0.6"
          />
          <line
            x1="190"
            y1="213"
            x2="240"
            y2="213"
            stroke="#94a3b8"
            strokeWidth="2"
            opacity="0.6"
          />
        </motion.g>

        {/* Proton Torpedo Ports */}
        <rect
          x="265"
          y="135"
          width="15"
          height="10"
          rx="2"
          fill="#475569"
          opacity="0.8"
        />
        <rect x="268" y="137" width="9" height="6" rx="1" fill="#1f2937" />

        {/* Space Particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.circle
            key={i}
            cx={50 + i * 40}
            cy={80 + Math.sin(i) * 60}
            r="1"
            fill="#fbbf24"
            opacity="0.7"
            animate={{
              x: [0, 250, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 2.5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Rebel Aura */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)",
          filter: "blur(35px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
