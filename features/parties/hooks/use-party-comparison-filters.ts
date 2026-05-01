"use client";

import { useMemo, useState } from "react";
import type {
  PartyComparisonRow,
  PartyPageFilterMeta,
} from "@/features/parties/types/party-comparison";
import { getPartyComparisonFilters } from "@/features/parties/types/filter-config";

export function usePartyComparisonFilters(
  searchQuery: string,
  parties: PartyComparisonRow[],
  filterMeta: PartyPageFilterMeta,
) {
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [securityFilter, setSecurityFilter] = useState<string[]>([]);
  const [economyFilter, setEconomyFilter] = useState<string[]>([]);
  const [lawFilters, setLawFilters] = useState<Record<string, string>>({});

  const typeTitle = filterMeta.typeBaseTopic.title;
  const securityTitle = filterMeta.securityBaseTopic.title;
  const economyTitle = filterMeta.economyBaseTopic.title;

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
      if (typeFilter.length > 0) {
        const v = party.baseTopicByTitle[typeTitle];
        if (!v || !typeFilter.includes(v)) return false;
      }
      if (securityFilter.length > 0) {
        const v = party.baseTopicByTitle[securityTitle];
        if (!v || !securityFilter.includes(v)) return false;
      }
      if (economyFilter.length > 0) {
        const v = party.baseTopicByTitle[economyTitle];
        if (!v || !economyFilter.includes(v)) return false;
      }

      for (const issue of filterMeta.lawIssues) {
        const selectedStance = lawFilters[issue.id];
        if (!selectedStance) continue;
        if (party.legislationById[issue.id] !== selectedStance) {
          return false;
        }
      }

      return true;
    });
  }, [
    searchQuery,
    typeFilter,
    securityFilter,
    economyFilter,
    lawFilters,
    parties,
    typeTitle,
    securityTitle,
    economyTitle,
    filterMeta.lawIssues,
  ]);

  const partyFilterConfigs = useMemo(
    () =>
      getPartyComparisonFilters({
        filterMeta,
        typeFilter,
        setTypeFilter,
        securityFilter,
        setSecurityFilter,
        economyFilter,
        setEconomyFilter,
        lawFilters,
        setLawFilters,
      }),
    [
      filterMeta,
      typeFilter,
      securityFilter,
      economyFilter,
      lawFilters,
    ],
  );

  return { filteredParties, partyFilterConfigs };
}
