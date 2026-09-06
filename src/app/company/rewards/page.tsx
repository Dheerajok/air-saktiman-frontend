'use client';

import React, { useState } from 'react';
import { Gift, Plus, Sparkles, CheckCircle2 } from 'lucide-react';
import { useGamification } from '@/lib/gamification-context';

export default function CompanyRewardsManagerPage() {
  const { addToast } = useGamification();
  const [rewards, setRewards] = useState([
    { id: 'cr1', title: '₹500 Metro Commute Card for Top Scorers', budget: '₹50,000', claimed: 42, total: 100 },
    { id: 'cr2', title: 'Plant a Native Miyawaki Cluster in Employee Name', budget: '₹25,000', claimed: 18, total: 50 },
  ]);

  const handleCreateCoupon = () => {
    addToast({
      title: '🎁 Corporate Reward Program Created',
      description: 'Distributed 50 new eco-vouchers to active employees.',
      type: 'success',
    });
  };

  return (
    <div className="space-y-6">
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#202124]">Employee CSR Rewards Center</h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Configure sponsored rewards, vouchers, and tree certificates for top performing employees.
          </p>
        </div>

        <button
          onClick={handleCreateCoupon}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>+ Sponsor New Reward</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {rewards.map((r) => (
          <div key={r.id} className="gdg-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#34A853]">Active Program</span>
              <span className="text-[#5F6368]">Budget: {r.budget}</span>
            </div>
            <h3 className="text-base font-bold text-[#202124]">{r.title}</h3>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#5F6368]">
                <span>Claimed by staff</span>
                <strong className="text-[#202124]">{r.claimed} / {r.total}</strong>
              </div>
              <div className="w-full h-2 bg-[#F1F3F4] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#4285F4] rounded-full"
                  style={{ width: `${(r.claimed / r.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
