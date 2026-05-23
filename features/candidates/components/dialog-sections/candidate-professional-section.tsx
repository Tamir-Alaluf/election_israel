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

function ProfessionalRoleCard({
  professional,
}: {
  professional: ProfessionalItem;
}) {
  const yearRange = formatYearRange(
    professional.startYear,
    professional.endYear,
  );

  return (
    <div className="relative flex flex-col rounded-lg border border-border/40 bg-background/70 px-4 py-4 text-right">
      {professional.groupName ? (
        <Badge
          variant="outline"
          className={cn(
            comparisonBadgeClassName,
            "max-w-none whitespace-nowrap",
            "absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 shadow-sm",
            classForProfessionalBackgroundGroup(professional.groupName),
          )}
        >
          {professional.groupName}
        </Badge>
      ) : null}

      <p
        className={cn(
          "text-sm font-semibold leading-tight text-foreground",
          professional.groupName ? "pt-2" : "",
        )}
      >
        {professional.title}
      </p>

      {yearRange ? (
        <p className="mt-3 text-xs font-medium leading-relaxed text-primary/70">
          {yearRange}
        </p>
      ) : null}
      {professional.description ? (
        <p className="mt-2 border-t border-border/40 pt-2 text-xs leading-relaxed text-muted-foreground">
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
    <ScrollArea className="h-[360px] w-full pe-3">
      <div className="space-y-4 pt-1">
        {sortedProfessionalBackground.map((professional, index) => (
          <ProfessionalRoleCard
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
