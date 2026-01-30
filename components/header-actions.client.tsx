"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ShoppingCart,
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
  User as UserIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function HeaderActions() {
  const { resolvedTheme, setTheme } = useTheme()
  const { user, logout, isLoading } = useAuth()
  const { totalItems } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading) return <div className="hidden md:flex items-center gap-2 w-32" />

  return (
    <div className="hidden md:flex items-center gap-2">
      {/* THEME */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          setTheme(resolvedTheme === "dark" ? "light" : "dark")
        }
      >
        {resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>

      {/* CART */}
      <Button variant="ghost" size="icon" asChild className="relative">
        <Link href="/checkout">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-xs flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </Link>
      </Button>

      {/* USER */}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative p-0 overflow-hidden rounded-full h-9 w-9 border border-green-500/20">
               <div className="w-full h-full bg-green-500 text-white flex items-center justify-center text-sm font-bold uppercase shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                  {user.name?.charAt(0) || user.email?.charAt(0)}
               </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 border-b border-border/50 mb-1">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>

            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="flex gap-2">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
            </DropdownMenuItem>

            {user.role === "admin" && (
              <DropdownMenuItem asChild>
                <Link href="/admin/dashboard" className="flex gap-2 text-accent">
                  <LayoutDashboard className="w-4 h-4" /> Panel Admin
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout}
              className="text-destructive flex gap-2 focus:bg-destructive/10 focus:text-destructive"
            >
              <LogOut className="w-4 h-4" /> Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="ghost" size="icon" asChild className="rounded-full">
          <Link href="/login">
            <UserIcon className="w-5 h-5" />
          </Link>
        </Button>
      )}
    </div>
  )
}
