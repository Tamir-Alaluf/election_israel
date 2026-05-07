import type { LeaderValues } from "@/lib/types/leader-comparison";
import { AttributesSection } from "@/features/parties/components/dialog-sections/attributes-section";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";

const POSITIONS = [
  { id: "securityApproach", label: "גישה ביטחונית" },
  { id: "economicApproach", label: "גישה כלכלית" },
  { id: "leadershipStyle", label: "סגנון מנהיגות" },
  { id: "harediGov", label: "שילוב חרדים בממשלה" },
  { id: "arabGov", label: "שילוב ערבים בממשלה" },
] as const;

export function LeaderPositionsSection({ values }: { values: LeaderValues }) {
  return (
    <SectionShell title="עמדות" withSurface={false}>
      <AttributesSection
        attributes={POSITIONS.map((position) => ({
          id: position.id,
          label: position.label,
        }))}
        valuesById={values}
      />
    </SectionShell>
  );
}
