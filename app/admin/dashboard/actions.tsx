'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Loader2 } from 'lucide-react';
import { updateOrderStatusAction } from '@/lib/actions/orders';
import { useRouter } from 'next/navigation';

export function AdminActions({ order }: { order: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('orderId', order.id.toString());
    formData.append('status', newStatus);

    await updateOrderStatusAction(formData);
    setLoading(false);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.customerEmail)}>
          Copiar Email
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Cambiar Estado</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleStatusChange('pending')}>
          Pendiente
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('processing')}>
          En Proceso
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('completed')}>
          Completado
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('cancelled')}>
          Cancelado
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
