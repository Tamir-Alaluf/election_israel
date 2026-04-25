"use client";

import type { LeaderComparisonRow } from "@/features/candidates/types/leader-comparison";
import { ComparisonDialogShell } from "@/components/shared/data-display";
import { LeaderDialogSections } from "@/features/candidates/components/dialog-sections";

export function LeaderDialog({
  leader,
  open,
  onClose,
}: {
  leader: LeaderComparisonRow | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!leader) return null;

  return (
    <ComparisonDialogShell
      open={open}
      onClose={onClose}
      image={leader.image ?? ""}
      title={leader.name}
      subtitle={leader.party}
    >
      <LeaderDialogSections leader={leader} />
    </ComparisonDialogShell>
  );
}
