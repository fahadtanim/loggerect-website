"use client";

import { useState } from "react";
import Link from "next/link";

type Section =
  | "getting-started"
  | "configuration"
  | "hooks"
  | "hocs"
  | "decorators"
  | "plugins"
  | "api";

const sections: { id: Section; title: string; icon: string }[] = [
  { id: "getting-started", title: "Getting Started", icon: "🚀" },
  { id: "configuration", title: "Configuration", icon: "⚙️" },
  { id: "hooks", title: "React Hooks", icon: "🪝" },
  { id: "hocs", title: "Higher-Order Components", icon: "🎁" },
  { id: "decorators", title: "Decorators", icon: "🎨" },
  { id: "plugins", title: "Build Plugins", icon: "🔌" },
  { id: "api", title: "API Reference", icon: "📚" },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] =
    useState<Section>("getting-started");

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="./" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-green)] to-[var(--accent-cyan)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold text-[var(--text-primary)]">
              loggerect
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="./"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Home
            </Link>
            <Link
              href="./docs"
              className="text-[var(--accent-green)] font-medium"
            >
              Docs
            </Link>
            <a
              href="https://github.com/fahadtanim/loggerect"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/loggerect"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[var(--accent-green)] text-black font-semibold hover:bg-[var(--accent-green)]/90 transition-colors"
            >
              npm
            </a>
          </div>
        </div>
      </nav>

      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="fixed left-0 top-20 bottom-0 w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 overflow-y-auto">
          <nav className="p-4">
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeSection === section.id
                      ? "bg-[var(--accent-green)]/10 text-[var(--accent-green)] border border-[var(--accent-green)]/30"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                  }`}
                >
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 max-w-4xl">
          {activeSection === "getting-started" && <GettingStarted />}
          {activeSection === "configuration" && <Configuration />}
          {activeSection === "hooks" && <Hooks />}
          {activeSection === "hocs" && <HOCs />}
          {activeSection === "decorators" && <Decorators />}
          {activeSection === "plugins" && <Plugins />}
          {activeSection === "api" && <APIReference />}
        </main>
      </div>
    </div>
  );
}

// Code Block Component
function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative group">
      <pre className="bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-xl p-4 overflow-x-auto">
        <code className="text-sm font-mono text-[var(--text-secondary)]">
          {code}
        </code>
      </pre>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-3 right-3 px-2 py-1 text-xs bg-[var(--bg-tertiary)] text-[var(--text-muted)] rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[var(--bg-card)]"
      >
        Copy
      </button>
    </div>
  );
}

// Section Components
function GettingStarted() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          Getting Started
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Get up and running with loggerect in minutes. A powerful,
          zero-dependency React logger with full source path tracking.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Installation
        </h2>
        <CodeBlock code="npm install loggerect" />
        <p className="text-[var(--text-secondary)]">Or with yarn/pnpm:</p>
        <CodeBlock code={`yarn add loggerect\n# or\npnpm add loggerect`} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
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

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
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

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Log Levels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

function Configuration() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          Configuration
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Customize loggerect behavior with comprehensive configuration options.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Basic Configuration
        </h2>
        <CodeBlock
          code={`import { configure } from "loggerect";

configure({
  // Environment & Level
  environment: "development", // 'development' | 'production' | 'test'
  level: "debug",             // 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent'
  
  // Formatting
  format: "pretty",           // 'pretty' | 'json' | 'minimal' | 'detailed'
  timestamps: true,
  timestampFormat: "locale",  // 'locale' | 'iso' | 'unix' | 'relative'
  colors: true,
  
  // Source Tracking
  includeSourcePath: "auto",  // true | false | 'auto'
  includeStackTrace: true,
  
  // React-specific
  trackRenders: true,
  trackPropChanges: true,
  trackStateChanges: true,
});`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Environment-Specific Configuration
        </h2>
        <CodeBlock
          code={`configure({
  // Auto-detected, or set manually
  environment: process.env.NODE_ENV,
  
  // Different levels per environment
  level: process.env.NODE_ENV === "production" ? "warn" : "trace",
  
  // Disable source paths in production
  includeSourcePath: process.env.NODE_ENV !== "production",
  
  // Minimal format in production
  format: process.env.NODE_ENV === "production" ? "minimal" : "pretty",
});`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Custom Styles
        </h2>
        <CodeBlock
          code={`configure({
  styles: {
    trace: "background: rgba(107, 114, 128, 0.2); color: #9CA3AF; padding: 2px 8px; border-radius: 4px;",
    debug: "background: rgba(34, 197, 94, 0.2); color: #22c55e; padding: 2px 8px; border-radius: 4px;",
    info: "background: rgba(59, 130, 246, 0.2); color: #3b82f6; padding: 2px 8px; border-radius: 4px;",
    warn: "background: rgba(234, 179, 8, 0.2); color: #eab308; padding: 2px 8px; border-radius: 4px;",
    error: "background: rgba(239, 68, 68, 0.2); color: #ef4444; padding: 2px 8px; border-radius: 4px;",
  },
  badges: {
    trace: "🔍",
    debug: "🐛",
    info: "ℹ️",
    warn: "⚠️",
    error: "❌",
    mount: "🚀",
    unmount: "💤",
    render: "🎨",
  },
});`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          All Configuration Options
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-medium)]">
                <th className="py-3 px-4 text-[var(--text-primary)]">Option</th>
                <th className="py-3 px-4 text-[var(--text-primary)]">Type</th>
                <th className="py-3 px-4 text-[var(--text-primary)]">
                  Default
                </th>
                <th className="py-3 px-4 text-[var(--text-primary)]">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)]">
              {[
                [
                  "level",
                  "LogLevel",
                  '"trace" (dev) / "warn" (prod)',
                  "Minimum log level",
                ],
                [
                  "format",
                  "LogFormat",
                  '"pretty" (dev) / "minimal" (prod)',
                  "Output format",
                ],
                ["timestamps", "boolean", "true", "Include timestamps"],
                ["colors", "boolean", "true", "Enable colored output"],
                ["trackRenders", "boolean", "true", "Track component renders"],
                ["trackPropChanges", "boolean", "true", "Track prop changes"],
                ["trackStateChanges", "boolean", "true", "Track state changes"],
              ].map(([option, type, def, desc]) => (
                <tr
                  key={option}
                  className="border-b border-[var(--border-subtle)]"
                >
                  <td className="py-3 px-4 font-mono text-[var(--accent-green)]">
                    {option}
                  </td>
                  <td className="py-3 px-4 font-mono text-[var(--accent-purple)]">
                    {type}
                  </td>
                  <td className="py-3 px-4 font-mono text-[var(--text-muted)]">
                    {def}
                  </td>
                  <td className="py-3 px-4">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Hooks() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          React Hooks
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Powerful hooks for logging in functional components with automatic
          lifecycle tracking.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          useLogger
        </h2>
        <p className="text-[var(--text-secondary)]">
          Creates a component-scoped logger instance.
        </p>
        <CodeBlock
          code={`import { useLogger } from "loggerect";

function MyComponent() {
  const log = useLogger("MyComponent");
  
  useEffect(() => {
    log.info("Component ready");
    log.debug("Fetching data...", { endpoint: "/api/users" });
  }, []);
  
  return <div>Hello</div>;
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          useLifecycleLogger
        </h2>
        <p className="text-[var(--text-secondary)]">
          Automatically logs component mount and unmount events.
        </p>
        <CodeBlock
          code={`import { useLifecycleLogger } from "loggerect";

function MyComponent() {
  useLifecycleLogger("MyComponent");
  // Logs: 🚀 Mounted (on mount)
  // Logs: 💤 Unmounted (lifetime: 5234.12ms) (on unmount)
  
  return <div>Hello</div>;
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          useStateLogger
        </h2>
        <p className="text-[var(--text-secondary)]">
          useState replacement that logs state changes.
        </p>
        <CodeBlock
          code={`import { useStateLogger } from "loggerect";

function Counter() {
  const [count, setCount] = useStateLogger("Counter", "count", 0);
  // Logs: 🗃️ State "count" changed { prev: 0, next: 1 }
  
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          useRenderLogger
        </h2>
        <p className="text-[var(--text-secondary)]">
          Tracks and logs every render with timing.
        </p>
        <CodeBlock
          code={`import { useRenderLogger } from "loggerect";

function MyComponent() {
  useRenderLogger("MyComponent");
  // Logs: 🎨 Render #1 (2.34ms)
  // Logs: 🎨 Render #2 (1.12ms)
  
  return <div>Hello</div>;
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          useEffectLogger
        </h2>
        <p className="text-[var(--text-secondary)]">
          useEffect replacement that logs effect execution.
        </p>
        <CodeBlock
          code={`import { useEffectLogger } from "loggerect";

function DataFetcher({ userId }) {
  useEffectLogger(
    "DataFetcher",
    "fetchUser",
    () => {
      fetchUser(userId);
    },
    [userId]
  );
  // Logs: ▶️ Effect "fetchUser" running
  // Logs: ⏹️ Effect "fetchUser" cleanup
  
  return <div>...</div>;
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          useTimer
        </h2>
        <p className="text-[var(--text-secondary)]">
          Manual performance timing within components.
        </p>
        <CodeBlock
          code={`import { useTimer } from "loggerect";

function DataLoader() {
  const timer = useTimer("DataLoader");
  
  const loadData = async () => {
    timer.start("loadData");
    const data = await fetchData();
    timer.end("loadData"); // Logs: ⏱️ loadData: 234.56ms
    return data;
  };
  
  return <button onClick={loadData}>Load</button>;
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          All Available Hooks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { hook: "useLogger", desc: "Component-scoped logger" },
            { hook: "useLifecycleLogger", desc: "Mount/unmount logging" },
            { hook: "useRenderLogger", desc: "Render tracking" },
            { hook: "useStateLogger", desc: "State change logging" },
            { hook: "usePropChangeLogger", desc: "Prop change detection" },
            { hook: "useEffectLogger", desc: "Effect execution logging" },
            { hook: "useCallbackLogger", desc: "Callback execution logging" },
            { hook: "useMemoLogger", desc: "Memo computation logging" },
            { hook: "useTimer", desc: "Performance timing" },
            { hook: "useWhyDidYouRender", desc: "Re-render debugging" },
          ].map((item) => (
            <div
              key={item.hook}
              className="p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]"
            >
              <code className="text-[var(--accent-green)] font-mono">
                {item.hook}
              </code>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function HOCs() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          Higher-Order Components
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Wrap your components with logging capabilities using HOCs.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          withLogger
        </h2>
        <p className="text-[var(--text-secondary)]">
          Basic HOC for adding logging to any component.
        </p>
        <CodeBlock
          code={`import { withLogger } from "loggerect";

const MyComponent = ({ name }) => <div>Hello {name}</div>;

// Basic usage
export default withLogger(MyComponent);

// With options
export default withLogger(MyComponent, {
  trackRenders: true,
  trackPropChanges: true,
  logLifecycle: true,
  displayName: "MyAwesomeComponent",
  level: "debug",
  tags: ["ui", "feature"],
});`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          withLoggerRef
        </h2>
        <p className="text-[var(--text-secondary)]">
          HOC that forwards refs while adding logging.
        </p>
        <CodeBlock
          code={`import { withLoggerRef } from "loggerect";
import { forwardRef } from "react";

const Input = forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

export default withLoggerRef(Input, {
  displayName: "LoggedInput",
});`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          withErrorLogger
        </h2>
        <p className="text-[var(--text-secondary)]">
          HOC that catches and logs component errors.
        </p>
        <CodeBlock
          code={`import { withErrorLogger } from "loggerect";

const RiskyComponent = () => {
  // This component might throw errors
  return <div>...</div>;
};

export default withErrorLogger(RiskyComponent, {
  fallback: <div>Something went wrong</div>,
  onError: (error, errorInfo) => {
    // Custom error handling
  },
});`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          HOC Options
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-medium)]">
                <th className="py-3 px-4 text-[var(--text-primary)]">Option</th>
                <th className="py-3 px-4 text-[var(--text-primary)]">Type</th>
                <th className="py-3 px-4 text-[var(--text-primary)]">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)]">
              {[
                ["trackRenders", "boolean", "Track component renders"],
                ["trackPropChanges", "boolean", "Log when props change"],
                ["logLifecycle", "boolean", "Log mount/unmount"],
                ["displayName", "string", "Custom component name"],
                ["level", "LogLevel", "Log level for this component"],
                ["tags", "string[]", "Tags for filtering logs"],
              ].map(([option, type, desc]) => (
                <tr
                  key={option}
                  className="border-b border-[var(--border-subtle)]"
                >
                  <td className="py-3 px-4 font-mono text-[var(--accent-green)]">
                    {option}
                  </td>
                  <td className="py-3 px-4 font-mono text-[var(--accent-purple)]">
                    {type}
                  </td>
                  <td className="py-3 px-4">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Decorators() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          TypeScript Decorators
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Use decorators for elegant logging in class components and services.
        </p>
        <div className="mt-4 p-4 rounded-lg bg-[var(--accent-yellow)]/10 border border-[var(--accent-yellow)]/30">
          <p className="text-[var(--accent-yellow)]">
            ⚠️ Requires{" "}
            <code className="font-mono">experimentalDecorators: true</code> in
            tsconfig.json
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          @Log Decorator
        </h2>
        <p className="text-[var(--text-secondary)]">
          Log method calls with arguments and timing.
        </p>
        <CodeBlock
          code={`import { Log } from "loggerect";

class UserService {
  @Log()
  async fetchUser(id: string) {
    // Logs: → fetchUser() { args: ["123"] }
    // Logs: ← fetchUser() (156.78ms)
    return await api.getUser(id);
  }

  @Log({ logArgs: false, logTime: true })
  processData(data: any) {
    // Custom options
  }
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          @LogClass Decorator
        </h2>
        <p className="text-[var(--text-secondary)]">
          Apply logging to all methods in a class.
        </p>
        <CodeBlock
          code={`import { LogClass } from "loggerect";

@LogClass()
class MyService {
  methodA() { /* logged */ }
  methodB() { /* logged */ }
  methodC() { /* logged */ }
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Level-Specific Decorators
        </h2>
        <CodeBlock
          code={`import { Debug, Info, Warn, Error, Trace } from "loggerect";

class MyService {
  @Trace()
  detailedMethod() { /* ... */ }

  @Debug()
  debugMethod() { /* ... */ }

  @Info()
  infoMethod() { /* ... */ }

  @Warn()
  warnMethod() { /* ... */ }

  @Error()
  errorMethod() { /* ... */ }
}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          All Available Decorators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { dec: "@Log", desc: "General method logging" },
            { dec: "@LogClass", desc: "Log all class methods" },
            { dec: "@LogLifecycle", desc: "React lifecycle logging" },
            { dec: "@LogRender", desc: "Render method logging" },
            { dec: "@LogState", desc: "State change logging" },
            { dec: "@LogErrors", desc: "Error boundary logging" },
            { dec: "@LogAsync", desc: "Async method logging" },
            { dec: "@LogDebounced", desc: "Debounced method logging" },
            { dec: "@LogThrottled", desc: "Throttled method logging" },
            { dec: "@LogWhen", desc: "Conditional logging" },
          ].map((item) => (
            <div
              key={item.dec}
              className="p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]"
            >
              <code className="text-[var(--accent-cyan)] font-mono">
                {item.dec}
              </code>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Plugins() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          Build Plugins
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Enable accurate source file:line tracking in the browser console with
          build plugins.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Vite
        </h2>
        <CodeBlock
          code={`// vite.config.ts
import { defineConfig } from "vite";
import logrectPlugin from "loggerect/vite-plugin";

export default defineConfig({
  plugins: [logrectPlugin()],
});`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Next.js (Turbopack)
        </h2>
        <CodeBlock
          code={`// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.{ts,tsx,js,jsx}": {
        loaders: ["loggerect/loader"],
      },
    },
  },
};

export default nextConfig;`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Next.js (Webpack)
        </h2>
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
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Webpack
        </h2>
        <CodeBlock
          code={`// webpack.config.js
const logrectPlugin = require("loggerect/unplugin");

module.exports = {
  plugins: [logrectPlugin.webpack()],
};`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Rollup
        </h2>
        <CodeBlock
          code={`// rollup.config.js
import logrectPlugin from "loggerect/unplugin";

export default {
  plugins: [logrectPlugin.rollup()],
};`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          esbuild
        </h2>
        <CodeBlock
          code={`// esbuild.config.js
const logrectPlugin = require("loggerect/unplugin");

require("esbuild").build({
  plugins: [logrectPlugin.esbuild()],
});`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Babel (Alternative)
        </h2>
        <CodeBlock
          code={`// babel.config.js
module.exports = {
  plugins: ["loggerect/babel-plugin"],
};`}
        />
      </section>
    </div>
  );
}

function APIReference() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          API Reference
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Complete API documentation for loggerect.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
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

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
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

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
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

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
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
