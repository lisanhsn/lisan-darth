import { NextRequest, NextResponse } from 'next/server';

// In a production environment, you'd want to use a proper database
// For now, we'll use a simple in-memory store (resets on server restart)
const analyticsData: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Add server-side enrichment
    const enrichedData = {
      ...data,
      serverTimestamp: new Date().toISOString(),
      ip: request.ip || 'unknown',
      country: request.geo?.country || 'unknown',
      city: request.geo?.city || 'unknown',
    };
    
    // Store the data (in production, save to database)
    analyticsData.push(enrichedData);
    
    // Log important events
    if (data.type === 'conversion' || data.type === 'error') {
      console.log(`Imperial Analytics - ${data.type.toUpperCase()}:`, enrichedData);
    }
    
    return NextResponse.json({ success: true, id: analyticsData.length });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process analytics data' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Basic analytics dashboard data
  const url = new URL(request.url);
  const days = parseInt(url.searchParams.get('days') || '7');
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  const recentData = analyticsData.filter(
    item => new Date(item.serverTimestamp) > cutoffDate
  );
  
  // Calculate metrics
  const metrics = {
    totalEvents: recentData.length,
    uniqueUsers: new Set(recentData.map(item => item.data?.user_id).filter(Boolean)).size,
    topEvents: getTopEvents(recentData),
    conversionRate: calculateConversionRate(recentData),
    averageSessionTime: calculateAverageSessionTime(recentData),
    topCountries: getTopCountries(recentData),
    errorRate: calculateErrorRate(recentData),
    performanceMetrics: getPerformanceMetrics(recentData),
  };
  
  return NextResponse.json(metrics);
}

function getTopEvents(data: any[]) {
  const eventCounts: Record<string, number> = {};
  data.forEach(item => {
    if (item.type === 'event') {
      const eventName = item.data?.eventName || 'unknown';
      eventCounts[eventName] = (eventCounts[eventName] || 0) + 1;
    }
  });
  
  return Object.entries(eventCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([event, count]) => ({ event, count }));
}

function calculateConversionRate(data: any[]) {
  const conversions = data.filter(item => item.type === 'conversion').length;
  const totalSessions = new Set(data.map(item => item.data?.user_id).filter(Boolean)).size;
  return totalSessions > 0 ? (conversions / totalSessions) * 100 : 0;
}

function calculateAverageSessionTime(data: any[]) {
  const sessionTimes = data
    .filter(item => item.type === 'event' && item.data?.eventName === 'section_time')
    .map(item => item.data?.time_spent || 0);
  
  if (sessionTimes.length === 0) return 0;
  return sessionTimes.reduce((sum, time) => sum + time, 0) / sessionTimes.length;
}

function getTopCountries(data: any[]) {
  const countryCounts: Record<string, number> = {};
  data.forEach(item => {
    const country = item.country || 'unknown';
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });
  
  return Object.entries(countryCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([country, count]) => ({ country, count }));
}

function calculateErrorRate(data: any[]) {
  const errors = data.filter(item => item.type === 'error').length;
  const totalEvents = data.filter(item => item.type === 'event').length;
  return totalEvents > 0 ? (errors / totalEvents) * 100 : 0;
}

function getPerformanceMetrics(data: any[]) {
  const performanceData = data.filter(item => item.type === 'metric');
  
  const metrics: Record<string, number[]> = {};
  performanceData.forEach(item => {
    const metricName = item.data?.name;
    const value = item.data?.value;
    if (metricName && typeof value === 'number') {
      if (!metrics[metricName]) metrics[metricName] = [];
      metrics[metricName].push(value);
    }
  });
  
  const averages: Record<string, number> = {};
  Object.entries(metrics).forEach(([name, values]) => {
    averages[name] = values.reduce((sum, val) => sum + val, 0) / values.length;
  });
  
  return averages;
} 