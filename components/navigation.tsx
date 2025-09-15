"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const navEl = document.querySelector("nav") as HTMLElement | null
      const navHeight = navEl ? navEl.offsetHeight : 0
      const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 12
      window.scrollTo({ top, behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <h1 className="text-2xl font-bold text-primary">Jharkhand Tourism</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("home")
              }}
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
            >
              Home
            </a>
            <a
              href="#attractions"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("attractions")
              }}
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
            >
              Attractions
            </a>
            <a
              href="#culture"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("culture")
              }}
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
            >
              Culture
            </a>
            <a
              href="#testimonials"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("testimonials")
              }}
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
            >
              Reviews
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection("contact")
              }}
              className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
            >
              Contact
            </a>
          </div>

          <div className="hidden md:block">
            <Button onClick={() => scrollToSection("itinerary")} className="bg-primary hover:bg-accent text-primary-foreground">
              Plan Your Trip
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("home")
                  }}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                >
                  Home
                </a>
                <a
                  href="#attractions"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("attractions")
                  }}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                >
                  Attractions
                </a>
                <a
                  href="#culture"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("culture")
                  }}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                >
                  Culture
                </a>
                <a
                  href="#testimonials"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("testimonials")
                  }}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                >
                  Reviews
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection("contact")
                  }}
                  className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                >
                  Contact
                </a>
                <div className="px-3 py-2">
                  <Button onClick={() => scrollToSection("itinerary")} className="w-full bg-primary hover:bg-accent text-primary-foreground">
                    Plan Your Trip
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
