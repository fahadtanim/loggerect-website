"use client";

import { useCallback } from "react";
import {
  useLogger,
  useLifecycleLogger,
  useStateLogger,
  useTimer,
  useRenderLogger,
  useWhyDidYouRender,
} from "loggerect/hooks";
import { CodeBlock } from "./CodeBlock";

export function LoggerTest() {
  // Use all the loggerect hooks for testing
  const log = useLogger("LoggerTest");
  useLifecycleLogger("LoggerTest");
  useRenderLogger("LoggerTest");
  const { time, timeEnd, measure } = useTimer("LoggerTest");

  // State with logging
  const [count, setCount] = useStateLogger("LoggerTest", "count", 0);
  const [message, setMessage] = useStateLogger(
    "LoggerTest",
    "message",
    "Hello loggerect!"
  );
  const [isActive, setIsActive] = useStateLogger(
    "LoggerTest",
    "isActive",
    false
  );

  // Track why component re-renders
  useWhyDidYouRender("LoggerTest", { count, message, isActive });

  // Test different log levels
  const testTrace = useCallback(() => {
    log.trace("Trace level log", { detail: "Most verbose logging" });
  }, [log]);

  const testDebug = useCallback(() => {
    log.debug("Debug level log", { userId: 123, action: "test" });
  }, [log]);

  const testInfo = useCallback(() => {
    log.info("Info level log", { event: "user_action", timestamp: Date.now() });
  }, [log]);

  const testWarn = useCallback(() => {
    log.warn("Warning level log", { warning: "This is a test warning" });
  }, [log]);

  const testError = useCallback(() => {
    log.error("Error level log", {
      error: new Error("Test error"),
      context: "testing",
    });
  }, [log]);

  // Test component-scoped logging
  const testComponentScoped = useCallback(() => {
    const componentLog = log.forComponent("TestComponent");
    componentLog.info("Component-scoped log");
  }, [log]);

  // Test tags and metadata
  const testTags = useCallback(() => {
    const taggedLog = log.withTags("test", "demo", "interactive");
    taggedLog.info("Log with tags");
  }, [log]);

  const testMetadata = useCallback(() => {
    const metaLog = log.withMetadata({ sessionId: "abc123", version: "1.0.0" });
    metaLog.info("Log with metadata");
  }, [log]);

  // Test performance timing
  const testTimer = useCallback(async () => {
    time("testOperation");
    await new Promise((resolve) => setTimeout(resolve, 100));
    timeEnd("testOperation");
  }, [time, timeEnd]);

  const testMeasure = useCallback(async () => {
    await measure("asyncOperation", async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
    });
  }, [measure]);

  // Test state changes
  const incrementCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, [setCount]);

  const updateMessage = useCallback(() => {
    setMessage(`Updated at ${new Date().toLocaleTimeString()}`);
  }, [setMessage]);

  const toggleActive = useCallback(() => {
    setIsActive((prev) => !prev);
  }, [setIsActive]);

  // Test with data
  const testWithData = useCallback(() => {
    log.info("Log with complex data", {
      user: {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
      },
      items: [1, 2, 3, 4, 5],
      metadata: {
        timestamp: Date.now(),
        version: "1.0.0",
      },
    });
  }, [log]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-(--text-primary) mb-4">
          Interactive Logger Test
        </h1>
        <p className="text-base sm:text-lg text-(--text-secondary)">
          Test all loggerect features interactively. Click the buttons below and
          check your browser console to see the logs.
        </p>
        <div className="mt-4 p-4 rounded-lg bg-(--bg-card) border border-(--border-subtle)">
          <p className="text-sm text-(--text-secondary)">
            <strong className="text-(--text-primary)">💡 Tip:</strong> Open your
            browser&apos;s developer console (F12) to see the logs with
            beautiful styling, colors, and source paths.
          </p>
        </div>
      </div>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-(--text-primary)">
          Log Levels
        </h2>
        <p className="text-(--text-secondary)">
          Test all log levels. Each button will log a message at a different
          level:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            onClick={testTrace}
            className="px-4 py-2 rounded-lg bg-(--bg-card) border border-(--border-subtle) hover:border-(--accent-gray) transition-colors text-sm font-medium text-(--text-primary)"
          >
            🔍 TRACE
          </button>
          <button
            onClick={testDebug}
            className="px-4 py-2 rounded-lg bg-(--bg-card) border border-(--border-subtle) hover:border-(--accent-green) transition-colors text-sm font-medium text-(--text-primary)"
          >
            🐛 DEBUG
          </button>
          <button
            onClick={testInfo}
            className="px-4 py-2 rounded-lg bg-(--bg-card) border border-(--border-subtle) hover:border-(--accent-blue) transition-colors text-sm font-medium text-(--text-primary)"
          >
            ℹ️ INFO
          </button>
          <button
            onClick={testWarn}
            className="px-4 py-2 rounded-lg bg-(--bg-card) border border-(--border-subtle) hover:border-(--accent-yellow) transition-colors text-sm font-medium text-(--text-primary)"
          >
            ⚠️ WARN
          </button>
          <button
            onClick={testError}
            className="px-4 py-2 rounded-lg bg-(--bg-card) border border-(--border-subtle) hover:border-(--accent-red) transition-colors text-sm font-medium text-(--text-primary)"
          >
            ❌ ERROR
          </button>
        </div>
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-(--text-primary)">
          Advanced Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <button
            onClick={testComponentScoped}
            className="px-4 py-2 rounded-lg bg-(--bg-card) border border-(--border-subtle) hover:border-(--accent-blue) transition-colors text-sm font-medium text-(--text-primary) text-left"
          >
            Component-Scoped Log
          </button>
          <button
            onClick={testTags}
            className="px-4 py-2 rounded-lg bg-(--bg-card) border border-(--border-subtle) hover:border-(--accent-blue) transition-colors text-sm font-medium text-(--text-primary) text-left"
          >
            Log with Tags
          </button>
          <button
            onClick={testMetadata}
            className="px-4 py-2 rounded-lg bg-(--bg-card) border border-(--border-subtle) hover:border-(--accent-blue) transition-colors text-sm font-medium text-(--text-primary) text-left"
          >
            Log with Metadata
          </button>
          <button
            onClick={testWithData}
            className="px-4 py-2 rounded-lg bg-(--bg-card) border border-(--border-subtle) hover:border-(--accent-blue) transition-colors text-sm font-medium text-(--text-primary) text-left"
          >
            Log with Complex Data
          </button>
          <button
            onClick={testTimer}
            className="px-4 py-2 rounded-lg bg-(--bg-card) border border-(--border-subtle) hover:border-(--accent-blue) transition-colors text-sm font-medium text-(--text-primary) text-left"
          >
            Performance Timer
          </button>
          <button
            onClick={testMeasure}
            className="px-4 py-2 rounded-lg bg-(--bg-card) border border-(--border-subtle) hover:border-(--accent-blue) transition-colors text-sm font-medium text-(--text-primary) text-left"
          >
            Async Measure
          </button>
        </div>
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-(--text-primary)">
          State Management with Logging
        </h2>
        <p className="text-(--text-secondary)">
          These state changes are automatically logged. Check the console to see
          state change logs:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-(--bg-card) border border-(--border-subtle)">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-(--text-secondary)">Count</span>
              <span className="text-2xl font-bold text-(--text-primary)">
                {count}
              </span>
            </div>
            <button
              onClick={incrementCount}
              className="w-full px-4 py-2 rounded-lg bg-(--accent-blue) text-white hover:opacity-90 transition-opacity text-sm font-medium"
            >
              Increment
            </button>
          </div>

          <div className="p-4 rounded-lg bg-(--bg-card) border border-(--border-subtle)">
            <div className="mb-2">
              <span className="text-sm text-(--text-secondary) block mb-1">
                Message
              </span>
              <span className="text-sm text-(--text-primary) font-mono">
                {message}
              </span>
            </div>
            <button
              onClick={updateMessage}
              className="w-full px-4 py-2 rounded-lg bg-(--accent-blue) text-white hover:opacity-90 transition-opacity text-sm font-medium"
            >
              Update Message
            </button>
          </div>

          <div className="p-4 rounded-lg bg-(--bg-card) border border-(--border-subtle)">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-(--text-secondary)">Active</span>
              <span
                className={`text-2xl font-bold ${
                  isActive ? "text-(--accent-green)" : "text-(--text-muted)"
                }`}
              >
                {isActive ? "✓" : "✗"}
              </span>
            </div>
            <button
              onClick={toggleActive}
              className="w-full px-4 py-2 rounded-lg bg-(--accent-blue) text-white hover:opacity-90 transition-opacity text-sm font-medium"
            >
              Toggle
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-(--text-primary)">
          Code Example
        </h2>
        <p className="text-(--text-secondary)">
          This component uses the following loggerect hooks:
        </p>
        <CodeBlock
          code={`import {
  useLogger,
  useLifecycleLogger,
  useStateLogger,
  useTimer,
  useRenderLogger,
  useWhyDidYouRender,
} from "loggerect/hooks";

export function LoggerTest() {
  // Component-scoped logger
  const log = useLogger("LoggerTest");
  
  // Auto-log mount/unmount
  useLifecycleLogger("LoggerTest");
  
  // Track renders with timing
  useRenderLogger("LoggerTest");
  
  // Performance timing
  const { time, timeEnd, measure } = useTimer("LoggerTest");
  
  // State with automatic change logging
  const [count, setCount] = useStateLogger("LoggerTest", "count", 0);
  
  // Track why component re-renders
  useWhyDidYouRender("LoggerTest", { count });
  
  // Use the logger
  const handleClick = () => {
    log.info("Button clicked", { count });
  };
  
  return <button onClick={handleClick}>Click me</button>;
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-(--text-primary)">
          What to Check in Console
        </h2>
        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-(--bg-card) border border-(--border-subtle)">
            <p className="text-sm text-(--text-primary) font-semibold mb-1">
              ✅ Lifecycle Logs
            </p>
            <p className="text-xs text-(--text-secondary)">
              Component mount/unmount events are automatically logged
            </p>
          </div>
          <div className="p-3 rounded-lg bg-(--bg-card) border border-(--border-subtle)">
            <p className="text-sm text-(--text-primary) font-semibold mb-1">
              ✅ Render Tracking
            </p>
            <p className="text-xs text-(--text-secondary)">
              Each render is logged with timing information
            </p>
          </div>
          <div className="p-3 rounded-lg bg-(--bg-card) border border-(--border-subtle)">
            <p className="text-sm text-(--text-primary) font-semibold mb-1">
              ✅ State Changes
            </p>
            <p className="text-xs text-(--text-secondary)">
              State changes show previous and next values
            </p>
          </div>
          <div className="p-3 rounded-lg bg-(--bg-card) border border-(--border-subtle)">
            <p className="text-sm text-(--text-primary) font-semibold mb-1">
              ✅ Colored Badges
            </p>
            <p className="text-xs text-(--text-secondary)">
              Each log level has a distinct colored badge matching the theme
            </p>
          </div>
          <div className="p-3 rounded-lg bg-(--bg-card) border border-(--border-subtle)">
            <p className="text-sm text-(--text-primary) font-semibold mb-1">
              ✅ Source Paths
            </p>
            <p className="text-xs text-(--text-secondary)">
              Source file paths are shown (if bundle plugin is configured)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
