"use client";

import { useLogger, useLifecycleLogger } from "@/lib/logger";

const devFeatures = [
  "Full source paths with line numbers",
  "Detailed stack traces on errors",
  "Render tracking with timing",
  "Prop and state change detection",
  "Colored, grouped output",
  "Performance measurements",
];

const prodFeatures = [
  "Component names only",
  "Minimal output (warn/error)",
  "No performance overhead",
  "No source path exposure",
  "JSON format for log aggregation",
  "Custom transports for monitoring",
];

export default function Comparison() {
  const log = useLogger("Comparison");
  useLifecycleLogger("Comparison");

  const handleCardHover = (mode: "development" | "production") => {
    log.trace("Comparison card hovered", { mode });
  };

  return (
    <section className="relative z-10 bg-[#12121a] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Why logrect?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            Development vs
            <br />
            <span className="gradient-text">Production</span>
          </h2>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Development Card */}
          <div
            className="bg-[#16161f] rounded-2xl p-8 border border-green-500/30 hover:border-green-500/50 transition-colors"
            onMouseEnter={() => handleCardHover("development")}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl">🛠️</span>
              <h3 className="text-2xl font-bold">Development Mode</h3>
            </div>
            <ul className="space-y-4">
              {devFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 text-slate-400 border-b border-white/5 pb-4 last:border-0"
                >
                  <span className="text-green-400 font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Production Card */}
          <div
            className="bg-[#16161f] rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500/50 transition-colors"
            onMouseEnter={() => handleCardHover("production")}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl">🚀</span>
              <h3 className="text-2xl font-bold">Production Mode</h3>
            </div>
            <ul className="space-y-4">
              {prodFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 text-slate-400 border-b border-white/5 pb-4 last:border-0"
                >
                  <span className="text-purple-400 font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
