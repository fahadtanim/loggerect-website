import { CodeBlock } from "./CodeBlock";

export function PerformanceMeasurement() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
          Performance Measurement
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)]">
          Measure and track performance across your React application with
          comprehensive timing tools and automatic performance tracking.
        </p>
      </div>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Core Logger Timing
        </h2>
        <p className="text-[var(--text-secondary)]">
          Use the core logger to measure execution time of any operation:
        </p>
        <CodeBlock
          code={`import { logger } from "loggerect";

// Basic timing
logger.time("fetchData");
await fetchData();
logger.timeEnd("fetchData"); 
// Logs: ⏱️ fetchData: 156.78ms

// With metadata
logger.time("processUser", { userId: 123 });
await processUser();
logger.timeEnd("processUser");
// Logs: ⏱️ processUser: 234.56ms { userId: 123 }

// Measure async functions automatically
const result = await logger.measure("fetchData", async () => {
  return await fetch("/api/data").then(r => r.json());
});
// Automatically logs timing and returns the result`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          useTimer Hook
        </h2>
        <p className="text-[var(--text-secondary)]">
          Component-scoped timer for measuring operations within React
          components:
        </p>
        <CodeBlock
          code={`import { useTimer } from "loggerect/hooks";

function DataLoader() {
  const { time, timeEnd, measure } = useTimer("DataLoader");
  
  // Manual timing
  const loadData = async () => {
    time("loadData");
    const data = await fetchData();
    timeEnd("loadData"); // Logs: ⏱️ loadData: 234.56ms
    return data;
  };
  
  // Automatic measurement
  const processData = async () => {
    const result = await measure("processData", async () => {
      return await heavyComputation();
    });
    // Automatically logs: ⏱️ processData: 123.45ms
    return result;
  };
  
  return (
    <div>
      <button onClick={loadData}>Load Data</button>
      <button onClick={processData}>Process Data</button>
    </div>
  );
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Component Render Tracking
        </h2>
        <p className="text-[var(--text-secondary)]">
          Automatically track render performance and identify slow renders:
        </p>
        <CodeBlock
          code={`import { useRenderLogger } from "loggerect/hooks";

function MyComponent({ data }) {
  useRenderLogger("MyComponent");
  // Logs: 🎨 Render #1 (2.34ms)
  // Logs: 🎨 Render #2 (1.12ms)
  // Logs: 🎨 Render #3 (5.67ms) ⚠️ Slow render!
  
  return <div>{/* ... */}</div>;
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Component Lifecycle Timing
        </h2>
        <p className="text-[var(--text-secondary)]">
          Track how long components stay mounted and identify memory leaks:
        </p>
        <CodeBlock
          code={`import { useLifecycleLogger } from "loggerect/hooks";

function MyComponent() {
  useLifecycleLogger("MyComponent");
  // On mount: 🚀 Mounted
  // On unmount: 💤 Unmounted (lifetime: 5234.12ms)
  
  return <div>Hello</div>;
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Callback Performance
        </h2>
        <p className="text-[var(--text-secondary)]">
          Measure callback execution time, including async callbacks:
        </p>
        <CodeBlock
          code={`import { useCallbackLogger } from "loggerect/hooks";

function MyComponent() {
  const handleClick = useCallbackLogger(
    "MyComponent",
    "handleClick",
    async () => {
      // Logs: 📞 handleClick() called (#1)
      await processData();
      // Logs: ✅ handleClick() resolved (234.56ms)
    },
    []
  );
  
  const handleSync = useCallbackLogger(
    "MyComponent",
    "handleSync",
    () => {
      // Logs: 📞 handleSync() called (#1)
      doSomething();
      // Logs: ✅ handleSync() completed (1.23ms)
    },
    []
  );
  
  return (
    <div>
      <button onClick={handleClick}>Async Action</button>
      <button onClick={handleSync}>Sync Action</button>
    </div>
  );
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Memo Computation Tracking
        </h2>
        <p className="text-[var(--text-secondary)]">
          Track expensive memo computations and identify optimization
          opportunities:
        </p>
        <CodeBlock
          code={`import { useMemoLogger } from "loggerect/hooks";

function ExpensiveComponent({ items }) {
  const sortedItems = useMemoLogger(
    "ExpensiveComponent",
    "sortedItems",
    () => {
      // Logs: 💾 Computing sortedItems...
      return items.sort((a, b) => a.value - b.value);
      // Logs: ✅ sortedItems computed (12.34ms)
    },
    [items]
  );
  
  return <div>{/* ... */}</div>;
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Effect Performance
        </h2>
        <p className="text-[var(--text-secondary)]">
          Measure effect execution time and cleanup performance:
        </p>
        <CodeBlock
          code={`import { useEffectLogger } from "loggerect/hooks";

function DataFetcher({ userId }) {
  useEffectLogger(
    "DataFetcher",
    "fetchUser",
    () => {
      // Logs: ▶️ Effect "fetchUser" running
      const controller = new AbortController();
      
      fetchUser(userId, { signal: controller.signal });
      
      return () => {
        // Logs: ⏹️ Effect "fetchUser" cleanup (1.23ms)
        controller.abort();
      };
    },
    [userId]
  );
  
  return <div>Loading...</div>;
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Performance Measurement with Decorators
        </h2>
        <p className="text-[var(--text-secondary)]">
          Use decorators to automatically measure method execution time:
        </p>
        <CodeBlock
          code={`import { Log } from "loggerect";

class UserService {
  @Log({ logTime: true })
  async fetchUser(id: string) {
    // Logs: → fetchUser() { args: ["123"] }
    const user = await api.getUser(id);
    // Logs: ← fetchUser() (156.78ms)
    return user;
  }
  
  @Log({ logTime: true, logArgs: false })
  processData(data: any) {
    // Logs: → processData()
    // ... processing ...
    // Logs: ← processData() (45.67ms)
  }
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Advanced Performance Patterns
        </h2>
        <p className="text-[var(--text-secondary)]">
          Combine multiple performance measurement techniques for comprehensive
          insights:
        </p>
        <CodeBlock
          code={`import { 
  useLogger, 
  useTimer, 
  useRenderLogger,
  useLifecycleLogger 
} from "loggerect/hooks";

function PerformanceTrackedComponent({ userId }) {
  const log = useLogger("PerformanceTrackedComponent");
  const { measure } = useTimer("PerformanceTrackedComponent");
  useRenderLogger("PerformanceTrackedComponent");
  useLifecycleLogger("PerformanceTrackedComponent");
  
  const loadUserData = async () => {
    // Measure the entire operation
    const data = await measure("loadUserData", async () => {
      log.debug("Starting data fetch", { userId });
      
      // Measure individual steps
      const user = await measure("fetchUser", () => 
        fetch(\`/api/users/\${userId}\`).then(r => r.json())
      );
      
      const posts = await measure("fetchPosts", () => 
        fetch(\`/api/users/\${userId}/posts\`).then(r => r.json())
      );
      
      log.info("Data loaded", { 
        userTime: "measured", 
        postsTime: "measured" 
      });
      
      return { user, posts };
    });
    
    return data;
  };
  
  return <div>{/* ... */}</div>;
}`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Performance Configuration
        </h2>
        <p className="text-[var(--text-secondary)]">
          Configure performance measurement behavior:
        </p>
        <CodeBlock
          code={`import { configure } from "loggerect";

configure({
  // Enable/disable performance tracking
  performance: true,
  
  // Set performance thresholds
  performanceThresholds: {
    slowRender: 16,      // Warn if render > 16ms (60fps)
    slowCallback: 100,   // Warn if callback > 100ms
    slowEffect: 200,     // Warn if effect > 200ms
    slowAsync: 1000,     // Warn if async > 1s
  },
  
  // Track performance metrics
  trackPerformance: true,
  
  // Log performance warnings
  warnOnSlowOperations: true,
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          Performance Best Practices
        </h2>
        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              🎯 Use useRenderLogger to identify slow renders
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Track render times to find components that need optimization.
              Anything over 16ms (60fps threshold) should be investigated.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              ⏱️ Measure async operations with logger.measure()
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Automatically measure async functions to track API calls, data
              processing, and other async operations.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              🔍 Track component lifetime to find memory leaks
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Use useLifecycleLogger to identify components that stay mounted
              longer than expected, which may indicate memory leaks.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              💾 Monitor memo computations
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Use useMemoLogger to ensure your memoized computations are
              actually saving time and not adding overhead.
            </p>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)]">
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">
              📊 Combine multiple measurement techniques
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Use render tracking, lifecycle logging, and manual timing together
              to get a complete picture of your component&apos;s performance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}