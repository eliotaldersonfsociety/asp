import React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"
import NeuralCanvas from "@/components/brain"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://aumentodeseguidores.com"),
  title: {
    default: "Aumento de Seguidores | Crecimiento Real en Redes Sociales",
    template: "%s | Aumento de Seguidores",
  },
  description:
    "Aumenta tus seguidores, likes, comentarios y viewers en vivo de forma orgánica y segura. Servicio profesional de crecimiento estratégico para Instagram, TikTok, Facebook y más.",
  keywords: [
    "aumento de seguidores",
    "comprar seguidores",
    "crecimiento en redes sociales",
    "marketing digital",
    "seguidores reales",
    "likes",
    "viewers",
    "comentarios",
    "Instagram",
    "TikTok",
    "SMM panel",
    "estrategia digital",
  ],
  authors: [{ name: "Aumento de Seguidores", url: "https://aumentodeseguidores.com" }],
  creator: "Aumento de Seguidores",
  publisher: "Aumento de Seguidores",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://aumentodeseguidores.com",
    siteName: "Aumento de Seguidores",
    title: "Aumento de Seguidores | Crecimiento Real en Redes Sociales",
    description:
      "Aumenta tus seguidores, likes, comentarios y viewers en vivo de forma orgánica y segura. Servicio profesional de crecimiento estratégico.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aumento de Seguidores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aumento de Seguidores | Crecimiento Real en Redes Sociales",
    description:
      "Aumenta tus seguidores, likes, comentarios y viewers en vivo de forma orgánica y segura.",
    images: ["/og-image.png"],
    creator: "@aumentoseguidores",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <NeuralCanvas />
              {children}
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
