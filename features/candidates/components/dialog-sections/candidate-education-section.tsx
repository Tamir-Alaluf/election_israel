"use client";

import type { EducationItem } from "@/lib/types/shared";
import { formatYearRange } from "@/lib/utils/candidates";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";

function sortEducation(items: EducationItem[]) {
  return [...items].sort((a, b) => {
    if (a.startYear === null && b.startYear === null) return 0;
    if (a.startYear === null) return 1;
    if (b.startYear === null) return -1;
    return b.startYear - a.startYear;
  });
}

function EducationBackgroundItem({ education }: { education: EducationItem }) {
  const titleLine = [education.degreeLevel, education.major]
    .filter(Boolean)
    .join(" · ");
  const yearRange = formatYearRange(education.startYear, education.endYear);

  return (
    <div className="text-start">
      <p className="text-sm font-semibold leading-tight text-foreground">
        {titleLine || "השכלה אקדמאית"}
      </p>

      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        {education.university ?? "מוסד לימודים לא צוין"}
      </p>

      {yearRange ? (
        <p className="mt-1 text-xs font-medium leading-relaxed text-primary/70">
          {yearRange}
        </p>
      ) : null}

      {education.description ? (
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          {education.description}
        </p>
      ) : null}
    </div>
  );
}

export function LeaderEducationContent({
  leaderId,
  education,
}: {
  leaderId: string;
  education: EducationItem[];
}) {
  const sortedEducation = sortEducation(education);

  if (sortedEducation.length === 0) {
    return <p className="text-sm leading-relaxed text-muted-foreground">—</p>;
  }

  return (
    <ScrollArea className="h-[200px] w-full">
      <div dir="rtl" className="space-y-6 pe-3 pt-1">
        {sortedEducation.map((item, index) => (
          <EducationBackgroundItem
            key={`${leaderId}-education-${index}`}
            education={item}
          />
        ))}
      </div>
    </ScrollArea>
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
