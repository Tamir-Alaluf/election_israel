import { MandatesChart } from "@/features/home/components/mandates-chart";
import { getMandatesChartData } from "@/lib/data/party-comparison";
export const dynamic = "force-static";

export async function HomeMandatesSection() {
  const data = await getMandatesChartData();
  return (
    <div className="mt-10">
      <MandatesChart data={data.parties} blocs={data.blocs} />
    </div>
  );
}
