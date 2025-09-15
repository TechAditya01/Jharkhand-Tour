"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToItinerary = () => {
    const el = document.getElementById("itinerary")
    if (el) {
      // account for fixed nav height so the section isn't hidden underneath
      const navEl = document.querySelector("nav") as HTMLElement | null
      const navHeight = navEl ? navEl.offsetHeight : 0
      const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 12
      window.scrollTo({ top, behavior: "smooth" })
    }

    // close mobile menu if open
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">Jharkhand Tourism</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#home"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#attractions"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Attractions
              </a>
              <a
                href="#culture"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Culture
              </a>
              <a
                href="#testimonials"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <Button onClick={scrollToItinerary} className="bg-primary hover:bg-accent text-primary-foreground">Plan Your Trip</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              <a
                href="#home"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </a>
              <a
                href="#attractions"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                Attractions
              </a>
              <a
                href="#culture"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                Culture
              </a>
              <a
                href="#testimonials"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </a>
              <div className="px-3 py-2">
                <Button onClick={scrollToItinerary} className="w-full bg-primary hover:bg-accent text-primary-foreground">Plan Your Trip</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
