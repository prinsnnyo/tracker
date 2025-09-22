"use client"

import { BusTracker } from "@/components/bus-tracker"
import Login from "@/components/login"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const { user, isAuthenticated, login, logout } = useAuth()

  const handleLogin = (username: string, password: string) => {
    login(username, password)
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <main className="min-h-screen bg-background">
      <BusTracker user={user} onLogout={logout} />
    </main>
  )
}
