import type { LeaderProfessionalItem } from "@/features/candidates/types/leader-comparison";
import { formatYearRange } from "@/features/candidates/components/dialog-sections/format-year-range";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { comparisonBadgeClassName } from "@/features/parties/types/value-badge";
import { classForRecentActionCategory } from "@/features/parties/types/recent-action-badges";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";

export function LeaderProfessionalSection({
  leaderId,
  professionalBackground,
}: {
  leaderId: string;
  professionalBackground: LeaderProfessionalItem[];
}) {
  const sortedProfessionalBackground = [...professionalBackground].sort((a, b) => {
    if (a.startYear === null && b.startYear === null) return 0;
    if (a.startYear === null) return 1;
    if (b.startYear === null) return -1;
    return b.startYear - a.startYear;
  });

  return (
    <SectionShell title="רקע מקצועי">
      {sortedProfessionalBackground.length > 0 ? (
        <div className="space-y-4 pt-2">
          {sortedProfessionalBackground.map((professional, index) => {
            const yearRange = formatYearRange(
              professional.startYear,
              professional.endYear,
            );
            return (
              <div key={`${leaderId}-professional-${index}`} className="pt-1">
                <div className="relative flex flex-col rounded-lg border border-border/40 bg-background/70 px-4 py-4 text-right">
                  {professional.groupName ? (
                    <Badge
                      variant="outline"
                      className={cn(
                        comparisonBadgeClassName,
                        "max-w-none whitespace-nowrap",
                        "absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 shadow-sm",
                        classForRecentActionCategory(professional.groupName),
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
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-muted-foreground">—</p>
      )}
    </SectionShell>
  );
}
