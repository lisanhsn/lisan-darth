"use client";

import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
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
  const maskRef = useRef<Mesh>(null);
  const eyeLeftRef = useRef<Mesh>(null);
  const eyeRightRef = useRef<Mesh>(null);
  const breathingRef = useRef<Mesh>(null);
  const auraRef = useRef<Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Enhanced animations with Force powers
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      // Slow, menacing rotation
      groupRef.current.rotation.y = time * 0.2 + mousePosition.x * 0.15;

      // Subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.15;

      // Interactive tilt based on hover
      if (isHovered && interactive) {
        groupRef.current.rotation.x = Math.sin(time * 2) * 0.1;
        groupRef.current.rotation.z = Math.cos(time * 1.5) * 0.08;
      }
    }

    // Helmet breathing effect
    if (helmetRef.current) {
      const breathingScale = 1 + Math.sin(time * 1.5) * 0.02;
      helmetRef.current.scale.setScalar(breathingScale);
    }

    // Eye glow animation
    if (eyeLeftRef.current && eyeRightRef.current) {
      const eyeGlow = 0.8 + Math.sin(time * 3) * 0.4;
      const leftMaterial = eyeLeftRef.current
        .material as THREE.MeshStandardMaterial;
      const rightMaterial = eyeRightRef.current
        .material as THREE.MeshStandardMaterial;
      leftMaterial.emissiveIntensity = eyeGlow;
      rightMaterial.emissiveIntensity = eyeGlow;
    }

    // Breathing apparatus pulse
    if (breathingRef.current) {
      const breathingPulse = 1 + Math.sin(time * 2) * 0.1;
      breathingRef.current.scale.y = breathingPulse;
      const material = breathingRef.current
        .material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + Math.sin(time * 4) * 0.2;
    }

    // Enhanced red lighting effects
    if (lightRef.current) {
      const intensity = 4 + Math.sin(time * 2) * 1.5;
      lightRef.current.intensity = intensity;
      lightRef.current.color.setHSL(0, 1, 0.4 + Math.sin(time * 3) * 0.2);
    }

    // Aura effects
    if (auraRef.current) {
      const auraScale = 1.4 + Math.sin(time * 0.8) * 0.3;
      auraRef.current.scale.setScalar(auraScale);
      const material = auraRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.08 + Math.sin(time * 2) * 0.04;
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
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.9}
          roughness={0.1}
          emissive="#220000"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Face Mask - Lower Half */}
      <mesh ref={maskRef} position={[0, -0.3, 0.8]}>
        <boxGeometry args={[1.4, 1.0, 0.3]} />
        <meshStandardMaterial
          color="#111111"
          metalness={0.8}
          roughness={0.2}
          emissive="#330000"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Helmet Top Ridge */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.0, 0.2, 1.0]} />
        <meshStandardMaterial color="#000000" metalness={1.0} roughness={0.1} />
      </mesh>

      {/* Left Eye Lens */}
      <mesh ref={eyeLeftRef} position={[-0.25, 0.1, 1.1]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Right Eye Lens */}
      <mesh ref={eyeRightRef} position={[0.25, 0.1, 1.1]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Breathing Apparatus */}
      <mesh ref={breathingRef} position={[0, -0.6, 1.0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.8, 12]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.2}
          emissive="#ff3333"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Helmet Vents - Left */}
      <mesh position={[-0.6, 0.3, 0.9]}>
        <boxGeometry args={[0.1, 0.4, 0.05]} />
        <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Helmet Vents - Right */}
      <mesh position={[0.6, 0.3, 0.9]}>
        <boxGeometry args={[0.1, 0.4, 0.05]} />
        <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Mouth Grille */}
      <mesh position={[0, -0.8, 1.0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.9}
          roughness={0.1}
          emissive="#660000"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Control Panel on Chest */}
      <mesh position={[0, -2.0, 0.5]}>
        <boxGeometry args={[0.8, 0.6, 0.2]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.7}
          roughness={0.3}
          emissive="#003366"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Control Panel Lights */}
      <mesh position={[-0.2, -2.0, 0.62]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={1.0}
        />
      </mesh>

      <mesh position={[0, -2.0, 0.62]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#00ff00"
          emissive="#00ff00"
          emissiveIntensity={0.8}
        />
      </mesh>

      <mesh position={[0.2, -2.0, 0.62]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial
          color="#0066ff"
          emissive="#0066ff"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Cape/Shoulders suggestion */}
      <mesh position={[0, -1.0, -0.5]}>
        <coneGeometry args={[1.8, 3.0, 8]} />
        <meshStandardMaterial
          color="#000000"
          metalness={0.3}
          roughness={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Enhanced Dark Side Aura */}
      <mesh ref={auraRef}>
        <sphereGeometry args={[3.0, 32, 32]} />
        <meshStandardMaterial
          color="#ff0000"
          transparent
          opacity={0.08}
          emissive="#660000"
          emissiveIntensity={0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Primary Red Sith Lighting */}
      <pointLight
        ref={lightRef}
        position={[0, 0, 2]}
        color="#ff3333"
        intensity={4}
        distance={15}
        decay={2}
        castShadow
      />

      {/* Eye lighting */}
      <pointLight
        position={[-0.25, 0.1, 1.5]}
        color="#ff0000"
        intensity={2}
        distance={8}
        decay={2}
      />

      <pointLight
        position={[0.25, 0.1, 1.5]}
        color="#ff0000"
        intensity={2}
        distance={8}
        decay={2}
      />

      {/* Breathing apparatus glow */}
      <pointLight
        position={[0, -0.6, 1.5]}
        color="#ff6666"
        intensity={1.5}
        distance={6}
        decay={2}
      />

      {/* Dark energy particles */}
      {interactive && (
        <Sparkles
          count={40}
          scale={5}
          size={4}
          speed={0.6}
          color="#ff4444"
          opacity={0.8}
        />
      )}

      {/* Force field rings */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.08, 16, 32]} />
        <meshStandardMaterial
          color="#ff4444"
          emissive="#ff0000"
          emissiveIntensity={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh position={[0, 1, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[2.8, 0.04, 12, 24]} />
        <meshStandardMaterial
          color="#ff6666"
          emissive="#ff3333"
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh position={[0, -1, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.03, 10, 20]} />
        <meshStandardMaterial
          color="#ff8888"
          emissive="#ff6666"
          emissiveIntensity={0.4}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

// Enhanced loading fallback component that's now the same as the main model
function DarthVaderFallback() {
  useEffect(() => {
    console.log("⏳ DarthVaderFallback: Displaying geometric Vader model");
  }, []);

  return <DarthVaderGeometryModel scale={0.8} interactive={false} />;
}

export default function DarthVaderModel(props: DarthVaderModelProps) {
  useEffect(() => {
    console.log(
      "🎭 DarthVaderModel: Component mounted with geometric approach"
    );
  }, []);

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.15}
      floatIntensity={0.3}
      floatingRange={[0, 0.2]}
    >
      <DarthVaderGeometryModel {...props} />
    </Float>
  );
}
