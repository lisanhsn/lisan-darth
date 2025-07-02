"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

function CommunicationTower({
  position,
  height = 8,
  delay = 0,
}: {
  position: [number, number, number];
  height?: number;
  delay?: number;
}) {
  const towerRef = useRef<THREE.Group>(null);
  const dishRef = useRef<THREE.Mesh>(null);
  const signalRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() + delay;
    if (towerRef.current) {
      towerRef.current.rotation.y = time * 0.1;
    }
    if (dishRef.current) {
      dishRef.current.rotation.x = Math.sin(time * 0.5) * 0.3;
      dishRef.current.rotation.z = Math.sin(time * 0.3) * 0.2;
    }
    if (signalRef.current) {
      const pulse = (Math.sin(time * 4) + 1) * 0.5;
      signalRef.current.scale.setScalar(0.8 + pulse * 0.4);
      const material = signalRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + pulse * 0.4;
    }
  });

  return (
    <group ref={towerRef} position={position}>
      {/* Tower base */}
      <mesh position={[0, -height / 2, 0]}>
        <cylinderGeometry args={[0.8, 1.2, 2, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Main tower */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.3, height, 8]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Communication dish */}
      <mesh ref={dishRef} position={[0, height / 2 + 0.5, 0]}>
        <cylinderGeometry args={[1.2, 0.8, 0.3, 16]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Dish center */}
      <mesh position={[0, height / 2 + 0.7, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 8]} />
        <meshStandardMaterial
          color="#dc2626"
          emissive="#dc2626"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Signal transmission */}
      <mesh ref={signalRef} position={[0, height / 2 + 1, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#1e40af"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Tower lights */}
      {[...Array(4)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 4) * Math.PI * 2) * 0.4,
            height / 2 - 1 + i * 0.5,
            Math.sin((i / 4) * Math.PI * 2) * 0.4,
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#d4af37"
            emissive="#d4af37"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}

      {/* Point light for glow */}
      <pointLight
        position={[0, height / 2 + 1, 0]}
        color="#1e40af"
        intensity={0.4}
        distance={8}
      />
    </group>
  );
}

function TransmissionBeam({
  start,
  end,
  color = "#1e40af",
  delay = 0,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  delay?: number;
}) {
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() + delay;
    if (beamRef.current) {
      const pulse = (Math.sin(time * 3) + 1) * 0.5;
      const material = beamRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.2 + pulse * 0.3;
      material.opacity = 0.3 + pulse * 0.2;
    }
  });

  const distance = Math.sqrt(
    Math.pow(end[0] - start[0], 2) +
      Math.pow(end[1] - start[1], 2) +
      Math.pow(end[2] - start[2], 2)
  );

  const midpoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ];

  return (
    <mesh ref={beamRef} position={midpoint}>
      <cylinderGeometry args={[0.02, 0.02, distance, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function SatelliteArray() {
  const arrayRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (arrayRef.current) {
      arrayRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group ref={arrayRef}>
      {/* Central hub */}
      <mesh position={[0, 5, -20]}>
        <octahedronGeometry args={[1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Satellite dishes in formation */}
      {[...Array(6)].map((_, i) => (
        <group
          key={i}
          position={[
            Math.cos((i / 6) * Math.PI * 2) * 8,
            5 + Math.sin((i / 6) * Math.PI * 2) * 2,
            -20 + Math.sin((i / 6) * Math.PI * 2) * 4,
          ]}
          rotation={[0, (i / 6) * Math.PI * 2, 0]}
        >
          {/* Dish */}
          <mesh>
            <cylinderGeometry args={[0.8, 0.6, 0.2, 12]} />
            <meshStandardMaterial
              color="#3a3a3a"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* Support arm */}
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
            <meshStandardMaterial
              color="#2a2a2a"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Status light */}
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color="#059669"
              emissive="#059669"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(300 * 3);
    for (let i = 0; i < 300; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < 300; i++) {
        const i3 = i * 3;
        // Spiral motion representing data flow
        const radius = 5;
        const speed = 0.01;
        const angle = time * speed + i * 0.1;

        positions[i3] =
          Math.cos(angle + i * 0.1) * radius + (Math.random() - 0.5) * 2;
        positions[i3 + 1] += Math.sin(time + i * 0.05) * 0.01;
        positions[i3 + 2] =
          Math.sin(angle + i * 0.1) * radius + (Math.random() - 0.5) * 2;

        // Reset if too far
        if (positions[i3 + 1] > 10) {
          positions[i3 + 1] = -10;
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={300}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#d4af37"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function ContactBackground3D() {
  return (
    <div className="absolute inset-0 opacity-12">
      <Canvas
        camera={{ position: [0, 3, 15], fov: 60 }}
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
          position={[15, 20, 10]}
          intensity={0.1}
          color="#1e40af"
        />
        <pointLight
          position={[0, 10, 0]}
          intensity={0.2}
          color="#d4af37"
          distance={25}
        />

        <SatelliteArray />
        <DataParticles />

        {/* Communication towers */}
        <CommunicationTower position={[-8, -5, -12]} height={6} delay={0} />
        <CommunicationTower position={[6, -4, -8]} height={8} delay={1.5} />
        <CommunicationTower position={[-3, -6, -15]} height={7} delay={3} />
        <CommunicationTower position={[10, -3, -18]} height={5} delay={4.5} />

        {/* Transmission beams */}
        <TransmissionBeam
          start={[-8, 1, -12]}
          end={[0, 5, -20]}
          color="#1e40af"
          delay={0}
        />
        <TransmissionBeam
          start={[6, 4, -8]}
          end={[0, 5, -20]}
          color="#d4af37"
          delay={2}
        />
        <TransmissionBeam
          start={[-3, 1, -15]}
          end={[0, 5, -20]}
          color="#dc2626"
          delay={4}
        />
      </Canvas>
    </div>
  );
}
