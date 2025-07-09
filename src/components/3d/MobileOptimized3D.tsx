"use client";

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useMobile } from '../../hooks/useMobile';
import { useMobilePerformance } from '../../hooks/useMobilePerformance';

interface MobileOptimized3DProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function MobileOptimized3D({
  children,
  fallback,
  className = "",
  style = {}
}: MobileOptimized3DProps) {
  const { isMobile, isLowPerformance } = useMobile();
  const { settings: mobileSettings } = useMobilePerformance();
  const [shouldRender3D, setShouldRender3D] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Check WebGL support
  useEffect(() => {
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          setShouldRender3D(false);
          return;
        }

        // Check for basic WebGL capabilities
        const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
        const maxVertexAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS) as number;
        
        // Disable 3D for very low-end devices
        if (maxTextureSize < 2048 || maxVertexAttribs < 8) {
          setShouldRender3D(false);
        }
      } catch (error) {
        console.warn('WebGL check failed:', error);
        setShouldRender3D(false);
      }
    };

    checkWebGLSupport();
  }, []);

  // Don't render 3D if disabled by mobile settings
  if (mobileSettings.disable3D || !shouldRender3D || hasError) {
    return (
      <div className={`mobile-3d-fallback ${className}`} style={style}>
        {fallback || (
          <div className="w-full h-full bg-gradient-to-br from-space-dark via-red-900/20 to-black flex items-center justify-center">
            <div className="text-imperial-red text-center">
              <div className="w-16 h-16 border-4 border-imperial-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg font-orbitron">
                Imperial Interface Loading...
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`mobile-optimized-3d ${className}`} style={style}>
      <Canvas
        onError={(error) => {
          console.error('Mobile 3D Canvas error:', error);
          setHasError(true);
        }}
        camera={{ 
          position: [0, 0, 8], 
          fov: isLowPerformance ? 60 : 75 
        }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
          precision: isLowPerformance ? "lowp" : isMobile ? "mediump" : "highp",
          preserveDrawingBuffer: false,
          premultipliedAlpha: true,
          stencil: false,
          depth: true,
        }}
        style={{
          background: "transparent",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
        frameloop="demand"
        performance={{ min: isLowPerformance ? 0.3 : 0.5 }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(
            Math.min(window.devicePixelRatio, isLowPerformance ? 1 : isMobile ? 1.5 : 2)
          );
          gl.outputColorSpace = "srgb";
          gl.toneMapping = 4; // ACESFilmicToneMapping
          
          // Optimize for mobile
          if (isMobile) {
            gl.disable(gl.DEPTH_TEST);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
          }
        }}
      >
        <Suspense fallback={null}>
          {/* Simplified stars for mobile */}
          <Stars
            radius={isLowPerformance ? 200 : 300}
            depth={isLowPerformance ? 30 : 60}
            count={isLowPerformance ? 100 : isMobile ? 300 : 500}
            factor={isLowPerformance ? 2 : 4}
            saturation={0.1}
            fade={true}
          />

          {/* Basic lighting */}
          <ambientLight intensity={isLowPerformance ? 0.6 : 0.4} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            castShadow={!mobileSettings.disableShadows}
            shadow-mapSize-width={mobileSettings.disableShadows ? 256 : 512}
            shadow-mapSize-height={mobileSettings.disableShadows ? 256 : 512}
          />

          {/* Render children */}
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}

// Mobile-optimized star field component
export function MobileStarField() {
  const { isMobile, isLowPerformance } = useMobile();
  const { settings: mobileSettings } = useMobilePerformance();

  if (mobileSettings.disable3D) {
    return (
      <div className="mobile-star-field-fallback">
        <div className="stars-static" />
      </div>
    );
  }

  return (
    <MobileOptimized3D className="absolute inset-0 opacity-40">
      <Stars
        radius={isLowPerformance ? 150 : 250}
        depth={isLowPerformance ? 20 : 40}
        count={isLowPerformance ? 50 : isMobile ? 150 : 300}
        factor={isLowPerformance ? 1 : 2}
        saturation={0.05}
        fade={true}
      />
    </MobileOptimized3D>
  );
}

// Mobile-optimized character component
export function MobileCharacter({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string; 
}) {
  const { isMobile, isLowPerformance } = useMobile();
  const { settings: mobileSettings } = useMobilePerformance();

  if (mobileSettings.disable3D || isLowPerformance) {
    return (
      <div className={`mobile-character-fallback ${className}`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-imperial-red to-imperial-gold rounded-full mx-auto mb-4 opacity-50" />
            <p className="text-imperial-gold text-sm font-orbitron">
              Dark Lord Present
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MobileOptimized3D className={className}>
      {children}
    </MobileOptimized3D>
  );
}