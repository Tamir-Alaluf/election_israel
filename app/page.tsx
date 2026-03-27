import { PageHeader } from "@/components/home/page-header";
import { CountdownTimer } from "@/components/home/countdown-timer";
import { HomePageTitle } from "@/components/home/home-page-title";
import { HomeAdvisorCta } from "@/components/home/home-advisor-cta";
import { HomeMandatesSection } from "@/components/home/home-mandates-section";
import { HomeFooterNote } from "@/components/home/home-footer-note";

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <PageHeader />

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
