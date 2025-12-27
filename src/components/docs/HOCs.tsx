import { CodeBlock } from "./CodeBlock";

export function HOCs() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">
          Higher-Order Components
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)]">
          Wrap your components with logging capabilities using HOCs.
        </p>
      </div>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          withLogger
        </h2>
        <p className="text-[var(--text-secondary)]">
          Basic HOC for adding logging to any component.
        </p>
        <CodeBlock
          code={`import { withLogger } from "loggerect";

const MyComponent = ({ name }) => <div>Hello {name}</div>;

// Basic usage
export default withLogger(MyComponent);

// With options
export default withLogger(MyComponent, {
  trackRenders: true,
  trackPropChanges: true,
  logLifecycle: true,
  displayName: "MyAwesomeComponent",
  level: "debug",
  tags: ["ui", "feature"],
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          withLoggerRef
        </h2>
        <p className="text-[var(--text-secondary)]">
          HOC that forwards refs while adding logging.
        </p>
        <CodeBlock
          code={`import { withLoggerRef } from "loggerect";
import { forwardRef } from "react";

const Input = forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

export default withLoggerRef(Input, {
  displayName: "LoggedInput",
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          withErrorLogger
        </h2>
        <p className="text-[var(--text-secondary)]">
          HOC that catches and logs component errors.
        </p>
        <CodeBlock
          code={`import { withErrorLogger } from "loggerect";

const RiskyComponent = () => {
  // This component might throw errors
  return <div>...</div>;
};

export default withErrorLogger(RiskyComponent, {
  fallback: <div>Something went wrong</div>,
  onError: (error, errorInfo) => {
    // Custom error handling
  },
});`}
        />
      </section>

      <section className="space-y-3 sm:space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
          HOC Options
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border-medium)]">
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-[var(--text-primary)]">Option</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-[var(--text-primary)]">Type</th>
                <th className="py-2 px-2 sm:py-3 sm:px-4 text-[var(--text-primary)]">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-secondary)]">
              {[
                ["trackRenders", "boolean", "Track component renders"],
                ["trackPropChanges", "boolean", "Log when props change"],
                ["logLifecycle", "boolean", "Log mount/unmount"],
                ["displayName", "string", "Custom component name"],
                ["level", "LogLevel", "Log level for this component"],
                ["tags", "string[]", "Tags for filtering logs"],
              ].map(([option, type, desc]) => (
                <tr
                  key={option}
                  className="border-b border-[var(--border-subtle)]"
                >
                  <td className="py-2 px-2 sm:py-3 sm:px-4 font-mono text-[var(--accent-green)]">
                    {option}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4 font-mono text-[var(--accent-purple)]">
                    {type}
                  </td>
                  <td className="py-2 px-2 sm:py-3 sm:px-4">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}