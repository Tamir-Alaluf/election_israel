"use client";

import { useMemo, useState } from "react";
import type { LeaderComparisonRow } from "@/features/candidates/types/leader-comparison";
import {
  getGovernmentIntegrationsLabel,
  getLeaderComparisonFilters,
} from "@/features/candidates/types/filter-config";

export function useLeaderComparisonFilters(
  searchQuery: string,
  leaders: LeaderComparisonRow[],
  partyOptions: { value: string; label: string }[],
) {
  const [partyFilter, setPartyFilter] = useState<string[]>([]);
  const [securityFilter, setSecurityFilter] = useState<string[]>([]);
  const [economyFilter, setEconomyFilter] = useState<string[]>([]);
  const [leadershipStyleFilter, setLeadershipStyleFilter] = useState<string[]>(
    [],
  );
  const [governmentIntegrationsFilter, setGovernmentIntegrationsFilter] =
    useState<string[]>([]);

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
    leaders,
  ]);

  const leaderFilterConfigs = useMemo(
    () =>
      getLeaderComparisonFilters({
        partyOptions,
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
      partyOptions,
      partyFilter,
      securityFilter,
      economyFilter,
      leadershipStyleFilter,
      governmentIntegrationsFilter,
    ],
  );

  return { filteredLeaders, leaderFilterConfigs };
}
