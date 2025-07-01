"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import { Mesh, Group } from "three";

interface InteractiveVaderProps {
  position?: [number, number, number];
  mousePosition: { x: number; y: number };
  isInteracting: boolean;
}

function InteractiveVader({
  position = [0, 0, 0],
  mousePosition,
  isInteracting,
}: InteractiveVaderProps) {
  const groupRef = useRef<Group>(null);
  const helmetRef = useRef<Mesh>(null);
  const eyesRef = useRef<Group>(null);

  // Create stable lightning bolt data
  const lightningBolts = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2,
      ] as [number, number, number],
      height: Math.random() * 2 + 1,
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = mousePosition.x * 0.5;
      groupRef.current.rotation.x = -mousePosition.y * 0.3;
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }

    if (helmetRef.current) {
      helmetRef.current.rotation.y += 0.005;
    }

    if (eyesRef.current) {
      const glowIntensity = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.5;
      eyesRef.current.scale.setScalar(
        isInteracting ? glowIntensity * 1.5 : glowIntensity
      );
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Helmet */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={helmetRef} castShadow receiveShadow>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshPhongMaterial
            color="#0a0a0a"
            shininess={100}
            specular="#333333"
            emissive={isInteracting ? "#330000" : "#000000"}
          />
        </mesh>
      </Float>

      {/* Face Mask */}
      <mesh position={[0, -0.3, 1]} castShadow>
        <boxGeometry args={[1.4, 0.8, 0.3]} />
        <meshPhongMaterial
          color="#0d0d0d"
          shininess={50}
          emissive={isInteracting ? "#220000" : "#000000"}
        />
      </mesh>

      {/* Eyes */}
      <group ref={eyesRef}>
        <mesh position={[-0.3, 0.1, 1.1]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#FF0000"
            emissive="#FF0000"
            emissiveIntensity={isInteracting ? 1.5 : 0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[0.3, 0.1, 1.1]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#FF0000"
            emissive="#FF0000"
            emissiveIntensity={isInteracting ? 1.5 : 0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>

      {/* Breathing Apparatus */}
      <mesh position={[0, -0.8, 0.8]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.5, 8]} />
        <meshPhongMaterial color="#333333" shininess={80} />
      </mesh>

      {/* Imperial Symbol */}
      <mesh position={[0, 0.3, 1.2]}>
        <circleGeometry args={[0.18, 16]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={isInteracting ? 0.6 : 0.3}
        />
      </mesh>

      {/* Power Aura */}
      <mesh position={[0, 0, 0]} scale={1.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#FF0000"
          transparent
          opacity={isInteracting ? 0.15 : 0.05}
          emissive="#FF0000"
          emissiveIntensity={isInteracting ? 0.3 : 0.1}
        />
      </mesh>

      {/* Force Lightning Effect - Fixed with stable properties */}
      {lightningBolts.map((bolt) => (
        <mesh
          key={bolt.id}
          position={bolt.position}
          rotation={bolt.rotation}
          visible={isInteracting}
        >
          <cylinderGeometry args={[0.02, 0.02, bolt.height, 4]} />
          <meshStandardMaterial
            color="#00FFFF"
            emissive="#00FFFF"
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

interface InteractiveHeroSceneProps {
  mousePosition: { x: number; y: number };
  isInteracting: boolean;
  className?: string;
}

export default function InteractiveHeroScene({
  mousePosition,
  isInteracting,
  className = "",
}: InteractiveHeroSceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="bg-transparent"
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.3}
          color="#ff0000"
        />

        {/* Stars */}
        <Stars
          radius={100}
          depth={50}
          count={800}
          factor={4}
          saturation={0.1}
          fade={true}
        />

        {/* Interactive Vader */}
        <InteractiveVader
          position={[0, 0, 0]}
          mousePosition={mousePosition}
          isInteracting={isInteracting}
        />

        {/* Death Star in Background */}
        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={[5, 3, -8]} scale={0.8}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshPhongMaterial
              color="#333333"
              shininess={30}
              opacity={0.6}
              transparent
            />
            {/* Death Star Laser */}
            <mesh position={[-0.5, 0.5, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial
                color="#ff0000"
                emissive="#ff0000"
                emissiveIntensity={0.5}
              />
            </mesh>
          </mesh>
        </Float>

        {/* Imperial Destroyer Silhouette */}
        <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.2}>
          <mesh position={[-6, -2, -12]} rotation={[0, 0.3, 0]} scale={0.5}>
            <boxGeometry args={[8, 1, 2]} />
            <meshPhongMaterial color="#1a1a1a" opacity={0.4} transparent />
          </mesh>
        </Float>

        {/* Enable orbital controls for interaction */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={!isInteracting}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
