import { Check } from "lucide-react"

const differentials = [
  "Seguidores y engagement 100% reales",
  "Entrega gradual para proteger tu cuenta",
  "Soporte 24/7 por WhatsApp",
  "Garantia de satisfaccion o reposicion",
]

export function DifferentialSection() {
  return (
    <section id="diferencial" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Por que elegirnos para tu crecimiento
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Nos diferenciamos por ofrecer crecimiento real y seguro. No usamos bots ni cuentas falsas que puedan
              perjudicar tu perfil.
            </p>
            <ul className="space-y-4">
              {differentials.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-card border border-border p-8 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Data visualization mockup */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-xs">
                    {/* Chart bars */}
                    <div className="space-y-4">
                      {[
                        { label: "Seguidores", value: 95 },
                        { label: "Likes", value: 92 },
                        { label: "Comentarios", value: 88 },
                        { label: "Viewers", value: 90 },
                        { label: "Satisfaccion", value: 99 },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-20">{item.label}</span>
                          <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full transition-all duration-1000"
                              style={{ width: `${item.value}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground w-10">{item.value}%</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats grid */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-secondary border border-border">
                        <div className="text-2xl font-bold text-accent">+500K</div>
                        <div className="text-xs text-muted-foreground">Seguidores entregados</div>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary border border-border">
                        <div className="text-2xl font-bold text-accent">1M+</div>
                        <div className="text-xs text-muted-foreground">Likes generados</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
