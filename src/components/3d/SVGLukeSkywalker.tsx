"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface SVGLukeSkywalkerProps {
  mousePosition?: { x: number; y: number };
  className?: string;
}

export default function SVGLukeSkywalker({
  mousePosition = { x: 0, y: 0 },
  className = "",
}: SVGLukeSkywalkerProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate rotation based on mouse position
  const rotateY = mousePosition.x * 10;
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
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <svg
        width="300"
        height="400"
        viewBox="0 0 300 400"
        className="drop-shadow-2xl"
      >
        <defs>
          {/* Jedi Robe Gradient */}
          <linearGradient
            id="lukeRobeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="30%" stopColor="#e2e8f0" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Lightsaber Blue Gradient */}
          <linearGradient id="lightsaberBlue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="30%" stopColor="#3b82f6" />
            <stop offset="70%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          {/* Hair Gradient */}
          <radialGradient id="lukeHairGradient" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>

          {/* Skin Gradient */}
          <radialGradient id="lukeSkinGradient" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="50%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fdba74" />
          </radialGradient>

          {/* Lightsaber Glow Filter */}
          <filter id="blueGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Force Aura Filter */}
          <filter id="forceAura">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feOffset dx="0" dy="0" result="offset" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Jedi Robe Body */}
        <motion.path
          d="M80 160 Q70 200 60 280 Q55 320 65 360 Q75 380 100 390 L200 390 Q225 380 235 360 Q245 320 240 280 Q230 200 220 160 Z"
          fill="url(#lukeRobeGradient)"
          filter="url(#forceAura)"
          animate={{
            d: isHovered
              ? "M75 160 Q65 200 55 280 Q50 320 60 360 Q70 380 95 390 L205 390 Q230 380 240 360 Q250 320 245 280 Q235 200 225 160 Z"
              : "M80 160 Q70 200 60 280 Q55 320 65 360 Q75 380 100 390 L200 390 Q225 380 235 360 Q245 320 240 280 Q230 200 220 160 Z",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Robe Belt */}
        <rect
          x="120"
          y="200"
          width="60"
          height="8"
          rx="4"
          fill="#8b5cf6"
          opacity="0.8"
        />

        {/* Arms */}
        <ellipse
          cx="90"
          cy="180"
          rx="15"
          ry="35"
          fill="url(#lukeRobeGradient)"
          transform="rotate(-20 90 180)"
        />
        <ellipse
          cx="210"
          cy="180"
          rx="15"
          ry="35"
          fill="url(#lukeRobeGradient)"
          transform="rotate(20 210 180)"
        />

        {/* Hands */}
        <circle cx="75" cy="200" r="8" fill="url(#lukeSkinGradient)" />
        <circle cx="225" cy="200" r="8" fill="url(#lukeSkinGradient)" />

        {/* Lightsaber Handle (Right Hand) */}
        <motion.rect
          x="220"
          y="190"
          width="6"
          height="25"
          rx="3"
          fill="#475569"
          animate={{
            rotateZ: isHovered ? [0, 5, -5, 0] : 0,
          }}
          transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
        />

        {/* Lightsaber Blade */}
        <motion.rect
          x="221"
          y="120"
          width="4"
          height="70"
          rx="2"
          fill="url(#lightsaberBlue)"
          filter="url(#blueGlow)"
          animate={{
            height: isHovered ? [70, 75, 70] : 70,
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Lightsaber Core */}
        <motion.rect
          x="222"
          y="120"
          width="2"
          height="70"
          rx="1"
          fill="#ffffff"
          opacity="0.9"
          animate={{
            height: isHovered ? [70, 75, 70] : 70,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Head */}
        <motion.circle
          cx="150"
          cy="110"
          r="25"
          fill="url(#lukeSkinGradient)"
          animate={{
            r: isHovered ? 26 : 25,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Hair */}
        <motion.path
          d="M125 95 Q150 85 175 95 Q180 100 175 110 Q160 105 150 100 Q140 105 125 110 Q120 100 125 95 Z"
          fill="url(#lukeHairGradient)"
          animate={{
            d: isHovered
              ? "M123 95 Q150 83 177 95 Q182 100 177 110 Q162 105 150 100 Q138 105 123 110 Q118 100 123 95 Z"
              : "M125 95 Q150 85 175 95 Q180 100 175 110 Q160 105 150 100 Q140 105 125 110 Q120 100 125 95 Z",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Eyes */}
        <circle cx="142" cy="108" r="2.5" fill="#1e40af" />
        <circle cx="158" cy="108" r="2.5" fill="#1e40af" />
        <circle cx="142" cy="107" r="1" fill="#ffffff" />
        <circle cx="158" cy="107" r="1" fill="#ffffff" />

        {/* Nose */}
        <path
          d="M148 112 L152 112 L150 116 Z"
          fill="url(#lukeSkinGradient)"
          opacity="0.7"
        />

        {/* Mouth */}
        <path
          d="M145 120 Q150 122 155 120"
          stroke="#8b5cf6"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Neck */}
        <rect
          x="140"
          y="135"
          width="20"
          height="15"
          fill="url(#lukeSkinGradient)"
        />

        {/* Tunic */}
        <rect
          x="130"
          y="150"
          width="40"
          height="50"
          rx="5"
          fill="#e2e8f0"
          opacity="0.9"
        />

        {/* Force Aura */}
        <motion.circle
          cx="150"
          cy="200"
          r="80"
          fill="none"
          stroke="url(#lightsaberBlue)"
          strokeWidth="2"
          opacity="0.3"
          animate={{
            r: [80, 90, 80],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Force Energy Particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.circle
            key={i}
            cx={120 + i * 20}
            cy={180 + Math.sin(i) * 30}
            r="2"
            fill="#60a5fa"
            opacity="0.6"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Jedi Symbol on Belt */}
        <motion.circle
          cx="150"
          cy="204"
          r="8"
          fill="#8b5cf6"
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        <path
          d="M150 198 L154 202 L150 206 L146 202 Z"
          fill="#ffffff"
          opacity="0.8"
        />
      </svg>

      {/* Force Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
