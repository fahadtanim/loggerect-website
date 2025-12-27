"use client";

import { useState, useCallback } from "react";
import { useLogger, useLifecycleLogger, useStateLogger, useTimer } from "loggerect/hooks";

type TabKey = "decorators" | "hoc" | "hooks" | "config";

const tabs: { key: TabKey; label: string }[] = [
  { key: "decorators", label: "Decorators" },
  { key: "hoc", label: "HOC" },
  { key: "hooks", label: "Hooks" },
  { key: "config", label: "Config" },
];

const codeExamples: Record<TabKey, { filename: string; code: string }> = {
  decorators: {
    filename: "UserProfile.tsx",
    code: `import React from 'react';
import { LogClass, Log, LogRender, LogAsync } from 'loggerect';

@LogClass()  // Logs all methods automatically
class UserProfile extends React.Component {
  
  @LogAsync()  // Perfect for async methods
  async fetchUserData() {
    const response = await fetch('/api/user');
    return response.json();
  }

  @Log({ logArgs: true, logReturn: true })
  handleClick(event) {
    // Arguments and return value are logged
    this.setState({ clicked: true });
  }

  @LogRender()  // Tracks render count and performance
  render() {
    return (
      <div onClick={this.handleClick}>
        Hello, {this.props.name}!
      </div>
    );
  }
}`,
  },
  hoc: {
    filename: "Dashboard.tsx",
    code: `import { withLogger, withLoggerMemo, withErrorLogger } from 'loggerect';

// Basic HOC - tracks renders, mounts, prop changes
function Dashboard({ user, data }) {
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <DataGrid data={data} />
    </div>
  );
}

export default withLogger(Dashboard, {
  trackRenders: true,
  trackPropChanges: true,
  logLifecycle: true,
});

// Memoized with logging
const MemoizedChart = withLoggerMemo(ExpensiveChart);

// Error boundary with logging
const SafeWidget = withErrorLogger(RiskyWidget, {
  fallback: <ErrorFallback />
});`,
  },
  hooks: {
    filename: "Counter.tsx",
    code: `import { 
  useLogger, 
  useLifecycleLogger, 
  useStateLogger,
  useWhyDidYouRender,
  useTimer
} from 'loggerect';

function Counter(props) {
  // Logs mount/unmount with lifetime
  useLifecycleLogger('Counter');
  
  // State with automatic change logging
  const [count, setCount] = useStateLogger('Counter', 'count', 0);
  
  // Identify re-render causes
  useWhyDidYouRender('Counter', props);
  
  // Component-scoped logger
  const log = useLogger('Counter');
  
  // Performance timing
  const { measure } = useTimer('Counter');
  
  const handleClick = async () => {
    log.info('Button clicked');
    await measure('increment', () => {
      setCount(c => c + 1);
    });
  };
  
  return <button onClick={handleClick}>{count}</button>;
}`,
  },
  config: {
    filename: "loggerect.config.ts",
    code: `import { configure, applyPreset } from 'loggerect';

// Use a preset
applyPreset('development');  // or 'production', 'verbose', 'minimal'

// Or customize everything
configure({
  // Environment
  environment: 'development',
  
  // Log level: 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent'
  level: 'debug',
  
  // Output format: 'pretty' | 'json' | 'minimal' | 'detailed'
  format: 'pretty',
  
  // Source paths (auto = dev only)
  includeSourcePath: 'auto',
  
  // Timestamps
  timestamps: true,
  timestampFormat: 'locale',  // 'iso' | 'locale' | 'unix' | 'relative'
  
  // Styling
  colors: true,
  
  // Component tracking
  trackRenders: true,
  trackPropChanges: true,
  trackStateChanges: true,
  
  // Performance
  performance: true,
  
  // Custom transport (send to external service)
  transports: [
    (entry) => analytics.track('log', entry),
  ],
});`,
  },
};

const consoleOutputs: Record<TabKey, string[]> = {
  decorators: [
    "🐛 DEBUG | UserProfile → fetchUserData() started @ UserProfile.tsx:9",
    "🐛 DEBUG | UserProfile → ✅ fetchUserData() completed (234.56ms)",
    "🐛 DEBUG | UserProfile → handleClick() @ UserProfile.tsx:15",
    "   📊 Args: [MouseEvent]",
    "🐛 DEBUG | UserProfile → 🎨 Render #3 (1.23ms)",
  ],
  hoc: [
    "ℹ️ INFO | Dashboard → 🚀 Mounted",
    "🐛 DEBUG | Dashboard → 🎨 Render #1",
    "🐛 DEBUG | Dashboard → 📦 Props changed",
    "   { data: { prev: null, next: [Array(50)] } }",
    "🐛 DEBUG | ExpensiveChart → 📦 Memo check: props equal, skipping render",
  ],
  hooks: [
    "ℹ️ INFO | Counter → 🚀 Mounted",
    "ℹ️ INFO | Counter → Button clicked",
    '🐛 DEBUG | Counter → 🗃️ State "count" changed',
    "   { prev: 0, next: 1 }",
    "🐛 DEBUG | Counter → ⏱️ increment: 0.12ms",
    "🐛 DEBUG | Counter → 🔍 Why did you render?",
    '   reasons: ["state count changed"]',
  ],
  config: [],
};

const presets = [
  { name: "development", desc: "Full logging, source paths, all tracking enabled" },
  { name: "production", desc: "Minimal logging, no source paths, tracking disabled" },
  { name: "verbose", desc: "Maximum detail, expanded groups, deep inspection" },
  { name: "minimal", desc: "Bare minimum output, no colors, no timestamps" },
  { name: "test", desc: "Silent mode for testing environments" },
];

export default function Examples() {
  const log = useLogger("Examples");
  useLifecycleLogger("Examples");
  const { measure } = useTimer("Examples");
  
  const [activeTab, setActiveTab] = useStateLogger<TabKey>("Examples", "activeTab", "decorators");
  const [copied, setCopied] = useState(false);

  const handleTabChange = useCallback((tab: TabKey) => {
    log.info("Tab changed", { from: activeTab, to: tab });
    setActiveTab(tab);
  }, [activeTab, log, setActiveTab]);

  const copyCode = useCallback(async () => {
    log.info("Copying code to clipboard", { tab: activeTab, filename: codeExamples[activeTab].filename });
    
    await measure("copyCode", async () => {
      await navigator.clipboard.writeText(codeExamples[activeTab].code);
    });
    
    setCopied(true);
    log.debug("Code copied successfully");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [activeTab, log, measure]);

  return (
    <section id="examples" className="relative z-10 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Examples
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            See It In
            <br />
            <span className="gradient-text">Action</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-green-500 text-[#0a0a0f]"
                  : "bg-[#1a1a25] text-slate-400 border border-white/5 hover:border-green-500 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Window */}
          <div className="bg-[#0d0d12] rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#12121a] border-b border-white/5">
              <span className="font-mono text-sm text-slate-400">
                {codeExamples[activeTab].filename}
              </span>
              <button
                onClick={copyCode}
                className="px-3 py-1 text-xs text-slate-400 border border-white/10 rounded hover:border-green-500 hover:text-green-400 transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="p-4 font-mono text-sm overflow-x-auto">
              <code>
                {codeExamples[activeTab].code.split("\n").map((line, i) => (
                  <div key={i} className="leading-relaxed">
                    {highlightSyntax(line)}
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* Output Window */}
          <div className="bg-[#0d0d12] rounded-2xl border border-white/10 overflow-hidden">
            <div className="px-4 py-3 bg-[#12121a] border-b border-white/5">
              <span className="text-sm text-slate-400">
                {activeTab === "config" ? "Available Presets" : "Console Output"}
              </span>
            </div>
            <div className="p-4 font-mono text-sm">
              {activeTab === "config" ? (
                <div className="space-y-3">
                  {presets.map((preset) => (
                    <div
                      key={preset.name}
                      className="p-3 bg-[#1a1a25] rounded-xl"
                    >
                      <span className="font-semibold text-green-400">
                        {preset.name}
                      </span>
                      <p className="text-slate-500 text-xs mt-1">{preset.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {consoleOutputs[activeTab].map((line, i) => (
                    <div
                      key={i}
                      className={`${
                        line.startsWith("   ")
                          ? "text-slate-500 ml-2"
                          : "text-white"
                      }`}
                    >
                      {formatLogLine(line)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function highlightSyntax(line: string): React.ReactNode {
  const tokens: React.ReactNode[] = [];
  let key = 0;
  
  const commentIdx = line.indexOf("//");
  if (commentIdx !== -1) {
    tokens.push(
      <span key={key++}>{tokenizeLine(line.slice(0, commentIdx))}</span>
    );
    tokens.push(
      <span key={key++} className="syntax-comment">
        {line.slice(commentIdx)}
      </span>
    );
    return <>{tokens}</>;
  }
  
  return tokenizeLine(line);
}

function tokenizeLine(line: string): React.ReactNode {
  const keywords = new Set([
    "import", "from", "export", "default", "const", "let", "var", 
    "function", "class", "extends", "return", "async", "await", 
    "if", "else", "new", "this", "true", "false"
  ]);
  
  const tokens: React.ReactNode[] = [];
  let current = "";
  let key = 0;
  
  const pushCurrent = () => {
    if (current) {
      if (keywords.has(current)) {
        tokens.push(<span key={key++} className="syntax-keyword">{current}</span>);
      } else if (current.startsWith("@")) {
        tokens.push(<span key={key++} className="syntax-decorator">{current}</span>);
      } else if (current.startsWith("'") || current.startsWith('"')) {
        tokens.push(<span key={key++} className="syntax-string">{current}</span>);
      } else if (current.startsWith("<") || current.startsWith("</")) {
        tokens.push(<span key={key++} className="syntax-tag">{current}</span>);
      } else {
        tokens.push(<span key={key++}>{current}</span>);
      }
      current = "";
    }
  };
  
  let inString = false;
  let stringChar = "";
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (inString) {
      current += char;
      if (char === stringChar) {
        inString = false;
        pushCurrent();
      }
    } else if (char === "'" || char === '"') {
      pushCurrent();
      inString = true;
      stringChar = char;
      current = char;
    } else if (char === " " || char === "(" || char === ")" || char === "{" || char === "}" || char === ";" || char === "," || char === ":") {
      pushCurrent();
      tokens.push(<span key={key++}>{char}</span>);
    } else if (char === "<" || (char === "/" && line[i-1] === "<")) {
      if (char === "<") {
        pushCurrent();
      }
      current += char;
    } else if (char === ">") {
      current += char;
      pushCurrent();
    } else {
      current += char;
    }
  }
  
  pushCurrent();
  return <>{tokens}</>;
}

function formatLogLine(line: string): React.ReactNode {
  if (line.startsWith("   ")) {
    return <span className="text-slate-500">{line}</span>;
  }

  const parts = line.split(" | ");
  if (parts.length >= 2) {
    const badge = parts[0];
    const rest = parts.slice(1).join(" | ");
    
    let badgeClass = "log-badge-debug";
    if (badge.includes("INFO")) badgeClass = "log-badge-info";
    if (badge.includes("WARN")) badgeClass = "log-badge-warn";
    if (badge.includes("ERROR")) badgeClass = "log-badge-error";

    return (
      <span className="flex items-baseline gap-2 flex-wrap">
        <span className={`log-badge ${badgeClass}`}>{badge}</span>
        <span className="text-slate-600">|</span>
        <span>{rest}</span>
      </span>
    );
  }

  return line;
}
