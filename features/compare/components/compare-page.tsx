"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";
import {
  COMPARE_PARAMETER_DEFS,
  type CompareParamId,
} from "@/lib/constants/compare";
import { useCandidateCompareSelection } from "@/lib/hooks/use-candidate-compare-selection";
import type { CandidateComparisonRow } from "@/lib/types/candidates";
import { CompareParameterBar } from "@/features/compare/components/compare-parameter-bar";
import { ComparePickerGrid } from "@/features/compare/components/compare-picker-grid";
import { CompareSplitLayout } from "@/features/compare/components/compare-split-layout";

type ComparePhase = "select" | "compare";

export function ComparePage({ leaders }: { leaders: CandidateComparisonRow[] }) {
  const [phase, setPhase] = useState<ComparePhase>("select");
  const [activeParamId, setActiveParamId] = useState<CompareParamId>(
    COMPARE_PARAMETER_DEFS[0].id,
  );
  const { selectedIds, toggle, isSelected, isFull, canCompare } =
    useCandidateCompareSelection();

  const selectedLeaders = useMemo(
    () =>
      selectedIds
        .map((id) => leaders.find((leader) => leader.id === id))
        .filter((leader): leader is CandidateComparisonRow => leader != null),
    [selectedIds, leaders],
  );

  const widthClass = phase === "select" ? "max-w-md" : "max-w-xl";

  if (phase === "select") {
    return (
      <div className={cn("mx-auto w-full space-y-6", widthClass)}>
        <h1 className="text-center text-xl font-bold text-foreground">
          בחר מועמדים להשוואה
        </h1>
        <ComparePickerGrid
          leaders={leaders}
          isSelected={isSelected}
          isFull={isFull}
          onToggle={toggle}
        />
        <Button
          type="button"
          className="w-full"
          disabled={!canCompare}
          onClick={() => setPhase("compare")}
        >
          להשוואה
          <ChevronDown className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("mx-auto w-full space-y-4", widthClass)}>
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-lg font-bold text-foreground">השוואת מועמדים</h1>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setPhase("select")}
        >
          שנה מועמדים
        </Button>
      </div>
      <CompareParameterBar
        activeParamId={activeParamId}
        onParamChange={setActiveParamId}
      />
      <CompareSplitLayout
        leaders={selectedLeaders}
        activeParamId={activeParamId}
      />
    </div>
  );
}
