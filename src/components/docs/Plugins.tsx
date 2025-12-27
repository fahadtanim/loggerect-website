import { CodeBlock } from "./CodeBlock";

export function Plugins() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
          Build Plugins
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)]">
          Enable accurate source file:line tracking in the browser console with
          build plugins.
        </p>
      </div>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Vite
        </h2>
        <CodeBlock
          code={`// vite.config.ts
import { defineConfig } from "vite";
import logrectPlugin from "loggerect/vite-plugin";

export default defineConfig({
  plugins: [logrectPlugin()],
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Next.js (Turbopack)
        </h2>
        <CodeBlock
          code={`// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.{ts,tsx,js,jsx}": {
        loaders: ["loggerect/loader"],
      },
    },
  },
};

export default nextConfig;`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Next.js (Webpack)
        </h2>
        <CodeBlock
          code={`// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      const logrectPlugin = require("loggerect/unplugin");
      config.plugins.push(logrectPlugin.webpack());
    }
    return config;
  },
};

export default nextConfig;`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Webpack
        </h2>
        <CodeBlock
          code={`// webpack.config.js
const logrectPlugin = require("loggerect/unplugin");

module.exports = {
  plugins: [logrectPlugin.webpack()],
};`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Rollup
        </h2>
        <CodeBlock
          code={`// rollup.config.js
import logrectPlugin from "loggerect/unplugin";

export default {
  plugins: [logrectPlugin.rollup()],
};`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          esbuild
        </h2>
        <CodeBlock
          code={`// esbuild.config.js
const logrectPlugin = require("loggerect/unplugin");

require("esbuild").build({
  plugins: [logrectPlugin.esbuild()],
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Babel (Alternative)
        </h2>
        <CodeBlock
          code={`// babel.config.js
module.exports = {
  plugins: ["loggerect/babel-plugin"],
};`}
        />
      </section>
    </div>
  );
}