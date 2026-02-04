"use client"

import React, { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  CreditCard,
  ShieldCheck,
  Clock,
  Check,
  FileText,
  Loader2,
  QrCode,
  Copy,
  Upload,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useTheme } from "next-themes"
import { useDropzone } from "react-dropzone"
import { useLanguage } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { completeOrderAction } from "@/lib/actions/orders"

export default function CheckoutPage() {
  const router = useRouter()
  const {
    items,
    updateQuantity,
    removeFromCart,
    totalPrice,
    clearCart,
    diagnosticData,
    hasStrategicSetup,
    setHasStrategicSetup
  } = useCart()
  const { user, refreshAuth } = useAuth()
  const { theme } = useTheme()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    password: "",
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [showGuestForm, setShowGuestForm] = useState(false)
  const { t, formatPrice, language } = useLanguage()

  // Identificamos si hay servicios que requieren diagnóstico/evaluación estratégica
  const diagnosticServiceIds = ["ia-politica", "combo-total", "victoria-360", "gestion-crisis", "marca-elite", "monitor-oposicion"]
  const hasStrategicService = items.some((item) => diagnosticServiceIds.includes(item.id))
  
  const setupPrice = 400000
  const finalTotal = totalPrice + (hasStrategicSetup ? setupPrice : 0)

  // Sync user data to form data when user is logged in
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }))
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert(t.checkout.copied)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file.size > 1024 * 1024) { // 1MB limit
      alert("El archivo debe ser menor a 1MB")
      return
    }
    setUploadedFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setFilePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  })

  const removeFile = () => {
    setUploadedFile(null)
    setFilePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('country', formData.country)
      if (formData.password) {
        formDataToSend.append('password', formData.password)
      }
      formDataToSend.append('total', finalTotal.toString())
      
      const simplifiedItems = items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
      formDataToSend.append('items', JSON.stringify(simplifiedItems))
      
      if (diagnosticData) {
        formDataToSend.append('diagnosticData', JSON.stringify(diagnosticData))
      }
      
      formDataToSend.append('paymentMethod', 'transfer')
      
      if (uploadedFile) {
        formDataToSend.append('file', uploadedFile)
      } else {
        alert("Por favor sube el comprobante de pago")
        setIsProcessing(false)
        return
      }

      const result = await completeOrderAction(formDataToSend)

      if (result.success) {
        await refreshAuth()
        clearCart()
        router.push(`/order-success?orderId=${result.data?.orderId}`)
      } else {
        alert(result.error || "Error al procesar el pedido. Intente nuevamente.")
      }
    } catch (error) {
      console.error(error)
      alert("Ocurrió un error inesperado.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <>
      <Header/>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 pt-20">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <CreditCard className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-4">{t.checkout.empty}</h1>
          <p className="text-muted-foreground mb-8">
            {t.checkout.emptyDesc}
          </p>
          <Button asChild>
            <Link href="/#servicios">{t.checkout.seeServices}</Link>
          </Button>
        </div>
      </div>
      <Footer/>
      </>
    )
  }

  return (
    <>
    <Header />
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex items-center gap-4 mb-8 border-b border-border pb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.checkout.back}
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-foreground">{t.checkout.title}</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Cart Items Section - Unchanged */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Tu Carrito</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                      {diagnosticServiceIds.includes(item.id) && (
                        <span className="px-2 py-0.5 rounded text-xs bg-accent/20 text-accent">IA / Strategic</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <p className="text-accent font-bold mt-1 text-lg">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center text-foreground font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategic Setup Upsell */}
            {hasStrategicService && (
              <div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/30">
                <div className="flex items-start gap-4">
                  <Checkbox
                    id="strategic-setup"
                    checked={hasStrategicSetup}
                    onCheckedChange={(checked) => setHasStrategicSetup(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="strategic-setup" className="text-foreground font-medium cursor-pointer">
                      {t.checkout.strategicSetup} (+{formatPrice(setupPrice)})
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      {t.checkout.setupDesc}
                    </p>
                    <ul className="space-y-1">
                      {[
                        "Auditoría completa de redes",
                        "Definición de KPIs personalizados",
                        "Configuración inicial de IA",
                        "Primer reporte base",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Order Status Info */}
            {hasStrategicService && (
              <div className="mt-6 p-4 rounded-xl bg-secondary/50 border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-foreground">{t.checkout.orderStatus}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.checkout.strategicNote}
                </p>
              </div>
            )}

            {/* Totals */}
            <div className="mt-6 p-4 rounded-xl bg-secondary/50 border border-border space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t.checkout.subtotal}</span>
                <span className="text-foreground font-medium">{formatPrice(totalPrice)}</span>
              </div>
              {hasStrategicSetup && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t.checkout.setupFee}</span>
                  <span className="text-foreground font-medium">{formatPrice(setupPrice)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-xl pt-4 border-t border-border">
                <span className="text-foreground font-semibold">{t.checkout.total}</span>
                <span className="font-black text-accent">{formatPrice(finalTotal)}</span>
              </div>
              {hasStrategicSetup && (
                <p className="text-xs text-muted-foreground italic">
                  * {t.checkout.recurringNote}
                </p>
              )}
            </div>
          </div>

            {/* Checkout Form or Account Choice */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">
                {user ? "Confirmación de Pedido" : "Información de Pago"}
              </h2>
              
              {!user && !showGuestForm ? (
                 <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="p-8 rounded-xl bg-card border border-border shadow-sm text-center">
                     <h3 className="text-lg font-medium mb-2">Identificación</h3>
                     <p className="text-muted-foreground text-sm mb-6">Para continuar con tu compra, selecciona una opción:</p>
                     
                     <div className="flex flex-col gap-4">
                       <Button variant="outline" size="lg" asChild className="w-full relative justify-center">
                         <Link href={`/login?redirect=/checkout`}>
                           <div className="absolute left-4 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                              <Check className="w-3 h-3" />
                           </div>
                           Ya soy cliente (Iniciar Sesión)
                         </Link>
                       </Button>
                       
                       <div className="relative">
                         <div className="absolute inset-0 flex items-center">
                           <span className="w-full border-t border-muted"></span>
                         </div>
                         <div className="relative flex justify-center text-xs uppercase">
                           <span className="bg-card px-2 text-muted-foreground">O</span>
                         </div>
                       </div>
  
                       <Button 
                         variant="default" 
                         size="lg"
                         onClick={() => setShowGuestForm(true)}
                         className="w-full"
                       >
                         Soy nuevo cliente (Continuar)
                       </Button>
                     </div>
                   </div>
                 </div>
              ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* USER INFO SECTION - Only show if not logged in */}
                  {!user ? (
                    <div className="space-y-4">
                        <div>
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Juan Pérez"
                            required
                            className="mt-1"
                        />
                        </div>
                        <div>
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="juan@ejemplo.com"
                            required
                            className="mt-1"
                        />
                        </div>
                        <div>
                        <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+52 55 1234 5678"
                            required
                            className="mt-1"
                        />
                        </div>
                        <div>
                        <Label htmlFor="country">País</Label>
                        <Input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="México"
                            required
                            className="mt-1"
                        />
                        </div>
                        <div>
                        <Label htmlFor="password">Contraseña (para crear tu cuenta)</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="********"
                            required
                            className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Crearemos una cuenta segura automática para que puedas seguir tu pedido.
                        </p>
                        </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-accent/5 border border-accent/20 mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold uppercase border border-green-500/20 shadow-sm">
                          {user.name?.charAt(0) || user.email?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <p className="text-xs text-accent font-medium">¡Bienvenido de nuevo! Usaremos tus datos de registro para este pedido.</p>
                    </div>
                  )}

                {/* Sección Medios de Pago */}
                <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-medium text-foreground mb-4">{t.checkout.paymentMethods}</h3>
                    <Accordion type="single" collapsible className="w-full">
                    {/* PayPal - Solo en inglés */}
                    {language === 'en' && (
                      <AccordionItem value="paypal">
                        <AccordionTrigger>
                          <div className="flex items-center gap-2">
                            <img src="/paypal.svg" alt="logo-paypal" className="w-12 h-12" />
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <p className="text-sm font-bold">PayPal Email:</p>
                            <p className="text-sm font-bold text-accent">bucarmarketing@gmail.com</p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard("bucarmarketing@gmail.com")}
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {/* Métodos locales - Solo en español */}
                    {language === 'es' && (
                      <>
                        <AccordionItem value="breb">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <img src="/breb.svg" alt="logo-breb" className="w-12 h-12" />
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex items-center gap-4">
                              <div className="w-24 h-24 bg-white p-2 rounded-lg border">
                                <QrCode className="w-full h-full" />
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-bold">{t.checkout.accountNumber}</p>
                                <p className="text-sm font-bold">3006144416</p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard("3006144416")}
                                >
                                  <Copy className="w-4 h-4 mr-2" />
                                  {t.checkout.copy}
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="nequi">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <img
                                src={theme === 'dark' ? "/nequi2.svg" : "/nequi.svg"}
                                alt="logo-nequi"
                                className="w-12 h-12"
                              />
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex items-center gap-4">
                              <div className="w-24 h-24 bg-white p-2 rounded-lg border">
                                <QrCode className="w-full h-full" />
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-bold">{t.checkout.accountNumber}</p>
                                <p className="text-sm font-bold">3219412929</p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard("3219412929")}
                                >
                                  <Copy className="w-4 h-4 mr-2" />
                                  {t.checkout.copy}
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="daviplata">
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <img src="/daviplata.svg" alt="logo-daviplata" className="w-12 h-12" />
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex items-center gap-4">
                              <div className="w-24 h-24 bg-white p-2 rounded-lg border">
                                <QrCode className="w-full h-full" />
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-bold">{t.checkout.accountNumber}</p>
                                <p className="text-sm font-bold">3006144416</p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard("3006144416")}
                                >
                                  <Copy className="w-4 h-4 mr-2" />
                                  {t.checkout.copy}
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </>
                    )}
                    </Accordion>
                </div>

                {/* Sección Subir Comprobante de Pago */}
                <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-medium text-foreground mb-4">Subir Comprobante de Pago</h3>
                    <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${isDragActive ? 'border-accent bg-accent/10' : 'border-border'}`}
                    >
                    <input {...getInputProps()} />
                    {filePreview ? (
                        <div className="relative">
                        <img
                            src={filePreview}
                            alt="Preview"
                            className="w-full h-48 object-contain rounded-lg"
                        />
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={removeFile}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                        </div>
                    ) : (
                        <>
                        <Upload className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                            {isDragActive
                            ? "Suelta el archivo aquí"
                            : "Arrastra y suelta tu comprobante de pago aquí, o haz clic para seleccionar"}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Tamaño máximo: 1MB</p>
                        </>
                    )}
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                    <span>Pago seguro con encriptación SSL</span>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isProcessing || !uploadedFile}>
                    {isProcessing ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Procesando pago...
                    </>
                    ) : (
                    <>
                        <CreditCard className="w-5 h-5 mr-2" />
                        Confirmar Pago
                    </>
                    )}
                </Button>

                <div className="p-4 rounded-lg bg-secondary/30 border border-border">
                    <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                        La activación del servicio se realiza después de una auditoría inicial y validación estratégica.
                        Esto garantiza resultados alineados a los objetivos del cliente.
                        Al completar la compra, aceptas nuestros términos de servicio y política de privacidad.
                    </p>
                    </div>
                </div>
                </form>
            )}
          </div>
        </div>
      </main>
    </div>
    <Footer/>
    </>
  )
}
