"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Text, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function FloatingTechIcon({
  position,
  text,
  color = "#1e40af",
  delay = 0,
  mousePosition,
}: {
  position: [number, number, number];
  text: string;
  color?: string;
  delay?: number;
  mousePosition: { x: number; y: number };
}) {
  const iconRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() + delay;
    if (iconRef.current) {
      // Gentle floating motion
      iconRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.2;

      // Subtle mouse influence
      iconRef.current.rotation.y = time * 0.2 + mousePosition.x * 0.1;
      iconRef.current.rotation.x =
        Math.sin(time * 0.5) * 0.1 + mousePosition.y * 0.05;

      // Scale effect when hovered
      const targetScale = isHovered ? 1.2 : 1;
      iconRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group
        ref={iconRef}
        position={position}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        {/* Icon Background */}
        <mesh>
          <boxGeometry args={[1, 1, 0.1]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.8}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Icon Border */}
        <mesh position={[0, 0, 0.06]}>
          <ringGeometry args={[0.45, 0.5, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Text */}
        <Text
          position={[0, 0, 0.11]}
          fontSize={0.3}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/orbitron-bold.woff"
        >
          {text}
        </Text>

        {/* Glow Effect */}
        <mesh position={[0, 0, 0]} scale={1.3}>
          <boxGeometry args={[1, 1, 0.1]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.1}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Point light for glow */}
        <pointLight
          position={[0, 0, 0.2]}
          color={color}
          intensity={0.5}
          distance={3}
        />
      </group>
    </Float>
  );
}

function EnhancedDarthVaderHelmet({
  mousePosition,
}: {
  mousePosition: { x: number; y: number };
}) {
  const helmetGroupRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);
  const breathingRef = useRef<THREE.Mesh>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (helmetGroupRef.current) {
      // Smooth mouse following
      const targetRotationY = mousePosition.x * 0.2;
      const targetRotationX = -mousePosition.y * 0.1;

      helmetGroupRef.current.rotation.y +=
        (targetRotationY - helmetGroupRef.current.rotation.y) * 0.08;
      helmetGroupRef.current.rotation.x +=
        (targetRotationX - helmetGroupRef.current.rotation.x) * 0.08;

      // Gentle floating
      helmetGroupRef.current.position.y = Math.sin(time * 0.6) * 0.1;

      // Scale effect
      const targetScale = isHovered ? 1.1 : 1;
      helmetGroupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }

    if (eyesRef.current) {
      // Intense eye glow
      const glowIntensity = 1 + Math.sin(time * 4) * 0.3;
      eyesRef.current.scale.setScalar(glowIntensity);
    }

    if (breathingRef.current) {
      // Breathing animation
      const breathingScale = 1 + Math.sin(time * 1.2) * 0.08;
      breathingRef.current.scale.setScalar(breathingScale);
    }
  });

  return (
    <group
      ref={helmetGroupRef}
      position={[3.5, 0.5, 0]}
      scale={1.2}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Main Helmet */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          emissive="#0a0a0a"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Face Mask */}
      <mesh position={[0, -0.3, 0.8]} castShadow>
        <boxGeometry args={[1.4, 0.9, 0.2]} />
        <meshStandardMaterial
          color="#0d0d0d"
          metalness={0.8}
          roughness={0.2}
          emissive="#1a0000"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Breathing Apparatus */}
      <mesh ref={breathingRef} position={[0, -0.8, 0.6]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.5, 12]} />
        <meshStandardMaterial
          color="#333333"
          metalness={0.9}
          roughness={0.1}
          emissive="#dc2626"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Enhanced Eye Lenses */}
      <group ref={eyesRef}>
        <mesh position={[-0.3, 0.1, 0.9]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#dc2626"
            emissive="#dc2626"
            emissiveIntensity={1.5}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[0.3, 0.1, 0.9]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#dc2626"
            emissive="#dc2626"
            emissiveIntensity={1.5}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>

      {/* Helmet Details */}
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.9, 0.06, 8, 32]} />
        <meshStandardMaterial color="#444444" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Imperial Symbol */}
      <mesh position={[0, 0.2, 0.95]}>
        <cylinderGeometry args={[0.15, 0.15, 0.03, 8]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.6}
          metalness={0.7}
          roughness={0.1}
        />
      </mesh>

      {/* Dramatic Red Aura */}
      <mesh position={[0, 0, 0]} scale={1.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#dc2626"
          transparent
          opacity={0.05}
          emissive="#dc2626"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Eye Light Beams */}
      <spotLight
        position={[-0.3, 0.1, 1.2]}
        target-position={[-3, -2, 5]}
        color="#dc2626"
        intensity={2}
        distance={10}
        angle={0.3}
        penumbra={0.5}
        castShadow
      />
      <spotLight
        position={[0.3, 0.1, 1.2]}
        target-position={[3, -2, 5]}
        color="#dc2626"
        intensity={2}
        distance={10}
        angle={0.3}
        penumbra={0.5}
        castShadow
      />
    </group>
  );
}

function ImperialTIEFighter({
  position,
  scale = 0.5,
  mousePosition,
}: {
  position: [number, number, number];
  scale?: number;
  mousePosition: { x: number; y: number };
}) {
  const tieRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (tieRef.current) {
      // Dynamic movement
      tieRef.current.rotation.y = time * 0.3 + mousePosition.x * 0.1;
      tieRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.3;
      tieRef.current.rotation.z = Math.sin(time * 1.2) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={tieRef} position={position} scale={scale}>
        {/* Cockpit */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.8}
            roughness={0.1}
            emissive="#1e40af"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Solar Panels */}
        <mesh position={[-0.8, 0, 0]}>
          <boxGeometry args={[1, 0.03, 1]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.1}
            emissive="#1e40af"
            emissiveIntensity={0.05}
          />
        </mesh>
        <mesh position={[0.8, 0, 0]}>
          <boxGeometry args={[1, 0.03, 1]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.1}
            emissive="#1e40af"
            emissiveIntensity={0.05}
          />
        </mesh>

        {/* Cockpit Window */}
        <mesh position={[0, 0, 0.31]}>
          <circleGeometry args={[0.15, 16]} />
          <meshStandardMaterial
            color="#1e40af"
            emissive="#1e40af"
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Engine Glow */}
        <mesh position={[0, 0, -0.4]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color="#1e40af"
            emissive="#1e40af"
            emissiveIntensity={1.5}
            transparent
            opacity={0.8}
          />
        </mesh>

        <pointLight
          position={[0, 0, -0.5]}
          color="#1e40af"
          intensity={0.8}
          distance={3}
        />
      </group>
    </Float>
  );
}

function Stormtrooper({
  position,
  mousePosition,
}: {
  position: [number, number, number];
  mousePosition: { x: number; y: number };
}) {
  const trooperRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (trooperRef.current) {
      trooperRef.current.rotation.y =
        Math.sin(time * 0.5) * 0.3 + mousePosition.x * 0.1;
      trooperRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={trooperRef} position={position} scale={0.4}>
        {/* Helmet */}
        <mesh>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial
            color="#f8f9fa"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Visor */}
        <mesh position={[0, 0.1, 0.75]}>
          <boxGeometry args={[0.6, 0.3, 0.1]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Body */}
        <mesh position={[0, -1.5, 0]}>
          <boxGeometry args={[1, 2, 0.8]} />
          <meshStandardMaterial
            color="#f8f9fa"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>

        {/* Blue glow for Imperial theme */}
        <pointLight
          position={[0, 0, 1]}
          color="#1e40af"
          intensity={0.3}
          distance={2}
        />
      </group>
    </Float>
  );
}

function CosmicBackground() {
  const nebulaMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (nebulaMeshRef.current) {
      nebulaMeshRef.current.rotation.z = time * 0.01;
    }
  });

  return (
    <group>
      {/* Cosmic Nebula */}
      <mesh ref={nebulaMeshRef} position={[0, 0, -20]} scale={50}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#1e40af"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Energy Waves */}
      <mesh position={[0, 0, -15]} scale={30}>
        <ringGeometry args={[0.5, 0.7, 64]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function ModernHeroScene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = (-(event.clientY - rect.top) / rect.height) * 2 + 1;
    setMousePosition({ x, y });
  };

  return (
    <div className="absolute inset-0" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: "transparent" }}
        shadows
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.2} color="#0a0a1a" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.5}
          color="#d4af37"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 0, 10]} intensity={0.3} color="#1e40af" />

        {/* Background */}
        <CosmicBackground />

        {/* Main 3D Elements */}
        <EnhancedDarthVaderHelmet mousePosition={mousePosition} />

        {/* Floating Tech Icons */}
        <FloatingTechIcon
          position={[-3, 2, 1]}
          text="TS"
          color="#1e40af"
          delay={0}
          mousePosition={mousePosition}
        />
        <FloatingTechIcon
          position={[2, -1.5, 2]}
          text="JS"
          color="#d4af37"
          delay={1}
          mousePosition={mousePosition}
        />
        <FloatingTechIcon
          position={[-4, -2, 1.5]}
          text="⚛"
          color="#1e40af"
          delay={2}
          mousePosition={mousePosition}
        />
        <FloatingTechIcon
          position={[4, 2.5, 1]}
          text="⬢"
          color="#059669"
          delay={3}
          mousePosition={mousePosition}
        />
        <FloatingTechIcon
          position={[-1, 3, 2]}
          text="⚡"
          color="#7c3aed"
          delay={4}
          mousePosition={mousePosition}
        />
        <FloatingTechIcon
          position={[3, -3, 1.5]}
          text="🔷"
          color="#0891b2"
          delay={5}
          mousePosition={mousePosition}
        />

        {/* TIE Fighters */}
        <ImperialTIEFighter
          position={[-5, 1, -2]}
          scale={0.3}
          mousePosition={mousePosition}
        />
        <ImperialTIEFighter
          position={[6, 0, -3]}
          scale={0.25}
          mousePosition={mousePosition}
        />
        <ImperialTIEFighter
          position={[-2, -3, -1]}
          scale={0.2}
          mousePosition={mousePosition}
        />

        {/* Stormtroopers */}
        <Stormtrooper position={[-6, -1, 2]} mousePosition={mousePosition} />
        <Stormtrooper position={[5, 1.5, 1]} mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
