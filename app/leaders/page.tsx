import { PageHeader } from "@/components/page-header"
import { LeaderComparisonGrid } from "@/components/leader-comparison-grid"

export const metadata = {
  title: "השוואת מנהיגים | בחירות 2026",
  description: "השוואה בין ראשי המפלגות המתמודדות בבחירות 2026",
}

export default function LeadersPage() {
  return (
    <main className="min-h-screen">
      <PageHeader title="השוואת מנהיגים" />
      <div className="max-w-3xl mx-auto px-3 py-4">
        <p className="text-muted-foreground text-xs mb-4 text-center">
          לחצו על מנהיג לצפייה בפרטים
        </p>
        <LeaderComparisonGrid />
      </div>
    </main>
  )
}
