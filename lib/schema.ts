import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  name: text('name'),
  address: text('address'),
  city: text('city'),
  department: text('department'),
  country: text('country'),
  whatsappNumber: text('whatsapp_number'),
  role: text('role').default('user'),
  resetToken: text('reset_token'),
  resetTokenExpires: integer('reset_token_expires'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(new Date()),
});

export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').references(() => users.id),
  customerEmail: text('customer_email').notNull(),
  customerName: text('customer_name'),
  customerPhone: text('customer_phone'),
  customerCountry: text('customer_country'),
  total: real('total').notNull(),
  status: text('status').notNull(),
  paymentProof: text('payment_proof'),
  paymentMethod: text('payment_method'),
  diagnosticData: text('diagnostic_data', { mode: 'json' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(new Date()),
});

export const orderItems = sqliteTable('order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: integer('order_id').references(() => orders.id).notNull(),
  name: text('name').notNull(),
  price: real('price').notNull(),
  quantity: integer('quantity').notNull().default(1),
});
