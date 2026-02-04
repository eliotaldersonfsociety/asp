"use client"

import { useState } from "react"
import { X, ArrowRight, ArrowLeft, Check, Brain, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/cart-context"
import { Logo } from "@/components/logo"

interface DiagnosticModalProps {
  isOpen: boolean
  onClose: () => void
}

const steps = [
  {
    title: "Perfil del Cliente",
    question: "Cual describe mejor tu situacion?",
    options: [
      "Candidato politico",
      "Equipo de campana",
      "Consultor politico",
      "Agencia de comunicacion",
      "Otro",
    ],
    key: "profile",
  },
  {
    title: "Etapa de la Campana",
    question: "En que etapa te encuentras?",
    options: [
      "Precampana",
      "Campana activa",
      "Crisis reputacional",
      "Posicionamiento a largo plazo",
    ],
    key: "stage",
  },
  {
    title: "Objetivo Principal",
    question: "Que necesitas mejorar con urgencia?",
    options: [
      "Percepcion publica",
      "Engagement en redes",
      "Control de narrativa",
      "Lanzamiento de candidatura",
      "Monitoreo de comentarios",
    ],
    key: "objective",
    multiple: true,
  },
  {
    title: "Redes Clave",
    question: "En que redes necesitas apoyo?",
    options: ["Facebook", "Instagram", "TikTok", "X (Twitter)", "YouTube", "WhatsApp"],
    key: "networks",
    multiple: true,
  },
  {
    title: "Territorio",
    question: "En que pais / region es la campana?",
    type: "input",
    key: "territory",
  },
  {
    title: "Presencia Digital",
    question: "Actualmente tu presencia digital es:",
    options: ["Baja", "Media", "Alta"],
    key: "presence",
  },
  {
    title: "Expectativa",
    question: "Que esperas de la IA Politica?",
    options: [
      "Reportes y analisis",
      "Recomendaciones estrategicas",
      "Optimizacion de mensajes",
      "Amplificacion estrategica",
      "Todo lo anterior",
    ],
    key: "expectation",
    multiple: true,
  },
]

export function DiagnosticModal({ isOpen, onClose }: DiagnosticModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [showResult, setShowResult] = useState(false)
  const { addToCart, setDiagnosticData } = useCart()

  if (!isOpen) return null

  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  const handleSelect = (value: string) => {
    if (step.multiple) {
      const current = (answers[step.key] as string[]) || []
      if (current.includes(value)) {
        setAnswers({ ...answers, [step.key]: current.filter((v) => v !== value) })
      } else {
        setAnswers({ ...answers, [step.key]: [...current, value] })
      }
    } else {
      setAnswers({ ...answers, [step.key]: value })
    }
  }

  const handleInputChange = (value: string) => {
    setAnswers({ ...answers, [step.key]: value })
  }

  const canContinue = () => {
    const answer = answers[step.key]
    if (step.multiple) {
      return Array.isArray(answer) && answer.length > 0
    }
    return answer && (typeof answer === "string" ? answer.trim() !== "" : true)
  }

  const handleNext = () => {
    if (isLastStep) {
      setShowResult(true)
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (showResult) {
      setShowResult(false)
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    setDiagnosticData(answers)
    addToCart({
      id: "ia-politica",
      name: "IA Politica",
      description: "Posicionamiento Estrategico",
      price: 2999,
    })
    onClose()
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
  }

  const handleContactStrategist = () => {
    const message = encodeURIComponent(
      `Hola, complete el diagnostico de IA Politica y me gustaria hablar con un estratega.\n\nPerfil: ${answers.profile}\nEtapa: ${answers.stage}\nObjetivo: ${Array.isArray(answers.objective) ? answers.objective.join(", ") : answers.objective}\nTerritorio: ${answers.territory}`
    )
    window.open(`https://wa.me/573161744421?text=${message}`, "_blank")
  }

  const handleClose = () => {
    onClose()
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Logo />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Diagnostico IA Politica</h2>
                <p className="text-sm text-muted-foreground">
                  {showResult ? "Resultado" : `Paso ${currentStep + 1} de ${steps.length}`}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          {!showResult && (
            <div className="mt-4 flex gap-1">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i <= currentStep ? "bg-accent" : "bg-border"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-6">
          {showResult ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Resultado del Diagnostico</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Segun tu informacion, la <span className="text-accent font-medium">IA Politica</span> si puede ayudarte a mejorar tu percepcion digital y optimizar tu estrategia de comunicacion.
              </p>
              
              <div className="bg-secondary/50 rounded-xl p-4 mb-6 text-left">
                <h4 className="font-medium text-foreground mb-2">Resumen de tu perfil:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><span className="text-foreground">Perfil:</span> {answers.profile}</li>
                  <li><span className="text-foreground">Etapa:</span> {answers.stage}</li>
                  <li><span className="text-foreground">Territorio:</span> {answers.territory}</li>
                  <li><span className="text-foreground">Presencia actual:</span> {answers.presence}</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                Recomendamos una estrategia personalizada antes de activar el servicio.
              </p>

              <div className="flex flex-col gap-3">
                <Button onClick={handleAddToCart} className="w-full">
                  <Brain className="w-4 h-4 mr-2" />
                  Continuar con IA Politica
                </Button>
                <Button variant="outline" onClick={handleContactStrategist} className="w-full bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Hablar con un Estratega
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground mb-6">{step.question}</p>

              {step.type === "input" ? (
                <div>
                  <Label htmlFor="territory" className="sr-only">Territorio</Label>
                  <Input
                    id="territory"
                    placeholder="Ej: Mexico, CDMX / Colombia, Bogota"
                    value={(answers[step.key] as string) || ""}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="text-base"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  {step.options?.map((option) => {
                    const isSelected = step.multiple
                      ? ((answers[step.key] as string[]) || []).includes(option)
                      : answers[step.key] === option

                    return (
                      <button
                        key={option}
                        onClick={() => handleSelect(option)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                          isSelected
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border bg-secondary/30 text-muted-foreground hover:border-accent/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? "border-accent bg-accent" : "border-muted-foreground"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-accent-foreground" />}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}

              {step.multiple && (
                <p className="text-xs text-muted-foreground mt-3">Puedes seleccionar multiples opciones</p>
              )}
            </>
          )}
        </div>

        {!showResult && (
          <div className="p-6 border-t border-border flex gap-3">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handleBack} className="bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Atras
              </Button>
            )}
            <Button onClick={handleNext} disabled={!canContinue()} className="flex-1">
              {isLastStep ? "Ver Resultado" : "Continuar"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {showResult && (
          <div className="p-6 border-t border-border">
            <Button variant="ghost" onClick={handleBack} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al diagnostico
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
