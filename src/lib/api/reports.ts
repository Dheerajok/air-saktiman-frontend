import { apiClient } from './client';
import { EnvironmentalReport, EventItem } from '@/types';

export const reportsApi = {
  async getReports(status?: string): Promise<EnvironmentalReport[]> {
    const raw = await apiClient.get<any[]>('/reports', { status });
    return raw.map((item) => ({
      id: item._id || item.id,
      title: item.title,
      reporter: item.reporter,
      category: item.category,
      severity: item.severity || 'HIGH',
      location: item.location,
      zone: item.zone || 'Zone 04',
      timestamp: item.timestamp || item.createdAt || 'Just now',
      status: item.status || 'Pending',
      description: item.description,
      imageUrl: item.imageUrl,
    }));
  },

  async updateReportStatus(id: string, status: 'Pending' | 'Under Review' | 'Verified' | 'Rejected'): Promise<any> {
    return apiClient.patch(`/reports/${id}/status`, { status });
  },

  async createReport(data: any): Promise<any> {
    return apiClient.post('/reports', data);
  },
};

export const eventsApi = {
  async getEvents(): Promise<EventItem[]> {
    const raw = await apiClient.get<any[]>('/events');
    return raw.map((item) => ({
      id: item._id || item.id,
      title: item.title,
      tagline: item.tagline,
      description: item.description,
      date: item.date,
      time: item.time,
      location: item.location,
      city: item.city,
      zone: item.zone,
      participantsCount: item.participantsCount || 0,
      maxParticipants: item.maxParticipants || 500,
      impactLevel: item.impactLevel || 'High',
      xpReward: item.xpReward || 300,
      organizer: item.organizer,
      category: item.category,
    }));
  },

  async toggleJoinEvent(eventId: string): Promise<any> {
    return apiClient.post(`/events/${eventId}/join`);
  },
};
