"use client";

import type { Dispatch, SetStateAction } from "react";
import { PROFESSIONAL_BACKGROUND_GROUPS } from "@/lib/constants/candidates";

type SetStringArrayState = Dispatch<SetStateAction<string[]>>;

export function getLeaderComparisonFilters({
  securityFilter,
  setSecurityFilter,
  economyFilter,
  setEconomyFilter,
  professionalBackgroundFilter,
  setProfessionalBackgroundFilter,
  blocFilter,
  setBlocFilter,
}: {
  securityFilter: string[];
  setSecurityFilter: SetStringArrayState;
  economyFilter: string[];
  setEconomyFilter: SetStringArrayState;
  professionalBackgroundFilter: string[];
  setProfessionalBackgroundFilter: SetStringArrayState;
  blocFilter: string[];
  setBlocFilter: SetStringArrayState;
}) {
  return [
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
      key: "professionalBackground",
      values: professionalBackgroundFilter,
      onValuesChange: setProfessionalBackgroundFilter,
      placeholder: "רקע מקצועי",
      multiSelect: true as const,
      options: PROFESSIONAL_BACKGROUND_GROUPS.map((group) => ({
        value: group,
        label: group,
      })),
    },
    {
      key: "bloc",
      values: blocFilter,
      onValuesChange: setBlocFilter,
      placeholder: "גוש",
      multiSelect: true as const,
      options: [
        { value: "גוש נתניהו", label: "גוש נתניהו" },
        { value: "גוש אופוזיציה", label: "גוש אופוזיציה" },
        { value: "מפלגות ערביות", label: "מפלגות ערביות" },
      ],
    },
  ];
}
