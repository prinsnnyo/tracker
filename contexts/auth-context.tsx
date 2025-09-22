"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  username: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Check for existing session on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("buswise-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (username: string, password: string): boolean => {
    // Simple demo authentication - any credentials work
    // In a real app, this would validate against a backend
    if (username.trim() && password.trim()) {
      const newUser: User = {
        username: username,
        role: username.toLowerCase() === "admin" ? "admin" : "user"
      }
      
      setUser(newUser)
      localStorage.setItem("buswise-user", JSON.stringify(newUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("buswise-user")
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}