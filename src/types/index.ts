export type UserType = 'CANDIDATE' | 'EMPLOYER' | 'ADMIN' | 'LAB_OWNER';

export type ExperienceLevel = 'JUNIOR' | 'MID' | 'SENIOR' | 'EXPERT';

export type ProjectStatus = 'DRAFT' | 'PUBLISHED' | 'FEATURED' | 'ARCHIVED';

export type ProjectCategory = 'WEB_DEVELOPMENT' | 'MOBILE_APP' | 'DATA_SCIENCE' | 'AI_ML' | 'DESIGN' | 'HARDWARE' | 'OTHER';

export type LabStatus = 'ACTIVE' | 'MAINTENANCE' | 'INACTIVE';

export type LabCategory = 'SOFTWARE' | 'HARDWARE' | 'DESIGN' | 'MANUFACTURING' | 'RESEARCH' | 'MIXED';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type AuctionStatus = 'DRAFT' | 'ACTIVE' | 'ENDED' | 'CANCELLED';

export type BidStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export type NotificationStatus = 'UNREAD' | 'READ' | 'ARCHIVED';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  profileImageUrl?: string;
  createdAt: string;
  isActive: boolean;
  isVerified: boolean;
}

export interface CandidateProfile extends User {
  title: string;
  bio: string;
  skills: string[];
  experienceLevel: ExperienceLevel;
  hourlyRate: number;
  location: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  reputationScore: number;
  totalEarnings: number;
  badges: Badge[];
}

export interface EmployerProfile extends User {
  companyName: string;
  companySize: string;
  industry: string;
  description: string;
  websiteUrl?: string;
  logoUrl?: string;
  verified: boolean;
  subscriptionPlan: string;
  totalSpent: number;
}

export interface LabOwnerProfile extends User {
  businessName: string;
  businessType: string;
  totalRevenue: number;
  totalBookings: number;
}

export interface Project {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar?: string;
  title: string;
  description: string;
  category: ProjectCategory;
  skillsUsed: string[];
  projectUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  images: string[];
  status: ProjectStatus;
  createdAt: string;
  viewsCount: number;
  likesCount: number;
  rating: number;
  reviews: ProjectReview[];
}

export interface ProjectReview {
  id: string;
  projectId: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Lab {
  id: string;
  ownerId: string;
  ownerName: string;
  name: string;
  description: string;
  category: LabCategory;
  location: string;
  capacity: number;
  hourlyRate: number;
  equipmentList: string[];
  images: string[];
  availableSlots: string[];
  status: LabStatus;
  rating: number;
  totalBookings: number;
  amenities: string[];
}

export interface Booking {
  id: string;
  labId: string;
  labName: string;
  userId: string;
  userName: string;
  startTime: string;
  endTime: string;
  totalHours: number;
  totalCost: number;
  status: BookingStatus;
  paymentId?: string;
  notes?: string;
  createdAt: string;
}

export interface Auction {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateAvatar?: string;
  title: string;
  description: string;
  skillsRequired: string[];
  minBidAmount: number;
  currentHighestBid?: number;
  startTime: string;
  endTime: string;
  status: AuctionStatus;
  bidsCount: number;
  winnerBidId?: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  employerId: string;
  employerName: string;
  companyName: string;
  bidAmount: number;
  message: string;
  proposedTerms: {
    duration: string;
    startDate: string;
    workType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
    benefits?: string[];
  };
  status: BidStatus;
  createdAt: string;
  expiresAt: string;
}

export interface Vote {
  id: string;
  voterId: string;
  targetId: string;
  targetType: 'PROJECT' | 'CANDIDATE' | 'EMPLOYER';
  voteType: 'UPVOTE' | 'DOWNVOTE' | 'ENDORSE';
  createdAt: string;
}

export interface Endorsement {
  id: string;
  endorserId: string;
  endorserName: string;
  endorsedId: string;
  skill: string;
  message: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'BID_RECEIVED' | 'BOOKING_CONFIRMED' | 'PROJECT_LIKED' | 'ENDORSEMENT_RECEIVED' | 'AUCTION_ENDED' | 'PAYMENT_RECEIVED';
  status: NotificationStatus;
  createdAt: string;
  actionUrl?: string;
}

export interface Payment {
  id: string;
  payerId: string;
  payeeId: string;
  amount: number;
  currency: string;
  paymentType: 'LAB_BOOKING' | 'AUCTION_FEE' | 'PLACEMENT_COMMISSION' | 'SUBSCRIPTION';
  status: PaymentStatus;
  createdAt: string;
  processedAt?: string;
  description: string;
}

export interface PlatformMetrics {
  totalUsers: number;
  activeUsers: number;
  totalProjects: number;
  totalLabs: number;
  totalBookings: number;
  totalAuctions: number;
  totalRevenue: number;
  monthlyGrowth: number;
}