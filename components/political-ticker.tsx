"use client"

import { useLanguage } from "@/contexts/language-context"

export function PoliticalTicker() {
  const { language, t } = useLanguage()

  const messageEs = "Hemos llevado más de 10 campañas políticas obteniendo un 80% de triunfo"
  const messageEn = "We have led more than 10 political campaigns achieving 80% victory"

  const message = language === 'es' ? messageEs : messageEn

  return (
    <div className="w-full bg-red-600 overflow-hidden py-2">
      <div className="relative inline-block whitespace-nowrap animate-marquee">
        <span className="text-white font-bold text-sm mx-8 flex items-center gap-2">
          <span>🏆</span>
          {message}
        </span>
        
      </div>
    </div>
  )
}
