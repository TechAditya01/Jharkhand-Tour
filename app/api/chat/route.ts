import { streamText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(req: Request) {
  const { messages, language = "en" } = await req.json()

  const systemPrompt = `You are a helpful AI tourism assistant for Jharkhand, India. You specialize in:
- Providing information about tourist attractions, culture, and activities in Jharkhand
- Creating personalized itineraries based on user preferences
- Suggesting local experiences, food, and accommodations
- Helping with travel planning and logistics
- Speaking in ${language === "hi" ? "Hindi" : language === "bn" ? "Bengali" : "English"}

Key attractions in Jharkhand include:
- Hundru Falls, Dassam Falls, Jonha Falls
- Betla National Park, Dalma Wildlife Sanctuary
- Ranchi, Jamshedpur, Dhanbad cities
- Tribal villages and cultural sites
- Adventure activities like trekking, rock climbing

Always be helpful, informative, and encourage sustainable tourism practices.`

  try {
    const result = await streamText({
  model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      messages,
    })
  return result.toTextStreamResponse()
  } catch (error) {
    console.error("Chat AI error:", error)
    return Response.json({ error: "AI chat request failed", details: String(error) }, { status: 500 })
  }
}
