"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

function SithCrystal({
  position,
  scale = 1,
  delay = 0,
}: {
  position: [number, number, number];
  scale?: number;
  delay?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const crystalGeometry = useMemo(() => {
    const geometry = new THREE.ConeGeometry(0.3 * scale, 1.5 * scale, 6);
    return geometry;
  }, [scale]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() + delay;
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.3;

      // Subtle glow pulse
      const pulse = (Math.sin(time * 2) + 1) * 0.5;
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.1 + pulse * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={crystalGeometry}>
      <meshStandardMaterial
        color="#1a0a0a"
        emissive="#dc2626"
        emissiveIntensity={0.1}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function ForceEnergy() {
  const energyRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (energyRef.current) {
      const positions = energyRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < 200; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.002;
        positions[i3] += Math.cos(time * 0.5 + i * 0.05) * 0.001;
      }

      energyRef.current.geometry.attributes.position.needsUpdate = true;
      energyRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <points ref={energyRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#dc2626"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
}

function MeditationPlatform() {
  const platformRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (platformRef.current) {
      const pulse = (Math.sin(time * 1.5) + 1) * 0.5;
      const material = platformRef.current
        .material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.05 + pulse * 0.05;
    }
  });

  return (
    <group position={[0, -8, -15]}>
      {/* Main platform */}
      <mesh ref={platformRef}>
        <cylinderGeometry args={[3, 3, 0.2, 8]} />
        <meshStandardMaterial
          color="#0f0f0f"
          emissive="#dc2626"
          emissiveIntensity={0.05}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Platform details */}
      <mesh position={[0, 0.15, 0]}>
        <ringGeometry args={[2.5, 2.8, 8]} />
        <meshStandardMaterial
          color="#dc2626"
          emissive="#dc2626"
          emissiveIntensity={0.2}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Inner circle */}
      <mesh position={[0, 0.12, 0]}>
        <ringGeometry args={[1, 1.2, 8]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

function SithArchitecture() {
  return (
    <group>
      {/* Distant pillars */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 12,
            -5,
            Math.sin((i / 6) * Math.PI * 2) * 12 - 20,
          ]}
        >
          <cylinderGeometry args={[0.3, 0.4, 8, 8]} />
          <meshStandardMaterial
            color="#1a1a1a"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* Floating geometry */}
      <mesh position={[-8, 2, -12]} rotation={[0, 0, Math.PI / 4]}>
        <octahedronGeometry args={[0.8]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#dc2626"
          emissiveIntensity={0.1}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh position={[6, -1, -18]} rotation={[Math.PI / 3, 0, 0]}>
        <octahedronGeometry args={[0.6]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#dc2626"
          emissiveIntensity={0.1}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

export default function AboutBackground3D() {
  return (
    <div className="absolute inset-0 opacity-15">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          precision: "highp",
        }}
        style={{
          background: "transparent",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
        frameloop="demand"
        performance={{ min: 0.5 }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          gl.outputEncoding = 3001; // sRGBEncoding
          gl.toneMapping = 4; // ACESFilmicToneMapping
        }}
      >
        <ambientLight intensity={0.05} color="#0a0a0a" />
        <directionalLight
          position={[-5, 10, 5]}
          intensity={0.1}
          color="#dc2626"
        />
        <pointLight
          position={[0, 0, 0]}
          intensity={0.3}
          color="#dc2626"
          distance={15}
        />
        <pointLight
          position={[0, -8, -15]}
          intensity={0.4}
          color="#d4af37"
          distance={10}
        />

        <ForceEnergy />
        <MeditationPlatform />
        <SithArchitecture />

        {/* Floating Sith crystals */}
        <SithCrystal position={[-4, 2, -8]} scale={0.8} delay={0} />
        <SithCrystal position={[5, -1, -6]} scale={0.6} delay={1} />
        <SithCrystal position={[-2, 4, -10]} scale={1.2} delay={2} />
        <SithCrystal position={[3, 1, -12]} scale={0.7} delay={3} />
        <SithCrystal position={[-6, -2, -14]} scale={0.9} delay={4} />
      </Canvas>
    </div>
  );
}
