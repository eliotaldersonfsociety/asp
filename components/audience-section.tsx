import { Users, Megaphone, Star, Building2, Lightbulb } from "lucide-react"

const audiences = [
  {
    icon: Users,
    title: "Candidatos Politicos",
    description: "Equipos de campana y estrategas electorales",
    premium: true,
  },
  {
    icon: Megaphone,
    title: "Consultores Politicos",
    description: "Asesores de imagen y comunicacion politica",
    premium: true,
  },
  {
    icon: Star,
    title: "Influencers",
    description: "Creadores de contenido y marcas personales",
    premium: false,
  },
  {
    icon: Building2,
    title: "Agencias de Marketing",
    description: "Equipos de marketing digital y social media",
    premium: false,
  },
  {
    icon: Lightbulb,
    title: "Emprendedores",
    description: "Negocios que buscan crecer en redes sociales",
    premium: false,
  },
]

export function AudienceSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Quienes confian en nosotros?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trabajamos con clientes que entienden el valor de la percepcion digital
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className={`relative p-6 rounded-xl border transition-all hover:border-accent/50 ${
                audience.premium
                  ? "bg-card border-accent/30"
                  : "bg-card/50 border-border"
              }`}
            >
              {audience.premium && (
                <span className="absolute -top-2 right-4 px-2 py-0.5 text-xs font-medium rounded bg-accent text-accent-foreground">
                  Premium
                </span>
              )}
              <audience.icon className={`w-8 h-8 mb-4 ${audience.premium ? "text-accent" : "text-muted-foreground"}`} />
              <h3 className="font-semibold text-foreground mb-2">{audience.title}</h3>
              <p className="text-sm text-muted-foreground">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
