"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useLogger, useLifecycleLogger, useTimer } from "loggerect/hooks";

export default function CTA() {
  const log = useLogger("CTA");
  useLifecycleLogger("CTA");
  const { measure } = useTimer("CTA");
  
  const [copied, setCopied] = useState(false);

  const copyInstall = useCallback(async () => {
    log.info("CTA copy button clicked");
    
    await measure("copyToClipboard", async () => {
      await navigator.clipboard.writeText("npm install loggerect");
    });
    
    log.debug("Install command copied to clipboard");
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [log, measure]);

  const handleGitHubClick = () => {
    log.info("GitHub button clicked - opening in new tab");
  };

  return (
    <section className="relative z-10 py-24">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
          Ready to Debug
          <br />
          <span className="gradient-text">Like a Pro?</span>
        </h2>
        <p className="text-lg text-slate-400 mb-10">
          Start using loggerect today and never wonder where a log came from again.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={copyInstall}
            className="relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-[#0a0a0f] font-semibold text-lg rounded-xl btn-glow hover:-translate-y-0.5 transition-all"
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
            onClick={handleGitHubClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/10 text-white font-semibold text-lg rounded-xl hover:border-green-500 hover:bg-[#1a1a25] transition-all"
          >
            Read the Docs
          </Link>
        </div>
      </div>
    </section>
  );
}
