"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import ConsoleDemo from "./ConsoleDemo";
import { useLogger, useLifecycleLogger, useTimer } from "loggerect/hooks";

export default function Hero() {
  const log = useLogger("Hero");
  useLifecycleLogger("Hero");
  const { measure } = useTimer("Hero");
  
  const [copied, setCopied] = useState(false);

  const copyInstall = useCallback(async () => {
    log.info("Copy button clicked");
    
    await measure("copyToClipboard", async () => {
      await navigator.clipboard.writeText("npm install loggerect");
    });
    
    log.debug("Text copied to clipboard", { text: "npm install loggerect" });
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
      log.debug("Copy indicator hidden");
    }, 2000);
  }, [log, measure]);

  const handleExamplesClick = () => {
    log.info("See Examples button clicked");
  };

  return (
    <header className="relative z-10 min-h-screen grid lg:grid-cols-2 gap-12 items-center px-6 pt-24 pb-16 max-w-7xl mx-auto">
      <div className="max-w-xl lg:max-w-none">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-sm text-green-400 mb-8 animate-fade-in-up"
          style={{ animationDelay: "0s" }}
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-dot" />
          Now with TypeScript Decorators & Source Tracking
        </div>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="block">React & Node.js Logging</span>
          <span className="block gradient-text">That Actually Works</span>
        </h1>

        {/* Description */}
        <p
          className="text-lg text-slate-400 mb-8 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          A powerful, zero-dependency logger for React and Node.js with full source path tracking,
          TypeScript decorators, and environment-aware output. See exactly where
          your logs come from with accurate file:line references.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <button
            onClick={copyInstall}
            className="relative inline-flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-[#0a0a0f] font-semibold rounded-xl btn-glow hover:-translate-y-0.5 transition-all"
          >
            <span className="text-xl">📦</span>
            npm install loggerect
            {copied && (
              <span className="absolute right-4 bg-[#0a0a0f] text-white text-xs px-2 py-1 rounded animate-fade-in">
                Copied!
              </span>
            )}
          </button>
          <Link
            href="/docs"
            onClick={handleExamplesClick}
            className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#1a1a25] border border-white/10 text-white font-semibold rounded-xl hover:border-green-500 hover:bg-[#16161f] transition-all"
          >
            <span className="text-xl">📚</span>
            Documentation
          </Link>
        </div>

        {/* Stats */}
        <div
          className="flex gap-10 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-green-400 font-mono">0</span>
            <span className="text-sm text-slate-500">Dependencies</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-green-400 font-mono">&lt;5kb</span>
            <span className="text-sm text-slate-500">Gzipped</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-green-400 font-mono">100%</span>
            <span className="text-sm text-slate-500">TypeScript</span>
          </div>
        </div>
        
      </div>

      {/* Console Demo */}
      <div className="animate-fade-in-right" style={{ animationDelay: "0.3s" }}>
        <ConsoleDemo />
      </div>
    </header>
  );
}
