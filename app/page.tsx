import { Suspense } from "react";
import { CountdownTimer } from "@/features/home/components/countdown-timer";
import { HomePageTitle } from "@/features/home/components/page-title";
import { HomeAdvisorCta } from "@/features/home/components/advisor-cta";
import { HomeMandatesSection } from "@/features/home/components/mandates-section";
import { HomeFooterNote } from "@/features/home/components/footer-note";

export const dynamic = "force-static";

function MandatesFallback() {
  return (
    <div className="mt-10 h-[350px] w-full animate-pulse rounded-2xl bg-muted/20" />
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <main className="max-w-md mx-auto px-5 pt-20 pb-10">
        <HomePageTitle />
        <HomeAdvisorCta />
        <CountdownTimer />
        <Suspense fallback={<MandatesFallback />}>
          <HomeMandatesSection />
        </Suspense>
        <HomeFooterNote />
      </main>
    </div>
  );
}
