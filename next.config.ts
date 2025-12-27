import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Source maps for debugging
  productionBrowserSourceMaps: false,

  // Turbopack config - uses loggerect loader for source tracking
  turbopack: {
    rules: {
      // Apply loader to source files only (not node_modules)
      "./src/**/*.{ts,tsx,js,jsx}": {
        loaders: ["loggerect/loader"],
      },
    },
  },
};

export default nextConfig;
