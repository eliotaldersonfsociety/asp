// lib/actions/orders.ts
'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { db } from '@/lib/db';
import { orders, orderItems, users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import ImageKit from 'imagekit';
import { revalidatePath } from 'next/cache';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

const createOrderSchema = z.object({
  total: z.number().positive('El total debe ser mayor a 0'),
  status: z.string().min(1, 'El estado es requerido'),
  customerEmail: z.string().email('Email inválido'),
  customerName: z.string().optional(),
  customerPhone: z.string().optional(),
  customerCountry: z.string().optional(),
  paymentProof: z.string().optional(),
  paymentMethod: z.string().optional(),
  diagnosticData: z.string().optional(),
});

const createOrderItemsSchema = z.object({
  orderId: z.number().positive('ID de pedido inválido'),
  items: z.array(z.object({
    name: z.string().min(1, 'El nombre del item es requerido'),
    price: z.number().positive('El precio debe ser mayor a 0'),
    quantity: z.number().positive().optional().default(1),
  })).min(1, 'Debe haber al menos un item')
});

interface OrderResponse {
  success: boolean;
  error?: string;
  data?: any;
}

async function getUserIdFromTokenOptional(): Promise<number | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: number };
    return decoded.userId;
  } catch {
    return null;
  }
}

async function getUserEmailFromToken(): Promise<string | null> {
  const userId = await getUserIdFromTokenOptional();
  if (!userId) return null;

  const user = await db.select({ email: users.email }).from(users).where(eq(users.id, userId)).limit(1);
  return user[0]?.email || null;
}

export async function createOrderAction(formData: FormData): Promise<OrderResponse> {
  try {
    const total = parseFloat(formData.get('total')?.toString() || '0');
    const status = formData.get('status')?.toString() || '';
    const customerEmail = formData.get('customerEmail')?.toString() || '';
    const customerName = formData.get('customerName')?.toString() || '';
    const customerPhone = formData.get('customerPhone')?.toString() || '';
    const customerCountry = formData.get('country')?.toString() || '';
    const file = formData.get('file') as File;
    const paymentMethod = formData.get('paymentMethod')?.toString() || undefined;
    const diagnosticData = formData.get('diagnosticData')?.toString() || undefined;

    let paymentProof: string | undefined;
    if (file) {
       // ... (file upload logic remains same)
       if (file.size > 1024 * 1024) {
        return { success: false, error: 'File size must be less than 1MB' };
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        return { success: false, error: 'Invalid file type. Only JPG, PNG, PDF allowed' };
      }
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const result = await imagekit.upload({
        file: buffer,
        fileName: file.name,
        folder: '/payment-proofs',
      });
      paymentProof = result.url;
    }

    const userId = await getUserIdFromTokenOptional();

    let finalCustomerEmail = customerEmail;
    if (userId && !finalCustomerEmail) {
      finalCustomerEmail = await getUserEmailFromToken() || '';
    }

    const validatedData = createOrderSchema.parse({
      total,
      status,
      customerEmail: finalCustomerEmail,
      customerName,
      customerPhone,
      customerCountry,
      paymentProof,
      paymentMethod,
      diagnosticData,
    });

    const result = await db.insert(orders).values({
      userId,
      customerEmail: validatedData.customerEmail,
      customerName: validatedData.customerName || null,
      customerPhone: validatedData.customerPhone || null,
      customerCountry: validatedData.customerCountry || null,
      total: validatedData.total,
      status: validatedData.status,
      paymentProof: validatedData.paymentProof,
      paymentMethod: validatedData.paymentMethod,
      diagnosticData: validatedData.diagnosticData ? JSON.parse(validatedData.diagnosticData) : null,
    }).returning({
      id: orders.id,
      userId: orders.userId,
      customerEmail: orders.customerEmail,
      customerName: orders.customerName,
      total: orders.total,
      status: orders.status,
      paymentProof: orders.paymentProof,
      paymentMethod: orders.paymentMethod,
      customerPhone: orders.customerPhone,
      customerCountry: orders.customerCountry,
      diagnosticData: orders.diagnosticData,
    });

    return {
      success: true,
      data: { order: result[0] },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || 'Datos inválidos' };
    }
    console.error('Create order error:', error);
    return { success: false, error: 'Error creating order' };
  }
}

export async function createOrderItemsAction(formData: FormData): Promise<OrderResponse> {
  try {
    const orderId = parseInt(formData.get('orderId')?.toString() || '0');
    const itemsJson = formData.get('items')?.toString() || '[]';

    let items: Array<{ name: string; price: number; quantity?: number }>;
    try {
      items = JSON.parse(itemsJson);
    } catch {
      return { success: false, error: 'Invalid items format' };
    }

    const validatedData = createOrderItemsSchema.parse({ orderId, items });

    const orderExists = await db.select().from(orders).where(eq(orders.id, validatedData.orderId)).limit(1);
    if (orderExists.length === 0) {
      return { success: false, error: 'Order not found' };
    }

    const itemsToInsert = validatedData.items.map(item => ({
      orderId: validatedData.orderId,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
    }));

    const result = await db.insert(orderItems).values(itemsToInsert).returning({
      id: orderItems.id,
      orderId: orderItems.orderId,
      name: orderItems.name,
      price: orderItems.price,
      quantity: orderItems.quantity,
    });

    return {
      success: true,
      data: { items: result },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || 'Datos inválidos' };
    }
    console.error('Create order items error:', error);
    return { success: false, error: 'Error creating order items' };
  }
}


export async function updateOrderStatusAction(formData: FormData): Promise<OrderResponse> {
  try {
    const orderId = parseInt(formData.get('orderId')?.toString() || '0');
    const status = formData.get('status')?.toString() || '';

    if (!orderId || !status) {
      return { success: false, error: 'Order ID and status are required' };
    }

    await db.update(orders).set({ status }).where(eq(orders.id, orderId));
    
    revalidatePath('/admin/dashboard');
    revalidatePath('/dashboard');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Update order status error:', error);
    return { success: false, error: 'Error updating order status' };
  }
}

export async function getAllOrdersAction(): Promise<OrderResponse> {
  try {
    // Fetch all orders
    const ordersResult = await db.select().from(orders);

    // Get items for each order
    const ordersWithItems = await Promise.all(
      ordersResult.map(async (order) => {
        const items = await db.select()
          .from(orderItems)
          .where(eq(orderItems.orderId, order.id));

        return { ...order, items };
      })
    );

    // Map to ensure all data is serializable (converting Dates to strings)
    const serializableOrders = ordersWithItems.map(order => ({
      ...order,
      createdAt: order.createdAt instanceof Date ? order.createdAt.toISOString() : order.createdAt,
    }));

    // Sort by id descending
    const sortedOrders = serializableOrders.sort((a, b) => b.id - a.id);

    return {
      success: true,
      data: { orders: sortedOrders },
    };
  } catch (error) {
    console.error('Get all orders error:', error);
    return { success: false, error: 'Error fetching orders' };
  }
}

export async function getOrderByIdAction(orderId: number): Promise<OrderResponse> {
  try {
    const orderResult = await db.select({
      id: orders.id,
      userId: orders.userId,
      customerEmail: orders.customerEmail,
      customerName: orders.customerName,
      customerCountry: orders.customerCountry,
      total: orders.total,
      status: orders.status,
      paymentProof: orders.paymentProof,
      paymentMethod: orders.paymentMethod,
    }).from(orders).where(eq(orders.id, orderId)).limit(1);

    if (orderResult.length === 0) {
      return { success: false, error: 'Orden no encontrada' };
    }

    const order = orderResult[0];

    // Get items
    const items = await db.select({
      id: orderItems.id,
      name: orderItems.name,
      price: orderItems.price,
      quantity: orderItems.quantity,
    }).from(orderItems).where(eq(orderItems.orderId, order.id));

    return {
      success: true,
      data: { order: { ...order, items } },
    };
  } catch (error) {
    console.error('Get order by id error:', error);
    return { success: false, error: 'Error fetching order' };
  }
}

// getUserOrdersAction similarly needs update
export async function getUserOrdersAction(): Promise<OrderResponse> {
  try {
    const userId = await getUserIdFromTokenOptional();
    if (!userId) {
      return { success: false, error: 'User not authenticated' };
    }

    const ordersResult = await db.select({
      id: orders.id,
      userId: orders.userId,
      customerEmail: orders.customerEmail,
      customerName: orders.customerName,
      customerCountry: orders.customerCountry, // Added
      total: orders.total,
      status: orders.status,
      paymentProof: orders.paymentProof,
      paymentMethod: orders.paymentMethod,
      createdAt: orders.createdAt,
    }).from(orders).where(eq(orders.userId, userId));

    // ... (rest same)
     const ordersWithItems = await Promise.all(
      ordersResult.map(async (order) => {
        const items = await db.select({
          id: orderItems.id,
          name: orderItems.name,
          price: orderItems.price,
          quantity: orderItems.quantity,
        }).from(orderItems).where(eq(orderItems.orderId, order.id));

        return { ...order, items };
      })
    );

    return {
      success: true,
      data: { orders: ordersWithItems },
    };
  } catch (error) {
    console.error('Get user orders error:', error);
    return { success: false, error: 'Error fetching user orders' };
  }
}

export async function completeOrderAction(formData: FormData): Promise<OrderResponse> {
  try {
    const email = formData.get('email')?.toString() || '';
    const name = formData.get('name')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const country = formData.get('country')?.toString() || ''; // New field
    const totalRaw = formData.get('total')?.toString() || '0';
    const total = parseFloat(totalRaw);
    const itemsJson = formData.get('items')?.toString() || '[]';
    const diagnosticDataRaw = formData.get('diagnosticData')?.toString();
    const paymentMethod = formData.get('paymentMethod')?.toString() || 'transfer';
    const file = formData.get('file') as File | null;

    // Validations
    if (!email) return { success: false, error: 'El email es requerido' };
    if (!name) return { success: false, error: 'El nombre es requerido' };
    if (total <= 0) return { success: false, error: 'El total debe ser mayor a 0' };

    let items: Array<{ id: string; name: string; price: number; quantity: number }>;
    try {
      items = JSON.parse(itemsJson);
      if (!Array.isArray(items) || items.length === 0) {
        return { success: false, error: 'El carrito está vacío' };
      }
    } catch {
      return { success: false, error: 'Formato de items inválido' };
    }

    // ImageKit Upload
    let paymentProofUrl: string | undefined;
    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        return { success: false, error: 'El archivo debe ser menor a 5MB' };
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        return { success: false, error: 'Tipo de archivo no válido. Solo JPG, PNG, PDF' };
      }
      
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await imagekit.upload({
          file: buffer,
          fileName: `proof_${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`,
          folder: '/payment-proofs',
        });
        paymentProofUrl = result.url;
      } catch (uploadError) {
        console.error('ImageKit upload error:', uploadError);
        return { success: false, error: 'Error al subir el comprobante de pago' };
      }
    }

    // User Handling
    let userId = await getUserIdFromTokenOptional();
    let finalEmail = email;

    if (!userId) {
      // Check if user exists by email
      const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
      
      if (existingUser.length > 0) {
        return { 
          success: false, 
          error: 'Este correo electrónico ya está registrado. Por favor, inicia sesión para continuar con la compra.' 
        };
      } else {
        // Register new user
        const password = formData.get('password')?.toString();
        const finalPassword = password || Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(finalPassword, 12);

        const newUser = await db.insert(users).values({
          email,
          password: hashedPassword,
          name: name,
          whatsappNumber: phone,
          country: country || null, // Guardar país en usuario también
          role: 'user',
        }).returning({ id: users.id });

        userId = newUser[0].id;

        const token = jwt.sign(
          { userId: newUser[0].id, email, role: 'user' },
          process.env.JWT_SECRET || 'fallback-secret',
          { expiresIn: '7d' }
        );
        const cookieStore = await cookies();
        cookieStore.set('authToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        });
      }
    }

    // Create Order
    const result = await db.insert(orders).values({
      userId,
      customerEmail: finalEmail,
      customerName: name,
      customerPhone: phone,
      customerCountry: country || null, // Guardar país en orden
      total: total,
      status: 'pending',
      paymentProof: paymentProofUrl,
      paymentMethod: paymentMethod,
      diagnosticData: diagnosticDataRaw ? JSON.parse(diagnosticDataRaw) : null,
    }).returning({ id: orders.id });

    const orderId = result[0].id;

    // Create Order Items
    const itemsToInsert = items.map(item => ({
      orderId,
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
    }));

    if (itemsToInsert.length > 0) {
      await db.insert(orderItems).values(itemsToInsert);
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/dashboard');

    return { 
      success: true, 
      data: { orderId } 
    };

  } catch (error) {
    console.error('Complete order error:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || 'Datos inválidos' };
    }
    return { success: false, error: 'Error al completar el pedido' };
  }
}