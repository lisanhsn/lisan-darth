"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

export default function ImperialShips() {
  const shipsRef = useRef<Group>(null);

  useFrame(() => {
    if (shipsRef.current) {
      // Orbit around the scene
      shipsRef.current.rotation.y += 0.003;
    }
  });

  const createTIEFighter = (
    position: [number, number, number],
    scale: number = 1
  ) => (
    <group position={position} scale={scale}>
      {/* Central Cockpit */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhongMaterial color="#2a2a2a" shininess={80} />
      </mesh>

      {/* Side Solar Panels */}
      <mesh position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1, 0.05, 1]} />
        <meshPhongMaterial color="#1a1a1a" shininess={100} />
      </mesh>
      <mesh position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1, 0.05, 1]} />
        <meshPhongMaterial color="#1a1a1a" shininess={100} />
      </mesh>

      {/* Cockpit Window */}
      <mesh position={[0, 0, 0.31]}>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial
          color="#00BFFF"
          emissive="#00BFFF"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Engine Glow */}
      <mesh position={[0, 0, -0.4]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial
          color="#00BFFF"
          emissive="#00BFFF"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  );

  const createStarDestroyer = (
    position: [number, number, number],
    scale: number = 1
  ) => (
    <group position={position} scale={scale} rotation={[0, Math.PI / 4, 0]}>
      {/* Main Hull */}
      <mesh>
        <coneGeometry args={[0.5, 2, 3]} />
        <meshPhongMaterial color="#4a4a4a" shininess={60} />
      </mesh>

      {/* Command Tower */}
      <mesh position={[0, 0.3, 0.5]}>
        <boxGeometry args={[0.2, 0.4, 0.8]} />
        <meshPhongMaterial color="#3a3a3a" shininess={80} />
      </mesh>

      {/* Bridge */}
      <mesh position={[0, 0.6, 0.9]}>
        <boxGeometry args={[0.15, 0.1, 0.2]} />
        <meshPhongMaterial color="#2a2a2a" shininess={100} />
      </mesh>

      {/* Engine Trails */}
      <mesh position={[-0.2, -0.1, -1.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        <meshStandardMaterial
          color="#00BFFF"
          emissive="#00BFFF"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[0.2, -0.1, -1.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        <meshStandardMaterial
          color="#00BFFF"
          emissive="#00BFFF"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[0, -0.1, -1.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        <meshStandardMaterial
          color="#00BFFF"
          emissive="#00BFFF"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );

  return (
    <group ref={shipsRef}>
      {/* TIE Fighter Squadron */}
      {createTIEFighter([5, 2, -3], 0.3)}
      {createTIEFighter([4.5, 1.5, -2.8], 0.25)}
      {createTIEFighter([5.5, 2.2, -3.2], 0.28)}

      {/* More TIE Fighters in formation */}
      {createTIEFighter([-4, -1, -4], 0.2)}
      {createTIEFighter([-3.8, -0.8, -3.9], 0.18)}
      {createTIEFighter([-4.2, -1.2, -4.1], 0.22)}

      {/* Distant TIE Fighters */}
      {createTIEFighter([8, 0, -8], 0.1)}
      {createTIEFighter([-8, 3, -9], 0.12)}
      {createTIEFighter([0, -5, -10], 0.08)}

      {/* Star Destroyers */}
      {createStarDestroyer([10, -3, -15], 0.15)}
      {createStarDestroyer([-12, 4, -18], 0.12)}

      {/* Patrol Ships */}
      <group position={[6, -2, -6]} rotation={[0, Math.PI / 3, 0]} scale={0.4}>
        <mesh>
          <boxGeometry args={[0.8, 0.2, 2]} />
          <meshPhongMaterial color="#3a3a3a" shininess={70} />
        </mesh>
        <mesh position={[0, 0, -1.2]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#00BFFF"
            emissive="#00BFFF"
            emissiveIntensity={1}
          />
        </mesh>
      </group>

      <group
        position={[-7, 1, -7]}
        rotation={[0, -Math.PI / 6, 0]}
        scale={0.35}
      >
        <mesh>
          <boxGeometry args={[0.8, 0.2, 2]} />
          <meshPhongMaterial color="#3a3a3a" shininess={70} />
        </mesh>
        <mesh position={[0, 0, -1.2]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color="#00BFFF"
            emissive="#00BFFF"
            emissiveIntensity={1}
          />
        </mesh>
      </group>
    </group>
  );
}
