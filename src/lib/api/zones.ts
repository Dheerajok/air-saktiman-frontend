import { apiClient } from './client';
import { ZoneSummary } from '@/types';

export const zonesApi = {
  async getZones(): Promise<ZoneSummary[]> {
    const raw = await apiClient.get<any[]>('/zones');
    return raw.map((item) => ({
      code: item.code,
      name: item.name,
      aqi: item.aqi,
      status: item.status,
      pm25: item.pm25,
      pm10: item.pm10,
      activeAlerts: item.activeAlerts || [],
      treeCanopyPercent: item.treeCanopyPercent || 20,
      activeSensors: item.activeSensors || 12,
      coordinates: item.coordinates || [28.6139, 77.209],
    }));
  },

  async getZoneByCode(code: string): Promise<ZoneSummary> {
    const item = await apiClient.get<any>(`/zones/${code}`);
    return {
      code: item.code,
      name: item.name,
      aqi: item.aqi,
      status: item.status,
      pm25: item.pm25,
      pm10: item.pm10,
      activeAlerts: item.activeAlerts || [],
      treeCanopyPercent: item.treeCanopyPercent || 20,
      activeSensors: item.activeSensors || 12,
      coordinates: item.coordinates || [28.6139, 77.209],
    };
  },
};
