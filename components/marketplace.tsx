"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Home, Leaf, Shield, Star, MapPin, Calendar, Users, Verified, Search, Filter } from "lucide-react"

interface MarketplaceItem {
  id: string
  title: string
  category: "handicrafts" | "homestays" | "ecotourism" | "events"
  price: number
  currency: string
  location: string
  rating: number
  reviews: number
  verified: boolean
  blockchainId: string
  seller: {
    name: string
    verified: boolean
    rating: number
  }
  image: string
  description: string
  availability?: string
  capacity?: number
}

const marketplaceItems: MarketplaceItem[] = [
  {
    id: "1",
    title: "Handwoven Tribal Saree",
    category: "handicrafts",
    price: 2500,
    currency: "INR",
    location: "Khunti District",
    rating: 4.8,
    reviews: 24,
    verified: true,
    blockchainId: "0x1a2b3c4d5e6f",
    seller: {
      name: "Sita Devi Artisan Collective",
      verified: true,
      rating: 4.9,
    },
    image: "/jharkhand%20saree.jpeg",
    description: "Authentic handwoven saree with traditional tribal patterns, made by local artisans",
  },
  {
    id: "2",
    title: "Eco-friendly Bamboo Homestay",
    category: "homestays",
    price: 1200,
    currency: "INR",
    location: "Netarhat",
    rating: 4.6,
    reviews: 18,
    verified: true,
    blockchainId: "0x2b3c4d5e6f7g",
    seller: {
      name: "Ramesh Kumar",
      verified: true,
      rating: 4.7,
    },
    image: "/bamboo homestay.jpeg",
    description: "Sustainable bamboo homestay in the heart of nature",
    availability: "Available",
    capacity: 4,
  },
  {
    id: "3",
    title: "Tribal Village Cultural Tour",
    category: "ecotourism",
    price: 800,
    currency: "INR",
    location: "Saraikela",
    rating: 4.9,
    reviews: 32,
    verified: true,
    blockchainId: "0x3c4d5e6f7g8h",
    seller: {
      name: "Jharkhand Eco Tours",
      verified: true,
      rating: 4.8,
    },
    image: "/tribal village.jpeg",
    description: "Immersive cultural experience with traditional dance, music, and local cuisine",
  },
  {
    id: "4",
    title: "Dokra Metal Craft Workshop",
    category: "events",
    price: 500,
    currency: "INR",
    location: "Ranchi",
    rating: 4.7,
    reviews: 15,
    verified: true,
    blockchainId: "0x4d5e6f7g8h9i",
    seller: {
      name: "Traditional Arts Center",
      verified: true,
      rating: 4.6,
    },
    image: "/dhokra.jpeg",
    description: "Learn the ancient art of Dokra metal casting from master craftsmen",
  },
  {
    id: "5",
    title: "Handcrafted Tribal Jewelry Set",
    category: "handicrafts",
    price: 1800,
    currency: "INR",
    location: "Gumla",
    rating: 4.5,
    reviews: 21,
    verified: true,
    blockchainId: "0x5e6f7g8h9i0j",
    seller: {
      name: "Munda Craft Collective",
      verified: true,
      rating: 4.8,
    },
    image: "/tribel jewelley.jpeg",
    description: "Authentic tribal jewelry with silver and traditional beadwork",
  },
  {
    id: "6",
    title: "Forest Canopy Treehouse Stay",
    category: "homestays",
    price: 2000,
    currency: "INR",
    location: "Betla National Park",
    rating: 4.8,
    reviews: 12,
    verified: true,
    blockchainId: "0x6f7g8h9i0j1k",
    seller: {
      name: "Wildlife Retreat",
      verified: true,
      rating: 4.9,
    },
    image: "/forest canopey.jpeg",
    description: "Unique treehouse experience with wildlife viewing opportunities",
    availability: "Available",
    capacity: 2,
  },
]

const categories = [
  { id: "all", name: "All Categories", icon: ShoppingBag },
  { id: "handicrafts", name: "Handicrafts", icon: ShoppingBag },
  { id: "homestays", name: "Homestays", icon: Home },
  { id: "ecotourism", name: "Eco-tourism", icon: Leaf },
  { id: "events", name: "Events", icon: Calendar },
]

export function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null)

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handlePurchase = (item: MarketplaceItem) => {
    // Simulate blockchain transaction
    alert(
      `Initiating secure blockchain transaction for ${item.title}\nBlockchain ID: ${item.blockchainId}\nAmount: ₹${item.price}`,
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Local Marketplace</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover authentic tribal handicrafts, eco-friendly homestays, and unique cultural experiences
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Shield className="h-5 w-5 text-emerald-600" />
            <span className="text-sm text-emerald-600 font-medium">Blockchain-secured transactions</span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products, homestays, or experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 ${
                    selectedCategory === category.id ? "bg-emerald-600 hover:bg-emerald-700" : ""
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 flex gap-1">
                  {item.verified && (
                    <Badge className="bg-emerald-600">
                      <Verified className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  <Badge variant="secondary" className="capitalize">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600">₹{item.price}</div>
                    {item.category === "homestays" && <div className="text-xs text-gray-500">per night</div>}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

                <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {item.rating} ({item.reviews})
                  </div>
                </div>

                {item.capacity && (
                  <div className="flex items-center gap-1 mb-3 text-sm text-gray-500">
                    <Users className="h-3 w-3" />
                    Up to {item.capacity} guests
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-gray-500">
                    Seller: {item.seller.name}
                    {item.seller.verified && <Verified className="h-3 w-3 inline ml-1 text-emerald-600" />}
                  </div>
                  <div className="text-xs text-blue-600 font-mono">ID: {item.blockchainId.slice(0, 10)}...</div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => setSelectedItem(item)} variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button onClick={() => handlePurchase(item)} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                    {item.category === "homestays" ? "Book Now" : "Buy Now"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">No items found matching your criteria</p>
          </div>
        )}

        {/* Item Details Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{selectedItem.title}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedItem(null)}>
                  ×
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <img
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.title}
                  className="w-full h-64 object-cover rounded-lg"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-600">
                      <Verified className="h-3 w-3 mr-1" />
                      Blockchain Verified
                    </Badge>
                    <Badge variant="secondary" className="capitalize">
                      {selectedItem.category}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">₹{selectedItem.price}</div>
                </div>

                <p className="text-gray-600">{selectedItem.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Location:</strong> {selectedItem.location}
                  </div>
                  <div>
                    <strong>Rating:</strong> {selectedItem.rating}/5 ({selectedItem.reviews} reviews)
                  </div>
                  {selectedItem.capacity && (
                    <div>
                      <strong>Capacity:</strong> {selectedItem.capacity} guests
                    </div>
                  )}
                  <div>
                    <strong>Blockchain ID:</strong> {selectedItem.blockchainId}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Seller Information</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span>{selectedItem.seller.name}</span>
                        {selectedItem.seller.verified && <Verified className="h-4 w-4 text-emerald-600" />}
                      </div>
                      <div className="text-sm text-gray-500">Seller Rating: {selectedItem.seller.rating}/5</div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Blockchain Security</h4>
                  <div className="bg-blue-50 p-3 rounded-lg text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Secure Transaction Guaranteed</span>
                    </div>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Verified seller identity on blockchain</li>
                      <li>• Immutable transaction records</li>
                      <li>• Smart contract protection</li>
                      <li>• Dispute resolution system</li>
                    </ul>
                  </div>
                </div>

                <Button
                  onClick={() => handlePurchase(selectedItem)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Secure {selectedItem.category === "homestays" ? "Booking" : "Purchase"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
