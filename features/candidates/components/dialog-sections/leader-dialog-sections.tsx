import type { LeaderComparisonRow } from "@/features/candidates/types/leader-comparison";
import { AttributesSection } from "@/features/parties/components/dialog-sections/attributes-section";
import { RecentActionsSection } from "@/features/parties/components/dialog-sections/recent-actions-section";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";
import { VisionSection } from "@/features/parties/components/dialog-sections/vision-section";

export function LeaderDialogSections({ leader }: { leader: LeaderComparisonRow }) {
  const positions = [
    { id: "securityApproach", label: "גישה ביטחונית" },
    { id: "economicApproach", label: "גישה כלכלית" },
    { id: "leadershipStyle", label: "סגנון מנהיגות" },
    { id: "harediGov", label: "שילוב חרדים בממשלה" },
    { id: "arabGov", label: "שילוב ערבים בממשלה" },
  ] as const;

  return (
    <>
      <VisionSection vision={leader.vision} title="חזון" />

      <SectionShell title="השכלה אקדמאית">
        <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
          {leader.academicEducation}
        </p>
      </SectionShell>

      <SectionShell title="רקע מקצועי">
        <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
          {leader.professionalBackground}
        </p>
      </SectionShell>

      <RecentActionsSection
        itemId={`${leader.id}-career`}
        title="הישגים בקריירה"
        recentItems={leader.careerAchievementsItems}
      />

      <RecentActionsSection
        itemId={`${leader.id}-recent`}
        title="מה נעשה מאז הבחירות הקודמות"
        recentItems={leader.recentActionsItems}
      />

      <SectionShell title="עמדות" withSurface={false}>
        <AttributesSection
          attributes={positions.map((position) => ({
            id: position.id,
            label: position.label,
          }))}
          valuesById={leader.values}
        />
      </SectionShell>
    </>
  );
}
