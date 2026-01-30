import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-8 font-outfit uppercase tracking-tight">
          Política de <span className="text-accent">Privacidad</span>
        </h1>
        
        <div className="space-y-10 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent rounded-full hidden md:block" />
              1. Recopilación de Información
            </h2>
            <p className="text-sm md:text-base">
              Recopilamos únicamente la información necesaria para procesar sus pedidos y mejorar su experiencia estratégica, como nombre, correo electrónico y detalles del perfil público proporcionados en el formulario de pedido.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent rounded-full hidden md:block" />
              2. Uso de Datos
            </h2>
            <p className="text-sm md:text-base">
              Toda la información personal se maneja bajo estrictos estándares de confidencialidad. Sus datos nunca serán vendidos, compartidos ni transferidos a terceros con fines publicitarios ajenos a <strong>Aumento de Seguidores</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent rounded-full hidden md:block" />
              3. Seguridad del Pago
            </h2>
            <p className="text-sm md:text-base">
              No almacenamos información sensible de tarjetas de crédito o cuentas bancarias. Todos los pagos se procesan a través de proveedores seguros y cifrados para garantizar la máxima protección.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent rounded-full hidden md:block" />
              4. Responsabilidad del Usuario
            </h2>
            <p className="text-sm md:text-base">
              El usuario es responsable de mantener la confidencialidad de sus datos de acceso y del uso de su cuenta. Al proporcionarnos su nombre de usuario o enlace público para el servicio, el usuario confirma que tiene derecho sobre dicho perfil y nos exime de cualquier disputa de titularidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent rounded-full hidden md:block" />
              5. Cookies y Monitoreo
            </h2>
            <p className="text-sm md:text-base">
              Utilizamos cookies esenciales para el funcionamiento de la plataforma y el seguimiento del carrito de compras. Esto nos ayuda a ofrecer un servicio más fluido y eficiente.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
