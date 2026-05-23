import type { CandidateComparisonRow } from "@/lib/types/candidates";
import { LeaderEducationSection } from "@/features/candidates/components/dialog-sections/leader-education-section";
import { LeaderPositionsSection } from "@/features/candidates/components/dialog-sections/leader-positions-section";
import { LeaderProfessionalSection } from "@/features/candidates/components/dialog-sections/leader-professional-section";
import { LeaderVisionSection } from "@/features/candidates/components/dialog-sections/leader-vision-section";
import { LeaderLegislationsSection } from "@/features/candidates/components/dialog-sections/leader-legislations-section";
import { RecentActionsSection } from "@/components/shared/data-display/recent-actions-section";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";
import { MembersSection } from "@/features/parties/components/dialog-sections/members-section";

export function LeaderDialogSections({
  leader,
}: {
  leader: CandidateComparisonRow;
}) {
  return (
    <>
      <LeaderVisionSection vision={leader.vision} />

      <LeaderEducationSection
        leaderId={leader.id}
        education={leader.education}
      />

      <LeaderProfessionalSection
        leaderId={leader.id}
        professionalBackground={leader.professionalBackground}
      />

      <RecentActionsSection
        itemId={`${leader.id}-career`}
        title="הישגים בקריירה"
        recentItems={leader.careerAchievements}
      />

      <RecentActionsSection
        itemId={`${leader.id}-recent`}
        title="מה נעשה מאז הבחירות הקודמות"
        recentItems={leader.recentActions}
      />

      <RecentActionsSection
        itemId={`${leader.id}-promises`}
        title="הבטחות לשנים הקרובות"
        recentItems={leader.futurePromises}
      />

      <LeaderPositionsSection values={leader.values} />

      <LeaderLegislationsSection legislations={leader.legislations} />
      <MembersSection members={leader.members} />
    </>
  );
}
