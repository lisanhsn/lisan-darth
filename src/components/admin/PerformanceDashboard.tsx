"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWebGLOptimizations } from "../../hooks/useWebGLOptimizations";

interface PerformanceMetric {
  name: string;
  value: number | string;
  unit: string;
  status: "good" | "warning" | "critical";
  description: string;
}

interface OptimizationRecommendation {
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "texture" | "geometry" | "lighting" | "animation" | "general";
}

export default function PerformanceDashboard() {
  const optimizationSettings = useWebGLOptimizations();
  const [isVisible, setIsVisible] = useState(false);
  const [recommendations, setRecommendations] = useState<
    OptimizationRecommendation[]
  >([]);

  // Toggle dashboard visibility (for development/debug mode)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === "P") {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isVisible]);

  // Generate optimization recommendations based on current performance
  useEffect(() => {
    const newRecommendations: OptimizationRecommendation[] = [];

    // FPS-based recommendations
    if (
      optimizationSettings.averageFPS <
      optimizationSettings.targetFPS * 0.7
    ) {
      newRecommendations.push({
        title: "Reduce Particle Count",
        description: `Current FPS (${optimizationSettings.averageFPS}) is below target. Consider reducing particle count from ${optimizationSettings.webglSettings.performanceSettings.particleCount}.`,
        impact: "high",
        category: "general",
      });
    }

    // Memory-based recommendations
    if (optimizationSettings.memoryUsage > 200) {
      newRecommendations.push({
        title: "Optimize Texture Memory",
        description: `High memory usage detected (${optimizationSettings.memoryUsage.toFixed(
          1
        )}MB). Enable texture compression.`,
        impact: "high",
        category: "texture",
      });
    }

    // Quality-based recommendations
    if (
      optimizationSettings.qualityLevel === "low" &&
      !optimizationSettings.isMobile
    ) {
      newRecommendations.push({
        title: "GPU Performance Issue",
        description:
          "Quality automatically reduced due to performance constraints. Check GPU capabilities.",
        impact: "medium",
        category: "general",
      });
    }

    // Mobile-specific recommendations
    if (optimizationSettings.isMobile) {
      newRecommendations.push({
        title: "Mobile Optimization Active",
        description:
          "Reduced quality settings for mobile performance. Consider progressive enhancement.",
        impact: "low",
        category: "general",
      });
    }

    setRecommendations(newRecommendations);
  }, [optimizationSettings]);

  // Calculate performance metrics
  const metrics: PerformanceMetric[] = [
    {
      name: "Frame Rate",
      value: optimizationSettings.averageFPS,
      unit: "FPS",
      status:
        optimizationSettings.averageFPS >= optimizationSettings.targetFPS * 0.9
          ? "good"
          : optimizationSettings.averageFPS >=
            optimizationSettings.targetFPS * 0.7
          ? "warning"
          : "critical",
      description: `Target: ${optimizationSettings.targetFPS} FPS`,
    },
    {
      name: "Frame Time",
      value: optimizationSettings.frameTime.toFixed(2),
      unit: "ms",
      status:
        optimizationSettings.frameTime <= 16.67
          ? "good"
          : optimizationSettings.frameTime <= 33.33
          ? "warning"
          : "critical",
      description: "Time to render each frame",
    },
    {
      name: "Memory Usage",
      value: optimizationSettings.memoryUsage.toFixed(1),
      unit: "MB",
      status:
        optimizationSettings.memoryUsage <= 100
          ? "good"
          : optimizationSettings.memoryUsage <= 200
          ? "warning"
          : "critical",
      description: "JavaScript heap memory usage",
    },
    {
      name: "Quality Level",
      value: optimizationSettings.qualityLevel.toUpperCase(),
      unit: "",
      status:
        optimizationSettings.qualityLevel === "high"
          ? "good"
          : optimizationSettings.qualityLevel === "medium"
          ? "warning"
          : "critical",
      description: "Current rendering quality setting",
    },
    {
      name: "GPU Tier",
      value: optimizationSettings.gpuTier.toUpperCase(),
      unit: "",
      status:
        optimizationSettings.gpuTier === "high"
          ? "good"
          : optimizationSettings.gpuTier === "medium"
          ? "warning"
          : "critical",
      description: "Detected GPU performance tier",
    },
    {
      name: "Particles",
      value:
        optimizationSettings.webglSettings.performanceSettings.particleCount,
      unit: "",
      status: "good",
      description: "Active particle count",
    },
    {
      name: "Shadow Quality",
      value:
        optimizationSettings.webglSettings.performanceSettings.shadowMapSize,
      unit: "px",
      status:
        optimizationSettings.webglSettings.performanceSettings.shadowMapSize >=
        1024
          ? "good"
          : "warning",
      description: "Shadow map resolution",
    },
    {
      name: "Device Type",
      value: optimizationSettings.isMobile ? "MOBILE" : "DESKTOP",
      unit: "",
      status: "good",
      description: "Detected device category",
    },
  ];

  const getStatusColor = (status: "good" | "warning" | "critical") => {
    switch (status) {
      case "good":
        return "text-green-400 border-green-400";
      case "warning":
        return "text-yellow-400 border-yellow-400";
      case "critical":
        return "text-red-400 border-red-400";
    }
  };

  const getImpactColor = (impact: "high" | "medium" | "low") => {
    switch (impact) {
      case "high":
        return "bg-red-900/20 border-red-400";
      case "medium":
        return "bg-yellow-900/20 border-yellow-400";
      case "low":
        return "bg-blue-900/20 border-blue-400";
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-[100]">
        <button
          onClick={() => setIsVisible(true)}
          className="px-3 py-2 bg-black/50 border border-imperial-gold/30 rounded-lg text-imperial-gold text-xs font-mono hover:bg-imperial-gold/10 transition-colors"
        >
          📊 Performance
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.9, x: 100 }}
        className="fixed top-4 right-4 w-96 max-h-[90vh] z-[100] bg-black/90 backdrop-blur-xl border border-imperial-gold/30 rounded-xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-imperial-gold/20 flex items-center justify-between">
          <div>
            <h3 className="text-imperial-gold font-orbitron font-bold text-sm">
              🚀 WebGL Performance Monitor (2025)
            </h3>
            <p className="text-imperial-white/60 text-xs">
              Real-time optimization metrics
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-imperial-white/60 hover:text-imperial-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[calc(90vh-80px)] overflow-y-auto">
          {/* Performance Metrics Grid */}
          <div className="p-4">
            <h4 className="text-imperial-white font-semibold text-xs mb-3 uppercase tracking-wide">
              Core Metrics
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 rounded-lg border ${getStatusColor(
                    metric.status
                  )} bg-black/30`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-imperial-white/80">
                      {metric.name}
                    </span>
                    <div className="text-right">
                      <div
                        className={`text-sm font-bold ${
                          getStatusColor(metric.status).split(" ")[0]
                        }`}
                      >
                        {metric.value}
                        {metric.unit && ` ${metric.unit}`}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-imperial-white/50 mt-1">
                    {metric.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Optimization Recommendations */}
          {recommendations.length > 0 && (
            <div className="p-4 border-t border-imperial-gold/20">
              <h4 className="text-imperial-white font-semibold text-xs mb-3 uppercase tracking-wide">
                🔧 Optimization Recommendations
              </h4>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-lg border ${getImpactColor(
                      rec.impact
                    )}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="text-xs font-semibold text-imperial-white">
                          {rec.title}
                        </h5>
                        <p className="text-xs text-imperial-white/70 mt-1">
                          {rec.description}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          rec.impact === "high"
                            ? "bg-red-400 text-black"
                            : rec.impact === "medium"
                            ? "bg-yellow-400 text-black"
                            : "bg-blue-400 text-black"
                        }`}
                      >
                        {rec.impact.toUpperCase()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* WebGL Capabilities */}
          <div className="p-4 border-t border-imperial-gold/20">
            <h4 className="text-imperial-white font-semibold text-xs mb-3 uppercase tracking-wide">
              🎮 WebGL Capabilities
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-imperial-white/60">
                  Texture Compression:
                </span>
                <span
                  className={
                    optimizationSettings.webglSettings.performanceSettings
                      .textureCompression
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {optimizationSettings.webglSettings.performanceSettings
                    .textureCompression
                    ? "Enabled"
                    : "Disabled"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-imperial-white/60">
                  Instanced Rendering:
                </span>
                <span
                  className={
                    optimizationSettings.webglSettings.performanceSettings
                      .instancedRendering
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {optimizationSettings.webglSettings.performanceSettings
                    .instancedRendering
                    ? "Enabled"
                    : "Disabled"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-imperial-white/60">Frustum Culling:</span>
                <span
                  className={
                    optimizationSettings.webglSettings.performanceSettings
                      .frustumCulling
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {optimizationSettings.webglSettings.performanceSettings
                    .frustumCulling
                    ? "Enabled"
                    : "Disabled"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-imperial-white/60">
                  High Refresh Rate:
                </span>
                <span
                  className={
                    optimizationSettings.supportsHighRefreshRate
                      ? "text-green-400"
                      : "text-gray-400"
                  }
                >
                  {optimizationSettings.supportsHighRefreshRate
                    ? "Supported"
                    : "Not Supported"}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Tips */}
          <div className="p-4 border-t border-imperial-gold/20 bg-imperial-gold/5">
            <h4 className="text-imperial-gold font-semibold text-xs mb-2 uppercase tracking-wide">
              💡 2025 Optimization Tips
            </h4>
            <ul className="text-xs text-imperial-white/70 space-y-1">
              <li>• Use Ctrl+Shift+P to toggle this dashboard</li>
              <li>• Enable texture compression for better memory usage</li>
              <li>• LOD system automatically adjusts based on distance</li>
              <li>• Quality level adapts to maintain target FPS</li>
              <li>• Monitor memory usage to prevent crashes</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
