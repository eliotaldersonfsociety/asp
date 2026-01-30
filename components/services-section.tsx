"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { services } from "@/contexts/service.data"
import { ServiceCard } from "./service-card"
import { useCart } from "@/contexts/cart-context"

export function ServicesSection() {
  const { totalItems } = useCart()

  return (
    <section id="servicios" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades de crecimiento digital
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
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
                Ver carrito ({totalItems})
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
