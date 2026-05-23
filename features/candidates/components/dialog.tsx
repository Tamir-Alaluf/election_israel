// Dialog replaced by /candidates/[name] — full implementation kept below for easy restore.

/*
"use client";

import type { CandidateComparisonRow } from "@/lib/types/candidates";
import { ComparisonDialogShell } from "@/components/shared/data-display";
import { LeaderDialogSections } from "@/features/candidates/components/dialog-sections";

export function LeaderDialog({
  leader,
  open,
  onClose,
}: {
  leader: CandidateComparisonRow | null;
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
      subtitle={leader.partyName}
    >
      <LeaderDialogSections leader={leader} />
    </ComparisonDialogShell>
  );
}
*/
