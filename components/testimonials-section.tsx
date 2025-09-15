"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { useState, useEffect } from "react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "/professional-woman-smiling-headshot.png",
    rating: 5,
    text: "Jharkhand exceeded all my expectations! The waterfalls were absolutely breathtaking, and the tribal culture experience was truly authentic. A hidden gem of India!",
    experience: "Nature & Culture Tour",
  },
  {
    name: "Rajesh Kumar",
    location: "Mumbai, India",
    avatar: "/indian-man-smiling-professional-headshot.jpg",
    rating: 5,
    text: "The wildlife safari at Betla National Park was incredible. We spotted tigers and elephants! The local guides were knowledgeable and passionate about conservation.",
    experience: "Wildlife Safari",
  },
  {
    name: "Emma Thompson",
    location: "London, UK",
    avatar: "/british-woman-smiling-travel-photo.jpg",
    rating: 5,
    text: "Trekking to Parasnath Hill was challenging but rewarding. The sunrise view from the top was magical. The Jain temples added a spiritual dimension to the journey.",
    experience: "Adventure Trekking",
  },
  {
    name: "Amit Sharma",
    location: "Delhi, India",
    avatar: "/young-indian-man-outdoor-adventure-photo.jpg",
    rating: 5,
    text: "Perfect weekend getaway from Delhi! Netarhat's sunset point is romantic and peaceful. The pine forests and cool climate were a refreshing change.",
    experience: "Weekend Getaway",
  },
  {
    name: "Lisa Chen",
    location: "Singapore",
    avatar: "/asian-woman-smiling-travel-photographer.jpg",
    rating: 5,
    text: "As a photographer, Jharkhand offered endless opportunities. From cascading waterfalls to vibrant tribal festivals, every shot was Instagram-worthy!",
    experience: "Photography Tour",
  },
  {
    name: "Michael Brown",
    location: "Sydney, Australia",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The adventure activities were thrilling! Rock climbing, river rafting, and zip-lining through the forests. Jharkhand is an adrenaline junkie's paradise.",
    experience: "Adventure Sports",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(testimonials.length / 2))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">What Travelers Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Discover why thousands of visitors fall in love with Jharkhand's natural beauty and cultural richness
          </p>
        </div>

        {/* Desktop View - Two columns */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.slice(currentIndex * 2, currentIndex * 2 + 2).map((testimonial, index) => (
            <Card key={index} className="bg-card border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">{renderStars(testimonial.rating)}</div>

                <blockquote className="text-lg leading-relaxed mb-6 text-pretty">"{testimonial.text}"</blockquote>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {testimonial.experience}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile View - Single column */}
        <div className="md:hidden space-y-6 mb-12">
          {testimonials.slice(currentIndex, currentIndex + 1).map((testimonial, index) => (
            <Card key={index} className="bg-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">{renderStars(testimonial.rating)}</div>

                <blockquote className="text-base leading-relaxed mb-6 text-pretty">"{testimonial.text}"</blockquote>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {testimonial.experience}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2000+</div>
              <div className="text-sm text-muted-foreground">Happy Travelers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Recommend Us</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Tour Packages</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
