"use client"

import { useState } from "react"
import {
  Brain,
  Users,
  Zap,
  ShoppingCart,
  Check,
  ClipboardCheck,
  Trophy,
  ShieldAlert,
  Star,
  Search,
  Megaphone,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { DiagnosticModal } from "@/components/diagnostic-modal"

const iconMap: Record<string, any> = {
  brain: Brain,
  users: Users,
  zap: Zap,
  trophy: Trophy,
  "shield-alert": ShieldAlert,
  star: Star,
  search: Search,
  megaphone: Megaphone,
  "user-plus": UserPlus,
}

export function ServiceCard({ service }: { service: any }) {
  const { addToCart } = useCart()
  const { t, formatPrice } = useLanguage()
  const [added, setAdded] = useState(false)
  const [showDiagnostic, setShowDiagnostic] = useState(false)

  const Icon = iconMap[service.icon]

  const handleAddToCart = () => {
    if (service.requiresDiagnostic) {
      setShowDiagnostic(true)
      return
    }

    addToCart({
      id: service.id,
      name: service.title,
      description: service.subtitle,
      price: service.price,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <div
        className={`relative flex flex-col p-8 rounded-2xl bg-card border transition-all hover:scale-105 ${
          service.popular
            ? "border-accent ring-2 ring-accent/20"
            : "border-border hover:border-accent/50"
        }`}
      >
        {/* BADGES */}
        {service.popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm">
            Mas Popular
          </div>
        )}

        {/* HEADER */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              service.popular ? "bg-accent" : "bg-accent/10"
            }`}
          >
            {Icon && (
              <Icon
                className={`w-7 h-7 ${
                  service.popular
                    ? "text-accent-foreground"
                    : "text-accent"
                }`}
              />
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold">{service.title}</h3>
            <p className="text-sm text-muted-foreground">
              {service.subtitle}
            </p>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-muted-foreground mb-6 flex-grow">
          {service.description}
        </p>

        {/* FEATURES */}
        <ul className="space-y-3 mb-8">
          {service.features.map((feature: string) => (
            <li key={feature} className="flex gap-3 text-sm">
              <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* PRICE */}
        <div className="mt-auto">
          <div className="mb-4">
            <span className="text-3xl font-bold">{formatPrice(service.price)}</span>
          </div>

          <div className="space-y-2">
            <Button
              className="w-full"
              onClick={handleAddToCart}
              disabled={added}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 mr-2" /> {t.services.added}
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {t.services.addToCart}
                </>
              )}
            </Button>

            {service.requiresDiagnostic && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowDiagnostic(true)}
              >
                <ClipboardCheck className="w-4 h-4 mr-2" />
                {t.services.howHelp}
              </Button>
            )}
          </div>
        </div>
      </div>

      <DiagnosticModal
        isOpen={showDiagnostic}
        onClose={() => setShowDiagnostic(false)}
        service={{
          id: service.id,
          title: service.title,
          subtitle: service.subtitle,
          price: service.price,
        }}
      />
    </>
  )
}
