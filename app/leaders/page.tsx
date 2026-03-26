import { PageHeader } from "@/components/page-header";
import { LeaderComparisonGrid } from "@/components/leader-comparison-grid";

export const metadata = {
  title: "השוואת מנהיגים | בחירות 2026",
  description: "השוואה בין ראשי המפלגות המתמודדות בבחירות 2026",
};

export default function LeadersPage() {
  return (
    <div className="min-h-screen relative">
      <PageHeader />
      <main className="max-w-md mx-auto px-5 py-8">
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold text-foreground mb-1">
            השוואת מנהיגים
          </h1>
          <p className="text-sm text-muted-foreground">
            לחצו על מנהיג לצפייה בפרטים
          </p>
        </div>
        <LeaderComparisonGrid />
      </main>
    </div>
  );
}
