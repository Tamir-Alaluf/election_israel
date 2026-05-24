"use client";

import { useState } from "react";
import { ValueBadge } from "@/lib/constants/style";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";
import { CarouselScrollDots } from "@/features/parties/components/dialog-sections/carousel-scroll-dots";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { LegislationItem } from "@/lib/types/shared";

export function LeaderLegislationsContent({
  legislations,
}: {
  legislations: LegislationItem[];
}) {
  const [api, setApi] = useState<CarouselApi | null>(null);

  if (legislations.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">אין מידע להצגה כרגע.</p>
    );
  }

  const groups = new Map<string, LegislationItem[]>();
  for (const item of legislations) {
    const group = item.legislation.group;
    const existing = groups.get(group);
    if (existing) {
      existing.push(item);
    } else {
      groups.set(group, [item]);
    }
  }

  const slides = Array.from(groups.entries());

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "start", direction: "rtl", containScroll: "trimSnaps" }}
      className="w-full max-w-full overflow-hidden"
    >
      <CarouselContent className="-ml-0">
        {slides.map(([group, items]) => (
          <CarouselItem key={group} className="pl-0">
            <div className="space-y-2">
              <p className="mb-1 mt-2 text-xs font-semibold text-primary">
                {group}
              </p>
              {items.map((item) => (
                <div
                  key={item.legislation.title}
                  className="flex items-center justify-between border-b border-border/30 px-1 py-2 last:border-0"
                >
                  <span className="min-w-0 flex-1 break-words text-sm text-muted-foreground">
                    {item.legislation.title}
                  </span>
                  <div className="shrink-0">
                    <ValueBadge value={item.option} />
                  </div>
                </div>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselScrollDots api={api} count={slides.length} />
    </Carousel>
  );
}

export function LeaderLegislationsSection({
  legislations,
}: {
  legislations: LegislationItem[];
}) {
  return (
    <SectionShell title="סוגיות" withSurface={false}>
      <LeaderLegislationsContent legislations={legislations} />
    </SectionShell>
  );
}
