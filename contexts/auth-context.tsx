"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  name: string
  company: string
  role: string
  email: string
}

interface AuthContextValue {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

interface RegisterData {
  company: string
  name: string
  email: string
  phone: string
  password: string
}

const AuthContext = createContext<AuthContextValue | null>(null)

const STORAGE_KEY = "maas_portal_user"

// 模拟已注册用户库（仅前端演示用）
const DEMO_USERS: Array<User & { email: string; password: string }> = [
  {
    email: "admin@example.com",
    password: "admin123",
    name: "张三",
    company: "中科云数科技有限公司",
    role: "超级管理员",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 从 sessionStorage 中恢复登录状态
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch {
      // ignore
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // 模拟网络延迟
    await new Promise((r) => setTimeout(r, 800))

    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (!found) {
      return { success: false, error: "账号或密码错误，请重新输入" }
    }

    const { email: _e, password: _p, ...userData } = found
    setUser(userData)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
    return { success: true }
  }

  const register = async (data: RegisterData) => {
    await new Promise((r) => setTimeout(r, 1000))

    const exists = DEMO_USERS.find((u) => u.email === data.email)
    if (exists) {
      return { success: false, error: "该邮箱已注册，请直接登录" }
    }

    const newUser: User = {
      name: data.name,
      company: data.company,
      role: "超级管理员",
      email: data.email,
    }

    // 加入模拟用户库
    DEMO_USERS.push({ ...newUser, email: data.email, password: data.password })

    setUser(newUser)
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    return { success: true }
  }

  const logout = () => {
    setUser(null)
    sessionStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
