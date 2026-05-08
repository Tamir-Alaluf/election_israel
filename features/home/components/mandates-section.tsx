import { MandatesChart } from "@/features/home/components/mandates-chart";
import type { MandatesChartData } from "@/lib/types/home";

export function HomeMandatesSection({ data }: { data: MandatesChartData }) {
  return <MandatesChart data={data.parties} blocs={data.blocs} />;
}
