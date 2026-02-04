import { Flag, Shield, MapPin, Radio, Zap, Eye, Activity, Target, Users } from "lucide-react"

const useCases = [
  {
    icon: Flag,
    title: "Lanzamiento de Candidatura",
    description: "Construye presencia digital masiva desde el primer dia. Genera percepcion de apoyo popular y autoridad instantanea.",
    tag: "Politica",
  },
  {
    icon: Shield,
    title: "Crisis Reputacional",
    description: "Respuesta rapida con amplificacion de mensajes positivos y control de narrativa en momentos criticos.",
    tag: "Politica",
  },
  {
    icon: MapPin,
    title: "Posicionamiento Territorial",
    description: "Domina la conversacion en tu region. Seguidores y engagement geolocalizados para maxima relevancia.",
    tag: "Politica",
  },
  {
    icon: Radio,
    title: "Transmisiones en Vivo Estrategicas",
    description: "Llena tus lives con audiencia activa. Crea la percepcion de eventos masivos y conexion con la gente.",
    tag: "SMM",
  },
  {
    icon: Zap,
    title: "Crecimiento Rapido de Autoridad",
    description: "Escala tu perfil de 0 a referente en semanas. Ideal para influencers y marcas personales.",
    tag: "SMM",
  },
  {
    icon: Eye,
    title: "Monitoreo de Oposición",
    description: "Vigila los movimientos de tus adversarios en tiempo real. Analiza sus debilidades y anticipate a sus jugadas.",
    tag: "Politica",
  },
  {
    icon: Activity,
    title: "Sentimiento Social 24/7",
    description: "Detecta cambios en el humor social y ajusta el rumbo de tu discurso antes de que se convierta en tendencia.",
    tag: "IA",
  },
  {
    icon: Target,
    title: "Segmentacion Psicografica",
    description: "Microsegmentamos tus mensajes segun la personalidad y valores especificos de cada grupo de ciudadanos.",
    tag: "IA",
  },
  {
    icon: Users,
    title: "Militancia Digital Activa",
    description: "Transforma simpatizantes en activistas digitales. Coordinamos bases para amplificar mensajes y defensa de marca.",
    tag: "Politica",
  },
]

export function UseCasesSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Casos de Uso
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escenarios reales donde nuestros clientes han transformado su presencia digital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <useCase.icon className="w-6 h-6 text-accent" />
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  useCase.tag === "Politica" 
                    ? "bg-accent/20 text-accent" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {useCase.tag}
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                {useCase.title}
              </h3>
              <p className="text-sm text-muted-foreground">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
