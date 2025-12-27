"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  GettingStarted,
  Configuration,
  DirectLoggerUsage,
  Hooks,
  HOCs,
  Decorators,
  Plugins,
  PerformanceMeasurement,
  APIReference,
} from "../../components/docs";

type Section =
  | "getting-started"
  | "configuration"
  | "direct-logger"
  | "hooks"
  | "hocs"
  | "decorators"
  | "plugins"
  | "performance"
  | "api";

const sections: { id: Section; title: string; icon: string }[] = [
  { id: "getting-started", title: "Getting Started", icon: "🚀" },
  { id: "configuration", title: "Configuration", icon: "⚙️" },
  { id: "direct-logger", title: "Direct Logger Usage", icon: "📝" },
  { id: "hooks", title: "React Hooks", icon: "🪝" },
  { id: "hocs", title: "Higher-Order Components", icon: "🎁" },
  { id: "decorators", title: "Decorators", icon: "🎨" },
  { id: "plugins", title: "Build Plugins", icon: "🔌" },
  { id: "performance", title: "Performance Measurement", icon: "⏱️" },
  { id: "api", title: "API Reference", icon: "📚" },
];

export function DocsContent() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section");
  const urlSection: Section | null =
    sectionParam && sections.some((s) => s.id === sectionParam)
      ? (sectionParam as Section)
      : null;
  const [activeSection, setActiveSection] = useState<Section>(
    urlSection || "getting-started"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync with URL changes
  useEffect(() => {
    if (urlSection && urlSection !== activeSection) {
      setActiveSection(urlSection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionParam]);

  // Close sidebar when section changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-6 h-6 text-[var(--text-primary)]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {sidebarOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-green)] to-[var(--accent-cyan)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                loggerect
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              href="/"
              className="hidden sm:block text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm sm:text-base"
            >
              Home
            </Link>
            <Link
              href="/docs"
              className="hidden sm:block text-[var(--accent-green)] font-medium text-sm sm:text-base"
            >
              Docs
            </Link>
            <a
              href="https://github.com/fahadtanim/loggerect"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm sm:text-base"
            >
              <span className="hidden sm:inline">GitHub</span>
              <svg
                className="w-5 h-5 sm:hidden"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.npmjs.com/package/loggerect"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-2 rounded-lg bg-[var(--accent-green)] text-black font-semibold hover:bg-[var(--accent-green)]/90 transition-colors text-sm sm:text-base"
            >
              npm
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex pt-16 sm:pt-20">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static left-0 top-16 sm:top-20 bottom-0 w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-secondary)]/95 lg:bg-[var(--bg-secondary)]/50 overflow-y-auto z-40 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
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
                  <span className="font-medium text-sm sm:text-base">
                    {section.title}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full lg:ml-64 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
          {activeSection === "getting-started" && <GettingStarted />}
          {activeSection === "configuration" && <Configuration />}
          {activeSection === "direct-logger" && <DirectLoggerUsage />}
          {activeSection === "hooks" && <Hooks />}
          {activeSection === "hocs" && <HOCs />}
          {activeSection === "decorators" && <Decorators />}
          {activeSection === "plugins" && <Plugins />}
          {activeSection === "performance" && <PerformanceMeasurement />}
          {activeSection === "api" && <APIReference />}
        </main>
      </div>
    </div>
  );
}

