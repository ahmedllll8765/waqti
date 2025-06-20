export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  avatar?: string;
  joinedAt: Date;
  expertiseLevel?: 'beginner' | 'professional' | 'expert';
  isVerified?: boolean;
  identityVerified?: boolean;
  bio?: string;
  location?: string;
  skills?: string[];
  rating?: number;
  totalReviews?: number;
  completedServices?: number;
  responseTime?: string;
  languages?: string[];
  reputationScore?: number;
  reliabilityIndex?: 'excellent' | 'average' | 'poor';
  lastActive?: Date;
  accountStatus?: 'active' | 'suspended' | 'pending';
  socialLinks?: {
    github?: string;
    behance?: string;
    dribbble?: string;
    linkedin?: string;
    portfolio?: string;
  };
  preferences?: {
    notifications?: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
    };
    privacy?: {
      profileVisibility?: 'public' | 'private' | 'contacts';
      showOnlineStatus?: boolean;
    };
    theme?: 'light' | 'dark' | 'auto';
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  provider: User;
  hourlyRate: number;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  gallery?: string[];
  tags?: string[];
  deliveryTime?: number;
  revisions?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  createdAt: Date;
  updatedAt: Date;
  pricing?: {
    basic?: ServicePackage;
    standard?: ServicePackage;
    premium?: ServicePackage;
  };
  requirements?: string[];
  faqs?: FAQ[];
  skillsRequired?: string[];
  exchangeType?: 'time' | 'money' | 'hybrid';
  moneyPrice?: number;
  suggestedExchange?: string;
}

export interface ServicePackage {
  name: string;
  description: string;
  price: number;
  timePrice?: number;
  deliveryTime: number;
  revisions: number;
  features: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  client: User;
  budget: {
    min: number;
    max: number;
    type: 'fixed' | 'hourly';
    currency: 'time' | 'money';
  };
  duration: number;
  skillsRequired: string[];
  attachments?: string[];
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  visibility: 'public' | 'private';
  location?: string;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
  proposals?: Proposal[];
  selectedProposal?: string;
  tags?: string[];
  requirements?: string[];
  milestones?: Milestone[];
}

export interface Proposal {
  id: string;
  projectId: string;
  freelancer: User;
  coverLetter: string;
  budget: number;
  timeEstimate: number;
  deliveryTime: number;
  milestones?: Milestone[];
  attachments?: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'approved';
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: Date;
  serviceId?: string;
  projectId?: string;
  receiverId?: string;
  senderId?: string;
  status: 'pending' | 'completed' | 'failed';
  currency: 'time' | 'money';
  fee?: number;
  reference?: string;
}

export interface Booking {
  id: string;
  service: Service;
  client: User;
  provider: User;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  date: Date;
  duration: number;
  totalHours: number;
  totalAmount?: number;
  currency: 'time' | 'money';
  notes?: string;
  requirements?: string;
  deliverables?: string[];
  createdAt: Date;
  updatedAt: Date;
  timeline?: BookingTimeline[];
  rating?: Rating;
}

export interface BookingTimeline {
  id: string;
  action: string;
  description: string;
  timestamp: Date;
  user: User;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'file' | 'image' | 'system';
  attachments?: MessageAttachment[];
  timestamp: Date;
  read: boolean;
  edited?: boolean;
  editedAt?: Date;
  replyTo?: string;
}

export interface MessageAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  type: 'direct' | 'project' | 'service';
  projectId?: string;
  serviceId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'message' | 'payment' | 'review' | 'system' | 'project' | 'proposal';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  expiresAt?: Date;
}

export interface Rating {
  id: string;
  bookingId?: string;
  projectId?: string;
  rater: User;
  ratee: User;
  rating: number;
  comment?: string;
  categories?: {
    quality?: number;
    communication?: number;
    timeliness?: number;
    professionalism?: number;
  };
  createdAt: Date;
  helpful?: number;
  reported?: boolean;
}

export interface Report {
  id: string;
  reporterId: string;
  reportedId?: string;
  type: 'user' | 'service' | 'project' | 'review' | 'message';
  reason: string;
  description: string;
  evidence?: string[];
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  createdAt: Date;
  resolvedAt?: Date;
  adminNotes?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parentId?: string;
  subcategories?: Category[];
  isActive: boolean;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  verified?: boolean;
  popularity?: number;
}

export interface Portfolio {
  id: string;
  userId: string;
  title: string;
  description: string;
  images: string[];
  technologies?: string[];
  projectUrl?: string;
  category: string;
  featured: boolean;
  createdAt: Date;
}

export interface Favorite {
  id: string;
  userId: string;
  type: 'service' | 'project' | 'user';
  itemId: string;
  createdAt: Date;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  subcategory?: string;
  location?: string;
  minRating?: number;
  maxPrice?: number;
  deliveryTime?: number;
  skills?: string[];
  sortBy?: 'relevance' | 'rating' | 'price' | 'newest';
  sortOrder?: 'asc' | 'desc';
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalServices: number;
  totalProjects: number;
  totalTransactions: number;
  revenue: number;
  growth: {
    users: number;
    services: number;
    projects: number;
    revenue: number;
  };
  topCategories: Array<{
    category: string;
    count: number;
  }>;
}

export interface TwoFactorAuth {
  enabled: boolean;
  secret?: string;
  backupCodes?: string[];
  lastUsed?: Date;
}

export interface SecurityLog {
  id: string;
  userId: string;
  action: string;
  ip: string;
  userAgent: string;
  location?: string;
  timestamp: Date;
  success: boolean;
}

export type Language = 'en' | 'ar';

export interface ExpertiseVerification {
  id: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  identityDocument?: string;
  selfieWithId?: string;
  resume?: string;
  portfolio?: string;
  certificates: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    behance?: string;
  };
  expertiseLevel: 'beginner' | 'professional' | 'expert';
  verificationDate?: Date;
  category: string;
  skills: string[];
  yearsOfExperience: number;
  adminNotes?: string;
  rejectionReason?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: User;
  category: string;
  tags: string[];
  featuredImage?: string;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
  comments?: BlogComment[];
}

export interface BlogComment {
  id: string;
  postId: string;
  author: User;
  content: string;
  parentId?: string;
  createdAt: Date;
  likes: number;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  features: string[];
  price: number;
  currency: string;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: 'card' | 'bank' | 'wallet';
  provider: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  createdAt: Date;
}

export interface Withdrawal {
  id: string;
  userId: string;
  amount: number;
  currency: 'money';
  paymentMethodId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  fee: number;
  requestedAt: Date;
  processedAt?: Date;
  reference?: string;
}

export interface TimeTransfer {
  id: string;
  senderId: string;
  receiverId: string;
  amount: number;
  message?: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  completedAt?: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirements: any;
  reward?: {
    type: 'badge' | 'time' | 'feature';
    value: any;
  };
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  unlockedAt: Date;
  progress?: number;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number;
  author: User;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  helpful: number;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: 'time' | 'money';
  provider: User;
  downloadUrl?: string;
  externalUrl?: string;
  rating: number;
  reviews: number;
  tags: string[];
  featured: boolean;
  createdAt: Date;
}