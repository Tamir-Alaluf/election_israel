"use client";

import type { ProfessionalItem } from "@/lib/types/shared";
import { formatYearRange } from "@/lib/utils/candidates";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils/utils";
import {
  classForProfessionalBackgroundGroup,
  comparisonBadgeClassName,
} from "@/lib/constants/style";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";

function sortProfessionalBackground(items: ProfessionalItem[]) {
  return [...items].sort((a, b) => {
    if (a.startYear === null && b.startYear === null) return 0;
    if (a.startYear === null) return 1;
    if (b.startYear === null) return -1;
    return b.startYear - a.startYear;
  });
}

function ProfessionalBackgroundItem({
  professional,
}: {
  professional: ProfessionalItem;
}) {
  const yearRange = formatYearRange(
    professional.startYear,
    professional.endYear,
  );

  return (
    <div className="text-start">
      {professional.groupName ? (
        <Badge
          variant="outline"
          className={cn(
            comparisonBadgeClassName,
            "mb-1.5 max-w-none whitespace-nowrap",
            classForProfessionalBackgroundGroup(professional.groupName),
          )}
        >
          {professional.groupName}
        </Badge>
      ) : null}

      <p className="text-sm font-semibold leading-tight text-foreground">
        {professional.title}
      </p>

      {yearRange ? (
        <p className="mt-1 text-xs font-medium leading-relaxed text-primary/70">
          {yearRange}
        </p>
      ) : null}
      {professional.description ? (
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          {professional.description}
        </p>
      ) : null}
    </div>
  );
}

export function LeaderProfessionalContent({
  leaderId,
  professionalBackground,
}: {
  leaderId: string;
  professionalBackground: ProfessionalItem[];
}) {
  const sortedProfessionalBackground = sortProfessionalBackground(
    professionalBackground,
  );

  if (sortedProfessionalBackground.length === 0) {
    return <p className="text-sm leading-relaxed text-muted-foreground">—</p>;
  }

  return (
    <ScrollArea className="h-[360px] w-full">
      <div dir="rtl" className="space-y-6 pe-3 pt-1">
        {sortedProfessionalBackground.map((professional, index) => (
          <ProfessionalBackgroundItem
            key={`${leaderId}-professional-${index}`}
            professional={professional}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

export function LeaderProfessionalSection({
  leaderId,
  professionalBackground,
}: {
  leaderId: string;
  professionalBackground: ProfessionalItem[];
}) {
  return (
    <SectionShell title="רקע מקצועי">
      <LeaderProfessionalContent
        leaderId={leaderId}
        professionalBackground={professionalBackground}
      />
    </SectionShell>
  );
}
