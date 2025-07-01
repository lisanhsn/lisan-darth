"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple authentication check - in production, use proper authentication
    const checkAuth = () => {
      const adminAccess = localStorage.getItem("imperial_admin_access");
      const password = prompt("Enter Imperial Command Access Code:");

      if (password === "darth2024" || adminAccess === "granted") {
        setIsAuthenticated(true);
        localStorage.setItem("imperial_admin_access", "granted");
      } else {
        alert("Access Denied. Invalid credentials.");
        window.location.href = "/";
        return;
      }
      setIsLoading(false);
    };

    // Check if already authenticated
    if (localStorage.getItem("imperial_admin_access") === "granted") {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      checkAuth();
    }
  }, []);

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
            Verifying Imperial Clearance...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-imperial-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-orbitron font-bold text-imperial-red mb-4">
            ACCESS DENIED
          </h1>
          <p className="text-imperial-gold">
            Insufficient clearance level for Imperial Command Center
          </p>
        </div>
      </div>
    );
  }

  return <div className="min-h-screen bg-imperial-black">{children}</div>;
}
