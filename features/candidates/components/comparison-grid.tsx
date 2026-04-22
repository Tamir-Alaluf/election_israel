"use client";

import { useMemo, useState } from "react";
import { leaders } from "@/lib/election-data";
import {
  ComparisonFilters,
  ComparisonProfileCard,
  ComparisonScaffold,
  type ComparisonListItem,
  useComparisonState,
} from "@/components/shared/data-display";
import { LeaderDialog } from "@/features/candidates/components/dialog";
import {
  getGovernmentIntegrationsLabel,
  getLeaderComparisonFilters,
} from "@/features/candidates/components/comparison-filters";

export function LeaderComparisonGrid() {
  const {
    searchQuery,
    setSearchQuery,
    selectedItem: selectedLeader,
    openItem: openLeader,
    closeItem: closeLeader,
  } = useComparisonState<(typeof leaders)[0]>();
  const [partyFilter, setPartyFilter] = useState<string[]>([]);
  const [securityFilter, setSecurityFilter] = useState<string[]>([]);
  const [economyFilter, setEconomyFilter] = useState<string[]>([]);
  const [leadershipStyleFilter, setLeadershipStyleFilter] = useState<string[]>(
    [],
  );
  const [governmentIntegrationsFilter, setGovernmentIntegrationsFilter] =
    useState<string[]>([]);

  const leaderFilters = useMemo(
    () =>
      getLeaderComparisonFilters({
        partyFilter,
        setPartyFilter,
        securityFilter,
        setSecurityFilter,
        economyFilter,
        setEconomyFilter,
        leadershipStyleFilter,
        setLeadershipStyleFilter,
        governmentIntegrationsFilter,
        setGovernmentIntegrationsFilter,
      }),
    [
      partyFilter,
      securityFilter,
      economyFilter,
      leadershipStyleFilter,
      governmentIntegrationsFilter,
    ],
  );

  const filteredLeaders = useMemo(() => {
    return leaders.filter((leader) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !leader.name.toLowerCase().includes(query) &&
          !leader.party.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      if (partyFilter.length > 0 && !partyFilter.includes(leader.party)) {
        return false;
      }
      if (
        securityFilter.length > 0 &&
        !securityFilter.includes(leader.values.securityApproach)
      ) {
        return false;
      }
      if (
        economyFilter.length > 0 &&
        !economyFilter.includes(leader.values.economicApproach)
      ) {
        return false;
      }
      if (
        leadershipStyleFilter.length > 0 &&
        !leadershipStyleFilter.includes(leader.values.leadershipStyle)
      ) {
        return false;
      }
      const governmentIntegrations = getGovernmentIntegrationsLabel({
        harediGov: leader.values.harediGov,
        arabGov: leader.values.arabGov,
      });
      if (
        governmentIntegrationsFilter.length > 0 &&
        !governmentIntegrationsFilter.includes(governmentIntegrations)
      ) {
        return false;
      }
      return true;
    });
  }, [
    searchQuery,
    partyFilter,
    securityFilter,
    economyFilter,
    leadershipStyleFilter,
    governmentIntegrationsFilter,
  ]);

  const leaderCards: Array<{
    item: ComparisonListItem;
    leader: (typeof leaders)[0];
  }> = useMemo(
    () =>
      filteredLeaders.map((leader) => ({
        item: {
          id: leader.id,
          title: leader.name,
          subtitle: leader.party,
          image: leader.image,
        },
        leader,
      })),
    [filteredLeaders],
  );

  return (
    <>
      <ComparisonScaffold
        filters={
          <ComparisonFilters
            searchPlaceholder="חיפוש לפי שם מועמד או מפלגה..."
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            filters={leaderFilters}
            resultsText={`${filteredLeaders.length} מועמדים`}
          />
        }
        hasResults={filteredLeaders.length > 0}
        emptyMessage="לא נמצאו מועמדים התואמים את הסינון"
      >
        {leaderCards.map(({ item, leader }) => (
          <ComparisonProfileCard
            key={item.id}
            image={item.image}
            name={item.title}
            subtitle={item.subtitle}
            onClick={() => openLeader(leader)}
          />
        ))}
      </ComparisonScaffold>

      <LeaderDialog
        leader={selectedLeader}
        open={!!selectedLeader}
        onClose={closeLeader}
      />
    </>
  );
}
