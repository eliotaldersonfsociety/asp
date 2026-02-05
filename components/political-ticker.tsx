"use client"

import { useLanguage } from "@/contexts/language-context"

export function PoliticalTicker() {
  const { language } = useLanguage()

  const messageEs =
    "Hemos llevado más de 10 campañas políticas obteniendo un 80% de triunfo"
  const messageEn =
    "We have led more than 10 political campaigns achieving 80% victory"

  const message = language === "es" ? messageEs : messageEn

  const Item = () => (
    <span className="flex items-center gap-2 text-white font-bold text-sm mx-8 whitespace-nowrap">
      <span>🏆</span>
      {message}
    </span>
  )

  return (
    <div className="w-full bg-red-600 overflow-hidden py-2">
      <div className="flex w-max animate-marquee">
        {/* Primera copia */}
        {Array(10).fill(0).map((_, i) => (
          <Item key={`a-${i}`} />
        ))}

        {/* Segunda copia (CLAVE para loop infinito) */}
        {Array(10).fill(0).map((_, i) => (
          <Item key={`b-${i}`} />
        ))}
      </div>
    </div>
  )
}
