"use client"

import React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Logo } from "@/components/logo"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [country, setCountry] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user, isLoading: authLoading } = useAuth()

  React.useEffect(() => {
    if (!authLoading && user) {
      if (user.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/dashboard')
      }
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!name || !email || !whatsapp || !country || !password || !confirmPassword) {
      setError("Por favor completa todos los campos")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setIsLoading(false)
      return
    }

    const result = await register(email, password, name, whatsapp, country)
    
    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(result.error || "Error al crear la cuenta")
    }
    
    setIsLoading(false)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex items-center justify-center p-4 pt-24 pb-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          <Card className="border-border">
            <CardHeader className="text-center">
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mx-auto mb-4">
                <Logo />
              </div>
              <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
              <CardDescription>
                Regístrate para gestionar tus pedidos y servicios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* NOMBRE */}
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan Perez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                {/* WHATSAPP */}
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp / Teléfono</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="+54 9 11 ..."
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                {/* PAIS */}
                <div className="space-y-2">
                  <Label htmlFor="country">País</Label>
                  <Input
                    id="country"
                    type="text"
                    placeholder="Colombia, México, etc."
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                {/* CONTRASEÑA */}
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                {/* CONFIRMAR CONTRASEÑA */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md">{error}</p>
                )}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creando cuenta...
                    </>
                  ) : (
                    "Crear Cuenta"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="text-sm text-center text-muted-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-accent hover:underline">
                  Iniciar sesión
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
