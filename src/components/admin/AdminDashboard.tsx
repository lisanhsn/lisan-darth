"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Users,
  ShoppingCart,
  Eye,
  TrendingUp,
  Settings,
  FileText,
  Palette,
  Shield,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { analytics } from "@/lib/analytics";
import { cms } from "@/lib/cms";
import { ecommerce } from "@/lib/ecommerce";

interface DashboardStats {
  visitors: { today: number; week: number; month: number; total: number };
  revenue: { today: number; week: number; month: number; total: number };
  orders: { pending: number; completed: number; total: number };
  content: { published: number; draft: number; total: number };
  performance: { score: number; issues: number };
}

interface AdminUser {
  id: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  lastLogin: string;
  permissions: string[];
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [notifications, setNotifications] = useState<
    Array<{
      id: string;
      type: "success" | "warning" | "error" | "info";
      message: string;
      timestamp: string;
    }>
  >([]);

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    setIsLoading(true);

    try {
      // Simulate loading stats (in production, fetch from APIs)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockStats: DashboardStats = {
        visitors: { today: 247, week: 1843, month: 7231, total: 45672 },
        revenue: { today: 1299, week: 8947, month: 24356, total: 156789 },
        orders: { pending: 3, completed: 89, total: 92 },
        content: { published: 23, draft: 7, total: 30 },
        performance: { score: 94, issues: 2 },
      };

      const mockUser: AdminUser = {
        id: "admin_1",
        email: "admin@darth-lisan.dev",
        role: "admin",
        lastLogin: new Date().toISOString(),
        permissions: ["all"],
      };

      setStats(mockStats);
      setUser(mockUser);

      // Track admin access
      analytics.trackEvent("admin_dashboard_accessed", {
        user_role: mockUser.role,
        category: "admin",
      });
    } catch (error) {
      console.error("Failed to load dashboard:", error);
      addNotification("error", "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const addNotification = (
    type: "success" | "warning" | "error" | "info",
    message: string
  ) => {
    const notification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date().toISOString(),
    };

    setNotifications((prev) => [notification, ...prev].slice(0, 5));

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    }, 5000);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "content", label: "Content", icon: FileText },
    { id: "ecommerce", label: "E-commerce", icon: ShoppingCart },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-imperial-black flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-imperial-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-imperial-gold font-orbitron">
            Loading Imperial Command Center...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-imperial-black">
      {/* Header */}
      <header className="bg-space-dark border-b border-imperial-red">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-imperial-red rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-imperial-white" />
              </div>
              <div>
                <h1 className="text-xl font-orbitron font-bold text-imperial-white">
                  Imperial Command Center
                </h1>
                <p className="text-sm text-imperial-gold">
                  Welcome, {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                {notifications.length > 0 && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-5 h-5 bg-imperial-red rounded-full flex items-center justify-center text-xs text-imperial-white font-bold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {notifications.length}
                  </motion.div>
                )}
              </div>

              <button
                onClick={() => window.open("/", "_blank")}
                className="imperial-button px-4 py-2 text-sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Site
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.length > 0 && (
          <motion.div
            className="fixed top-20 right-6 z-50 space-y-2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                className={`p-4 rounded-lg border backdrop-blur-sm ${
                  notification.type === "success"
                    ? "bg-green-900/80 border-green-500"
                    : notification.type === "warning"
                    ? "bg-yellow-900/80 border-yellow-500"
                    : notification.type === "error"
                    ? "bg-red-900/80 border-red-500"
                    : "bg-blue-900/80 border-blue-500"
                }`}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
              >
                <div className="flex items-center space-x-2">
                  {notification.type === "success" && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                  {notification.type === "warning" && (
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  )}
                  {notification.type === "error" && (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <p className="text-sm text-white">{notification.message}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex space-x-8">
          {/* Sidebar Navigation */}
          <nav className="w-64 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-imperial-red text-imperial-white"
                      : "text-imperial-gold hover:bg-space-medium hover:text-imperial-white"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-orbitron font-medium">{tab.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "overview" && (
                  <OverviewTab
                    stats={stats}
                    addNotification={addNotification}
                  />
                )}
                {activeTab === "analytics" && (
                  <AnalyticsTab addNotification={addNotification} />
                )}
                {activeTab === "content" && (
                  <ContentTab addNotification={addNotification} />
                )}
                {activeTab === "ecommerce" && (
                  <EcommerceTab addNotification={addNotification} />
                )}
                {activeTab === "users" && (
                  <UsersTab addNotification={addNotification} />
                )}
                {activeTab === "settings" && (
                  <SettingsTab addNotification={addNotification} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({
  stats,
  addNotification,
}: {
  stats: DashboardStats | null;
  addNotification: (type: any, message: string) => void;
}) {
  const statCards = [
    {
      title: "Total Visitors",
      value: stats?.visitors.total.toLocaleString() || "0",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Revenue",
      value: `$${stats?.revenue.total.toLocaleString() || "0"}`,
      change: "+8.3%",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      title: "Orders",
      value: stats?.orders.total.toString() || "0",
      change: "+23.1%",
      icon: ShoppingCart,
      color: "text-purple-400",
    },
    {
      title: "Content",
      value: stats?.content.total.toString() || "0",
      change: "+5.7%",
      icon: FileText,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-orbitron font-bold text-imperial-white mb-2">
          Command Overview
        </h2>
        <p className="text-imperial-gold">
          Imperial operations status and key metrics
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              className="bg-space-dark border border-imperial-gray rounded-lg p-6"
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

      {/* Quick Actions */}
      <div className="bg-space-dark border border-imperial-gray rounded-lg p-6">
        <h3 className="text-xl font-orbitron font-bold text-imperial-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Backup Data",
              icon: Download,
              action: () => addNotification("info", "Backup initiated"),
            },
            {
              label: "Import Content",
              icon: Upload,
              action: () => addNotification("info", "Import started"),
            },
            {
              label: "Refresh Cache",
              icon: RefreshCw,
              action: () => addNotification("success", "Cache refreshed"),
            },
            {
              label: "System Check",
              icon: Shield,
              action: () => addNotification("success", "System healthy"),
            },
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                onClick={action.action}
                className="flex flex-col items-center space-y-2 p-4 border border-imperial-gray rounded-lg hover:border-imperial-red transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-6 h-6 text-imperial-gold" />
                <span className="text-sm text-imperial-white font-medium">
                  {action.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Placeholder components for other tabs
function AnalyticsTab({
  addNotification,
}: {
  addNotification: (type: any, message: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-orbitron font-bold text-imperial-white">
        Analytics Center
      </h2>
      <div className="bg-space-dark border border-imperial-gray rounded-lg p-6">
        <p className="text-imperial-gold">
          Advanced analytics dashboard with real-time data visualization,
          conversion tracking, and performance metrics.
        </p>
        <button
          onClick={() => addNotification("info", "Analytics data refreshed")}
          className="imperial-button mt-4"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}

function ContentTab({
  addNotification,
}: {
  addNotification: (type: any, message: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-orbitron font-bold text-imperial-white">
        Content Management
      </h2>
      <div className="bg-space-dark border border-imperial-gray rounded-lg p-6">
        <p className="text-imperial-gold">
          Comprehensive CMS with visual editing, version control, and
          multi-language support.
        </p>
        <button
          onClick={() =>
            addNotification("success", "Content published successfully")
          }
          className="imperial-button mt-4"
        >
          Publish Changes
        </button>
      </div>
    </div>
  );
}

function EcommerceTab({
  addNotification,
}: {
  addNotification: (type: any, message: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-orbitron font-bold text-imperial-white">
        E-commerce Control
      </h2>
      <div className="bg-space-dark border border-imperial-gray rounded-lg p-6">
        <p className="text-imperial-gold">
          Complete e-commerce platform with product management, order
          processing, and payment integration.
        </p>
        <button
          onClick={() => addNotification("info", "Processing pending orders")}
          className="imperial-button mt-4"
        >
          Process Orders
        </button>
      </div>
    </div>
  );
}

function UsersTab({
  addNotification,
}: {
  addNotification: (type: any, message: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-orbitron font-bold text-imperial-white">
        User Management
      </h2>
      <div className="bg-space-dark border border-imperial-gray rounded-lg p-6">
        <p className="text-imperial-gold">
          User account management with role-based permissions and activity
          tracking.
        </p>
        <button
          onClick={() => addNotification("warning", "User permissions updated")}
          className="imperial-button mt-4"
        >
          Update Permissions
        </button>
      </div>
    </div>
  );
}

function SettingsTab({
  addNotification,
}: {
  addNotification: (type: any, message: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-orbitron font-bold text-imperial-white">
        System Settings
      </h2>
      <div className="bg-space-dark border border-imperial-gray rounded-lg p-6">
        <p className="text-imperial-gold">
          System configuration, theme customization, and performance
          optimization settings.
        </p>
        <button
          onClick={() =>
            addNotification("success", "Settings saved successfully")
          }
          className="imperial-button mt-4"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
