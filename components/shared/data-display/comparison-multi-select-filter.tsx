"use client";

import { ChevronDown } from "lucide-react";
import type { FilterConfig } from "@/components/shared/data-display/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MultiSelectFilterConfig = Extract<FilterConfig, { multiSelect: true }>;

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
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={filter.values.includes(option.value)}
              onSelect={(event) => event.preventDefault()}
              onCheckedChange={(checked) => {
                const isChecked = checked === true;
                if (isChecked) {
                  filter.onValuesChange([...filter.values, option.value]);
                  return;
                }
                filter.onValuesChange(
                  filter.values.filter((value) => value !== option.value),
                );
              }}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
