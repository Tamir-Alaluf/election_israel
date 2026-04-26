import { VisionSection } from "@/features/parties/components/dialog-sections/vision-section";

export function LeaderVisionSection({ vision }: { vision: string | null }) {
  return <VisionSection vision={vision} title="חזון" />;
}
