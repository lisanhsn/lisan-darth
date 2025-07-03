"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { Group, Mesh, MeshStandardMaterial } from "three";

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

  const { scene } = useThree();

  // Load the GLTF model with proper error handling
  const { scene: gltfScene, materials, nodes } = useGLTF(modelPath);

  // Debug and setup the model
  useEffect(() => {
    console.log("🎭 DarthVaderModel: Loading GLTF from", modelPath);

    if (gltfScene) {
      console.log("✅ GLTF loaded successfully:");
      console.log("📦 Scene:", gltfScene);
      console.log("🎨 Materials:", materials);
      console.log("🔗 Nodes:", nodes);

      // Calculate bounding box to understand model size
      const box = new THREE.Box3().setFromObject(gltfScene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      console.log("📏 Model dimensions:", {
        size: size,
        center: center,
        min: box.min,
        max: box.max,
      });

      setModelLoaded(true);
    }
  }, [gltfScene, materials, nodes, modelPath]);

  // Clone and setup the scene
  const clonedScene = React.useMemo(() => {
    if (!gltfScene) return null;

    try {
      const cloned = gltfScene.clone();

      // Calculate proper scale - the model is very small, so we need to scale it up significantly
      const box = new THREE.Box3().setFromObject(cloned);
      const size = box.getSize(new THREE.Vector3());
      const maxDimension = Math.max(size.x, size.y, size.z);

      // Scale factor to make the model about 2 units tall
      const targetSize = 2;
      const scaleFactor = targetSize / maxDimension;

      console.log(
        `🔧 Scaling model by ${scaleFactor} (original max dimension: ${maxDimension})`
      );

      // Apply dramatic scaling since the original model is tiny
      const finalScale = scaleFactor * scale * 50; // Additional boost for visibility
      cloned.scale.setScalar(finalScale);

      // Center the model
      const center = box.getCenter(new THREE.Vector3());
      cloned.position.set(
        -center.x * finalScale,
        -center.y * finalScale,
        -center.z * finalScale
      );

      // Enhance materials for better visibility and Imperial theme
      cloned.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          console.log("🎭 Processing mesh:", child.name, child.material);

          if (child.material instanceof MeshStandardMaterial) {
            // Make materials more visible and dramatic
            child.material.metalness = 0.8;
            child.material.roughness = 0.3;

            // Enhance the dark side aesthetic
            if (child.material.name?.includes("Default1")) {
              // Make it darker and more menacing
              child.material.color.multiplyScalar(0.5);
              child.material.emissive = new THREE.Color(0x220000);
              child.material.emissiveIntensity = 0.2;
            }

            // Enable shadows
            child.castShadow = true;
            child.receiveShadow = true;

            // Force material update
            child.material.needsUpdate = true;
          }

          // Make sure the mesh is visible
          child.visible = true;
          child.frustumCulled = false;
        }
      });

      return cloned;
    } catch (error) {
      console.error("❌ Error processing model:", error);
      setLoadingError(error instanceof Error ? error.message : "Unknown error");
      return null;
    }
  }, [gltfScene, scale]);

  // Enhanced animations with Force powers
  useFrame((state) => {
    if (!modelLoaded) return;

    try {
      const time = state.clock.elapsedTime;

      if (groupRef.current) {
        // Slow, menacing rotation
        groupRef.current.rotation.y = time * 0.2 + mousePosition.x * 0.15;

        // Subtle floating animation
        groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.1;

        // Interactive tilt based on hover
        if (isHovered && interactive) {
          groupRef.current.rotation.x = Math.sin(time * 2) * 0.08;
          groupRef.current.rotation.z = Math.cos(time * 1.5) * 0.05;
        }
      }

      if (modelRef.current && clonedScene) {
        // Breathing effect - subtle scale animation
        const breathingScale = 1 + Math.sin(time * 1.5) * 0.03;
        modelRef.current.scale.setScalar(breathingScale);
      }

      // Enhanced red lighting effects
      if (lightRef.current) {
        const intensity = 3 + Math.sin(time * 2) * 1;
        lightRef.current.intensity = intensity;

        // Lightsaber-like glow pulsing
        lightRef.current.color.setHSL(0, 1, 0.4 + Math.sin(time * 3) * 0.2);
      }

      // Aura effects
      if (auraRef.current) {
        const auraScale = 1.3 + Math.sin(time * 0.8) * 0.2;
        auraRef.current.scale.setScalar(auraScale);

        // Dark side energy pulsing
        const material = auraRef.current.material as THREE.MeshStandardMaterial;
        material.opacity = 0.05 + Math.sin(time * 2) * 0.03;
      }
    } catch (error) {
      console.error("❌ Error in useFrame animation:", error);
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
        console.error("❌ Error handling mouse move:", error);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  // If there's an error loading the model, show fallback
  if (loadingError) {
    console.error("❌ Model loading error:", loadingError);
    return <DarthVaderFallback />;
  }

  if (!clonedScene) {
    console.log("⏳ Model not ready yet, showing fallback");
    return <DarthVaderFallback />;
  }

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Main Darth Vader Model */}
      <group ref={modelRef}>
        <primitive object={clonedScene} />
      </group>

      {/* Enhanced Dark Side Aura */}
      <mesh ref={auraRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color="#ff0000"
          transparent
          opacity={0.08}
          emissive="#660000"
          emissiveIntensity={0.3}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Primary Red Sith Lighting */}
      <pointLight
        ref={lightRef}
        position={[0, 1, 2]}
        color="#ff3333"
        intensity={3}
        distance={12}
        decay={2}
        castShadow
      />

      {/* Secondary atmospheric lighting */}
      <pointLight
        position={[-2, 0, 1]}
        color="#660000"
        intensity={2}
        distance={8}
        decay={2}
      />

      <pointLight
        position={[2, 2, -1]}
        color="#ff6666"
        intensity={1.5}
        distance={6}
        decay={2}
      />

      {/* Dark energy particles - only if model is loaded */}
      {interactive && modelLoaded && (
        <Sparkles
          count={30}
          scale={4}
          size={3}
          speed={0.5}
          color="#ff4444"
          opacity={0.6}
        />
      )}

      {/* Enhanced Force field effect */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.05, 16, 32]} />
        <meshStandardMaterial
          color="#ff4444"
          emissive="#ff0000"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Additional ring effects */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.02, 12, 24]} />
        <meshStandardMaterial
          color="#ff6666"
          emissive="#ff3333"
          emissiveIntensity={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

// Enhanced loading fallback component
function DarthVaderFallback() {
  useEffect(() => {
    console.log("⏳ DarthVaderFallback: Displaying loading state");
  }, []);

  return (
    <group>
      {/* Main fallback sphere representing Vader's helmet */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#ff3333"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Breathing apparatus representation */}
      <mesh position={[0, -0.5, 1.5]}>
        <cylinderGeometry args={[0.3, 0.3, 0.8, 8]} />
        <meshStandardMaterial
          color="#333333"
          emissive="#ff0000"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Pulsing red aura */}
      <mesh>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Loading lights */}
      <pointLight
        position={[0, 0, 2]}
        color="#ff3333"
        intensity={4}
        distance={12}
        decay={2}
      />

      <pointLight
        position={[0, -0.5, 1.5]}
        color="#ff6666"
        intensity={2}
        distance={6}
        decay={2}
      />

      {/* Loading particles */}
      <Sparkles
        count={15}
        scale={3}
        size={2}
        speed={0.8}
        color="#ff4444"
        opacity={0.7}
      />
    </group>
  );
}

export default function DarthVaderModel(props: DarthVaderModelProps) {
  useEffect(() => {
    console.log("🎭 DarthVaderModel: Component mounted with props:", props);
  }, [props]);

  return (
    <ModelErrorBoundary fallback={<DarthVaderFallback />}>
      <Float
        speed={1.2}
        rotationIntensity={0.15}
        floatIntensity={0.3}
        floatingRange={[0, 0.2]}
      >
        <Suspense fallback={<DarthVaderFallback />}>
          <DarthVaderModelInner {...props} />
        </Suspense>
      </Float>
    </ModelErrorBoundary>
  );
}
