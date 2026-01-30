"use client"

import { useState } from "react"
import { ProofModal } from "@/components/proof-modal"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export function ProofAction({ imageUrl }: { imageUrl: string | null }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!imageUrl) return <span className="text-muted-foreground text-sm">-</span>

  return (
    <>
      <Button 
        variant="link" 
        size="sm" 
        className="text-blue-500 hover:text-blue-600 p-0 h-auto font-normal"
        onClick={() => setIsOpen(true)}
      >
        <Eye className="w-3.5 h-3.5 mr-1" />
        Ver comprobante
      </Button>
      <ProofModal 
        imageUrl={imageUrl} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  )
}
