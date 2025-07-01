"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

function HolographicDisplay({
  position,
  delay = 0,
}: {
  position: [number, number, number];
  delay?: number;
}) {
  const displayRef = useRef<THREE.Group>(null);
  const holoRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() + delay;
    if (displayRef.current) {
      displayRef.current.rotation.y = time * 0.2;
    }
    if (holoRef.current) {
      const pulse = (Math.sin(time * 3) + 1) * 0.5;
      holoRef.current.scale.setScalar(0.8 + pulse * 0.2);
      const material = holoRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.4 + pulse * 0.3;
    }
  });

  return (
    <group ref={displayRef} position={position}>
      {/* Base console */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.2, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Holographic projection */}
      <mesh ref={holoRef}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#1e40af"
          emissiveIntensity={0.4}
          transparent
          opacity={0.6}
          wireframe={true}
        />
      </mesh>

      {/* Data streams */}
      <mesh position={[0, 1, 0]}>
        <torusGeometry args={[0.3, 0.02, 8, 16]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.01, 8, 16]} />
        <meshStandardMaterial
          color="#dc2626"
          emissive="#dc2626"
          emissiveIntensity={0.4}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Point light for glow */}
      <pointLight
        position={[0, 0, 0]}
        color="#1e40af"
        intensity={0.3}
        distance={4}
      />
    </group>
  );
}

function CommandConsole({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  const consoleRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (consoleRef.current) {
      // Subtle breathing light effect
      const pulse = (Math.sin(time * 2) + 1) * 0.5;
      consoleRef.current.children.forEach((child, index) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          if (child.material.emissive) {
            child.material.emissiveIntensity = 0.2 + pulse * 0.1;
          }
        }
      });
    }
  });

  return (
    <group ref={consoleRef} position={position} rotation={rotation}>
      {/* Main console body */}
      <mesh>
        <boxGeometry args={[2, 0.8, 1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0.2, 0.51]}>
        <planeGeometry args={[1.5, 0.8]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#1e40af"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Control panels */}
      <mesh position={[-0.6, -0.2, 0.51]}>
        <boxGeometry args={[0.3, 0.3, 0.02]} />
        <meshStandardMaterial
          color="#dc2626"
          emissive="#dc2626"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[0.6, -0.2, 0.51]}>
        <boxGeometry args={[0.3, 0.3, 0.02]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Control buttons */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[-0.8 + (i % 4) * 0.4, -0.05, 0.52]}>
          <cylinderGeometry args={[0.03, 0.03, 0.02, 8]} />
          <meshStandardMaterial
            color="#059669"
            emissive="#059669"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function DataStream() {
  const streamRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (streamRef.current) {
      const positions = streamRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < 150; i++) {
        const i3 = i * 3;
        // Flowing upward motion
        positions[i3 + 1] += 0.02;
        if (positions[i3 + 1] > 6) {
          positions[i3 + 1] = -6;
        }

        // Slight horizontal drift
        positions[i3] += Math.sin(time + i * 0.1) * 0.005;
        positions[i3 + 2] += Math.cos(time + i * 0.05) * 0.003;
      }

      streamRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={streamRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={150}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#1e40af"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
}

function ImperialArchitecture() {
  return (
    <group>
      {/* Command tower */}
      <mesh position={[0, -8, -20]}>
        <boxGeometry args={[6, 12, 4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Tower details */}
      <mesh position={[0, -2, -18]}>
        <boxGeometry args={[8, 2, 1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Side panels */}
      <mesh position={[-10, -4, -15]}>
        <boxGeometry args={[2, 8, 0.5]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.8} roughness={0.2} />
      </mesh>

      <mesh position={[10, -4, -15]}>
        <boxGeometry args={[2, 8, 0.5]} />
        <meshStandardMaterial color="#0f0f0f" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Communication arrays */}
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[-6 + i * 4, 2, -18]}>
          <cylinderGeometry args={[0.1, 0.1, 3, 8]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ProjectsBackground3D() {
  return (
    <div className="absolute inset-0 opacity-10">
      <Canvas
        camera={{ position: [0, 2, 12], fov: 70 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.06} color="#0a0a0a" />
        <directionalLight
          position={[10, 15, 10]}
          intensity={0.12}
          color="#1e40af"
        />
        <pointLight
          position={[0, 0, 5]}
          intensity={0.3}
          color="#d4af37"
          distance={20}
        />

        <ImperialArchitecture />
        <DataStream />

        {/* Holographic displays */}
        <HolographicDisplay position={[-4, 1, -8]} delay={0} />
        <HolographicDisplay position={[3, 2, -6]} delay={1.5} />
        <HolographicDisplay position={[-1, 3, -10]} delay={3} />
        <HolographicDisplay position={[6, 0, -12]} delay={4.5} />

        {/* Command consoles */}
        <CommandConsole
          position={[-6, -2, -5]}
          rotation={[0, Math.PI / 6, 0]}
        />
        <CommandConsole
          position={[4, -3, -7]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <CommandConsole position={[0, -1, -4]} rotation={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}
