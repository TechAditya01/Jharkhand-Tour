import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const timeRange = searchParams.get("timeRange") || "30d"

  // Mock analytics data - in a real app, this would come from a database
  const analyticsData = {
    overview: {
      totalVisitors: 15420,
      totalBookings: 2340,
      revenue: 1250000,
      avgRating: 4.3,
      growthRate: 12.5,
    },
    visitorTrends: [
      { date: "2024-01-01", visitors: 450, bookings: 67 },
      { date: "2024-01-02", visitors: 520, bookings: 78 },
      { date: "2024-01-03", visitors: 480, bookings: 72 },
      { date: "2024-01-04", visitors: 610, bookings: 89 },
      { date: "2024-01-05", visitors: 580, bookings: 85 },
      { date: "2024-01-06", visitors: 720, bookings: 102 },
      { date: "2024-01-07", visitors: 680, bookings: 95 },
    ],
    popularDestinations: [
      { name: "Hundru Falls", visitors: 3200, rating: 4.6, revenue: 280000 },
      { name: "Betla National Park", visitors: 2800, rating: 4.4, revenue: 350000 },
      { name: "Netarhat", visitors: 2400, rating: 4.2, revenue: 220000 },
      { name: "Dassam Falls", visitors: 1900, rating: 4.3, revenue: 180000 },
      { name: "Jagannath Temple", visitors: 1600, rating: 4.5, revenue: 120000 },
    ],
    demographics: {
      ageGroups: [
        { group: "18-25", percentage: 28 },
        { group: "26-35", percentage: 35 },
        { group: "36-45", percentage: 22 },
        { group: "46-60", percentage: 12 },
        { group: "60+", percentage: 3 },
      ],
      origins: [
        { state: "West Bengal", visitors: 4200 },
        { state: "Bihar", visitors: 3800 },
        { state: "Odisha", visitors: 2900 },
        { state: "Delhi", visitors: 2100 },
        { state: "Maharashtra", visitors: 1800 },
      ],
    },
    feedback: {
      totalFeedback: 1240,
      sentimentBreakdown: {
        positive: 68,
        neutral: 22,
        negative: 10,
      },
      commonIssues: [
        { issue: "Road conditions", count: 45, priority: "high" },
        { issue: "Limited accommodation", count: 32, priority: "medium" },
        { issue: "Poor signage", count: 28, priority: "medium" },
        { issue: "Lack of guides", count: 22, priority: "low" },
      ],
    },
    economic: {
      directRevenue: 1250000,
      indirectRevenue: 2100000,
      jobsCreated: 340,
      localBusinessImpact: 85,
    },
  }

  return NextResponse.json(analyticsData)
}
