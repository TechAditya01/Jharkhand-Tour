import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Music, Palette, Home } from "lucide-react"

const culturalHighlights = [
  {
    title: "Tribal Festivals",
    description: "Experience vibrant celebrations like Sarhul, Karma, and Sohrai festivals",
    image: "/colorful-tribal-festival-celebration-in-jharkhand-.jpg",
    icon: Music,
    features: ["Traditional Dance", "Folk Music", "Seasonal Celebrations"],
  },
  {
    title: "Ancient Temples",
    description: "Visit sacred sites like Baidyanath Temple and Rajrappa Temple",
    image: "/ancient-ornate-temple-architecture-in-jharkhand-wi.jpg",
    icon: Home,
    features: ["Spiritual Heritage", "Architecture", "Pilgrimage Sites"],
  },
  {
    title: "Tribal Art & Crafts",
    description: "Discover unique handicrafts, paintings, and traditional artwork",
    image: "/traditional-tribal-art-and-handicrafts-from-jharkh.jpg",
    icon: Palette,
    features: ["Handmade Crafts", "Traditional Art", "Local Markets"],
  },
  {
    title: "Indigenous Communities",
    description: "Learn about 32 different tribal groups and their rich traditions",
    image: "/diverse-tribal-communities-of-jharkhand-in-traditi.jpg",
    icon: Users,
    features: ["32 Tribal Groups", "Cultural Diversity", "Traditional Lifestyle"],
  },
]

export function CultureSection() {
  return (
    <section id="culture" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Rich Cultural Heritage</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Immerse yourself in the vibrant traditions, ancient temples, and diverse tribal cultures that make Jharkhand
            truly unique
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {culturalHighlights.map((item, index) => {
            const IconComponent = item.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-card"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 relative overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                        <IconComponent className="w-3 h-3 mr-1" />
                        Culture
                      </Badge>
                    </div>
                  </div>

                  <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-base leading-relaxed">{item.description}</CardDescription>
                    </CardHeader>

                    <CardContent className="p-0">
                      <div className="space-y-2 mb-6">
                        {item.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                      >
                        Explore Culture
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Cultural Stats */}
        <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">32</div>
              <div className="text-sm text-muted-foreground">Tribal Groups</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Ancient Temples</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Folk Dances</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Festivals</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
