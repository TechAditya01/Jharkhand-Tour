"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Eye, Camera, Navigation, Clock } from "lucide-react"
import { VRTour } from "./vr-tour"

function VRModalContent({ imageUrl, name }: { imageUrl: string; name: string }) {
  const [showVR, setShowVR] = useState(false)
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {!showVR ? (
        <div className="w-full">
          <div className="aspect-video bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg flex items-center justify-center relative overflow-hidden">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-center text-white">
                <Eye className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">360° VR Experience</h3>
                <p className="text-lg opacity-90">Immersive virtual tour of {name}</p>
                <Button className="mt-4 bg-white text-black hover:bg-gray-100" onClick={() => setShowVR(true)}>
                  Start VR Tour
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <VRTour imageUrl={imageUrl} />
      )}
    </div>
  )
}

interface TouristSpot {
  id: string
  name: string
  type: string
  coordinates: [number, number]
  description: string
  rating: number
  visitTime: string
  hasVR: boolean
  hasAR: boolean
  image: string
}

const touristSpots: TouristSpot[] = [
  {
    id: "1",
    name: "Hundru Falls",
    type: "Waterfall",
    coordinates: [23.4241, 85.5916],
    description: "Spectacular 98-meter waterfall surrounded by lush greenery",
    rating: 4.5,
    visitTime: "2-3 hours",
    hasVR: true,
    hasAR: true,
    image: "/hundru-falls-aerial-view-with-rainbow-mist.jpg",
  },
  {
    id: "2",
    name: "Betla National Park",
    type: "Wildlife",
    coordinates: [23.8833, 84.1833],
    description: "Home to tigers, elephants, and diverse wildlife",
    rating: 4.3,
    visitTime: "Full day",
    hasVR: true,
    hasAR: true,
    image: "/betla-national-park-tiger-in-natural-habitat.jpg",
  },
  {
    id: "3",
    name: "Ranchi Hill Station",
    type: "Hill Station",
    coordinates: [23.3441, 85.3096],
    description: "Scenic hill station with panoramic city views",
    rating: 4.2,
    visitTime: "3-4 hours",
    hasVR: true,
    hasAR: false,
    image: "/ranchi-hill-station-panoramic-sunset-view.jpg",
  },
  {
    id: "4",
    name: "Jagannath Temple Ranchi",
    type: "Temple",
    coordinates: [23.3629, 85.3346],
    description: "Ancient temple with stunning architecture",
    rating: 4.4,
    visitTime: "1-2 hours",
    hasVR: true,
    hasAR: true,
    image: "/jagannath-temple-ranchi-traditional-architecture.jpg",
  },
  {
    id: "5",
    name: "Dassam Falls",
    type: "Waterfall",
    coordinates: [23.4667, 85.5167],
    description: "Multi-tiered waterfall perfect for photography",
    rating: 4.1,
    visitTime: "2-3 hours",
    hasVR: true,
    hasAR: true,
    image: "/dassam-falls-multi-tiered-cascade.jpg",
  },
]

export function InteractiveMap() {
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null)
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [vrModalOpen, setVrModalOpen] = useState(false)
  const [arModalOpen, setArModalOpen] = useState(false)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
        },
        () => {
          // Location access denied
        },
      )
    }
  }, [])

  const calculateDistance = (spot: TouristSpot) => {
    if (!userLocation) return null
    const [lat1, lon1] = userLocation
    const [lat2, lon2] = spot.coordinates
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return Math.round(distance)
  }

  const openVRPreview = (spot: TouristSpot) => {
    setSelectedSpot(spot)
    setVrModalOpen(true)
  }
  const openARPreview = (spot: TouristSpot) => {
    setSelectedSpot(spot)
    setArModalOpen(true)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Tourist Map</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore Jharkhand's attractions with AR/VR previews and real-time navigation
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                  Tourist Attractions Map
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 400 300" className="w-full h-full">
                      <path
                        d="M50 50 L350 50 L350 250 L50 250 Z"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>
                  {touristSpots.map((spot, index) => (
                    <div
                      key={spot.id}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${30 + index * 12}%`,
                      }}
                      onClick={() => setSelectedSpot(spot)}
                    >
                      <div
                        className={`relative ${selectedSpot?.id === spot.id ? "scale-125" : "hover:scale-110"} transition-transform`}
                      >
                        <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                          {index + 1}
                        </div>
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap">
                          {spot.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Details Area */}
          <div>
            {selectedSpot ? (
              <Card>
                <CardContent>
                  <img
                    src={selectedSpot.image || "/placeholder.svg"}
                    alt={selectedSpot.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-600">{selectedSpot.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {selectedSpot.visitTime}
                    </div>
                    {userLocation && (
                      <div className="flex items-center gap-1">
                        <Navigation className="h-4 w-4" />
                        {calculateDistance(selectedSpot)} km away
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {selectedSpot.hasVR && (
                      <Button
                        onClick={() => openVRPreview(selectedSpot)}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        VR Preview
                      </Button>
                    )}
                    {selectedSpot.hasAR && (
                      <Button onClick={() => openARPreview(selectedSpot)} variant="outline" className="w-full">
                        <Camera className="h-4 w-4 mr-2" />
                        AR Experience
                      </Button>
                    )}
                    <Button variant="outline" className="w-full bg-transparent">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">Select a location on the map to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        {/* VR Modal */}
        {vrModalOpen && selectedSpot && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>VR Preview: {selectedSpot.name}</CardTitle>
                <Button variant="ghost" onClick={() => setVrModalOpen(false)}>
                  ×
                </Button>
              </CardHeader>
              <CardContent>
                <VRModalContent imageUrl={selectedSpot.image} name={selectedSpot.name} />
              </CardContent>
            </Card>
          </div>
        )}
        {/* AR Modal */}
        {arModalOpen && selectedSpot && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>AR Experience: {selectedSpot.name}</CardTitle>
                <Button variant="ghost" onClick={() => setArModalOpen(false)}>
                  ×
                </Button>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-blue-900 to-green-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <img
                    src={selectedSpot.image || "/placeholder.svg"}
                    alt={selectedSpot.name}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Camera className="h-16 w-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Augmented Reality</h3>
                      <p className="text-lg opacity-90">Point your camera to explore {selectedSpot.name}</p>
                      <Button className="mt-4 bg-white text-black hover:bg-gray-100">Launch AR Camera</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}