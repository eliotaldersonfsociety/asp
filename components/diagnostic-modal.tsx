"use client"

import { useState } from "react"
import { X, ArrowRight, ArrowLeft, Check, Brain, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { Logo } from "@/components/logo"
import { useLanguage } from "@/contexts/language-context"

interface DiagnosticModalProps {
  isOpen: boolean
  onClose: () => void
  service?: {
    id: string
    title: string
    subtitle: string
    price: number
  }
}

export function DiagnosticModal({ isOpen, onClose, service }: DiagnosticModalProps) {
  const router = useRouter()
  const { t, formatPrice } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [showResult, setShowResult] = useState(false)
  const { addToCart, setDiagnosticData } = useCart()

  // Default values if service is not provided (fallback)
  const serviceTitle = service?.title || "Political AI"
  const serviceSubtitle = service?.subtitle || "Strategic Positioning"
  const servicePrice = service?.price || 300000
  const serviceId = service?.id || "ia-politica"

  const steps = [
    {
      title: t.diagnostic.title,
      question: t.diagnostic.question,
      options: [
        t.diagnostic.options.politicalCandidate,
        t.diagnostic.options.campaignTeam,
        t.diagnostic.options.politicalConsultant,
        t.diagnostic.options.communicationAgency,
        t.diagnostic.options.other,
      ],
      key: "profile",
    },
    {
      title: t.diagnostic.stageTitle,
      question: t.diagnostic.stageQuestion,
      options: [
        t.diagnostic.stageOptions.preCampaign,
        t.diagnostic.stageOptions.activeCampaign,
        t.diagnostic.stageOptions.reputationalCrisis,
        t.diagnostic.stageOptions.longTermPositioning,
      ],
      key: "stage",
    },
    {
      title: t.diagnostic.objectiveTitle,
      question: t.diagnostic.objectiveQuestion,
      options: [
        t.diagnostic.objectiveOptions.publicPerception,
        t.diagnostic.objectiveOptions.socialEngagement,
        t.diagnostic.objectiveOptions.narrativeControl,
        t.diagnostic.objectiveOptions.candidacyLaunch,
        t.diagnostic.objectiveOptions.commentMonitoring,
      ],
      key: "objective",
      multiple: true,
    },
    {
      title: t.diagnostic.networksTitle,
      question: t.diagnostic.networksQuestion,
      options: ["Facebook", "Instagram", "TikTok", "X (Twitter)", "YouTube", "WhatsApp"],
      key: "networks",
      multiple: true,
    },
    {
      title: t.diagnostic.territoryTitle,
      question: t.diagnostic.territoryQuestion,
      type: "input",
      key: "territory",
    },
    {
      title: t.diagnostic.presenceTitle,
      question: t.diagnostic.presenceQuestion,
      options: [
        t.diagnostic.presenceOptions.low,
        t.diagnostic.presenceOptions.medium,
        t.diagnostic.presenceOptions.high,
      ],
      key: "presence",
    },
    {
      title: t.diagnostic.expectationTitle,
      question: t.diagnostic.expectationQuestion,
      options: [
        t.diagnostic.expectationOptions.reports,
        t.diagnostic.expectationOptions.recommendations,
        t.diagnostic.expectationOptions.messageOptimization,
        t.diagnostic.expectationOptions.strategicAmplification,
        t.diagnostic.expectationOptions.all,
      ],
      key: "expectation",
      multiple: true,
    },
  ]

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
      id: serviceId,
      name: serviceTitle,
      description: serviceSubtitle,
      price: servicePrice,
    })
    onClose()
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
    router.push("/checkout")
  }

  const handleContactStrategist = () => {
    const message = encodeURIComponent(
      `Hello, I completed the diagnostic for ${serviceTitle} and would like to speak with a strategist.\n\nProfile: ${answers.profile}\nStage: ${answers.stage}\nObjective: ${Array.isArray(answers.objective) ? answers.objective.join(", ") : answers.objective}\nTerritory: ${answers.territory}`
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
                <h2 className="font-semibold text-foreground">Diagnostic {serviceTitle}</h2>
                <p className="text-sm text-muted-foreground">
                  {showResult ? t.checkout.orderStatus : `Step ${currentStep + 1} of ${steps.length}`}
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
              <h3 className="text-xl font-bold text-foreground mb-2">{t.diagnostic.success}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t.diagnostic.successDesc}
              </p>
              
              <div className="bg-secondary/50 rounded-xl p-4 mb-6 text-left">
                <h4 className="font-medium text-foreground mb-2">Profile Summary:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li><span className="text-foreground">Profile:</span> {answers.profile}</li>
                  <li><span className="text-foreground">Stage:</span> {answers.stage}</li>
                  <li><span className="text-foreground">Territory:</span> {answers.territory}</li>
                  <li><span className="text-foreground">Current presence:</span> {answers.presence}</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                {t.checkout.strategicNote}
              </p>

              <div className="flex flex-col gap-3">
                <Button onClick={handleAddToCart} className="w-full">
                  <Brain className="w-4 h-4 mr-2" />
                  {t.hero.btnPrimary}
                </Button>
                <Button variant="outline" onClick={handleContactStrategist} className="w-full bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t.hero.btnSecondary}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground mb-6">{step.question}</p>

              {step.type === "input" ? (
                <div>
                  <Label htmlFor="territory" className="sr-only">{t.diagnostic.territoryTitle}</Label>
                  <Input
                    id="territory"
                    placeholder="e.g., USA, New York / UK, London"
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
                <p className="text-xs text-muted-foreground mt-3">You can select multiple options</p>
              )}
            </>
          )}
        </div>

        {!showResult && (
          <div className="p-6 border-t border-border flex gap-3">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handleBack} className="bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.checkout.back}
              </Button>
            )}
            <Button onClick={handleNext} disabled={!canContinue()} className="flex-1">
              {isLastStep ? t.checkout.orderStatus : t.hero.btnPrimary}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {showResult && (
          <div className="p-6 border-t border-border">
            <Button variant="ghost" onClick={handleBack} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.checkout.back}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
