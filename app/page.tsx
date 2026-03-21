import Link from "next/link"
import { ArrowLeft, Users, UserCircle, MessageCircle } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-balance">
          <span className="bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
            בחירות ישראל 2026
          </span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          המדריך החכם לבחירות הקרובות
        </p>
      </div>

      {/* Main CTA Button */}
      <Link
        href="/advisor"
        className="group relative mb-10"
      >
        <div className="absolute inset-0 bg-gradient-to-l from-primary to-accent rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
        <div className="relative flex items-center gap-2 bg-gradient-to-l from-primary to-accent text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium transition-transform group-hover:scale-105">
          <MessageCircle className="w-4 h-4" />
          מעבר לפסיכולוג הפוליטי שלך
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </div>
      </Link>

      {/* Secondary Navigation Cards */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <Link
          href="/parties"
          className="flex-1 group"
        >
          <div className="p-4 rounded-lg border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all">
            <div className="flex items-center gap-2 justify-center">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">השוואת מפלגות</span>
            </div>
          </div>
        </Link>

        <Link
          href="/leaders"
          className="flex-1 group"
        >
          <div className="p-4 rounded-lg border border-border bg-card hover:border-accent/40 hover:shadow-sm transition-all">
            <div className="flex items-center gap-2 justify-center">
              <UserCircle className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">השוואת מנהיגים</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Footer note */}
      <p className="mt-10 text-xs text-muted-foreground/70 text-center">
        כלי עזר אובייקטיבי להבנת המפה הפוליטית
      </p>
    </main>
  )
}
