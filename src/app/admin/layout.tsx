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
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        // Check for existing session token
        const sessionToken = sessionStorage.getItem("imperial_session_token");
        
        if (sessionToken) {
          // Verify token with server
          const response = await fetch('/api/admin/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${sessionToken}`
            }
          });

          if (response.ok) {
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          } else {
            // Token is invalid, remove it
            sessionStorage.removeItem("imperial_session_token");
          }
        }

        // Prompt for authentication
        await authenticateUser();
      } catch (error) {
        console.error('Authentication error:', error);
        setAuthError('Authentication service unavailable');
        setIsLoading(false);
      }
    };

    const authenticateUser = async () => {
      const password = prompt("Enter Imperial Command Access Code:");
      
      if (!password) {
        window.location.href = "/";
        return;
      }

      try {
        // Send credentials to server for verification
        const response = await fetch('/api/admin/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password })
        });

        const data = await response.json();

        if (response.ok && data.token) {
          // Store secure session token (not in localStorage for security)
          sessionStorage.setItem("imperial_session_token", data.token);
          setIsAuthenticated(true);
        } else {
          alert("Access Denied. Invalid credentials.");
          window.location.href = "/";
          return;
        }
      } catch (error) {
        console.error('Authentication failed:', error);
        setAuthError('Authentication failed');
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
      
      setIsLoading(false);
    };

    verifyAuthentication();
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
          {authError && (
            <p className="text-imperial-red text-sm mt-4">{authError}</p>
          )}
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
          {authError && (
            <p className="text-imperial-red text-sm mt-4">{authError}</p>
          )}
        </div>
      </div>
    );
  }

  return <div className="min-h-screen bg-imperial-black">{children}</div>;
}
