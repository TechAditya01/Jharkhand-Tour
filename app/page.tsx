import { HeroSection } from "@/components/hero-section"
import { AttractionsSection } from "@/components/attractions-section"
import { CultureSection } from "@/components/culture-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { AIChatbot } from "@/components/ai-chatbot"
import { ARVRSection } from "@/components/arvr-section"
import { ItineraryPlanner } from "@/components/itinerary-planner"
import { InteractiveMap } from "@/components/interactive-map"
import { Marketplace } from "@/components/marketplace"
import { TransportServices } from "@/components/transport-services"
import { FeedbackSystem } from "@/components/feedback-system"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ItineraryPlanner />
  <InteractiveMap />
  <Marketplace />
  <TransportServices />
  <FeedbackSystem />
  <AnalyticsDashboard />
  <AttractionsSection />
  <CultureSection />
  <TestimonialsSection />
  <ContactSection />
  <Footer />
  <AIChatbot />
    </main>
  )
}
