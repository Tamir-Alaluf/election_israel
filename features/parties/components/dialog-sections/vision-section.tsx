import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";

export function VisionSection({
  vision,
  title = "חזון המפלגה",
}: {
  vision: string | null;
  title?: string;
}) {
  return (
    <SectionShell title={title}>
      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
        {vision ?? "—"}
      </p>
    </SectionShell>
  );
}
