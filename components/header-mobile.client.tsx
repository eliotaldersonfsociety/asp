"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingCart, Sun, Moon, User as UserIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function HeaderMobile() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { resolvedTheme, setTheme } = useTheme()
  const { user, logout, isLoading } = useAuth()
  const { totalItems } = useCart()
  const { t } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading) return <div className="flex items-center gap-2" />

  const toggleTheme = () => {
    if (!mounted) return
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex items-center gap-2">
      {/* THEME TOGGLE */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        disabled={!mounted}
      >
        {!mounted ? (
          <Moon className="w-5 h-5 opacity-50" />
        ) : resolvedTheme === "dark" ? (
          <Sun className="w-5 h-5" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </Button>

      {/* USER QUICK ACCESS */}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative flex items-center justify-center overflow-hidden rounded-full h-8 w-8 border border-green-500/20 shrink-0">
               <div className="w-full h-full bg-green-500 text-white flex items-center justify-center text-xs font-bold uppercase shadow-[0_0_8px_rgba(34,197,94,0.3)]">
                  {user.name?.charAt(0) || user.email?.charAt(0)}
               </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2">
            <div className="px-2 py-1.5 border-b border-border/50 mb-1">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <DropdownMenuItem asChild>
              <Link href="/dashboard">{t.nav.dashboard}</Link>
            </DropdownMenuItem>
            {user.role === "admin" && (
              <DropdownMenuItem asChild>
                <Link href="/admin/dashboard" className="text-accent">{t.nav.adminPanel}</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { logout(); setOpen(false); }} className="text-destructive">
              {t.nav.logout}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="ghost" size="icon" asChild className="rounded-full h-8 w-8 p-0">
          <Link href="/login">
            <UserIcon className="w-5 h-5 text-foreground" />
          </Link>
        </Button>
      )}

      {/* CART */}
      <Button variant="ghost" size="icon" className="relative" asChild>
        <Link href="/checkout">
          <ShoppingCart className="w-5 h-5" />
          {mounted && totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </Button>

      {/* MENU BUTTON */}
      <button
        className="p-2 text-foreground"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* MOBILE MENU (DROPDOWN STYLE) */}
      {open && (
        <div className="absolute top-16 right-4 w-64 bg-background border border-border shadow-2xl rounded-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
          <nav className="flex flex-col p-2">
            {/* NAV LINKS */}
            {[
              [t.nav.benefits, "/#beneficios"],
              [t.nav.howItWorks, "/#como-funciona"],
              [t.nav.services, "/#servicios"],
              [t.nav.faq, "/#faq"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                onClick={() => setOpen(false)}
              >
                {label as string}
              </a>
            ))}
            <Link
              href="/contacto"
              className="text-sm px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              {t.nav.contact}
            </Link>

            <div className="mt-2 pt-2 border-t border-border flex flex-col gap-1 p-2">
              {mounted && user ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold uppercase shrink-0 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                      {user.name?.charAt(0) || user.email?.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-semibold truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Button size="sm" variant="outline" asChild>
                    <Link href="/dashboard" onClick={() => setOpen(false)}>
                      {t.nav.dashboard}
                    </Link>
                  </Button>

                  {user.role === "admin" && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/admin/dashboard" onClick={() => setOpen(false)}>
                        {t.nav.adminPanel}
                      </Link>
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      logout()
                      setOpen(false)
                    }}
                  >
                    {t.nav.logout}
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/login" onClick={() => setOpen(false)}>
                      {t.nav.login}
                    </Link>
                  </Button>

                  <Button size="sm" asChild>
                    <Link href="/register" onClick={() => setOpen(false)}>
                      {t.nav.createAccount}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
