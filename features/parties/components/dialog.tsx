"use client";

import { useEffect, useState } from "react";
import {
  type PartyComparisonRow,
  type PartyListRow,
  type PartyPageFilterMeta,
} from "@/features/parties/types/party-comparison";
import { ComparisonDialogShell } from "@/components/shared/data-display";
import { Skeleton } from "@/components/ui/skeleton";
import { PartyDialogSections } from "@/features/parties/components/dialog-sections";

// Loading placeholder shown while party details are fetched.
function PartyDialogBodySkeleton() {
  return (
    <div className="mt-1 space-y-4" aria-busy>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export function PartyDialog({
  party,
  filterMeta,
  open,
  onClose,
}: {
  party: PartyListRow | null;
  filterMeta: PartyPageFilterMeta;
  open: boolean;
  onClose: () => void;
}) {
  const [detail, setDetail] = useState<PartyComparisonRow | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch full party details whenever a party is opened in the dialog.
  useEffect(() => {
    if (!open || !party) {
      setDetail(null);
      setLoading(false);
      setError(null);
      return;
    }
    const ac = new AbortController();
    setLoading(true);
    setError(null);
    setDetail(null);
    fetch(`/api/parties/${party.id}`, { signal: ac.signal })
      .then((r) => {
        if (r.status === 404) throw new Error("לא נמצא");
        if (!r.ok) throw new Error("שגיאה בטעינת הפרטים");
        return r.json() as Promise<PartyComparisonRow>;
      })
      .then((data) => {
        setDetail(data);
      })
      .catch((e: unknown) => {
        if (e instanceof Error && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "שגיאה בטעינה");
      })
      .finally(() => {
        setLoading(false);
      });
    return () => ac.abort();
  }, [open, party?.id]);

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
      {error && (
        <p className="text-sm text-destructive text-center" role="alert">
          {error}
        </p>
      )}
      {loading && <PartyDialogBodySkeleton />}
      {detail && !error && (
        <PartyDialogSections party={detail} filterMeta={filterMeta} />
      )}
    </ComparisonDialogShell>
  );
}
