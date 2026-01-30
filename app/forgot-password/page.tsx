"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2, CheckCircle2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Logo } from "@/components/logo"
import { forgotPasswordAction } from "@/lib/actions/forgot-password"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setIsLoading(true)

    if (!email) {
      setError("Por favor ingresa tu correo electrónico")
      setIsLoading(false)
      return
    }

    const result = await forgotPasswordAction(email)
    
    if (result.success) {
      setMessage(result.message || "Se ha enviado un enlace a tu correo.")
    } else {
      setError(result.error || "Ocurrió un error inesperado.")
    }
    
    setIsLoading(false)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio de sesión
          </Link>

          <Card className="border-border">
            <CardHeader className="text-center">
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mx-auto mb-4">
                <Logo />
              </div>
              <CardTitle className="text-2xl">¿Olvidaste tu contraseña?</CardTitle>
              <CardDescription>
                Ingresa tu email y te enviaremos un enlace para recuperarla
              </CardDescription>
            </CardHeader>
            <CardContent>
              {message ? (
                <div className="text-center space-y-4 py-4">
                  <div className="flex justify-center">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <p className="text-foreground font-medium">{message}</p>
                  <Button asChild className="w-full">
                    <Link href="/login">Volver al Login</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
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

                  {error && (
                    <p className="text-sm text-destructive bg-destructive/10 p-2 rounded-md">{error}</p>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando enlace...
                      </>
                    ) : (
                      "Enviar enlace de recuperación"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                ¿Recordaste tu contraseña?{" "}
                <Link href="/login" className="text-accent hover:underline">
                  Inicia sesión
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
