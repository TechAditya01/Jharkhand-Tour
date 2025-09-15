"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Send, X, Trash2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  type MessagePart = { type: "text"; text: string }
  type Message = {
    id: string
    role: "user" | "assistant"
    content: string
    parts: MessagePart[]
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: language === "hi"
        ? "झारखंड में आपका स्वागत है! मैं आपका एआई पर्यटन सहायक हूँ। मैं आपकी यात्रा की योजना बनाने में कैसे मदद कर सकता हूँ?"
        : language === "bn"
        ? "ঝাড়খণ্ডে আপনাকে স্বাগতম! আমি আপনার এআই পর্যটন সহকারী। আমি কীভাবে আপনার ভ্রমণ পরিকল্পনা করতে সাহায্য করতে পারি?"
        : "Welcome to Jharkhand! I'm your AI tourism assistant. How can I help you plan your perfect trip today?",
      parts: [{ type: "text", text: language === "hi"
        ? "झारखंड में आपका स्वागत है! मैं आपका एआई पर्यटन सहायक हूँ। मैं आपकी यात्रा की योजना बनाने में कैसे मदद कर सकता हूँ?"
        : language === "bn"
        ? "ঝাড়খণ্ডে আপনাকে স্বাগতম! আমি আপনার এআই পর্যটন সহকারী। আমি কীভাবে আপনার ভ্রমণ পরিকল্পনা করতে সাহায্য করতে পারি?"
        : "Welcome to Jharkhand! I'm your AI tourism assistant. How can I help you plan your perfect trip today?" }]
    }
  ])
  const [input, setInput] = useState("")
  const [status, setStatus] = useState<"ready" | "streaming" | "error">("ready")
  const [showHistory, setShowHistory] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const clearMessages = () => {
    // Save current conversation to history if there are messages beyond welcome
    if (typeof window !== "undefined" && messages.length > 1) {
      const history = JSON.parse(localStorage.getItem('chatHistory') || '[]')
      const conversation = messages.filter(m => m.id !== 'welcome')
      if (conversation.length > 0) {
        history.push({
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          messages: conversation
        })
        localStorage.setItem('chatHistory', JSON.stringify(history.slice(-10))) // Keep last 10
      }
    }

    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: language === "hi"
          ? "झारखंड में आपका स्वागत है! मैं आपका एआई पर्यटन सहायक हूँ। मैं आपकी यात्रा की योजना बनाने में कैसे मदद कर सकता हूँ?"
          : language === "bn"
          ? "ঝাড়খণ্ডে আপনাকে স্বাগতম! আমি আপনার এআই পর্যটন সহকারী। আমি কীভাবে আপনার ভ্রমণ পরিকল্পনা করতে সাহায্য করতে পারি?"
          : "Welcome to Jharkhand! I'm your AI tourism assistant. How can I help you plan your perfect trip today?",
        parts: [{ type: "text", text: language === "hi"
          ? "झारखंड में आपका स्वागत है! मैं आपका एआई पर्यटन सहायक हूँ। मैं आपकी यात्रा की योजना बनाने में कैसे मदद कर सकता हूँ?"
          : language === "bn"
          ? "ঝাড়খণ্ডে আপনাকে স্বাগতম! আমি আপনার এআই পর্যটন সহকারী। আমি কীভাবে আপনার ভ্রমণ পরিকল্পনা করতে সাহায্য করতে পারি?"
          : "Welcome to Jharkhand! I'm your AI tourism assistant. How can I help you plan your perfect trip today?" }]
      }
    ])
    setStatus("ready")
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }

  // Function to send message to backend and stream response
  async function sendMessage(text: string) {
    if (!text.trim()) return

    // Local handling for greetings
    const greetings: Record<string, string[]> = {
      en: ["hi", "hello", "hey", "hii"],
      hi: ["नमस्ते", "हैलो", "हाय", "नमस्कार"],
      bn: ["হ্যালো", "হাই", "নমস্কার"]
    }
    const greetingReplies: Record<string, string> = {
      en: "Hello! How can I assist you with your Jharkhand travel plans today?",
      hi: "नमस्ते! मैं आपकी झारखंड यात्रा योजनाओं में कैसे मदद कर सकता हूँ?",
      bn: "হ্যালো! আমি কীভাবে আপনার ঝাড়খণ্ড ভ্রমণ পরিকল্পনায় সাহায্য করতে পারি?"
    }
    const userText = text.toLowerCase().trim()
    if (greetings[language]?.includes(userText)) {
      const greetingReply: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: greetingReplies[language] || greetingReplies.en,
        parts: [{ type: "text", text: greetingReplies[language] || greetingReplies.en }]
      }
      setMessages((prev) => [...prev, greetingReply])
      return
    }

    setStatus("streaming")
    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      parts: [{ type: "text", text }]
    }
    setMessages((prev) => [...prev, newUserMessage])

    try {
      abortControllerRef.current = new AbortController()
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-language": language
        },
        body: JSON.stringify({ messages }),
        signal: abortControllerRef.current.signal
      })

      if (!response.body) {
        throw new Error("No response body")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      let assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        parts: []
      }

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        if (value) {
          const chunk = decoder.decode(value)
          assistantMessage.content += chunk
          assistantMessage.parts = [{ type: "text", text: assistantMessage.content }]
          setMessages((prev) => {
            const withoutLast = prev.filter((m) => m.id !== assistantMessage.id)
            return [...withoutLast, assistantMessage]
          })
        }
      }
      setStatus("ready")
    } catch (error) {
      if ((error as any).name === "AbortError") {
        console.log("Fetch aborted")
      } else {
        console.error("Chat error:", error)
        setStatus("error")
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status === "streaming") return
    sendMessage(input)
    setInput("")
  }

  const quickActions = [
    "Plan a 3-day itinerary",
    "Show me waterfalls",
    "Find nearby accommodations",
    "Cultural festivals this month",
  ]

  const footerButtons = [
    { label: "Plan Trip", action: () => sendMessage("Plan a 3-day itinerary") },
    { label: "Find Places", action: () => sendMessage("Show me waterfalls") },
    { label: "Live Guide", action: () => sendMessage("Connect me to a live guide") },
    { label: "History", action: () => setShowHistory(true) },
  ]

  const loadHistory = (conversation: any) => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: language === "hi"
          ? "झारखंड में आपका स्वागत है! मैं आपका एआई पर्यटन सहायक हूँ। मैं आपकी यात्रा की योजना बनाने में कैसे मदद कर सकता हूँ?"
          : language === "bn"
          ? "ঝাড়খণ্ডে আপনাকে স্বাগতম! আমি আপনার এআই পর্যটন সহকারী। আমি কীভাবে আপনার ভ্রমণ পরিকল্পনা করতে সাহায্য করতে পারি?"
          : "Welcome to Jharkhand! I'm your AI tourism assistant. How can I help you plan your perfect trip today?",
        parts: [{ type: "text", text: language === "hi"
          ? "झारखंड में आपका स्वागत है! मैं आपका एआई पर्यटन सहायक हूँ। मैं आपकी यात्रा की योजना बनाने में कैसे मदद कर सकता हूँ?"
          : language === "bn"
          ? "ঝাড়খণ্ডে আপনাকে স্বাগতম! আমি আপনার এআই পর্যটন সহকারী। আমি কীভাবে আপনার ভ্রমণ পরিকল্পনা করতে সাহায্য করতে পারি?"
          : "Welcome to Jharkhand! I'm your AI tourism assistant. How can I help you plan your perfect trip today?" }]
      },
      ...conversation.messages
    ])
    setShowHistory(false)
  }

  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]')
      setHistory(storedHistory)
    }
  }, [])

  return (
    <>
      {/* Floating Chat Button with label */}
      <div className="fixed bottom-6 right-6 flex items-center space-x-2 z-50">
        <div className="hidden sm:block bg-emerald-600 text-white rounded-full px-3 py-1 text-sm font-medium shadow-lg select-none cursor-pointer" onClick={() => setIsOpen(true)}>
          Chat with us
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg"
          size="icon"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end p-4">
          <Card className="w-full max-w-lg h-[700px] flex flex-col bg-white shadow-lg rounded-lg">
            {/* Header */}
            <CardHeader className="flex items-center justify-between bg-emerald-700 text-white px-4 py-2 rounded-t-lg">
              <div>
                <CardTitle className="text-lg font-semibold">Jharkhand Travel Assistant</CardTitle>
                <p className="text-sm text-emerald-300">Online - Multi-language</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={clearMessages} aria-label="Clear messages">
                  <Trash2 className="h-5 w-5" />
                </Button>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-20 h-8 bg-emerald-600 border-emerald-500 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">EN</SelectItem>
                    <SelectItem value="hi">HI</SelectItem>
                    <SelectItem value="bn">BN</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chat">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="flex-1 flex flex-col px-4 py-3 overflow-hidden">
              {/* Quick action buttons when no user messages */}
              {messages.length === 1 && messages[0].id === "welcome" && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action) => (
                      <Button
                        key={action}
                        variant="outline"
                        size="sm"
                        className="text-emerald-700 border-emerald-700 hover:bg-emerald-100"
                        onClick={() => sendMessage(action)}
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages or History */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {showHistory ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Chat History</h3>
                      <Button variant="outline" size="sm" onClick={() => setShowHistory(false)}>
                        Back to Chat
                      </Button>
                    </div>
                    {history.length === 0 ? (
                      <p className="text-gray-500">No previous conversations</p>
                    ) : (
                      history.map((conv: any) => (
                        <div key={conv.id} className="border rounded-lg p-3 mb-2 cursor-pointer hover:bg-gray-50" onClick={() => loadHistory(conv)}>
                          <p className="text-sm text-gray-600">{new Date(conv.timestamp).toLocaleString()}</p>
                          <p className="text-sm">{conv.messages[0]?.content.slice(0, 50)}...</p>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <>
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 ${
                            message.role === "user" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.parts && message.parts.length > 0
                            ? message.parts.map((part, i) => {
                                if (part.type === "text") {
                                  // Convert numbered or bulleted lists to JSX lists
                                  const lines = part.text.split(/\r?\n/)
                                  const isList = lines.every(line => /^\s*[\-\*\d+\.]\s+/.test(line))
                                  if (isList) {
                                    return (
                                      <ul key={i} className="list-disc list-inside space-y-1">
                                        {lines.map((line, idx) => {
                                          const text = line.replace(/^\s*[\-\*\d+\.]\s+/, '')
                                          return <li key={idx}>{text}</li>
                                        })}
                                      </ul>
                                    )
                                  } else {
                                    return <p key={i}>{part.text}</p>
                                  }
                                }
                                return null
                              })
                            : message.content}
                        </div>
                      </div>
                    ))}
                    {status === "streaming" && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg px-3 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer buttons */}
              <div className="flex justify-between mb-2">
                {footerButtons.map((btn) => (
                  <Button
                    key={btn.label}
                    variant="outline"
                    size="sm"
                    className="text-emerald-700 border-emerald-700 hover:bg-emerald-100"
                    onClick={btn.action}
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>

              {/* Input form */}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about destinations, hotels, or activities..."
                  disabled={status !== "ready"}
                  aria-label="Chat input"
                />
                <Button type="submit" disabled={status !== "ready" || !input.trim()} size="icon" aria-label="Send message">
                  <Send className="h-4 w-4" />
                </Button>
              </form>

              {/* Footer note */}
              <p className="text-center text-xs text-gray-500 mt-1">
                Available in English, Hindi & local languages
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
