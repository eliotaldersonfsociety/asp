"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Package, Clock, Mail, MessageCircle } from "lucide-react"
import { Header } from "@/components/header"

import { getOrderByIdAction } from "@/lib/actions/orders"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [orderDetails, setOrderDetails] = useState<{
    items: { name: string; price: number; quantity: number }[]
    total: number
    email: string
  } | null>(null)

  useEffect(() => {
    async function fetchOrder() {
      if (orderId) {
        const id = parseInt(orderId)
        if (!isNaN(id)) {
          const result = await getOrderByIdAction(id)
          if (result.success && result.data?.order) {
            setOrderDetails({
              items: result.data.order.items,
              total: result.data.order.total,
              email: result.data.order.customerEmail,
            })
          }
        }
      }
    }
    fetchOrder()
  }, [orderId])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Orden Procesada Exitosamente</h1>
            <p className="text-muted-foreground">
              Gracias por tu compra. Tu orden ha sido recibida y esta siendo procesada.
            </p>
          </div>

          <Card className="border-border mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Detalles de la Orden
              </CardTitle>
              <CardDescription>
                Numero de orden: <span className="font-mono text-foreground">{orderId}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderDetails?.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-foreground">${(item.price * item.quantity).toLocaleString()} COP</p>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="font-semibold text-foreground">Total</p>
                <p className="text-xl font-bold text-accent">${orderDetails?.total.toLocaleString()} COP</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Proximos Pasos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-accent">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Confirmacion por Email</p>
                    <p className="text-sm text-muted-foreground">
                      Recibiras un email de confirmacion con los detalles de tu orden.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-accent">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Contacto del Equipo</p>
                    <p className="text-sm text-muted-foreground">
                      Un miembro de nuestro equipo te contactara en las proximas 24 horas para coordinar la activacion del servicio.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-accent">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Activacion del Servicio</p>
                    <p className="text-sm text-muted-foreground">
                      Una vez configurado, podras ver el progreso de tu servicio en tu dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-secondary/50 mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">¿Necesitas ayuda inmediata?</p>
                    <p className="text-sm text-muted-foreground">
                      Contáctanos por WhatsApp para agilizar el proceso de activación.
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="shrink-0 border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
                  <a 
                    href={`https://wa.me/573161744421?text=Hola,%20acabo%20de%20hacer%20un%20pedido%20(ID:%20${orderId})%20y%20me%20gustaria%20confirmar%20los%20proximos%20pasos.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hablar por WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/dashboard" className="gap-2">
                Ir a Mi Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Volver al Inicio</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
