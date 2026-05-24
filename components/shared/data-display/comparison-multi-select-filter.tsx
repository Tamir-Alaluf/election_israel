"use client";

import { ChevronDown } from "lucide-react";
import type { Filter } from "@/components/shared/data-display/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MultiSelectFilterConfig = Extract<Filter, { multiSelect: true }>;

export function ComparisonMultiSelectFilter({
  filter,
}: {
  filter: MultiSelectFilterConfig;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="glass-card border-0 text-sm justify-between w-full text-foreground hover:text-foreground"
        >
          <span>
            {filter.placeholder}
            {filter.values.length > 0 ? ` (${filter.values.length})` : ""}
          </span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
        <div dir="rtl">
          {filter.allLabel ? (
            <DropdownMenuItem onClick={() => filter.onValuesChange([])}>
              {filter.allLabel}
            </DropdownMenuItem>
          ) : null}
          {filter.options.map((option) => {
            const isSelected = filter.values.includes(option.value);

            return (
              <div
                key={option.value}
                className="px-2 py-1.5 flex justify-start text-right"
              >
                <Button
                  type="button"
                  size="sm"
                  variant={isSelected ? "default" : "outline"}
                  aria-pressed={isSelected}
                  className={`h-8 rounded-full px-4 text-sm ${
                    isSelected
                      ? ""
                      : "border-border bg-background text-foreground hover:bg-background hover:text-foreground"
                  }`}
                  onClick={() => {
                    if (!isSelected) {
                      filter.onValuesChange([...filter.values, option.value]);
                      return;
                    }
                    filter.onValuesChange(
                      filter.values.filter((value) => value !== option.value),
                    );
                  }}
                >
                  {option.label}
                </Button>
              </div>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
