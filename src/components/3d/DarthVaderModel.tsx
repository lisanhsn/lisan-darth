"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { Group, Mesh } from "three";

interface DarthVaderModelProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  isHovered?: boolean;
  interactive?: boolean;
}

// Get the correct base path for deployment
const basePath = process.env.NODE_ENV === "production" ? "/lisan-darth" : "";
const modelPath = `${basePath}/darthvader/scene.gltf`;

// Error boundary component
class ModelErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("3D Model Error:", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("3D Model Error Details:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Preload the model for better performance with error handling
try {
  useGLTF.preload(modelPath);
} catch (error) {
  console.warn("Failed to preload model:", error);
}

function DarthVaderModelInner({
  position = [0, 0, 0],
  scale = 1,
  rotation = [0, 0, 0],
  isHovered = false,
  interactive = true,
}: DarthVaderModelProps) {
  const groupRef = useRef<Group>(null);
  const modelRef = useRef<Group>(null);
  const auraRef = useRef<Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  // Load the GLTF model with error handling
  let scene = null;
  try {
    const gltf = useGLTF(modelPath);
    scene = gltf.scene;
  } catch (error) {
    console.error("Error loading GLTF model:", error);
    setLoadingError(error instanceof Error ? error.message : "Unknown error");
  }

  // Debug logging
  useEffect(() => {
    console.log("DarthVaderModel: Loading GLTF from", modelPath);
    if (scene) {
      console.log("DarthVaderModel: GLTF loaded successfully", scene);
      setModelLoaded(true);
    } else if (loadingError) {
      console.error("DarthVaderModel: Failed to load GLTF:", loadingError);
    }
  }, [scene, modelPath, loadingError]);

  // Clone the scene to avoid conflicts if used multiple times
  const clonedScene = scene ? scene.clone() : null;

  useEffect(() => {
    if (clonedScene) {
      try {
        // Enhance materials for dark side effect
        clonedScene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.material) {
              // Create enhanced material for Darth Vader
              const material = child.material as THREE.MeshStandardMaterial;

              // Make it darker and more menacing
              material.color.multiplyScalar(0.7);
              material.roughness = 0.3;
              material.metalness = 0.8;

              // Add subtle red glow to dark areas
              if (material.name?.includes("Default1")) {
                material.emissive = new THREE.Color(0x220000);
                material.emissiveIntensity = 0.1;
              }

              // Enable shadows
              child.castShadow = true;
              child.receiveShadow = true;
            }
          }
        });

        // Scale and orient the model properly
        clonedScene.scale.set(scale * 20, scale * 20, scale * 20);
        clonedScene.position.set(0, -1, 0);
      } catch (error) {
        console.error("Error processing model materials:", error);
      }
    }
  }, [clonedScene, scale]);

  // Enhanced animations with Force powers
  useFrame((state) => {
    try {
      const time = state.clock.elapsedTime;

      if (groupRef.current) {
        // Slow, menacing rotation
        groupRef.current.rotation.y = time * 0.15 + mousePosition.x * 0.1;

        // Subtle floating animation
        groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.1;

        // Interactive tilt based on hover
        if (isHovered && interactive) {
          groupRef.current.rotation.x = Math.sin(time * 2) * 0.05;
          groupRef.current.rotation.z = Math.cos(time * 1.5) * 0.03;
        }
      }

      if (modelRef.current) {
        // Breathing effect - subtle scale animation
        const breathingScale = 1 + Math.sin(time * 1.2) * 0.02;
        modelRef.current.scale.setScalar(breathingScale);
      }

      // Enhanced red lighting effects
      if (lightRef.current) {
        const intensity = 2 + Math.sin(time * 3) * 0.5;
        lightRef.current.intensity = intensity;

        // Lightsaber-like glow pulsing
        lightRef.current.color.setHSL(0, 1, 0.3 + Math.sin(time * 2) * 0.1);
      }

      // Aura effects
      if (auraRef.current) {
        const auraScale = 1.2 + Math.sin(time * 0.6) * 0.1;
        auraRef.current.scale.setScalar(auraScale);

        // Dark side energy pulsing
        const material = auraRef.current.material as THREE.MeshStandardMaterial;
        material.opacity = 0.03 + Math.sin(time * 1.5) * 0.02;
      }
    } catch (error) {
      console.error("Error in useFrame animation:", error);
    }
  });

  // Mouse interaction for desktop
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (event: MouseEvent) => {
      try {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        setMousePosition({ x, y });
      } catch (error) {
        console.error("Error handling mouse move:", error);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  // If there's an error loading the model, show fallback
  if (loadingError) {
    return <DarthVaderFallback />;
  }

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Main Darth Vader Model */}
      <group ref={modelRef}>
        {clonedScene && <primitive object={clonedScene} />}
      </group>

      {/* Dark Side Aura */}
      <mesh ref={auraRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#ff0000"
          transparent
          opacity={0.05}
          emissive="#330000"
          emissiveIntensity={0.2}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Red Sith Lighting */}
      <pointLight
        ref={lightRef}
        position={[0, 0.5, 1]}
        color="#ff3333"
        intensity={2}
        distance={8}
        decay={2}
        castShadow
      />

      {/* Additional atmospheric lighting */}
      <pointLight
        position={[-1, 0, 0.5]}
        color="#660000"
        intensity={1}
        distance={4}
        decay={2}
      />

      {/* Dark energy particles - only if model is loaded */}
      {interactive && modelLoaded && (
        <Sparkles
          count={20}
          scale={2}
          size={2}
          speed={0.3}
          color="#ff4444"
          opacity={0.4}
        />
      )}

      {/* Force field effect */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 32]} />
        <meshStandardMaterial
          color="#ff6666"
          emissive="#ff0000"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// Loading fallback component
function DarthVaderFallback() {
  useEffect(() => {
    console.log("DarthVaderFallback: Displaying loading state");
  }, []);

  return (
    <group>
      {/* Main fallback sphere */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#333333"
          emissive="#ff3333"
          emissiveIntensity={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Pulsing red aura */}
      <mesh>
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Loading light */}
      <pointLight
        position={[0, 0, 0]}
        color="#ff3333"
        intensity={3}
        distance={10}
        decay={2}
      />
    </group>
  );
}

export default function DarthVaderModel(props: DarthVaderModelProps) {
  useEffect(() => {
    console.log("DarthVaderModel: Component mounted with props:", props);
  }, [props]);

  return (
    <ModelErrorBoundary fallback={<DarthVaderFallback />}>
      <Float
        speed={1}
        rotationIntensity={0.1}
        floatIntensity={0.2}
        floatingRange={[0, 0.1]}
      >
        <Suspense fallback={<DarthVaderFallback />}>
          <DarthVaderModelInner {...props} />
        </Suspense>
      </Float>
    </ModelErrorBoundary>
  );
}
