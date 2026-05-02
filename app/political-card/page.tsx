import { PoliticalCardView } from "@/features/political-card/components/political-card-view";
import { mockPoliticalCardPriorities } from "@/lib/data/mock-political-card";

export const metadata = {
  title: "הכרטיס הפוליטי שלי | בחירות 2026",
  description:
    "הנושאים שמובילים את הבחירות שלך — גלו את העדיפויות שלכם והתאימו ליועץ הפוליטי",
};

export const dynamic = "force-static";

export default function PoliticalCardPage() {
  return (
    <div className="min-h-screen relative">
      <main className="max-w-md mx-auto px-5">
        <PoliticalCardView priorities={mockPoliticalCardPriorities} />
      </main>
    </div>
  );
}
