"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"

export default function TerminosPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-8 font-outfit uppercase tracking-tight">
          {t.legal.termsTitle}
        </h1>
        
        <div className="space-y-10 text-muted-foreground leading-relaxed">
          {t.legal.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-accent rounded-full hidden md:block" />
                {section.title}
              </h2>
              <p className="text-sm md:text-base">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
