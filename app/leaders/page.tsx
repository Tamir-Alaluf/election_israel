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
      <div className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
          השוואה בין ראשי המפלגות על בסיס רקע, יכולות והתנהלות.
        </p>
        <LeaderComparisonGrid />
      </div>
    </main>
  )
}
