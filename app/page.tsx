import { HeroSection } from "@/components/hero-section"
import { PartyCards } from "@/components/party-cards"
import { StatsSection } from "@/components/stats-section"
import { CountdownTimer } from "@/components/countdown-timer"
import { VoteGuide } from "@/components/vote-guide"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function ElectionLandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-glow-blue/30 animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-glow-cyan/20 animate-pulse-glow [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-glow-purple/15 animate-pulse-glow [animation-delay:4s]" />
      </div>
      
      <Navbar />
      <HeroSection />
      <CountdownTimer />
      <StatsSection />
      <PartyCards />
      <VoteGuide />
      <Footer />
    </main>
  )
}
