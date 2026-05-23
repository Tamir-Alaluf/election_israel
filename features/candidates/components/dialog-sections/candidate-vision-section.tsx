import { SectionShell } from "@/features/parties/components/dialog-sections/section-shell";

export function LeaderVisionContent({ vision }: { vision: string | null }) {
  return (
    <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
      {vision ?? "—"}
    </p>
  );
}

export function LeaderVisionSection({ vision }: { vision: string | null }) {
  return (
    <SectionShell title="חזון">
      <LeaderVisionContent vision={vision} />
    </SectionShell>
  );
}
