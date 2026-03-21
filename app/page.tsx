import Link from "next/link"
import { ArrowLeft, Users, UserCircle, MessageCircle } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
      </div>

      {/* Logo / Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">
          <span className="bg-gradient-to-l from-primary via-accent to-primary bg-clip-text text-transparent">
            בחירות ישראל 2026
          </span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto text-pretty">
          המדריך החכם לבחירות הקרובות
        </p>
      </div>

      {/* Main CTA Button */}
      <Link
        href="/advisor"
        className="group relative mb-16"
      >
        <div className="absolute inset-0 bg-gradient-to-l from-primary to-accent rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
        <div className="relative flex items-center gap-3 bg-gradient-to-l from-primary to-accent text-primary-foreground px-8 py-4 rounded-2xl text-xl font-semibold transition-transform group-hover:scale-105">
          <MessageCircle className="w-6 h-6" />
          מעבר לפסיכולוג הפוליטי שלך
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </div>
      </Link>

      {/* Secondary Navigation Cards */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
        <Link
          href="/parties"
          className="flex-1 group"
        >
          <div className="relative p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card/80 transition-all">
            <div className="flex items-center gap-3 justify-center">
              <Users className="w-6 h-6 text-primary" />
              <span className="text-lg font-medium">השוואת מפלגות</span>
            </div>
          </div>
        </Link>

        <Link
          href="/leaders"
          className="flex-1 group"
        >
          <div className="relative p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-accent/50 hover:bg-card/80 transition-all">
            <div className="flex items-center gap-3 justify-center">
              <UserCircle className="w-6 h-6 text-accent" />
              <span className="text-lg font-medium">השוואת מנהיגים</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Footer note */}
      <p className="mt-16 text-sm text-muted-foreground/60 text-center">
        כלי עזר אובייקטיבי להבנת המפה הפוליטית
      </p>
    </main>
  )
}
