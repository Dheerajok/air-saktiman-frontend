import { apiClient, setToken, removeToken } from './client';
import { PlayerStats, UserRole } from '@/types';

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    username: string;
    role: UserRole;
    avatar?: string;
    companyName?: string;
    level: number;
    currentXp: number;
    nextLevelXp: number;
    availablePoints: number;
    streakDays: number;
    treesPlanted: number;
    reportsSubmitted: number;
    missionsCompleted: number;
    assignedZone: string;
    badges: string[];
    contributionScore?: number;
    globalRank?: number;
    rank?: string;
  };
}

export const authApi = {
  async register(data: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    companyName?: string;
  }): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/register', data);
    if (res.accessToken) setToken(res.accessToken);
    if (res.user && typeof window !== 'undefined') {
      localStorage.setItem('airguard_user', JSON.stringify(res.user));
    }
    return res;
  },

  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/login', credentials);
    if (res.accessToken) setToken(res.accessToken);
    if (res.user && typeof window !== 'undefined') {
      localStorage.setItem('airguard_user', JSON.stringify(res.user));
    }
    return res;
  },

  async getMe(): Promise<any> {
    return apiClient.get('/auth/me');
  },

  async updateProfile(data: {
    name?: string;
    username?: string;
    assignedZone?: string;
    companyName?: string;
  }): Promise<any> {
    return apiClient.patch('/auth/profile', data);
  },

  async uploadAvatar(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/auth/avatar', formData, true);
  },

  logout() {
    removeToken();
  },
};
