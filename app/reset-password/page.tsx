"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2, CheckCircle2, AlertTriangle } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Logo } from "@/components/logo"
import { resetPasswordAction } from "@/lib/actions/reset-password"

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  if (!token) {
    return (
      <div className="text-center space-y-4 py-8">
        <div className="flex justify-center">
          <AlertTriangle className="w-12 h-12 text-yellow-500" />
        </div>
        <p className="text-foreground font-medium">Token de recuperación faltante.</p>
        <Button asChild variant="outline" className="w-full">
          <Link href="/forgot-password">Solicitar nuevo enlace</Link>
        </Button>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")
    setIsLoading(true)

    if (!password || !confirmPassword) {
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

    const result = await resetPasswordAction(token, password)
    
    if (result.success) {
      setMessage(result.message || "Tu contraseña ha sido restablecida.")
    } else {
      setError(result.error || "Ocurrió un error inesperado.")
    }
    
    setIsLoading(false)
  }

  return (
    <>
      {message ? (
        <div className="text-center space-y-4 py-4">
          <div className="flex justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <p className="text-foreground font-medium">{message}</p>
          <Button asChild className="w-full">
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Nueva contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar nueva contraseña</Label>
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
                Actualizando contraseña...
              </>
            ) : (
              "Restablecer Contraseña"
            )}
          </Button>
        </form>
      )}
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-border">
            <CardHeader className="text-center">
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mx-auto mb-4">
                <Logo />
              </div>
              <CardTitle className="text-2xl">Restablecer Contraseña</CardTitle>
              <CardDescription>
                Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>}>
                <ResetPasswordForm />
              </Suspense>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Link href="/login" className="text-sm text-accent hover:underline flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Volver al Login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
