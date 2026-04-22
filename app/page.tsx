import { CountdownTimer } from "@/features/home/components/countdown-timer";
import { HomePageTitle } from "@/features/home/components/page-title";
import { HomeAdvisorCta } from "@/features/home/components/advisor-cta";
import { HomeMandatesSection } from "@/features/home/components/mandates-section";
import { HomeFooterNote } from "@/features/home/components/footer-note";

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <main className="max-w-md mx-auto px-5 pt-20 pb-10">
        <HomePageTitle />
        <HomeAdvisorCta />
        <CountdownTimer />
        <HomeMandatesSection />
        <HomeFooterNote />
      </main>
    </div>
  );
}
