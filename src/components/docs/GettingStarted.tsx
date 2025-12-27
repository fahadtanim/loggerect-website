import { CodeBlock } from "./CodeBlock";

export function GettingStarted() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
          Getting Started
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)]">
          Get up and running with loggerect in minutes. A powerful,
          zero-dependency logger for React and Node.js with full source path tracking.
        </p>
      </div>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Installation
        </h2>
        <CodeBlock code="npm install loggerect" />
        <p className="text-[var(--text-secondary)]">Or with yarn/pnpm:</p>
        <CodeBlock code={`yarn add loggerect\n# or\npnpm add loggerect`} />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Bundle Setup (Optional but Recommended)
        </h2>
        <p className="text-[var(--text-secondary)]">
          For accurate source file:line tracking in the browser console, add one of
          the build plugins. This enables clickable file paths in your logs:
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Vite
            </h3>
            <CodeBlock
              code={`// vite.config.ts
import { defineConfig } from "vite";
import logrectPlugin from "loggerect/vite-plugin";

export default defineConfig({
  plugins: [logrectPlugin()],
});`}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Next.js (Turbopack) - Next.js 15.6+
            </h3>
            <CodeBlock
              code={`// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      // Apply loader to all TypeScript/JavaScript files
      "*.{ts,tsx,js,jsx}": {
        loaders: ["loggerect/loader"],
      },
      // Or target specific directories:
      // "src/**/*.{ts,tsx,js,jsx}": {
      //   loaders: ["loggerect/loader"],
      //   as: "*.{ts,tsx,js,jsx}",
      // },
    },
  },
};

export default nextConfig;`}
            />
            <p className="text-sm text-(--text-secondary) mt-2">
              <strong>Note:</strong> For Next.js 15.6+, use <code className="px-1 py-0.5 bg-(--bg-card) rounded text-xs">turbopack.rules</code> (not <code className="px-1 py-0.5 bg-(--bg-card) rounded text-xs">experimental.turbo.rules</code>). The loader injects source file paths directly into your code, providing accurate source tracking even in bundled environments.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Next.js (Webpack)
            </h3>
            <CodeBlock
              code={`// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      const logrectPlugin = require("loggerect/unplugin");
      config.plugins.push(logrectPlugin.webpack());
    }
    return config;
  },
};

export default nextConfig;`}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Webpack
            </h3>
            <CodeBlock
              code={`// webpack.config.js
const logrectPlugin = require("loggerect/unplugin");

module.exports = {
  plugins: [logrectPlugin.webpack()],
};`}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Rollup
            </h3>
            <CodeBlock
              code={`// rollup.config.js
import logrectPlugin from "loggerect/unplugin";

export default {
  plugins: [logrectPlugin.rollup()],
};`}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              esbuild
            </h3>
            <CodeBlock
              code={`// esbuild.config.js
const logrectPlugin = require("loggerect/unplugin");

require("esbuild").build({
  plugins: [logrectPlugin.esbuild()],
});`}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              Babel (Alternative)
            </h3>
            <CodeBlock
              code={`// babel.config.js
module.exports = {
  plugins: ["loggerect/babel-plugin"],
};`}
            />
          </div>
        </div>

        <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <p className="text-sm text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)]">Note:</strong> The bundle
            setup is optional. loggerect works without it, but you won&apos;t get
            accurate source file paths in the console. Without the plugin, source
            tracking relies on stack traces which may not always be accurate.
          </p>
        </div>
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Quick Start
        </h2>
        <p className="text-[var(--text-secondary)]">
          Import and use the logger in React or Node.js:
        </p>
        <CodeBlock
          code={`import { logger, configure } from "loggerect";

// Configure (optional - has sensible defaults)
configure({
  level: "debug",
  timestamps: true,
});

// Log messages
logger.trace("Detailed trace information");
logger.debug("Debug information");
logger.info("General information");
logger.warn("Warning message");
logger.error("Error occurred", { details: "error info" });`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Node.js Usage
        </h2>
        <p className="text-[var(--text-secondary)]">
          Use loggerect in pure Node.js applications without React:
        </p>
        <CodeBlock
          code={`// Node.js - no React needed!
const { logger } = require("loggerect");
// or with ES modules:
// import { logger } from "loggerect";

// Use in any Node.js application
logger.info("Server started", { port: 3000 });
logger.debug("Processing request", { method: "GET", path: "/api/users" });

// Component-scoped logging (works in Node.js too!)
const apiLogger = logger.forComponent("API").withTags("http", "rest");
apiLogger.info("Request received", { userId: 123 });

// Performance timing
logger.time("databaseQuery");
await queryDatabase();
logger.timeEnd("databaseQuery"); // Logs: ⏱️ databaseQuery: 45.23ms`}
        />
        <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <p className="text-sm text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)]">💡 Tip:</strong> React is
            optional! The core logger works in Node.js, React, Next.js, and any
            JavaScript environment. React is only needed if you use hooks or HOCs.
          </p>
        </div>
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Using React Hooks
        </h2>
        <p className="text-[var(--text-secondary)]">
          Use hooks for component-scoped logging with automatic lifecycle
          tracking:
        </p>
        <CodeBlock
          code={`import { useLogger, useLifecycleLogger } from "loggerect/hooks";

function MyComponent() {
  const log = useLogger("MyComponent");
  useLifecycleLogger("MyComponent"); // Auto-logs mount/unmount

  const handleClick = () => {
    log.info("Button clicked!");
  };

  return <button onClick={handleClick}>Click me</button>;
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          SSR Support (Next.js, Remix, etc.)
        </h2>
        <p className="text-[var(--text-secondary)]">
          loggerect is SSR-safe. Use the main entry point in server components:
        </p>
        <CodeBlock
          code={`// Next.js Server Component
import { logger, isServer } from "loggerect";

export default async function Page() {
  if (isServer()) {
    const log = logger
      .forComponent("Page")
      .withTags("server", "page");
    
    log.info("Rendering page on server");
  }

  return <div>Hello World</div>;
}`}
        />
        <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <p className="text-sm text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)]">Note:</strong> The main{" "}
            <code className="text-[var(--accent-blue)]">loggerect</code> entry point
            is SSR-safe and works in Node.js, React, and Next.js. For React hooks, use{" "}
            <code className="text-[var(--accent-blue)]">loggerect/hooks</code> in
            client components.
          </p>
        </div>
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Log Levels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {[
            {
              level: "TRACE",
              badge: "🔍",
              color: "gray",
              desc: "Most verbose, detailed tracing",
            },
            {
              level: "DEBUG",
              badge: "🐛",
              color: "green",
              desc: "Debug information",
            },
            {
              level: "INFO",
              badge: "ℹ️",
              color: "blue",
              desc: "General information",
            },
            { level: "WARN", badge: "⚠️", color: "yellow", desc: "Warnings" },
            { level: "ERROR", badge: "❌", color: "red", desc: "Errors" },
          ].map((item) => (
            <div
              key={item.level}
              className="p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{item.badge}</span>
                <span className="font-mono font-semibold text-[var(--text-primary)]">
                  {item.level}
                </span>
              </div>
              <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

