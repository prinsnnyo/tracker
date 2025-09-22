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
      className="min-h-screen flex items-center justify-center p-3 sm:p-6 md:p-8 relative"
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
      <div className="absolute top-4 left-4 sm:top-10 sm:left-10 opacity-20">
        <Bus className="h-16 w-16 sm:h-24 sm:w-24 text-white transform rotate-12" />
      </div>
      <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-10 opacity-15">
        <Bus className="h-20 w-20 sm:h-32 sm:w-32 text-white transform -rotate-12" />
      </div>
      
      {/* Login card - enhanced with bus theme */}
      <Card className="w-full max-w-sm sm:max-w-md mx-3 sm:mx-4 relative z-10 backdrop-blur-md bg-white/90 shadow-2xl border border-white/20">
        <CardHeader className="text-center pb-4 sm:pb-6">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="p-3 sm:p-4 bg-gray-500 rounded-full shadow-lg">
              <Bus className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">
            BUSWISE
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm sm:text-base px-2 sm:px-0">
            Your Smart Bus Tracking Companion
            <br />
            <span className="text-xs sm:text-sm opacity-75">Real-time tracking • Live updates • Smart routes</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
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
                  className="pl-10 h-11 sm:h-10"
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
                  className="pl-10 h-11 sm:h-10"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 h-11 sm:h-10 text-base sm:text-sm"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm font-medium mb-2 text-gray-700">
              Demo Credentials:
            </p>
            <div className="space-y-1">
              <p className="text-xs text-gray-600">
                Username: <span className="font-mono bg-white px-1.5 py-0.5 rounded text-xs">admin</span>
              </p>
              <p className="text-xs text-gray-600">
                Password: <span className="font-mono bg-white px-1.5 py-0.5 rounded text-xs">password</span>
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-2 italic leading-relaxed">
              Any credentials work for this demo!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}