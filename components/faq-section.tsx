"use client"

import { FAQItem } from "./faq-item"
import { useLanguage } from "@/contexts/language-context"

export function FAQSection() {
  const { t, language } = useLanguage()
  
  const title = language === 'es' ? "Preguntas Frecuentes" : "Frequently Asked Questions"
  const subtitle = language === 'es' ? "Respondemos tus preguntas antes de comenzar" : "We answer your questions before getting started"
  
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {t.contact.faqs.map((faq, index) => (
            <FAQItem key={faq.q} faq={{ question: faq.q, answer: faq.a }} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
