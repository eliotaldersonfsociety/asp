import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getUserOrdersAction } from '@/lib/actions/orders';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientOrderRow } from './order-row';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const ordersResponse = await getUserOrdersAction();
  const orders = ordersResponse.success && ordersResponse.data?.orders ? ordersResponse.data.orders : [];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Mi Dashboard</h1>
            <p className="text-muted-foreground">Bienvenido, {user.name || user.email}</p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mis Pedidos</CardTitle>
                <CardDescription>Historial de tus compras y estado actual.</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No tienes pedidos aún.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order: any) => (
                      <ClientOrderRow key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
