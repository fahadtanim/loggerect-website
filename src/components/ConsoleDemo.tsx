"use client";

import { useState, useEffect, useCallback } from "react";
import { useLogger, useLifecycleLogger, useStateLogger } from "loggerect/hooks";

interface LogLine {
  id: number;
  time: string;
  badge: "info" | "debug" | "warn" | "error";
  badgeText: string;
  component: string;
  message: string;
  source?: string;
  data?: string;
}

const initialLogs: LogLine[] = [
  {
    id: 1,
    time: "[10:30:45]",
    badge: "info",
    badgeText: "ℹ️ INFO",
    component: "App",
    message: "Application started",
  },
  {
    id: 2,
    time: "[10:30:45]",
    badge: "debug",
    badgeText: "🐛 DEBUG",
    component: "UserProfile",
    message: "fetchUser()",
    source: "@ src/components/UserProfile.tsx:42",
  },
  {
    id: 3,
    time: "",
    badge: "debug",
    badgeText: "",
    component: "",
    message: "",
    data: '   📊 Data: { userId: 123, name: "John" }',
  },
  {
    id: 4,
    time: "[10:30:46]",
    badge: "debug",
    badgeText: "🐛 DEBUG",
    component: "UserProfile",
    message: "🎨 Render #1 (2.34ms)",
    source: "@ src/components/UserProfile.tsx:67",
  },
  {
    id: 5,
    time: "[10:30:47]",
    badge: "warn",
    badgeText: "⚠️ WARN",
    component: "DataService",
    message: "Cache miss for key: user_123",
  },
  {
    id: 6,
    time: "[10:30:48]",
    badge: "debug",
    badgeText: "🐛 DEBUG",
    component: "UserProfile",
    message: "📦 Props changed",
  },
  {
    id: 7,
    time: "",
    badge: "debug",
    badgeText: "",
    component: "",
    message: "",
    data: '   { name: { prev: null, next: "John Doe" } }',
  },
];

const additionalLogs: Omit<LogLine, "id" | "time">[] = [
  {
    badge: "info",
    badgeText: "ℹ️ INFO",
    component: "App",
    message: "Route changed to /dashboard",
  },
  {
    badge: "debug",
    badgeText: "🐛 DEBUG",
    component: "Dashboard",
    message: "🚀 Mounted",
    source: "@ src/pages/Dashboard.tsx:12",
  },
  {
    badge: "debug",
    badgeText: "🐛 DEBUG",
    component: "DataService",
    message: "fetchDashboardData() started",
    source: "@ src/services/DataService.ts:45",
  },
  {
    badge: "debug",
    badgeText: "🐛 DEBUG",
    component: "DataService",
    message: "✅ fetchDashboardData() completed (156.78ms)",
  },
  {
    badge: "debug",
    badgeText: "🐛 DEBUG",
    component: "Dashboard",
    message: "🎨 Render #1 (3.45ms)",
    source: "@ src/pages/Dashboard.tsx:67",
  },
  {
    badge: "warn",
    badgeText: "⚠️ WARN",
    component: "Analytics",
    message: "Tracking pixel failed to load",
  },
  {
    badge: "debug",
    badgeText: "🐛 DEBUG",
    component: "Chart",
    message: "📦 Props changed",
    source: "@ src/components/Chart.tsx:23",
  },
];

function getCurrentTime(): string {
  const now = new Date();
  return `[${now.toLocaleTimeString()}]`;
}

export default function ConsoleDemo() {
  const log = useLogger("ConsoleDemo");
  useLifecycleLogger("ConsoleDemo");

  const [logs, setLogs] = useStateLogger<LogLine[]>(
    "ConsoleDemo",
    "logs",
    initialLogs
  );
  const [logIndex, setLogIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const addLog = useCallback(() => {
    if (isPaused) return;

    const newLog = additionalLogs[logIndex % additionalLogs.length];
    const newLogWithId: LogLine = {
      ...newLog,
      id: Date.now(),
      time: newLog.badgeText ? getCurrentTime() : "",
    };

    log.trace("Adding new log line to demo", {
      component: newLog.component,
      message: newLog.message,
    });

    setLogs((prev) => {
      const updated = [...prev, newLogWithId];
      if (updated.length > 8) {
        return updated.slice(-8);
      }
      return updated;
    });

    setLogIndex((prev) => prev + 1);
  }, [isPaused, logIndex, log, setLogs]);

  useEffect(() => {
    // Only log interval start/stop once with lower verbosity
    const interval = setInterval(addLog, 2000); // Slower interval to reduce console spam

    return () => {
      clearInterval(interval);
    };
  }, [addLog]);

  const handleMouseEnter = () => {
    log.debug("Console demo hovered - pausing animation");
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    log.debug("Console demo unhovered - resuming animation");
    setIsPaused(false);
  };

  const getBadgeClass = (badge: string) => {
    switch (badge) {
      case "info":
        return "log-badge-info";
      case "debug":
        return "log-badge-debug";
      case "warn":
        return "log-badge-warn";
      case "error":
        return "log-badge-error";
      default:
        return "";
    }
  };

  return (
    <div
      className="bg-[#0d0d12] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Console Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#12121a] border-b border-white/5">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27ca3e]" />
        </div>
        <span className="text-slate-500 text-sm">Console</span>
        {isPaused && (
          <span className="ml-auto text-xs text-slate-600">⏸ Paused</span>
        )}
      </div>

      {/* Console Body */}
      <div className="p-4 font-mono text-sm min-h-[350px] max-h-[400px] overflow-hidden">
        {logs.map((logItem, index) => (
          <div
            key={logItem.id}
            className="flex flex-wrap items-baseline gap-2 py-1 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {logItem.data ? (
              <span className="text-slate-500">{logItem.data}</span>
            ) : (
              <>
                {logItem.time && (
                  <span className="text-slate-600 text-xs">{logItem.time}</span>
                )}
                {logItem.badgeText && (
                  <span className={`log-badge ${getBadgeClass(logItem.badge)}`}>
                    {logItem.badgeText}
                  </span>
                )}
                {logItem.component && (
                  <>
                    <span className="text-slate-600">|</span>
                    <span className="text-purple-400 font-semibold">
                      {logItem.component}
                    </span>
                  </>
                )}
                {logItem.message && (
                  <>
                    <span className="text-slate-600">→</span>
                    <span className="text-white">{logItem.message}</span>
                  </>
                )}
                {logItem.source && (
                  <span className="text-slate-600 text-xs">
                    {logItem.source}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
