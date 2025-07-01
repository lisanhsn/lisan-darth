"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Stars, OrbitControls } from "@react-three/drei";
import DarthVaderHelmet from "./DarthVaderHelmet";
import DeathStar from "./DeathStar";
import ImperialShips from "./ImperialShips";
import ParticleField from "./ParticleField";

export default function Scene3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          color="#FF0000"
          castShadow
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00BFFF" />

        {/* Background Elements */}
        <Suspense fallback={null}>
          <Stars
            radius={300}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
          <ParticleField />
        </Suspense>

        {/* 3D Objects */}
        <Suspense fallback={null}>
          <DarthVaderHelmet position={[2, 1, -2]} scale={0.8} />
          <DeathStar />
          <ImperialShips />
        </Suspense>

        {/* Controls for development (can be removed in production) */}
        <OrbitControls
          enabled={false}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}
