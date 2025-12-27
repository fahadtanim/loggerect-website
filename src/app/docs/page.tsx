import { Suspense } from "react";
import { logger } from "loggerect";
import { DocsContent } from "@/components/docs/DocsContent";

export default async function DocsPage() {
  // Logger is now SSR-safe - can be used directly in server components
  const log = logger
    .forComponent("DocsPage")
    .withTags("server", "docs", "page");

  log.info("Rendering docs page");

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-(--bg-primary) flex items-center justify-center">
          <div className="text-(--text-secondary)">Loading...</div>
        </div>
      }
    >
      <DocsContent />
    </Suspense>
  );
}
