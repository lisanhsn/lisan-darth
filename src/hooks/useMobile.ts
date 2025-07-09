import { useState, useEffect } from 'react';

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // Check screen width
      const isSmallScreen = window.innerWidth <= 768;
      
      // Check if it's a touch device
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Check user agent for mobile patterns
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileUA = mobileRegex.test(navigator.userAgent);
      
      // Check for low-end devices
      const isLowEndDevice = () => {
        // Check for older mobile devices
        const isOldMobile = /Android [1-6]|iPhone OS [1-9]|iPad OS [1-9]/i.test(navigator.userAgent);
        
        // Check for low memory devices
        // @ts-ignore - navigator.deviceMemory is not in TypeScript yet
        const deviceMemory = navigator.deviceMemory || 4;
        const isLowMemory = deviceMemory < 2;
        
        // Check for low-end GPUs
        const isLowEndGPU = () => {
          try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
            if (!gl) return true;
            
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
              const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
              const lowEndGPUs = [
                'mali-400', 'mali-450', 'mali-t720', 'mali-t760',
                'adreno 200', 'adreno 300', 'adreno 400',
                'powervr sgx', 'powervr rogue',
                'intel hd graphics 2000', 'intel hd graphics 3000',
                'intel hd graphics 4000'
              ];
              return lowEndGPUs.some(gpu => renderer.toLowerCase().includes(gpu));
            }
          } catch (e) {
            return true;
          }
          return false;
        };
        
        return isOldMobile || isLowMemory || isLowEndGPU();
      };
      
      // Consider it mobile if any condition is true
      const mobile = isSmallScreen || (isTouchDevice && isMobileUA);
      setIsMobile(mobile);
      setIsLowPerformance(mobile && isLowEndDevice());
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile, isLowPerformance };
} 