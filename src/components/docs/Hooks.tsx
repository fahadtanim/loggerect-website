import { CodeBlock } from "./CodeBlock";

export function Hooks() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
          React Hooks
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)]">
          Powerful hooks for logging in functional components with automatic
          lifecycle tracking.
        </p>
      </div>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          useLogger
        </h2>
        <p className="text-[var(--text-secondary)]">
          Creates a component-scoped logger instance.
        </p>
        <CodeBlock
          code={`import { useLogger } from "loggerect";

function MyComponent() {
  const log = useLogger("MyComponent");
  
  useEffect(() => {
    log.info("Component ready");
    log.debug("Fetching data...", { endpoint: "/api/users" });
  }, []);
  
  return <div>Hello</div>;
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          useLifecycleLogger
        </h2>
        <p className="text-[var(--text-secondary)]">
          Automatically logs component mount and unmount events.
        </p>
        <CodeBlock
          code={`import { useLifecycleLogger } from "loggerect";

function MyComponent() {
  useLifecycleLogger("MyComponent");
  // Logs: 🚀 Mounted (on mount)
  // Logs: 💤 Unmounted (lifetime: 5234.12ms) (on unmount)
  
  return <div>Hello</div>;
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          useStateLogger
        </h2>
        <p className="text-[var(--text-secondary)]">
          useState replacement that logs state changes.
        </p>
        <CodeBlock
          code={`import { useStateLogger } from "loggerect";

function Counter() {
  const [count, setCount] = useStateLogger("Counter", "count", 0);
  // Logs: 🗃️ State "count" changed { prev: 0, next: 1 }
  
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          useRenderLogger
        </h2>
        <p className="text-[var(--text-secondary)]">
          Tracks and logs every render with timing.
        </p>
        <CodeBlock
          code={`import { useRenderLogger } from "loggerect";

function MyComponent() {
  useRenderLogger("MyComponent");
  // Logs: 🎨 Render #1 (2.34ms)
  // Logs: 🎨 Render #2 (1.12ms)
  
  return <div>Hello</div>;
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          useEffectLogger
        </h2>
        <p className="text-[var(--text-secondary)]">
          useEffect replacement that logs effect execution.
        </p>
        <CodeBlock
          code={`import { useEffectLogger } from "loggerect";

function DataFetcher({ userId }) {
  useEffectLogger(
    "DataFetcher",
    "fetchUser",
    () => {
      fetchUser(userId);
    },
    [userId]
  );
  // Logs: ▶️ Effect "fetchUser" running
  // Logs: ⏹️ Effect "fetchUser" cleanup
  
  return <div>...</div>;
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          useTimer
        </h2>
        <p className="text-[var(--text-secondary)]">
          Manual performance timing within components.
        </p>
        <CodeBlock
          code={`import { useTimer } from "loggerect";

function DataLoader() {
  const timer = useTimer("DataLoader");
  
  const loadData = async () => {
    timer.start("loadData");
    const data = await fetchData();
    timer.end("loadData"); // Logs: ⏱️ loadData: 234.56ms
    return data;
  };
  
  return <button onClick={loadData}>Load</button>;
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          All Available Hooks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {[
            { hook: "useLogger", desc: "Component-scoped logger" },
            { hook: "useLifecycleLogger", desc: "Mount/unmount logging" },
            { hook: "useRenderLogger", desc: "Render tracking" },
            { hook: "useStateLogger", desc: "State change logging" },
            { hook: "usePropChangeLogger", desc: "Prop change detection" },
            { hook: "useEffectLogger", desc: "Effect execution logging" },
            { hook: "useCallbackLogger", desc: "Callback execution logging" },
            { hook: "useMemoLogger", desc: "Memo computation logging" },
            { hook: "useTimer", desc: "Performance timing" },
            { hook: "useWhyDidYouRender", desc: "Re-render debugging" },
          ].map((item) => (
            <div
              key={item.hook}
              className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]"
            >
              <code className="text-[var(--accent-green)] font-mono">
                {item.hook}
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