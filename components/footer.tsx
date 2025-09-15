import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-white mb-4">Jharkhand Tourism</h3>
              <p className="text-secondary-foreground/80 mb-6 leading-relaxed">
                Discover the untamed beauty of Jharkhand - from majestic waterfalls to rich tribal culture, experience
                India's hidden gem.
              </p>
              <div className="flex space-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 hover:bg-white hover:text-secondary bg-transparent"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 hover:bg-white hover:text-secondary bg-transparent"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 hover:bg-white hover:text-secondary bg-transparent"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 hover:bg-white hover:text-secondary bg-transparent"
                >
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#home" className="text-secondary-foreground/80 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#attractions" className="text-secondary-foreground/80 hover:text-white transition-colors">
                    Attractions
                  </a>
                </li>
                <li>
                  <a href="#culture" className="text-secondary-foreground/80 hover:text-white transition-colors">
                    Culture
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-secondary-foreground/80 hover:text-white transition-colors">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-secondary-foreground/80 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Popular Destinations */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Popular Destinations</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">
                    Hundru Falls
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">
                    Betla National Park
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">
                    Parasnath Hill
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">
                    Netarhat
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">
                    Dassam Falls
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
              <p className="text-secondary-foreground/80 mb-4 text-sm">
                Subscribe to our newsletter for travel tips and exclusive offers.
              </p>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button className="w-full bg-primary hover:bg-accent text-primary-foreground">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20" />

        {/* Contact Info */}
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <MapPin className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm text-secondary-foreground/80">Tourism Bhawan, Ranchi, Jharkhand</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Phone className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm text-secondary-foreground/80">+91 98765 43210</span>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Mail className="h-5 w-5 text-primary mr-2" />
              <span className="text-sm text-secondary-foreground/80">info@jharkhnadtourism.gov.in</span>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-secondary-foreground/60 mb-4 md:mb-0">
              © 2024 Jharkhand Tourism Development Corporation. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-secondary-foreground/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
