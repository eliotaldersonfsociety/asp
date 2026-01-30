'use server'

import { db } from '@/lib/db'
import { users } from '@/lib/schema'
import { eq, and, gt } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export async function resetPasswordAction(token: string, password: string) {
  try {
    const now = Date.now()
    
    const userResult = await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.resetToken, token),
          gt(users.resetTokenExpires, now)
        )
      )
      .limit(1)

    if (userResult.length === 0) {
      return { success: false, error: 'El enlace de recuperación es inválido o ha expirado.' }
    }

    const user = userResult[0]
    const hashedPassword = await bcrypt.hash(password, 12)

    await db
      .update(users)
      .set({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null,
      })
      .where(eq(users.id, user.id))

    return { success: true, message: 'Contraseña restablecida correctamente. Ya puedes iniciar sesión.' }
  } catch (error) {
    console.error('Reset password error:', error)
    return { success: false, error: 'Hubo un error al restablecer la contraseña.' }
  }
}
