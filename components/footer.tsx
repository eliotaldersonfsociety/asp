import Link from "next/link"
import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold text-foreground">
              Aumento de Seguidores
            </span>
          </div>

          <p className="text-sm text-muted-foreground max-w-md text-center">
            Servicio profesional de crecimiento en redes sociales. Estrategias avanzadas
            con IA para maximizar tu impacto digital.
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-[11px] text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} aumentodeseguidores.com. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/terminos" className="text-[10px] text-muted-foreground hover:text-accent transition-colors">
              Términos de Servicio
            </Link>
            <Link href="/privacidad" className="text-[10px] text-muted-foreground hover:text-accent transition-colors">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
