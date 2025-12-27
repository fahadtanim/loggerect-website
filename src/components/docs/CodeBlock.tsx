export function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative group">
      <pre className="bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-xl p-3 sm:p-4 overflow-x-auto">
        <code className="text-xs sm:text-sm font-mono text-[var(--text-secondary)]">
          {code}
        </code>
      </pre>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-1 text-xs bg-[var(--bg-tertiary)] text-[var(--text-muted)] rounded opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-[var(--bg-card)]"
      >
        Copy
      </button>
    </div>
  );
}

