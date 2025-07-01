"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, BufferGeometry } from "three";
import * as THREE from "three";

export default function ParticleField() {
  const pointsRef = useRef<Points>(null);

  const { positions, colors } = useMemo(() => {
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Random positions in space
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;

      // Color variations (white, blue, red)
      const colorType = Math.random();
      if (colorType < 0.6) {
        // White particles
        colors[i3] = 1;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;
      } else if (colorType < 0.8) {
        // Blue particles
        colors[i3] = 0.2;
        colors[i3 + 1] = 0.5;
        colors[i3 + 2] = 1;
      } else {
        // Red particles
        colors[i3] = 1;
        colors[i3 + 1] = 0.2;
        colors[i3 + 2] = 0.2;
      }
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Slow rotation of the entire particle field
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x += 0.0002;

      // Pulsing effect
      const time = state.clock.elapsedTime;
      pointsRef.current.material.opacity = 0.6 + Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        transparent
        opacity={0.6}
        vertexColors
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
