const steps = [
  {
    number: "01",
    title: "Elige tu servicio",
    description: "Selecciona el tipo de crecimiento que necesitas: seguidores, likes, comentarios o viewers en vivo.",
  },
  {
    number: "02",
    title: "Contactanos por WhatsApp",
    description: "Envianos tu perfil y la cantidad que deseas. Te damos un presupuesto inmediato.",
  },
  {
    number: "03",
    title: "Realiza el pago",
    description: "Aceptamos multiples metodos de pago. Una vez confirmado, comenzamos a trabajar.",
  },
  {
    number: "04",
    title: "Recibe resultados",
    description: "Entregamos de forma gradual y natural para proteger tu cuenta. Resultados garantizados.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Como Funciona</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un proceso simple y rapido para comenzar a crecer
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="relative z-10 p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-bold text-accent">{step.number}</span>
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-accent z-20" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
