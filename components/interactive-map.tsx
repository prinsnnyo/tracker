"use client"

import { useEffect, useRef } from "react"
import type { Bus, BusStop } from "@/lib/bus-data"

// Leaflet types and imports
declare global {
  interface Window {
    L: any
  }
}

interface InteractiveMapProps {
  buses: Bus[]
  busStops: BusStop[]
  selectedStop: BusStop
  onStopSelect: (stop: BusStop) => void
  onBusSelect: (bus: Bus) => void
  isConnected: boolean
}

export function InteractiveMap({
  buses,
  busStops,
  selectedStop,
  onStopSelect,
  onBusSelect,
  isConnected,
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<{ [key: string]: any }>({})

  useEffect(() => {
    if (!mapRef.current) return

    // Load Leaflet CSS and JS
    const loadLeaflet = async () => {
      if (!window.L) {
        // Load CSS
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)

        // Load JS
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        await new Promise((resolve) => {
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      // Initialize map
      if (!mapInstanceRef.current && window.L) {
        mapInstanceRef.current = window.L.map(mapRef.current).setView([8.4778, 124.6472], 13)

        // Add tile layer
        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstanceRef.current)
      }
    }

    loadLeaflet()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update markers when data changes
  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker: any) => {
      mapInstanceRef.current.removeLayer(marker)
    })
    markersRef.current = {}

    // Add bus stop markers
    busStops.forEach((stop) => {
      const isSelected = selectedStop.id === stop.id

      // Create custom bus stop icon
      const stopIcon = window.L.divIcon({
        html: `
          <div class="flex flex-col items-center">
            <div class="${
              isSelected ? "bg-emerald-600 text-white scale-125" : "bg-white text-emerald-600 hover:scale-110"
            } p-2 rounded-full shadow-lg border-2 border-emerald-600 transition-all cursor-pointer">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div class="text-xs font-medium mt-1 text-center whitespace-nowrap bg-white px-1 rounded shadow-sm">
              ${stop.name}
            </div>
          </div>
        `,
        className: "bus-stop-marker",
        iconSize: [60, 60],
        iconAnchor: [30, 45],
      })

      const marker = window.L.marker([stop.lat, stop.lng], { icon: stopIcon })
        .addTo(mapInstanceRef.current)
        .on("click", () => onStopSelect(stop))

      markersRef.current[`stop-${stop.id}`] = marker
    })

    // Add bus markers
    buses.forEach((bus) => {
      const isAircon = bus.type === "aircon"
      const busColor = isAircon ? "bg-blue-500" : "bg-orange-500"
      const pulseColor = isAircon ? "bg-blue-400" : "bg-orange-400"

      // Create custom bus icon
      const busIcon = window.L.divIcon({
        html: `
          <div class="relative">
            ${isConnected ? `<div class="absolute inset-0 ${pulseColor} rounded-lg animate-ping opacity-75"></div>` : ""}
            <div class="${busColor} ${!isConnected ? "opacity-50" : ""} p-2 rounded-lg shadow-lg relative z-10 cursor-pointer hover:scale-110 transition-all">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v6H4V6zm2 8a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"/>
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v1H3V4z"/>
              </svg>
            </div>
            <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-bold bg-white px-2 py-1 rounded shadow border">
              ${bus.number}
            </div>
            <div class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-black/80 text-white px-2 py-1 rounded">
              ${Math.round(bus.speed)} km/h
            </div>
          </div>
        `,
        className: "bus-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })

      const marker = window.L.marker([bus.lat, bus.lng], { icon: busIcon })
        .addTo(mapInstanceRef.current)
        .on("click", () => onBusSelect(bus))

      markersRef.current[`bus-${bus.id}`] = marker
    })
  }, [buses, busStops, selectedStop, onStopSelect, onBusSelect, isConnected])

  // Center map on selected stop
  useEffect(() => {
    if (mapInstanceRef.current && selectedStop) {
      mapInstanceRef.current.setView([selectedStop.lat, selectedStop.lng], 15, { animate: true })
    }
  }, [selectedStop])

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />

      {!isConnected && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium z-[1000]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Connection Lost - Showing Last Known Positions
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg text-xs z-[1000]">
        <div className="font-semibold mb-2">Legend</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Air-conditioned Bus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span>Ordinary Bus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
            <span>Bus Stop</span>
          </div>
        </div>
      </div>
    </div>
  )
}
