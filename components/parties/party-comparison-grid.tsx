"use client";

import { useState, useMemo } from "react";
import { parties } from "@/lib/election-data";
import {
  ComparisonEmptyState,
  ComparisonFilters,
  ComparisonGrid,
} from "@/components/general/comparison-shared";
import { getPartyComparisonFilters } from "@/components/parties/party-comparison-filters";
import { PartyCard } from "@/components/parties/party-card";
import { PartyDialog } from "@/components/parties/party-dialog";

export function PartyComparisonGrid() {
  const [selectedParty, setSelectedParty] = useState<
    (typeof parties)[0] | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [securityFilter, setSecurityFilter] = useState<string>("all");
  const [economyFilter, setEconomyFilter] = useState<string>("all");
  const [harediGovFilter, setHarediGovFilter] = useState<string>("all");

  const filteredParties = useMemo(() => {
    return parties.filter((party) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !party.name.toLowerCase().includes(query) &&
          !party.leader.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      // Type filter
      if (typeFilter !== "all" && party.values.type !== typeFilter) {
        return false;
      }
      // Security filter
      if (
        securityFilter !== "all" &&
        party.values.security !== securityFilter
      ) {
        return false;
      }
      // Economy filter
      if (economyFilter !== "all" && party.values.economy !== economyFilter) {
        return false;
      }
      // Haredi Gov filter
      if (
        harediGovFilter !== "all" &&
        party.values.harediGov !== harediGovFilter
      ) {
        return false;
      }
      return true;
    });
  }, [searchQuery, typeFilter, securityFilter, economyFilter, harediGovFilter]);

  return (
    <>
      <ComparisonFilters
        searchPlaceholder="חיפוש לפי שם מפלגה או מנהיג..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={getPartyComparisonFilters({
          typeFilter,
          setTypeFilter,
          securityFilter,
          setSecurityFilter,
          economyFilter,
          setEconomyFilter,
          harediGovFilter,
          setHarediGovFilter,
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
