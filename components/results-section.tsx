"use client"

import { TrendingUp, Shield, Zap, Award } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ResultsSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.results.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.results.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.results.items.map((result, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                {index === 0 && <TrendingUp className="w-7 h-7 text-accent" />}
                {index === 1 && <Shield className="w-7 h-7 text-accent" />}
                {index === 2 && <Zap className="w-7 h-7 text-accent" />}
                {index === 3 && <Award className="w-7 h-7 text-accent" />}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{result.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
