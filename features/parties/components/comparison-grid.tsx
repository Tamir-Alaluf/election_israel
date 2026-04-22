"use client";

import { useMemo, useState } from "react";
import { parties, partyCategories } from "@/lib/election-data";
import {
  ComparisonFilters,
  ComparisonProfileCard,
  ComparisonScaffold,
  type ComparisonListItem,
  useComparisonState,
} from "@/components/shared/data-display";
import { getPartyComparisonFilters } from "@/features/parties/components/comparison-filters";
import { PartyDialog } from "@/features/parties/components/dialog";

export function PartyComparisonGrid() {
  const {
    searchQuery,
    setSearchQuery,
    selectedItem: selectedParty,
    openItem: openParty,
    closeItem: closeParty,
  } = useComparisonState<(typeof parties)[0]>();
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [securityFilter, setSecurityFilter] = useState<string[]>([]);
  const [economyFilter, setEconomyFilter] = useState<string[]>([]);
  const [lawFilters, setLawFilters] = useState<Record<string, string>>({});

  const filteredParties = useMemo(() => {
    return parties.filter((party) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !party.name.toLowerCase().includes(query) &&
          !party.leader.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      if (typeFilter.length > 0 && !typeFilter.includes(party.values.type)) {
        return false;
      }
      if (
        securityFilter.length > 0 &&
        !securityFilter.includes(party.values.security)
      ) {
        return false;
      }
      if (
        economyFilter.length > 0 &&
        !economyFilter.includes(party.values.economy)
      ) {
        return false;
      }

      for (const issue of partyCategories.issues.parameters) {
        const selectedStance = lawFilters[issue.id];
        if (!selectedStance) continue;
        if (
          party.values[issue.id as keyof typeof party.values] !== selectedStance
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, typeFilter, securityFilter, economyFilter, lawFilters]);

  const partyCards: Array<{
    item: ComparisonListItem;
    party: (typeof parties)[0];
  }> = useMemo(
    () =>
      filteredParties.map((party) => ({
        item: {
          id: party.id,
          title: party.name,
          subtitle: party.leader,
          image: party.image,
        },
        party,
      })),
    [filteredParties],
  );

  return (
    <>
      <ComparisonScaffold
        filters={
          <ComparisonFilters
            searchPlaceholder="חיפוש לפי שם מפלגה או מועמד..."
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            filters={getPartyComparisonFilters({
              typeFilter,
              setTypeFilter,
              securityFilter,
              setSecurityFilter,
              economyFilter,
              setEconomyFilter,
              lawFilters,
              setLawFilters,
            })}
            resultsText={`${filteredParties.length} מפלגות`}
          />
        }
        hasResults={filteredParties.length > 0}
        emptyMessage="לא נמצאו מפלגות התואמות את הסינון"
      >
        {partyCards.map(({ item, party }) => (
          <ComparisonProfileCard
            key={item.id}
            image={item.image}
            name={item.title}
            subtitle={item.subtitle}
            onClick={() => openParty(party)}
          />
        ))}
      </ComparisonScaffold>

      <PartyDialog
        party={selectedParty}
        open={!!selectedParty}
        onClose={closeParty}
      />
    </>
  );
}
