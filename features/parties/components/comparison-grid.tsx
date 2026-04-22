"use client";

import { useState, useMemo } from "react";
import { parties, partyCategories } from "@/lib/election-data";
import {
  ComparisonEmptyState,
  ComparisonFilters,
  ComparisonGrid,
} from "@/components/shared/data-display/comparison-shared";
import { getPartyComparisonFilters } from "@/features/parties/components/comparison-filters";
import { PartyCard } from "@/features/parties/components/card";
import { PartyDialog } from "@/features/parties/components/dialog";

export function PartyComparisonGrid() {
  const [selectedParty, setSelectedParty] = useState<
    (typeof parties)[0] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
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

  return (
    <>
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

      <ComparisonGrid>
        {filteredParties.map((party) => (
          <PartyCard
            key={party.id}
            party={party}
            onClick={() => setSelectedParty(party)}
          />
        ))}
      </ComparisonGrid>

      {filteredParties.length === 0 && (
        <ComparisonEmptyState message="לא נמצאו מפלגות התואמות את הסינון" />
      )}

      <PartyDialog
        party={selectedParty}
        open={!!selectedParty}
        onClose={() => setSelectedParty(null)}
      />
    </>
  );
}
