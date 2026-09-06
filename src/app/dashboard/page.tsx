'use client';

import React from 'react';
import Link from 'next/link';
import { useGamification } from '@/lib/gamification-context';
import { AirQualityCard } from '@/components/air/AirQualityCard';
import { MissionCard } from '@/components/gaming/MissionCard';
import { mockAirQuality, mockEvents, mockLeaderboard } from '@/lib/mock-data';
import {
  Flame,
  Zap,
  Shield,
  TrendingUp,
  Award,
  Sparkles,
  Calendar,
  Users,
  AlertTriangle,
  Gift,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function PlayerDashboard() {
  const { player, missions, activeMissionIds, airQuality } = useGamification();

  // Pick top featured mission
  const todaysMission = missions[0];

  const xpPercent = Math.min(
    100,
    Math.round((player.currentXp / player.nextLevelXp) * 100),
  );

  return (
    <div className="space-y-6">
      {/* Top Welcome & Gamification Banner */}
      <div className="gdg-card p-6 bg-white relative overflow-hidden">
        {/* Soft background accents */}
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-[#E8F0FE]/60 via-transparent to-transparent -z-10 pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Greeting & Rank */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={player.avatar}
                alt={player.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md ring-2 ring-[#4285F4]/30"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-[#4285F4] text-white font-black text-[10px]">
                L{player.level}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#202124] tracking-tight">
                  Good Morning, {player.name} 👋
                </h1>
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] text-xs font-bold border border-[#D2E3FC]">
                  {player.rank}
                </span>
                <span className="text-xs text-[#5F6368] font-medium">
                  Global Rank <strong className="text-[#202124]">#{player.globalRank}</strong>
                </span>
                <span className="text-[#80868B]">•</span>
                <span className="text-xs text-[#34A853] font-bold flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  {player.contributionScore} Impact Pts
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stat Badges */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between sm:justify-start">
            {/* Streak card */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#FCE8E6] border border-[#FAD2CF] text-[#EA4335]">
              <Flame className="w-6 h-6 fill-[#EA4335]" />
              <div>
                <span className="text-sm font-black block leading-none">{player.streakDays} Days</span>
                <span className="text-[10px] font-bold text-[#C5221F] uppercase">Active Streak</span>
              </div>
            </div>

            {/* Eco Points */}
            <Link
              href="/rewards"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#FEF7E0] border border-[#FEEFC3] text-[#B06000] hover:opacity-90 transition-opacity"
            >
              <Gift className="w-6 h-6" />
              <div>
                <span className="text-sm font-black block leading-none">{player.availablePoints}</span>
                <span className="text-[10px] font-bold uppercase">Eco Points</span>
              </div>
            </Link>

            {/* AI Assistant Quick Pill */}
            <Link
              href="/ai"
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6] text-[#137333] hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-5 h-5 text-[#34A853]" />
              <div className="text-left">
                <span className="text-xs font-bold block leading-none">AirGuard AI</span>
                <span className="text-[10px] font-semibold text-[#1E8E3E]">Active Advisor</span>
              </div>
            </Link>
          </div>
        </div>

        {/* XP Progress Bar Strip */}
        <div className="mt-6 pt-5 border-t border-[#F1F3F4]">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="flex items-center gap-1.5 text-[#202124]">
              <Zap className="w-3.5 h-3.5 fill-[#4285F4] text-[#4285F4]" />
              <span>Level {player.level} Progress</span>
            </span>
            <span className="text-[#5F6368]">
              <strong className="text-[#1967D2]">{player.currentXp.toLocaleString()}</strong> /{' '}
              {player.nextLevelXp.toLocaleString()} XP ({xpPercent}%)
            </span>
          </div>

          <div className="w-full h-3 bg-[#F1F3F4] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#4285F4] to-[#34A853] transition-all duration-500 shadow-xs"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Live AQI & Today's Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Air Quality Card */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-[#202124] tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
              <span>Real-Time Environmental Conditions</span>
            </h2>
            <Link href="/admin/air-quality" className="text-xs font-bold text-[#4285F4] hover:underline">
              Detailed Sensor Map →
            </Link>
          </div>
          <AirQualityCard data={airQuality} />
        </div>

        {/* Today's Featured Mission */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-[#202124] tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
              <span>Today&apos;s Priority Mission</span>
            </h2>
            <Link href="/missions" className="text-xs font-bold text-[#4285F4] hover:underline">
              All Missions ({missions.length}) →
            </Link>
          </div>

          <MissionCard mission={todaysMission} />
        </div>
      </div>

      {/* Secondary Row: Community Pulse & Upcoming Clean Air Event */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Community Pulse & Leaderboard Spotlight */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-[#202124] tracking-tight flex items-center gap-2">
              <Users className="w-4 h-4 text-[#34A853]" />
              <span>Community Vanguard (1,284 Active Today)</span>
            </h2>
            <Link href="/leaderboard" className="text-xs font-bold text-[#4285F4] hover:underline">
              Leaderboard →
            </Link>
          </div>

          <div className="gdg-card p-5 bg-white space-y-3">
            {mockLeaderboard.slice(0, 3).map((u) => (
              <div
                key={u.rank}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 text-center font-black text-xs text-[#5F6368]">#{u.rank}</span>
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#DADCE0]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#202124] block">{u.name}</span>
                    <span className="text-[10px] font-semibold text-[#34A853]">{u.badge}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-[#1967D2] block">{u.xp} XP</span>
                  <span className="text-[10px] text-[#5F6368]">+{u.impact} Impact</span>
                </div>
              </div>
            ))}

            {/* Current user positioning banner */}
            <div className="mt-3 p-3 rounded-2xl bg-[#E8F0FE] border border-[#D2E3FC] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1967D2]">
                <span>YOU</span>
                <span className="text-[#202124]">#{player.globalRank}</span>
                <span className="text-[#5F6368] font-normal">({player.currentXp} XP)</span>
              </div>
              <span className="text-[11px] font-bold text-[#1967D2]">
                Only 180 XP to reach #17 ⚡
              </span>
            </div>
          </div>
        </div>

        {/* Featured Environmental Event */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-[#202124] tracking-tight flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#4285F4]" />
              <span>Upcoming Environmental Drive</span>
            </h2>
            <Link href="/events" className="text-xs font-bold text-[#4285F4] hover:underline">
              Events Listing →
            </Link>
          </div>

          <div className="gdg-card p-5 bg-white flex flex-col justify-between h-[calc(100%-2rem)]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-[11px] border border-[#CEEAD6]">
                  {mockEvents[0].category}
                </span>
                <span className="text-xs font-black text-[#1967D2] flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-[#4285F4]" />
                  +{mockEvents[0].xpReward} XP
                </span>
              </div>

              <h3 className="text-base font-bold text-[#202124]">
                {mockEvents[0].title}
              </h3>
              <p className="text-xs text-[#5F6368] mt-1 line-clamp-2">
                {mockEvents[0].description}
              </p>

              <div className="mt-4 pt-3 border-t border-[#F1F3F4] grid grid-cols-2 gap-2 text-xs text-[#5F6368]">
                <div>
                  <span className="text-[10px] text-[#80868B] block">Date & Time</span>
                  <span className="font-semibold text-[#202124]">{mockEvents[0].date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#80868B] block">Location</span>
                  <span className="font-semibold text-[#202124] truncate block">{mockEvents[0].location}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between pt-3 border-t border-[#F1F3F4]">
              <div className="flex items-center gap-1.5 text-xs text-[#5F6368] font-medium">
                <Users className="w-3.5 h-3.5 text-[#34A853]" />
                <span><strong>{mockEvents[0].participantsCount}</strong> Guardians Registered</span>
              </div>

              <Link
                href={`/events/${mockEvents[0].id}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-xs transition-all active:scale-95"
              >
                <span>Join Event</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="pt-2">
        <h2 className="text-xs font-bold text-[#80868B] uppercase tracking-wider mb-3">
          Quick Guardian Tools
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/missions"
            className="gdg-card p-4 bg-white flex items-center gap-3 hover:border-[#4285F4] transition-colors"
          >
            <div className="p-2.5 rounded-2xl bg-[#E8F0FE] text-[#1967D2]">
              <Zap className="w-5 h-5 fill-[#4285F4]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#202124] block">Explore Quests</span>
              <span className="text-[10px] text-[#5F6368]">Find clean air tasks</span>
            </div>
          </Link>

          <Link
            href="/community"
            className="gdg-card p-4 bg-white flex items-center gap-3 hover:border-[#34A853] transition-colors"
          >
            <div className="p-2.5 rounded-2xl bg-[#E6F4EA] text-[#137333]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#202124] block">Community Feed</span>
              <span className="text-[10px] text-[#5F6368]">Post actions & upvote</span>
            </div>
          </Link>

          <Link
            href="/ai"
            className="gdg-card p-4 bg-white flex items-center gap-3 hover:border-[#FBBC05] transition-colors"
          >
            <div className="p-2.5 rounded-2xl bg-[#FEF7E0] text-[#B06000]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#202124] block">AirGuard AI</span>
              <span className="text-[10px] text-[#5F6368]">Ask environmental advice</span>
            </div>
          </Link>

          <Link
            href="/admin/reports"
            className="gdg-card p-4 bg-white flex items-center gap-3 hover:border-[#EA4335] transition-colors"
          >
            <div className="p-2.5 rounded-2xl bg-[#FCE8E6] text-[#C5221F]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#202124] block">Report Smog</span>
              <span className="text-[10px] text-[#5F6368]">Report burning / dust</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
