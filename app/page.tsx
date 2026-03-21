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
      </div>

      <PageHeader />
      
      <main className="max-w-sm mx-auto px-4 pt-16 pb-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-base font-semibold mb-1 text-foreground">
            בחירות ישראל 2026
          </h1>
          <p className="text-muted-foreground text-[11px]">
            המדריך החכם לבחירות הקרובות
          </p>
        </div>

        {/* Main CTA Button */}
        <Link
          href="/advisor"
          className="group block mb-8"
        >
          <div className="glass-card p-3 rounded-2xl hover:shadow-md transition-all">
            <div className="flex items-center justify-center gap-2 text-foreground">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium">מעבר לפסיכולוג הפוליטי שלך</span>
              <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:-translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Square Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/parties" className="group">
            <div className="aspect-square glass-card rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all">
              <div className="w-16 h-16 rounded-xl overflow-hidden">
                <Image
                  src="/parties-icon.jpg"
                  alt="מפלגות"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-medium text-foreground">השוואת מפלגות</span>
            </div>
          </Link>

          <Link href="/leaders" className="group">
            <div className="aspect-square glass-card rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all">
              <div className="w-16 h-16 rounded-xl overflow-hidden">
                <Image
                  src="/leaders-icon.jpg"
                  alt="מנהיגים"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-medium text-foreground">השוואת מנהיגים</span>
            </div>
          </Link>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-[10px] text-muted-foreground text-center">
          כלי עזר אובייקטיבי להבנת המפה הפוליטית
        </p>
      </main>
    </div>
  )
}
