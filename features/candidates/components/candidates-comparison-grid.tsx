"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import type { CandidateComparisonRow } from "@/lib/types/candidates";
import {
  ComparisonScaffold,
  type ComparisonGridRow,
  useComparisonState,
} from "@/components/shared/data-display";
// Dialog replaced by /candidates/[name] — kept for easy restore
// import { LeaderDialog } from "@/features/candidates/components/dialog";
import { useLeaderComparisonFilters } from "@/lib/hooks/use-leader-comparison-filters";

type LeaderComparisonGridProps = {
  leaders: CandidateComparisonRow[];
};

export function LeaderComparisonGrid({ leaders }: LeaderComparisonGridProps) {
  const router = useRouter();
  const { searchQuery, setSearchQuery } =
    useComparisonState<CandidateComparisonRow>();
  const { filteredLeaders, leaderFilterConfigs } = useLeaderComparisonFilters(
    searchQuery,
    leaders,
  );

  const rows: ComparisonGridRow[] = useMemo(
    () =>
      filteredLeaders.map((leader) => ({
        id: leader.id,
        title: leader.name,
        subtitle: leader.partyName,
        image: leader.image ?? "",
        onClick: () =>
          router.push(`/candidates/${encodeURIComponent(leader.name)}`),
      })),
    [filteredLeaders, router],
  );

  return (
    <>
      <ComparisonScaffold
        searchPlaceholder="חיפוש לפי שם מועמד, מפלגה, חבר מפלגה..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={leaderFilterConfigs}
        resultsText={`${filteredLeaders.length} מועמדים`}
        emptyMessage="לא נמצאו מועמדים התואמים את הסינון"
        rows={rows}
      />

      {/*
      <LeaderDialog
        leader={selectedLeader}
        open={!!selectedLeader}
        onClose={closeLeader}
      />
      */}
    </>
  );
}
