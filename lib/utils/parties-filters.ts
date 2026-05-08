"use client";

import type { Dispatch, SetStateAction } from "react";
import type { PartyPageFilterMeta } from "@/lib/types/parties";

type SetStringArrayState = Dispatch<SetStateAction<string[]>>;
type SetLawFiltersState = Dispatch<SetStateAction<Record<string, string>>>;

export function getPartyComparisonFilters({
  filterMeta,
  typeFilter,
  setTypeFilter,
  securityFilter,
  setSecurityFilter,
  economyFilter,
  setEconomyFilter,
  lawFilters,
  setLawFilters,
}: {
  filterMeta: PartyPageFilterMeta;
  typeFilter: string[];
  setTypeFilter: SetStringArrayState;
  securityFilter: string[];
  setSecurityFilter: SetStringArrayState;
  economyFilter: string[];
  setEconomyFilter: SetStringArrayState;
  lawFilters: Record<string, string>;
  setLawFilters: SetLawFiltersState;
}) {
  return [
    {
      key: "type",
      values: typeFilter,
      onValuesChange: setTypeFilter,
      placeholder: "סוג מפלגה",
      multiSelect: true as const,
      options: filterMeta.typeBaseTopic.options,
    },
    {
      key: "security",
      values: securityFilter,
      onValuesChange: setSecurityFilter,
      placeholder: "עמדה ביטחונית",
      multiSelect: true as const,
      options: filterMeta.securityBaseTopic.options,
    },
    {
      key: "economy",
      values: economyFilter,
      onValuesChange: setEconomyFilter,
      placeholder: "עמדה כלכלית",
      multiSelect: true as const,
      options: filterMeta.economyBaseTopic.options,
    },
    {
      key: "laws",
      placeholder: "חוקים",
      lawFilter: true as const,
      lawStances: lawFilters,
      lawOptions: filterMeta.lawIssues.map((issue) => ({
        id: issue.id,
        label: issue.label,
      })),
      onLawStanceChange: (lawId: string, stance: string) => {
        setLawFilters((prev) => {
          if (prev[lawId] === stance) {
            const { [lawId]: _removed, ...rest } = prev;
            return rest;
          }

          return { ...prev, [lawId]: stance };
        });
      },
      onClearAll: () => setLawFilters({}),
    },
  ];
}
