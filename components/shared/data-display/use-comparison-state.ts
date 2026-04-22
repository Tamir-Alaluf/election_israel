"use client";

import { useState } from "react";

export function useComparisonState<TItem>() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<TItem | null>(null);

  const openItem = (item: TItem) => setSelectedItem(item);
  const closeItem = () => setSelectedItem(null);

  return {
    searchQuery,
    setSearchQuery,
    selectedItem,
    setSelectedItem,
    openItem,
    closeItem,
  };
}
