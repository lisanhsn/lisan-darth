"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, BufferGeometry, PointsMaterial } from "three";
import * as THREE from "three";
import { useMobile } from "../../hooks/useMobile";

export default function ParticleField() {
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<PointsMaterial>(null);
  const isMobile = useMobile();

  // WebGL-optimized particle system
  const particleSystem = useMemo(() => {
    // Adaptive particle count based on device performance
    const particleCount = isMobile ? 500 : 2000;

    // Use Float32Array for better WebGL performance
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);

    // Generate optimized particle data
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Spherical distribution for better visual effect
      const radius = 25 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Varied particle sizes
      sizes[i] = 0.5 + Math.random() * 1.5;

      // Slow random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;

      // Imperial color palette
      const colorType = Math.random();
      if (colorType < 0.4) {
        // White/Silver particles
        colors[i3] = 0.9 + Math.random() * 0.1;
        colors[i3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i3 + 2] = 0.9 + Math.random() * 0.1;
      } else if (colorType < 0.7) {
        // Imperial Blue particles
        colors[i3] = 0.1 + Math.random() * 0.2;
        colors[i3 + 1] = 0.4 + Math.random() * 0.3;
        colors[i3 + 2] = 0.8 + Math.random() * 0.2;
      } else if (colorType < 0.9) {
        // Imperial Red particles
        colors[i3] = 0.8 + Math.random() * 0.2;
        colors[i3 + 1] = 0.1 + Math.random() * 0.2;
        colors[i3 + 2] = 0.1 + Math.random() * 0.2;
      } else {
        // Imperial Gold particles
        colors[i3] = 0.8 + Math.random() * 0.2;
        colors[i3 + 1] = 0.6 + Math.random() * 0.3;
        colors[i3 + 2] = 0.1 + Math.random() * 0.2;
      }
    }

    return { positions, colors, sizes, velocities, particleCount };
  }, [isMobile]);

  // Create optimized geometry and material
  const { geometry, material } = useMemo(() => {
    const geo = new BufferGeometry();

    // Set attributes for WebGL optimization
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(particleSystem.positions, 3)
    );
    geo.setAttribute(
      "color",
      new THREE.BufferAttribute(particleSystem.colors, 3)
    );
    geo.setAttribute(
      "size",
      new THREE.BufferAttribute(particleSystem.sizes, 1)
    );

    // Enable frustum culling for performance
    geo.computeBoundingSphere();

    const mat = new PointsMaterial({
      size: 0.8,
      transparent: true,
      opacity: isMobile ? 0.5 : 0.7,
      vertexColors: true,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false, // Improve performance for transparent particles
      depthTest: true,
    });

    return { geometry: geo, material: mat };
  }, [particleSystem, isMobile]);

  // WebGL-optimized animation loop
  useFrame((state) => {
    if (!pointsRef.current || !materialRef.current) return;

    const time = state.clock.elapsedTime;
    const positions = geometry.attributes.position.array as Float32Array;

    // Optimized animation - only update on non-mobile or at reduced frequency
    const shouldAnimate = !isMobile || Math.floor(time * 30) % 2 === 0;

    if (shouldAnimate) {
      // Slow rotation for the entire particle field
      const rotationSpeed = isMobile ? 0.0001 : 0.0003;
      pointsRef.current.rotation.y += rotationSpeed;
      pointsRef.current.rotation.x += rotationSpeed * 0.5;

      // Subtle particle movement
      for (let i = 0; i < particleSystem.particleCount; i++) {
        const i3 = i * 3;

        // Update positions with velocities
        positions[i3] += particleSystem.velocities[i3];
        positions[i3 + 1] += particleSystem.velocities[i3 + 1];
        positions[i3 + 2] += particleSystem.velocities[i3 + 2];

        // Reset particles that drift too far
        const distance = Math.sqrt(
          positions[i3] * positions[i3] +
            positions[i3 + 1] * positions[i3 + 1] +
            positions[i3 + 2] * positions[i3 + 2]
        );

        if (distance > 60) {
          const radius = 20 + Math.random() * 10;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);

          positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i3 + 2] = radius * Math.cos(phi);
        }
      }

      // Mark geometry for update
      geometry.attributes.position.needsUpdate = true;
    }

    // Breathing effect for opacity
    if (!isMobile) {
      materialRef.current.opacity = 0.7 + Math.sin(time * 0.5) * 0.2;
    }
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return (
    <points ref={pointsRef} geometry={geometry} material={material}>
      <primitive object={material} ref={materialRef} attach="material" />
    </points>
  );
}
