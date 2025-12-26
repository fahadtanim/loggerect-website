import type { NextConfig } from "next";

// Import logrect webpack plugin for source tracking (webpack mode)

const nextConfig: NextConfig = {
  // Source maps for debugging
  productionBrowserSourceMaps: false,

  // Turbopack config - uses logrect loader for source tracking
  // Works with: npm run dev (turbopack mode)
  turbopack: {
    rules: {
      // Apply loader to source files only (not node_modules)
      "./src/**/*.{ts,tsx,js,jsx}": {
        loaders: ["logrect/loader"],
      },
    },
  },

  // Webpack config - adds logrect source injection plugin
};

export default nextConfig;
