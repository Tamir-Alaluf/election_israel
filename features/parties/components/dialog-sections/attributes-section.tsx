import { ValueBadge } from "@/features/parties/types/value-badge";

export function AttributesSection({
  attributes,
  valuesById,
}: {
  attributes: { id: string; label: string }[];
  valuesById: Record<string, string>;
}) {
  return (
    <div className="space-y-2">
      {attributes.map((attribute) => (
        <div
          key={attribute.id}
          className="flex items-center justify-between border-b border-border/30 px-1 py-2 last:border-0"
        >
          <span className="text-sm text-muted-foreground">{attribute.label}</span>
          <ValueBadge value={valuesById[attribute.id] ?? "-"} />
        </div>
      ))}
    </div>
  );
}
