import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Source maps for debugging
  productionBrowserSourceMaps: false,

  // Static export for GitHub Pages
  output: 'export',
  
  // Base path for GitHub Pages (update if using a custom domain)
  // basePath: '/loggerect',
  
  // Asset prefix for GitHub Pages (update if using a custom domain)
  // assetPrefix: '/loggerect',

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
