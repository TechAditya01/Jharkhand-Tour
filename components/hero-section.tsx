"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"

const backgrounds = [
  "/majestic-waterfall-in-lush-green-forest-of-jharkha.jpg",
  "/spectacular-hundru-waterfall-cascading-down-rocky-.jpg",
  "/scenic-netarhat-hill-station-with-golden-sunset-an.jpg",
  "/serene-parasnath-hill-with-ancient-jain-temples-an.jpg",
  "/lush-green-betla-national-park-with-wildlife-and-d.jpg",
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    // Use a single interval mounted once. Update current with functional updater to avoid stale closures.
    intervalRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % backgrounds.length)
    }, 2500) // 2.5s interval

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images (crossfade) */}
      <div className="absolute inset-0 z-0">
        {/* Render every background layer; control opacity and scale for crossfade + subtle zoom */}
        {backgrounds.map((bg, idx) => {
          const active = idx === current
          return (
            <img
              key={bg}
              src={bg}
              alt={"background-" + idx}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out transform ${
                active ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          )
        })}

        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <MapPin className="h-6 w-6 mr-2 text-accent" />
          <span className="text-lg font-medium">Jharkhand, India</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
          Discover the Untamed Beauty of <span className="text-accent">Jharkhand</span>
        </h1>

        <p className="text-xl sm:text-2xl mb-8 text-pretty max-w-3xl mx-auto leading-relaxed opacity-90">
          Experience pristine waterfalls, dense forests, rich tribal culture, and ancient temples in India's hidden gem
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground text-lg px-8 py-4">
            Explore Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-foreground text-lg px-8 py-4 bg-transparent"
          >
            Watch Video
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">100+</div>
            <div className="text-sm opacity-80">Waterfalls</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">32</div>
            <div className="text-sm opacity-80">Tribal Groups</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">15</div>
            <div className="text-sm opacity-80">National Parks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">500+</div>
            <div className="text-sm opacity-80">Ancient Temples</div>
          </div>
        </div>
      </div>
    </section>
  )
}
