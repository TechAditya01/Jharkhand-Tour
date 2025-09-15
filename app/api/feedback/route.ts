import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: NextRequest) {
  try {
    const { feedback, rating, category, location } = await request.json()

    // AI sentiment analysis
    const { text: sentimentAnalysis } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt: `Analyze the sentiment and extract key insights from this tourism feedback:

Feedback: "${feedback}"
Rating: ${rating}/5
Category: ${category}
Location: ${location}

Please provide:
1. Sentiment (positive/negative/neutral) with confidence score
2. Key themes mentioned
3. Specific issues or praise points
4. Actionable recommendations for improvement
5. Priority level (high/medium/low)

Format as JSON with these fields: sentiment, confidence, themes, issues, recommendations, priority`,
    })

    // Parse AI response
    let analysis
    try {
      analysis = JSON.parse(sentimentAnalysis)
    } catch {
      // Fallback if JSON parsing fails
      analysis = {
        sentiment: rating >= 4 ? "positive" : rating >= 3 ? "neutral" : "negative",
        confidence: 0.8,
        themes: ["general feedback"],
        issues: feedback.toLowerCase().includes("problem") ? ["reported issues"] : [],
        recommendations: ["Review and respond to feedback"],
        priority: rating <= 2 ? "high" : rating <= 3 ? "medium" : "low",
      }
    }

    // Store feedback (in a real app, this would go to a database)
    const feedbackRecord = {
      id: Date.now().toString(),
      feedback,
      rating,
      category,
      location,
      timestamp: new Date().toISOString(),
      analysis,
      status: "new",
    }

    return NextResponse.json({
      success: true,
      analysis,
      message: "Feedback analyzed successfully",
    })
  } catch (error) {
    console.error("Feedback analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze feedback" }, { status: 500 })
  }
}

export async function GET() {
  // Mock feedback data for demonstration
  const mockFeedback = [
    {
      id: "1",
      feedback: "Amazing experience at Hundru Falls! The natural beauty is breathtaking.",
      rating: 5,
      category: "attractions",
      location: "Hundru Falls",
      timestamp: "2024-01-15T10:30:00Z",
      analysis: {
        sentiment: "positive",
        confidence: 0.95,
        themes: ["natural beauty", "waterfalls", "experience"],
        issues: [],
        recommendations: ["Continue maintaining natural sites"],
        priority: "low",
      },
      status: "reviewed",
    },
    {
      id: "2",
      feedback: "The road to Netarhat was in poor condition. Difficult to reach.",
      rating: 2,
      category: "transport",
      location: "Netarhat",
      timestamp: "2024-01-14T15:45:00Z",
      analysis: {
        sentiment: "negative",
        confidence: 0.88,
        themes: ["infrastructure", "accessibility", "roads"],
        issues: ["poor road conditions", "accessibility problems"],
        recommendations: ["Improve road infrastructure", "Better signage"],
        priority: "high",
      },
      status: "in-progress",
    },
  ]

  return NextResponse.json({ feedback: mockFeedback })
}
