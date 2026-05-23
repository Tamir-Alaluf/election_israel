import type { EducationItem } from "@/lib/types/shared";
import { formatYearRange } from "@/lib/utils/candidates";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";

export function LeaderEducationContent({
  leaderId,
  education,
}: {
  leaderId: string;
  education: EducationItem[];
}) {
  const sortedEducation = [...education].sort((a, b) => {
    if (a.startYear === null && b.startYear === null) return 0;
    if (a.startYear === null) return 1;
    if (b.startYear === null) return -1;
    return b.startYear - a.startYear;
  });

  if (sortedEducation.length === 0) {
    return <p className="text-sm leading-relaxed text-muted-foreground">—</p>;
  }

  return (
    <div className="space-y-4">
      {sortedEducation.map((item, index) => {
        const titleLine = [item.degreeLevel, item.major]
          .filter(Boolean)
          .join(" · ");
        const yearRange = formatYearRange(item.startYear, item.endYear);

        return (
          <div key={`${leaderId}-education-${index}`}>
            <div className="flex flex-col rounded-lg border border-border/40 bg-background/70 px-4 py-4 text-right">
              <p className="text-sm font-semibold leading-tight text-foreground">
                {titleLine || "השכלה אקדמאית"}
              </p>

              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.university ?? "מוסד לימודים לא צוין"}
              </p>

              {yearRange ? (
                <p className="mt-3 text-xs font-medium leading-relaxed text-primary/70">
                  {yearRange}
                </p>
              ) : null}

              {item.description ? (
                <p className="mt-2 border-t border-border/40 pt-2 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function LeaderEducationSection({
  leaderId,
  education,
}: {
  leaderId: string;
  education: EducationItem[];
}) {
  return (
    <SectionShell title="השכלה אקדמאית">
      <LeaderEducationContent leaderId={leaderId} education={education} />
    </SectionShell>
  );
}
