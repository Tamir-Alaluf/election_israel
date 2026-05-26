"use client";

import type { CompareParamId } from "@/lib/constants/compare";
import type { CandidateComparisonRow } from "@/lib/types/candidates";
import { CompareCandidatePanel } from "@/features/compare/components/compare-candidate-panel";

export function CompareSplitLayout({
  leaders,
  activeParamId,
}: {
  leaders: CandidateComparisonRow[];
  activeParamId: CompareParamId;
}) {
  const [first, second, third] = leaders;

  if (!first || !second) {
    return null;
  }

  if (leaders.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-3">
        <CompareCandidatePanel leader={first} activeParamId={activeParamId} />
        <CompareCandidatePanel leader={second} activeParamId={activeParamId} />
      </div>
    );
  }

  if (!third) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <CompareCandidatePanel leader={first} activeParamId={activeParamId} />
        <CompareCandidatePanel leader={second} activeParamId={activeParamId} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <CompareCandidatePanel leader={third} activeParamId={activeParamId} />
        <div aria-hidden />
      </div>
    </div>
  );
}
