"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Star, AlertTriangle, CheckCircle, Clock, Brain, BarChart3, Send, Sparkles } from "lucide-react"

interface FeedbackAnalysis {
  sentiment: "positive" | "negative" | "neutral"
  confidence: number
  themes: string[]
  issues: string[]
  recommendations: string[]
  priority: "high" | "medium" | "low"
}

interface FeedbackItem {
  id: string
  feedback: string
  rating: number
  category: string
  location: string
  timestamp: string
  analysis: FeedbackAnalysis
  status: "new" | "in-progress" | "reviewed"
}

const categories = ["attractions", "transport", "accommodation", "food", "culture", "service", "infrastructure"]

const locations = [
  "Ranchi",
  "Netarhat",
  "Hundru Falls",
  "Betla National Park",
  "Dassam Falls",
  "Jagannath Temple",
  "Other",
]

export function FeedbackSystem() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([])
  const [newFeedback, setNewFeedback] = useState({
    feedback: "",
    rating: 5,
    category: "",
    location: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filter, setFilter] = useState("all")
  const [showAnalytics, setShowAnalytics] = useState(false)

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    try {
      const response = await fetch("/api/feedback")
      const data = await response.json()
      setFeedbackList(data.feedback || [])
    } catch (error) {
      console.error("Failed to fetch feedback:", error)
    }
  }

  const submitFeedback = async () => {
    if (!newFeedback.feedback || !newFeedback.category || !newFeedback.location) {
      alert("Please fill in all fields")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeedback),
      })

      const result = await response.json()

      if (result.success) {
        alert("Thank you for your feedback! Our AI has analyzed it for insights.")
        setNewFeedback({ feedback: "", rating: 5, category: "", location: "" })
        fetchFeedback() // Refresh the list
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error)
      alert("Failed to submit feedback. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-100"
      case "negative":
        return "text-red-600 bg-red-100"
      case "neutral":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <AlertTriangle className="h-4 w-4" />
      case "reviewed":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredFeedback = feedbackList.filter((item) => {
    if (filter === "all") return true
    if (filter === "positive") return item.analysis.sentiment === "positive"
    if (filter === "negative") return item.analysis.sentiment === "negative"
    if (filter === "high-priority") return item.analysis.priority === "high"
    return true
  })

  const analytics = {
    total: feedbackList.length,
    positive: feedbackList.filter((f) => f.analysis.sentiment === "positive").length,
    negative: feedbackList.filter((f) => f.analysis.sentiment === "negative").length,
    highPriority: feedbackList.filter((f) => f.analysis.priority === "high").length,
    avgRating:
      feedbackList.length > 0
        ? (feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length).toFixed(1)
        : "0",
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Feedback System</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your experience and get instant AI analysis for continuous improvement
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Brain className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-purple-600 font-medium">AI Sentiment Analysis</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Share Your Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Experience</label>
                  <Textarea
                    placeholder="Tell us about your experience in Jharkhand..."
                    value={newFeedback.feedback}
                    onChange={(e) => setNewFeedback({ ...newFeedback, feedback: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                        className={`p-1 ${star <= newFeedback.rating ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select
                    value={newFeedback.category}
                    onValueChange={(value) => setNewFeedback({ ...newFeedback, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Select
                    value={newFeedback.location}
                    onValueChange={(value) => setNewFeedback({ ...newFeedback, location: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={submitFeedback}
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Analytics Summary */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Feedback Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">{analytics.total}</div>
                    <div className="text-sm text-gray-500">Total Feedback</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{analytics.avgRating}</div>
                    <div className="text-sm text-gray-500">Avg Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{analytics.positive}</div>
                    <div className="text-sm text-gray-500">Positive</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">{analytics.highPriority}</div>
                    <div className="text-sm text-gray-500">High Priority</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feedback List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">AI-Analyzed Feedback</h3>
              <div className="flex gap-2">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Feedback</SelectItem>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="high-priority">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredFeedback.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= item.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {item.category}
                        </Badge>
                        <Badge variant="outline">{item.location}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <span className="text-sm text-gray-500 capitalize">{item.status}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{item.feedback}</p>

                    {/* AI Analysis */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        AI Analysis
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getSentimentColor(item.analysis.sentiment)}>
                              {item.analysis.sentiment}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {Math.round(item.analysis.confidence * 100)}% confidence
                            </span>
                          </div>
                          <Badge className={getPriorityColor(item.analysis.priority)}>
                            {item.analysis.priority} priority
                          </Badge>
                        </div>
                      </div>

                      {item.analysis.themes.length > 0 && (
                        <div className="mb-3">
                          <div className="text-sm font-medium text-gray-700 mb-1">Key Themes:</div>
                          <div className="flex flex-wrap gap-1">
                            {item.analysis.themes.map((theme, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {theme}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {item.analysis.issues.length > 0 && (
                        <div className="mb-3">
                          <div className="text-sm font-medium text-red-700 mb-1">Issues Identified:</div>
                          <ul className="text-sm text-red-600 list-disc list-inside">
                            {item.analysis.issues.map((issue, index) => (
                              <li key={index}>{issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.analysis.recommendations.length > 0 && (
                        <div>
                          <div className="text-sm font-medium text-blue-700 mb-1">AI Recommendations:</div>
                          <ul className="text-sm text-blue-600 list-disc list-inside">
                            {item.analysis.recommendations.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-gray-500">
                      {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFeedback.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">No feedback found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
