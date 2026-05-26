"use client";

import { Check } from "lucide-react";
import { ComparisonImage } from "@/components/shared/data-display/comparison-image";
import { cn } from "@/lib/utils/utils";
import type { CandidateComparisonRow } from "@/lib/types/candidates";

type ComparePickerGridProps = {
  leaders: CandidateComparisonRow[];
  isSelected: (id: string) => boolean;
  isFull: boolean;
  onToggle: (id: string) => void;
};

export function ComparePickerGrid({
  leaders,
  isSelected,
  isFull,
  onToggle,
}: ComparePickerGridProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {leaders.map((leader) => {
        const selected = isSelected(leader.id);
        const disabled = isFull && !selected;

        return (
          <button
            key={leader.id}
            type="button"
            aria-pressed={selected}
            aria-label={`${selected ? "הסר" : "בחר"} ${leader.name}`}
            aria-disabled={disabled}
            disabled={disabled}
            onClick={() => onToggle(leader.id)}
            className={cn(
              "relative flex flex-col items-center gap-1.5 rounded-lg p-2 transition-all",
              selected && "ring-2 ring-primary",
              disabled && "pointer-events-none opacity-50",
              !disabled && "hover:bg-muted/50",
            )}
          >
            {selected ? (
              <span className="absolute start-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-2.5 w-2.5" aria-hidden />
              </span>
            ) : null}
            <ComparisonImage
              src={leader.image ?? ""}
              alt={leader.name}
              sizeClassName="h-10 w-10"
              sizes="40px"
            />
            <span className="line-clamp-2 text-center text-xs font-medium text-foreground">
              {leader.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
