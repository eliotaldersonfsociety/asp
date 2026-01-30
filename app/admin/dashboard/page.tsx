import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getAllOrdersAction, updateOrderStatusAction } from '@/lib/actions/orders';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== 'admin') {
    // If not admin, redirect to home or login (or standard dashboard)
    redirect('/dashboard');
  }

  const ordersResponse = await getAllOrdersAction();
  const orders = ordersResponse.success && ordersResponse.data?.orders ? ordersResponse.data.orders : [];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Gestión de órdenes y usuarios.</p>
            </div>
            <Avatar className="h-10 w-10 border border-border">
              <AvatarFallback className="bg-primary/10 text-primary">A</AvatarFallback>
            </Avatar>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Todas las Órdenes</CardTitle>
              <CardDescription>
                Lista completa de pedidos recientes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>País</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Comprobante</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No hay órdenes registradas.
                        </TableCell>
                      </TableRow>
                    ) : (
                      orders.map((order: any) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{order.customerName}</span>
                              <span className="text-xs text-muted-foreground">{order.customerEmail}</span>
                            </div>
                          </TableCell>
                          <TableCell>{order.customerCountry || 'N/A'}</TableCell>
                          <TableCell>${order.total.toLocaleString()} USD</TableCell>
                          <TableCell>
                            <StatusBadge status={order.status} />
                          </TableCell>
                          <TableCell>
                            {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <ProofAction imageUrl={order.paymentProof} />
                          </TableCell>
                          <TableCell className="text-right">
                             <AdminActions order={order} />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    processing: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    completed: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    cancelled: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  };
  return (
    <Badge variant="outline" className={styles[status]}>
      {status}
    </Badge>
  );
}

// Client component for actions to avoid serialization issues if passing functions directly
import { AdminActions } from './actions';
import { ProofAction } from './proof-action';
