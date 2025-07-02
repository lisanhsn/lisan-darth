"use client";

import { useMemo, useCallback, useEffect, useState } from "react";
import { useMobile } from "./useMobile";

interface WebGLSettings {
  rendererSettings: {
    antialias: boolean;
    alpha: boolean;
    powerPreference: "default" | "high-performance" | "low-power";
    stencil: boolean;
    depth: boolean;
    logarithmicDepthBuffer: boolean;
    precision: "highp" | "mediump" | "lowp";
    premultipliedAlpha: boolean;
    preserveDrawingBuffer: boolean;
    failIfMajorPerformanceCaveat: boolean;
  };
  cameraSettings: {
    position: [number, number, number];
    fov: number;
    near: number;
    far: number;
  };
  performanceSettings: {
    pixelRatio: number;
    shadowMapSize: number;
    particleCount: number;
    lightDistance: number;
  };
}

export const useWebGLOptimizations = () => {
  const isMobile = useMobile();
  const [performanceLevel, setPerformanceLevel] = useState<"high" | "medium" | "low">("high");

  // Detect WebGL capabilities
  const webglCapabilities = useMemo(() => {
    if (typeof window === "undefined") return { webgl2: false, maxTextures: 8, maxAnisotropy: 1 };
    
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    
    if (!gl) return { webgl2: false, maxTextures: 8, maxAnisotropy: 1 };

    const isWebGL2 = gl instanceof WebGL2RenderingContext;
    const maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
    
    // Check for anisotropic filtering
    const ext = gl.getExtension('EXT_texture_filter_anisotropic');
    const maxAnisotropy = ext ? gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 1;

    return { webgl2: isWebGL2, maxTextures, maxAnisotropy };
  }, []);

  // Adaptive performance settings based on device and performance level
  const webglSettings = useMemo((): WebGLSettings => {
    const baseSettings = {
      high: {
        antialias: true,
        powerPreference: "high-performance" as const,
        precision: "highp" as const,
        pixelRatio: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2),
        shadowMapSize: 2048,
        particleCount: 3000,
        lightDistance: 50,
      },
      medium: {
        antialias: !isMobile,
        powerPreference: "default" as const,
        precision: "mediump" as const,
        pixelRatio: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5),
        shadowMapSize: 1024,
        particleCount: 1500,
        lightDistance: 30,
      },
      low: {
        antialias: false,
        powerPreference: "low-power" as const,
        precision: "lowp" as const,
        pixelRatio: 1,
        shadowMapSize: 512,
        particleCount: 500,
        lightDistance: 20,
      },
    };

    const currentSettings = baseSettings[performanceLevel];

    return {
      rendererSettings: {
        antialias: currentSettings.antialias,
        alpha: true,
        powerPreference: currentSettings.powerPreference,
        stencil: false,
        depth: true,
        logarithmicDepthBuffer: false,
        precision: currentSettings.precision,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false,
      },
      cameraSettings: {
        position: [0, 0, 5] as [number, number, number],
        fov: isMobile ? 70 : 75,
        near: 0.1,
        far: 1000,
      },
      performanceSettings: {
        pixelRatio: currentSettings.pixelRatio,
        shadowMapSize: currentSettings.shadowMapSize,
        particleCount: currentSettings.particleCount,
        lightDistance: currentSettings.lightDistance,
      },
    };
  }, [isMobile, performanceLevel, webglCapabilities]);

  // WebGL renderer initialization callback
  const onWebGLCreated = useCallback(({ gl, scene, camera }: any) => {
    // Set pixel ratio for optimal performance
    gl.setPixelRatio(webglSettings.performanceSettings.pixelRatio);
    
    // Enable shadows with optimized settings
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = 2; // THREE.PCFSoftShadowMap
    
    // Set encoding and tone mapping for better visuals
    gl.outputEncoding = 3001; // THREE.sRGBEncoding
    gl.toneMapping = 4; // THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = 1.2;
    
    // Enable frustum culling for performance
    camera.matrixAutoUpdate = true;
    scene.matrixAutoUpdate = true;
    
    // Optimize rendering
    gl.info.autoReset = false;
    
    // Pre-compile shaders
    gl.compile(scene, camera);
    
    console.log("WebGL initialized with performance level:", performanceLevel);
    console.log("WebGL capabilities:", webglCapabilities);
  }, [webglSettings, performanceLevel, webglCapabilities]);

  // Performance monitoring callbacks
  const onPerformanceIncline = useCallback(() => {
    if (performanceLevel === "low") {
      setPerformanceLevel("medium");
    } else if (performanceLevel === "medium") {
      setPerformanceLevel("high");
    }
    console.log("Performance improved - upgraded to:", performanceLevel);
  }, [performanceLevel]);

  const onPerformanceDecline = useCallback(() => {
    if (performanceLevel === "high") {
      setPerformanceLevel("medium");
    } else if (performanceLevel === "medium") {
      setPerformanceLevel("low");
    }
    console.log("Performance declined - downgraded to:", performanceLevel);
  }, [performanceLevel]);

  // Canvas style optimizations
  const canvasStyle = useMemo(() => ({
    background: "transparent",
    willChange: "transform",
    transform: "translateZ(0)",
    backfaceVisibility: "hidden" as const,
  }), []);

  // Initialize performance level based on device
  useEffect(() => {
    if (isMobile) {
      setPerformanceLevel("medium");
    } else {
      setPerformanceLevel("high");
    }
  }, [isMobile]);

  return {
    webglSettings,
    webglCapabilities,
    performanceLevel,
    onWebGLCreated,
    onPerformanceIncline,
    onPerformanceDecline,
    canvasStyle,
    isMobile,
  };
}; 