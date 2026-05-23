import type { BaseParameters } from "@/lib/types/shared";
import { AttributesSection } from "@/features/parties/components/dialog-sections/attributes-section";
import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";
import { BASE_TOPIC } from "@/lib/constants/parties";

const POSITIONS = [
  { id: "type", label: BASE_TOPIC.type },
  { id: "securityApproach", label: BASE_TOPIC.security },
  { id: "economicApproach", label: BASE_TOPIC.economy },
  { id: "jews", label: BASE_TOPIC.jews },
  { id: "arabs", label: BASE_TOPIC.arabs },
  { id: "bloc", label: BASE_TOPIC.bloc },
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
