"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

function FloatingLightsaber({
  position,
  color,
  delay = 0,
}: {
  position: [number, number, number];
  color: string;
  delay?: number;
}) {
  const lightsaberRef = useRef<THREE.Group>(null);
  const bladeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() + delay;
    if (lightsaberRef.current) {
      lightsaberRef.current.rotation.y = time * 0.5;
      lightsaberRef.current.rotation.z = Math.sin(time * 1.2) * 0.3;
      lightsaberRef.current.position.y =
        position[1] + Math.sin(time * 0.8) * 0.5;
    }
    if (bladeRef.current) {
      const pulse = (Math.sin(time * 4) + 1) * 0.5;
      const material = bladeRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.8 + pulse * 0.4;
    }
  });

  return (
    <group ref={lightsaberRef} position={position}>
      {/* Lightsaber Hilt */}
      <mesh>
        <cylinderGeometry args={[0.04, 0.06, 0.6, 8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Lightsaber Blade */}
      <mesh ref={bladeRef} position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Blade Core */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 1.6, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Point light for glow */}
      <pointLight
        position={[0, 0.8, 0]}
        color={color}
        intensity={0.5}
        distance={3}
      />
    </group>
  );
}

function TrainingDroid({
  position,
  delay = 0,
}: {
  position: [number, number, number];
  delay?: number;
}) {
  const droidRef = useRef<THREE.Group>(null);
  const eyeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() + delay;
    if (droidRef.current) {
      droidRef.current.rotation.y = time * 0.3;
      droidRef.current.position.x = position[0] + Math.sin(time * 0.6) * 1;
      droidRef.current.position.y = position[1] + Math.cos(time * 0.4) * 0.8;
    }
    if (eyeRef.current) {
      const pulse = (Math.sin(time * 6) + 1) * 0.5;
      const material = eyeRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.6 + pulse * 0.4;
    }
  });

  return (
    <group ref={droidRef} position={position}>
      {/* Main Body */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Eye */}
      <mesh ref={eyeRef} position={[0, 0, 0.31]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial
          color="#dc2626"
          emissive="#dc2626"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Point light for eye glow */}
      <pointLight
        position={[0, 0, 0.5]}
        color="#dc2626"
        intensity={0.3}
        distance={2}
      />
    </group>
  );
}

function ForceEnergy() {
  const energyRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (energyRef.current) {
      const positions = energyRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < 100; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.01;
        positions[i3] += Math.cos(time * 0.5 + i * 0.05) * 0.005;
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
          count={100}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#1e40af"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
}

function TrainingPlatforms() {
  return (
    <group>
      {/* Main training platform */}
      <mesh position={[0, -6, -10]}>
        <cylinderGeometry args={[4, 4, 0.3, 8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Smaller platforms */}
      <mesh position={[-8, -4, -15]}>
        <cylinderGeometry args={[2, 2, 0.2, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[8, -3, -18]}>
        <cylinderGeometry args={[1.5, 1.5, 0.2, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Training obstacles */}
      <mesh position={[-3, -2, -8]}>
        <boxGeometry args={[0.5, 2, 0.5]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.9} roughness={0.1} />
      </mesh>

      <mesh position={[4, -1, -12]}>
        <boxGeometry args={[0.8, 1.5, 0.8]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function SkillsBackground3D() {
  return (
    <div className="absolute inset-0 opacity-12">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 65 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.08} color="#1a1a1a" />
        <directionalLight
          position={[5, 10, 5]}
          intensity={0.15}
          color="#d4af37"
        />
        <pointLight
          position={[0, 5, 0]}
          intensity={0.2}
          color="#1e40af"
          distance={15}
        />

        <TrainingPlatforms />
        <ForceEnergy />

        {/* Floating lightsabers with different colors representing skill categories */}
        <FloatingLightsaber position={[-5, 2, -8]} color="#dc2626" delay={0} />
        <FloatingLightsaber position={[4, 1, -6]} color="#1e40af" delay={1} />
        <FloatingLightsaber position={[-2, 4, -10]} color="#d4af37" delay={2} />
        <FloatingLightsaber position={[6, -1, -12]} color="#059669" delay={3} />
        <FloatingLightsaber position={[-7, 0, -14]} color="#7c3aed" delay={4} />

        {/* Training droids */}
        <TrainingDroid position={[-6, 3, -12]} delay={0} />
        <TrainingDroid position={[5, -2, -16]} delay={2} />
        <TrainingDroid position={[0, 4, -20]} delay={4} />
      </Canvas>
    </div>
  );
}
