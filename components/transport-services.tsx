"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Navigation,
  Clock,
  Car,
  Bus,
  Train,
  Plane,
  Bike,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Route,
  Fuel,
  Users,
  Star,
  Phone,
  MessageCircle,
} from "lucide-react"

interface TransportOption {
  id: string
  type: "bus" | "taxi" | "train" | "flight" | "bike"
  operator: string
  route: string
  departure: string
  arrival: string
  duration: string
  price: number
  availability: "available" | "limited" | "full"
  rating: number
  features: string[]
  contact: string
  realTimeStatus: "on-time" | "delayed" | "cancelled"
  delay?: number
  location?: {
    lat: number
    lng: number
    address: string
  }
}

interface LocationService {
  id: string
  name: string
  type: "hospital" | "police" | "fuel" | "atm" | "restaurant" | "hotel"
  distance: number
  rating: number
  contact: string
  address: string
  isOpen: boolean
  coordinates: {
    lat: number
    lng: number
  }
}

const transportOptions: TransportOption[] = [
  {
    id: "1",
    type: "bus",
    operator: "Jharkhand State Transport",
    route: "Ranchi → Netarhat",
    departure: "08:00 AM",
    arrival: "11:30 AM",
    duration: "3h 30m",
    price: 150,
    availability: "available",
    rating: 4.2,
    features: ["AC", "WiFi", "GPS Tracking"],
    contact: "+91-9876543210",
    realTimeStatus: "on-time",
  },
  {
    id: "2",
    type: "taxi",
    operator: "Jharkhand Cabs",
    route: "Ranchi → Hundru Falls",
    departure: "Now",
    arrival: "45 min",
    duration: "45 min",
    price: 800,
    availability: "available",
    rating: 4.6,
    features: ["AC", "GPS", "Sanitized"],
    contact: "+91-9876543211",
    realTimeStatus: "on-time",
    location: {
      lat: 23.3441,
      lng: 85.3096,
      address: "Near Ranchi Railway Station",
    },
  },
  {
    id: "3",
    type: "train",
    operator: "Indian Railways",
    route: "Ranchi → Dhanbad",
    departure: "06:15 AM",
    arrival: "09:45 AM",
    duration: "3h 30m",
    price: 120,
    availability: "limited",
    rating: 4.0,
    features: ["Reserved Seating", "Catering"],
    contact: "139",
    realTimeStatus: "delayed",
    delay: 15,
  },
  {
    id: "4",
    type: "flight",
    operator: "IndiGo",
    route: "Ranchi → Delhi",
    departure: "02:30 PM",
    arrival: "04:15 PM",
    duration: "1h 45m",
    price: 4500,
    availability: "available",
    rating: 4.4,
    features: ["In-flight Meals", "Entertainment"],
    contact: "+91-9999999999",
    realTimeStatus: "on-time",
  },
  {
    id: "5",
    type: "bike",
    operator: "Jharkhand Bike Rentals",
    route: "Self-drive rental",
    departure: "Anytime",
    arrival: "Return by 8 PM",
    duration: "Full day",
    price: 500,
    availability: "available",
    rating: 4.3,
    features: ["Helmet Included", "Fuel Included", "Insurance"],
    contact: "+91-9876543212",
    realTimeStatus: "on-time",
  },
]

const nearbyServices: LocationService[] = [
  {
    id: "1",
    name: "RIMS Hospital",
    type: "hospital",
    distance: 2.3,
    rating: 4.1,
    contact: "+91-651-2451070",
    address: "Bariatu, Ranchi",
    isOpen: true,
    coordinates: { lat: 23.3441, lng: 85.3096 },
  },
  {
    id: "2",
    name: "Ranchi Police Station",
    type: "police",
    distance: 1.8,
    rating: 3.8,
    contact: "100",
    address: "Main Road, Ranchi",
    isOpen: true,
    coordinates: { lat: 23.3441, lng: 85.3096 },
  },
  {
    id: "3",
    name: "Indian Oil Petrol Pump",
    type: "fuel",
    distance: 0.8,
    rating: 4.0,
    contact: "+91-9876543213",
    address: "NH-33, Ranchi",
    isOpen: true,
    coordinates: { lat: 23.3441, lng: 85.3096 },
  },
  {
    id: "4",
    name: "SBI ATM",
    type: "atm",
    distance: 0.5,
    rating: 3.9,
    contact: "1800-11-2211",
    address: "Main Road, Ranchi",
    isOpen: true,
    coordinates: { lat: 23.3441, lng: 85.3096 },
  },
  {
    id: "5",
    name: "Tribal Cuisine Restaurant",
    type: "restaurant",
    distance: 1.2,
    rating: 4.5,
    contact: "+91-9876543214",
    address: "Tribal Museum Road, Ranchi",
    isOpen: true,
    coordinates: { lat: 23.3441, lng: 85.3096 },
  },
  {
    id: "6",
    name: "Hotel Yuvraj Palace",
    type: "hotel",
    distance: 1.5,
    rating: 4.2,
    contact: "+91-651-2331234",
    address: "Station Road, Ranchi",
    isOpen: true,
    coordinates: { lat: 23.3441, lng: 85.3096 },
  },
]

const getTransportIcon = (type: string) => {
  switch (type) {
    case "bus":
      return Bus
    case "taxi":
      return Car
    case "train":
      return Train
    case "flight":
      return Plane
    case "bike":
      return Bike
    default:
      return Car
  }
}

const getServiceIcon = (type: string) => {
  switch (type) {
    case "hospital":
      return AlertCircle
    case "police":
      return AlertCircle
    case "fuel":
      return Fuel
    case "atm":
      return AlertCircle
    case "restaurant":
      return Users
    case "hotel":
      return Users
    default:
      return MapPin
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "on-time":
      return "text-green-600"
    case "delayed":
      return "text-yellow-600"
    case "cancelled":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case "available":
      return "bg-green-100 text-green-800"
    case "limited":
      return "bg-yellow-100 text-yellow-800"
    case "full":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function TransportServices() {
  const [selectedTransport, setSelectedTransport] = useState<string>("all")
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationPermission, setLocationPermission] = useState<string>("prompt")
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    // Request location permission
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLocationPermission("granted")
        },
        (error) => {
          console.log("[v0] Location permission denied:", error)
          setLocationPermission("denied")
        },
      )
    }
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate API call to refresh real-time data
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setRefreshing(false)
  }

  const handleBookTransport = (transport: TransportOption) => {
    alert(`Booking ${transport.operator} - ${transport.route}\nContact: ${transport.contact}`)
  }

  const handleCallService = (service: LocationService) => {
    window.open(`tel:${service.contact}`, "_self")
  }

  const handleNavigate = (service: LocationService) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${service.coordinates.lat},${service.coordinates.lng}`
    window.open(url, "_blank")
  }

  const filteredTransport = transportOptions.filter(
    (option) => selectedTransport === "all" || option.type === selectedTransport,
  )

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Transport & Location Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time transport information and nearby essential services with GPS tracking
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-emerald-600" />
              <span className="text-sm text-emerald-600 font-medium">GPS Enabled</span>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Location Status */}
        {locationPermission === "denied" && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span className="text-yellow-800">
                Enable location access for personalized transport options and accurate distances
              </span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Transport Options */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Transport Options</h3>
              <div className="flex gap-2">
                {["all", "bus", "taxi", "train", "flight", "bike"].map((type) => {
                  const Icon = type === "all" ? Route : getTransportIcon(type)
                  return (
                    <Button
                      key={type}
                      variant={selectedTransport === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTransport(type)}
                      className={`flex items-center gap-1 ${
                        selectedTransport === type ? "bg-emerald-600 hover:bg-emerald-700" : ""
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-4">
              {filteredTransport.map((transport) => {
                const Icon = getTransportIcon(transport.type)
                return (
                  <Card key={transport.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-emerald-100 rounded-lg">
                            <Icon className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{transport.operator}</h4>
                            <p className="text-gray-600">{transport.route}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-emerald-600">₹{transport.price}</div>
                          <Badge className={getAvailabilityColor(transport.availability)}>
                            {transport.availability}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                        <div>
                          <div className="text-gray-500">Departure</div>
                          <div className="font-medium">{transport.departure}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Arrival</div>
                          <div className="font-medium">{transport.arrival}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Duration</div>
                          <div className="font-medium">{transport.duration}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {transport.rating}
                          </div>
                          <div className={`flex items-center gap-1 ${getStatusColor(transport.realTimeStatus)}`}>
                            <Clock className="h-3 w-3" />
                            {transport.realTimeStatus}
                            {transport.delay && ` (+${transport.delay}m)`}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {transport.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleBookTransport(transport)}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        >
                          Book Now
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Nearby Services */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Nearby Essential Services</h3>

            <div className="space-y-4">
              {nearbyServices.map((service) => {
                const Icon = getServiceIcon(service.type)
                return (
                  <Card key={service.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{service.name}</h4>
                            <p className="text-gray-600 text-sm">{service.address}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{service.distance} km</div>
                          <div className="flex items-center gap-1">
                            {service.isOpen ? (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            ) : (
                              <AlertCircle className="h-3 w-3 text-red-600" />
                            )}
                            <span className={`text-xs ${service.isOpen ? "text-green-600" : "text-red-600"}`}>
                              {service.isOpen ? "Open" : "Closed"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{service.rating}</span>
                        </div>
                        <Badge variant="outline" className="capitalize text-xs">
                          {service.type}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={() => handleNavigate(service)} variant="outline" className="flex-1">
                          <Navigation className="h-4 w-4 mr-2" />
                          Navigate
                        </Button>
                        <Button onClick={() => handleCallService(service)} variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mt-12 bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Emergency Contacts
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="font-medium">Police</span>
              <Button size="sm" variant="outline" onClick={() => window.open("tel:100", "_self")}>
                100
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="font-medium">Fire</span>
              <Button size="sm" variant="outline" onClick={() => window.open("tel:101", "_self")}>
                101
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="font-medium">Ambulance</span>
              <Button size="sm" variant="outline" onClick={() => window.open("tel:108", "_self")}>
                108
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
