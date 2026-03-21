import { PageHeader } from "@/components/page-header"
import { PartyComparisonGrid } from "@/components/party-comparison-grid"

export const metadata = {
  title: "השוואת מפלגות | בחירות 2026",
  description: "השוואה מקיפה בין המפלגות המתמודדות בבחירות 2026",
}

export default function PartiesPage() {
  return (
    <main className="min-h-screen">
      <PageHeader title="השוואת מפלגות" />
      <div className="max-w-3xl mx-auto px-3 py-4">
        <p className="text-muted-foreground text-xs mb-4 text-center">
          לחצו על מפלגה לצפייה בעמדות
        </p>
        <PartyComparisonGrid />
      </div>
    </main>
  )
}
