"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { Language, translations } from "@/lib/translations"

type TranslationType = {
  nav: typeof translations.en.nav
  hero: typeof translations.en.hero
  services: typeof translations.en.services
  checkout: typeof translations.en.checkout
  footer: typeof translations.en.footer
  cta: typeof translations.en.cta
  diagnostic: typeof translations.en.diagnostic
  contact: typeof translations.en.contact
  header: typeof translations.en.header
  ticker: typeof translations.en.ticker
  faqs: Array<{
    q: string
    a: string
  }>
  ethical: {
    title: string
    description: string
    noFakeContent: string
    clientResponsibility: string
  }
  useCases: {
    title: string
    subtitle: string
    cases: Array<{
      title: string
      description: string
      tag: string
    }>
  }
  bridge: {
    badge: string
    title: string
    tagline: string
    features: Array<{
      title: string
      description: string
    }>
  }
  dashboard: {
    badge: string
    title: string
    description: string
    features: string[]
    panelTitle: string
    lastUpdate: string
    followers: string
    engagement: string
    weeklyGrowth: string
    previousComparison: string
    monthlyGrowth: string
    days: string[]
  }
  howItWorks: {
    title: string
    subtitle: string
    steps: Array<{
      number: string
      title: string
      description: string
    }>
  }
  legal: {
    termsTitle: string
    privacyTitle?: string
    sections: Array<{
      title: string
      content: string
    }>
    privacySections?: Array<{
      title: string
      content: string
    }>
  }
  results: {
    title: string
    subtitle: string
    items: Array<{
      title: string
      description: string
    }>
  }
  audience: {
    badge: string
    title: string
    subtitle: string
    cards: Array<{
      title: string
      description: string
      gradient: string
    }>
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationType
  currency: 'COP' | 'USD'
  exchangeRate: number
  formatPrice: (priceCOP: number) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Tasa de cambio aproximada: 1 USD = 4000 COP
const COP_TO_USD_RATE = 4000

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  
  const currency = language === 'es' ? 'COP' : 'USD'

  useEffect(() => {
    // Cargar preferencia del usuario
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const formatPrice = (priceCOP: number) => {
    if (currency === 'USD') {
      // Convertir COP a USD
      const priceUSD = priceCOP / COP_TO_USD_RATE
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }).format(priceUSD)
    } else {
      // Mostrar en COP
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      }).format(priceCOP)
    }
  }

  const t = translations[language] as unknown as TranslationType

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currency, exchangeRate: COP_TO_USD_RATE, formatPrice }}>
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
