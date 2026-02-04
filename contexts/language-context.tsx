"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Language, translations } from "@/lib/translations"
import { getExchangeRateAction } from "@/lib/actions/currency"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.es
  currency: 'COP' | 'USD'
  exchangeRate: number
  formatPrice: (priceCOP: number) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es')
  const [exchangeRate, setExchangeRate] = useState(0.00025) // Valor por defecto aproximado
  
  const currency = language === 'es' ? 'COP' : 'USD'

  useEffect(() => {
    // Cargar preferencia del usuario
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguageState(savedLang)
    }

    // Obtener tasa de cambio real
    const fetchRate = async () => {
      const result = await getExchangeRateAction()
      if (result.success && result.rate) {
        setExchangeRate(result.rate)
      }
    }
    fetchRate()
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const formatPrice = (priceCOP: number) => {
    if (currency === 'USD') {
      const priceUSD = priceCOP * exchangeRate
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }).format(priceUSD)
    } else {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      }).format(priceCOP).replace('COP', '').trim() + ' COP'
    }
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currency, exchangeRate, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
