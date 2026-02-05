"use client"

import { FAQItem } from "./faq-item"
import { useLanguage } from "@/contexts/language-context"

export function FAQSection() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.contact.faqs[0]?.q ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.contact.faqs[0]?.q ? "Respondemos tus preguntas antes de comenzar" : "We answer your questions before getting started"}
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
