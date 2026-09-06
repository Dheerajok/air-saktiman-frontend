import { apiClient } from './client';
import { Mission } from '@/types';

export const missionsApi = {
  async getMissions(category?: string, difficulty?: string): Promise<Mission[]> {
    const raw = await apiClient.get<any[]>('/missions', { category, difficulty });
    return raw.map((item) => ({
      id: item._id || item.id || item.code,
      code: item.code || item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      difficulty: item.difficulty || 'MEDIUM',
      xpReward: item.xpReward || 200,
      impactScore: item.impactScore || 35,
      estimatedMinutes: item.estimatedMinutes || 30,
      locationZone: item.locationZone || 'City Wide',
      status: item.status || 'AVAILABLE',
      participantsCount: item.participantsCount || 0,
      deadlineHours: item.deadlineHours || 24,
      instructions: item.instructions || [],
      badgeUnlock: item.badgeUnlock,
    }));
  },

  async getMissionById(id: string): Promise<Mission> {
    const item = await apiClient.get<any>(`/missions/${id}`);
    return {
      id: item._id || item.id || item.code,
      code: item.code || item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      difficulty: item.difficulty || 'MEDIUM',
      xpReward: item.xpReward || 200,
      impactScore: item.impactScore || 35,
      estimatedMinutes: item.estimatedMinutes || 30,
      locationZone: item.locationZone || 'City Wide',
      status: item.status || 'AVAILABLE',
      participantsCount: item.participantsCount || 0,
      deadlineHours: item.deadlineHours || 24,
      instructions: item.instructions || [],
      badgeUnlock: item.badgeUnlock,
    };
  },

  async acceptMission(id: string): Promise<any> {
    return apiClient.post(`/missions/${id}/accept`);
  },

  async completeMission(id: string, photoFile?: File): Promise<any> {
    if (photoFile) {
      const formData = new FormData();
      formData.append('photo', photoFile);
      return apiClient.post(`/missions/${id}/complete`, formData, true);
    }
    return apiClient.post(`/missions/${id}/complete`);
  },
};
