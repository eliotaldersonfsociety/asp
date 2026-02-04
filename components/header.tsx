"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"
import { HeaderMobile } from "@/components/header-mobile.client"
import { useLanguage } from "@/contexts/language-context"

export function Header() {
  const { t } = useLanguage()

  const navItems = [
    [t.nav.services, "/#servicios"],
    [t.nav.faq, "/#faq"],
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-semibold text-sm text-foreground">
              Aumento de Seguidores
            </span>
          </Link>

          {/* NAV DESKTOP (CLIENT) */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </a>
            ))}
            <Link
              href="/contacto"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.nav.contact}
            </Link>
          </nav>

          {/* UNIVERSAL ACTIONS & MENU */}
          <HeaderMobile />
        </div>
      </div>
    </header>
  )
}
