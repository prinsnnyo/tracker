"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Clock, Search, Navigation, Users, Fuel, Zap } from "lucide-react"
import { busStops, getBusesNearStop, Bus } from "@/lib/bus-data"
import { useRealTimeTracking } from "@/hooks/use-real-time-tracking"
import { RealTimeStatus } from "@/components/real-time-status"
import { InteractiveMap } from "@/components/interactive-map"

interface User {
  username: string
  role: string
}

interface BusTrackerProps {
  user: User | null
  onLogout: () => void
}

export function BusTracker({ user, onLogout }: BusTrackerProps) {
  const [selectedStop, setSelectedStop] = useState(busStops[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  const { buses, isConnected, lastUpdate, refreshData, setRefreshRate } = useRealTimeTracking()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredStops = busStops.filter((stop) => stop.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const nearbyBuses = getBusesNearStop(selectedStop.id, 15)

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6" />
            <h1 className="text-xl font-bold">Smart Bus Tracker</h1>
          </div>
          <div className="text-sm">{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>

      <RealTimeStatus
        isConnected={isConnected}
        lastUpdate={lastUpdate}
        onRefresh={refreshData}
        onRateChange={setRefreshRate}
        user={user}
        onLogout={onLogout}
      />

      {/* Main Content - Google Maps Style Layout */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Desktop Only (Google Maps Style) */}
        <div className="hidden lg:flex lg:flex-col lg:w-96 bg-white border-r shadow-lg overflow-hidden">
          {/* Search Section */}
          <div className="p-4 border-b bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bus stops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500"
              />
            </div>
            {searchQuery && (
              <div className="mt-2 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto z-50 relative">
                {filteredStops.map((stop) => (
                  <div
                    key={stop.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => {
                      setSelectedStop(stop)
                      setSearchQuery("")
                    }}
                  >
                    <div className="font-medium text-gray-900">{stop.name}</div>
                    <div className="text-sm text-gray-600">Routes: {stop.routes.join(", ")}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Stop Info */}
          <div className="p-4 border-b bg-white">
            <div className="flex items-center gap-2 mb-3">
              <Navigation className="h-5 w-5 text-blue-600" />
              <h2 className="font-semibold text-lg text-gray-900">{selectedStop.name}</h2>
            </div>
            <div className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Routes:</span> {selectedStop.routes.join(" • ")}
            </div>
            <div className="text-xs text-gray-500">
              <span className="font-medium">Facilities:</span> {selectedStop.facilities.join(" • ")}
            </div>
          </div>

          {/* Bus List */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            <div className="p-4">
              <h3 className="font-medium mb-3 text-gray-900 text-sm uppercase tracking-wide">
                Nearby Buses ({nearbyBuses.length})
              </h3>
              
              {/* Debug Info - Remove in production */}
              <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                <div>Selected Stop: {selectedStop.name} ({selectedStop.lat}, {selectedStop.lng})</div>
                <div>Total Buses: {buses.length}</div>
                <div>Search Radius: 15km</div>
              </div>
              
              {nearbyBuses.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Clock className="h-12 w-12 mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium">No buses nearby</p>
                  <p className="text-xs mt-1 text-gray-400">Try selecting a different location</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {nearbyBuses.map((bus) => {
                    const timeSinceUpdate = Math.floor((Date.now() - bus.lastUpdated.getTime()) / 1000)

                    return (
                      <div
                        key={bus.id}
                        className={`p-3 cursor-pointer hover:shadow-sm transition-all border-l-4 bg-white rounded-r-lg ${
                          selectedBus?.id === bus.id 
                            ? "ring-2 ring-blue-500 border-l-blue-600 shadow-md" 
                            : bus.type === "aircon" 
                              ? "border-l-blue-500 hover:border-l-blue-600" 
                              : "border-l-orange-500 hover:border-l-orange-600"
                        } ${!isConnected ? "opacity-75" : ""}`}
                        onClick={() => setSelectedBus(bus)}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-full ${
                                  bus.type === "aircon" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"
                                } relative`}
                              >
                                {isConnected && timeSinceUpdate < 10 && (
                                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                )}
                                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M4 4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v6H4V6zm2 8a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z" />
                                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v1H3V4z" />
                                </svg>
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-gray-900">Bus #{bus.number}</span>
                                  <Badge variant={bus.type === "aircon" ? "default" : "secondary"} className="text-xs">
                                    {bus.type === "aircon" ? "A/C" : "ORD"}
                                  </Badge>
                                </div>
                                <div className="text-xs text-gray-600 mt-0.5">
                                  {bus.route}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 text-blue-600 font-semibold text-sm">
                                <Clock className="h-3 w-3" />
                                <span>{bus.eta} min</span>
                              </div>
                              {isConnected && timeSinceUpdate < 5 && (
                                <Badge variant="outline" className="text-green-600 border-green-600 text-xs mt-1">
                                  LIVE
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Next: {bus.nextStop}</span>
                            <div className="flex items-center gap-1">
                              <Fuel className="h-3 w-3" />
                              <span>{Math.round(bus.speed)} km/h</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Selected Bus Details */}
          {selectedBus && (
            <div className="border-t bg-white p-4 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`p-2 rounded-full ${
                    selectedBus.type === "aircon" ? "bg-blue-600 text-white" : "bg-orange-600 text-white"
                  }`}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v6H4V6zm2 8a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z" />
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v1H3V4z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">Bus #{selectedBus.number}</h3>
                    <Badge variant={selectedBus.type === "aircon" ? "default" : "secondary"} className="text-xs">
                      {selectedBus.type === "aircon" ? "Air-conditioned" : "Ordinary"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{selectedBus.route}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Type</p>
                  <p className="font-semibold text-gray-900 capitalize">
                    {selectedBus.type === "aircon" ? "Air-conditioned" : "Ordinary"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">ETA</p>
                  <p className="font-semibold text-blue-600">{selectedBus.eta} minutes</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Speed</p>
                  <p className="font-semibold text-gray-900">{Math.round(selectedBus.speed)} km/h</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Direction</p>
                  <p className="font-semibold text-gray-900 capitalize">{selectedBus.direction}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Next Stop</p>
                  <p className="font-semibold text-gray-900">{selectedBus.nextStop}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Capacity</p>
                  <p className="font-semibold text-gray-900">{selectedBus.capacity}</p>
                </div>
              </div>

              <div className="pt-3 border-t mt-3">
                <p className="text-xs text-gray-500">
                  Last updated: {selectedBus.lastUpdated.toLocaleTimeString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Map Section - Takes full width on mobile, remaining width on desktop */}
        <div className="flex-1 relative">
          {/* Mobile Search Bar - Only visible on mobile */}
          <div className="lg:hidden p-4 bg-card border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bus stops..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {searchQuery && (
              <div className="mt-2 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto z-50 relative">
                {filteredStops.map((stop) => (
                  <div
                    key={stop.id}
                    className="p-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => {
                      setSelectedStop(stop)
                      setSearchQuery("")
                    }}
                  >
                    <div className="font-medium">{stop.name}</div>
                    <div className="text-sm text-muted-foreground">Routes: {stop.routes.join(", ")}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Map */}
          <div className="h-full">
            <InteractiveMap
              buses={buses}
              busStops={busStops}
              selectedStop={selectedStop}
              onStopSelect={setSelectedStop}
              onBusSelect={setSelectedBus}
              isConnected={isConnected}
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Panel - Only visible on mobile */}
      <div className="lg:hidden bg-card border-t max-h-80 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Navigation className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Buses near {selectedStop.name}</h2>
            <div className="ml-auto text-xs text-muted-foreground">{selectedStop.facilities.join(" • ")}</div>
          </div>

          {nearbyBuses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No buses currently near this stop</p>
            </div>
          ) : (
            <div className="space-y-3">
              {nearbyBuses.map((bus) => {
                const timeSinceUpdate = Math.floor((Date.now() - bus.lastUpdated.getTime()) / 1000)

                return (
                  <Card
                    key={bus.id}
                    className={`p-4 cursor-pointer hover:shadow-md transition-shadow ${
                      !isConnected ? "opacity-75" : ""
                    }`}
                    onClick={() => setSelectedBus(bus)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg relative ${
                            bus.type === "aircon" ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {isConnected && timeSinceUpdate < 10 && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                          )}
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v6H4V6zm2 8a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z" />
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v1H3V4z" />
                          </svg>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">Bus #{bus.number}</span>
                            <Badge variant={bus.type === "aircon" ? "default" : "secondary"}>
                              {bus.type === "aircon" ? "Air-conditioned" : "Ordinary"}
                            </Badge>
                            {isConnected && timeSinceUpdate < 5 && (
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                LIVE
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{bus.route}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">Next: {bus.nextStop}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-primary font-semibold">
                          <Clock className="h-4 w-4" />
                          <span>{bus.eta} min</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          <Fuel className="h-3 w-3 inline mr-1" />
                          {Math.round(bus.speed)} km/h
                        </p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          )}

          {selectedBus && (
            <Card className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`p-3 rounded-lg ${
                    selectedBus.type === "aircon" ? "bg-blue-500 text-white" : "bg-orange-500 text-white"
                  }`}
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v6H4V6zm2 8a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z" />
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v1H3V4z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">Bus #{selectedBus.number}</h3>
                    <Badge variant={selectedBus.type === "aircon" ? "default" : "secondary"}>
                      {selectedBus.type === "aircon" ? "Air-conditioned" : "Ordinary"}
                    </Badge>
                  </div>
                  <p className="text-blue-700 font-medium">{selectedBus.route}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">
                    {selectedBus.type === "aircon" ? "Air-conditioned" : "Ordinary"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ETA</p>
                  <p className="font-medium">{selectedBus.eta} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Speed</p>
                  <p className="font-medium">{Math.round(selectedBus.speed)} km/h</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Direction</p>
                  <p className="font-medium capitalize">{selectedBus.direction}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Next Stop</p>
                  <p className="font-medium">{selectedBus.nextStop}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="font-medium">{selectedBus.capacity}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Last updated: {selectedBus.lastUpdated.toLocaleTimeString()}
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}