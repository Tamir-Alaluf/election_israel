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

type LawFilterConfig = Extract<Filter, { lawFilter: true }>;

export function ComparisonLawFilter({ filter }: { filter: LawFilterConfig }) {
  const selectedCount = Object.values(filter.lawStances).filter(
    (value) => value === "בעד" || value === "נגד",
  ).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="glass-card border-0 text-sm justify-between w-full text-foreground hover:text-foreground"
        >
          <span>
            {filter.placeholder}
            {selectedCount > 0 ? ` (${selectedCount})` : ""}
          </span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-96 overflow-y-auto"
        align="start"
      >
        <div dir="rtl">
          <DropdownMenuItem onClick={filter.onClearAll}>
            נקה חוקים
          </DropdownMenuItem>
          {filter.lawOptions.map((law) => {
            const selectedStance = filter.lawStances[law.id] ?? "";

            return (
              <div
                key={law.id}
                className="px-2 py-2 border-t border-border/30 first:border-t-0 text-right"
              >
                <p className="text-xs text-foreground mb-2 leading-relaxed">
                  {law.label}
                </p>
                <div className="flex flex-row-reverse justify-end gap-2">
                  <Button
                    type="button"
                    variant={selectedStance === "בעד" ? "default" : "outline"}
                    size="sm"
                    className="h-8"
                    onClick={() => filter.onLawStanceChange(law.id, "בעד")}
                  >
                    בעד
                  </Button>
                  <Button
                    type="button"
                    variant={selectedStance === "נגד" ? "default" : "outline"}
                    size="sm"
                    className="h-8"
                    onClick={() => filter.onLawStanceChange(law.id, "נגד")}
                  >
                    נגד
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
