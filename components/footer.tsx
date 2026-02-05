"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold text-foreground">
              {t.footer.brand}
            </span>
          </div>

          <p className="text-sm text-muted-foreground max-w-md text-center">
            {t.footer.description}
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-[11px] text-muted-foreground tracking-wide">
            &copy; {new Date().getFullYear()} aumentodeseguidores.com. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link href="/terminos" className="text-[10px] text-muted-foreground hover:text-accent transition-colors">
              {t.footer.terms}
            </Link>
            <Link href="/privacidad" className="text-[10px] text-muted-foreground hover:text-accent transition-colors">
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
