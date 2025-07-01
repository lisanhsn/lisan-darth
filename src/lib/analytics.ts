// Analytics and Performance Monitoring System
export class ImperialAnalytics {
  private static instance: ImperialAnalytics;
  private isInitialized = false;

  static getInstance(): ImperialAnalytics {
    if (!ImperialAnalytics.instance) {
      ImperialAnalytics.instance = new ImperialAnalytics();
    }
    return ImperialAnalytics.instance;
  }

  // Initialize all analytics providers
  async initialize() {
    if (this.isInitialized) return;
    
    // Google Analytics 4
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
      await this.initGoogleAnalytics();
    }
    
    // Microsoft Clarity (heatmaps)
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_CLARITY_ID) {
      await this.initMicrosoftClarity();
    }
    
    // Custom performance monitoring
    this.initPerformanceMonitoring();
    
    this.isInitialized = true;
  }

  // Google Analytics 4 setup
  private async initGoogleAnalytics() {
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID!;
    
    // Load gtag script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    
    gtag('js', new Date());
    gtag('config', GA_ID, {
      page_title: 'Imperial Portfolio',
      custom_map: { 'custom_parameter': 'dark_side_power' }
    });

    // @ts-ignore
    window.gtag = gtag;
  }

  // Microsoft Clarity for heatmaps and session recordings
  private async initMicrosoftClarity() {
    const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID!;
    
    (function(c: any, l: any, a: string, r: string, i: string, t?: any, y?: any) {
        c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments); };
        t = l.createElement(r); 
        t.async = 1; 
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; 
        if (y && y.parentNode) {
          y.parentNode.insertBefore(t, y);
        }
    })(window, document, "clarity", "script", CLARITY_ID);
  }

  // Custom performance monitoring
  private initPerformanceMonitoring() {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    this.trackWebVitals();
    
    // Track user interactions
    this.trackUserInteractions();
    
    // Track errors
    this.trackErrors();
  }

  // Track Core Web Vitals (LCP, FID, CLS)
  private trackWebVitals() {
    // First Contentful Paint
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.sendMetric('FCP', entry.startTime, { 
          section: 'performance',
          type: 'web_vital'
        });
      }
    }).observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.sendMetric('LCP', lastEntry.startTime, {
        section: 'performance',
        type: 'web_vital'
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // Cumulative Layout Shift
    let cumulativeLayoutShift = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          cumulativeLayoutShift += (entry as any).value;
        }
      }
      this.sendMetric('CLS', cumulativeLayoutShift, {
        section: 'performance',
        type: 'web_vital'
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Track user interactions with Imperial elements
  private trackUserInteractions() {
    // Track scroll depth
    let maxScroll = 0;
    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0) { // Track every 25%
          this.trackEvent('scroll_depth', {
            depth: maxScroll,
            section: 'engagement'
          });
        }
      }
    };
    
    window.addEventListener('scroll', trackScroll, { passive: true });

    // Track time on sections
    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
    const sectionTimes: Record<string, number> = {};
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        if (entry.isIntersecting) {
          sectionTimes[sectionId] = Date.now();
        } else if (sectionTimes[sectionId]) {
          const timeSpent = Date.now() - sectionTimes[sectionId];
          this.trackEvent('section_time', {
            section: sectionId,
            time_spent: timeSpent,
            category: 'engagement'
          });
          delete sectionTimes[sectionId];
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });
  }

  // Track JavaScript errors
  private trackErrors() {
    window.addEventListener('error', (event) => {
      this.trackEvent('javascript_error', {
        message: event.message,
        filename: event.filename,
        line: event.lineno,
        column: event.colno,
        category: 'error'
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.trackEvent('promise_rejection', {
        reason: event.reason,
        category: 'error'
      });
    });
  }

  // Send custom metrics
  sendMetric(name: string, value: number, parameters?: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, {
        custom_parameter: value,
        event_category: 'performance',
        event_label: 'imperial_portfolio',
        ...parameters
      });
    }
    
    // Also send to custom analytics endpoint
    this.sendToCustomAnalytics('metric', { name, value, ...parameters });
  }

  // Track custom events
  trackEvent(eventName: string, parameters?: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'imperial_interaction',
        event_label: 'dark_side_engagement',
        ...parameters
      });
    }
    
    // Also send to custom analytics endpoint
    this.sendToCustomAnalytics('event', { eventName, ...parameters });
  }

  // Track page views
  trackPageView(url: string, title?: string) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_location: url,
        page_title: title || 'Imperial Portfolio'
      });
    }
  }

  // Track conversion events (form submissions, downloads, etc.)
  trackConversion(conversionType: string, value?: number, currency?: string) {
    const eventData: any = {
      event_category: 'conversion',
      event_label: conversionType,
    };
    
    if (value !== undefined) {
      eventData.value = value;
    }
    
    if (currency) {
      eventData.currency = currency;
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', eventData);
    }
    
    this.sendToCustomAnalytics('conversion', eventData);
  }

  // Send data to custom analytics endpoint
  private async sendToCustomAnalytics(type: string, data: any) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          data,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      });
    } catch (error) {
      console.warn('Failed to send custom analytics:', error);
    }
  }

  // A/B Testing functionality
  getVariant(testName: string, variants: string[]): string {
    const userId = this.getUserId();
    const hash = this.simpleHash(userId + testName);
    const variantIndex = hash % variants.length;
    
    this.trackEvent('ab_test_variant', {
      test_name: testName,
      variant: variants[variantIndex],
      user_id: userId
    });
    
    return variants[variantIndex];
  }

  // Simple hash function for A/B testing
  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  // Get or create user ID
  private getUserId(): string {
    let userId = localStorage.getItem('imperial_user_id');
    if (!userId) {
      userId = 'imp_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('imperial_user_id', userId);
    }
    return userId;
  }
}

// Export singleton instance
export const analytics = ImperialAnalytics.getInstance();

// Declare global gtag function
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
} 