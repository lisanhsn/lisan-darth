"use client";

import React, { useState, useEffect } from 'react';
import { useMobilePerformance } from '../hooks/useMobilePerformance';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage: number;
  isLagging: boolean;
  deviceInfo: {
    userAgent: string;
    screenSize: string;
    devicePixelRatio: number;
    connectionType?: string;
    effectiveType?: string;
  };
}

export default function MobilePerformanceMonitor() {
  const { settings, performanceMetrics, isMobile, isLowPerformance } = useMobilePerformance();
  const [showMonitor, setShowMonitor] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    memoryUsage: 0,
    isLagging: false,
    deviceInfo: {
      userAgent: '',
      screenSize: '',
      devicePixelRatio: 1,
    },
  });

  useEffect(() => {
    // Only show monitor in development or when explicitly enabled
    if (process.env.NODE_ENV === 'development' || showMonitor) {
      setShowMonitor(true);
    }
  }, []);

  useEffect(() => {
    if (!showMonitor) return;

    const updateMetrics = () => {
      // @ts-ignore - navigator.memory is not in TypeScript yet
      const memoryUsage = navigator.memory ? navigator.memory.usedJSHeapSize / 1024 / 1024 : 0;
      
      // @ts-ignore - navigator.connection is not in TypeScript yet
      const connection = navigator.connection;
      
      setMetrics({
        fps: performanceMetrics.fps,
        frameTime: performanceMetrics.frameTime,
        memoryUsage: Math.round(memoryUsage * 100) / 100,
        isLagging: performanceMetrics.isLagging,
        deviceInfo: {
          userAgent: navigator.userAgent.substring(0, 50) + '...',
          screenSize: `${window.innerWidth}x${window.innerHeight}`,
          devicePixelRatio: window.devicePixelRatio,
          connectionType: connection?.type,
          effectiveType: connection?.effectiveType,
        },
      });
    };

    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, [showMonitor, performanceMetrics]);

  if (!showMonitor) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/80 backdrop-blur-sm border border-imperial-red/30 rounded-lg p-3 text-xs font-mono text-white max-w-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-imperial-gold font-bold">Mobile Performance</span>
          <button
            onClick={() => setShowMonitor(false)}
            className="text-imperial-red hover:text-imperial-gold"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>FPS:</span>
            <span className={metrics.isLagging ? 'text-imperial-red' : 'text-energy-blue'}>
              {metrics.fps}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Frame Time:</span>
            <span className={metrics.frameTime > 33 ? 'text-imperial-red' : 'text-energy-blue'}>
              {metrics.frameTime}ms
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Memory:</span>
            <span className={metrics.memoryUsage > 100 ? 'text-imperial-red' : 'text-energy-blue'}>
              {metrics.memoryUsage}MB
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Device:</span>
            <span className="text-imperial-gold">
              {isLowPerformance ? 'Low' : isMobile ? 'Mobile' : 'Desktop'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>3D:</span>
            <span className={settings.disable3D ? 'text-imperial-red' : 'text-energy-blue'}>
              {settings.disable3D ? 'Disabled' : 'Enabled'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Animations:</span>
            <span className={settings.disableComplexAnimations ? 'text-imperial-red' : 'text-energy-blue'}>
              {settings.disableComplexAnimations ? 'Simple' : 'Complex'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>Screen:</span>
            <span className="text-imperial-gold">
              {metrics.deviceInfo.screenSize}
            </span>
          </div>
          
          {metrics.deviceInfo.connectionType && (
            <div className="flex justify-between">
              <span>Connection:</span>
              <span className="text-imperial-gold">
                {metrics.deviceInfo.connectionType}
                {metrics.deviceInfo.effectiveType && ` (${metrics.deviceInfo.effectiveType})`}
              </span>
            </div>
          )}
        </div>
        
        {metrics.isLagging && (
          <div className="mt-2 p-2 bg-imperial-red/20 border border-imperial-red/30 rounded text-center">
            <span className="text-imperial-red font-bold">⚠️ Performance Issues Detected</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Performance warning component
export function PerformanceWarning() {
  const { performanceMetrics, isMobile } = useMobilePerformance();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (isMobile && performanceMetrics.isLagging) {
      setShowWarning(true);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => setShowWarning(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [performanceMetrics.isLagging, isMobile]);

  if (!showWarning) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50">
      <div className="bg-imperial-red/90 backdrop-blur-sm border border-imperial-red rounded-lg p-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="text-2xl">⚠️</span>
          <span className="text-imperial-white font-bold">Performance Warning</span>
        </div>
        <p className="text-imperial-white text-sm">
          Your device is experiencing performance issues. Some features have been automatically optimized.
        </p>
        <button
          onClick={() => setShowWarning(false)}
          className="mt-2 px-4 py-2 bg-imperial-white text-imperial-red rounded font-bold text-sm"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}