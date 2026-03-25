import { PageHeader } from "@/components/page-header";
import { PartyComparisonGrid } from "@/components/party-comparison-grid";

export const metadata = {
  title: "השוואת מפלגות | בחירות 2026",
  description: "השוואה מקיפה בין המפלגות המתמודדות בבחירות 2026",
};

export default function PartiesPage() {
  return (
    <div className="min-h-screen relative">
      {/* Soft blob background */}
      <div className="blob-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>

      <PageHeader />
      <main className="max-w-md mx-auto px-5 py-8">
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold text-foreground mb-1">
            השוואת מפלגות
          </h1>
          <p className="text-sm text-muted-foreground">
            לחצו על מפלגה לצפייה בעמדות
          </p>
        </div>
        <PartyComparisonGrid />
      </main>
    </div>
  );
}
