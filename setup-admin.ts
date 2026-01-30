import 'dotenv/config';
import { db } from './lib/db';
import { users } from './lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

async function setup() {
  const adminEmail = 'admin@aumentodeseguidores.com';
  const existing = await db.select().from(users).where(eq(users.email, adminEmail)).limit(1);

  if (existing.length === 0) {
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await db.insert(users).values({
      email: adminEmail,
      password: hashedPassword,
      name: 'Administrador',
      role: 'admin'
    });
    console.log('Admin user created: admin@aumentodeseguidores.com / admin123');
  } else {
    console.log('Admin user already exists');
    // Actualizar contraseña por si acaso para estar seguros durante la prueba
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await db.update(users).set({ password: hashedPassword }).where(eq(users.email, adminEmail));
    console.log('Admin password reset to admin123');
  }
}

setup().catch(console.error);
