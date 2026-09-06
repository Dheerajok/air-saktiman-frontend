import { apiClient } from './client';
import { ComplaintTicket } from '@/types';

export const complaintsApi = {
  async getMyComplaints(): Promise<ComplaintTicket[]> {
    const raw = await apiClient.get<any[]>('/complaints/my');
    return raw.map((item) => ({
      id: item._id || item.id,
      ticketNumber: item.ticketNumber || item.ticketId || 'AIR-2026-0000',
      title: item.title,
      category: item.category,
      severity: item.severity || 'HIGH',
      location: item.location,
      zone: item.zone,
      status: item.status || 'Submitted',
      description: item.description,
      imageUrl: item.imageUrl,
      assignedOfficer: item.assignedOfficer || 'Municipal Environmental Desk',
      resolutionNotes: item.resolutionNotes || item.municipalFeedback,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
      upvotes: item.upvotes || 0,
      xpAwarded: item.xpAwarded || 100,
    }));
  },

  async getAllComplaints(status?: string): Promise<ComplaintTicket[]> {
    const raw = await apiClient.get<any[]>('/complaints/all', { status });
    return raw.map((item) => ({
      id: item._id || item.id,
      ticketNumber: item.ticketNumber || item.ticketId || 'AIR-2026-0000',
      title: item.title,
      category: item.category,
      severity: item.severity || 'HIGH',
      location: item.location,
      zone: item.zone,
      status: item.status || 'Submitted',
      description: item.description,
      imageUrl: item.imageUrl,
      assignedOfficer: item.assignedOfficer || 'Municipal Environmental Desk',
      resolutionNotes: item.resolutionNotes || item.municipalFeedback,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
      upvotes: item.upvotes || 0,
      xpAwarded: item.xpAwarded || 100,
    }));
  },

  async fileComplaint(data: {
    title: string;
    category: string;
    severity: string;
    location: string;
    zone: string;
    description: string;
    photoFile?: File;
  }): Promise<any> {
    if (data.photoFile) {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('category', data.category);
      formData.append('severity', data.severity);
      formData.append('location', data.location);
      formData.append('zone', data.zone);
      formData.append('description', data.description);
      formData.append('photo', data.photoFile);
      return apiClient.post('/complaints', formData, true);
    }
    return apiClient.post('/complaints', data);
  },

  async updateComplaintStatus(
    id: string,
    status: 'Submitted' | 'Under Investigation' | 'Action Dispatched' | 'Resolved',
    officer?: string,
    resolutionNotes?: string,
  ): Promise<any> {
    return apiClient.patch(`/complaints/${id}/status`, {
      status,
      officer,
      resolutionNotes,
    });
  },
};
