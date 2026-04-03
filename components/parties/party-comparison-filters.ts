"use client";

import type { Dispatch, SetStateAction } from "react";
import { partyCategories } from "@/lib/election-data";

type SetStringArrayState = Dispatch<SetStateAction<string[]>>;
type SetLawFiltersState = Dispatch<SetStateAction<Record<string, string>>>;

export function getPartyComparisonFilters({
  typeFilter,
  setTypeFilter,
  securityFilter,
  setSecurityFilter,
  economyFilter,
  setEconomyFilter,
  lawFilters,
  setLawFilters,
}: {
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
      options: [
        { value: "חרדית", label: "חרדית" },
        { value: "ערבית", label: "ערבית" },
        { value: "חילונית", label: "חילונית" },
      ],
    },
    {
      key: "security",
      values: securityFilter,
      onValuesChange: setSecurityFilter,
      placeholder: "עמדה ביטחונית",
      multiSelect: true as const,
      options: [
        { value: "ימין", label: "ימין" },
        { value: "מרכז ימין", label: "מרכז ימין" },
        { value: "מרכז שמאל", label: "מרכז שמאל" },
        { value: "שמאל", label: "שמאל" },
      ],
    },
    {
      key: "economy",
      values: economyFilter,
      onValuesChange: setEconomyFilter,
      placeholder: "עמדה כלכלית",
      multiSelect: true as const,
      options: [
        { value: "ימין כלכלי", label: "ימין כלכלי" },
        { value: "שמאל כלכלי", label: "שמאל כלכלי" },
        { value: "מרכז", label: "מרכז" },
      ],
    },
    {
      key: "laws",
      placeholder: "חוקים",
      lawFilter: true as const,
      lawStances: lawFilters,
      lawOptions: partyCategories.issues.parameters.map((issue) => ({
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
