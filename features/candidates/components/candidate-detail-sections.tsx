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
  LeaderDetailSectionId,
} from "@/lib/types/candidates";
import { LeaderVisionContent } from "@/features/candidates/components/dialog-sections/candidate-vision-section";
import { LeaderEducationContent } from "@/features/candidates/components/dialog-sections/candidate-education-section";
import { LeaderProfessionalContent } from "@/features/candidates/components/dialog-sections/candidate-professional-section";
import { LeaderPositionsContent } from "@/features/candidates/components/dialog-sections/candidate-positions-section";
import { LeaderLegislationsContent } from "@/features/candidates/components/dialog-sections/candidate-legislations-section";
import { RecentActionsContent } from "@/components/shared/data-display/recent-actions-section";
import { MembersContent } from "@/features/parties/components/dialog-sections/members-section";

function renderSectionContent(
  sectionId: LeaderDetailSectionId,
  leader: CandidateComparisonRow,
) {
  switch (sectionId) {
    case "vision":
      return <LeaderVisionContent vision={leader.vision} />;
    case "positions":
      return <LeaderPositionsContent values={leader.values} />;
    case "legislations":
      return <LeaderLegislationsContent legislations={leader.legislations} />;
    case "education":
      return (
        <LeaderEducationContent
          leaderId={leader.id}
          education={leader.education}
        />
      );
    case "professional":
      return (
        <LeaderProfessionalContent
          leaderId={leader.id}
          professionalBackground={leader.professionalBackground}
        />
      );
    case "career":
      return (
        <RecentActionsContent
          itemId={`${leader.id}-career`}
          recentItems={leader.careerAchievements}
        />
      );
    case "recent":
      return (
        <RecentActionsContent
          itemId={`${leader.id}-recent`}
          recentItems={leader.recentActions}
        />
      );
    case "promises":
      return (
        <RecentActionsContent
          itemId={`${leader.id}-promises`}
          recentItems={leader.futurePromises}
        />
      );
    case "members":
      return <MembersContent members={leader.members} />;
    default: {
      const _exhaustive: never = sectionId;
      return _exhaustive;
    }
  }
}

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
                {renderSectionContent(section.id, leader)}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
