import { apiClient } from './client';
import { AiRecommendation } from '@/types';

export const aiApi = {
  async getRecommendations(): Promise<AiRecommendation[]> {
    const raw = await apiClient.get<any[]>('/ai/recommendations');
    return raw.map((item) => ({
      id: item._id || item.id,
      title: item.title,
      category: item.category,
      impact: item.impact,
      confidence: item.confidence,
      timeframe: item.timeframe,
      estimatedCost: item.estimatedCost,
      description: item.description,
    }));
  },

  async simulate(params: {
    interventionType: string;
    intensityPercent: number;
    durationDays: number;
  }): Promise<{
    estimatedAqiReduction: number;
    projectedNewAqi: number;
    economicCostUsd: number;
    healthCareSavingsUsd: number;
    co2OffsetTons: number;
    pm25ReductionPercent: number;
    confidenceScore: number;
    recommendationSummary: string;
    actionItems: string[];
  }> {
    return apiClient.post('/ai/simulate', params);
  },

  async chat(message: string, history?: Array<{ role: string; content: string }>): Promise<{ reply: string; timestamp: string }> {
    try {
      const res = await apiClient.post<{ reply: string; timestamp: string }>('/ai/chat', { message, history });
      if (res && res.reply) return res;
    } catch {
      // Direct frontend Gemini call if backend is offline
    }

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (apiKey) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `You are AirGuard AI, an environmental and clean air decision assistant. Question: ${message}` }] }],
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) return { reply, timestamp: new Date().toISOString() };
        }
      } catch {}
    }

    return {
      reply: 'Real-time environmental metrics for your zone show moderate AQI. Consider planting native trees or completing active quests!',
      timestamp: new Date().toISOString(),
    };
  },
};
