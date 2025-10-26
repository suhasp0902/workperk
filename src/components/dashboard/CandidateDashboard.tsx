import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Trophy, Star, Calendar, DollarSign, Users, Briefcase, 
  TrendingUp, Award, MessageSquare, Heart, Eye, Clock
} from 'lucide-react';
import { AuthService } from '@/lib/auth';
import { 
  mockCandidateProfiles, getProjectsByCandidate, getAuctionsByCandidate, 
  getBookingsByUser, getNotificationsByUser, getEndorsementsByUser
} from '@/lib/data';
import type { CandidateProfile, Project, Auction, Booking, Notification, Endorsement } from '@/types';

export function CandidateDashboard() {
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      const candidateProfile = mockCandidateProfiles.find(p => p.id === user.id);
      if (candidateProfile) {
        setProfile(candidateProfile);
        setProjects(getProjectsByCandidate(user.id));
        setAuctions(getAuctionsByCandidate(user.id));
        setBookings(getBookingsByUser(user.id));
        setNotifications(getNotificationsByUser(user.id));
        setEndorsements(getEndorsementsByUser(user.id));
      }
    }
  }, []);

  if (!profile) return <div>Loading...</div>;

  const activeAuctions = auctions.filter(a => a.status === 'ACTIVE');
  const totalProjectViews = projects.reduce((sum, p) => sum + p.viewsCount, 0);
  const totalProjectLikes = projects.reduce((sum, p) => sum + p.likesCount, 0);
  const unreadNotifications = notifications.filter(n => n.status === 'UNREAD').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile.firstName}!</h1>
          <p className="text-gray-600">Here's what's happening with your career journey</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
          </Button>
          <Button>
            <Briefcase className="w-4 h-4 mr-2" />
            Create Auction
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reputation Score</p>
                <p className="text-2xl font-bold text-gray-900">{profile.reputationScore}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={profile.reputationScore * 20} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">${profile.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Auctions</p>
                <p className="text-2xl font-bold text-gray-900">{activeAuctions.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-2">{auctions.reduce((sum, a) => sum + a.bidsCount, 0)} total bids</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Project Views</p>
                <p className="text-2xl font-bold text-gray-900">{totalProjectViews.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-purple-600 mt-2">{totalProjectLikes} likes received</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
          <TabsTrigger value="auctions">Auctions ({auctions.length})</TabsTrigger>
          <TabsTrigger value="bookings">Lab Bookings</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.slice(0, 5).map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {notification.status === 'UNREAD' && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills & Endorsements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Skills & Endorsements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => {
                    const endorsementCount = endorsements.filter(e => e.skill === skill).length;
                    return (
                      <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
                        <span>{skill}</span>
                        {endorsementCount > 0 && (
                          <span className="bg-blue-500 text-white rounded-full px-1 text-xs">
                            {endorsementCount}
                          </span>
                        )}
                      </Badge>
                    );
                  })}
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Recent Endorsements</h4>
                  {endorsements.slice(0, 3).map((endorsement) => (
                    <div key={endorsement.id} className="flex items-start space-x-3 p-2 rounded-lg bg-blue-50">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{endorsement.endorserName}</p>
                        <p className="text-sm text-gray-600">endorsed you for {endorsement.skill}</p>
                        <p className="text-xs text-gray-500 italic">"{endorsement.message}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Achievements & Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profile.badges.map((badge) => (
                  <div key={badge.id} className="flex items-center space-x-3 p-4 rounded-lg border">
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <p className="font-medium">{badge.name}</p>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                      <p className="text-xs text-gray-500">
                        Earned {new Date(badge.earnedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Projects</h2>
            <Button>Add New Project</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription>{project.category.replace('_', ' ')}</CardDescription>
                    </div>
                    <Badge variant={project.status === 'FEATURED' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.skillsUsed.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {project.skillsUsed.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.skillsUsed.length - 4} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {project.viewsCount}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {project.likesCount}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {project.rating}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="auctions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Talent Auctions</h2>
            <Button>Create New Auction</Button>
          </div>
          
          <div className="space-y-4">
            {auctions.map((auction) => (
              <Card key={auction.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{auction.title}</h3>
                      <p className="text-gray-600">{auction.description}</p>
                    </div>
                    <Badge variant={auction.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {auction.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Min Bid</p>
                      <p className="font-semibold">${auction.minBidAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Highest Bid</p>
                      <p className="font-semibold text-green-600">
                        ${auction.currentHighestBid?.toLocaleString() || 'No bids'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Bids</p>
                      <p className="font-semibold">{auction.bidsCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ends</p>
                      <p className="font-semibold">
                        {new Date(auction.endTime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {auction.skillsRequired.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline">Manage Bids</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Lab Bookings</h2>
            <Button>Book New Lab</Button>
          </div>
          
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{booking.labName}</h3>
                      <p className="text-gray-600">{booking.notes}</p>
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
                      <p className="text-sm text-gray-600">Total Cost</p>
                      <p className="font-semibold">${booking.totalCost}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Endorsements Received</span>
                  <span className="font-semibold">{endorsements.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Projects Liked</span>
                  <span className="font-semibold">{totalProjectLikes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Community Rank</span>
                  <span className="font-semibold text-blue-600">Top 5%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Endorsements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {endorsements.slice(0, 3).map((endorsement) => (
                  <div key={endorsement.id} className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{endorsement.endorserName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{endorsement.endorserName}</p>
                      <p className="text-sm text-gray-600">endorsed you for {endorsement.skill}</p>
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