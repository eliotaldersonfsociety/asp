"use client"

import { useLanguage } from "@/contexts/language-context"

export function HowItWorksSection() {
  const { t } = useLanguage()

  return (
    <section id="como-funciona" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.howItWorks.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.howItWorks.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.howItWorks.steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="relative z-10 p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-bold text-accent">{step.number}</span>
                    {index < t.howItWorks.steps.length - 1 && (
                      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-accent z-20" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
