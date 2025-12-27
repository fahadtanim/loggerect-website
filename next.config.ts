import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Source maps for debugging
  productionBrowserSourceMaps: false,

  // Static export for GitHub Pages
  output: "export",

  // Base path for GitHub Pages (update if using a custom domain)
  // Only use basePath in production builds, not in development
  basePath: process.env.NODE_ENV === "production" ? "/loggerect" : "",

  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,

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
