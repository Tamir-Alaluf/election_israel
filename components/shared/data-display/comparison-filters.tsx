"use client";

import type { Filter } from "@/components/shared/data-display/types";
import { ComparisonSearchBox } from "@/components/shared/data-display/comparison-search-box";
import { ComparisonLawFilter } from "@/components/shared/data-display/comparison-law-filter";
import { ComparisonMultiSelectFilter } from "@/components/shared/data-display/comparison-multi-select-filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ComparisonFilters({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  filters,
  resultsText,
}: {
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters: Filter[];
  resultsText: string;
}) {
  return (
    <div className="space-y-3 mb-6">
      <ComparisonSearchBox
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={onSearchChange}
      />

      <div className="grid grid-cols-2 gap-2">
        {filters.map((filter) => {
          if ("lawFilter" in filter && filter.lawFilter) {
            return <ComparisonLawFilter key={filter.key} filter={filter} />;
          }

          if ("multiSelect" in filter && filter.multiSelect) {
            return (
              <ComparisonMultiSelectFilter key={filter.key} filter={filter} />
            );
          }

          if ("value" in filter && "onValueChange" in filter) {
            return (
              <Select
                key={filter.key}
                value={filter.value}
                onValueChange={filter.onValueChange}
              >
                <SelectTrigger className="glass-card border-0 text-sm">
                  <SelectValue placeholder={filter.placeholder} />
                </SelectTrigger>
                <SelectContent dir="rtl">
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }

          return null;
        })}
      </div>

      <p className="text-xs text-muted-foreground">{resultsText}</p>
    </div>
  );
}
