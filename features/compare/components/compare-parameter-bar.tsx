"use client";

import { cn } from "@/lib/utils/utils";
import {
  COMPARE_PARAMETER_DEFS,
  type CompareParamId,
} from "@/lib/constants/compare";

export function CompareParameterBar({
  activeParamId,
  onParamChange,
}: {
  activeParamId: CompareParamId;
  onParamChange: (id: CompareParamId) => void;
}) {
  return (
    <div
      className="sticky top-12 z-40 -mx-1 bg-background/95 pb-2 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      role="tablist"
      aria-label="פרמטרי השוואה"
    >
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-min gap-2 px-0.5">
          {COMPARE_PARAMETER_DEFS.map((param) => (
            <button
              key={param.id}
              type="button"
              role="tab"
              aria-selected={activeParamId === param.id}
              onClick={() => onParamChange(param.id)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                activeParamId === param.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {param.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
