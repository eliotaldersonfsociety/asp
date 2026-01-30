import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export interface User {
  id: number;
  email: string;
  name: string | null;
  role: string | null;
  country: string | null;
  createdAt: Date | null;
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: number };
    const userResult = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1);
    
    if (userResult.length === 0) return null;
    
    return userResult[0];
  } catch (error) {
    return null;
  }
}
