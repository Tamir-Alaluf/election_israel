import { ValueBadge } from "@/lib/constants/style";

export function AttributesSection({
  attributes,
  valuesById,
  descriptionsById,
}: {
  attributes: { id: string; label: string }[];
  valuesById: Record<string, string>;
  descriptionsById?: Record<string, string | null | undefined>;
}) {
  return (
    <div className="space-y-2">
      {attributes.map((attribute) => {
        const description = descriptionsById?.[attribute.id];
        return (
          <div
            key={attribute.id}
            className="border-b border-border/30 px-1 py-2 last:border-0"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">{attribute.label}</span>
              <ValueBadge value={valuesById[attribute.id] ?? "-"} />
            </div>
            {description ? (
              <p className="mt-2 pt-2 text-xs leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
