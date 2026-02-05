"use client"

import { Shield, FileCheck, AlertCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function LegalSection() {
  const { t, language } = useLanguage()
  
  return (
    <section className="py-16 border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent" />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {t.ethical.title}
            </h3>
            
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                {language === 'es' 
                  ? (
                    <>
                      <span className="text-foreground">análisis, posicionamiento digital y amplificación estratégica.</span>{' '}
                      Trabajamos para maximizar el alcance de mensajes legítimos y mejorar la percepción pública de nuestros clientes.
                    </>
                  )
                  : (
                    <>
                      <span className="text-foreground">analysis, digital positioning, and strategic amplification.</span>{' '}
                      We work to maximize the reach of legitimate messages and improve the public perception of our clients.
                    </>
                  )
                }
              </p>
              
              <div className="flex items-start gap-3">
                <FileCheck className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <p>{t.ethical.noFakeContent}</p>
              </div>
              
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <p>{t.ethical.clientResponsibility}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
