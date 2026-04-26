"use client";

import { useMemo, useState } from "react";
import type { LeaderComparisonRow } from "@/features/candidates/types/leader-comparison";
import {
  getGovernmentIntegrationExclusions,
  getLeaderComparisonFilters,
} from "@/features/candidates/types/filter-config";

export function useLeaderComparisonFilters(
  searchQuery: string,
  leaders: LeaderComparisonRow[],
) {
  const [securityFilter, setSecurityFilter] = useState<string[]>([]);
  const [economyFilter, setEconomyFilter] = useState<string[]>([]);
  const [professionalBackgroundFilter, setProfessionalBackgroundFilter] =
    useState<string[]>([]);
  const [governmentIntegrationsFilter, setGovernmentIntegrationsFilter] =
    useState<string[]>([]);
  const [blocFilter, setBlocFilter] = useState<string[]>([]);

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
        professionalBackgroundFilter.length > 0 &&
        !professionalBackgroundFilter.every((selectedGroup) =>
          leader.professionalBackground.some(
            (professional) => professional.groupName === selectedGroup,
          ),
        )
      ) {
        return false;
      }
      const governmentIntegrationExclusions = getGovernmentIntegrationExclusions(
        {
        harediGov: leader.values.harediGov,
        arabGov: leader.values.arabGov,
        },
      );
      if (
        governmentIntegrationsFilter.length > 0 &&
        !governmentIntegrationsFilter.some((filterValue) =>
          governmentIntegrationExclusions.includes(filterValue),
        )
      ) {
        return false;
      }
      if (blocFilter.length > 0 && !blocFilter.includes(leader.values.bloc)) {
        return false;
      }
      return true;
    });
  }, [
    searchQuery,
    securityFilter,
    economyFilter,
    professionalBackgroundFilter,
    governmentIntegrationsFilter,
    blocFilter,
    leaders,
  ]);

  const leaderFilterConfigs = useMemo(
    () =>
      getLeaderComparisonFilters({
        securityFilter,
        setSecurityFilter,
        economyFilter,
        setEconomyFilter,
        professionalBackgroundFilter,
        setProfessionalBackgroundFilter,
        governmentIntegrationsFilter,
        setGovernmentIntegrationsFilter,
        blocFilter,
        setBlocFilter,
      }),
    [
      securityFilter,
      economyFilter,
      professionalBackgroundFilter,
      governmentIntegrationsFilter,
      blocFilter,
    ],
  );

  return { filteredLeaders, leaderFilterConfigs };
}
