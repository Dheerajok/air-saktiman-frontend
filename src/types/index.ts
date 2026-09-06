export type UserRole = 'PLAYER' | 'COMPANY_ADMIN' | 'ADMIN';

export type AQILevel = 'GOOD' | 'MODERATE' | 'POOR' | 'UNHEALTHY' | 'HAZARDOUS';

export interface AirQualityData {
  aqi: number;
  level: AQILevel | string;
  zone: string;
  city: string;
  updatedAt?: string;
  isLive?: boolean;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
}

export type AirQualityMetric = AirQualityData;

export interface PlayerStats {
  id?: string;
  name: string;
  username?: string;
  handle?: string;
  avatar: string;
  role?: UserRole;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  rank: string;
  globalRank: number;
  streakDays: number;
  contributionScore: number;
  co2OffsetKg: number;
  treesPlanted: number;
  reportsSubmitted: number;
  missionsCompleted: number;
  availablePoints: number;
  badgesCount?: number;
  assignedZone?: string;
  badges?: any[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category?: 'AIR' | 'COMMUNITY' | 'STREAK' | 'IMPACT';
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
  accentColor?: 'blue' | 'green' | 'yellow' | 'red';
}

export type MissionDifficulty = 'EASY' | 'MEDIUM' | 'HARD' | string;
export type MissionCategory = 
  | 'Air Cleaning' 
  | 'Tree Plantation' 
  | 'Waste Management' 
  | 'Public Awareness' 
  | 'Water Conservation' 
  | 'Climate Resilience' 
  | 'Community Reporting'
  | string;

export type MissionStatus = 'AVAILABLE' | 'ACTIVE' | 'COMPLETED' | 'VERIFIED' | string;

export interface Mission {
  id: string;
  code?: string;
  title: string;
  description: string;
  category: MissionCategory;
  difficulty: MissionDifficulty;
  xpReward: number;
  impactScore: number;
  estimatedMinutes: number;
  locationZone: string;
  status: MissionStatus;
  participantsCount: number;
  deadlineHours?: number;
  instructions: string[];
  badgeUnlock?: string;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    level: number;
    rank: string;
    location: string;
  };
  authorName?: string;
  authorAvatar?: string;
  authorBadge?: string;
  location?: string;
  content: string;
  image?: string;
  imageUrl?: string;
  missionTag?: string;
  xpEarned: number;
  impactScore: number;
  likes: number;
  likesCount?: number;
  isLiked?: boolean;
  commentsCount: number;
  comments?: any[];
  createdAt: string;
  timestamp?: string;
  status?: 'Approved' | 'Pending Review' | 'Flagged' | 'Rejected' | string;
}

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  date: string;
  time: string;
  location: string;
  city: string;
  zone: string;
  participantsCount: number;
  maxParticipants: number;
  impactLevel: 'High' | 'Very High' | 'Moderate' | string;
  xpReward: number;
  organizer: string;
  isJoined?: boolean;
  category: string;
}

export interface Contribution {
  id: string;
  title: string;
  type: string;
  category: string;
  date: string;
  xp: number;
  impactScore: number;
  co2Saved: number;
  status: 'Verified' | 'Pending Review';
  location: string;
}

export interface RewardItem {
  id: string;
  title: string;
  provider: string;
  category: 'Coupon' | 'Eco Store' | 'Green Action' | 'Transport' | string;
  pointsCost: number;
  discountValue: string;
  description: string;
  expiryDays: number;
  image: string;
  accent: 'blue' | 'green' | 'yellow' | 'red';
}

export interface CompanyInfo {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  csrRank: number;
  totalCsrFunding: string;
  employeesCount: number;
  impactScore: number;
  organizationsSupported: number;
  activeProjects: number;
}

export interface CSRProject {
  id: string;
  title: string;
  organization: string;
  orgLogo?: string;
  category: string;
  requiredFunds: number;
  fundedAmount: number;
  targetImpact: string;
  location: string;
  treesTarget: number;
  householdsTarget: number;
  status: 'ACTIVE' | 'FULLY_FUNDED' | string;
}

export type CsrProject = CSRProject;

export interface EnvironmentalReport {
  id: string;
  title: string;
  reporter: string;
  reporterAvatar?: string;
  category: 'Air Pollution' | 'Garbage Burning' | 'Industrial Pollution' | 'Traffic Congestion' | 'Construction Dust' | string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' | string;
  location: string;
  zone: string;
  timestamp: string;
  status: 'Pending' | 'Under Review' | 'Verified' | 'Rejected' | string;
  description: string;
  imageUrl?: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  zone?: string;
  category?: string;
  impact?: string;
  confidence?: number;
  timeframe?: string;
  estimatedCost?: string;
  issue?: string;
  triggerEvent?: string;
  recommendedAction?: string;
  expectedImpact?: string;
  confidenceScore?: number;
  supportingData?: string[];
  status?: 'PENDING_APPROVAL' | 'ACCEPTED' | 'REJECTED' | 'ACTIVE' | string;
  generatedAt?: string;
  description?: string;
}

export type AiRecommendation = AIRecommendation;

export interface ZoneSummary {
  code: string;
  name: string;
  aqi: number;
  status: 'Good' | 'Moderate' | 'Unhealthy' | 'Severe' | 'Hazardous' | string;
  pm25: number;
  pm10: number;
  activeAlerts: string[];
  treeCanopyPercent: number;
  activeSensors: number;
  coordinates: number[];
}

export interface ZoneDetail {
  id: string;
  name: string;
  city: string;
  aqi: number;
  temperature: number;
  humidity: number;
  wind: string;
  pollutionLevel: string;
  activeReports: number;
  activeMissions: number;
  population: string;
  status: 'Critical' | 'Warning' | 'Optimal';
}

export interface Complaint {
  id: string;
  ticketNumber: string;
  title: string;
  category: 'Garbage Burning' | 'Construction Dust' | 'Industrial Smoke' | 'Traffic Idling' | 'Roadside Waste' | 'Tree Cutting' | string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' | string;
  location: string;
  zone: string;
  description: string;
  status: 'Submitted' | 'Under Investigation' | 'Action Dispatched' | 'Resolved' | string;
  timestamp?: string;
  createdAt?: string;
  updatedAt?: string;
  imageUrl?: string;
  xpAwarded?: number;
  assignedOfficer?: string;
  resolutionNotes?: string;
  upvotes?: number;
  userName?: string;
  userId?: string;
}

export type ComplaintTicket = Complaint;
