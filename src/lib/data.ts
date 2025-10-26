import { 
  Project, Lab, Auction, Bid, CandidateProfile, EmployerProfile, 
  LabOwnerProfile, Booking, Notification, Badge, Endorsement,
  PlatformMetrics, Payment
} from '@/types';

// Mock data for the platform
export const mockCandidateProfiles: CandidateProfile[] = [
  {
    id: 'candidate_1',
    email: 'alex.chen@email.com',
    firstName: 'Alex',
    lastName: 'Chen',
    userType: 'CANDIDATE',
    profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-15T10:00:00Z',
    isActive: true,
    isVerified: true,
    title: 'Full-Stack Developer & Data Scientist',
    bio: 'Passionate developer with 3+ years of experience building scalable web applications and ML models. Love solving complex problems with clean, efficient code.',
    skills: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Machine Learning', 'TypeScript', 'AWS'],
    experienceLevel: 'MID',
    hourlyRate: 85,
    location: 'San Francisco, CA',
    portfolioUrl: 'https://alexchen.dev',
    githubUrl: 'https://github.com/alexchen',
    linkedinUrl: 'https://linkedin.com/in/alexchen',
    reputationScore: 4.8,
    totalEarnings: 125000,
    badges: [
      {
        id: 'badge_1',
        name: 'Top Contributor',
        description: 'Received 100+ project likes',
        icon: '🏆',
        color: 'gold',
        earnedAt: '2024-02-01T00:00:00Z'
      },
      {
        id: 'badge_2',
        name: 'Community Champion',
        description: 'Endorsed 50+ peers',
        icon: '🤝',
        color: 'blue',
        earnedAt: '2024-03-15T00:00:00Z'
      }
    ]
  }
];

export const mockEmployerProfiles: EmployerProfile[] = [
  {
    id: 'employer_1',
    email: 'sarah.martinez@techcorp.com',
    firstName: 'Sarah',
    lastName: 'Martinez',
    userType: 'EMPLOYER',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-10T09:00:00Z',
    isActive: true,
    isVerified: true,
    companyName: 'TechCorp Solutions',
    companySize: '50-200 employees',
    industry: 'Software Development',
    description: 'Leading fintech company building the future of digital payments and financial services.',
    websiteUrl: 'https://techcorp.com',
    logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    verified: true,
    subscriptionPlan: 'Professional',
    totalSpent: 85000
  }
];

export const mockLabOwnerProfiles: LabOwnerProfile[] = [
  {
    id: 'lab_owner_1',
    email: 'david.kim@makerspace.com',
    firstName: 'David',
    lastName: 'Kim',
    userType: 'LAB_OWNER',
    profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-05T12:00:00Z',
    isActive: true,
    isVerified: true,
    businessName: 'SF MakerSpace',
    businessType: 'Shared Workshop',
    totalRevenue: 45000,
    totalBookings: 320
  }
];

export const mockProjects: Project[] = [
  {
    id: 'project_1',
    candidateId: 'candidate_1',
    candidateName: 'Alex Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    title: 'E-commerce Analytics Dashboard',
    description: 'Built a comprehensive analytics dashboard for e-commerce platforms using React, D3.js, and Python. Features real-time sales tracking, customer behavior analysis, and predictive analytics for inventory management.',
    category: 'WEB_DEVELOPMENT',
    skillsUsed: ['React', 'D3.js', 'Python', 'PostgreSQL', 'Redis', 'Docker'],
    projectUrl: 'https://ecommerce-analytics.demo.com',
    githubUrl: 'https://github.com/alexchen/ecommerce-analytics',
    demoUrl: 'https://ecommerce-analytics.demo.com',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop'
    ],
    status: 'PUBLISHED',
    createdAt: '2024-02-15T14:30:00Z',
    viewsCount: 1247,
    likesCount: 89,
    rating: 4.7,
    reviews: [
      {
        id: 'review_1',
        projectId: 'project_1',
        reviewerId: 'employer_1',
        reviewerName: 'Sarah Martinez',
        rating: 5,
        comment: 'Excellent work! The dashboard is intuitive and the analytics are spot-on. Great attention to detail.',
        createdAt: '2024-02-20T10:15:00Z'
      }
    ]
  },
  {
    id: 'project_2',
    candidateId: 'candidate_1',
    candidateName: 'Alex Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    title: 'ML-Powered Recommendation Engine',
    description: 'Developed a machine learning recommendation system using collaborative filtering and content-based algorithms. Achieved 35% improvement in user engagement for a streaming platform.',
    category: 'AI_ML',
    skillsUsed: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn', 'Apache Spark', 'Kubernetes'],
    githubUrl: 'https://github.com/alexchen/ml-recommendations',
    images: [
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop'
    ],
    status: 'FEATURED',
    createdAt: '2024-03-01T09:00:00Z',
    viewsCount: 2156,
    likesCount: 156,
    rating: 4.9,
    reviews: []
  }
];

export const mockLabs: Lab[] = [
  {
    id: 'lab_1',
    ownerId: 'lab_owner_1',
    ownerName: 'David Kim',
    name: 'SF MakerSpace - Hardware Lab',
    description: 'Fully equipped hardware prototyping lab with 3D printers, laser cutters, electronics workbenches, and testing equipment. Perfect for IoT development and hardware startups.',
    category: 'HARDWARE',
    location: 'San Francisco, CA',
    capacity: 12,
    hourlyRate: 45,
    equipmentList: [
      '3D Printers (Ultimaker S3, Prusa i3)',
      'Laser Cutter (Epilog Zing)',
      'Oscilloscopes & Multimeters',
      'Soldering Stations',
      'PCB Prototyping Tools',
      'Arduino & Raspberry Pi Kits'
    ],
    images: [
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581092335878-8b7b4c5b6b8a?w=800&h=400&fit=crop'
    ],
    availableSlots: [
      '2024-10-26T09:00:00Z',
      '2024-10-26T14:00:00Z',
      '2024-10-27T10:00:00Z',
      '2024-10-28T13:00:00Z'
    ],
    status: 'ACTIVE',
    rating: 4.8,
    totalBookings: 156,
    amenities: ['WiFi', 'Coffee', 'Parking', 'Security', '24/7 Access']
  },
  {
    id: 'lab_2',
    ownerId: 'lab_owner_1',
    ownerName: 'David Kim',
    name: 'Creative Design Studio',
    description: 'Professional design studio with high-end workstations, graphics tablets, photography equipment, and video editing suites. Ideal for UX/UI designers and content creators.',
    category: 'DESIGN',
    location: 'San Francisco, CA',
    capacity: 8,
    hourlyRate: 35,
    equipmentList: [
      'iMac Pro Workstations',
      'Wacom Cintiq Pro Tablets',
      'DSLR Cameras & Lighting',
      'Video Editing Suites',
      'Color Calibrated Monitors',
      'Adobe Creative Suite'
    ],
    images: [
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop'
    ],
    availableSlots: [
      '2024-10-26T10:00:00Z',
      '2024-10-26T15:00:00Z',
      '2024-10-27T09:00:00Z'
    ],
    status: 'ACTIVE',
    rating: 4.6,
    totalBookings: 89,
    amenities: ['WiFi', 'Coffee', 'Parking', 'Printing']
  }
];

export const mockAuctions: Auction[] = [
  {
    id: 'auction_1',
    candidateId: 'candidate_1',
    candidateName: 'Alex Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    title: 'Senior Full-Stack Developer - Fintech Project',
    description: 'Looking for opportunities to work on cutting-edge fintech applications. Experienced in React, Node.js, and blockchain technologies. Available for full-time or contract work.',
    skillsRequired: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    minBidAmount: 120000,
    currentHighestBid: 135000,
    startTime: '2024-10-25T09:00:00Z',
    endTime: '2024-10-30T17:00:00Z',
    status: 'ACTIVE',
    bidsCount: 7,
  },
  {
    id: 'auction_2',
    candidateId: 'candidate_1',
    candidateName: 'Alex Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    title: 'ML Engineer - AI Startup Opportunity',
    description: 'Seeking exciting opportunities in AI/ML space. Specialized in recommendation systems, NLP, and computer vision. Open to equity-based compensation.',
    skillsRequired: ['Python', 'TensorFlow', 'PyTorch', 'MLOps', 'Docker'],
    minBidAmount: 140000,
    currentHighestBid: 155000,
    startTime: '2024-10-20T10:00:00Z',
    endTime: '2024-10-28T18:00:00Z',
    status: 'ACTIVE',
    bidsCount: 12,
  }
];

export const mockBids: Bid[] = [
  {
    id: 'bid_1',
    auctionId: 'auction_1',
    employerId: 'employer_1',
    employerName: 'Sarah Martinez',
    companyName: 'TechCorp Solutions',
    bidAmount: 135000,
    message: 'We\'re impressed by your portfolio and would love to have you join our fintech team. We offer competitive salary, equity, and amazing benefits.',
    proposedTerms: {
      duration: '2 years',
      startDate: '2024-11-15',
      workType: 'FULL_TIME',
      benefits: ['Health Insurance', 'Dental & Vision', '401k Matching', 'Stock Options', 'Remote Work']
    },
    status: 'PENDING',
    createdAt: '2024-10-25T14:30:00Z',
    expiresAt: '2024-10-30T17:00:00Z'
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'booking_1',
    labId: 'lab_1',
    labName: 'SF MakerSpace - Hardware Lab',
    userId: 'candidate_1',
    userName: 'Alex Chen',
    startTime: '2024-10-26T09:00:00Z',
    endTime: '2024-10-26T13:00:00Z',
    totalHours: 4,
    totalCost: 180,
    status: 'CONFIRMED',
    paymentId: 'payment_1',
    notes: 'Working on IoT prototype for smart home project',
    createdAt: '2024-10-24T15:20:00Z'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif_1',
    userId: 'candidate_1',
    title: 'New Bid Received!',
    message: 'TechCorp Solutions placed a bid of $135,000 on your auction "Senior Full-Stack Developer"',
    type: 'BID_RECEIVED',
    status: 'UNREAD',
    createdAt: '2024-10-25T14:30:00Z',
    actionUrl: '/auctions/auction_1'
  },
  {
    id: 'notif_2',
    userId: 'candidate_1',
    title: 'Lab Booking Confirmed',
    message: 'Your booking for SF MakerSpace - Hardware Lab on Oct 26, 9:00 AM has been confirmed',
    type: 'BOOKING_CONFIRMED',
    status: 'READ',
    createdAt: '2024-10-24T15:25:00Z',
    actionUrl: '/labs/bookings'
  },
  {
    id: 'notif_3',
    userId: 'candidate_1',
    title: 'Project Liked',
    message: 'Sarah Martinez liked your project "E-commerce Analytics Dashboard"',
    type: 'PROJECT_LIKED',
    status: 'READ',
    createdAt: '2024-10-24T11:15:00Z',
    actionUrl: '/projects/project_1'
  }
];

export const mockEndorsements: Endorsement[] = [
  {
    id: 'endorse_1',
    endorserId: 'employer_1',
    endorserName: 'Sarah Martinez',
    endorsedId: 'candidate_1',
    skill: 'React',
    message: 'Alex has exceptional React skills and delivered outstanding results on our project.',
    createdAt: '2024-02-20T16:00:00Z'
  },
  {
    id: 'endorse_2',
    endorserId: 'employer_1',
    endorserName: 'Sarah Martinez',
    endorsedId: 'candidate_1',
    skill: 'Machine Learning',
    message: 'Impressive ML expertise. Built a recommendation system that exceeded our expectations.',
    createdAt: '2024-03-05T10:30:00Z'
  }
];

export const mockPayments: Payment[] = [
  {
    id: 'payment_1',
    payerId: 'candidate_1',
    payeeId: 'lab_owner_1',
    amount: 180,
    currency: 'USD',
    paymentType: 'LAB_BOOKING',
    status: 'COMPLETED',
    createdAt: '2024-10-24T15:20:00Z',
    processedAt: '2024-10-24T15:21:00Z',
    description: 'Lab booking payment for SF MakerSpace - Hardware Lab'
  }
];

export const mockPlatformMetrics: PlatformMetrics = {
  totalUsers: 12547,
  activeUsers: 8934,
  totalProjects: 3421,
  totalLabs: 156,
  totalBookings: 2847,
  totalAuctions: 892,
  totalRevenue: 1247500,
  monthlyGrowth: 23.5
};

// Helper functions to simulate API calls
export const getProjectsByCandidate = (candidateId: string): Project[] => {
  return mockProjects.filter(p => p.candidateId === candidateId);
};

export const getLabsByOwner = (ownerId: string): Lab[] => {
  return mockLabs.filter(l => l.ownerId === ownerId);
};

export const getAuctionsByCandidate = (candidateId: string): Auction[] => {
  return mockAuctions.filter(a => a.candidateId === candidateId);
};

export const getBidsByAuction = (auctionId: string): Bid[] => {
  return mockBids.filter(b => b.auctionId === auctionId);
};

export const getBookingsByUser = (userId: string): Booking[] => {
  return mockBookings.filter(b => b.userId === userId);
};

export const getNotificationsByUser = (userId: string): Notification[] => {
  return mockNotifications.filter(n => n.userId === userId);
};

export const getEndorsementsByUser = (userId: string): Endorsement[] => {
  return mockEndorsements.filter(e => e.endorsedId === userId);
};