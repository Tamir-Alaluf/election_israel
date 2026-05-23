"use client";

import { useMemo, useState } from "react";
import type { CandidateComparisonRow } from "@/lib/types/candidates";
import { getLeaderComparisonFilters } from "@/lib/utils/candidates-filters";

export function useLeaderComparisonFilters(
  searchQuery: string,
  leaders: CandidateComparisonRow[],
) {
  const [securityFilter, setSecurityFilter] = useState<string[]>([]);
  const [economyFilter, setEconomyFilter] = useState<string[]>([]);
  const [professionalBackgroundFilter, setProfessionalBackgroundFilter] =
    useState<string[]>([]);
  const [blocFilter, setBlocFilter] = useState<string[]>([]);

  const filteredLeaders = useMemo(() => {
    return leaders.filter((leader) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !leader.name.toLowerCase().includes(query) &&
          !leader.partyName.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      if (
        securityFilter.length > 0 &&
        !securityFilter.includes(leader.values.securityApproach.value)
      ) {
        return false;
      }
      if (
        economyFilter.length > 0 &&
        !economyFilter.includes(leader.values.economicApproach.value)
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
      if (
        blocFilter.length > 0 &&
        !blocFilter.includes(leader.values.bloc.value)
      ) {
        return false;
      }
      return true;
    });
  }, [
    searchQuery,
    securityFilter,
    economyFilter,
    professionalBackgroundFilter,
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
        blocFilter,
        setBlocFilter,
      }),
    [securityFilter, economyFilter, professionalBackgroundFilter, blocFilter],
  );

  return { filteredLeaders, leaderFilterConfigs };
}
