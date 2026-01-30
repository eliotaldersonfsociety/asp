'use server'

import { db } from '@/lib/db'
import { users } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { Resend } from 'resend'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function forgotPasswordAction(email: string) {
  try {
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email.trim().toLowerCase()))
      .limit(1)

    if (userResult.length === 0) {
      // Por seguridad, no revelamos si el email existe o no
      return { success: true, message: 'Si el correo está registrado, recibirás un enlace de recuperación.' }
    }

    const user = userResult[0]
    const token = crypto.randomBytes(32).toString('hex')
    const expires = Date.now() + 3600000 // 1 hora

    await db
      .update(users)
      .set({
        resetToken: token,
        resetTokenExpires: expires,
      })
      .where(eq(users.id, user.id))

    const domain = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const resetLink = `${domain}/reset-password?token=${token}`

    await resend.emails.send({
      from: process.env.RESEND_FROM || 'onboarding@resend.dev',
      to: user.email,
      subject: 'Recuperar Contraseña - Aumento de Seguidores',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 8px;">
          <h2 style="color: #22c55e;">Recuperación de Contraseña</h2>
          <p>Hola ${user.name || 'Usuario'},</p>
          <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente botón para continuar:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Restablecer Contraseña</a>
          </div>
          <p>Este enlace expirará en 1 hora. Si no solicitaste esto, puedes ignorar este mensaje.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">Aumento de Seguidores - Tu éxito en redes sociales.</p>
        </div>
      `,
    })

    return { success: true, message: 'Si el correo está registrado, recibirás un enlace de recuperación.' }
  } catch (error) {
    console.error('Forgot password error:', error)
    return { success: false, error: 'Hubo un error al procesar tu solicitud.' }
  }
}