"use client";

import { ComparisonEmptyState } from "@/components/shared/data-display/comparison-empty-state";
import { ComparisonFilters } from "@/components/shared/data-display/comparison-filters";
import { ComparisonGrid } from "@/components/shared/data-display/comparison-grid";
import { ComparisonProfileCard } from "@/components/shared/data-display/comparison-profile-card";
import type {
  ComparisonGridRow,
  Filter,
} from "@/components/shared/data-display/types";

export function ComparisonScaffold({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  filters,
  resultsText,
  emptyMessage,
  rows,
}: {
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters: Filter[];
  resultsText: string;
  emptyMessage: string;
  rows: ComparisonGridRow[];
}) {
  const hasResults = rows.length > 0;

  return (
    <>
      <ComparisonFilters
        searchPlaceholder={searchPlaceholder}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        filters={filters}
        resultsText={resultsText}
      />
      <ComparisonGrid>
        {rows.map((row) => (
          <ComparisonProfileCard
            key={row.id}
            image={row.image}
            name={row.title}
            subtitle={row.subtitle}
            onClick={row.onClick}
          />
        ))}
      </ComparisonGrid>
      {!hasResults && <ComparisonEmptyState message={emptyMessage} />}
    </>
  );
}
