import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, Calendar, Users, TrendingUp, 
  MapPin, Clock, Star, Settings, Plus
} from 'lucide-react';
import { AuthService } from '@/lib/auth';
import { 
  mockLabOwnerProfiles, getLabsByOwner, mockBookings, mockPayments
} from '@/lib/data';
import type { LabOwnerProfile, Lab, Booking, Payment } from '@/types';

export function LabOwnerDashboard() {
  const [profile, setProfile] = useState<LabOwnerProfile | null>(null);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      const labOwnerProfile = mockLabOwnerProfiles.find(p => p.id === user.id);
      if (labOwnerProfile) {
        setProfile(labOwnerProfile);
        setLabs(getLabsByOwner(user.id));
        // Filter bookings for this owner's labs
        const ownerLabIds = getLabsByOwner(user.id).map(lab => lab.id);
        setBookings(mockBookings.filter(booking => ownerLabIds.includes(booking.labId)));
        // Filter payments received by this owner
        setPayments(mockPayments.filter(payment => payment.payeeId === user.id));
      }
    }
  }, []);

  if (!profile) return <div>Loading...</div>;

  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const thisMonthBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.createdAt);
    const now = new Date();
    return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear();
  }).length;

  const avgRating = labs.reduce((sum, lab) => sum + lab.rating, 0) / labs.length || 0;
  const utilizationRate = 75; // Mock utilization rate

  const upcomingBookings = bookings.filter(booking => {
    const startTime = new Date(booking.startTime);
    return startTime > new Date() && booking.status === 'CONFIRMED';
  }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const revenueData = [
    { month: 'Jan', revenue: 3200 },
    { month: 'Feb', revenue: 3800 },
    { month: 'Mar', revenue: 4200 },
    { month: 'Apr', revenue: 3900 },
    { month: 'May', revenue: 4500 },
    { month: 'Jun', revenue: 5100 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {profile.firstName}!</h1>
          <p className="text-gray-600">Manage your labs and maximize your revenue</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Lab Settings
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Lab
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{thisMonthBookings}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-2">{profile.totalBookings} total bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={avgRating * 20} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Utilization Rate</p>
                <p className="text-2xl font-bold text-gray-900">{utilizationRate}%</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={utilizationRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="labs">My Labs ({labs.length})</TabsTrigger>
          <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Upcoming Bookings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingBookings.slice(0, 5).map((booking) => {
                  const lab = labs.find(l => l.id === booking.labId);
                  return (
                    <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div>
                        <p className="font-medium">{lab?.name}</p>
                        <p className="text-sm text-gray-600">
                          {booking.userName} • {new Date(booking.startTime).toLocaleDateString()} at {new Date(booking.startTime).toLocaleTimeString()}
                        </p>
                        <p className="text-sm text-gray-500">{booking.totalHours} hours • ${booking.totalCost}</p>
                      </div>
                      <Badge variant="default">Confirmed</Badge>
                    </div>
                  );
                })}
                {upcomingBookings.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No upcoming bookings</p>
                )}
              </CardContent>
            </Card>

            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.slice(-6).map((data, index) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(data.revenue / 6000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold w-16 text-right">${data.revenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lab Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Lab Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {labs.map((lab) => {
                  const labBookings = bookings.filter(b => b.labId === lab.id);
                  const labRevenue = labBookings.reduce((sum, b) => sum + b.totalCost, 0);
                  
                  return (
                    <Card key={lab.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{lab.name}</h4>
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {lab.location}
                            </p>
                          </div>
                          <Badge variant={lab.status === 'ACTIVE' ? 'default' : 'secondary'}>
                            {lab.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Revenue</span>
                            <span className="font-semibold">${labRevenue}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bookings</span>
                            <span className="font-semibold">{labBookings.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rating</span>
                            <span className="font-semibold flex items-center">
                              <Star className="w-3 h-3 mr-1 text-yellow-500" />
                              {lab.rating}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rate</span>
                            <span className="font-semibold">${lab.hourlyRate}/hr</span>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full mt-3">
                          Manage Lab
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="labs" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Labs</h2>
            <Button>Add New Lab</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {labs.map((lab) => (
              <Card key={lab.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{lab.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {lab.location}
                      </CardDescription>
                    </div>
                    <Badge variant={lab.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {lab.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{lab.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-semibold">{lab.category.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Capacity</p>
                      <p className="font-semibold">{lab.capacity} people</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Hourly Rate</p>
                      <p className="font-semibold">${lab.hourlyRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Bookings</p>
                      <p className="font-semibold">{lab.totalBookings}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Equipment</p>
                    <div className="flex flex-wrap gap-1">
                      {lab.equipmentList.slice(0, 3).map((equipment) => (
                        <Badge key={equipment} variant="outline" className="text-xs">
                          {equipment}
                        </Badge>
                      ))}
                      {lab.equipmentList.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{lab.equipmentList.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold">{lab.rating}</span>
                      <span className="text-sm text-gray-600">({lab.totalBookings} reviews)</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Lab Bookings</h2>
            <p className="text-gray-600">{bookings.length} total bookings</p>
          </div>
          
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{booking.labName}</h3>
                      <p className="text-gray-600">Booked by: {booking.userName}</p>
                      <p className="text-sm text-gray-500">{booking.notes}</p>
                    </div>
                    <Badge variant={booking.status === 'CONFIRMED' ? 'default' : 'secondary'}>
                      {booking.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold">
                        {new Date(booking.startTime).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-semibold">
                        {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold">{booking.totalHours} hours</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="font-semibold text-green-600">${booking.totalCost}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Revenue</span>
                  <span className="font-semibold text-green-600">${totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Booking Value</span>
                  <span className="font-semibold">${bookings.length > 0 ? Math.round(totalRevenue / bookings.length) : 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Utilization Rate</span>
                  <span className="font-semibold text-blue-600">{utilizationRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Customer Rating</span>
                  <span className="font-semibold text-yellow-600">{avgRating.toFixed(1)}/5.0</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {labs.map((lab, index) => (
                  <div key={lab.id} className="flex justify-between items-center">
                    <span className="text-gray-600">{lab.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(100, (lab.totalBookings / 50) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{lab.totalBookings}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}