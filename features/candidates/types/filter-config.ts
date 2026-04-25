"use client";

import type { Dispatch, SetStateAction } from "react";

type SetStringArrayState = Dispatch<SetStateAction<string[]>>;

export function getGovernmentIntegrationsLabel({
  harediGov,
  arabGov,
}: {
  harediGov: string;
  arabGov: string;
}): string {
  const includeHaredi = harediGov === "כן" || harediGov === "חלקי";
  const includeArab = arabGov === "כן" || arabGov === "חלקי";

  if (includeHaredi && includeArab) return "גם חרדים וגם ערבים";
  if (includeHaredi) return "חרדים בלבד";
  if (includeArab) return "ערבים בלבד";
  return "ללא שילובים";
}

export function getLeaderComparisonFilters({
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
}: {
  partyOptions: { value: string; label: string }[];
  partyFilter: string[];
  setPartyFilter: SetStringArrayState;
  securityFilter: string[];
  setSecurityFilter: SetStringArrayState;
  economyFilter: string[];
  setEconomyFilter: SetStringArrayState;
  leadershipStyleFilter: string[];
  setLeadershipStyleFilter: SetStringArrayState;
  governmentIntegrationsFilter: string[];
  setGovernmentIntegrationsFilter: SetStringArrayState;
}) {
  return [
    {
      key: "party",
      values: partyFilter,
      onValuesChange: setPartyFilter,
      placeholder: "מפלגה",
      multiSelect: true as const,
      allLabel: "כל המפלגות",
      options: partyOptions,
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
      key: "leadershipStyle",
      values: leadershipStyleFilter,
      onValuesChange: setLeadershipStyleFilter,
      placeholder: "סגנון מנהיגות",
      multiSelect: true as const,
      options: [
        { value: "סמכותית", label: "סמכותית" },
        { value: "תקשורתית", label: "תקשורתית" },
        { value: "ממלכתית", label: "ממלכתית" },
        { value: "עממית", label: "עממית" },
        { value: "ערכית", label: "ערכית" },
        { value: "שמרנית", label: "שמרנית" },
      ],
    },
    {
      key: "governmentIntegrations",
      values: governmentIntegrationsFilter,
      onValuesChange: setGovernmentIntegrationsFilter,
      placeholder: "שילובים בממשלה",
      multiSelect: true as const,
      options: [
        { value: "גם חרדים וגם ערבים", label: "גם חרדים וגם ערבים" },
        { value: "חרדים בלבד", label: "חרדים בלבד" },
        { value: "ערבים בלבד", label: "ערבים בלבד" },
        { value: "ללא שילובים", label: "ללא שילובים" },
      ],
    },
  ];
}
