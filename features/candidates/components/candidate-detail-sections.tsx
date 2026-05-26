"use client";

import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils/utils";
import {
  LEADER_DETAIL_CATEGORIES,
  LEADER_DETAIL_SECTION_DEFS,
} from "@/lib/constants/candidates";
import type {
  CandidateComparisonRow,
  LeaderDetailCategoryId,
} from "@/lib/types/candidates";
import { renderLeaderSectionContent } from "@/features/candidates/components/leader-section-content";

export function LeaderDetailSections({
  leader,
}: {
  leader: CandidateComparisonRow;
}) {
  const [categoryId, setCategoryId] = useState<LeaderDetailCategoryId>(
    LEADER_DETAIL_CATEGORIES[0].id,
  );

  const filtered = useMemo(
    () => LEADER_DETAIL_SECTION_DEFS.filter((s) => s.categoryId === categoryId),
    [categoryId],
  );

  const openSectionIds = useMemo(() => filtered.map((s) => s.id), [filtered]);

  return (
    <div className="space-y-5">
      <div
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="סינון לפי קטגוריה"
      >
        {LEADER_DETAIL_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategoryId(c.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
              categoryId === c.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <Accordion
        type="multiple"
        value={openSectionIds}
        onValueChange={() => {}}
        className="glass-card rounded-xl px-1"
      >
        {filtered.map((section) => (
          <AccordionItem key={section.id} value={section.id} className="px-3">
            <div className="py-4 text-start">
              <span className="font-semibold text-foreground">
                {section.title}
              </span>
            </div>
            <AccordionContent>
              <div className="space-y-2 pb-1 leading-relaxed text-muted-foreground">
                {renderLeaderSectionContent(section.id, leader)}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
