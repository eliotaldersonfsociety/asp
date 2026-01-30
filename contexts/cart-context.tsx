"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
}

export interface DiagnosticData {
  profile?: string
  stage?: string
  objective?: string | string[]
  networks?: string | string[]
  territory?: string
  presence?: string
  expectation?: string | string[]
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  diagnosticData: DiagnosticData | null
  setDiagnosticData: (data: DiagnosticData | null) => void
  hasStrategicSetup: boolean
  setHasStrategicSetup: (value: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null)
  const [hasStrategicSetup, setHasStrategicSetup] = useState(false)

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        diagnosticData,
        setDiagnosticData,
        hasStrategicSetup,
        setHasStrategicSetup,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
