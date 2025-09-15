import { streamText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(req: Request) {
  const { messages } = await req.json()
  const language = req.headers.get('x-language') || 'en'

  // Convert UIMessage[] to ModelMessage[]
  const convertedMessages = messages.map((msg: any) => {
    let content = "";
    if (Array.isArray(msg.parts)) {
      content = msg.parts.map((part: any) => part.text).join('');
    } else if (typeof msg.content === "string") {
      content = msg.content;
    }
    return {
      id: msg.id,
      role: msg.role,
      content,
    };
  })

  // Add system message with language info at the start of messages
  const systemPrompt = {
    id: "system",
    role: "system",
    content: `You are a helpful AI tourism assistant for Jharkhand, India. You specialize in:
- Providing information about tourist attractions, culture, and activities in Jharkhand
- Creating personalized itineraries based on user preferences
- Suggesting local experiences, food, and accommodations
- Helping with travel planning and logistics
- Speaking in ${language === "hi" ? "Hindi" : language === "bn" ? "Bengali" : "English"}

You should respond in the user's selected language and use local dialects and expressions common to Jharkhand natives to make the conversation natural and relatable.

Key attractions in Jharkhand include:
- Hundru Falls, Dassam Falls, Jonha Falls
- Betla National Park, Dalma Wildlife Sanctuary
- Ranchi, Jamshedpur, Dhanbad cities
- Tribal villages and cultural sites
- Adventure activities like trekking, rock climbing

Always be helpful, informative, and encourage sustainable tourism practices.`,
  }

  const allMessages = [systemPrompt, ...convertedMessages]

  try {
    console.log("Sending messages to AI model:", allMessages)
    const result = await streamText({
      model: groq("llama-3.3-70b-versatile"),
      messages: allMessages,
    })
    console.log("Received result from AI model")
    return result.toTextStreamResponse()
  } catch (error) {
    console.error("Chat AI error:", error)
    return Response.json({ error: "AI chat request failed", details: String(error) }, { status: 500 })
  }
}
