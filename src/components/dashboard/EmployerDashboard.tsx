import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, Users, Briefcase, DollarSign, TrendingUp, 
  Star, Eye, Heart, Calendar, Filter, MessageSquare
} from 'lucide-react';
import { AuthService } from '@/lib/auth';
import { 
  mockEmployerProfiles, mockProjects, mockAuctions, mockBids, 
  getBidsByAuction
} from '@/lib/data';
import type { EmployerProfile, Project, Auction, Bid } from '@/types';

export function EmployerDashboard() {
  const [profile, setProfile] = useState<EmployerProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(mockProjects);
  const [myBids, setMyBids] = useState<Bid[]>([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      const employerProfile = mockEmployerProfiles.find(p => p.id === user.id);
      if (employerProfile) {
        setProfile(employerProfile);
        // Get bids made by this employer
        const allBids = mockAuctions.flatMap(auction => getBidsByAuction(auction.id));
        setMyBids(allBids.filter(bid => bid.employerId === user.id));
      }
    }
  }, []);

  useEffect(() => {
    let filtered = mockProjects;
    
    if (searchQuery) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.skillsUsed.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(project => 
        selectedSkills.every(skill => project.skillsUsed.includes(skill))
      );
    }
    
    setFilteredProjects(filtered);
  }, [searchQuery, selectedSkills]);

  if (!profile) return <div>Loading...</div>;

  const activeAuctions = mockAuctions.filter(a => a.status === 'ACTIVE');
  const myActiveBids = myBids.filter(b => b.status === 'PENDING');
  const allSkills = Array.from(new Set(mockProjects.flatMap(p => p.skillsUsed)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {profile.firstName}!</h1>
          <p className="text-gray-600">Discover and hire top talent for {profile.companyName}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
          </Button>
          <Button>
            <Users className="w-4 h-4 mr-2" />
            Post Job
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">${profile.totalSpent.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Bids</p>
                <p className="text-2xl font-bold text-gray-900">{myActiveBids.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-2">{myBids.length} total bids placed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Successful Hires</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-purple-600 mt-2">85% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Time to Hire</p>
                <p className="text-2xl font-bold text-gray-900">14 days</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-orange-600 mt-2">-3 days improvement</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="discover" className="space-y-6">
        <TabsList>
          <TabsTrigger value="discover">Discover Talent</TabsTrigger>
          <TabsTrigger value="auctions">Active Auctions ({activeAuctions.length})</TabsTrigger>
          <TabsTrigger value="bids">My Bids ({myBids.length})</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Search Talent
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by skills, project titles, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-600">Popular Skills:</span>
                {allSkills.slice(0, 8).map((skill) => (
                  <Button
                    key={skill}
                    variant={selectedSkills.includes(skill) ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setSelectedSkills(prev => 
                        prev.includes(skill) 
                          ? prev.filter(s => s !== skill)
                          : [...prev, skill]
                      );
                    }}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Portfolio Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={project.candidateAvatar} />
                        <AvatarFallback>{project.candidateName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{project.candidateName}</p>
                        <p className="text-xs text-gray-600">{project.category.replace('_', ' ')}</p>
                      </div>
                    </div>
                    <Badge variant={project.status === 'FEATURED' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.skillsUsed.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {project.skillsUsed.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.skillsUsed.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {project.viewsCount}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {project.likesCount}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        {project.rating}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">Contact</Button>
                    <Button size="sm" variant="outline">View Project</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="auctions" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Talent Auctions</h2>
            <p className="text-gray-600">{activeAuctions.length} auctions available</p>
          </div>
          
          <div className="space-y-4">
            {activeAuctions.map((auction) => (
              <Card key={auction.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={auction.candidateAvatar} />
                        <AvatarFallback>{auction.candidateName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{auction.title}</h3>
                        <p className="text-gray-600">by {auction.candidateName}</p>
                      </div>
                    </div>
                    <Badge variant="default">ACTIVE</Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{auction.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Min Bid</p>
                      <p className="font-semibold">${auction.minBidAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current Highest</p>
                      <p className="font-semibold text-green-600">
                        ${auction.currentHighestBid?.toLocaleString() || 'No bids'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Bids</p>
                      <p className="font-semibold">{auction.bidsCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Time Left</p>
                      <p className="font-semibold text-red-600">
                        {Math.ceil((new Date(auction.endTime).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
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
                    <div className="flex space-x-2">
                      <Button variant="outline">View Profile</Button>
                      <Button>Place Bid</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bids" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">My Bids</h2>
            <p className="text-gray-600">{myBids.length} bids placed</p>
          </div>
          
          <div className="space-y-4">
            {myBids.map((bid) => {
              const auction = mockAuctions.find(a => a.id === bid.auctionId);
              return (
                <Card key={bid.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{auction?.title}</h3>
                        <p className="text-gray-600">Candidate: {auction?.candidateName}</p>
                      </div>
                      <Badge variant={
                        bid.status === 'PENDING' ? 'default' : 
                        bid.status === 'ACCEPTED' ? 'secondary' : 'destructive'
                      }>
                        {bid.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">My Bid</p>
                        <p className="font-semibold">${bid.bidAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Current Highest</p>
                        <p className="font-semibold text-green-600">
                          ${auction?.currentHighestBid?.toLocaleString() || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Work Type</p>
                        <p className="font-semibold">{bid.proposedTerms.workType.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-semibold">{bid.proposedTerms.duration}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Message:</p>
                      <p className="text-sm bg-gray-50 p-3 rounded-lg">{bid.message}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(bid.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex space-x-2">
                        {bid.status === 'PENDING' && (
                          <>
                            <Button variant="outline" size="sm">Edit Bid</Button>
                            <Button variant="destructive" size="sm">Withdraw</Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hiring Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-semibold text-green-600">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Time to Hire</span>
                  <span className="font-semibold">14 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cost per Hire</span>
                  <span className="font-semibold">$2,850</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Retention Rate</span>
                  <span className="font-semibold text-blue-600">92%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Skills in Demand</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['React', 'Node.js', 'Python', 'Machine Learning', 'TypeScript'].map((skill, index) => (
                  <div key={skill} className="flex justify-between items-center">
                    <span className="text-gray-600">{skill}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${90 - index * 15}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{90 - index * 15}%</span>
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