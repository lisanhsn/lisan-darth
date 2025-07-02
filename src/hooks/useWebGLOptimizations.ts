"use client";

import { useEffect, useState, useCallback } from "react";

interface PerformanceSettings {
  isHighPerformanceDevice: boolean;
  shouldReduceMotion: boolean;
  targetFPS: number;
  gpuTier: 'low' | 'medium' | 'high';
  isMobile: boolean;
  supportsHighRefreshRate: boolean;
  shouldUseGPUAcceleration: boolean;
  qualityLevel: 'low' | 'medium' | 'high';
}

export function useWebGLOptimizations(): PerformanceSettings {
  const [settings, setSettings] = useState<PerformanceSettings>({
    isHighPerformanceDevice: true,
    shouldReduceMotion: false,
    targetFPS: 60,
    gpuTier: 'medium',
    isMobile: false,
    supportsHighRefreshRate: false,
    shouldUseGPUAcceleration: true,
    qualityLevel: 'medium'
  });

  const detectDeviceCapabilities = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Detect mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;

    // Detect high refresh rate support
    const supportsHighRefreshRate = window.screen && 
      ('mozOrientation' in window.screen || 'msOrientation' in window.screen) ||
      window.devicePixelRatio >= 2;

    // Detect reduced motion preference
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // GPU Performance Detection
    let gpuTier: 'low' | 'medium' | 'high' = 'medium';
    let shouldUseGPUAcceleration = true;
    
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
        
        // Basic GPU tier detection
        if (renderer.toLowerCase().includes('intel') || 
            renderer.toLowerCase().includes('qualcomm') ||
            renderer.toLowerCase().includes('mali')) {
          gpuTier = isMobile ? 'low' : 'medium';
        } else if (renderer.toLowerCase().includes('nvidia') || 
                   renderer.toLowerCase().includes('amd') ||
                   renderer.toLowerCase().includes('apple')) {
          gpuTier = isMobile ? 'medium' : 'high';
        }
      } else {
        shouldUseGPUAcceleration = false;
        gpuTier = 'low';
      }
    } catch (error) {
      console.warn('GPU detection failed:', error);
      gpuTier = 'low';
    }

    // Memory and performance heuristics
    const memory = (navigator as any).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    
    const isHighPerformanceDevice = 
      memory >= 4 && 
      cores >= 4 && 
      !isMobile && 
      gpuTier !== 'low';

    // Target FPS based on device capabilities
    let targetFPS = 60;
    if (supportsHighRefreshRate && isHighPerformanceDevice) {
      targetFPS = 120;
    } else if (supportsHighRefreshRate && !isMobile) {
      targetFPS = 90;
    } else if (isMobile && gpuTier === 'low') {
      targetFPS = 30;
    }

    // Quality level determination
    let qualityLevel: 'low' | 'medium' | 'high' = 'medium';
    if (isMobile && gpuTier === 'low') {
      qualityLevel = 'low';
    } else if (isHighPerformanceDevice && gpuTier === 'high') {
      qualityLevel = 'high';
    }

    setSettings({
      isHighPerformanceDevice,
      shouldReduceMotion,
      targetFPS,
      gpuTier,
      isMobile,
      supportsHighRefreshRate,
      shouldUseGPUAcceleration,
      qualityLevel
    });

    // Apply performance optimizations to document
    applyPerformanceOptimizations({
      isHighPerformanceDevice,
      shouldReduceMotion,
      targetFPS,
      gpuTier,
      isMobile,
      supportsHighRefreshRate,
      shouldUseGPUAcceleration,
      qualityLevel
    });
  }, []);

  const applyPerformanceOptimizations = useCallback((settings: PerformanceSettings) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    // Set CSS custom properties for performance optimizations
    root.style.setProperty('--target-fps', settings.targetFPS.toString());
    root.style.setProperty('--gpu-tier', settings.gpuTier);
    root.style.setProperty('--quality-level', settings.qualityLevel);

    // Apply GPU acceleration classes
    if (settings.shouldUseGPUAcceleration) {
      document.body.classList.add('gpu-accelerated');
    }

    // Apply mobile optimizations
    if (settings.isMobile) {
      document.body.classList.add('mobile-optimized');
      
      // Reduce animation durations for mobile
      root.style.setProperty('--animation-speed', settings.shouldReduceMotion ? '0s' : '0.15s');
      
      // Apply touch optimizations
      document.body.style.touchAction = 'pan-y';
      document.body.style.overscrollBehavior = 'none';
    } else {
      root.style.setProperty('--animation-speed', settings.shouldReduceMotion ? '0s' : '0.3s');
    }

    // High refresh rate optimizations
    if (settings.supportsHighRefreshRate) {
      document.body.classList.add('high-refresh');
      
      // Force 120fps rendering
      if (settings.targetFPS >= 120) {
        const style = document.createElement('style');
        style.textContent = `
          * {
            will-change: transform, opacity !important;
            transform: translateZ(0) !important;
          }
          
          @media (min-refresh-rate: 120hz) {
            * {
              animation-timing-function: linear !important;
              transition-timing-function: linear !important;
            }
          }
        `;
        document.head.appendChild(style);
      }
    }

    // Quality-based optimizations
    switch (settings.qualityLevel) {
      case 'low':
        root.style.setProperty('--blur-amount', '4px');
        root.style.setProperty('--shadow-quality', 'none');
        document.body.classList.add('quality-low');
        break;
      case 'medium':
        root.style.setProperty('--blur-amount', '12px');
        root.style.setProperty('--shadow-quality', 'medium');
        document.body.classList.add('quality-medium');
        break;
      case 'high':
        root.style.setProperty('--blur-amount', '20px');
        root.style.setProperty('--shadow-quality', 'high');
        document.body.classList.add('quality-high');
        break;
    }

    // Performance monitoring
    if (window.performance && window.performance.mark) {
      window.performance.mark('performance-optimization-applied');
    }
  }, []);

  // Frame rate monitoring
  const monitorFrameRate = useCallback(() => {
    if (typeof window === 'undefined') return;

    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFrameRate = () => {
      const currentTime = performance.now();
      frameCount++;
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Adjust quality if FPS is too low
        if (fps < settings.targetFPS * 0.8) {
          setSettings(prev => ({
            ...prev,
            qualityLevel: prev.qualityLevel === 'high' ? 'medium' : 'low'
          }));
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFrameRate);
    };
    
    requestAnimationFrame(measureFrameRate);
  }, [settings.targetFPS]);

  useEffect(() => {
    detectDeviceCapabilities();
    
    // Monitor performance in development
    if (process.env.NODE_ENV === 'development') {
      monitorFrameRate();
    }

    // Re-detect on orientation change (mobile)
    const handleOrientationChange = () => {
      setTimeout(detectDeviceCapabilities, 100);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [detectDeviceCapabilities, monitorFrameRate]);

  return settings;
}

// Utility function to get optimal animation duration based on device
export function getOptimalAnimationDuration(
  baseMs: number,
  settings: PerformanceSettings
): number {
  if (settings.shouldReduceMotion) return 0;
  
  if (settings.isMobile) {
    return Math.max(baseMs * 0.5, 100); // Faster on mobile
  }
  
  if (settings.supportsHighRefreshRate) {
    return Math.max(baseMs * 0.75, 150); // Slightly faster for high refresh
  }
  
  return baseMs;
}

// Utility function to check if expensive effects should be enabled
export function shouldEnableExpensiveEffects(settings: PerformanceSettings): boolean {
  return settings.qualityLevel !== 'low' && settings.shouldUseGPUAcceleration;
} 