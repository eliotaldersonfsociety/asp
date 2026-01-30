import { Shield, FileCheck, AlertCircle } from "lucide-react"

export function LegalSection() {
  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent" />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Compromiso Etico y Transparencia
            </h3>
            
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Nuestros servicios se enfocan en <span className="text-foreground">analisis, posicionamiento digital y amplificacion estrategica</span>. 
                Trabajamos para maximizar el alcance de mensajes legitimos y mejorar la percepcion publica de nuestros clientes.
              </p>
              
              <div className="flex items-start gap-3">
                <FileCheck className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <p>No creamos contenido falso, noticias falsas ni suplantamos identidades.</p>
              </div>
              
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <p>El cliente es responsable del contenido publicado en sus redes sociales.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
