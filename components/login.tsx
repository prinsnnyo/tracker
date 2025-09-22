"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bus, Lock, User } from "lucide-react"

interface LoginProps {
  onLogin: (username: string, password: string) => void
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login delay
    setTimeout(() => {
      onLogin(username, password)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative"
      style={{
        backgroundImage: 'url(/BUS.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#1f2937'
      }}
    >
      {/* Enhanced overlay with bus-themed gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-blue-900/30 to-black/60"></div>
      
      {/* Bus-themed decorative elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Bus className="h-24 w-24 text-white transform rotate-12" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-15">
        <Bus className="h-32 w-32 text-white transform -rotate-12" />
      </div>
      
      {/* Login card - enhanced with bus theme */}
      <Card className="w-full max-w-md mx-4 relative z-10 backdrop-blur-md bg-white/90 shadow-2xl border border-white/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gray-500 rounded-full shadow-lg">
              <Bus className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">
            🚌 BUSWISE
          </CardTitle>
          <CardDescription className="text-gray-600 text-base">
            Your Smart Bus Tracking Companion
            <br />
            <span className="text-sm opacity-75">Real-time tracking • Live updates • Smart routes</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-700 font-medium mb-2 flex items-center gap-2">
              Demo Credentials:
            </p>
            <p className="text-xs text-gray-600">Username: <span className="font-mono bg-white px-1 rounded">admin</span></p>
            <p className="text-xs text-gray-600">Password: <span className="font-mono bg-white px-1 rounded">password</span></p>
            <p className="text-xs text-gray-500 mt-2 italic">
              Any credentials work for this demo!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}