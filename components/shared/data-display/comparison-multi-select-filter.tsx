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
          {filter.options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={(event) => {
                event.preventDefault();
                const isSelected = filter.values.includes(option.value);
                if (!isSelected) {
                  filter.onValuesChange([...filter.values, option.value]);
                  return;
                }
                filter.onValuesChange(
                  filter.values.filter((value) => value !== option.value),
                );
              }}
              className="max-md:focus:bg-transparent"
            >
              <span
                className={`inline-flex h-8 items-center rounded-full border px-4 text-sm transition-colors ${
                  filter.values.includes(option.value)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground"
                }`}
              >
                {option.label}
              </span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
