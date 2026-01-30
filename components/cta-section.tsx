import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section id="contacto" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
          Listo para transformar tu presencia digital?
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Elige el camino que mejor se adapte a tus necesidades
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* SMM CTA */}
          <div className="p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-3">Crecimiento en Redes</h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Seguidores, likes, comentarios y viewers para creadores e influencers
            </p>
            <Button size="lg" className="w-full gap-2" asChild>
              <a href="#servicios">
                Ver Planes de Crecimiento
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Political CTA */}
          <div className="p-8 rounded-2xl bg-accent/10 border border-accent/30">
            <div className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-accent text-accent-foreground mb-3">
              Premium
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">IA Politica</h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Analisis de sentimiento, estrategia y posicionamiento para campanas
            </p>
            <Button size="lg" variant="outline" className="w-full gap-2 bg-transparent border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
              <a
                href="https://wa.me/1234567890?text=Hola,%20me%20interesa%20agendar%20un%20diagnostico%20estrategico%20para%20mi%20campana%20politica"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                Agendar Diagnostico
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-12 p-6 rounded-xl bg-secondary/50 border border-border max-w-xl mx-auto">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Setup inicial disponible:</strong> Incluye auditoria de perfil, 
            estrategia personalizada y reportes de seguimiento desde $300 USD.
          </p>
        </div>
      </div>
    </section>
  )
}
