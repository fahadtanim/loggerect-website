import { Suspense } from "react";
import { DocsContent } from "@/components/docs/DocsContent";

export default function DocsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
          <div className="text-[var(--text-secondary)]">Loading...</div>
        </div>
      }
    >
      <DocsContent />
    </Suspense>
  );
}
