import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MessageCircle } from "lucide-react"
import { PageHeader } from "@/components/page-header"

export default function HomePage() {
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
      
      <main className="max-w-md mx-auto px-5 pt-20 pb-10">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-xl font-bold mb-2 text-foreground">
            בחירות ישראל 2026
          </h1>
          <p className="text-muted-foreground text-sm">
            המדריך החכם לבחירות הקרובות
          </p>
        </div>

        {/* Main CTA Button */}
        <Link
          href="/advisor"
          className="group block mb-10"
        >
          <div className="glass-card p-4 rounded-2xl hover:shadow-lg transition-all">
            <div className="flex items-center justify-center gap-3 text-foreground">
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">מעבר לפסיכולוג הפוליטי שלך</span>
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Square Cards */}
        <div className="grid grid-cols-2 gap-5">
          <Link href="/parties" className="group">
            <div className="aspect-square glass-card rounded-2xl flex flex-col items-center justify-center gap-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
              <div className="w-20 h-20 rounded-xl overflow-hidden">
                <Image
                  src="/parties-icon.jpg"
                  alt="מפלגות"
                  width={80}
                  height={80}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-semibold text-foreground">השוואת מפלגות</span>
            </div>
          </Link>

          <Link href="/leaders" className="group">
            <div className="aspect-square glass-card rounded-2xl flex flex-col items-center justify-center gap-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
              <div className="w-20 h-20 rounded-xl overflow-hidden">
                <Image
                  src="/leaders-icon.jpg"
                  alt="מנהיגים"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-semibold text-foreground">השוואת מנהיגים</span>
            </div>
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs text-muted-foreground text-center">
          כלי עזר אובייקטיבי להבנת המפה הפוליטית
        </p>
      </main>
    </div>
  )
}
