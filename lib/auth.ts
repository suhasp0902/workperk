import { User, UserType } from '@/types';

// Mock authentication system
export class AuthService {
  private static currentUser: User | null = null;

  static login(email: string, password: string): User | null {
    // Mock login - in real app, this would call an API
    const mockUsers = this.getMockUsers();
    const user = mockUsers.find(u => u.email === email);
    
    if (user) {
      this.currentUser = user;
      localStorage.setItem('workperk_user', JSON.stringify(user));
      return user;
    }
    return null;
  }

  static register(userData: Partial<User>): User {
    // Mock registration
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: userData.email!,
      firstName: userData.firstName!,
      lastName: userData.lastName!,
      userType: userData.userType!,
      profileImageUrl: userData.profileImageUrl,
      createdAt: new Date().toISOString(),
      isActive: true,
      isVerified: false
    };

    this.currentUser = newUser;
    localStorage.setItem('workperk_user', JSON.stringify(newUser));
    return newUser;
  }

  static logout(): void {
    this.currentUser = null;
    localStorage.removeItem('workperk_user');
  }

  static getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    const stored = localStorage.getItem('workperk_user');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }

    return null;
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  static hasRole(role: UserType): boolean {
    const user = this.getCurrentUser();
    return user?.userType === role;
  }

  private static getMockUsers(): User[] {
    return [
      {
        id: 'candidate_1',
        email: 'alex.chen@email.com',
        firstName: 'Alex',
        lastName: 'Chen',
        userType: 'CANDIDATE',
        profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        createdAt: '2024-01-15T10:00:00Z',
        isActive: true,
        isVerified: true
      },
      {
        id: 'employer_1',
        email: 'sarah.martinez@techcorp.com',
        firstName: 'Sarah',
        lastName: 'Martinez',
        userType: 'EMPLOYER',
        profileImageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        createdAt: '2024-01-10T09:00:00Z',
        isActive: true,
        isVerified: true
      },
      {
        id: 'admin_1',
        email: 'admin@workperk.com',
        firstName: 'Admin',
        lastName: 'User',
        userType: 'ADMIN',
        createdAt: '2024-01-01T00:00:00Z',
        isActive: true,
        isVerified: true
      },
      {
        id: 'lab_owner_1',
        email: 'david.kim@makerspace.com',
        firstName: 'David',
        lastName: 'Kim',
        userType: 'LAB_OWNER',
        profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        createdAt: '2024-01-05T12:00:00Z',
        isActive: true,
        isVerified: true
      }
    ];
  }
}