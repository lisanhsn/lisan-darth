"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface ImmersiveScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  parallaxSpeed?: "slow" | "medium" | "fast";
  revealDirection?: "up" | "down" | "left" | "right";
}

export default function ImmersiveScrollContainer({
  children,
  className = "",
  parallaxSpeed = "medium",
  revealDirection = "up",
}: ImmersiveScrollContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const isInView = useInView(ref, {
    once: false,
    margin: "-10% 0px -10% 0px",
  });

  // Parallax transforms based on speed
  const getParallaxTransform = () => {
    switch (parallaxSpeed) {
      case "slow":
        return useTransform(scrollYProgress, [0, 1], [-50, 50]);
      case "medium":
        return useTransform(scrollYProgress, [0, 1], [-100, 100]);
      case "fast":
        return useTransform(scrollYProgress, [0, 1], [-150, 150]);
      default:
        return useTransform(scrollYProgress, [0, 1], [-100, 100]);
    }
  };

  const y = getParallaxTransform();
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Reveal animation variants
  const getRevealVariants = () => {
    const distance = 100;
    switch (revealDirection) {
      case "up":
        return {
          hidden: { y: distance, opacity: 0, rotateX: 15 },
          visible: { y: 0, opacity: 1, rotateX: 0 },
        };
      case "down":
        return {
          hidden: { y: -distance, opacity: 0, rotateX: -15 },
          visible: { y: 0, opacity: 1, rotateX: 0 },
        };
      case "left":
        return {
          hidden: { x: distance, opacity: 0, rotateY: 15 },
          visible: { x: 0, opacity: 1, rotateY: 0 },
        };
      case "right":
        return {
          hidden: { x: -distance, opacity: 0, rotateY: -15 },
          visible: { x: 0, opacity: 1, rotateY: 0 },
        };
      default:
        return {
          hidden: { y: distance, opacity: 0, rotateX: 15 },
          visible: { y: 0, opacity: 1, rotateX: 0 },
        };
    }
  };

  const variants = getRevealVariants();

  return (
    <motion.div
      ref={ref}
      className={`relative transform-3d ${className}`}
      style={{
        y,
        scale,
        opacity,
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{
        duration: 1.2,
        ease: [0.165, 0.84, 0.44, 1],
        staggerChildren: 0.1,
      }}
    >
      {children}
    </motion.div>
  );
}
