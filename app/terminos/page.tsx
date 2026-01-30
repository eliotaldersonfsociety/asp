import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-8 font-outfit uppercase tracking-tight">
          Términos de <span className="text-accent">Servicio</span>
        </h1>
        
        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent rounded-full hidden md:block" />
              1. Aceptación de Responsabilidad
            </h2>
            <p className="text-sm md:text-base">
              Al utilizar los servicios de <strong>Aumento de Seguidores</strong>, el usuario acepta de manera expresa que es el único responsable de su cuenta en las redes sociales. <strong>Aumento de Seguidores</strong> no se hace responsable de suspensiones, bloqueos o penalizaciones impuestas por plataformas externas (Instagram, TikTok, Twitter, etc.).
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent rounded-full hidden md:block" />
              2. Naturaleza del Servicio
            </h2>
            <p className="text-sm md:text-base">
              Nuestros servicios están diseñados para fines de marketing y crecimiento digital. El usuario reconoce que la interacción recibida proviene de redes estratégicas y que los resultados pueden variar según el tipo de contenido y la plataforma. No garantizamos que el aumento de cantidad se traduzca directamente en un aumento de ventas o éxito comercial.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent rounded-full hidden md:block" />
              3. Exención de Responsabilidad
            </h2>
            <p className="text-sm md:text-base">
              <strong>Aumento de Seguidores</strong> queda eximido de cualquier responsabilidad técnica, legal o comercial. Una vez realizado el pedido, el usuario asume la total responsabilidad sobre el uso de los servicios adquiridos. No nos hacemos responsables si el usuario utiliza nuestros servicios para infringir las normas de las redes sociales.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent rounded-full hidden md:block" />
              4. Política de Entrega
            </h2>
            <p className="text-sm md:text-base">
              Los plazos de entrega son estimaciones basadas en el rendimiento actual de las redes. En casos de actualizaciones masivas de las plataformas (como parches de seguridad de Instagram), la entrega puede retrasarse. El usuario acepta esperar los tiempos de ajuste necesarios sin que esto implique responsabilidad por parte de nuestra empresa.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent rounded-full hidden md:block" />
              5. Modificación de Términos
            </h2>
            <p className="text-sm md:text-base">
              Nos reservamos el derecho de actualizar estos términos en cualquier momento para reflejar cambios en las plataformas digitales o en nuestra operativa comercial.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
