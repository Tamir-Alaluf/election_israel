"use client";

import type {
  PartyComparisonRow,
  PartyPageFilterMeta,
} from "@/lib/types/party-comparison";
import { ComparisonDialogShell } from "@/components/shared/data-display";
import { PartyDialogSections } from "@/features/parties/components/dialog-sections";

export function PartyDialog({
  party,
  filterMeta,
  open,
  onClose,
}: {
  party: PartyComparisonRow | null;
  filterMeta: PartyPageFilterMeta;
  open: boolean;
  onClose: () => void;
}) {
  if (!party) return null;

  return (
    <ComparisonDialogShell
      open={open}
      onClose={onClose}
      image={party.image ?? ""}
      title={party.name}
      subtitle={party.leader}
      contentClassName="scrollbar-hide"
    >
      <PartyDialogSections party={party} filterMeta={filterMeta} />
    </ComparisonDialogShell>
  );
}
