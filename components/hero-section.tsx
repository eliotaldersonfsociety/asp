import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircle } from "lucide-react"
import NeuralCanvas from "@/components/brain"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      
      {/* 🧠 CANVAS NEURONAL */}
      <div className="absolute inset-0 z-0">
        <NeuralCanvas />
      </div>

      {/* GRADIENTES / LUCES */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />
      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />

      {/* CONTENIDO */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Crecimiento Real en Redes Sociales
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Aumenta tus seguidores, likes y engagement de forma real
          </h1>

          <p className="text-xl md:text-2xl text-accent font-medium mb-4">
            "No vendemos números. Construimos percepción digital."
          </p>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Impulsa tu presencia en redes sociales con seguidores reales, likes genuinos,
            comentarios activos y viewers en vivo. Servicio premium de IA para campañas políticas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <a href="#servicios">
                Ver Planes de Crecimiento
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>

            <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                Agendar Diagnóstico Estratégico
              </a>
            </Button>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: "500K+", label: "Seguidores entregados" },
            { value: "99%", label: "Clientes satisfechos" },
            { value: "1M+", label: "Likes generados" },
            { value: "24/7", label: "Soporte disponible" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
