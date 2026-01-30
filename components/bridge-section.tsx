import { BarChart3, Rocket, MessageSquare, TrendingUp } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Analizamos que contenido genera mejor respuesta",
    description: "Inteligencia artificial que identifica patrones de exito en tu audiencia",
  },
  {
    icon: Rocket,
    title: "Impulsamos solo publicaciones con alto potencial",
    description: "Amplificacion estrategica basada en datos, no impulsos aleatorios",
  },
  {
    icon: MessageSquare,
    title: "Controlamos narrativa y conversacion",
    description: "Gestion de percepcion publica con analisis de sentimiento en tiempo real",
  },
  {
    icon: TrendingUp,
    title: "Medimos percepcion antes y despues",
    description: "Reportes comparativos que demuestran el impacto real de cada accion",
  },
]

export function BridgeSection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-background to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            IA + Crecimiento Estrategico
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            No solo crecemos cuentas, construimos percepcion
          </h2>
          <p className="text-xl text-accent font-medium">
            "No vendemos numeros. Construimos percepcion digital."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
