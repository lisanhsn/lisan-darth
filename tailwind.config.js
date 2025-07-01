/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        aurebesh: ["Aurebesh", "sans-serif"],
      },
      colors: {
        // Professional Color Palette
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        accent: {
          50: "#fefce8",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        // Semantic Colors
        text: {
          primary: "#f8fafc",
          secondary: "#e2e8f0",
          muted: "#94a3b8",
          accent: "#3b82f6",
        },
        bg: {
          primary: "#020617",
          secondary: "#0f172a",
          tertiary: "#1e293b",
          card: "rgba(30, 41, 59, 0.5)",
        },
        border: {
          primary: "rgba(148, 163, 184, 0.1)",
          secondary: "rgba(148, 163, 184, 0.2)",
          accent: "rgba(59, 130, 246, 0.3)",
        },
        // Subtle Star Wars Accents (Professional)
        imperial: {
          DEFAULT: "#1e40af",
          light: "#3b82f6",
          dark: "#1e3a8a",
          red: "#dc2626",
          gold: "#d4af37",
          blue: "#1e40af",
          white: "#f8fafc",
          gray: "#6b7280",
          green: "#059669",
        },
        // Additional Imperial Colors
        "imperial-red": "#dc2626",
        "imperial-gold": "#d4af37",
        "imperial-blue": "#1e40af",
        "imperial-white": "#f8fafc",
        "imperial-gray": "#6b7280",
        "imperial-green": "#059669",
        // Space Theme Colors
        "space-dark": "#0a0a0a",
        "space-medium": "#1a1a1a",
        rebel: {
          DEFAULT: "#f59e0b",
          light: "#fcd34d",
          dark: "#d97706",
        },
        jedi: {
          DEFAULT: "#3b82f6",
          light: "#60a5fa",
          dark: "#2563eb",
        },
      },
      backgroundImage: {
        // === ATMOSPHERIC GRADIENTS ===
        "tatooine-sunset":
          "linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #020617 100%)",
        "hoth-blizzard":
          "linear-gradient(135deg, #0ea5e9 0%, #f8fafc 30%, #020617 100%)",
        "dagobah-swamp":
          "linear-gradient(135deg, #059669 0%, #92400e 60%, #020617 100%)",
        "coruscant-skyline":
          "linear-gradient(135deg, #d4af37 0%, #1e40af 50%, #020617 100%)",
        "endor-forest":
          "linear-gradient(135deg, #16a34a 0%, #a3a3a3 40%, #020617 100%)",

        // === FACTION GRADIENTS ===
        "empire-command":
          "linear-gradient(135deg, #050507 0%, #dc2626 25%, #374151 50%, #dc2626 75%, #050507 100%)",
        "rebel-base":
          "linear-gradient(135deg, #0f172a 0%, #f97316 20%, #2563eb 50%, #f97316 80%, #0f172a 100%)",
        "jedi-temple":
          "linear-gradient(135deg, #0ea5e9 0%, #10b981 50%, #f8fafc 100%)",
        "sith-lair":
          "linear-gradient(135deg, #000000 0%, #dc2626 30%, #7c3aed 70%, #000000 100%)",

        // === SPACE GRADIENTS ===
        "deep-space":
          "linear-gradient(135deg, #020617 0%, #0f172a 25%, #1e293b 50%, #0f172a 75%, #020617 100%)",
        hyperspace:
          "linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)",
        "nebula-storm":
          "linear-gradient(135deg, #6366f1 0%, #ec4899 25%, #06b6d4 50%, #3b82f6 75%, #6366f1 100%)",

        // === ENERGY GRADIENTS ===
        "lightsaber-blue":
          "linear-gradient(90deg, #0ea5e9 0%, #38bdf8 50%, #60a5fa 100%)",
        "lightsaber-green":
          "linear-gradient(90deg, #10b981 0%, #34d399 50%, #22c55e 100%)",
        "lightsaber-red":
          "linear-gradient(90deg, #dc2626 0%, #ef4444 50%, #f87171 100%)",
        "force-energy":
          "radial-gradient(circle, #60a5fa 0%, #3b82f6 50%, transparent 100%)",

        // === NEW GRADIENTS ===
        "gradient-professional": "linear-gradient(135deg, #1e40af, #3b82f6)",
        "gradient-accent": "linear-gradient(135deg, #d97706, #f59e0b)",
        "gradient-text": "linear-gradient(135deg, #60a5fa, #f59e0b)",
      },
      boxShadow: {
        // === LIGHTSABER GLOWS ===
        "lightsaber-blue":
          "0 0 20px #0ea5e9, 0 0 40px #0ea5e9, 0 0 60px #38bdf8",
        "lightsaber-green":
          "0 0 20px #10b981, 0 0 40px #10b981, 0 0 60px #34d399",
        "lightsaber-red":
          "0 0 20px #dc2626, 0 0 40px #dc2626, 0 0 60px #ef4444",
        "lightsaber-purple":
          "0 0 20px #7c3aed, 0 0 40px #7c3aed, 0 0 60px #8b5cf6",

        // === FORCE EFFECTS ===
        "force-glow": "0 0 30px rgba(96, 165, 250, 0.6)",
        "dark-force": "0 0 30px rgba(220, 38, 38, 0.6)",

        // === HOLOGRAM EFFECTS ===
        "hologram-blue": "0 0 20px rgba(14, 165, 233, 0.5)",
        "hologram-green": "0 0 20px rgba(16, 185, 129, 0.5)",

        // === ENERGY SHIELDS ===
        "energy-shield": "0 0 40px rgba(6, 182, 212, 0.4)",
        "thermal-signature": "0 0 25px rgba(239, 68, 68, 0.5)",

        // === ATMOSPHERIC EFFECTS ===
        "tatooine-heat": "0 0 30px rgba(245, 158, 11, 0.4)",
        "hoth-cold": "0 0 30px rgba(14, 165, 233, 0.4)",

        // === NEW SHADOWS ===
        "glow-subtle": "0 0 20px rgba(59, 130, 246, 0.1)",
        "glow-accent": "0 0 30px rgba(59, 130, 246, 0.2)",
        professional:
          "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      animation: {
        // === GALACTIC ANIMATIONS ===
        "galactic-drift": "galactic-drift 120s linear infinite",
        "hyperspace-travel": "hyperspace-travel 8s linear infinite",
        "star-twinkle": "star-twinkle 4s ease-in-out infinite",

        // === LIGHTSABER ANIMATIONS ===
        "lightsaber-hum": "lightsaber-hum 2s ease-in-out infinite alternate",
        "lightsaber-clash": "lightsaber-clash 0.3s ease-out",

        // === HOLOGRAM ANIMATIONS ===
        "hologram-flicker": "hologram-flicker 4s ease-in-out infinite",
        "data-stream": "data-stream 3s linear infinite",

        // === FORCE ANIMATIONS ===
        "force-pulse": "force-pulse 3s ease-in-out infinite",
        "dark-force-pulse": "dark-force-pulse 2.5s ease-in-out infinite",

        // === MECHANICAL ANIMATIONS ===
        "console-scan": "console-scan 4s linear infinite",
        "hyperdrive-streak": "hyperdrive-streak 2s ease-out infinite",
        "blaster-fire": "blaster-fire 0.5s ease-out",
        "shield-pulse": "shield-pulse 3s ease-in-out infinite",

        // === ATMOSPHERIC ANIMATIONS ===
        "tatooine-wind": "tatooine-wind 8s ease-in-out infinite",
        "hoth-blizzard": "hoth-blizzard 6s linear infinite",
        "dagobah-mist": "dagobah-mist 10s ease-in-out infinite",

        // === NEW ANIMATIONS ===
        "fade-in": "fade-in 0.8s ease-out",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "star-drift": "star-drift 180s linear infinite",
      },
      keyframes: {
        "star-twinkle": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        "lightsaber-clash": {
          "0%": { filter: "brightness(1) saturate(1)" },
          "50%": { filter: "brightness(3) saturate(2)" },
          "100%": { filter: "brightness(1) saturate(1)" },
        },
        "force-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(96, 165, 250, 0.4)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(96, 165, 250, 0.8)",
            transform: "scale(1.05)",
          },
        },
        "dark-force-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(220, 38, 38, 0.4)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(220, 38, 38, 0.8)",
            transform: "scale(1.05)",
          },
        },
        "tatooine-wind": {
          "0%, 100%": { transform: "translateX(0) rotate(0deg)" },
          "50%": { transform: "translateX(10px) rotate(2deg)" },
        },
        "hoth-blizzard": {
          "0%": { transform: "translateX(-100%) translateY(-100%)" },
          "100%": { transform: "translateX(100%) translateY(100%)" },
        },
        "dagobah-mist": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1) rotate(0deg)" },
          "50%": { opacity: "0.7", transform: "scale(1.1) rotate(180deg)" },
        },
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        144: "36rem",
        160: "40rem",
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
        "10xl": ["10rem", { lineHeight: "1" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
      },
      perspective: {
        500: "500px",
        1000: "1000px",
        2000: "2000px",
      },
      transformOrigin: {
        "center-3d": "center center -100px",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
