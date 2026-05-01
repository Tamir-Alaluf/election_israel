"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type {
  PartyComparisonRow,
  PartyPageFilterMeta,
} from "@/features/parties/types/party-comparison";
import {
  ComparisonScaffold,
  type ComparisonGridRow,
  useComparisonState,
} from "@/components/shared/data-display";
import { usePartyComparisonFilters } from "@/features/parties/hooks/use-party-comparison-filters";

const PartyDialog = dynamic(
  () =>
    import("@/features/parties/components/dialog").then((m) => ({
      default: m.PartyDialog,
    })),
  { ssr: false },
);

type PartyComparisonGridProps = {
  parties: PartyComparisonRow[];
  filterMeta: PartyPageFilterMeta;
};

export function PartyComparisonGrid({
  parties,
  filterMeta,
}: PartyComparisonGridProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedItem: selectedParty,
    openItem: openParty,
    closeItem: closeParty,
  } = useComparisonState<PartyComparisonRow>();
  const { filteredParties, partyFilterConfigs } = usePartyComparisonFilters(
    searchQuery,
    parties,
    filterMeta,
  );

  const rows: ComparisonGridRow[] = useMemo(
    () =>
      filteredParties.map((party) => ({
        id: party.id,
        title: party.name,
        subtitle: party.leader,
        image: party.image ?? "",
        onClick: () => openParty(party),
      })),
    [filteredParties, openParty],
  );

  return (
    <>
      <ComparisonScaffold
        searchPlaceholder="חיפוש לפי שם מפלגה או מועמד..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={partyFilterConfigs}
        resultsText={`${filteredParties.length} מפלגות`}
        emptyMessage="לא נמצאו מפלגות התואמות את הסינון"
        rows={rows}
      />

      <PartyDialog
        party={selectedParty}
        filterMeta={filterMeta}
        open={!!selectedParty}
        onClose={closeParty}
      />
    </>
  );
}
