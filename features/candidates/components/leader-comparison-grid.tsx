"use client";

import { useMemo } from "react";
import type { LeaderComparisonRow } from "@/lib/types/candidates";
import {
  ComparisonScaffold,
  type ComparisonGridRow,
  useComparisonState,
} from "@/components/shared/data-display";
import { LeaderDialog } from "@/features/candidates/components/dialog";
import { useLeaderComparisonFilters } from "@/lib/hooks/use-leader-comparison-filters";

type LeaderComparisonGridProps = {
  leaders: LeaderComparisonRow[];
};

export function LeaderComparisonGrid({ leaders }: LeaderComparisonGridProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedItem: selectedLeader,
    openItem: openLeader,
    closeItem: closeLeader,
  } = useComparisonState<LeaderComparisonRow>();
  const { filteredLeaders, leaderFilterConfigs } = useLeaderComparisonFilters(
    searchQuery,
    leaders,
  );

  const rows: ComparisonGridRow[] = useMemo(
    () =>
      filteredLeaders.map((leader) => ({
        id: leader.id,
        title: leader.name,
        subtitle: leader.party,
        image: leader.image ?? "",
        onClick: () => openLeader(leader),
      })),
    [filteredLeaders, openLeader],
  );

  return (
    <>
      <ComparisonScaffold
        searchPlaceholder="חיפוש לפי שם מועמד או מפלגה..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={leaderFilterConfigs}
        resultsText={`${filteredLeaders.length} מועמדים`}
        emptyMessage="לא נמצאו מועמדים התואמים את הסינון"
        rows={rows}
      />

      <LeaderDialog
        leader={selectedLeader}
        open={!!selectedLeader}
        onClose={closeLeader}
      />
    </>
  );
}
