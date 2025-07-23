import { HexagonBackground } from "@/components/animate-ui/backgrounds/hexagon"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"

export const HexagonBackgroundDemo = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <HexagonBackground className="fixed inset-0 opacity-30" />
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <FeatureCards />
      </div>
    </div>
  )
}
