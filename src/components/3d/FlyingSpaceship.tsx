"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Group,
  Vector3,
  ConeGeometry,
  BoxGeometry,
  SphereGeometry,
  CylinderGeometry,
} from "three";
import { Float } from "@react-three/drei";
import * as THREE from "three";

interface FlyingSpaceshipProps {
  delay?: number;
  speed?: number;
  boostMode?: boolean;
}

export default function FlyingSpaceship({
  delay = 3,
  speed = 1,
  boostMode = true,
}: FlyingSpaceshipProps) {
  const spaceshipRef = useRef<Group>(null);
  const trailRef = useRef<Group>(null);
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState(new Vector3(-15, 2, -8));
  const [boostActive, setBoostActive] = useState(false);
  const [glowColor, setGlowColor] = useState("#ff6b35");

  // WebGL-optimized geometries (reuse instances)
  const geometries = useMemo(
    () => ({
      hull: new ConeGeometry(0.3, 1.2, 8),
      wing: new BoxGeometry(0.8, 0.05, 0.4),
      cockpit: new SphereGeometry(0.15, 8, 8),
      engine: new CylinderGeometry(0.05, 0.08, 0.2, 8),
      flame: new ConeGeometry(0.04, 0.3, 6),
      boostFlame: new ConeGeometry(0.04, 0.8, 6),
      trail: new SphereGeometry(0.1, 8, 8),
    }),
    []
  );

  // WebGL-optimized materials with proper settings
  const materials = useMemo(() => {
    const brightColors = [
      "#ff6b35",
      "#00d4ff",
      "#ff3366",
      "#33ff66",
      "#9966ff",
      "#ffff33",
      "#ff3399",
      "#66ffff",
      "#ff9933",
      "#33ff99",
      "#ff6666",
      "#6666ff",
    ];

    return {
      hull: {
        normal: new THREE.MeshStandardMaterial({
          color: "#2d3748",
          metalness: 0.8,
          roughness: 0.2,
          transparent: false,
        }),
        boost: new THREE.MeshStandardMaterial({
          color: "#4a5568",
          metalness: 0.8,
          roughness: 0.2,
          emissive: new THREE.Color(glowColor),
          emissiveIntensity: 0.3,
          transparent: false,
        }),
      },
      wing: {
        normal: new THREE.MeshStandardMaterial({
          color: "#c53030",
          metalness: 0.6,
          roughness: 0.3,
          transparent: false,
        }),
        boost: new THREE.MeshStandardMaterial({
          color: "#e53e3e",
          metalness: 0.6,
          roughness: 0.3,
          emissive: new THREE.Color(glowColor),
          emissiveIntensity: 0.4,
          transparent: false,
        }),
      },
      cockpit: {
        normal: new THREE.MeshStandardMaterial({
          color: "#0078d4",
          emissive: "#0078d4",
          emissiveIntensity: 0.3,
          transparent: true,
          opacity: 0.8,
        }),
        boost: new THREE.MeshStandardMaterial({
          color: glowColor,
          emissive: glowColor,
          emissiveIntensity: 1.2,
          transparent: true,
          opacity: 0.8,
        }),
      },
      engine: new THREE.MeshStandardMaterial({
        color: "#1a202c",
        transparent: false,
      }),
      flame: {
        normal: new THREE.MeshStandardMaterial({
          color: "#3182ce",
          emissive: "#3182ce",
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
        }),
        boost: new THREE.MeshStandardMaterial({
          color: glowColor,
          emissive: glowColor,
          emissiveIntensity: 2.0,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
        }),
      },
      trail: new THREE.MeshStandardMaterial({
        color: glowColor,
        emissive: glowColor,
        emissiveIntensity: 1.5,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
      brightColors,
    };
  }, [glowColor, geometries]);

  // Generate random bright glow color
  const generateRandomGlowColor = () => {
    return materials.brightColors[
      Math.floor(Math.random() * materials.brightColors.length)
    ];
  };

  // Activate after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  // Boost activation with WebGL-optimized color updates
  useEffect(() => {
    if (!isActive || !boostMode) return;

    const boostTimer = setTimeout(() => {
      setBoostActive(true);
      const newColor = generateRandomGlowColor();
      setGlowColor(newColor);

      // Update material colors for WebGL optimization
      materials.hull.boost.emissive.set(newColor);
      materials.wing.boost.emissive.set(newColor);
      materials.cockpit.boost.color.set(newColor);
      materials.cockpit.boost.emissive.set(newColor);
      materials.flame.boost.color.set(newColor);
      materials.flame.boost.emissive.set(newColor);
      materials.trail.color.set(newColor);
      materials.trail.emissive.set(newColor);
    }, 2000);

    return () => clearTimeout(boostTimer);
  }, [isActive, boostMode, materials]);

  // WebGL-optimized animation frame
  useFrame((state) => {
    if (!spaceshipRef.current || !isActive) return;

    const time = state.clock.elapsedTime;
    const currentSpeed = boostActive ? speed * 3 : speed;

    // Move spaceship across the screen
    position.x += currentSpeed * 0.05;
    position.z += currentSpeed * 0.02;

    // Add smooth vertical oscillation
    position.y = 2 + Math.sin(time * 2) * 0.3;

    spaceshipRef.current.position.copy(position);

    // Optimized rotation calculations
    spaceshipRef.current.rotation.y = -0.3 + Math.sin(time) * 0.1;
    spaceshipRef.current.rotation.z = Math.sin(time * 1.5) * 0.05;

    // Reset position when off screen
    if (position.x > 20) {
      position.set(-15, 2, -8);
      setBoostActive(false);

      // Re-enable boost with new random color
      setTimeout(() => {
        if (boostMode) {
          setBoostActive(true);
          const newColor = generateRandomGlowColor();
          setGlowColor(newColor);
        }
      }, 2000);
    }

    // Update trail effects
    if (trailRef.current) {
      trailRef.current.rotation.y += 0.1;
    }
  });

  // Cleanup materials and geometries on unmount
  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((geo) => geo.dispose());
      Object.values(materials.hull).forEach((mat) => mat.dispose());
      Object.values(materials.wing).forEach((mat) => mat.dispose());
      Object.values(materials.cockpit).forEach((mat) => mat.dispose());
      Object.values(materials.flame).forEach((mat) => mat.dispose());
      materials.engine.dispose();
      materials.trail.dispose();
    };
  }, [geometries, materials]);

  const createSpaceship = () => (
    <group>
      {/* Main Hull */}
      <mesh
        geometry={geometries.hull}
        material={boostActive ? materials.hull.boost : materials.hull.normal}
      />

      {/* Wings */}
      <mesh
        position={[-0.4, 0, 0.2]}
        rotation={[0, 0, Math.PI / 6]}
        geometry={geometries.wing}
        material={boostActive ? materials.wing.boost : materials.wing.normal}
      />
      <mesh
        position={[0.4, 0, 0.2]}
        rotation={[0, 0, -Math.PI / 6]}
        geometry={geometries.wing}
        material={boostActive ? materials.wing.boost : materials.wing.normal}
      />

      {/* Cockpit */}
      <mesh
        position={[0, 0.1, 0.4]}
        geometry={geometries.cockpit}
        material={
          boostActive ? materials.cockpit.boost : materials.cockpit.normal
        }
      />

      {/* Engine Nozzles */}
      <mesh
        position={[-0.2, 0, -0.7]}
        geometry={geometries.engine}
        material={materials.engine}
      />
      <mesh
        position={[0.2, 0, -0.7]}
        geometry={geometries.engine}
        material={materials.engine}
      />

      {/* Engine Flames */}
      <mesh
        position={[-0.2, 0, -0.9]}
        geometry={boostActive ? geometries.boostFlame : geometries.flame}
        material={boostActive ? materials.flame.boost : materials.flame.normal}
      />
      <mesh
        position={[0.2, 0, -0.9]}
        geometry={boostActive ? geometries.boostFlame : geometries.flame}
        material={boostActive ? materials.flame.boost : materials.flame.normal}
      />

      {/* Boost Trail Effect */}
      {boostActive && (
        <group ref={trailRef}>
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh
              key={i}
              position={[0, 0, -1.2 - i * 0.3]}
              scale={[1 - i * 0.15, 1 - i * 0.15, 1]}
              geometry={geometries.trail}
              material={materials.trail}
            />
          ))}
        </group>
      )}

      {/* Point light for glow effect */}
      {boostActive && (
        <pointLight
          position={[0, 0, 0]}
          color={glowColor}
          intensity={0.8}
          distance={8}
          decay={2}
        />
      )}
    </group>
  );

  if (!isActive) return null;

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={spaceshipRef}>{createSpaceship()}</group>
    </Float>
  );
}
