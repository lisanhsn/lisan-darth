"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";

interface DarthVaderHelmetProps {
  position?: [number, number, number];
  scale?: number;
}

export default function DarthVaderHelmet({
  position = [0, 0, 0],
  scale = 1,
}: DarthVaderHelmetProps) {
  const helmetRef = useRef<Mesh>(null);
  const eyesRef = useRef<Group>(null);

  useFrame((state) => {
    if (helmetRef.current) {
      // Slow rotation
      helmetRef.current.rotation.y += 0.002;

      // Gentle floating motion
      helmetRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }

    if (eyesRef.current) {
      // Pulsing red glow effect for eyes
      const glowIntensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      eyesRef.current.scale.setScalar(glowIntensity);
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Main Helmet Structure */}
      <mesh ref={helmetRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial color="#1a1a1a" shininess={100} specular="#333333" />
      </mesh>

      {/* Helmet Details */}
      {/* Face Mask */}
      <mesh position={[0, -0.3, 0.8]} castShadow>
        <boxGeometry args={[1.2, 0.8, 0.2]} />
        <meshPhongMaterial color="#0d0d0d" shininess={50} />
      </mesh>

      {/* Breathing Apparatus */}
      <mesh position={[0, -0.7, 0.6]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 8]} />
        <meshPhongMaterial color="#333333" shininess={80} />
      </mesh>

      {/* Eye Lenses */}
      <group ref={eyesRef}>
        <mesh position={[-0.25, 0.1, 0.9]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#FF0000"
            emissive="#FF0000"
            emissiveIntensity={0.8}
          />
        </mesh>
        <mesh position={[0.25, 0.1, 0.9]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#FF0000"
            emissive="#FF0000"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Helmet Ridge */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.8, 0.05, 8, 32]} />
        <meshPhongMaterial color="#444444" shininess={100} />
      </mesh>

      {/* Side Vents */}
      <mesh position={[-0.9, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
        <meshPhongMaterial color="#555555" />
      </mesh>
      <mesh position={[0.9, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
        <meshPhongMaterial color="#555555" />
      </mesh>

      {/* Imperial Symbol */}
      <mesh position={[0, 0.2, 0.95]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Glowing Aura */}
      <mesh position={[0, 0, 0]} scale={1.3}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#FF0000"
          transparent
          opacity={0.05}
          emissive="#FF0000"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
}
