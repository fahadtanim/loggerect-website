import { CodeBlock } from "./CodeBlock";

export function Configuration() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
          Configuration
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)]">
          Customize loggerect behavior with comprehensive configuration options.
          Every aspect of logging can be tailored to your needs.
        </p>
      </div>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Quick Start
        </h2>
        <p className="text-[var(--text-secondary)]">
          Basic configuration to get started:
        </p>
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

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Environment & Log Levels
        </h2>
        <p className="text-[var(--text-secondary)]">
          Control logging behavior based on environment:
        </p>
        <CodeBlock
          code={`configure({
  // Environment detection (auto-detected by default)
  environment: "development", // 'development' | 'production' | 'test'
  
  // Log levels (from most to least verbose)
  level: "trace",  // 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent'
  
  // Environment-specific configuration
  level: process.env.NODE_ENV === "production" 
    ? "warn"   // Only warnings and errors in production
    : "trace", // Everything in development
});`}
        />
        <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <h3 className="font-semibold text-[var(--text-primary)] mb-2">
            Log Level Hierarchy
          </h3>
          <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
            <li>
              <code className="text-[var(--accent-green)]">trace</code> - Most
              verbose, all logs
            </li>
            <li>
              <code className="text-[var(--accent-green)]">debug</code> - Debug
              information and above
            </li>
            <li>
              <code className="text-[var(--accent-green)]">info</code> - General
              information and above
            </li>
            <li>
              <code className="text-[var(--accent-green)]">warn</code> -
              Warnings and errors only
            </li>
            <li>
              <code className="text-[var(--accent-green)]">error</code> - Errors
              only
            </li>
            <li>
              <code className="text-[var(--accent-green)]">silent</code> - No
              logs
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Output Formats
        </h2>
        <p className="text-[var(--text-secondary)]">
          Choose how logs are formatted:
        </p>
        <CodeBlock
          code={`configure({
  format: "pretty", // 'pretty' | 'json' | 'minimal' | 'detailed'
  
  // Pretty format (default in development)
  // Beautiful, colored, human-readable output
  
  // JSON format (great for log aggregation)
  format: "json",
  // Output: {"level":"info","message":"User logged in","timestamp":"..."}
  
  // Minimal format (default in production)
  format: "minimal",
  // Output: [INFO] User logged in
  
  // Detailed format (maximum information)
  format: "detailed",
  // Output: Includes all metadata, stack traces, source paths, etc.
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Timestamps
        </h2>
        <p className="text-[var(--text-secondary)]">
          Configure timestamp display:
        </p>
        <CodeBlock
          code={`configure({
  timestamps: true, // Enable/disable timestamps
  timestampFormat: "locale", // 'locale' | 'iso' | 'unix' | 'relative'
  
  // Locale format (default)
  timestampFormat: "locale",
  // Output: "12/25/2023, 3:45:30 PM"
  
  // ISO format
  timestampFormat: "iso",
  // Output: "2023-12-25T15:45:30.123Z"
  
  // Unix timestamp
  timestampFormat: "unix",
  // Output: 1703517930123
  
  // Relative time
  timestampFormat: "relative",
  // Output: "2 minutes ago"
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Source Path Tracking
        </h2>
        <p className="text-[var(--text-secondary)]">
          Track where logs originate from:
        </p>
        <CodeBlock
          code={`configure({
  // Auto-enable in development, disable in production
  includeSourcePath: "auto", // true | false | 'auto'
  
  // Always include source paths
  includeSourcePath: true,
  // Output: @ src/components/UserProfile.tsx:42
  
  // Never include source paths
  includeSourcePath: false,
  
  // Include stack traces for errors
  includeStackTrace: true, // boolean
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          React Component Tracking
        </h2>
        <p className="text-[var(--text-secondary)]">
          Track React component behavior:
        </p>
        <CodeBlock
          code={`configure({
  // Track component renders with timing
  trackRenders: true,
  // Logs: 🎨 Render #1 (2.34ms)
  
  // Track prop changes
  trackPropChanges: true,
  // Logs: 📦 Props changed { prev: {...}, next: {...} }
  
  // Track state changes
  trackStateChanges: true,
  // Logs: 🗃️ State "count" changed { prev: 0, next: 1 }
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Custom Styles & Badges
        </h2>
        <p className="text-[var(--text-secondary)]">
          Customize the visual appearance of logs:
        </p>
        <CodeBlock
          code={`configure({
  // Custom CSS styles for each log level
  styles: {
    trace: "background: rgba(107, 114, 128, 0.2); color: #9CA3AF; padding: 2px 8px; border-radius: 4px; font-weight: 600;",
    debug: "background: rgba(34, 197, 94, 0.2); color: #22c55e; padding: 2px 8px; border-radius: 4px; font-weight: 600;",
    info: "background: rgba(59, 130, 246, 0.2); color: #3b82f6; padding: 2px 8px; border-radius: 4px; font-weight: 600;",
    warn: "background: rgba(234, 179, 8, 0.2); color: #eab308; padding: 2px 8px; border-radius: 4px; font-weight: 600;",
    error: "background: rgba(239, 68, 68, 0.2); color: #ef4444; padding: 2px 8px; border-radius: 4px; font-weight: 600;",
  },
  
  // Custom badges/emojis
  badges: {
    trace: "🔍",
    debug: "🐛",
    info: "ℹ️",
    warn: "⚠️",
    error: "❌",
    mount: "🚀",
    unmount: "💤",
    render: "🎨",
    update: "🔄",
    props: "📦",
    state: "🗃️",
    time: "⏱️",
  },
  
  // Enable/disable colors
  colors: true, // boolean
});`}
        />
        <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <h3 className="font-semibold text-[var(--text-primary)] mb-2">
            🎨 Server Console Colors
          </h3>
          <p className="text-sm text-[var(--text-secondary)] mb-2">
            loggerect automatically matches console colors between server and browser:
          </p>
          <ul className="text-sm text-[var(--text-secondary)] space-y-1 list-disc list-inside">
            <li>
              <strong>Server console:</strong> Uses ANSI color codes matching CSS colors
            </li>
            <li>
              <strong>Browser console:</strong> Uses CSS styling with matching colors
            </li>
            <li>
              <strong>Badge styling:</strong> Same background and text colors on both
            </li>
            <li>
              <strong>Component names:</strong> Automatically extracted and filtered
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Log Grouping
        </h2>
        <p className="text-[var(--text-secondary)]">
          Group related logs together:
        </p>
        <CodeBlock
          code={`configure({
  // Group related logs
  groupLogs: true, // boolean
  
  // Collapse groups by default
  collapseGroups: true, // boolean
  
  // Custom prefix for all logs
  prefix: "[logrect]", // string
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Object Inspection Limits
        </h2>
        <p className="text-[var(--text-secondary)]">
          Control how deeply objects and arrays are displayed:
        </p>
        <CodeBlock
          code={`configure({
  // Maximum depth for object inspection
  maxDepth: 4, // number (default: 4)
  
  // Maximum array length to display
  maxArrayLength: 100, // number (default: 100)
  
  // Maximum string length before truncation
  maxStringLength: 1000, // number (default: 1000)
  
  // Example: Deep object inspection
  maxDepth: 10, // Show up to 10 levels deep
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Performance Tracking
        </h2>
        <p className="text-[var(--text-secondary)]">
          Enable performance measurement features:
        </p>
        <CodeBlock
          code={`configure({
  // Enable performance timing
  performance: true, // boolean
  
  // Use with logger.time() and logger.timeEnd()
  logger.time("operation");
  await doSomething();
  logger.timeEnd("operation");
  // Logs: ⏱️ operation: 234.56ms
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Log Persistence
        </h2>
        <p className="text-[var(--text-secondary)]">
          Persist logs to browser storage:
        </p>
        <CodeBlock
          code={`configure({
  // Enable log persistence
  persist: true, // boolean
  
  // Storage key (localStorage)
  storageKey: "logrect_logs", // string (default: "logrect_logs")
  
  // Maximum number of logs to persist
  maxPersistedLogs: 1000, // number (default: 1000)
  
  // Retrieve persisted logs
  import { getPersistedLogs, clearPersistedLogs } from "loggerect";
  const logs = getPersistedLogs();
  clearPersistedLogs();
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Log Batching
        </h2>
        <p className="text-[var(--text-secondary)]">
          Batch logs for better performance:
        </p>
        <CodeBlock
          code={`configure({
  // Enable log batching
  batchLogs: true, // boolean
  
  // Batch interval in milliseconds
  batchInterval: 100, // number (default: 100ms)
  
  // Logs are collected and flushed together
  // Useful for high-frequency logging scenarios
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Custom Transports
        </h2>
        <p className="text-[var(--text-secondary)]">
          Send logs to external services or custom handlers:
        </p>
        <CodeBlock
          code={`import { configure } from "loggerect";
import type { LogTransport, LogEntry } from "loggerect";

// Custom transport to send logs to API
const apiTransport: LogTransport = {
  name: "api",
  level: "info",
  handler: (entry: LogEntry) => {
    // Send to your logging service
    fetch("/api/logs", {
      method: "POST",
      body: JSON.stringify(entry),
    });
  },
};

// Custom transport for error tracking
const errorTrackingTransport: LogTransport = {
  name: "sentry",
  level: "error",
  handler: (entry: LogEntry) => {
    if (entry.level === "error") {
      // Send to Sentry, Rollbar, etc.
      Sentry.captureException(entry.data);
    }
  },
};

configure({
  transports: [apiTransport, errorTrackingTransport],
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Log Filtering
        </h2>
        <p className="text-[var(--text-secondary)]">
          Conditionally filter logs with custom functions:
        </p>
        <CodeBlock
          code={`configure({
  // Filter function - return true to log, false to skip
  filter: (entry) => {
    // Only log errors in production
    if (process.env.NODE_ENV === "production") {
      return entry.level === "error";
    }
    return true;
  },
  
  // More complex filtering
  filter: (entry) => {
    // Skip logs from specific components
    if (entry.context?.component === "NoisyComponent") {
      return false;
    }
    
    // Only log API-related logs
    if (entry.message.includes("API")) {
      return true;
    }
    
    return entry.level !== "trace";
  },
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Log Transformation
        </h2>
        <p className="text-[var(--text-secondary)]">
          Transform log entries before output:
        </p>
        <CodeBlock
          code={`configure({
  // Transform function to modify log entries
  transformer: (entry) => {
    // Add custom metadata
    entry.metadata = {
      ...entry.metadata,
      userId: getCurrentUserId(),
      sessionId: getSessionId(),
    };
    
    // Redact sensitive information
    if (entry.data?.password) {
      entry.data.password = "[REDACTED]";
    }
    
    return entry;
  },
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Configuration Presets
        </h2>
        <p className="text-[var(--text-secondary)]">
          Use predefined configuration presets:
        </p>
        <CodeBlock
          code={`import { applyPreset } from "loggerect";

// Development preset (verbose, detailed)
applyPreset("development");
// - level: 'trace'
// - format: 'pretty'
// - includeSourcePath: true
// - trackRenders: true

// Production preset (minimal, safe)
applyPreset("production");
// - level: 'warn'
// - format: 'minimal'
// - includeSourcePath: false
// - colors: false

// Test preset (silent, JSON)
applyPreset("test");
// - level: 'error'
// - format: 'json'
// - silent: true

// Verbose preset (maximum detail)
applyPreset("verbose");
// - level: 'trace'
// - format: 'detailed'
// - maxDepth: 10

// Minimal preset (bare minimum)
applyPreset("minimal");
// - level: 'info'
// - format: 'minimal'
// - timestamps: false
// - colors: false`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Silent Mode
        </h2>
        <p className="text-[var(--text-secondary)]">
          Completely suppress all console output:
        </p>
        <CodeBlock
          code={`configure({
  // Silent mode - no console output
  silent: true, // boolean
  
  // Useful for:
  // - Testing environments
  // - When using custom transports only
  // - Temporarily disabling logs
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Complete Configuration Example
        </h2>
        <p className="text-[var(--text-secondary)]">
          Full configuration with all options:
        </p>
        <CodeBlock
          code={`import { configure } from "loggerect";

configure({
  // Environment
  environment: process.env.NODE_ENV || "development",
  
  // Logging
  level: process.env.NODE_ENV === "production" ? "warn" : "trace",
  format: process.env.NODE_ENV === "production" ? "minimal" : "pretty",
  silent: false,
  
  // Timestamps
  timestamps: true,
  timestampFormat: "locale",
  
  // Source tracking
  includeSourcePath: process.env.NODE_ENV !== "production",
  includeStackTrace: process.env.NODE_ENV !== "production",
  
  // Styling
  colors: true,
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
    update: "🔄",
    props: "📦",
    state: "🗃️",
    time: "⏱️",
  },
  
  // Grouping
  groupLogs: true,
  collapseGroups: true,
  prefix: "[logrect]",
  
  // Object inspection
  maxDepth: 4,
  maxArrayLength: 100,
  maxStringLength: 1000,
  
  // React tracking
  trackRenders: process.env.NODE_ENV === "development",
  trackPropChanges: process.env.NODE_ENV === "development",
  trackStateChanges: process.env.NODE_ENV === "development",
  
  // Performance
  performance: true,
  
  // Persistence
  persist: false,
  storageKey: "logrect_logs",
  maxPersistedLogs: 1000,
  
  // Batching
  batchLogs: false,
  batchInterval: 100,
  
  // Custom transports
  transports: [],
  
  // Filters and transformers
  // filter: (entry) => true,
  // transformer: (entry) => entry,
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          All Configuration Options Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-medium)]">
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-[var(--text-primary)]">Option</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-[var(--text-primary)]">Type</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-[var(--text-primary)]">
                  Default
                </th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-[var(--text-primary)]">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)] text-sm">
              {[
                [
                  "environment",
                  "Environment",
                  "auto-detected",
                  "Current environment mode",
                ],
                [
                  "level",
                  "LogLevel",
                  '"trace" (dev) / "warn" (prod)"',
                  "Minimum log level to output",
                ],
                [
                  "format",
                  "LogFormat",
                  '"pretty" (dev) / "minimal" (prod)"',
                  "Output format style",
                ],
                ["timestamps", "boolean", "true", "Include timestamps in logs"],
                [
                  "timestampFormat",
                  "'iso' | 'locale' | 'unix' | 'relative'",
                  '"locale"',
                  "Timestamp format",
                ],
                [
                  "includeSourcePath",
                  "boolean | 'auto'",
                  '"auto"',
                  "Include source file paths",
                ],
                [
                  "includeStackTrace",
                  "boolean",
                  "true (dev) / false (prod)",
                  "Include stack traces for errors",
                ],
                ["colors", "boolean", "true", "Enable colored console output"],
                [
                  "styles",
                  "Partial<LogStyle>",
                  "default styles",
                  "Custom CSS styles for log levels",
                ],
                [
                  "badges",
                  "Record<string, string>",
                  "default badges",
                  "Custom emoji badges",
                ],
                [
                  "prefix",
                  "string",
                  '"[logrect]"',
                  "Prefix for all log messages",
                ],
                ["groupLogs", "boolean", "true", "Group related logs together"],
                [
                  "collapseGroups",
                  "boolean",
                  "true",
                  "Collapse grouped logs by default",
                ],
                [
                  "maxDepth",
                  "number",
                  "4",
                  "Maximum depth for object inspection",
                ],
                [
                  "maxArrayLength",
                  "number",
                  "100",
                  "Maximum array length to display",
                ],
                [
                  "maxStringLength",
                  "number",
                  "1000",
                  "Maximum string length before truncation",
                ],
                ["transports", "LogTransport[]", "[]", "Custom log transports"],
                [
                  "filter",
                  "LogFilter | undefined",
                  "undefined",
                  "Filter function for conditional logging",
                ],
                [
                  "transformer",
                  "LogTransformer | undefined",
                  "undefined",
                  "Transform function for log entries",
                ],
                ["performance", "boolean", "true", "Enable performance timing"],
                ["persist", "boolean", "false", "Persist logs to storage"],
                [
                  "storageKey",
                  "string",
                  '"logrect_logs"',
                  "Storage key for persisted logs",
                ],
                [
                  "maxPersistedLogs",
                  "number",
                  "1000",
                  "Maximum number of persisted logs",
                ],
                ["trackRenders", "boolean", "true", "Track component renders"],
                ["trackPropChanges", "boolean", "true", "Track prop changes"],
                ["trackStateChanges", "boolean", "true", "Track state changes"],
                ["batchLogs", "boolean", "false", "Enable log batching"],
                [
                  "batchInterval",
                  "number",
                  "100",
                  "Batch interval in milliseconds",
                ],
                ["silent", "boolean", "false", "Suppress all console output"],
              ].map(([option, type, def, desc]) => (
                <tr
                  key={option}
                  className="border-b border-[var(--border-subtle)]"
                >
                  <td className="py-2 px-2 sm:py-3 sm:px-4 font-mono text-[var(--accent-green)]">
                    {option}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 font-mono text-[var(--accent-purple)] text-xs">
                    {type}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 font-mono text-[var(--text-muted)] text-xs">
                    {def}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}