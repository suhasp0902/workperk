import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, DollarSign, TrendingUp, Activity, 
  AlertTriangle, CheckCircle, XCircle, Clock,
  BarChart3, PieChart, Calendar, Settings
} from 'lucide-react';
import { mockPlatformMetrics, mockProjects, mockLabs, mockAuctions, mockPayments } from '@/lib/data';
import type { PlatformMetrics } from '@/types';

export function AdminDashboard() {
  const [metrics, setMetrics] = useState<PlatformMetrics>(mockPlatformMetrics);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const revenueByStream = [
    { name: 'Lab Rentals', value: 312500, percentage: 25, color: 'bg-blue-500' },
    { name: 'Course Fees', value: 249500, percentage: 20, color: 'bg-green-500' },
    { name: 'Placement Commissions', value: 374250, percentage: 30, color: 'bg-purple-500' },
    { name: 'Enterprise Subscriptions', value: 187125, percentage: 15, color: 'bg-orange-500' },
    { name: 'Data Licensing', value: 124750, percentage: 10, color: 'bg-pink-500' }
  ];

  const userGrowth = [
    { period: 'Jan', candidates: 1200, employers: 180, labOwners: 45 },
    { period: 'Feb', candidates: 1450, employers: 220, labOwners: 52 },
    { period: 'Mar', candidates: 1780, employers: 285, labOwners: 61 },
    { period: 'Apr', candidates: 2100, employers: 340, labOwners: 72 },
    { period: 'May', candidates: 2520, employers: 410, labOwners: 89 },
    { period: 'Jun', candidates: 2890, employers: 485, labOwners: 98 }
  ];

  const platformHealth = {
    uptime: 99.9,
    avgResponseTime: 245,
    errorRate: 0.02,
    activeConnections: 1247
  };

  const pendingActions = [
    { id: 1, type: 'Project Review', title: 'AI-Powered Chatbot', priority: 'high', age: '2 hours' },
    { id: 2, type: 'Lab Verification', title: 'TechHub Makerspace', priority: 'medium', age: '1 day' },
    { id: 3, type: 'Dispute Resolution', title: 'Booking Cancellation', priority: 'high', age: '4 hours' },
    { id: 4, type: 'Payment Issue', title: 'Failed Transaction #1234', priority: 'urgent', age: '30 minutes' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Administration</h1>
          <p className="text-gray-600">Monitor and manage the WorkPerk ecosystem</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Activity className="w-4 h-4 mr-2" />
            System Status
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalUsers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+{metrics.monthlyGrowth}% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${(metrics.totalRevenue / 1000000).toFixed(1)}M</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+18% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.activeUsers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={(metrics.activeUsers / metrics.totalUsers) * 100} className="h-2" />
              <span className="text-sm text-gray-600 mt-1">
                {((metrics.activeUsers / metrics.totalUsers) * 100).toFixed(1)}% engagement rate
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Platform Health</p>
                <p className="text-2xl font-bold text-green-600">{platformHealth.uptime}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-600">{platformHealth.avgResponseTime}ms avg response</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Actions Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-800">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Pending Actions ({pendingActions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div>
                  <p className="font-medium">{action.title}</p>
                  <p className="text-sm text-gray-600">{action.type} • {action.age} ago</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={
                    action.priority === 'urgent' ? 'destructive' :
                    action.priority === 'high' ? 'default' : 'secondary'
                  }>
                    {action.priority}
                  </Badge>
                  <Button size="sm">Review</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="content">Content Moderation</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Revenue by Stream
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {revenueByStream.map((stream) => (
                  <div key={stream.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{stream.name}</span>
                      <span className="text-sm font-bold">${stream.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${stream.color}`}
                        style={{ width: `${stream.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600">{stream.percentage}% of total revenue</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* User Growth */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  User Growth Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userGrowth.slice(-3).map((month) => (
                    <div key={month.period} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{month.period} 2024</span>
                        <span className="text-sm text-gray-600">
                          {month.candidates + month.employers + month.labOwners} total
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Candidates: {month.candidates}</span>
                          <span>Employers: {month.employers}</span>
                          <span>Lab Owners: {month.labOwners}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 flex">
                          <div 
                            className="bg-blue-500 h-2 rounded-l-full"
                            style={{ width: `${(month.candidates / (month.candidates + month.employers + month.labOwners)) * 100}%` }}
                          ></div>
                          <div 
                            className="bg-green-500 h-2"
                            style={{ width: `${(month.employers / (month.candidates + month.employers + month.labOwners)) * 100}%` }}
                          ></div>
                          <div 
                            className="bg-purple-500 h-2 rounded-r-full"
                            style={{ width: `${(month.labOwners / (month.candidates + month.employers + month.labOwners)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Platform Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Projects</span>
                  <span className="font-semibold">{metrics.totalProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Labs</span>
                  <span className="font-semibold">{metrics.totalLabs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Live Auctions</span>
                  <span className="font-semibold">{metrics.totalAuctions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-semibold">{metrics.totalBookings}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Project Rating</span>
                  <span className="font-semibold">4.7/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Successful Placements</span>
                  <span className="font-semibold text-green-600">89%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">User Satisfaction</span>
                  <span className="font-semibold text-blue-600">4.6/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dispute Rate</span>
                  <span className="font-semibold text-green-600">0.8%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Uptime</span>
                  <span className="font-semibold text-green-600">{platformHealth.uptime}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-semibold">{platformHealth.avgResponseTime}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Error Rate</span>
                  <span className="font-semibold text-green-600">{platformHealth.errorRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Sessions</span>
                  <span className="font-semibold">{platformHealth.activeConnections}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts, verification, and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">8,945</p>
                        <p className="text-sm text-gray-600">Candidates</p>
                        <Button variant="outline" size="sm" className="mt-2">Manage</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">1,234</p>
                        <p className="text-sm text-gray-600">Employers</p>
                        <Button variant="outline" size="sm" className="mt-2">Manage</Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">368</p>
                        <p className="text-sm text-gray-600">Lab Owners</p>
                        <Button variant="outline" size="sm" className="mt-2">Manage</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation Queue</CardTitle>
              <CardDescription>Review and moderate platform content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProjects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm text-gray-600">by {project.candidateName}</p>
                      <p className="text-xs text-gray-500">Submitted {new Date(project.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Revenue, payments, and financial metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Revenue Breakdown</h4>
                  {revenueByStream.map((stream) => (
                    <div key={stream.name} className="flex justify-between items-center">
                      <span className="text-gray-600">{stream.name}</span>
                      <span className="font-semibold">${stream.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Payment Statistics</h4>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Processed</span>
                    <span className="font-semibold">${metrics.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-semibold text-green-600">99.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Transaction</span>
                    <span className="font-semibold">$347</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  System Status: Healthy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Uptime</span>
                  <span className="font-semibold text-green-600">{platformHealth.uptime}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-semibold">{platformHealth.avgResponseTime}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Error Rate</span>
                  <span className="font-semibold text-green-600">{platformHealth.errorRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Connections</span>
                  <span className="font-semibold">{platformHealth.activeConnections}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent System Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Database backup completed</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Security scan completed</p>
                    <p className="text-xs text-gray-500">6 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">High traffic detected</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}