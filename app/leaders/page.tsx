import { PageHeader } from "@/components/page-header"
import { LeaderComparisonGrid } from "@/components/leader-comparison-grid"

export const metadata = {
  title: "השוואת מנהיגים | בחירות 2026",
  description: "השוואה בין ראשי המפלגות המתמודדות בבחירות 2026",
}

export default function LeadersPage() {
  return (
    <div className="min-h-screen relative">
      {/* Soft blob background */}
      <div className="blob-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <PageHeader />
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="text-center mb-4">
          <h1 className="text-sm font-semibold text-foreground mb-1">השוואת מנהיגים</h1>
          <p className="text-[11px] text-muted-foreground">לחצו על מנהיג לצפייה בפרטים</p>
        </div>
        <LeaderComparisonGrid />
      </main>
    </div>
  )
}
