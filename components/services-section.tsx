"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { services } from "@/contexts/service.data"
import { ServiceCard } from "./service-card"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"

export function ServicesSection() {
  const { totalItems } = useCart()
  const { t } = useLanguage()

  return (
    <section id="servicios" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* CTA SOLO SI HAY ITEMS */}
        {totalItems > 0 && (
          <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-4">
            <Button size="lg" asChild>
              <Link href="/checkout">
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t.services.viewCart} ({totalItems})
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
