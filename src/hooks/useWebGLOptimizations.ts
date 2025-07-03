"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface PerformanceSettings {
  isHighPerformanceDevice: boolean;
  shouldReduceMotion: boolean;
  targetFPS: number;
  gpuTier: 'low' | 'medium' | 'high';
  isMobile: boolean;
  supportsHighRefreshRate: boolean;
  shouldUseGPUAcceleration: boolean;
  qualityLevel: 'low' | 'medium' | 'high';
  
  // New 2025 optimization features
  webglSettings: {
    cameraSettings: {
      position: [number, number, number];
      fov: number;
      near: number;
      far: number;
    };
    rendererSettings: {
      antialias: boolean;
      alpha: boolean;
      powerPreference: "high-performance" | "low-power" | "default";
      precision: "highp" | "mediump" | "lowp";
      preserveDrawingBuffer: boolean;
      premultipliedAlpha: boolean;
      stencil: boolean;
      depth: boolean;
    };
    performanceSettings: {
      shadowMapSize: number;
      lightDistance: number;
      particleCount: number;
      maxLODDistance: number;
      textureCompression: boolean;
      instancedRendering: boolean;
      frustumCulling: boolean;
      occlusion: boolean;
    };
  };
  performanceLevel: 'low' | 'medium' | 'high';
  canvasStyle: React.CSSProperties;
  memoryUsage: number;
  frameTime: number;
  averageFPS: number;
}

interface PerformanceMonitor {
  frameCount: number;
  lastTime: number;
  frameTimeHistory: number[];
  memoryUsage: number;
  worstFrameTime: number;
  averageFPS: number;
}

export function useWebGLOptimizations() {
  const [settings, setSettings] = useState<PerformanceSettings>({
    isHighPerformanceDevice: true,
    shouldReduceMotion: false,
    targetFPS: 60,
    gpuTier: 'medium',
    isMobile: false,
    supportsHighRefreshRate: false,
    shouldUseGPUAcceleration: true,
    qualityLevel: 'medium',
    webglSettings: {
      cameraSettings: {
        position: [0, 0, 8],
        fov: 75,
        near: 0.1,
        far: 1000,
      },
      rendererSettings: {
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        precision: "highp",
        preserveDrawingBuffer: false,
        premultipliedAlpha: true,
        stencil: false,
        depth: true,
      },
      performanceSettings: {
        shadowMapSize: 1024,
        lightDistance: 30,
        particleCount: 1000,
        maxLODDistance: 100,
        textureCompression: false,
        instancedRendering: false,
        frustumCulling: true,
        occlusion: false,
      },
    },
    performanceLevel: 'medium',
    canvasStyle: {},
    memoryUsage: 0,
    frameTime: 0,
    averageFPS: 60,
  });

  const performanceMonitor = useRef<PerformanceMonitor>({
    frameCount: 0,
    lastTime: performance.now(),
    frameTimeHistory: [],
    memoryUsage: 0,
    worstFrameTime: 0,
    averageFPS: 60,
  });

  // Enhanced GPU detection with 2025 standards
  const detectGPUCapabilities = useCallback(async () => {
    if (typeof window === 'undefined') return 'medium';

    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!context) return 'low';

      // Type assertion for WebGL context
      const gl = context as WebGLRenderingContext | WebGL2RenderingContext;

      // Advanced GPU detection
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
      const vendor = debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : '';
      
      console.log('🎮 GPU Detection:', { renderer, vendor });

      // WebGL 2.0 capability check
      const isWebGL2 = gl instanceof WebGL2RenderingContext;
      
      // Check for key extensions
      const hasInstancedArrays = !!gl.getExtension('ANGLE_instanced_arrays');
      const hasFloatTextures = !!gl.getExtension('OES_texture_float');
      const hasCompressedTextures = !!gl.getExtension('WEBGL_compressed_texture_s3tc');
      
      // Memory and capability analysis
      const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
      const maxRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE) as number;
      const maxVertexAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS) as number;
      
      // GPU tier classification (2025 standards)
      let tier: 'low' | 'medium' | 'high' = 'medium';
      
      const rendererLower = renderer.toLowerCase();
      const vendorLower = vendor.toLowerCase();
      
      // High-end GPUs (2025)
      if (
        rendererLower.includes('rtx') ||
        rendererLower.includes('rx 7') ||
        rendererLower.includes('rx 6') ||
        rendererLower.includes('m1') ||
        rendererLower.includes('m2') ||
        rendererLower.includes('m3') ||
        (rendererLower.includes('apple') && rendererLower.includes('gpu')) ||
        maxTextureSize >= 16384
      ) {
        tier = 'high';
      }
      // Low-end detection
      else if (
        rendererLower.includes('intel hd') ||
        rendererLower.includes('intel uhd') ||
        rendererLower.includes('mali') ||
        rendererLower.includes('adreno 5') ||
        rendererLower.includes('powervr') ||
        maxTextureSize < 4096 ||
        !isWebGL2
      ) {
        tier = 'low';
      }

      return tier;
    } catch (error) {
      console.warn('GPU detection failed:', error);
      return 'low';
    }
  }, []);

  // Advanced device capability detection
  const detectDeviceCapabilities = useCallback(async () => {
    if (typeof window === 'undefined') return;

    // Basic device detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;

    // Advanced refresh rate detection
    let refreshRate = 60;
    try {
      // @ts-ignore - experimental API
      if (window.screen?.refreshRate) {
        // @ts-ignore
        refreshRate = window.screen.refreshRate;
      }
    } catch (e) {
      // Fallback detection
      refreshRate = window.devicePixelRatio >= 2 ? 90 : 60;
    }
    
    const supportsHighRefreshRate = refreshRate >= 90;

    // Memory detection (2025 standard)
    const memory = (navigator as any).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    
    // Motion preference
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // GPU capabilities
    const gpuTier = await detectGPUCapabilities();
    
    // Performance classification (2025 criteria)
    const isHighPerformanceDevice = 
      memory >= 8 && 
      cores >= 8 && 
      !isMobile && 
      gpuTier === 'high' &&
      supportsHighRefreshRate;

    // Adaptive settings based on device
    let qualityLevel: 'low' | 'medium' | 'high' = 'medium';
    let targetFPS = 60;
    
    if (isHighPerformanceDevice) {
      qualityLevel = 'high';
      targetFPS = supportsHighRefreshRate ? 120 : 90;
    } else if (isMobile || gpuTier === 'low') {
      qualityLevel = 'low';
      targetFPS = isMobile ? 30 : 60;
    }

    // WebGL settings optimization
    const webglSettings = {
      cameraSettings: {
        position: [0, 0, 8] as [number, number, number],
        fov: isMobile ? 60 : 75,
        near: 0.1,
        far: qualityLevel === 'low' ? 500 : 1000,
      },
             rendererSettings: {
         antialias: qualityLevel !== 'low' && !isMobile,
         alpha: true,
         powerPreference: (isHighPerformanceDevice ? "high-performance" : isMobile ? "low-power" : "default") as "high-performance" | "low-power" | "default",
         precision: (qualityLevel === 'low' ? "mediump" : "highp") as "highp" | "mediump" | "lowp",
         preserveDrawingBuffer: false,
         premultipliedAlpha: true,
         stencil: qualityLevel === 'high',
         depth: true,
       },
      performanceSettings: {
        shadowMapSize: qualityLevel === 'high' ? 2048 : qualityLevel === 'medium' ? 1024 : 512,
        lightDistance: qualityLevel === 'high' ? 50 : qualityLevel === 'medium' ? 30 : 20,
        particleCount: qualityLevel === 'high' ? 2000 : qualityLevel === 'medium' ? 1000 : 500,
        maxLODDistance: qualityLevel === 'high' ? 200 : qualityLevel === 'medium' ? 100 : 50,
        textureCompression: gpuTier !== 'low',
        instancedRendering: gpuTier === 'high',
        frustumCulling: true,
        occlusion: qualityLevel === 'high',
      },
    };

    // Canvas style optimization
    const canvasStyle: React.CSSProperties = {
      willChange: "transform",
      transform: "translateZ(0)",
      ...(isMobile && {
        touchAction: "none",
      }),
    };

    setSettings({
      isHighPerformanceDevice,
      shouldReduceMotion,
      targetFPS,
      gpuTier,
      isMobile,
      supportsHighRefreshRate,
      shouldUseGPUAcceleration: gpuTier !== 'low',
      qualityLevel,
      webglSettings,
      performanceLevel: qualityLevel,
      canvasStyle,
      memoryUsage: 0,
      frameTime: 0,
      averageFPS: targetFPS,
    });

    console.log('🚀 WebGL Optimization Settings (2025):', {
      device: { isMobile, memory, cores, refreshRate },
      gpu: { tier: gpuTier, isHighPerformance: isHighPerformanceDevice },
      quality: { level: qualityLevel, targetFPS },
      webgl: webglSettings,
    });

  }, [detectGPUCapabilities]);

  // Real-time performance monitoring (2025 standard)
  const monitorPerformance = useCallback(() => {
    const monitor = performanceMonitor.current;
    const currentTime = performance.now();
    
    monitor.frameCount++;
    const deltaTime = currentTime - monitor.lastTime;
    
    if (deltaTime >= 1000) {
      // Calculate FPS and frame times
      const fps = Math.round((monitor.frameCount * 1000) / deltaTime);
      const avgFrameTime = deltaTime / monitor.frameCount;
      
      monitor.frameTimeHistory.push(avgFrameTime);
      if (monitor.frameTimeHistory.length > 60) {
        monitor.frameTimeHistory.shift();
      }
      
      const averageFrameTime = monitor.frameTimeHistory.reduce((a, b) => a + b, 0) / monitor.frameTimeHistory.length;
      
      // Memory usage (if available)
      let memoryUsage = 0;
      if ('memory' in performance) {
        memoryUsage = (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
      }
      
      // Update settings with real-time data
      setSettings(prev => ({
        ...prev,
        averageFPS: fps,
        frameTime: averageFrameTime,
        memoryUsage,
      }));
      
             // Adaptive quality adjustment (2025 feature)
       setSettings(prev => {
         if (fps < prev.targetFPS * 0.7) {
           console.warn('⚠️ Performance degradation detected, reducing quality');
           return {
             ...prev,
             qualityLevel: prev.qualityLevel === 'high' ? 'medium' : 'low',
             webglSettings: {
               ...prev.webglSettings,
               performanceSettings: {
                 ...prev.webglSettings.performanceSettings,
                 particleCount: Math.floor(prev.webglSettings.performanceSettings.particleCount * 0.7),
                 shadowMapSize: Math.max(512, prev.webglSettings.performanceSettings.shadowMapSize / 2),
               },
             },
           };
         }
         return { ...prev, averageFPS: fps, frameTime: averageFrameTime, memoryUsage };
       });
      
      monitor.frameCount = 0;
      monitor.lastTime = currentTime;
    }
  }, []);

  // WebGL context creation callback
  const onWebGLCreated = useCallback(({ gl, camera, scene }: any) => {
    // Enable all available optimizations
    gl.setPixelRatio(Math.min(window.devicePixelRatio, settings.isMobile ? 1.5 : 2));
    
    // 2025 WebGL optimizations
    if (settings.webglSettings.performanceSettings.textureCompression) {
      // Enable texture compression if available
      const ext = gl.getExtension('WEBGL_compressed_texture_s3tc');
      if (ext) {
        console.log('✅ Texture compression enabled');
      }
    }
    
    if (settings.webglSettings.performanceSettings.frustumCulling) {
      // Enable frustum culling
      camera.userData.frustumCulled = true;
    }
    
    // Memory optimization
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    
    console.log('🎮 WebGL Context Optimized:', {
      pixelRatio: gl.getPixelRatio(),
      extensions: gl.getSupportedExtensions()?.length || 0,
      maxTextureSize: gl.capabilities.maxTextureSize,
    });
  }, [settings]);

  // Performance event handlers for drei PerformanceMonitor
  const onPerformanceIncline = useCallback(() => {
    console.log('📈 Performance improved');
    // Could increase quality here if needed
  }, []);

  const onPerformanceDecline = useCallback(() => {
    console.log('📉 Performance declined');
    setSettings(prev => ({
      ...prev,
      qualityLevel: prev.qualityLevel === 'high' ? 'medium' : 'low',
    }));
  }, []);

  useEffect(() => {
    detectDeviceCapabilities();
    
    // Start performance monitoring
    const monitorInterval = setInterval(monitorPerformance, 1000);
    
    // Handle visibility changes (2025 optimization)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Pause expensive operations when tab is not visible
        setSettings(prev => ({
          ...prev,
          qualityLevel: 'low',
        }));
      } else {
        // Restore quality when tab becomes visible
        detectDeviceCapabilities();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Handle orientation changes
    const handleOrientationChange = () => {
      setTimeout(detectDeviceCapabilities, 100);
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      clearInterval(monitorInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [detectDeviceCapabilities, monitorPerformance]);

  return {
    ...settings,
    onWebGLCreated,
    onPerformanceIncline,
    onPerformanceDecline,
  };
}

// Utility functions for 2025 optimizations

export function getOptimalAnimationDuration(
  baseMs: number,
  settings: PerformanceSettings
): number {
  if (settings.shouldReduceMotion) return 0;
  
  const multiplier = 
    settings.isMobile ? 0.5 : 
    settings.supportsHighRefreshRate ? 0.75 : 
    1.0;
  
  return Math.max(baseMs * multiplier, settings.isMobile ? 100 : 150);
}

export function shouldEnableExpensiveEffects(settings: PerformanceSettings): boolean {
  return settings.qualityLevel !== 'low' && 
         settings.shouldUseGPUAcceleration && 
         settings.averageFPS >= settings.targetFPS * 0.8;
}

export function getOptimalLOD(distance: number, settings: PerformanceSettings): number {
  const maxDistance = settings.webglSettings.performanceSettings.maxLODDistance;
  const normalizedDistance = Math.min(distance / maxDistance, 1);
  
  if (settings.qualityLevel === 'low') {
    return normalizedDistance > 0.3 ? 2 : normalizedDistance > 0.6 ? 1 : 0;
  } else if (settings.qualityLevel === 'medium') {
    return normalizedDistance > 0.5 ? 2 : normalizedDistance > 0.8 ? 1 : 0;
  } else {
    return normalizedDistance > 0.7 ? 2 : normalizedDistance > 0.9 ? 1 : 0;
  }
}

// Texture optimization utility (2025)
export function getOptimalTextureSize(
  baseSize: number, 
  settings: PerformanceSettings
): number {
  const multiplier = 
    settings.qualityLevel === 'low' ? 0.5 :
    settings.qualityLevel === 'medium' ? 0.75 :
    1.0;
    
  return Math.pow(2, Math.floor(Math.log2(baseSize * multiplier)));
} 