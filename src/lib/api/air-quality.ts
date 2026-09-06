import { apiClient } from './client';
import { AirQualityMetric } from '@/types';

export const airQualityApi = {
  async getLiveAirQuality(): Promise<AirQualityMetric> {
    const data = await apiClient.get<any>('/air-quality/live');
    return {
      aqi: data.aqi || 72,
      level: data.level || 'MODERATE',
      zone: data.zone || 'Delhi NCR - Zone 04 (Central Eco Belt)',
      city: data.city || 'New Delhi',
      isLive: data.isLive ?? true,
      pm25: data.pm25 || 32,
      pm10: data.pm10 || 58,
      no2: data.no2 || 24.5,
      so2: data.so2 || 12.1,
      co: data.co || 0.8,
      o3: data.o3 || 42.0,
      temperature: data.temperature || 31,
      humidity: data.humidity || 58,
      windSpeed: data.windSpeed || 12,
      windDirection: data.windDirection || 'NW',
    };
  },

  async getHistory(): Promise<any[]> {
    return apiClient.get('/air-quality/history');
  },

  async getChallengeWindow(): Promise<any> {
    return apiClient.get('/air-quality/challenge-window');
  },
};
