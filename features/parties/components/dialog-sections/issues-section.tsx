"use client";

import { useState } from "react";
import {
  PARTY_LAW_ISSUE_GROUPS,
  type PartyPageFilterMeta,
} from "@/lib/types/party-comparison";
import { ValueBadge } from "@/lib/constants/value-badge";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CarouselScrollDots } from "@/features/parties/components/dialog-sections/carousel-scroll-dots";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";

type IssueGroupSlide = {
  group: string;
  items: PartyPageFilterMeta["lawIssues"];
};

export function IssuesSection({
  title,
  partyId,
  issues,
  valuesById,
}: {
  title: string;
  partyId: string;
  issues: PartyPageFilterMeta["lawIssues"];
  valuesById: Record<string, string>;
}) {
  const [issuesApi, setIssuesApi] = useState<CarouselApi | null>(null);
  const issueGroups = new Map<string, PartyPageFilterMeta["lawIssues"]>();

  for (const issue of issues) {
    const groupedIssues = issueGroups.get(issue.group);
    if (groupedIssues) {
      groupedIssues.push(issue);
      continue;
    }
    issueGroups.set(issue.group, [issue]);
  }

  const issueSlides: IssueGroupSlide[] = [];
  const knownIssueGroups = new Set<string>(PARTY_LAW_ISSUE_GROUPS);
  for (const groupName of PARTY_LAW_ISSUE_GROUPS) {
    const items = issueGroups.get(groupName);
    if (!items?.length) continue;
    issueSlides.push({ group: groupName, items });
  }
  for (const [groupName, items] of issueGroups) {
    if (knownIssueGroups.has(groupName)) continue;
    issueSlides.push({ group: groupName, items });
  }

  return (
    <SectionShell title={title} withSurface={false}>
      <Carousel
        key={`issues-${partyId}`}
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
                <p className="mb-1 mt-2 text-xs font-semibold text-primary">
                  {slide.group}
                </p>
                {slide.items.map((issue) => (
                  <div
                    key={issue.id}
                    className="flex items-center justify-between border-b border-border/30 px-1 py-2 last:border-0"
                  >
                    <span className="min-w-0 flex-1 break-words text-sm text-muted-foreground">
                      {issue.label}
                    </span>
                    <div className="shrink-0">
                      <ValueBadge value={valuesById[issue.id] ?? "-"} />
                    </div>
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselScrollDots api={issuesApi} count={issueSlides.length} />
      </Carousel>
    </SectionShell>
  );
}
