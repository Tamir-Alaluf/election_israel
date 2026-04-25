"use client";

import { useState } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CarouselScrollDots } from "@/features/parties/components/dialog-sections/carousel-scroll-dots";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";
import type { PartyComparisonRow } from "@/features/parties/types/party-comparison";

export function FuturePromisesSection({
  partyId,
  promiseItems,
}: {
  partyId: string;
  promiseItems: PartyComparisonRow["futurePromisesItems"];
}) {
  const [promisesApi, setPromisesApi] = useState<CarouselApi | null>(null);
  const promiseSlides = Array.from(
    { length: Math.ceil(promiseItems.length / 4) },
    (_, index) => promiseItems.slice(index * 4, index * 4 + 4),
  );

  return (
    <SectionShell title="הבטחות לשנים הקרובות">
      {promiseItems.length > 0 ? (
        <Carousel
          key={`promises-${partyId}`}
          setApi={setPromisesApi}
          opts={{
            align: "start",
            direction: "rtl",
            containScroll: "trimSnaps",
            slidesToScroll: 1,
          }}
          className="w-full max-w-full overflow-hidden"
        >
          <CarouselContent className="-ml-0">
            {promiseSlides.map((slide, slideIndex) => (
              <CarouselItem key={slideIndex} className="pl-0">
                <div className="grid auto-rows-fr grid-cols-2 gap-4">
                  {slide.map((promise, itemIndex) => {
                    const promiseNumber = slideIndex * 4 + itemIndex + 1;
                    return (
                      <div
                        key={`${promise.title}-${promiseNumber}`}
                        className="flex h-[172px] flex-col rounded-lg border border-border/40 bg-background/70 p-3 text-center"
                      >
                        <p className="text-2xl font-bold leading-none text-primary/70">
                          {promiseNumber}
                        </p>
                        <p className="mt-1 text-sm font-semibold leading-tight text-foreground">
                          {promise.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {promise.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselScrollDots api={promisesApi} count={promiseSlides.length} />
        </Carousel>
      ) : (
        <p className="text-sm text-muted-foreground">אין הבטחות להצגה כרגע.</p>
      )}
    </SectionShell>
  );
}
