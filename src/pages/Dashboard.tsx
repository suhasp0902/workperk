import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { AuthService } from '@/lib/auth';
import { LoginForm } from '@/components/auth/LoginForm';
import { CandidateDashboard } from '@/components/dashboard/CandidateDashboard';
import { EmployerDashboard } from '@/components/dashboard/EmployerDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { LabOwnerDashboard } from '@/components/dashboard/LabOwnerDashboard';
import type { User } from '@/types';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated || !user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    switch (user.userType) {
      case 'CANDIDATE':
        return <CandidateDashboard />;
      case 'EMPLOYER':
        return <EmployerDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      case 'LAB_OWNER':
        return <LabOwnerDashboard />;
      default:
        return <div>Unknown user type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                WorkPerk
              </h1>
              <span className="ml-4 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {user.userType.replace('_', ' ').toLowerCase()}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.firstName} {user.lastName}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderDashboard()}
      </main>
    </div>
  );
}