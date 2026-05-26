"use client";

import { ComparisonImage } from "@/components/shared/data-display/comparison-image";
import type { CompareParamId } from "@/lib/constants/compare";
import type { CandidateComparisonRow } from "@/lib/types/candidates";
import { renderLeaderCompareContent } from "@/features/candidates/components/leader-section-content";

export function CompareCandidatePanel({
  leader,
  activeParamId,
}: {
  leader: CandidateComparisonRow;
  activeParamId: CompareParamId;
}) {
  return (
    <div className="flex min-h-0 flex-col rounded-xl border border-border/50 bg-card/50">
      <header className="flex shrink-0 items-center gap-2 border-b border-border/40 px-3 py-2.5">
        <ComparisonImage
          src={leader.image ?? ""}
          alt={leader.name}
          sizeClassName="h-10 w-10 shrink-0"
          sizes="40px"
        />
        <div className="min-w-0 text-start">
          <p className="truncate text-sm font-semibold text-foreground">
            {leader.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {leader.partyName}
          </p>
        </div>
      </header>
      <div className="min-h-[40vh] max-h-[50vh] overflow-y-auto px-3 py-3 leading-relaxed text-muted-foreground">
        {renderLeaderCompareContent(activeParamId, leader)}
      </div>
    </div>
  );
}
