export interface BusStop {
  id: number
  name: string
  lat: number
  lng: number
  routes: string[]
  facilities: string[]
}

export interface Bus {
  id: string
  number: string
  type: "ordinary" | "aircon"
  lat: number
  lng: number
  speed: number
  route: string
  eta: number
  capacity: "Low" | "Medium" | "High"
  direction: "northbound" | "southbound" | "eastbound" | "westbound"
  nextStop: string
  occupancy: number // percentage
  lastUpdated: Date
}

export interface Route {
  id: string
  name: string
  stops: number[]
  color: string
  fare: {
    ordinary: number
    aircon: number
  }
}

// Enhanced bus stops data
export const busStops: BusStop[] = [
  {
    id: 1,
    name: "Ampayon Bus Stop",
    lat: 8.9613611, // Ampayon coordinates (8°57'40.9"N)
    lng: 125.6029444, // (125°36'10.6"E)
    routes: ["Route A", "Route B"],
    facilities: ["Waiting Shed", "Restroom", "Food Stalls"],
  },
  {
    id: 2,
    name: "Surigao Bus Terminal",
    lat: 9.436581, // Updated to match bus #89 coordinates
    lng: 125.560927,
    routes: ["Route A", "Route C"],
    facilities: ["Bus Terminal", "ATM", "Security", "Ticket Office"],
  },
  {
    id: 3,
    name: "Butuan Bus Terminal",
    lat: 8.940827,
    lng: 125.520223,
    routes: ["Route B", "Route C"],
    facilities: ["Bus Terminal", "Market", "Parking", "Waiting Area"],
  },
  {
    id: 4,
    name: "Bayugan Bus Terminal",
    lat: 8.715118,
    lng: 125.745359,
    routes: ["Route A", "Route B", "Route C"],
    facilities: ["Bus Terminal", "Market", "Jeepney Terminal", "Food Court"],
  },
]

// Enhanced bus data with more realistic information
export const buses: Bus[] = [
  {
    id: "BUS001",
    number: "23",
    type: "ordinary",
    lat: 8.9613611, // Ampayon coordinates (8°57'40.9"N)
    lng: 125.6029444, // (125°36'10.6"E)
    speed: 25,
    route: "Ampayon to Davao",
    eta: 7,
    capacity: "Medium",
    direction: "southbound",
    nextStop: "Davao City",
    occupancy: 65,
    lastUpdated: new Date(),
  },
  {
    id: "BUS002",
    number: "45",
    type: "aircon",
    lat: 8.940827, // Butuan coordinates
    lng: 125.520223,
    speed: 30,
    route: "Davao to Butuan",
    eta: 12,
    capacity: "High",
    direction: "northbound",
    nextStop: "Butuan Terminal",
    occupancy: 40,
    lastUpdated: new Date(),
  },
  {
    id: "BUS003",
    number: "67",
    type: "ordinary",
    lat: 8.715118, // Bayugan coordinates
    lng: 125.745359,
    speed: 20,
    route: "Davao to Butuan",
    eta: 15,
    capacity: "Low",
    direction: "northbound",
    nextStop: "Butuan Terminal",
    occupancy: 80,
    lastUpdated: new Date(),
  },
  {
    id: "BUS004",
    number: "89",
    type: "aircon",
    lat: 9.436581, // Surigao coordinates
    lng: 125.560927,
    speed: 35,
    route: "Surigao to Butuan",
    eta: 8,
    capacity: "High",
    direction: "southbound",
    nextStop: "Butuan Terminal",
    occupancy: 30,
    lastUpdated: new Date(),
  },
  {
    id: "BUS005",
    number: "12",
    type: "ordinary",
    lat: 8.940827, // Additional bus in Butuan
    lng: 125.520223,
    speed: 22,
    route: "Butuan Local Route",
    eta: 18,
    capacity: "Medium",
    direction: "eastbound",
    nextStop: "Butuan Market",
    occupancy: 55,
    lastUpdated: new Date(),
  },
]

// Route definitions
export const routes: Route[] = [
  {
    id: "route-a",
    name: "Route A",
    stops: [1, 2, 4], // Ampayon -> Surigao -> Bayugan
    color: "#059669",
    fare: { ordinary: 25, aircon: 30 },
  },
  {
    id: "route-b",
    name: "Route B",
    stops: [1, 3, 4], // Ampayon -> Butuan -> Bayugan
    color: "#0891b2",
    fare: { ordinary: 20, aircon: 25 },
  },
  {
    id: "route-c",
    name: "Route C",
    stops: [2, 3, 4], // Surigao -> Butuan -> Bayugan
    color: "#7c3aed",
    fare: { ordinary: 30, aircon: 35 },
  },
]

// Utility functions
export function getBusesNearStop(stopId: number, radiusKm = 10): Bus[] {
  const stop = busStops.find((s) => s.id === stopId)
  if (!stop) return []

  return buses.filter((bus) => {
    const distance = calculateDistance(bus.lat, bus.lng, stop.lat, stop.lng)
    return distance <= radiusKm
  })
}

export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function calculateETA(bus: Bus, targetStop: BusStop): number {
  const distance = calculateDistance(bus.lat, bus.lng, targetStop.lat, targetStop.lng)
  const timeInHours = distance / bus.speed
  return Math.round(timeInHours * 60) // Convert to minutes
}

export function getBusOccupancyStatus(occupancy: number): {
  status: "Low" | "Medium" | "High" | "Full"
  color: string
  description: string
} {
  if (occupancy < 30) {
    return { status: "Low", color: "text-green-600", description: "Plenty of seats" }
  } else if (occupancy < 60) {
    return { status: "Medium", color: "text-yellow-600", description: "Some seats available" }
  } else if (occupancy < 90) {
    return { status: "High", color: "text-orange-600", description: "Standing room only" }
  } else {
    return { status: "Full", color: "text-red-600", description: "Bus is full" }
  }
}

export function getRouteByBus(busId: string): Route | undefined {
  const bus = buses.find((b) => b.id === busId)
  if (!bus) return undefined

  return routes.find((route) => bus.route.includes(route.name))
}

// Simulate real-time updates
export function updateBusPositions(): Bus[] {
  return buses.map((bus) => ({
    ...bus,
    // Simulate movement
    lat: bus.lat + (Math.random() - 0.5) * 0.001,
    lng: bus.lng + (Math.random() - 0.5) * 0.001,
    // Update occupancy slightly
    occupancy: Math.max(0, Math.min(100, bus.occupancy + (Math.random() - 0.5) * 10)),
    // Update speed slightly
    speed: Math.max(5, Math.min(50, bus.speed + (Math.random() - 0.5) * 5)),
    lastUpdated: new Date(),
  }))
}
