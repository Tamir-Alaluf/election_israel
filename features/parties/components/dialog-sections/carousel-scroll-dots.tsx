"use client";

import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils/utils";

export function CarouselScrollDots({
  api,
  count,
}: {
  api: CarouselApi | null;
  count: number;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api || count <= 1) return;
    const sync = () => setSelectedIndex(api.selectedScrollSnap());
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api, count]);

  if (count <= 1) return null;

  return (
    <div
      className="flex justify-center gap-1.5 pt-3"
      role="status"
      aria-live="polite"
      aria-label={`עמוד ${selectedIndex + 1} מתוך ${count}`}
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-all",
            i === selectedIndex
              ? "scale-125 bg-primary"
              : "bg-muted-foreground/30",
          )}
        />
      ))}
    </div>
  );
}
