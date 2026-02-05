import { Header } from "@/components/header"
import { PoliticalTicker } from "@/components/political-ticker"
import { HeroSection } from "@/components/hero-section"
import { AudienceSection } from "@/components/audience-section"
import { BridgeSection } from "@/components/bridge-section"
import { ServicesSection } from "@/components/services-section"
import { UseCasesSection } from "@/components/use-cases-section"
import { DashboardSection } from "@/components/dashboard-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { ResultsSection } from "@/components/results-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { LegalSection } from "@/components/legal-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <Header />
      <PoliticalTicker />
      <HeroSection />
      <AudienceSection />
      <BridgeSection />
      <ServicesSection />
      <UseCasesSection />
      <DashboardSection />
      <HowItWorksSection />
      <ResultsSection />
      <FAQSection />
      <CTASection />
      <LegalSection />
      <Footer />
    </main>
  )
}
