import { TrendingUp, Shield, Zap, Award } from "lucide-react"

const results = [
  {
    icon: TrendingUp,
    title: "Mayor alcance organico",
    description: "Con mas seguidores y engagement, el algoritmo te muestra a mas personas de forma natural.",
  },
  {
    icon: Shield,
    title: "Cuenta segura",
    description: "Nuestra entrega gradual protege tu cuenta. Sin riesgo de bloqueos o penalizaciones.",
  },
  {
    icon: Zap,
    title: "Resultados rapidos",
    description: "Comenzamos a entregar en menos de 24 horas despues de confirmar tu pedido.",
  },
  {
    icon: Award,
    title: "Credibilidad aumentada",
    description: "Un perfil con mas seguidores genera mas confianza y atrae mas seguidores organicos.",
  },
]

export function ResultsSection() {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Lo Que Obtendras</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beneficios reales al trabajar con nosotros
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((result) => (
            <div
              key={result.title}
              className="text-center p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <result.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{result.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{result.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
