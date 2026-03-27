"use client";

import type { Dispatch, SetStateAction } from "react";

type SetStringState = Dispatch<SetStateAction<string>>;

export function getPartyComparisonFilters({
  typeFilter,
  setTypeFilter,
  securityFilter,
  setSecurityFilter,
  economyFilter,
  setEconomyFilter,
  harediGovFilter,
  setHarediGovFilter,
}: {
  typeFilter: string;
  setTypeFilter: SetStringState;
  securityFilter: string;
  setSecurityFilter: SetStringState;
  economyFilter: string;
  setEconomyFilter: SetStringState;
  harediGovFilter: string;
  setHarediGovFilter: SetStringState;
}) {
  return [
    {
      key: "type",
      value: typeFilter,
      onValueChange: setTypeFilter,
      placeholder: "סוג מפלגה",
      options: [
        { value: "all", label: "כל הסוגים" },
        { value: "חרדים", label: "חרדים" },
        { value: "ערבים", label: "ערבים" },
        { value: "חילוניים", label: "חילוניים" },
        { value: "מעורב", label: "מעורב" },
      ],
    },
    {
      key: "security",
      value: securityFilter,
      onValueChange: setSecurityFilter,
      placeholder: "עמדה ביטחונית",
      options: [
        { value: "all", label: "כל העמדות" },
        { value: "ימין", label: "ימין" },
        { value: "מרכז", label: "מרכז" },
        { value: "שמאל", label: "שמאל" },
      ],
    },
    {
      key: "economy",
      value: economyFilter,
      onValueChange: setEconomyFilter,
      placeholder: "עמדה כלכלית",
      options: [
        { value: "all", label: "כל העמדות" },
        { value: "קפיטליסט", label: "קפיטליסט" },
        { value: "סוציאליסט", label: "סוציאליסט" },
        { value: "מעורב", label: "מעורב" },
      ],
    },
    {
      key: "harediGov",
      value: harediGovFilter,
      onValueChange: setHarediGovFilter,
      placeholder: "שילוב חרדים",
      options: [
        { value: "all", label: "הכל" },
        { value: "כן", label: "כן" },
        { value: "לא", label: "לא" },
        { value: "חלקי", label: "חלקי" },
      ],
    },
  ];
}
