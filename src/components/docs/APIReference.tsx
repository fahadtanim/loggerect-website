import { CodeBlock } from "./CodeBlock";

export function APIReference() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
          API Reference
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)]">
          Complete API documentation for loggerect.
        </p>
      </div>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Entry Points
        </h2>
        <CodeBlock
          code={`// Full library (React + Core)
import { logger, useLogger, withLogger, configure } from "loggerect";

// Core only (no React dependency) - for SSR/Node.js
import { logger, configure } from "loggerect/core";

// React-specific features
import { withLogger, withLoggerRef } from "loggerect/react";

// Hooks only
import { useLogger, useLifecycleLogger, useStateLogger } from "loggerect/hooks";`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Logger Methods
        </h2>
        <CodeBlock
          code={`import { logger } from "loggerect";

// Log levels
logger.trace(message, data?);  // 🔍 Most verbose
logger.debug(message, data?);  // 🐛 Debug info
logger.info(message, data?);   // ℹ️ General info
logger.warn(message, data?);   // ⚠️ Warnings
logger.error(message, data?);  // ❌ Errors

// Component-scoped logger
const componentLogger = logger.forComponent("MyComponent");
componentLogger.info("Scoped to MyComponent");

// With tags and metadata
const taggedLogger = logger
  .forComponent("MyComponent")
  .withTags("auth", "api")
  .withMetadata({ userId: 123 });

// Performance timing
logger.time("fetchData");
await fetchData();
logger.timeEnd("fetchData"); // Logs: ⏱️ fetchData: 156.78ms

// Lifecycle helpers
logger.mount("ComponentName");    // 🚀 Mounted
logger.unmount("ComponentName");  // 💤 Unmounted
logger.render("ComponentName", 1, 2.5); // 🎨 Render #1 (2.5ms)`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          TypeScript Types
        </h2>
        <CodeBlock
          code={`import type {
  LogLevel,
  LogrectConfig,
  HOCOptions,
  DecoratorOptions,
  LogEntry,
  LogTransport,
} from "loggerect";

// LogLevel
type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "silent";

// LogFormat
type LogFormat = "pretty" | "json" | "minimal" | "detailed";

// Environment
type Environment = "development" | "production" | "test";`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          SSR Utilities
        </h2>
        <CodeBlock
          code={`import {
  isServer,
  isClient,
  safePerformanceNow,
  safeLocalStorage,
  safeConsole,
} from "loggerect";

// Check environment
if (isClient()) {
  // Browser-only code
}

if (isServer()) {
  // Server-only code
}

// Safe performance timing (works on both client & server)
const start = safePerformanceNow();`}
        />
      </section>
    </div>
  );
}