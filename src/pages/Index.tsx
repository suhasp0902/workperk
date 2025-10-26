import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, Users, Briefcase, Zap, Star, 
  TrendingUp, Award, MapPin, Clock, DollarSign
} from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';

export default function Index() {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <LoginForm onLogin={() => window.location.href = '/dashboard'} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                WorkPerk
              </h1>
              <span className="ml-2 text-sm text-gray-600">Career Intelligence Platform</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="ghost">About</Button>
              <Button onClick={() => setShowLogin(true)}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Career Operating System
                </span>
                <br />
                <span className="text-gray-900">for the Future of Work</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Revolutionizing careers through physical labs, skills-first marketplace, 
                reverse talent auctions, and community-powered validation.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-4" onClick={() => setShowLogin(true)}>
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Watch Demo
              </Button>
            </div>

            <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                12,500+ Users
              </div>
              <div className="flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                3,400+ Projects
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                4.8/5 Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Six Pillars of Career Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive ecosystem designed to accelerate career growth and optimize talent matching
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Physical Career Labs */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Physical Career Labs</CardTitle>
                <CardDescription>
                  Access cutting-edge equipment and collaborative workspaces for hands-on skill development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    24/7 Access Available
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    From $35/hour
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills-First Marketplace */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Skills-First Marketplace</CardTitle>
                <CardDescription>
                  Showcase your abilities through project portfolios and get discovered by top employers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    89% Success Rate
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    1,200+ Employers
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reverse Talent Auctions */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Reverse Talent Auctions</CardTitle>
                <CardDescription>
                  Let employers compete for your talent with transparent bidding and competitive offers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    +23% Higher Salaries
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    14 Days Avg. Hire Time
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Validation */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Community Validation</CardTitle>
                <CardDescription>
                  Build reputation through peer endorsements and community-driven skill verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Peer Endorsements
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Skill Verification
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Intelligence */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader>
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Revenue Intelligence</CardTitle>
                <CardDescription>
                  Track earnings, optimize pricing, and make data-driven career decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Revenue Analytics
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Growth Insights
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Network Effects */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50 to-indigo-100">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Network Effects</CardTitle>
                <CardDescription>
                  Leverage gamification and social dynamics to accelerate career growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Achievement System
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Professional Network
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">12.5K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">3.4K+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">156</div>
              <div className="text-gray-600">Career Labs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">$1.2M+</div>
              <div className="text-gray-600">Total Earnings</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who are already accelerating their careers with WorkPerk
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4" onClick={() => setShowLogin(true)}>
              Start Free Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                WorkPerk
              </h3>
              <p className="text-gray-400">
                The career intelligence platform for the future of work.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Career Labs</li>
                <li>Talent Marketplace</li>
                <li>Auctions</li>
                <li>Community</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>API</li>
                <li>Support</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Careers</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WorkPerk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}