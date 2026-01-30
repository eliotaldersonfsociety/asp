import { Users, ThumbsUp, MessageSquare, Radio } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Seguidores Reales",
    description:
      "Aumenta tu base de seguidores con cuentas reales y activas que mejoran tu credibilidad y alcance orgánico.",
  },
  {
    icon: ThumbsUp,
    title: "Likes Genuinos",
    description:
      "Incrementa el engagement de tus publicaciones con likes de usuarios reales que impulsan el algoritmo.",
  },
  {
    icon: MessageSquare,
    title: "Comentarios Activos",
    description:
      "Genera conversación en tus publicaciones con comentarios relevantes que aumentan la interacción.",
  },
  {
    icon: Radio,
    title: "Viewers en Vivo",
    description:
      "Llena tus transmisiones en vivo con espectadores reales que interactuan y mejoran tu posicionamiento.",
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas para crecer en redes sociales
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
