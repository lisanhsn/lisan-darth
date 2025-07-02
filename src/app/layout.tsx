import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Darth Lisan - Dark Side Developer",
  description: "Portfolio of Lisan Hsn - Dark Side Developer",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        />
        <meta name="theme-color" content="#000000" />
        <style>{`
          /* GPU Acceleration & Performance Optimizations */
          * {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            -webkit-perspective: 1000px;
            perspective: 1000px;
          }
          
          html {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            scroll-behavior: smooth;
            overflow-x: hidden;
          }
          
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            will-change: transform;
            transform: translateZ(0);
            contain: layout style paint;
          }
          
          /* Mobile Performance Optimizations */
          @media (max-width: 768px) {
            * {
              -webkit-transform: translate3d(0,0,0);
              transform: translate3d(0,0,0);
              -webkit-overflow-scrolling: touch;
            }
            
            body {
              overscroll-behavior: none;
              touch-action: pan-y;
            }
          }
          
          /* High Refresh Rate Support */
          @media (min-resolution: 120dpi) {
            * {
              will-change: transform, opacity;
            }
          }
        `}</style>
      </head>
      <body className="bg-black text-white overflow-x-hidden">
        <div
          className="min-h-screen"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            contain: "layout style paint",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
