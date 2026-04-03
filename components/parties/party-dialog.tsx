"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import {
  parties,
  partyCategories,
  recentActionItemCategories,
  type RecentActionItemCategory,
} from "@/lib/election-data";
import {
  ComparisonCollapsibleSection,
  ComparisonDialogShell,
} from "@/components/general/comparison-shared";
import {
  comparisonBadgeClassName,
  ValueBadge,
} from "@/components/parties/value-badge";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** תגיות קטגוריה: כחול / ירוק-אמרלד (חברה) / סגול (משפט) / צהוב */
const recentActionCategoryBadgeClass: Record<RecentActionItemCategory, string> =
  {
    "ביטחון ומדיניות":
      "border-sky-500/35 bg-sky-500/10 text-sky-950 dark:text-sky-100",
    "חברה וכלכלה":
      "border-emerald-500/35 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100",
    "משפט וממשל":
      "border-violet-500/35 bg-violet-500/10 text-violet-950 dark:text-violet-100",
    "דת ומדינה":
      "border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-100",
  };

function classForRecentActionCategory(
  category: string | undefined,
): string | undefined {
  if (
    !category ||
    !(recentActionItemCategories as readonly string[]).includes(category)
  ) {
    return undefined;
  }
  return recentActionCategoryBadgeClass[category as RecentActionItemCategory];
}

function CarouselScrollDots({
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
              ? "bg-primary scale-125"
              : "bg-muted-foreground/30",
          )}
        />
      ))}
    </div>
  );
}

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
  const recentItems = party.recentActionsItems ?? [];
  const recentSlides = Array.from(
    { length: Math.ceil(recentItems.length / 4) },
    (_, index) => recentItems.slice(index * 4, index * 4 + 4),
  );
  const issueItemsPerPage = Math.ceil(issueParams.length / 4);
  const issueSlides = Array.from({ length: 4 }, (_, pageIndex) =>
    issueParams.slice(
      pageIndex * issueItemsPerPage,
      (pageIndex + 1) * issueItemsPerPage,
    ),
  ).filter((slide) => slide.length > 0);

  const [promisesApi, setPromisesApi] = useState<CarouselApi | null>(null);
  const [recentActionsApi, setRecentActionsApi] = useState<CarouselApi | null>(
    null,
  );
  const [issuesApi, setIssuesApi] = useState<CarouselApi | null>(null);

  return (
    <ComparisonDialogShell
      open={open}
      onClose={onClose}
      image={party.image}
      title={party.name}
      subtitle={party.leader}
      contentClassName="scrollbar-hide"
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
          {recentItems.length > 0 ? (
            <Carousel
              key={`recent-${party.id}`}
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
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6 auto-rows-fr pt-5">
                      {slide.map((item, itemIndex) => {
                        const itemNumber = slideIndex * 4 + itemIndex + 1;
                        return (
                          <div
                            key={`${item.title}-${itemNumber}`}
                            className="pt-1"
                          >
                            <div className="relative rounded-lg bg-background/70 border border-border/40 text-center flex flex-col min-h-[172px]">
                              {"category" in item && item.category ? (
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    comparisonBadgeClassName,
                                    "absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 shadow-sm",
                                    classForRecentActionCategory(item.category),
                                  )}
                                >
                                  {item.category}
                                </Badge>
                              ) : null}
                              <div className="flex flex-1 flex-col items-center px-3 pb-3 pt-6">
                                <p className="text-2xl font-bold text-primary/70 leading-none">
                                  {itemNumber}
                                </p>
                                <p className="mt-2 text-sm font-semibold text-foreground leading-tight">
                                  {item.title}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
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
          ) : party.recentActions ? (
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
              {party.recentActions}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              אין מידע להצגה כרגע.
            </p>
          )}
        </div>
      </ComparisonCollapsibleSection>

      {party.id === "likud" && party.promisesVsResultsLikud && (
        <ComparisonCollapsibleSection title="הבטחות מול מעשים">
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
              key={`promises-${party.id}`}
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
              <CarouselScrollDots
                api={promisesApi}
                count={promiseSlides.length}
              />
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
        <Carousel
          key={`issues-${party.id}`}
          setApi={setIssuesApi}
          opts={{
            align: "start",
            direction: "rtl",
            containScroll: "trimSnaps",
          }}
          className="w-full max-w-full overflow-hidden"
        >
          <CarouselContent className="-ml-0">
            {issueSlides.map((slide, slideIndex) => (
              <CarouselItem key={slideIndex} className="pl-0">
                <div className="space-y-2">
                  {slide.map((param, index) => {
                    const prevGroup = index > 0 ? slide[index - 1].group : null;
                    const shouldRenderGroupTitle =
                      param.group && param.group !== prevGroup;

                    return (
                      <div key={param.id}>
                        {shouldRenderGroupTitle && (
                          <p className="text-xs font-semibold text-primary mt-2 mb-1">
                            {param.group}
                          </p>
                        )}
                        <div className="flex items-center justify-between gap-2 py-2 px-1 border-b border-border/30 last:border-0">
                          <span className="min-w-0 flex-1 text-sm text-muted-foreground break-words">
                            {param.label}
                          </span>
                          <div className="shrink-0">
                            <ValueBadge
                              value={
                                party.values[
                                  param.id as keyof typeof party.values
                                ] || "-"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselScrollDots api={issuesApi} count={issueSlides.length} />
        </Carousel>
      </ComparisonCollapsibleSection>
    </ComparisonDialogShell>
  );
}
