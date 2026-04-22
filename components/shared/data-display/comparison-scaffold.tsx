import type { ReactNode } from "react";
import { ComparisonEmptyState } from "@/components/shared/data-display/comparison-empty-state";
import { ComparisonGrid } from "@/components/shared/data-display/comparison-grid";

export function ComparisonScaffold({
  filters,
  hasResults,
  emptyMessage,
  children,
}: {
  filters: ReactNode;
  hasResults: boolean;
  emptyMessage: string;
  children: ReactNode;
}) {
  return (
    <>
      {filters}
      <ComparisonGrid>{children}</ComparisonGrid>
      {!hasResults && <ComparisonEmptyState message={emptyMessage} />}
    </>
  );
}
