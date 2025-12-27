import { CodeBlock } from "./CodeBlock";

export function Decorators() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
          TypeScript Decorators
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)]">
          Use decorators for elegant logging in class components and services.
        </p>
        <div className="mt-4 p-4 rounded-lg bg-[var(--accent-yellow)]/10 border border-[var(--accent-yellow)]/30">
          <p className="text-[var(--accent-yellow)]">
            ⚠️ Requires{" "}
            <code className="font-mono">experimentalDecorators: true</code> in
            tsconfig.json
          </p>
        </div>
      </div>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          @Log Decorator
        </h2>
        <p className="text-[var(--text-secondary)]">
          Log method calls with arguments and timing.
        </p>
        <CodeBlock
          code={`import { Log } from "loggerect";

class UserService {
  @Log()
  async fetchUser(id: string) {
    // Logs: → fetchUser() { args: ["123"] }
    // Logs: ← fetchUser() (156.78ms)
    return await api.getUser(id);
  }

  @Log({ logArgs: false, logTime: true })
  processData(data: any) {
    // Custom options
  }
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          @LogClass Decorator
        </h2>
        <p className="text-[var(--text-secondary)]">
          Apply logging to all methods in a class.
        </p>
        <CodeBlock
          code={`import { LogClass } from "loggerect";

@LogClass()
class MyService {
  methodA() { /* logged */ }
  methodB() { /* logged */ }
  methodC() { /* logged */ }
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Level-Specific Decorators
        </h2>
        <CodeBlock
          code={`import { Debug, Info, Warn, Error, Trace } from "loggerect";

class MyService {
  @Trace()
  detailedMethod() { /* ... */ }

  @Debug()
  debugMethod() { /* ... */ }

  @Info()
  infoMethod() { /* ... */ }

  @Warn()
  warnMethod() { /* ... */ }

  @Error()
  errorMethod() { /* ... */ }
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          All Available Decorators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {[
            { dec: "@Log", desc: "General method logging" },
            { dec: "@LogClass", desc: "Log all class methods" },
            { dec: "@LogLifecycle", desc: "React lifecycle logging" },
            { dec: "@LogRender", desc: "Render method logging" },
            { dec: "@LogState", desc: "State change logging" },
            { dec: "@LogErrors", desc: "Error boundary logging" },
            { dec: "@LogAsync", desc: "Async method logging" },
            { dec: "@LogDebounced", desc: "Debounced method logging" },
            { dec: "@LogThrottled", desc: "Throttled method logging" },
            { dec: "@LogWhen", desc: "Conditional logging" },
          ].map((item) => (
            <div
              key={item.dec}
              className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]"
            >
              <code className="text-[var(--accent-cyan)] font-mono">
                {item.dec}
              </code>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}