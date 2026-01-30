'use server'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || '8f4e9a1c7b3d6f2e5a0c9b8d7e6f1a2c4b5e8d9f0a3c6b7e2d1f4a5c8b9e0d3'

export async function registerAction(
  email: string, 
  password: string, 
  name: string, 
  whatsappNumber: string, 
  country: string
) {
  try {
    const emailLower = email.trim().toLowerCase()
    
    // Verificar si el usuario ya existe
    const existingUser = await db.select().from(users).where(eq(users.email, emailLower)).limit(1)
    if (existingUser.length > 0) {
      return { success: false, error: 'El email ya está registrado' }
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12)

    // Crear usuario
    const result = await db.insert(users).values({
      email: emailLower,
      password: hashedPassword,
      name,
      whatsappNumber,
      country,
      role: 'client'
    }).returning({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      whatsappNumber: users.whatsappNumber,
      country: users.country
    })

    const newUser = result[0]

    // Generar JWT
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Guardar en cookie
    const cookieStore = await cookies()
    cookieStore.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return {
      success: true,
      user: {
        id: newUser.id.toString(),
        email: newUser.email,
        name: newUser.name || '',
        role: (newUser.role === 'admin' ? 'admin' : 'client') as "admin" | "client"
      }
    }
  } catch (error) {
    console.error('Core register error:', error)
    return { success: false, error: 'Error al registrarse' }
  }
}