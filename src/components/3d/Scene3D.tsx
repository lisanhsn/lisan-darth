"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Stars, OrbitControls, PerformanceMonitor } from "@react-three/drei";
import DarthVaderHelmet from "./DarthVaderHelmet";
import DeathStar from "./DeathStar";
import ImperialShips from "./ImperialShips";
import ParticleField from "./ParticleField";
import { useWebGLOptimizations } from "../../hooks/useWebGLOptimizations";

export default function Scene3D() {
  const {
    webglSettings,
    onWebGLCreated,
    onPerformanceIncline,
    onPerformanceDecline,
    canvasStyle,
    performanceLevel,
  } = useWebGLOptimizations();

  return (
    <div className="w-full h-full" style={{ willChange: "transform" }}>
      <Canvas
        camera={webglSettings.cameraSettings}
        gl={webglSettings.rendererSettings}
        style={canvasStyle}
        frameloop="demand" // Only render when needed for performance
        performance={{ min: 0.5 }} // Adaptive performance scaling
        onCreated={onWebGLCreated}
      >
        {/* Performance monitoring for adaptive quality */}
        <PerformanceMonitor
          onIncline={onPerformanceIncline}
          onDecline={onPerformanceDecline}
          flipflops={3} // Allow 3 performance drops before downgrade
          factor={1} // Monitor every frame
        />

        {/* WebGL-optimized Lighting */}
        <ambientLight intensity={0.2} color="#1a1a2e" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          color="#FF0000"
          castShadow={performanceLevel === "high"}
          shadow-mapSize-width={webglSettings.performanceSettings.shadowMapSize}
          shadow-mapSize-height={
            webglSettings.performanceSettings.shadowMapSize
          }
          shadow-camera-far={webglSettings.performanceSettings.lightDistance}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0001}
        />
        <pointLight
          position={[-10, -10, -5]}
          intensity={0.5}
          color="#00BFFF"
          distance={webglSettings.performanceSettings.lightDistance}
          decay={2}
        />

        {/* Background Elements with adaptive LOD */}
        <Suspense fallback={null}>
          <Stars
            radius={300}
            depth={50}
            count={webglSettings.performanceSettings.particleCount}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
          <ParticleField />
        </Suspense>

        {/* WebGL-optimized 3D Objects */}
        <Suspense fallback={null}>
          <DarthVaderHelmet position={[2, 1, -2]} scale={0.8} />
          <DeathStar />
          <ImperialShips />
        </Suspense>

        {/* Optimized Controls */}
        <OrbitControls
          enabled={false}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          makeDefault
        />
      </Canvas>
    </div>
  );
}
