"use client";

import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { Group, Mesh } from "three";

interface DarthVaderModelProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  isHovered?: boolean;
  interactive?: boolean;
}

function DarthVaderGeometryModel({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  isHovered = false,
  interactive = true,
}: DarthVaderModelProps) {
  const groupRef = useRef<Group>(null);
  const helmetRef = useRef<Mesh>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Simple, clean animations
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      // Subtle rotation
      groupRef.current.rotation.y = time * 0.1 + mousePosition.x * 0.05;

      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(time * 0.6) * 0.05;

      // Minimal tilt on hover
      if (isHovered && interactive) {
        groupRef.current.rotation.x = Math.sin(time) * 0.02;
      }
    }

    // Subtle breathing effect
    if (helmetRef.current) {
      const breathingScale = 1 + Math.sin(time * 1.2) * 0.005;
      helmetRef.current.scale.setScalar(breathingScale);
    }
  });

  // Mouse interaction for desktop
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Main Helmet Base */}
      <mesh ref={helmetRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Face Mask - Lower Half */}
      <mesh position={[0, -0.25, 0.7]}>
        <boxGeometry args={[1.2, 0.8, 0.25]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Helmet Top Ridge */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.8, 0.15, 0.8]} />
        <meshStandardMaterial
          color="#000000"
          metalness={1.0}
          roughness={0.05}
        />
      </mesh>

      {/* Left Eye Lens */}
      <mesh position={[-0.2, 0.1, 0.95]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#330000"
          metalness={0.3}
          roughness={0.1}
          emissive="#660000"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Right Eye Lens */}
      <mesh position={[0.2, 0.1, 0.95]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#330000"
          metalness={0.3}
          roughness={0.1}
          emissive="#660000"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Breathing Apparatus */}
      <mesh position={[0, -0.5, 0.85]}>
        <cylinderGeometry args={[0.2, 0.25, 0.6, 12]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Helmet Vents - Left */}
      <mesh position={[-0.5, 0.2, 0.8]}>
        <boxGeometry args={[0.08, 0.3, 0.04]} />
        <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Helmet Vents - Right */}
      <mesh position={[0.5, 0.2, 0.8]}>
        <boxGeometry args={[0.08, 0.3, 0.04]} />
        <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Mouth Grille */}
      <mesh position={[0, -0.7, 0.85]}>
        <cylinderGeometry args={[0.3, 0.3, 0.08, 16]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Simple chest panel suggestion */}
      <mesh position={[0, -1.5, 0.4]}>
        <boxGeometry args={[0.6, 0.4, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}

export default function DarthVaderModel(props: DarthVaderModelProps) {
  useEffect(() => {
    console.log("🎭 DarthVaderModel: Simple geometric model loaded");
  }, []);

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.05}
      floatIntensity={0.1}
      floatingRange={[0, 0.05]}
    >
      <DarthVaderGeometryModel {...props} />
    </Float>
  );
}
