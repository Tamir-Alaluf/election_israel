"use client";

import { useMemo } from "react";
import type {
  PartyComparisonRow,
  PartyPageFilterMeta,
} from "@/lib/data/party-comparison";
import {
  ComparisonScaffold,
  type ComparisonGridRow,
  useComparisonState,
} from "@/components/shared/data-display";
import { PartyDialog } from "@/features/parties/components/dialog";
import { usePartyComparisonFilters } from "@/features/parties/components/use-party-comparison-filters";

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
