"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MessageCircle, Clock, Send, ChevronDown, ChevronUp, MessageSquare as Discord } from "lucide-react"
import { sendContactEmail } from "@/lib/actions/contact"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const fd = new FormData()
    fd.append('name', formData.name)
    fd.append('email', formData.email)
    fd.append('subject', formData.subject)
    fd.append('message', formData.message)

    try {
      const result = await sendContactEmail(fd)
      if (result.success) {
        alert("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        alert(result.error || "Ocurrió un error al enviar el mensaje.")
      }
    } catch (error) {
      alert("Error de conexión. Inténtalo de nuevo más tarde.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqs = [
    {
      q: "¿Cómo ayuda la IA en mi estrategia política?",
      a: "Nuestra IA analiza el sentimiento de la audiencia en tiempo real, ayudándote a ajustar tus mensajes para conectar mejor con los votantes y detectar tendencias antes que la competencia."
    },
    {
      q: "¿Los seguidores y el engagement son seguros?",
      a: "Sí. Utilizamos métodos orgánicos y estratégicos que respetan los términos de servicio de las plataformas, garantizando un crecimiento seguro y duradero para tu marca personal o política."
    },
    {
      q: "¿Puedo personalizar los planes?",
      a: "Totalmente. Ofrecemos soluciones a medida que combinan análisis de datos con tácticas de crecimiento en redes según tus objetivos específicos."
    },
    {
      q: "¿Qué métodos de pago aceptan?",
      a: "Aceptamos pagos a través de Bancolombia, Nequi, Daviplata y PayPal. Todos nuestros servicios incluyen comprobante de transacción digital."
    },
    {
      q: "¿Ofrecen soporte estratégico continuo?",
      a: "Sí, nuestros planes mensuales incluyen reportes de desempeño y sesiones de optimización para asegurar que tu presencia digital siga evolucionando."
    },
    {
      q: "¿Es confidencial mi información?",
      a: "Absolutamente. Manejamos contratos de confidencialidad estrictos para proteger todos los datos estratégicos y de crecimiento de nuestros clientes."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-12">
        {/* HERO SECTION */}
        <section className="text-center mb-10 px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 font-outfit uppercase tracking-tight line-height-tight">
            CONTÁCTA<span className="text-accent">NOS</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            ¿Listo para llevar tu presencia digital al siguiente nivel? Nuestro equipo de estrategia está listo para asesorarte.
          </p>
        </section>

        {/* CONTACT GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
            
            {/* LEFT COLUMN: CONTACT INFO */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* EMAIL CARD */}
              <Card className="bg-card/50 border-border hover:border-accent/40 transition-colors">
                <CardContent className="p-5 md:p-6 flex gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-bold mb-1">Estrategia y Soporte</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Consultas sobre servicios de IA y crecimiento digital.</p>
                    <p className="text-accent font-semibold text-sm md:text-base underline decoration-accent/30 underline-offset-4 truncate">contacto@aumentodeseguidores.com</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground mt-1">Tiempo de respuesta: Menos de 24 horas</p>
                  </div>
                </CardContent>
              </Card>

              {/* LIVE CHAT CARD */}
              <Card className="bg-card/50 border-border hover:border-accent/40 transition-colors">
                <CardContent className="p-5 md:p-6 flex gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-bold mb-1">Consultoría Rápida</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Soporte estratégico directo para casos urgentes.</p>
                    <p className="text-foreground font-semibold text-sm md:text-base">Discord para clientes premium</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground mt-1 underline cursor-pointer hover:text-accent">Comunidad VIP de estrategia</p>
                  </div>
                </CardContent>
              </Card>

              {/* HOURS CARD */}
              <Card className="bg-card/50 border-border hover:border-accent/40 transition-colors">
                <CardContent className="p-5 md:p-6 flex gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <div className="w-full min-w-0">
                    <h3 className="text-base md:text-lg font-bold mb-1">Horarios de Monitoreo</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-2">Horarios de análisis y soporte operativo.</p>
                    <div className="space-y-1 text-xs md:text-sm">
                      <p className="flex justify-between gap-4">
                        <span className="text-muted-foreground">Lun – Vie:</span>
                        <span className="text-foreground font-medium">9:00 AM – 7:00 PM</span>
                      </p>
                      <p className="flex justify-between gap-4">
                        <span className="text-muted-foreground">Sábados:</span>
                        <span className="text-foreground font-medium">10:00 AM – 2:00 PM</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT COLUMN: CONTACT FORM */}
            <div className="lg:col-span-3">
              <Card className="h-full bg-card/50 border-border shadow-xl">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 font-outfit">Inicia tu Estrategia</h3>
                  <p className="text-sm text-muted-foreground mb-6 md:mb-8">Cuéntanos sobre tu proyecto y te propondremos la mejor ruta de crecimiento.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground">Nombre o Organización</Label>
                        <Input 
                          id="name" 
                          placeholder="Tu nombre completo" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-background/50 border-border focus:border-accent h-11 md:h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground">Email de contacto</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="nombre@estrategia.com" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-background/50 border-border focus:border-accent h-11 md:h-12"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground">Área de interés</Label>
                      <Input 
                        id="subject" 
                        placeholder="Ej: Posicionamiento con IA, Crecimiento SMM, etc." 
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="bg-background/50 border-border focus:border-accent h-11 md:h-12"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-xs md:text-sm uppercase tracking-wider text-muted-foreground">Detalles del proyecto</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Cuéntanos tus objetivos y redes actuales..." 
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-background/50 border-border focus:border-accent resize-none text-sm md:text-base"
                      />
                    </div>

                    <Button type="submit" className="w-full h-12 md:h-14 text-base md:text-lg font-bold" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando Solicitud..." : "Solicitar Consultoría"}
                      <Send className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-accent/5 rounded-[2rem] md:rounded-[3rem] border border-accent/10">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-4 font-outfit uppercase tracking-tight">
              ESTRATEGIA <span className="text-accent">Y DUDAS</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-lg px-4">Todo lo que necesitas saber sobre nuestro ecosistema de crecimiento</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-card border-border hover:bg-card/80 transition-all duration-300">
                <CardContent className="p-6">
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {faq.q}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* STILL HAVE QUESTIONS */}
        <section className="text-center mt-24">
          <p className="text-muted-foreground mb-2 font-medium">¿Necesitas un plan personalizado?</p>
          <Link 
            href="mailto:contacto@aumentodeseguidores.com" 
            className="text-accent font-bold text-lg hover:underline underline-offset-8 decoration-2"
          >
            Habla con nuestro equipo de estrategia
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
