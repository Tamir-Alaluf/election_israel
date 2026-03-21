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
      <div className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
          השוואה בין עמדות המפלגות בנושאי ליבה ויומיום. לחצו על מפלגה לפרטים נוספים.
        </p>
        <PartyComparisonGrid />
      </div>
    </main>
  )
}
