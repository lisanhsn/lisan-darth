"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { Sphere, Ring } from "@react-three/drei";
import * as THREE from "three";

function DeathStarDistant() {
  const meshRef = useRef<THREE.Mesh>(null);
  const laserRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext("2d")!;

    // Dark metallic surface
    context.fillStyle = "#1a1a1a";
    context.fillRect(0, 0, 256, 256);

    // Surface details
    context.fillStyle = "#0f0f0f";
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const size = Math.random() * 6 + 1;
      context.fillRect(x, y, size, size);
    }

    // Superlaser dish
    context.fillStyle = "#050505";
    context.beginPath();
    context.arc(80, 80, 20, 0, Math.PI * 2);
    context.fill();

    // Subtle red glow
    context.fillStyle = "#330000";
    context.beginPath();
    context.arc(80, 80, 4, 0, Math.PI * 2);
    context.fill();

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.02;
      meshRef.current.rotation.x = Math.sin(time * 0.01) * 0.05;
    }
    if (laserRef.current) {
      const pulse = (Math.sin(time * 3) + 1) * 0.5;
      laserRef.current.scale.setScalar(0.8 + pulse * 0.2);
    }
  });

  return (
    <group position={[12, 8, -25]}>
      <Sphere ref={meshRef} args={[3, 24, 24]}>
        <meshStandardMaterial
          map={texture}
          roughness={0.9}
          metalness={0.1}
          emissive="#050505"
        />
      </Sphere>
      <Sphere ref={laserRef} args={[0.15, 8, 8]} position={[-1.2, 1.2, 2.4]}>
        <meshStandardMaterial
          color="#dc2626"
          transparent
          opacity={0.4}
          emissive="#dc2626"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </group>
  );
}

function ImperialFleetDistant() {
  const fleetRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (fleetRef.current) {
      fleetRef.current.rotation.y = time * 0.005;
    }
  });

  const createTIEFighter = (
    position: [number, number, number],
    scale: number = 0.15
  ) => (
    <group position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.6, 0.02, 0.6]} />
        <meshBasicMaterial color="#0f0f0f" />
      </mesh>
      <mesh position={[0.5, 0, 0]}>
        <boxGeometry args={[0.6, 0.02, 0.6]} />
        <meshBasicMaterial color="#0f0f0f" />
      </mesh>
      <mesh position={[0, 0, -0.25]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#1e40af"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );

  const createStarDestroyer = (
    position: [number, number, number],
    scale: number = 0.08
  ) => (
    <group position={position} scale={scale}>
      <mesh>
        <coneGeometry args={[1, 4, 3]} />
        <meshBasicMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0, 0.5, 1]}>
        <boxGeometry args={[0.3, 0.6, 1.2]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      {/* Engine glow */}
      <mesh position={[-0.3, -0.2, -2.5]}>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#1e40af"
          emissiveIntensity={0.4}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh position={[0.3, -0.2, -2.5]}>
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#1e40af"
          emissiveIntensity={0.4}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );

  return (
    <group ref={fleetRef}>
      {/* TIE Fighter formations */}
      {createTIEFighter([8, 3, -15])}
      {createTIEFighter([7.5, 2.8, -14.8])}
      {createTIEFighter([8.5, 3.2, -15.2])}

      {createTIEFighter([-6, 1, -18])}
      {createTIEFighter([-5.8, 0.8, -17.9])}
      {createTIEFighter([-6.2, 1.2, -18.1])}

      {createTIEFighter([2, -2, -20])}
      {createTIEFighter([-3, 4, -22])}

      {/* Star Destroyers */}
      {createStarDestroyer([15, -2, -30])}
      {createStarDestroyer([-18, 3, -35])}
    </group>
  );
}

function StarField() {
  const starsRef = useRef<THREE.Points>(null);

  const starPositions = useMemo(() => {
    const positions = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.0002;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={800}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#d1d5db"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function HeroBackground3D() {
  return (
    <div className="absolute inset-0 opacity-20">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.2}
          color="#d4af37"
        />
        <pointLight
          position={[12, 8, -25]}
          intensity={0.3}
          color="#dc2626"
          distance={20}
        />

        <StarField />
        <DeathStarDistant />
        <ImperialFleetDistant />
      </Canvas>
    </div>
  );
}
