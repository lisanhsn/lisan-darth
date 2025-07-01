"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { Float } from "@react-three/drei";

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

  // Activate after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  // Boost activation
  useEffect(() => {
    if (!isActive || !boostMode) return;

    const boostTimer = setTimeout(() => {
      setBoostActive(true);
    }, 2000); // Boost activates 2 seconds after spaceship starts

    return () => clearTimeout(boostTimer);
  }, [isActive, boostMode]);

  useFrame((state) => {
    if (!spaceshipRef.current || !isActive) return;

    const currentSpeed = boostActive ? speed * 3 : speed;

    // Move spaceship across the screen
    position.x += currentSpeed * 0.05;
    position.z += currentSpeed * 0.02; // Slight z movement for depth

    // Add some subtle vertical oscillation
    position.y = 2 + Math.sin(state.clock.elapsedTime * 2) * 0.3;

    spaceshipRef.current.position.copy(position);

    // Rotate slightly based on movement
    spaceshipRef.current.rotation.y =
      -0.3 + Math.sin(state.clock.elapsedTime) * 0.1;
    spaceshipRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 1.5) * 0.05;

    // Reset position when off screen
    if (position.x > 20) {
      position.set(-15, 2, -8);
      setBoostActive(false);

      // Re-enable boost after reset
      setTimeout(() => {
        if (boostMode) setBoostActive(true);
      }, 2000);
    }

    // Update trail effects
    if (trailRef.current) {
      trailRef.current.rotation.y += 0.1;
    }
  });

  const createSpaceship = () => (
    <group>
      {/* Main Hull */}
      <mesh>
        <coneGeometry args={[0.3, 1.2, 8]} />
        <meshStandardMaterial
          color={boostActive ? "#4a5568" : "#2d3748"}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Wings */}
      <mesh position={[-0.4, 0, 0.2]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.8, 0.05, 0.4]} />
        <meshStandardMaterial
          color={boostActive ? "#e53e3e" : "#c53030"}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0.4, 0, 0.2]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.8, 0.05, 0.4]} />
        <meshStandardMaterial
          color={boostActive ? "#e53e3e" : "#c53030"}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Cockpit */}
      <mesh position={[0, 0.1, 0.4]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial
          color="#0078d4"
          emissive="#0078d4"
          emissiveIntensity={boostActive ? 0.8 : 0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Engine Nozzles */}
      <mesh position={[-0.2, 0, -0.7]}>
        <cylinderGeometry args={[0.05, 0.08, 0.2, 8]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
      <mesh position={[0.2, 0, -0.7]}>
        <cylinderGeometry args={[0.05, 0.08, 0.2, 8]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>

      {/* Engine Flames */}
      <mesh position={[-0.2, 0, -0.9]}>
        <coneGeometry args={[0.04, boostActive ? 0.8 : 0.3, 6]} />
        <meshStandardMaterial
          color={boostActive ? "#ff6b35" : "#3182ce"}
          emissive={boostActive ? "#ff6b35" : "#3182ce"}
          emissiveIntensity={boostActive ? 1.5 : 0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0.2, 0, -0.9]}>
        <coneGeometry args={[0.04, boostActive ? 0.8 : 0.3, 6]} />
        <meshStandardMaterial
          color={boostActive ? "#ff6b35" : "#3182ce"}
          emissive={boostActive ? "#ff6b35" : "#3182ce"}
          emissiveIntensity={boostActive ? 1.5 : 0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Boost Trail Effect */}
      {boostActive && (
        <group ref={trailRef}>
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh
              key={i}
              position={[0, 0, -1.2 - i * 0.3]}
              scale={[1 - i * 0.15, 1 - i * 0.15, 1]}
            >
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial
                color="#ff6b35"
                emissive="#ff6b35"
                emissiveIntensity={1 - i * 0.2}
                transparent
                opacity={0.8 - i * 0.15}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );

  if (!isActive) return null;

  return (
    <Float
      speed={boostActive ? 4 : 1}
      rotationIntensity={boostActive ? 0.5 : 0.2}
      floatIntensity={boostActive ? 0.8 : 0.3}
    >
      <group ref={spaceshipRef} scale={boostActive ? 1.2 : 1}>
        {createSpaceship()}
      </group>
    </Float>
  );
}
