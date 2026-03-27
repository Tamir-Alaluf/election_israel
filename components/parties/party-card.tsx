"use client";

import { parties } from "@/lib/election-data";
import { ComparisonProfileCard } from "@/components/general/comparison-shared";

export function PartyCard({
  party,
  onClick,
}: {
  party: (typeof parties)[0];
  onClick: () => void;
}) {
  return (
    <ComparisonProfileCard
      image={party.image}
      name={party.name}
      subtitle={party.leader}
      onClick={onClick}
    />
  );
}
