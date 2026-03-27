export type UserRole = 'USER' | 'ADMIN';

export interface ApiErrorSource {
  path?: string;
  message: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPage?: number;
  };
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errorSources?: ApiErrorSource[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone: string;
  bio?: string;
  isActive?: boolean;
  createdAt?: string;
  _count?: {
    investments?: number;
  };
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type PropertyStatus = 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'DRAFT';

export interface Property {
  id: string;
  title: string;
  location: string;
  description: string;
  problemStatement?: string;
  proposedSolution?: string;
  images?: string[];
  imageUrl?: string;
  pricePerShare: number;
  totalShares: number;
  availableShares?: number;
  expectedReturn?: number;
  categoryId: string;
  category?: Category;
  isPaid?: boolean;
  isFeatured?: boolean;
  status?: PropertyStatus;
  votes?: {
    upvotes: number;
    downvotes: number;
    total: number;
  };
  author?: User;
  viewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface VoteSummary {
  upvotes: number;
  downvotes: number;
  total: number;
}

export interface Comment {
  id: string;
  content: string;
  parentId?: string | null;
  createdAt: string;
  updatedAt?: string;
  user: User;
  replies?: Comment[];
}

export interface Investment {
  id: string;
  propertyId: string;
  userId: string;
  shares: number;
  amount: number;
  status: string;
  stripePaymentId?: string;
  createdAt: string;
  property?: Property;
}

export interface InvestmentSessionDetails {
  sessionId: string;
  status: string;
  amount: number;
  shares: number;
  paymentStatus?: string;
  property?: {
    id: string;
    title: string;
    location?: string;
    image?: string;
  };
}
