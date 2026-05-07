import { MandatesChart } from "@/features/home/components/mandates-chart";
import type { MandatesChartData } from "@/features/parties/types/party-comparison";

export function HomeMandatesSection({ data }: { data: MandatesChartData }) {
  return <MandatesChart data={data.parties} blocs={data.blocs} />;
}
