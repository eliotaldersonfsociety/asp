'use server'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || '8f4e9a1c7b3d6f2e5a0c9b8d7e6f1a2c4b5e8d9f0a3c6b7e2d1f4a5c8b9e0d3'

export async function loginAction(email: string, password: string) {
  try {
    console.log('Login attempt:', email)

    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email.trim().toLowerCase()))
      .limit(1)

    if (userResult.length === 0) {
      console.log('User not found')
      return { success: false, error: 'Credenciales inválidas' }
    }

    const user = userResult[0]
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      console.log('Invalid password for user:', email)
      return { success: false, error: 'Credenciales inválidas' }
    }

    console.log('Password valid, generating token...')

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

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
        id: user.id.toString(),
        email: user.email,
        name: user.name || '',
        role: (user.role === 'admin' ? 'admin' : 'client') as "admin" | "client"
      } 
    }

  } catch (error) {
    console.error('Core login error:', error)
    return { success: false, error: 'Error interno del servidor' }
  }
}