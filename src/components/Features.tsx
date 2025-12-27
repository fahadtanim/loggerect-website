"use client";

import { useLogger, useLifecycleLogger } from "loggerect/hooks";

const features = [
  {
    icon: "📍",
    title: "Source Path Tracking",
    description:
      "See exact file paths and line numbers in development. Know exactly where every log comes from.",
    code: "@ src/components/UserProfile.tsx:42",
  },
  {
    icon: "🎯",
    title: "TypeScript Decorators",
    description:
      "Beautiful decorator syntax for class components. Just add @Log() and you're done.",
    code: "@Log() handleClick() { ... }",
  },
  {
    icon: "🔄",
    title: "HOC Support",
    description:
      "Higher-Order Components for functional components. Wrap once, log everything.",
    code: "withLogger(MyComponent)",
  },
  {
    icon: "🎣",
    title: "React Hooks",
    description:
      "Comprehensive hooks for functional components. useLogger, useStateLogger, and more.",
    code: "const log = useLogger('MyComponent')",
    featured: true,
  },
  {
    icon: "🌍",
    title: "Environment Aware",
    description:
      "Automatic dev/prod detection. Full details in development, minimal in production.",
    code: 'environment: "auto"',
  },
  {
    icon: "⚡",
    title: "Performance Tracking",
    description:
      "Built-in timing and measurement. Track render times, async operations, and more.",
    code: "logger.measure('fetch', async () => ...)",
  },
  {
    icon: "🔍",
    title: "Why Did You Render",
    description:
      "Identify exactly why components re-rendered. Track prop and state changes.",
    code: "useWhyDidYouRender('Component', props)",
  },
  {
    icon: "🎨",
    title: "Beautiful Output",
    description:
      "Styled console output with colors, badges, and grouped logs. Easy to scan and understand.",
    code: 'format: "pretty"',
  },
];

export default function Features() {
  const log = useLogger("Features");
  useLifecycleLogger("Features");

  const handleFeatureHover = (title: string) => {
    log.trace("Feature card hovered", { feature: title });
  };

  const handleFeatureClick = (title: string) => {
    log.info("Feature card clicked", { feature: title });
  };

  return (
    <section id="features" className="relative z-10 bg-[#12121a] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-500/10 text-green-400 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            Everything You Need for
            <br />
            <span className="gradient-text">Better Debugging</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-[#16161f] transition-all duration-300 rounded-2xl p-6 border border-blue-500/30 hover:-translate-y-1 hover:shadow-lg cursor-pointer hover:border-green-500/30 hover:bg-linear-to-br hover:from-green-500/10 hover:to-cyan-500/5 bg-linear-to-br from-blue-500/10 to-cyan-500/5 ${
                feature.featured
                  ? "border-green-500/30 bg-linear-to-br from-green-500/10 to-cyan-500/5"
                  : ""
              }`}
              onMouseEnter={() => handleFeatureHover(feature.title)}
              onClick={() => handleFeatureClick(feature.title)}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm mb-4">
                {feature.description}
              </p>
              <code className="inline-block font-mono text-xs bg-[#0d0d12] px-3 py-1.5 rounded text-cyan-400">
                {feature.code}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
