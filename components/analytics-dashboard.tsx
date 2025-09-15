"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  Users,
  DollarSign,
  Star,
  MapPin,
  AlertTriangle,
  Download,
  RefreshCw,
  Calendar,
  Target,
  Briefcase,
} from "lucide-react"

interface AnalyticsData {
  overview: {
    totalVisitors: number
    totalBookings: number
    revenue: number
    avgRating: number
    growthRate: number
  }
  visitorTrends: Array<{
    date: string
    visitors: number
    bookings: number
  }>
  popularDestinations: Array<{
    name: string
    visitors: number
    rating: number
    revenue: number
  }>
  demographics: {
    ageGroups: Array<{ group: string; percentage: number }>
    origins: Array<{ state: string; visitors: number }>
  }
  feedback: {
    totalFeedback: number
    sentimentBreakdown: {
      positive: number
      neutral: number
      negative: number
    }
    commonIssues: Array<{
      issue: string
      count: number
      priority: string
    }>
  }
  economic: {
    directRevenue: number
    indirectRevenue: number
    jobsCreated: number
    localBusinessImpact: number
  }
}

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState("30d")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/analytics?timeRange=${timeRange}`)
      const analyticsData = await response.json()
      setData(analyticsData)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num)
  }

  if (loading || !data) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="h-8 w-8 animate-spin text-emerald-600" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Tourism Analytics Dashboard</h2>
            <p className="text-gray-600">Comprehensive insights for tourism officials and stakeholders</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchAnalytics} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "visitors", label: "Visitor Analytics", icon: Users },
            { id: "destinations", label: "Destinations", icon: MapPin },
            { id: "feedback", label: "Feedback Analysis", icon: Star },
            { id: "economic", label: "Economic Impact", icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id ? "bg-emerald-600 hover:bg-emerald-700" : ""
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Button>
            )
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Visitors</p>
                      <p className="text-2xl font-bold text-gray-900">{formatNumber(data.overview.totalVisitors)}</p>
                    </div>
                    <Users className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+{data.overview.growthRate}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Bookings</p>
                      <p className="text-2xl font-bold text-gray-900">{formatNumber(data.overview.totalBookings)}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+8.2%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.overview.revenue)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+15.3%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Rating</p>
                      <p className="text-2xl font-bold text-gray-900">{data.overview.avgRating}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+0.2</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Growth Rate</p>
                      <p className="text-2xl font-bold text-gray-900">{data.overview.growthRate}%</p>
                    </div>
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">Above target</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Visitor Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Visitor Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data.visitorTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="bookings"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Visitors Tab */}
        {activeTab === "visitors" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data.demographics.ageGroups}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                      label={({ group, percentage }) => `${group}: ${percentage}%`}
                    >
                      {data.demographics.ageGroups.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visitor Origins</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.demographics.origins}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="state" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="visitors" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Destinations Tab */}
        {activeTab === "destinations" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Destinations Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.popularDestinations.map((dest, index) => (
                    <div key={dest.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                        <div>
                          <h4 className="font-semibold text-lg">{dest.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{formatNumber(dest.visitors)} visitors</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {dest.rating}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-600">{formatCurrency(dest.revenue)}</div>
                        <div className="text-sm text-gray-500">Revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === "feedback" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Positive</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${data.feedback.sentimentBreakdown.positive}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{data.feedback.sentimentBreakdown.positive}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Neutral</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-600 h-2 rounded-full"
                          style={{ width: `${data.feedback.sentimentBreakdown.neutral}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{data.feedback.sentimentBreakdown.neutral}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Negative</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${data.feedback.sentimentBreakdown.negative}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{data.feedback.sentimentBreakdown.negative}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.feedback.commonIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertTriangle
                          className={`h-4 w-4 ${
                            issue.priority === "high"
                              ? "text-red-600"
                              : issue.priority === "medium"
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        />
                        <span>{issue.issue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            issue.priority === "high"
                              ? "destructive"
                              : issue.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {issue.priority}
                        </Badge>
                        <span className="text-sm text-gray-600">{issue.count} reports</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Economic Tab */}
        {activeTab === "economic" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Direct Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.economic.directRevenue)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">From tourism activities</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Indirect Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.economic.indirectRevenue)}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Local business impact</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Jobs Created</p>
                    <p className="text-2xl font-bold text-gray-900">{formatNumber(data.economic.jobsCreated)}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Direct & indirect employment</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Business Impact</p>
                    <p className="text-2xl font-bold text-gray-900">{data.economic.localBusinessImpact}%</p>
                  </div>
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Local business growth</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
