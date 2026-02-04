"use client"

import { Users, Megaphone, Star, Building2, Lightbulb } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function AudienceSection() {
  const { t } = useLanguage()

  const getIcon = (index: number) => {
    switch (index) {
      case 0: return Users
      case 1: return Megaphone
      case 2: return Star
      case 3: return Building2
      case 4: return Lightbulb
      default: return Users
    }
  }

  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {t.audience.badge}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.audience.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {t.audience.cards.map((card, index) => {
            const Icon = getIcon(index)
            return (
              <div
                key={index}
                className={`relative p-6 rounded-xl border transition-all hover:border-accent/50 ${
                  index < 2 ? "bg-card border-accent/30" : "bg-card/50 border-border"
                }`}
              >
                {index < 2 && (
                  <span className="absolute -top-2 right-4 px-2 py-0.5 text-xs font-medium rounded bg-accent text-accent-foreground">
                    Premium
                  </span>
                )}
                <Icon className={`w-8 h-8 mb-4 ${index < 2 ? "text-accent" : "text-muted-foreground"}`} />
                <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
