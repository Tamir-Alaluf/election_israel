import type { LeaderComparisonRow } from "@/lib/types/candidates";
import { LeaderEducationSection } from "@/features/candidates/components/dialog-sections/leader-education-section";
import { LeaderPositionsSection } from "@/features/candidates/components/dialog-sections/leader-positions-section";
import { LeaderProfessionalSection } from "@/features/candidates/components/dialog-sections/leader-professional-section";
import { LeaderVisionSection } from "@/features/candidates/components/dialog-sections/leader-vision-section";
import { RecentActionsSection } from "@/features/parties/components/dialog-sections/recent-actions-section";

export function LeaderDialogSections({
  leader,
}: {
  leader: LeaderComparisonRow;
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

      {/* <RecentActionsSection
        itemId={`${leader.id}-career`}
        title="הישגים בקריירה"
        recentItems={leader.careerAchievements}
      /> */}

      <RecentActionsSection
        itemId={`${leader.id}-recent`}
        title="מה נעשה מאז הבחירות הקודמות"
        recentItems={leader.recentActions}
      />

      <LeaderPositionsSection values={leader.values} />
    </>
  );
}
