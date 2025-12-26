"use client";

import { useLogger, useLifecycleLogger } from "@/lib/logger";

export default function Footer() {
  const log = useLogger("Footer");
  useLifecycleLogger("Footer");

  const handleLinkClick = (linkName: string, url: string) => {
    log.info("Footer link clicked", { link: linkName, url });
  };

  return (
    <footer className="relative z-10 bg-[#12121a] border-t border-white/5 py-16">
      <div className="max-w-xl mx-auto px-6 text-center">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 text-2xl font-bold mb-4">
          <span className="text-3xl">🟩</span>
          <span>logrect</span>
        </div>
        
        <p className="text-slate-400 mb-8">The React logger that gets you.</p>
        
        {/* Links */}
        <div className="flex justify-center gap-8 mb-8">
          <a
            href="https://github.com/yourusername/logrect"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-green-400 transition-colors"
            onClick={() => handleLinkClick("GitHub", "https://github.com/yourusername/logrect")}
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/logrect"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-green-400 transition-colors"
            onClick={() => handleLinkClick("npm", "https://www.npmjs.com/package/logrect")}
          >
            npm
          </a>
          <a
            href="#docs"
            className="text-slate-400 hover:text-green-400 transition-colors"
            onClick={() => handleLinkClick("Documentation", "#docs")}
          >
            Documentation
          </a>
        </div>
        
        {/* Copyright */}
        <p className="text-slate-500 text-sm">
          MIT License • Made with ❤️ for React developers
        </p>
      </div>
    </footer>
  );
}
