"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Ring } from "@react-three/drei";
import * as THREE from "three";

export default function DeathStar() {
  const meshRef = useRef<THREE.Mesh>(null);
  const laserRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Death Star texture and material
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext("2d")!;

    // Create Death Star surface pattern
    context.fillStyle = "#2a2a2a";
    context.fillRect(0, 0, 512, 512);

    // Add surface details
    context.fillStyle = "#1a1a1a";
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 10 + 2;
      context.fillRect(x, y, size, size);
    }

    // Add superlaser dish
    context.fillStyle = "#0a0a0a";
    context.beginPath();
    context.arc(150, 150, 40, 0, Math.PI * 2);
    context.fill();

    // Superlaser focus
    context.fillStyle = "#ff0000";
    context.beginPath();
    context.arc(150, 150, 8, 0, Math.PI * 2);
    context.fill();

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
      meshRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
    }

    if (laserRef.current) {
      // Pulsing superlaser effect
      const pulse = (Math.sin(time * 2) + 1) * 0.5;
      laserRef.current.scale.setScalar(1 + pulse * 0.3);
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.3;
    }
  });

  return (
    <group position={[3, 2, -5]}>
      {/* Main Death Star sphere */}
      <Sphere ref={meshRef} args={[1.5, 32, 32]}>
        <meshStandardMaterial map={texture} roughness={0.8} metalness={0.2} />
      </Sphere>

      {/* Superlaser glow effect */}
      <Sphere ref={laserRef} args={[0.1, 16, 16]} position={[-0.8, 0.8, 1.2]}>
        <meshBasicMaterial color="#ff0000" transparent opacity={0.8} />
      </Sphere>

      {/* Equatorial trench */}
      <Ring
        ref={ringRef}
        args={[1.48, 1.52, 64]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial
          color="#333"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </Ring>

      {/* Lighting effects */}
      <pointLight
        position={[-0.8, 0.8, 1.2]}
        color="#ff0000"
        intensity={2}
        distance={5}
      />
    </group>
  );
}
