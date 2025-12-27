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
          zero-dependency React logger with full source path tracking.
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
          Quick Start
        </h2>
        <p className="text-[var(--text-secondary)]">
          Import and use the logger anywhere in your React application:
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
          Using React Hooks
        </h2>
        <p className="text-[var(--text-secondary)]">
          Use hooks for component-scoped logging with automatic lifecycle
          tracking:
        </p>
        <CodeBlock
          code={`import { useLogger, useLifecycleLogger } from "loggerect";

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

