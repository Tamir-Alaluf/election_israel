"use client";

import { useCallback, useMemo, useState } from "react";

const MIN_COMPARE = 2;
const MAX_COMPARE = 3;

export function useCandidateCompareSelection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggle = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= MAX_COMPARE) {
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  const isSelected = useCallback(
    (id: string) => selectedIds.includes(id),
    [selectedIds],
  );

  const isFull = selectedIds.length >= MAX_COMPARE;
  const canCompare = selectedIds.length >= MIN_COMPARE;

  return useMemo(
    () => ({
      selectedIds,
      toggle,
      isSelected,
      isFull,
      canCompare,
      minCompare: MIN_COMPARE,
      maxCompare: MAX_COMPARE,
    }),
    [selectedIds, toggle, isSelected, isFull, canCompare],
  );
}
