"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, X, ZoomIn } from "lucide-react"

interface ProofModalProps {
  imageUrl: string | null
  isOpen: boolean
  onClose: () => void
}

export function ProofModal({ imageUrl, isOpen, onClose }: ProofModalProps) {
  if (!imageUrl) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] flex flex-col p-6 overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
          <div>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <ZoomIn className="w-5 h-5 text-accent" />
              Comprobante de Pago
            </DialogTitle>
            <DialogDescription>
              Previsualización del recibo enviado por el cliente.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="flex-1 relative bg-muted/30 rounded-xl border border-dashed border-border flex items-center justify-center overflow-auto p-2">
          <img
            src={imageUrl}
            alt="Comprobante de Pago"
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg animate-in zoom-in-95 duration-300"
          />
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose} variant="secondary">
            Cerrar Vista
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
