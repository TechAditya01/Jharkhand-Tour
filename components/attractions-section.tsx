import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mountain, TreePine, Waves, Camera } from "lucide-react"

const attractions = [
  {
    title: "Hundru Falls",
    description: "Experience the majestic 98-meter waterfall cascading through rocky terrain",
    image: "/spectacular-hundru-waterfall-cascading-down-rocky-.jpg",
    category: "Waterfalls",
    icon: Waves,
    highlights: ["98m Height", "Best in Monsoon", "Trekking Trail"],
  },
  {
    title: "Betla National Park",
    description: "Discover diverse wildlife including tigers, elephants, and exotic birds",
    image: "/lush-green-betla-national-park-with-wildlife-and-d.jpg",
    category: "Wildlife",
    icon: TreePine,
    highlights: ["Tiger Reserve", "Elephant Safari", "Bird Watching"],
  },
  {
    title: "Parasnath Hill",
    description: "Sacred Jain pilgrimage site and highest peak in Jharkhand",
    image: "/serene-parasnath-hill-with-ancient-jain-temples-an.jpg",
    category: "Adventure",
    icon: Mountain,
    highlights: ["1365m Peak", "Jain Temples", "Trekking"],
  },
  {
    title: "Dassam Falls",
    description: "Stunning 44-meter waterfall perfect for photography and picnics",
    image: "/beautiful-dassam-waterfall-with-crystal-clear-wate.jpg",
    category: "Photography",
    icon: Camera,
    highlights: ["44m Height", "Photo Spot", "Picnic Area"],
  },
  {
    title: "Netarhat",
    description: "Hill station known as 'Queen of Chotanagpur' with breathtaking sunsets",
    image: "/scenic-netarhat-hill-station-with-golden-sunset-an.jpg",
    category: "Hill Station",
    icon: Mountain,
    highlights: ["Sunset Point", "Cool Climate", "Pine Forests"],
  },
  {
    title: "Hazaribagh Wildlife Sanctuary",
    description: "Home to leopards, sambars, and over 180 bird species",
    image: "/hazaribagh-wildlife-sanctuary-with-diverse-animals.jpg",
    category: "Wildlife",
    icon: TreePine,
    highlights: ["180+ Birds", "Leopard Sighting", "Nature Trails"],
  },
  {
    title: "Jonha Falls",
    description: "A scenic waterfall near Ranchi with natural pools and viewpoints",
    image: "/dassam-falls-multi-tiered-cascade.jpg",
    category: "Waterfalls",
    icon: Waves,
    highlights: ["Natural Pools", "Family Picnic Spot", "Easy Trails"],
  },
  {
    title: "Jagannath Temple, Ranchi",
    description: "A prominent temple in Ranchi known for its architecture and festivals",
    image: "/jagannath-temple-ranchi-traditional-architecture.jpg",
    category: "Cultural",
    icon: Camera,
    highlights: ["Pilgrimage", "Festivals", "Architecture"],
  },
  {
    title: "Dhokra Crafts Village",
    description: "Traditional metal craft workshops showcasing tribal artistry",
    image: "/dhokra.jpeg",
    category: "Culture",
    icon: Camera,
    highlights: ["Handicrafts", "Workshops", "Local Markets"],
  },
  {
    title: "Ranchi Hill Station (Firka/Garden Area)",
    description: "Panoramic sunset viewpoints and popular local parks in Ranchi",
    image: "/ranchi-hill-station-panoramic-sunset-view.jpg",
    category: "Hill Station",
    icon: Mountain,
    highlights: ["Sunset Views", "Parks", "City Lookouts"],
  },
]

export function AttractionsSection() {
  return (
    <section id="attractions" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Explore Natural Wonders</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            From thundering waterfalls to pristine forests, Jharkhand offers breathtaking landscapes and unforgettable
            adventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => {
            const IconComponent = attraction.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-card"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={attraction.image || "/placeholder.svg"}
                    alt={attraction.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                      <IconComponent className="w-3 h-3 mr-1" />
                      {attraction.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {attraction.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">{attraction.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {attraction.highlights.map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground">
            View All Attractions
          </Button>
        </div>
      </div>
    </section>
  )
}
