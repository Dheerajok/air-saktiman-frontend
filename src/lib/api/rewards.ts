import { apiClient } from './client';
import { RewardItem } from '@/types';

export const rewardsApi = {
  async getRewards(category?: string): Promise<RewardItem[]> {
    const raw = await apiClient.get<any[]>('/rewards', { category });
    return raw.map((item) => ({
      id: item._id || item.id,
      title: item.title,
      provider: item.provider || item.partnerName,
      category: item.category || 'Eco Store',
      pointsCost: item.pointsCost || 500,
      discountValue: item.discountValue || 'Special Discount',
      description: item.description,
      expiryDays: item.expiryDays || 30,
      image: item.image || item.imageUrl || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
      accent: (item.accent as 'blue' | 'red' | 'yellow' | 'green') || 'green',
    }));
  },

  async redeemReward(rewardId: string): Promise<any> {
    return apiClient.post(`/rewards/${rewardId}/redeem`);
  },
};
