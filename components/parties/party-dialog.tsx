"use client";

import { parties, partyCategories } from "@/lib/election-data";
import {
  ComparisonCollapsibleSection,
  ComparisonDialogShell,
} from "@/components/general/comparison-shared";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ValueBadge } from "@/components/parties/value-badge";
import { User } from "lucide-react";

export function PartyDialog({
  party,
  open,
  onClose,
}: {
  party: (typeof parties)[0] | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!party) return null;

  const attributeParams = partyCategories.attributes.parameters;
  const issueParams = partyCategories.issues.parameters;
  const members = party.members ?? [];
  const displayedMembers = members.slice(0, 10);
  const promiseItems = party.futurePromisesItems ?? [];
  const promiseSlides = Array.from(
    { length: Math.ceil(promiseItems.length / 4) },
    (_, index) => promiseItems.slice(index * 4, index * 4 + 4),
  );

  return (
    <ComparisonDialogShell
      open={open}
      onClose={onClose}
      image={party.image}
      title={party.name}
      subtitle={party.leader}
    >
      <ComparisonCollapsibleSection title="חזון המפלגה">
        <div className="p-3 rounded-lg bg-muted/30">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {party.vision}
          </p>
        </div>
      </ComparisonCollapsibleSection>

      <ComparisonCollapsibleSection title="מה עשו מאז הבחירות האחרונות">
        <div className="p-3 rounded-lg bg-muted/30">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {party.recentActions}
          </p>
        </div>
      </ComparisonCollapsibleSection>

      {party.id === "likud" && party.promisesVsResultsLikud && (
        <ComparisonCollapsibleSection title="הבטחות מול תוצאות">
          <div className="p-3 rounded-lg bg-muted/30">
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
              {party.promisesVsResultsLikud}
            </p>
          </div>
        </ComparisonCollapsibleSection>
      )}
      <ComparisonCollapsibleSection title="הבטחות לשנים הקרובות">
        <div className="p-3 rounded-lg bg-muted/30">
          {promiseItems.length > 0 ? (
            <Carousel
              opts={{
                align: "start",
                direction: "rtl",
                containScroll: "trimSnaps",
                slidesToScroll: 1,
              }}
              className="px-10"
            >
              <CarouselContent>
                {promiseSlides.map((slide, slideIndex) => (
                  <CarouselItem key={slideIndex}>
                    <div className="grid grid-cols-2 gap-4 auto-rows-fr">
                      {slide.map((promise, itemIndex) => {
                        const promiseNumber = slideIndex * 4 + itemIndex + 1;
                        return (
                          <div
                            key={`${promise.title}-${promiseNumber}`}
                            className="h-[172px] rounded-lg bg-background/70 border border-border/40 p-3 text-center flex flex-col"
                          >
                            <p className="text-2xl font-bold text-primary/70 leading-none">
                              {promiseNumber}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-foreground leading-tight">
                              {promise.title}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                              {promise.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="left-0 right-auto" />
              <CarouselPrevious className="right-0 left-auto" />
            </Carousel>
          ) : (
            <p className="text-sm text-muted-foreground">
              אין הבטחות להצגה כרגע.
            </p>
          )}
        </div>
      </ComparisonCollapsibleSection>
      <ComparisonCollapsibleSection title="חברי מפלגה">
        <div className="p-3 rounded-lg bg-muted/30">
          <div className="grid grid-cols-5 gap-3 pt-2">
            {displayedMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="relative">
                  <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center border border-border/40">
                    <User className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold leading-none shadow-sm">
                    #{index + 1}
                  </span>
                </div>
                <span className="mt-1 text-sm font-medium text-foreground leading-tight line-clamp-2">
                  {member}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ComparisonCollapsibleSection>

      <ComparisonCollapsibleSection title={partyCategories.attributes.title}>
        <div className="space-y-2">
          {attributeParams.map((param) => (
            <div
              key={param.id}
              className="flex items-center justify-between py-2 px-1 border-b border-border/30 last:border-0"
            >
              <span className="text-sm text-muted-foreground">
                {param.label}
              </span>
              <ValueBadge
                value={
                  party.values[param.id as keyof typeof party.values] || "-"
                }
              />
            </div>
          ))}
        </div>
      </ComparisonCollapsibleSection>
      <ComparisonCollapsibleSection title={partyCategories.issues.title}>
        <div className="space-y-2">
          {issueParams.map((param, index) => {
            const prevGroup = index > 0 ? issueParams[index - 1].group : null;
            const shouldRenderGroupTitle =
              param.group && param.group !== prevGroup;

            return (
              <div key={param.id}>
                {shouldRenderGroupTitle && (
                  <p className="text-xs font-semibold text-primary mt-2 mb-1">
                    {param.group}
                  </p>
                )}
                <div className="flex items-center justify-between py-2 px-1 border-b border-border/30 last:border-0">
                  <span className="text-sm text-muted-foreground">
                    {param.label}
                  </span>
                  <ValueBadge
                    value={
                      party.values[param.id as keyof typeof party.values] || "-"
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </ComparisonCollapsibleSection>
    </ComparisonDialogShell>
  );
}
