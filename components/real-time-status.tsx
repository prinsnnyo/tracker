"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wifi, WifiOff, RefreshCw, Clock, LogOut, User } from "lucide-react"

interface User {
  username: string
  role: string
}

interface RealTimeStatusProps {
  isConnected: boolean
  lastUpdate: Date
  onRefresh: () => void
  onRateChange: (rate: "slow" | "normal" | "fast") => void
  user: User | null
  onLogout: () => void
}

export function RealTimeStatus({ isConnected, lastUpdate, onRefresh, onRateChange, user, onLogout }: RealTimeStatusProps) {
  const timeSinceUpdate = Math.floor((Date.now() - lastUpdate.getTime()) / 1000)

  return (
    <div className="flex items-center justify-between p-3 bg-card border-b">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {isConnected ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
          <Badge variant={isConnected ? "default" : "destructive"}>{isConnected ? "Live" : "Offline"}</Badge>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{timeSinceUpdate < 60 ? `${timeSinceUpdate}s ago` : `${Math.floor(timeSinceUpdate / 60)}m ago`}</span>
        </div>

        {/* User info and logout button */}
        <div className="flex items-center gap-2 ml-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{user?.username}</span>
            {user?.role === "admin" && (
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                Admin
              </span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onLogout}
            className="h-7 px-2 text-xs flex items-center gap-1"
          >
            <LogOut className="h-3 w-3" />
            Logout
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <select
          className="text-xs border rounded px-2 py-1"
          onChange={(e) => onRateChange(e.target.value as "slow" | "normal" | "fast")}
          defaultValue="normal"
          title="Update frequency"
          aria-label="Select update frequency"
        >
          <option value="slow">Slow (10s)</option>
          <option value="normal">Normal (3s)</option>
          <option value="fast">Fast (1s)</option>
        </select>

        <Button variant="ghost" size="sm" onClick={onRefresh} className="h-8 w-8 p-0">
          <RefreshCw className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
