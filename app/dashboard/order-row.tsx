"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { ProofModal } from "@/components/proof-modal"

interface ClientOrderRowProps {
  order: any
}

export function ClientOrderRow({ order }: ClientOrderRowProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg bg-card/50 hover:bg-card/80 transition-colors">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">Orden #{order.id}</span>
          <StatusBadge status={order.status} />
        </div>
        <p className="text-sm text-muted-foreground">
          {new Date(order.createdAt || Date.now()).toLocaleDateString()}
        </p>
        <div className="text-sm text-foreground">
          Items: {order.items?.map((i: any) => i.name).join(', ') || 'Varios'}
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex flex-col items-end gap-2">
        <span className="font-bold text-accent">${order.total.toLocaleString()} USD</span>
        {order.paymentProof ? (
          <>
            <Button 
                variant="link" 
                size="sm" 
                className="h-auto p-0 text-xs text-blue-500 hover:text-blue-600"
                onClick={() => setShowModal(true)}
            >
              <Eye className="w-3 h-3 mr-1" />
              Ver Comprobante
            </Button>
            <ProofModal 
                imageUrl={order.paymentProof} 
                isOpen={showModal} 
                onClose={() => setShowModal(false)} 
            />
          </>
        ) : (
            <span className="text-xs text-muted-foreground italic">Sin comprobante</span>
        )}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    processing: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    completed: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    cancelled: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  };

  const labels: Record<string, string> = {
    pending: "Pendiente",
    processing: "En Proceso",
    completed: "Completado",
    cancelled: "Cancelado",
  };

  return (
    <Badge variant="outline" className={styles[status] || "bg-gray-500/10 text-gray-500"}>
      {labels[status] || status}
    </Badge>
  );
}
