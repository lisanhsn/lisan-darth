"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Mesh,
  Group,
  SphereGeometry,
  BoxGeometry,
  CylinderGeometry,
  TorusGeometry,
  CircleGeometry,
} from "three";
import * as THREE from "three";

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
  const auraRef = useRef<Mesh>(null);

  // WebGL-optimized geometries (reuse instances)
  const geometries = useMemo(
    () => ({
      helmet: new SphereGeometry(1, 32, 32),
      faceMask: new BoxGeometry(1.2, 0.8, 0.2),
      breathing: new CylinderGeometry(0.15, 0.15, 0.4, 8),
      eye: new SphereGeometry(0.1, 16, 16),
      ridge: new TorusGeometry(0.8, 0.05, 8, 32),
      vent: new CylinderGeometry(0.05, 0.05, 0.3, 8),
      symbol: new CircleGeometry(0.15, 16),
      aura: new SphereGeometry(1, 32, 32),
    }),
    []
  );

  // WebGL-optimized materials with proper settings
  const materials = useMemo(
    () => ({
      helmet: new THREE.MeshPhongMaterial({
        color: "#1a1a1a",
        shininess: 100,
        specular: "#333333",
        transparent: false,
      }),
      faceMask: new THREE.MeshPhongMaterial({
        color: "#0d0d0d",
        shininess: 50,
        transparent: false,
      }),
      breathing: new THREE.MeshPhongMaterial({
        color: "#333333",
        shininess: 80,
        transparent: false,
      }),
      eye: new THREE.MeshStandardMaterial({
        color: "#FF0000",
        emissive: "#FF0000",
        emissiveIntensity: 0.8,
        transparent: false,
      }),
      ridge: new THREE.MeshPhongMaterial({
        color: "#444444",
        shininess: 100,
        transparent: false,
      }),
      vent: new THREE.MeshPhongMaterial({
        color: "#555555",
        transparent: false,
      }),
      symbol: new THREE.MeshStandardMaterial({
        color: "#FFD700",
        emissive: "#FFD700",
        emissiveIntensity: 0.3,
        transparent: false,
      }),
      aura: new THREE.MeshStandardMaterial({
        color: "#FF0000",
        transparent: true,
        opacity: 0.05,
        emissive: "#FF0000",
        emissiveIntensity: 0.1,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    }),
    []
  );

  // Optimized animation with reduced calculations
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (helmetRef.current) {
      // Smooth rotation
      helmetRef.current.rotation.y = time * 0.2;

      // Gentle floating motion
      helmetRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2;
    }

    if (eyesRef.current) {
      // Optimized pulsing red glow effect for eyes
      const glowIntensity = 1 + Math.sin(time * 2) * 0.3;
      eyesRef.current.scale.setScalar(glowIntensity);

      // Update eye material emissive intensity
      const eyeMaterial = materials.eye;
      eyeMaterial.emissiveIntensity = 0.8 + Math.sin(time * 2) * 0.4;
    }

    if (auraRef.current) {
      // Subtle aura breathing effect
      const auraScale = 1.3 + Math.sin(time * 0.8) * 0.1;
      auraRef.current.scale.setScalar(auraScale);

      // Aura opacity pulsing
      materials.aura.opacity = 0.05 + Math.sin(time * 1.2) * 0.03;
    }
  });

  // Cleanup materials and geometries on unmount
  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((geo) => geo.dispose());
      Object.values(materials).forEach((mat) => mat.dispose());
    };
  }, [geometries, materials]);

  return (
    <group position={position} scale={scale}>
      {/* Main Helmet Structure */}
      <mesh
        ref={helmetRef}
        geometry={geometries.helmet}
        material={materials.helmet}
        castShadow
        receiveShadow
      />

      {/* Helmet Details */}
      {/* Face Mask */}
      <mesh
        position={[0, -0.3, 0.8]}
        geometry={geometries.faceMask}
        material={materials.faceMask}
        castShadow
      />

      {/* Breathing Apparatus */}
      <mesh
        position={[0, -0.7, 0.6]}
        geometry={geometries.breathing}
        material={materials.breathing}
        castShadow
      />

      {/* Eye Lenses */}
      <group ref={eyesRef}>
        <mesh
          position={[-0.25, 0.1, 0.9]}
          geometry={geometries.eye}
          material={materials.eye}
        />
        <mesh
          position={[0.25, 0.1, 0.9]}
          geometry={geometries.eye}
          material={materials.eye}
        />
      </group>

      {/* Helmet Ridge */}
      <mesh
        position={[0, 0.5, 0]}
        rotation={[0, 0, 0]}
        geometry={geometries.ridge}
        material={materials.ridge}
      />

      {/* Side Vents */}
      <mesh
        position={[-0.9, -0.2, 0]}
        rotation={[0, 0, Math.PI / 2]}
        geometry={geometries.vent}
        material={materials.vent}
      />
      <mesh
        position={[0.9, -0.2, 0]}
        rotation={[0, 0, Math.PI / 2]}
        geometry={geometries.vent}
        material={materials.vent}
      />

      {/* Imperial Symbol */}
      <mesh
        position={[0, 0.2, 0.95]}
        rotation={[0, 0, 0]}
        geometry={geometries.symbol}
        material={materials.symbol}
      />

      {/* Glowing Aura */}
      <mesh
        ref={auraRef}
        position={[0, 0, 0]}
        scale={1.3}
        geometry={geometries.aura}
        material={materials.aura}
      />

      {/* Point light for helmet glow */}
      <pointLight
        position={[0, 0, 1]}
        color="#FF0000"
        intensity={0.5}
        distance={5}
        decay={2}
      />
    </group>
  );
}
