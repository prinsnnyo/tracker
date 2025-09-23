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
  {
    id: 5,
    name: "Sibagat Terminal",
    lat: 8.82204335484657,
    lng: 125.6934245725476,
    routes: ["Route D", "Route E"],
    facilities: ["Bus Terminal", "Waiting Shed", "Food Stalls"],
  },
  {
    id: 6,
    name: "Poblacion Terminal",
    lat: 8.60424886902217,
    lng: 125.9122853252366,
    routes: ["Route D", "Route F"],
    facilities: ["Bus Terminal", "Market", "ATM"],
  },
  {
    id: 7,
    name: "San Francisco Terminal",
    lat: 8.50815765433757,
    lng: 125.97873389701272,
    routes: ["Route E", "Route F"],
    facilities: ["Bus Terminal", "Restroom", "Security"],
  },
  {
    id: 8,
    name: "Bunawan Terminal",
    lat: 8.181190461128214,
    lng: 125.99163160793304,
    routes: ["Route F", "Route G"],
    facilities: ["Bus Terminal", "Waiting Area", "Food Court"],
  },
  {
    id: 9,
    name: "Monkayo Terminal",
    lat: 7.823066372980144,
    lng: 126.03404686844297,
    routes: ["Route G", "Route H"],
    facilities: ["Bus Terminal", "Market", "Parking"],
  },
  {
    id: 10,
    name: "Davao Terminal",
    lat: 7.056125029542393,
    lng: 125.60090632904408,
    routes: ["Route H", "Route I"],
    facilities: ["Major Bus Terminal", "ATM", "Security", "Ticket Office", "Food Court", "Restroom"],
  },
  {
    id: 11,
    name: "Nasipit Terminal",
    lat: 8.97438536105831,
    lng: 125.34954101021039,
    routes: ["Route J", "Route K"],
    facilities: ["Bus Terminal", "Waiting Shed", "Security"],
  },
  {
    id: 12,
    name: "Carmen Terminal",
    lat: 9.066454201226348,
    lng: 125.27353287060868,
    routes: ["Route J", "Route L"],
    facilities: ["Bus Terminal", "Market", "Food Stalls"],
  },
  {
    id: 13,
    name: "Gingoog Terminal",
    lat: 8.823064700633592,
    lng: 125.10806147951871,
    routes: ["Route K", "Route L"],
    facilities: ["Bus Terminal", "ATM", "Waiting Area"],
  },
  {
    id: 14,
    name: "Cagayan de Oro Terminal",
    lat: 8.490437679964225,
    lng: 124.65764669691394,
    routes: ["Route M", "Route N"],
    facilities: ["Major Bus Terminal", "ATM", "Security", "Ticket Office", "Food Court", "Restroom", "Parking"],
  },
  {
    id: 15,
    name: "Tandag Terminal",
    lat: 9.063924992917396,
    lng: 126.19911713885838,
    routes: ["Route O", "Route P"],
    facilities: ["Bus Terminal", "Market", "ATM", "Waiting Area"],
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
  {
    id: "BUS006",
    number: "1001",
    type: "aircon",
    lat: 8.588944, // 8°35'20.2"N converted to decimal
    lng: 124.771361, // 124°46'16.9"E converted to decimal
    speed: 45,
    route: "Cagayan de Oro to Butuan",
    eta: 25,
    capacity: "High",
    direction: "eastbound",
    nextStop: "Gingoog Terminal",
    occupancy: 45,
    lastUpdated: new Date(),
  },
  {
    id: "BUS007",
    number: "1004",
    type: "ordinary",
    lat: 8.823924,
    lng: 125.101494,
    speed: 42,
    route: "Cagayan de Oro to Butuan",
    eta: 18,
    capacity: "Medium",
    direction: "eastbound",
    nextStop: "Butuan Terminal",
    occupancy: 72,
    lastUpdated: new Date(),
  },
  {
    id: "BUS008",
    number: "1002",
    type: "aircon",
    lat: 8.990541,
    lng: 125.296402,
    speed: 38,
    route: "Butuan to Cagayan de Oro",
    eta: 22,
    capacity: "High",
    direction: "westbound",
    nextStop: "Nasipit Terminal",
    occupancy: 35,
    lastUpdated: new Date(),
  },
  {
    id: "BUS009",
    number: "1003",
    type: "ordinary",
    lat: 8.972199,
    lng: 125.387417,
    speed: 40,
    route: "Butuan to Cagayan de Oro",
    eta: 28,
    capacity: "Medium",
    direction: "westbound",
    nextStop: "Carmen Terminal",
    occupancy: 58,
    lastUpdated: new Date(),
  },
  {
    id: "BUS010",
    number: "1005",
    type: "aircon",
    lat: 8.638013,
    lng: 125.924247,
    speed: 35,
    route: "Butuan to Tandag",
    eta: 32,
    capacity: "High",
    direction: "eastbound",
    nextStop: "San Francisco Terminal",
    occupancy: 41,
    lastUpdated: new Date(),
  },
  {
    id: "BUS011",
    number: "1006",
    type: "aircon",
    lat: 8.769580,
    lng: 126.238309,
    speed: 48,
    route: "Davao to Tandag",
    eta: 15,
    capacity: "High",
    direction: "northbound",
    nextStop: "Tandag Terminal",
    occupancy: 29,
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
  {
    id: "route-d",
    name: "Route D",
    stops: [5, 6], // Sibagat -> Poblacion
    color: "#dc2626",
    fare: { ordinary: 15, aircon: 20 },
  },
  {
    id: "route-e",
    name: "Route E",
    stops: [5, 7], // Sibagat -> San Francisco
    color: "#ea580c",
    fare: { ordinary: 18, aircon: 23 },
  },
  {
    id: "route-f",
    name: "Route F",
    stops: [6, 7, 8], // Poblacion -> San Francisco -> Bunawan
    color: "#ca8a04",
    fare: { ordinary: 25, aircon: 30 },
  },
  {
    id: "route-g",
    name: "Route G",
    stops: [8, 9], // Bunawan -> Monkayo
    color: "#16a34a",
    fare: { ordinary: 20, aircon: 25 },
  },
  {
    id: "route-h",
    name: "Route H",
    stops: [9, 10], // Monkayo -> Davao
    color: "#2563eb",
    fare: { ordinary: 35, aircon: 45 },
  },
  {
    id: "route-i",
    name: "Route I",
    stops: [10, 15], // Davao -> Tandag
    color: "#7c3aed",
    fare: { ordinary: 50, aircon: 65 },
  },
  {
    id: "route-j",
    name: "Route J",
    stops: [11, 12], // Nasipit -> Carmen
    color: "#be185d",
    fare: { ordinary: 12, aircon: 15 },
  },
  {
    id: "route-k",
    name: "Route K",
    stops: [11, 13], // Nasipit -> Gingoog
    color: "#0891b2",
    fare: { ordinary: 15, aircon: 20 },
  },
  {
    id: "route-l",
    name: "Route L",
    stops: [12, 13], // Carmen -> Gingoog
    color: "#059669",
    fare: { ordinary: 10, aircon: 15 },
  },
  {
    id: "route-m",
    name: "Route M",
    stops: [14, 13, 3], // Cagayan de Oro -> Gingoog -> Butuan
    color: "#dc2626",
    fare: { ordinary: 40, aircon: 50 },
  },
  {
    id: "route-n",
    name: "Route N",
    stops: [14, 11, 12], // Cagayan de Oro -> Nasipit -> Carmen
    color: "#ea580c",
    fare: { ordinary: 35, aircon: 45 },
  },
  {
    id: "route-o",
    name: "Route O",
    stops: [3, 15], // Butuan -> Tandag
    color: "#7c3aed",
    fare: { ordinary: 45, aircon: 55 },
  },
  {
    id: "route-p",
    name: "Route P",
    stops: [15, 7, 6], // Tandag -> San Francisco -> Poblacion
    color: "#16a34a",
    fare: { ordinary: 30, aircon: 40 },
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
