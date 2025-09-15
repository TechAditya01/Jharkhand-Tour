import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(req: Request) {
  const { preferences, duration, budget, interests } = await req.json()

  const prompt = `Create a detailed ${duration}-day itinerary for Jharkhand tourism based on:
  - Budget: ${budget}
  - Interests: ${interests.join(", ")}
  - Preferences: ${preferences}

  Include:
  - Daily activities and attractions
  - Accommodation suggestions
  - Local food recommendations
  - Transportation options
  - Estimated costs
  - Cultural experiences
  - Safety tips

  ONLY output a valid JSON object matching this structure. Do NOT include any explanation, markdown, or extra text. Do NOT wrap the JSON in code blocks.
  {
    "title": "Personalized Jharkhand Itinerary",
    "duration": "${duration} days",
    "totalBudget": "estimated amount",
    "days": [
      {
        "day": 1,
        "title": "Day title",
        "activities": ["activity1", "activity2"],
        "accommodation": "suggestion",
        "meals": ["breakfast", "lunch", "dinner"],
        "cost": "daily cost"
      }
    ],
    "tips": ["tip1", "tip2"]
  }`

  try {
    const { text } = await generateText({
  model: groq("llama-3.3-70b-versatile"),
      prompt,
    })
    try {
      const itinerary = JSON.parse(text)
      return Response.json(itinerary)
    } catch (jsonError) {
      console.error("Itinerary JSON parse error:", jsonError, "AI response:", text)
      return Response.json({ error: "Failed to parse itinerary JSON", details: text, raw: text }, { status: 500 })
    }
  } catch (aiError) {
    console.error("Itinerary AI error:", aiError)
    return Response.json({ error: "AI request failed", details: String(aiError) }, { status: 500 })
  }
}
