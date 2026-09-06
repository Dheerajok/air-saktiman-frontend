'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGamification } from '@/lib/gamification-context';
import { mockContributions } from '@/lib/mock-data';
import {
  Layers,
  Shield,
  Zap,
  Leaf,
  CheckCircle2,
  Download,
  Share2,
  Calendar,
  MapPin,
  Clock,
  Filter,
} from 'lucide-react';

export default function ContributionsPage() {
  const { player, addToast } = useGamification();
  const [filter, setFilter] = useState('ALL');

  const filteredContributions = mockContributions.filter((c) => {
    if (filter !== 'ALL' && c.type !== filter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats Overview */}
      <div className="gdg-card p-6 bg-white space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#202124] tracking-tight flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FBBC05]" />
              <span>My Environmental Impact & Action Log</span>
            </h1>
            <p className="text-xs text-[#5F6368] font-medium mt-1">
              Verified record of your climate deeds, carbon mitigation, and community contributions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                addToast({
                  title: 'Impact Certificate Generated',
                  description: 'Official verified PDF certificate downloaded.',
                  type: 'success',
                });
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAFD] border border-[#DADCE0] text-xs font-bold text-[#3C4043] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Certificate</span>
            </button>
          </div>
        </div>

        {/* 6 Key Impact Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED]">
            <span className="text-[10px] font-bold text-[#80868B] block uppercase">Total Actions</span>
            <span className="text-xl font-black text-[#202124] block my-0.5">
              {player.missionsCompleted}
            </span>
            <span className="text-[10px] text-[#34A853] font-bold">100% Verified</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6]">
            <span className="text-[10px] font-bold text-[#137333] block uppercase">Impact Score</span>
            <span className="text-xl font-black text-[#137333] block my-0.5">
              +{player.contributionScore}
            </span>
            <span className="text-[10px] text-[#137333] font-bold">Points</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#E8F0FE] border border-[#D2E3FC]">
            <span className="text-[10px] font-bold text-[#1967D2] block uppercase">XP Earned</span>
            <span className="text-xl font-black text-[#1967D2] block my-0.5">
              {player.currentXp.toLocaleString()}
            </span>
            <span className="text-[10px] text-[#1967D2] font-bold">Level {player.level}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED]">
            <span className="text-[10px] font-bold text-[#80868B] block uppercase">CO₂ Mitigated</span>
            <span className="text-xl font-black text-[#34A853] block my-0.5">
              {player.co2OffsetKg} kg
            </span>
            <span className="text-[10px] text-[#5F6368] font-bold">Eq. offset</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FEF7E0] border border-[#FEEFC3]">
            <span className="text-[10px] font-bold text-[#B06000] block uppercase">Trees Planted</span>
            <span className="text-xl font-black text-[#B06000] block my-0.5">
              {player.treesPlanted}
            </span>
            <span className="text-[10px] text-[#B06000] font-bold">Native saplings</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FCE8E6] border border-[#FAD2CF]">
            <span className="text-[10px] font-bold text-[#C5221F] block uppercase">Global Rank</span>
            <span className="text-xl font-black text-[#EA4335] block my-0.5">
              #{player.globalRank}
            </span>
            <span className="text-[10px] text-[#C5221F] font-bold">Top 5%</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { label: 'All Actions', val: 'ALL' },
          { label: 'Tree Plantation', val: 'Tree Plantation' },
          { label: 'Pollution Reporting', val: 'Pollution Reporting' },
          { label: 'Waste Management', val: 'Waste Management' },
        ].map((t) => (
          <button
            key={t.val}
            onClick={() => setFilter(t.val)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              filter === t.val
                ? 'bg-[#4285F4] text-white shadow-xs'
                : 'bg-white text-[#5F6368] hover:bg-[#F8FAFD] border border-[#E8EAED]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Contributions Timeline */}
      <div className="gdg-card p-6 bg-white space-y-4">
        <h2 className="text-sm font-bold text-[#202124] uppercase tracking-wider">
          Action Timeline Log
        </h2>

        <div className="space-y-3 divide-y divide-[#F1F3F4]">
          {filteredContributions.map((item) => (
            <div
              key={item.id}
              className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#E6F4EA] text-[#137333] flex items-center justify-center shrink-0 border border-[#CEEAD6] mt-0.5">
                  <Leaf className="w-5 h-5 text-[#34A853]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#202124]">{item.title}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-[10px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#5F6368] mt-1 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#80868B]" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#EA4335]" />
                      {item.location}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-[#34A853]">
                      Saved {item.co2Saved} kg CO₂
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="text-right">
                  <span className="text-xs font-black text-[#1967D2] flex items-center gap-1 justify-end">
                    <Zap className="w-3.5 h-3.5 fill-[#4285F4]" />
                    +{item.xp} XP
                  </span>
                  <span className="text-[11px] text-[#34A853] font-bold">
                    +{item.impactScore} Impact
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
