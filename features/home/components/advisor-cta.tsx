import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";

export function HomeAdvisorCta() {
  return (
    <Link href="/advisor" className="group block mb-10">
      <div className="glass-card p-4 rounded-2xl hover:shadow-lg transition-all">
        <div className="flex items-center justify-center gap-3 text-foreground">
          <MessageCircle className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold">מעבר ליועץ הפוליטי שלך</span>
          <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:-translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
