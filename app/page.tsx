import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { MandatesChart } from "@/components/mandates-chart";
import { CountdownTimer } from "@/components/countdown-timer";

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
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
        <Link href="/advisor" className="group block mb-10">
          <div className="glass-card p-4 rounded-2xl hover:shadow-lg transition-all">
            <div className="flex items-center justify-center gap-3 text-foreground">
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">
                מעבר ליועץ הפוליטי שלך
              </span>
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Mandates Chart */}
        <div className="mt-10">
          <MandatesChart />
        </div>

        {/* Footer note */}
        <p className="mt-8 text-xs text-muted-foreground text-center">
          כלי עזר אובייקטיבי להבנת המפה הפוליטית
        </p>
      </main>
    </div>
  );
}
