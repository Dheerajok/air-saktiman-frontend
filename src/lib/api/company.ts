import { apiClient } from './client';
import { CsrProject } from '@/types';

export const companyApi = {
  async getOverview(): Promise<any> {
    return apiClient.get('/company/overview');
  },

  async getProjects(): Promise<CsrProject[]> {
    const raw = await apiClient.get<any[]>('/company/funds/projects');
    return raw.map((item) => ({
      id: item._id || item.id,
      title: item.title,
      organization: item.organization || item.companyName,
      category: item.category || 'Air Quality & Tech',
      requiredFunds: item.requiredFunds || item.grantAmountUsd || 500000,
      fundedAmount: item.fundedAmount || item.allocatedFundsUsd || 0,
      targetImpact: item.targetImpact || item.impactMetric || 'Citywide Pollution Reduction',
      location: item.location || item.targetZone || 'Delhi NCR',
      treesTarget: item.treesTarget || (item.co2OffsetTons ? item.co2OffsetTons * 10 : 2500),
      householdsTarget: item.householdsTarget || 1200,
      status: item.status || 'ACTIVE',
    }));
  },

  async disburseFunds(projectId: string, amount: number): Promise<any> {
    return apiClient.post(`/company/funds/${projectId}/disburse`, { amount });
  },

  async getRankings(): Promise<any> {
    return apiClient.get('/company/rank');
  },
};
