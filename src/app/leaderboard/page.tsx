'use client';

import React, { useState } from 'react';
import { useGamification } from '@/lib/gamification-context';
import { mockLeaderboard } from '@/lib/mock-data';
import { Award, Trophy, Medal, Zap, Shield, Flame, Users, Building2 } from 'lucide-react';

export default function LeaderboardPage() {
  const { player } = useGamification();
  const [activeTab, setActiveTab] = useState<'Players' | 'Companies' | 'Communities'>('Players');
  const [timeframe, setTimeframe] = useState<'Today' | 'This Week' | 'This Month' | 'All Time'>('This Week');

  const companyRankings = [
    { rank: 1, name: 'GreenTech ESG Solutions', logo: '🏢', impact: '98,420 pts', employees: 1420, funding: '₹45,00,000' },
    { rank: 2, name: 'EcoWorks Clean Mobility', logo: '⚡', impact: '91,200 pts', employees: 890, funding: '₹38,00,000' },
    { rank: 3, name: 'Tata ESG Innovations', logo: '🌱', impact: '88,400 pts', employees: 1200, funding: '₹42,50,000' },
    { rank: 4, name: 'Mahindra Green Energy', logo: '☀️', impact: '82,500 pts', employees: 650, funding: '₹29,00,000' },
    { rank: 7, name: 'Your Partner Company', logo: '🛡️', impact: '68,100 pts', employees: 420, isCurrent: true, funding: '₹18,00,000' },
  ];

  const communityRankings = [
    { rank: 1, name: 'Dwarka Eco Collective (Zone 04)', members: 420, actions: 1840, impact: '14,200 pts' },
    { rank: 2, name: 'Central Delhi Air Sentinels (Zone 01)', members: 380, actions: 1610, impact: '12,900 pts' },
    { rank: 3, name: 'Whitefield Clean Skies Club', members: 290, actions: 1240, impact: '9,800 pts' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] text-[11px] font-bold">
            Global Climate Leaderboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight mt-1">
            Top Environmental Guardians
          </h1>
          <p className="text-xs text-[#5F6368] font-medium mt-1">
            Compete, climb the vanguard ranks, and inspire grassroots community action.
          </p>
        </div>

        {/* Timeframe Filter Pills */}
        <div className="flex items-center gap-1 p-1 bg-[#F8FAFD] rounded-2xl border border-[#E8EAED]">
          {(['Today', 'This Week', 'This Month', 'All Time'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframe === t
                  ? 'bg-white text-[#4285F4] shadow-xs border border-[#D2E3FC]'
                  : 'text-[#5F6368] hover:text-[#202124]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tabs (Players / Companies / Communities) */}
      <div className="flex items-center gap-2 p-1.5 bg-white rounded-2xl border border-[#E8EAED] w-fit">
        <button
          onClick={() => setActiveTab('Players')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'Players'
              ? 'bg-[#E8F0FE] text-[#1967D2] shadow-xs'
              : 'text-[#5F6368] hover:text-[#202124]'
          }`}
        >
          <Award className="w-4 h-4 text-[#4285F4]" />
          <span>Top Players</span>
        </button>

        <button
          onClick={() => setActiveTab('Companies')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'Companies'
              ? 'bg-[#E6F4EA] text-[#137333] shadow-xs'
              : 'text-[#5F6368] hover:text-[#202124]'
          }`}
        >
          <Building2 className="w-4 h-4 text-[#34A853]" />
          <span>CSR Companies</span>
        </button>

        <button
          onClick={() => setActiveTab('Communities')}
          className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'Communities'
              ? 'bg-[#FEF7E0] text-[#B06000] shadow-xs'
              : 'text-[#5F6368] hover:text-[#202124]'
          }`}
        >
          <Users className="w-4 h-4 text-[#FBBC05]" />
          <span>Zone Communities</span>
        </button>
      </div>

      {/* Current User Tracker Highlight */}
      {activeTab === 'Players' && (
        <div className="p-4 rounded-3xl bg-[#E8F0FE] border border-[#D2E3FC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="w-8 text-center font-black text-sm text-[#1967D2]">
              #{player.globalRank}
            </span>
            <img
              src={player.avatar}
              alt={player.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <div>
              <span className="text-xs font-bold text-[#202124] block">
                {player.name} (You)
              </span>
              <span className="text-[11px] text-[#1967D2] font-semibold">
                Level {player.level} • {player.rank}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="font-black text-[#1967D2]">{player.currentXp} XP</span>
            <span className="px-3 py-1 rounded-full bg-white text-[#1967D2] font-bold text-[11px] border border-[#D2E3FC]">
              ⚡ 180 XP to reach #17
            </span>
          </div>
        </div>
      )}

      {/* Table Rankings Card */}
      <div className="gdg-card bg-white overflow-hidden">
        {activeTab === 'Players' && (
          <div className="divide-y divide-[#F1F3F4]">
            {mockLeaderboard.map((item) => (
              <div
                key={item.rank}
                className={`p-4 sm:px-6 flex items-center justify-between gap-4 transition-colors ${
                  item.isCurrent ? 'bg-[#E8F0FE]/30' : 'hover:bg-[#F8FAFD]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`w-7 text-center font-black text-sm ${
                      item.rank === 1
                        ? 'text-[#FBBC05]'
                        : item.rank === 2
                        ? 'text-[#80868B]'
                        : item.rank === 3
                        ? 'text-[#B06000]'
                        : 'text-[#5F6368]'
                    }`}
                  >
                    #{item.rank}
                  </span>

                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-[#E8EAED]"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#202124]">{item.name}</span>
                      {item.isCurrent && (
                        <span className="px-2 py-0.2 rounded-full bg-[#4285F4] text-white font-bold text-[10px]">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#5F6368] mt-0.5">
                      <span>Level {item.level}</span>
                      <span>•</span>
                      <span className="text-[#34A853] font-semibold">{item.badge}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-[#1967D2] flex items-center gap-1 justify-end">
                    <Zap className="w-3.5 h-3.5 fill-[#4285F4]" />
                    {item.xp.toLocaleString()} XP
                  </span>
                  <span className="text-[11px] text-[#34A853] font-bold">
                    +{item.impact} Impact pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Companies' && (
          <div className="divide-y divide-[#F1F3F4]">
            {companyRankings.map((c) => (
              <div
                key={c.rank}
                className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-[#F8FAFD]"
              >
                <div className="flex items-center gap-4">
                  <span className="w-7 text-center font-black text-sm text-[#5F6368]">
                    #{c.rank}
                  </span>
                  <span className="text-2xl">{c.logo}</span>
                  <div>
                    <span className="text-sm font-bold text-[#202124] block">{c.name}</span>
                    <span className="text-xs text-[#5F6368]">{c.employees} participating employees</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-[#34A853] block">{c.impact}</span>
                  <span className="text-xs text-[#5F6368] font-medium">{c.funding} CSR</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Communities' && (
          <div className="divide-y divide-[#F1F3F4]">
            {communityRankings.map((comm) => (
              <div
                key={comm.rank}
                className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-[#F8FAFD]"
              >
                <div className="flex items-center gap-4">
                  <span className="w-7 text-center font-black text-sm text-[#5F6368]">
                    #{comm.rank}
                  </span>
                  <div>
                    <span className="text-sm font-bold text-[#202124] block">{comm.name}</span>
                    <span className="text-xs text-[#5F6368]">{comm.members} Active Guardians</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-[#FBBC05] block">{comm.impact}</span>
                  <span className="text-xs text-[#5F6368]">{comm.actions} total actions</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
