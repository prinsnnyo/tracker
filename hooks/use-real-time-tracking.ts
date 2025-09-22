"use client"

import { useState, useEffect, useCallback } from "react"
import { buses as initialBuses, updateBusPositions, type Bus } from "@/lib/bus-data"

export function useRealTimeTracking() {
  const [buses, setBuses] = useState<Bus[]>(initialBuses)
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [updateInterval, setUpdateInterval] = useState(3000) // 3 seconds

  const updateBuses = useCallback(() => {
    try {
      const updatedBuses = updateBusPositions()
      setBuses(updatedBuses)
      setLastUpdate(new Date())
      setIsConnected(true)
    } catch (error) {
      console.error("Failed to update bus positions:", error)
      setIsConnected(false)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(updateBuses, updateInterval)
    return () => clearInterval(interval)
  }, [updateBuses, updateInterval])

  const refreshData = useCallback(() => {
    updateBuses()
  }, [updateBuses])

  const setRefreshRate = useCallback((rate: "slow" | "normal" | "fast") => {
    const rates = {
      slow: 10000, // 10 seconds
      normal: 3000, // 3 seconds
      fast: 1000, // 1 second
    }
    setUpdateInterval(rates[rate])
  }, [])

  return {
    buses,
    isConnected,
    lastUpdate,
    refreshData,
    setRefreshRate,
  }
}
