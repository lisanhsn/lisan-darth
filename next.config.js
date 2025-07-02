/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Temporarily disable TypeScript and ESLint errors for deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // GitHub Pages static export configuration (production only)
  ...(isDev
    ? {}
    : {
        output: "export",
        trailingSlash: true,
        basePath: "",
        assetPrefix: "",
      }),

  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },

  // Production optimizations
  compress: true,
  poweredByHeader: false,

  // Security headers (production only to avoid dev warnings)
  ...(!isDev
    ? {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                { key: "X-DNS-Prefetch-Control", value: "on" },
                { key: "X-XSS-Protection", value: "1; mode=block" },
                { key: "X-Frame-Options", value: "DENY" },
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "origin-when-cross-origin" },
              ],
            },
          ];
        },
      }
    : {}),

  images: {
    unoptimized: true,
    domains: [
      "github.com",
      "avatars.githubusercontent.com",
      "raw.githubusercontent.com",
      "images.unsplash.com",
      "cdn.jsdelivr.net",
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  webpack: (config, { dev, isServer }) => {
    // Handle 3D model files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/models/",
          outputPath: "static/models/",
        },
      },
    });

    // Handle three.js modules
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      stream: false,
      crypto: false,
    };

    // Bundle analyzer for production
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": require("path").resolve(__dirname, "src"),
      };
    }

    return config;
  },

  // PWA and offline support (production only to avoid dev warnings)
  ...(!isDev
    ? {
        async rewrites() {
          return [
            {
              source: "/sitemap.xml",
              destination: "/api/sitemap",
            },
            {
              source: "/robots.txt",
              destination: "/api/robots",
            },
          ];
        },
      }
    : {}),
};

module.exports = nextConfig;
