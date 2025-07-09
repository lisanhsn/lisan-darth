"use client";

import React, { useState, useEffect } from 'react';
import { useMobile } from '../hooks/useMobile';
import { useMobilePerformance } from '../hooks/useMobilePerformance';

interface MobileLoadingOptimizerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingTime?: number;
}

export default function MobileLoadingOptimizer({
  children,
  fallback,
  loadingTime = 1000
}: MobileLoadingOptimizerProps) {
  const { isMobile, isLowPerformance } = useMobile();
  const { settings: mobileSettings } = useMobilePerformance();
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Reduce loading time for mobile devices
    const actualLoadingTime = isLowPerformance ? loadingTime * 0.5 : isMobile ? loadingTime * 0.7 : loadingTime;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Small delay to ensure smooth transition
      setTimeout(() => setShowContent(true), 100);
    }, actualLoadingTime);

    return () => clearTimeout(timer);
  }, [loadingTime, isMobile, isLowPerformance]);

  if (isLoading) {
    return (
      <div className="mobile-loading-screen">
        {fallback || (
          <div className="w-full h-full bg-gradient-to-br from-space-dark via-black to-space-dark flex items-center justify-center">
            <div className="text-center">
              {/* Simplified loading animation for mobile */}
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-imperial-red/30 rounded-full"></div>
                <div 
                  className="absolute inset-0 border-4 border-imperial-red border-t-transparent rounded-full animate-spin"
                  style={{
                    animationDuration: isLowPerformance ? '1s' : '1.5s'
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-imperial-red rounded-full opacity-80"></div>
                </div>
              </div>
              
              <h2 className="text-imperial-gold font-orbitron font-bold text-lg mb-2">
                Imperial Interface
              </h2>
              <p className="text-imperial-red text-sm font-orbitron">
                {isLowPerformance ? 'Optimizing for your device...' : 'Initializing Dark Side...'}
              </p>
              
              {/* Performance indicator */}
              {isLowPerformance && (
                <div className="mt-4 p-2 bg-imperial-red/20 border border-imperial-red/30 rounded">
                  <p className="text-imperial-red text-xs">
                    Performance mode enabled
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!showContent) {
    return null;
  }

  return (
    <div 
      className="mobile-content-container"
      style={{
        opacity: showContent ? 1 : 0,
        transition: `opacity ${mobileSettings.reduceAnimationDuration ? '0.2s' : '0.3s'} ease-out`
      }}
    >
      {children}
    </div>
  );
}

// Mobile-optimized lazy loading component
export function MobileLazyLoad({
  children,
  threshold = 0.1,
  fallback
}: {
  children: React.ReactNode;
  threshold?: number;
  fallback?: React.ReactNode;
}) {
  const { isMobile, isLowPerformance } = useMobile();
  const { settings: mobileSettings } = useMobilePerformance();
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    // Delay loading for mobile to improve performance
    const delay = isLowPerformance ? 200 : isMobile ? 100 : 0;
    
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, isMobile, isLowPerformance]);

  // Use Intersection Observer for better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: isLowPerformance ? 0.05 : threshold,
        rootMargin: isMobile ? '50px' : '100px'
      }
    );

    const element = document.querySelector('.mobile-lazy-load-trigger');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [threshold, isMobile, isLowPerformance]);

  if (!hasLoaded) {
    return (
      <div className="mobile-lazy-load-trigger">
        {fallback || (
          <div className="w-full h-32 bg-gradient-to-br from-space-dark to-black rounded-lg flex items-center justify-center">
            <div className="text-imperial-gold text-sm font-orbitron">
              Loading...
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className="mobile-lazy-content"
      style={{
        opacity: hasLoaded ? 1 : 0,
        transition: `opacity ${mobileSettings.reduceAnimationDuration ? '0.2s' : '0.3s'} ease-out`
      }}
    >
      {children}
    </div>
  );
}

// Mobile-optimized image component
export function MobileOptimizedImage({
  src,
  alt,
  className = "",
  priority = false
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const { isMobile, isLowPerformance } = useMobile();
  const { settings: mobileSettings } = useMobilePerformance();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Use lower quality images for low-performance devices
  const optimizedSrc = isLowPerformance && src.includes('high-res') 
    ? src.replace('high-res', 'low-res') 
    : src;

  if (hasError) {
    return (
      <div className={`bg-gradient-to-br from-space-dark to-black rounded-lg flex items-center justify-center ${className}`}>
        <span className="text-imperial-red text-sm">Image failed to load</span>
      </div>
    );
  }

  return (
    <div className={`mobile-image-container ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-space-dark to-black rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-imperial-red border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <img
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{
          willChange: 'opacity',
          transform: 'translateZ(0)'
        }}
      />
    </div>
  );
}