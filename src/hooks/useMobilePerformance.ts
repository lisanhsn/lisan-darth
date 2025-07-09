import { useState, useEffect, useCallback } from 'react';
import { useMobile } from './useMobile';

interface MobilePerformanceSettings {
  // Rendering optimizations
  disable3D: boolean;
  disableComplexAnimations: boolean;
  reduceParticleCount: boolean;
  useLowResolutionTextures: boolean;
  disableShadows: boolean;
  disablePostProcessing: boolean;
  
  // Animation optimizations
  reduceAnimationDuration: boolean;
  disableHoverEffects: boolean;
  useSimpleTransitions: boolean;
  
  // Layout optimizations
  useSimplifiedLayout: boolean;
  disableParallax: boolean;
  optimizeImages: boolean;
  
  // Performance monitoring
  targetFPS: number;
  enablePerformanceMonitoring: boolean;
}

export function useMobilePerformance() {
  const { isMobile, isLowPerformance } = useMobile();
  const [settings, setSettings] = useState<MobilePerformanceSettings>({
    disable3D: false,
    disableComplexAnimations: false,
    reduceParticleCount: false,
    useLowResolutionTextures: false,
    disableShadows: false,
    disablePostProcessing: false,
    reduceAnimationDuration: false,
    disableHoverEffects: false,
    useSimpleTransitions: false,
    useSimplifiedLayout: false,
    disableParallax: false,
    optimizeImages: false,
    targetFPS: 60,
    enablePerformanceMonitoring: false,
  });

  const [performanceMetrics, setPerformanceMetrics] = useState({
    fps: 60,
    frameTime: 16.67,
    memoryUsage: 0,
    isLagging: false,
  });

  // Performance monitoring
  const monitorPerformance = useCallback(() => {
    if (!settings.enablePerformanceMonitoring) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let frameTimeHistory: number[] = [];

    const measureFrame = () => {
      const currentTime = performance.now();
      const frameTime = currentTime - lastTime;
      
      frameTimeHistory.push(frameTime);
      if (frameTimeHistory.length > 60) {
        frameTimeHistory.shift();
      }
      
      frameCount++;
      lastTime = currentTime;
      
      const averageFrameTime = frameTimeHistory.reduce((a, b) => a + b, 0) / frameTimeHistory.length;
      const fps = 1000 / averageFrameTime;
      
      // @ts-ignore - navigator.memory is not in TypeScript yet
      const memoryUsage = navigator.memory ? navigator.memory.usedJSHeapSize / 1024 / 1024 : 0;
      
      setPerformanceMetrics({
        fps: Math.round(fps),
        frameTime: Math.round(averageFrameTime * 100) / 100,
        memoryUsage: Math.round(memoryUsage * 100) / 100,
        isLagging: fps < 30 || averageFrameTime > 33,
      });
      
      requestAnimationFrame(measureFrame);
    };
    
    requestAnimationFrame(measureFrame);
  }, [settings.enablePerformanceMonitoring]);

  // Auto-optimize based on device capabilities
  useEffect(() => {
    if (!isMobile) return;

    const newSettings: MobilePerformanceSettings = {
      ...settings,
      // Basic mobile optimizations
      disableHoverEffects: true,
      useSimpleTransitions: true,
      optimizeImages: true,
      enablePerformanceMonitoring: true,
    };

    // Aggressive optimizations for low-performance devices
    if (isLowPerformance) {
      newSettings.disable3D = true;
      newSettings.disableComplexAnimations = true;
      newSettings.reduceParticleCount = true;
      newSettings.useLowResolutionTextures = true;
      newSettings.disableShadows = true;
      newSettings.disablePostProcessing = true;
      newSettings.reduceAnimationDuration = true;
      newSettings.useSimplifiedLayout = true;
      newSettings.disableParallax = true;
      newSettings.targetFPS = 30;
    }

    // Check for battery saver mode
    // @ts-ignore - navigator.getBattery is not in TypeScript yet
    if (navigator.getBattery) {
      navigator.getBattery().then((battery: any) => {
        if (battery.level < 0.2 || battery.charging === false) {
          newSettings.disable3D = true;
          newSettings.disableComplexAnimations = true;
          newSettings.targetFPS = 30;
        }
      });
    }

    // Check for data saver mode
    // @ts-ignore - navigator.connection is not in TypeScript yet
    if (navigator.connection && navigator.connection.saveData) {
      newSettings.optimizeImages = true;
      newSettings.useLowResolutionTextures = true;
    }

    setSettings(newSettings);
  }, [isMobile, isLowPerformance]);

  // Start performance monitoring
  useEffect(() => {
    if (settings.enablePerformanceMonitoring) {
      monitorPerformance();
    }
  }, [settings.enablePerformanceMonitoring, monitorPerformance]);

      // Auto-adjust settings based on performance
  useEffect(() => {
    if (!settings.enablePerformanceMonitoring) return;

    if (performanceMetrics.isLagging) {
      setSettings((prev: MobilePerformanceSettings) => ({
        ...prev,
        disable3D: true,
        disableComplexAnimations: true,
        reduceAnimationDuration: true,
        targetFPS: 30,
      }));
    }
  }, [performanceMetrics.isLagging, settings.enablePerformanceMonitoring]);

  return {
    settings,
    performanceMetrics,
    isMobile,
    isLowPerformance,
  };
}

// Utility functions for mobile optimizations
export function getMobileOptimizedValue<T>(
  desktopValue: T,
  mobileValue: T,
  lowPerformanceValue: T,
  isMobile: boolean,
  isLowPerformance: boolean
): T {
  if (isLowPerformance) return lowPerformanceValue;
  if (isMobile) return mobileValue;
  return desktopValue;
}

export function shouldDisableFeature(
  feature: keyof MobilePerformanceSettings,
  settings: MobilePerformanceSettings
): boolean {
  return settings[feature] as boolean;
}