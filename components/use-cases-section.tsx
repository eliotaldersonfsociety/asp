"use client"

import { Flag, Shield, MapPin, Radio, Zap, Eye, Activity, Target, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const getIcon = (tag: string) => {
  switch (tag) {
    case "Politica": return Flag
    case "Political": return Flag
    case "Crisis Reputacional": return Shield
    case "Reputational Crisis": return Shield
    case "Posicionamiento Territorial": return MapPin
    case "Territorial Positioning": return MapPin
    case "Transmisiones en Vivo Estrategicas": return Radio
    case "Strategic Live Streams": return Radio
    case "Crecimiento Rapido de Autoridad": return Zap
    case "Rapid Authority Growth": return Zap
    case "Monitoreo de Oposicion": return Eye
    case "Opposition Monitoring": return Eye
    case "Sentimiento Social 24/7": return Activity
    case "24/7 Social Sentiment": return Activity
    case "Segmentacion Psicografica": return Target
    case "Psychographic Segmentation": return Target
    case "Militancia Digital Activa": return Users
    case "Active Digital Militia": return Users
    default: return Flag
  }
}

export function UseCasesSection() {
  const { t, language } = useLanguage()
  const isEnglish = language === 'en'
  
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {t.useCases.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.useCases.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.useCases.cases.map((useCase: { title: string; description: string; tag: string }, index: number) => {
            const Icon = getIcon(useCase.tag)
            return (
              <div
                key={index}
                className="group p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    useCase.tag === "Politica" || useCase.tag === "Political"
                      ? "bg-accent/20 text-accent" 
                      : useCase.tag === "IA" || useCase.tag === "AI"
                      ? "bg-purple-500/20 text-purple-500"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {useCase.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-sm text-muted-foreground">{useCase.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
