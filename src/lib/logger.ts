"use client";

/**
 * Re-export logrect hooks for use in website components
 *
 * This file imports from the actual logrect library, demonstrating
 * that it works in a real Next.js application.
 */

// Import from logrect/hooks (React hooks only)
export {
  useLogger,
  useLifecycleLogger,
  useRenderLogger,
  usePropChangeLogger,
  useStateLogger,
  useEffectLogger,
  useCallbackLogger,
  useMemoLogger,
  useTimer,
  useConditionalLogger,
  useWhyDidYouRender,
} from "logrect/hooks";

// Import core functionality from logrect/core (SSR-safe)
export {
  logger,
  Logger,
  trace,
  debug,
  info,
  warn,
  error,
  configure,
  getConfig,
  resetConfig,
  applyPreset,
  presets,
  shouldLog,
  isDevelopment,
  isProduction,
  isServer,
  isClient,
  safePerformanceNow,
} from "logrect/core";

// Re-export types
export type {
  LogLevel,
  LogContext,
  LogrectConfig,
  LogEntry,
} from "logrect/core";

// Initialize logrect for the website on client side
import {
  configure as configureLogrect,
  logger as logrectLogger,
  isClient,
} from "logrect/core";

if (isClient()) {
  configureLogrect({
    environment: "development",
    level: "trace",
    format: "pretty",
    timestamps: true,
    colors: true,
    includeSourcePath: true,
    trackRenders: true,
    trackPropChanges: true,
    trackStateChanges: true,
  });

  logrectLogger.info("🚀 logrect.dev initialized", {
    version: "1.0.0",
    environment: "development",
  });
}
