import type { BaseParameters } from "@/lib/types/candidates";
import { AttributesSection } from "@/features/parties/components/dialog-sections/attributes-section";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";

const POSITIONS = [
  { id: "securityApproach", label: "גישה ביטחונית" },
  { id: "economicApproach", label: "גישה כלכלית" },
] as const;

export function LeaderPositionsSection({ values }: { values: BaseParameters }) {
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
