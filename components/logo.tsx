"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Logo() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Para evitar errores de hidratación, el primer renderizado debe coincidir con el servidor.
  // El servidor no conoce el tema resuelto, por lo que usamos invert(0) por defecto.
  const filterStyle = mounted && resolvedTheme === "dark" ? "invert(1)" : "invert(0)"

  return (
    <img
      src="data:image/png;base64,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"
       alt="Logo"
       className="w-8 h-8 object-contain transition-all duration-300"
       style={{ filter: filterStyle }}
     />
   )
 }
