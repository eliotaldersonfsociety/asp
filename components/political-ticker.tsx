"use client"

import { useLanguage } from "@/contexts/language-context"

export function PoliticalTicker() {
  const { language, t } = useLanguage()

  const messageEs = "Hemos llevado más de 10 campañas políticas obteniendo un 80% de triunfo"
  const messageEn = "We have led more than 10 political campaigns achieving 80% victory"

  const message = language === 'es' ? messageEs : messageEn

  // Repetir el mensaje varias veces para efecto marquee infinito
  const repeatedMessage = Array(10).fill(message).map((msg, index) => (
    <span key={index} className="text-white font-bold text-sm mx-8 flex items-center gap-2">
      <span>🏆</span>
      {msg}
    </span>
  ))

  return (
    <div className="w-full bg-red-600 overflow-hidden py-2">
      <div className="inline-block whitespace-nowrap animate-marquee">
        {repeatedMessage}
      </div>
    </div>
  )
}
