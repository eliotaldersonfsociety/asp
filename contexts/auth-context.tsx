"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { checkAuthAction } from "@/lib/actions/check-auth"
import { logoutAction } from "@/lib/actions/logout"
import { loginAction } from "@/lib/actions/login"
import { registerAction } from "@/lib/actions/register"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "client"
  createdAt?: string
}

export interface Order {
  id: string
  userId: string
  items: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
  total: number
  status: "pending" | "processing" | "completed" | "cancelled"
  createdAt: string
  diagnosticData?: Record<string, unknown>
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>
  register: (email: string, password: string, name: string, whatsappNumber: string, country: string) => Promise<{ success: boolean; user?: User; error?: string }>
  logout: () => void
  refreshAuth: () => Promise<void>
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "userId" | "createdAt">) => Order
  getAllOrders: () => Order[]
  getAllUsers: () => User[]
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [users_state, setUsersState] = useState<User[]>([])

  const fetchAuthStatus = async () => {
    try {
      const { isAuthenticated, user: serverUser } = await checkAuthAction();
      if (isAuthenticated && serverUser) {
        setUser({
          id: serverUser.id.toString(),
          email: serverUser.email,
          name: serverUser.name || 'Usuario',
          role: (serverUser.role === 'admin' ? 'admin' : 'client'),
          createdAt: serverUser.createdAt ? new Date(serverUser.createdAt).toISOString() : new Date().toISOString()
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthStatus();
  }, [])

  const login = async (email: string, password: string) => {
    const result = await loginAction(email, password);
    if (result.success && result.user) {
      setUser(result.user as User);
    }
    return result;
  }

  const register = async (email: string, password: string, name: string, whatsappNumber: string, country: string) => {
    const result = await registerAction(email, password, name, whatsappNumber, country);
    if (result.success && result.user) {
      setUser(result.user as User);
    }
    return result;
  }

  const logout = async () => {
    await logoutAction();
    setUser(null);
    window.location.href = '/login';
  }

  const refreshAuth = async () => {
    await fetchAuthStatus();
  }

  const addOrder = (orderData: Omit<Order, "id" | "userId" | "createdAt">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `order_${Date.now()}`,
      userId: user?.id || "guest",
      createdAt: new Date().toISOString()
    }
    setOrders(prev => [...prev, newOrder]);
    return newOrder
  }

  const getAllOrders = () => orders
  const getAllUsers = () => users_state

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  }

  const userOrders = user ? orders.filter(o => o.userId === user.id) : []

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        refreshAuth,
        orders: userOrders,
        addOrder,
        getAllOrders,
        getAllUsers,
        updateOrderStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
