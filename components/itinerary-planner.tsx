"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, DollarSign, Heart, Loader2 } from "lucide-react"

interface ItineraryDay {
  day: number
  title: string
  activities: string[]
  accommodation: string
  meals: string[]
  cost: string
}

interface Itinerary {
  title: string
  duration: string
  totalBudget: string
  days: ItineraryDay[]
  tips: string[]
}

export function ItineraryPlanner() {
  const [formData, setFormData] = useState({
    duration: "",
    budget: "",
    interests: [] as string[],
    preferences: "",
  })
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const interestOptions = [
    "Nature & Wildlife",
    "Adventure Sports",
    "Cultural Heritage",
    "Photography",
    "Tribal Culture",
    "Waterfalls",
    "Temples",
    "Local Cuisine",
    "Handicrafts",
    "Eco-tourism",
  ]

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const generateItinerary = async () => {
    if (!formData.duration || !formData.budget || formData.interests.length === 0) {
      alert("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      setItinerary(data)
    } catch (error) {
      console.error("Failed to generate itinerary:", error)
      alert("Failed to generate itinerary. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="itinerary" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Itinerary Planner</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get a personalized travel plan crafted by AI based on your preferences and interests
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Planning Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-600" />
                Plan Your Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (days)</label>
                  <Input
                    type="number"
                    min="1"
                    max="14"
                    value={formData.duration}
                    onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="">Select budget</option>
                    <option value="budget">Budget (₹5,000-15,000)</option>
                    <option value="mid-range">Mid-range (₹15,000-30,000)</option>
                    <option value="luxury">Luxury (₹30,000+)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <Badge
                      key={interest}
                      variant={formData.interests.includes(interest) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        formData.interests.includes(interest)
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : "hover:bg-emerald-50"
                      }`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Special Preferences</label>
                <textarea
                  value={formData.preferences}
                  onChange={(e) => setFormData((prev) => ({ ...prev, preferences: e.target.value }))}
                  placeholder="Any specific requirements, accessibility needs, or preferences..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 h-20 resize-none"
                />
              </div>

              <Button
                onClick={generateItinerary}
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Your Itinerary...
                  </>
                ) : (
                  "Generate AI Itinerary"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Itinerary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-600" />
                Your Personalized Itinerary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!itinerary ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>Fill out the form to generate your personalized itinerary</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-lg">{itinerary.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {itinerary.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {itinerary.totalBudget}
                      </span>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto space-y-4">
                    {Array.isArray(itinerary.days) ? (
                      itinerary.days.map((day) => (
                        <div key={day.day} className="border rounded-lg p-4">
                          <h4 className="font-medium text-emerald-600 mb-2">
                            Day {day.day}: {day.title}
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div>
                              <strong>Activities:</strong>
                              <ul className="list-disc list-inside ml-2">
                                {day.activities.map((activity, idx) => (
                                  <li key={idx}>{activity}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <strong>Stay:</strong> {day.accommodation}
                            </div>
                            <div>
                              <strong>Estimated Cost:</strong> {day.cost}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-red-500">Itinerary data is invalid. Please try again.</div>
                    )}
                  </div>

                  {Array.isArray(itinerary.tips) && itinerary.tips.length > 0 ? (
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Travel Tips</h4>
                      <ul className="text-sm space-y-1">
                        {itinerary.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Heart className="h-3 w-3 text-emerald-600 mt-1 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
