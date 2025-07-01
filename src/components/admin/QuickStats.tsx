"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Users,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Activity,
  Globe,
  Clock,
} from "lucide-react";

interface StatsData {
  visitors: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
  };
  revenue: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
  };
  orders: {
    pending: number;
    completed: number;
    total: number;
  };
  performance: {
    averageLoadTime: number;
    lighthouseScore: number;
    uptime: number;
  };
}

export default function QuickStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month">(
    "today"
  );

  useEffect(() => {
    // Simulate fetching real data
    const mockStats: StatsData = {
      visitors: {
        today: 247,
        thisWeek: 1843,
        thisMonth: 7231,
        total: 45672,
      },
      revenue: {
        today: 1299,
        thisWeek: 8947,
        thisMonth: 24356,
        total: 156789,
      },
      orders: {
        pending: 3,
        completed: 89,
        total: 92,
      },
      performance: {
        averageLoadTime: 1.2,
        lighthouseScore: 96,
        uptime: 99.9,
      },
    };

    setStats(mockStats);
  }, []);

  const getVisitorCount = () => {
    if (!stats) return 0;
    switch (timeRange) {
      case "today":
        return stats.visitors.today;
      case "week":
        return stats.visitors.thisWeek;
      case "month":
        return stats.visitors.thisMonth;
      default:
        return stats.visitors.today;
    }
  };

  const getRevenueCount = () => {
    if (!stats) return 0;
    switch (timeRange) {
      case "today":
        return stats.revenue.today;
      case "week":
        return stats.revenue.thisWeek;
      case "month":
        return stats.revenue.thisMonth;
      default:
        return stats.revenue.today;
    }
  };

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-space-dark border border-imperial-gray rounded-lg p-6 animate-pulse"
          >
            <div className="h-4 bg-imperial-gray rounded mb-4"></div>
            <div className="h-8 bg-imperial-gray rounded mb-2"></div>
            <div className="h-3 bg-imperial-gray rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Visitors",
      value: getVisitorCount().toLocaleString(),
      change: "+12.5%",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Revenue",
      value: `$${getRevenueCount().toLocaleString()}`,
      change: "+8.3%",
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      title: "Orders",
      value: stats.orders.total.toString(),
      change: "+23.1%",
      icon: ShoppingCart,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      title: "Performance",
      value: `${stats.performance.lighthouseScore}/100`,
      change: `${stats.performance.averageLoadTime}s load`,
      icon: Activity,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-imperial-gold font-orbitron font-medium">
          Time Range:
        </span>
        <div className="flex space-x-2">
          {[
            { key: "today", label: "Today" },
            { key: "week", label: "Week" },
            { key: "month", label: "Month" },
          ].map((range) => (
            <button
              key={range.key}
              onClick={() => setTimeRange(range.key as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range.key
                  ? "bg-imperial-red text-imperial-white"
                  : "bg-space-medium text-imperial-gold hover:bg-imperial-red hover:text-imperial-white"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              className={`${stat.bgColor} border ${stat.borderColor} rounded-lg p-6`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-sm text-green-400 font-medium">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-imperial-white mb-1">
                {stat.value}
              </h3>
              <p className="text-imperial-gold text-sm">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="bg-space-dark border border-imperial-gray rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="w-6 h-6 text-imperial-blue" />
            <h4 className="font-orbitron font-bold text-imperial-white">
              Global Reach
            </h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-imperial-gold">United States</span>
              <span className="text-imperial-white">45%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-imperial-gold">United Kingdom</span>
              <span className="text-imperial-white">18%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-imperial-gold">Germany</span>
              <span className="text-imperial-white">12%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-imperial-gold">Other</span>
              <span className="text-imperial-white">25%</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-space-dark border border-imperial-gray rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-6 h-6 text-imperial-green" />
            <h4 className="font-orbitron font-bold text-imperial-white">
              Growth Trends
            </h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-imperial-gold">Monthly Growth</span>
              <span className="text-green-400">+24%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-imperial-gold">User Retention</span>
              <span className="text-green-400">78%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-imperial-gold">Conversion Rate</span>
              <span className="text-green-400">3.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-imperial-gold">Avg. Session</span>
              <span className="text-imperial-white">4m 32s</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-space-dark border border-imperial-gray rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-imperial-gold" />
            <h4 className="font-orbitron font-bold text-imperial-white">
              System Status
            </h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-imperial-gold">Uptime</span>
              <span className="text-green-400">
                {stats.performance.uptime}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-imperial-gold">Response Time</span>
              <span className="text-green-400">
                {stats.performance.averageLoadTime}s
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-imperial-gold">Error Rate</span>
              <span className="text-green-400">0.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-imperial-gold">Status</span>
              <span className="text-green-400">Operational</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
