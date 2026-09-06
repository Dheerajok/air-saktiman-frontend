'use client';

import React, { useState } from 'react';
import { useGamification } from '@/lib/gamification-context';
import { MissionCard } from '@/components/gaming/MissionCard';
import { MissionCategory, MissionDifficulty } from '@/types';
import { Target, Search, Filter, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function MissionsPage() {
  const { missions, activeMissionIds, completedMissionIds } = useGamification();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');

  const categories = [
    'ALL',
    'Air Cleaning',
    'Tree Plantation',
    'Waste Management',
    'Community Reporting',
    'Climate Resilience',
  ];

  const filteredMissions = missions.filter((m) => {
    if (selectedCategory !== 'ALL' && m.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'ALL' && m.difficulty !== selectedDifficulty) return false;
    if (statusFilter === 'ACTIVE' && !activeMissionIds.includes(m.id)) return false;
    if (statusFilter === 'COMPLETED' && !completedMissionIds.includes(m.id)) return false;
    if (
      searchQuery &&
      !m.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="gdg-card p-6 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] text-[11px] font-bold">
              Environmental Quest Hub
            </span>
            <span className="text-xs text-[#5F6368] font-medium">
              {completedMissionIds.length} Verified Actions Completed
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#202124] tracking-tight">
            Discover Clean Air Missions
          </h1>
          <p className="text-xs text-[#5F6368] font-medium mt-1">
            Pick a localized quest, complete actionable steps, submit geo-tagged proof, and earn XP + Community Impact points.
          </p>
        </div>

        {/* Quick status counters */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-3 rounded-2xl bg-[#E8F0FE] border border-[#D2E3FC] text-center min-w-[90px]">
            <span className="text-xs font-black text-[#1967D2] block">
              {activeMissionIds.length}
            </span>
            <span className="text-[10px] text-[#5F6368] font-semibold uppercase">Active</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6] text-center min-w-[90px]">
            <span className="text-xs font-black text-[#137333] block">
              {completedMissionIds.length}
            </span>
            <span className="text-[10px] text-[#5F6368] font-semibold uppercase">Done</span>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80868B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by mission title, description, or zone..."
              className="w-full h-11 pl-10 pr-4 text-xs font-medium bg-white border border-[#DADCE0] focus:border-[#4285F4] rounded-2xl outline-none shadow-xs"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-2xl border border-[#E8EAED]">
            {(['ALL', 'ACTIVE', 'COMPLETED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === tab
                    ? 'bg-[#E8F0FE] text-[#1967D2]'
                    : 'text-[#5F6368] hover:text-[#202124]'
                }`}
              >
                {tab === 'ALL' ? 'All Quests' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#4285F4] text-white shadow-xs'
                  : 'bg-white text-[#5F6368] hover:bg-[#F8FAFD] border border-[#E8EAED]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Missions Grid */}
      {filteredMissions.length === 0 ? (
        <div className="gdg-card p-12 bg-white text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#F8FAFD] border border-[#E8EAED] flex items-center justify-center mx-auto text-[#80868B]">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#202124]">No missions match your criteria</h3>
          <p className="text-xs text-[#5F6368] max-w-sm mx-auto">
            Try adjusting your category or status filters to discover new community quests in your area.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setSelectedDifficulty('ALL');
              setStatusFilter('ALL');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-[#4285F4] hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      )}
    </div>
  );
}
