"use client";

import { useState } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { comparisonBadgeClassName } from "@/features/parties/types/value-badge";
import { classForRecentActionCategory } from "@/features/parties/types/recent-action-badges";
import { CarouselScrollDots } from "@/features/parties/components/dialog-sections/carousel-scroll-dots";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";

export type ActionCarouselItem = {
  title: string;
  description: string | null;
  category?: string;
};

export function RecentActionsSection({
  itemId,
  recentItems,
  title = "מה עשו מאז הבחירות האחרונות",
  emptyMessage = "אין מידע להצגה כרגע.",
}: {
  itemId: string;
  recentItems: ActionCarouselItem[];
  title?: string;
  emptyMessage?: string;
}) {
  const [recentActionsApi, setRecentActionsApi] = useState<CarouselApi | null>(
    null,
  );
  const recentSlides = Array.from(
    { length: Math.ceil(recentItems.length / 4) },
    (_, index) => recentItems.slice(index * 4, index * 4 + 4),
  );

  return (
    <SectionShell title={title}>
      {recentItems.length > 0 ? (
        <Carousel
          key={`recent-${itemId}-${title}`}
          setApi={setRecentActionsApi}
          opts={{
            align: "start",
            direction: "rtl",
            containScroll: "trimSnaps",
            slidesToScroll: 1,
          }}
          className="w-full max-w-full overflow-hidden"
        >
          <CarouselContent className="-ml-0">
            {recentSlides.map((slide, slideIndex) => (
              <CarouselItem key={slideIndex} className="pl-0">
                <div className="grid auto-rows-fr grid-cols-2 gap-x-4 gap-y-6 pt-5">
                  {slide.map((item, itemIndex) => {
                    const itemNumber = slideIndex * 4 + itemIndex + 1;
                    return (
                      <div key={`${item.title}-${itemNumber}`} className="pt-1">
                        <div className="relative flex min-h-[172px] flex-col rounded-lg border border-border/40 bg-background/70 text-center">
                          {"category" in item && item.category ? (
                            <Badge
                              variant="outline"
                              className={cn(
                                comparisonBadgeClassName,
                                "max-w-none whitespace-nowrap",
                                "absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 shadow-sm",
                                classForRecentActionCategory(item.category),
                              )}
                            >
                              {item.category}
                            </Badge>
                          ) : null}
                          <div className="flex flex-1 flex-col items-center px-3 pb-3 pt-6">
                            <p className="text-2xl font-bold leading-none text-primary/70">
                              {itemNumber}
                            </p>
                            <p className="mt-2 text-sm font-semibold leading-tight text-foreground">
                              {item.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselScrollDots
            api={recentActionsApi}
            count={recentSlides.length}
          />
        </Carousel>
      ) : (
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      )}
    </SectionShell>
  );
}
