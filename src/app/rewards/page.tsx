'use client';

import React, { useState } from 'react';
import { useGamification } from '@/lib/gamification-context';
import { mockRewards } from '@/lib/mock-data';
import { RewardItem } from '@/types';
import {
  Gift,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  ShoppingBag,
  Leaf,
  Ticket,
} from 'lucide-react';

import { rewardsApi } from '@/lib/api/rewards';

export default function RewardsPage() {
  const { player, redeemReward } = useGamification();
  const [rewardsList, setRewardsList] = useState<RewardItem[]>(mockRewards);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [redeemingId, setRedeemingId] = useState<string | null>(null);

  React.useEffect(() => {
    async function loadRewards() {
      try {
        const liveRewards = await rewardsApi.getRewards();
        if (liveRewards && liveRewards.length > 0) {
          setRewardsList(liveRewards);
        }
      } catch (err) {
        console.warn('Could not load rewards:', err);
      }
    }
    loadRewards();
  }, []);

  const categories = ['ALL', 'Eco Store', 'Green Action', 'Transport', 'Home & Garden', 'Eco Gear', 'CSR & Giving'];

  const handleRedeem = async (item: RewardItem) => {
    setRedeemingId(item.id);
    await redeemReward(item);
    setRedeemingId(null);
  };

  const filteredRewards = rewardsList.filter((r) => {
    if (selectedCategory !== 'ALL' && r.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with Available Eco Points */}
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FEF7E0] text-[#B06000] text-[11px] font-bold border border-[#FEEFC3]">
            Eco Rewards & Point Store
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight mt-1">
            Redeem Environmental Points
          </h1>
          <p className="text-xs text-[#5F6368] font-medium mt-1">
            Exchange your mission XP and contribution score for green vouchers, tree plantation certificates, and eco-store credits.
          </p>
        </div>

        {/* Available Points Highlight */}
        <div className="p-4 rounded-3xl bg-[#FEF7E0] border border-[#FEEFC3] text-center min-w-[180px] shadow-xs">
          <span className="text-[10px] font-bold text-[#B06000] uppercase tracking-wider block">
            AVAILABLE POINTS
          </span>
          <div className="flex items-center justify-center gap-1.5 my-1">
            <Gift className="w-6 h-6 text-[#FBBC05]" />
            <span className="text-3xl font-black text-[#B06000]">
              {player.availablePoints.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-[#5F6368]">Earned through clean air tasks</span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#4285F4] text-white shadow-xs'
                : 'bg-white text-[#5F6368] hover:bg-[#F8FAFD] border border-[#E8EAED]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredRewards.map((reward) => {
          const canAfford = player.availablePoints >= reward.pointsCost;
          const isProcessing = redeemingId === reward.id;

          return (
            <div
              key={reward.id}
              className="gdg-card p-5 bg-white flex flex-col justify-between space-y-4 hover:border-[#4285F4] transition-all"
            >
              <div>
                <div className="relative rounded-2xl overflow-hidden h-36 mb-3 border border-[#E8EAED]">
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[#202124] font-black text-[10px] shadow-xs">
                    {reward.discountValue}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] font-bold text-[#5F6368] mb-1">
                  <span>{reward.provider}</span>
                  <span className="text-[#34A853]">{reward.category}</span>
                </div>

                <h3 className="text-sm font-bold text-[#202124] leading-snug">{reward.title}</h3>
                <p className="text-xs text-[#5F6368] mt-1 line-clamp-2 leading-relaxed">
                  {reward.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F1F3F4] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#5F6368]">Points Required</span>
                  <span className="font-black text-[#B06000] flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-[#FBBC05]" />
                    {reward.pointsCost.toLocaleString()} pts
                  </span>
                </div>

                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={!canAfford || isProcessing}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
                    canAfford
                      ? 'bg-[#34A853] hover:bg-[#1E8E3E] text-white'
                      : 'bg-[#F1F3F4] text-[#80868B] cursor-not-allowed'
                  }`}
                >
                  {isProcessing ? (
                    <span>Processing...</span>
                  ) : canAfford ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Redeem Voucher</span>
                    </>
                  ) : (
                    <span>Need {reward.pointsCost - player.availablePoints} pts</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
