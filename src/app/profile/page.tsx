'use client';

import React from 'react';
import Link from 'next/link';
import { useGamification } from '@/lib/gamification-context';
import { mockBadges, mockContributions } from '@/lib/mock-data';
import {
  Shield,
  Zap,
  Flame,
  Award,
  Edit,
  Leaf,
  Wind,
  Trees,
  Users,
  CheckCircle2,
  Calendar,
  Gift,
} from 'lucide-react';

export default function ProfilePage() {
  const { player } = useGamification();

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind':
        return <Wind className="w-5 h-5" />;
      case 'Trees':
        return <Trees className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-[#E8F0FE] text-[#1967D2] border-[#D2E3FC]';
      case 'green':
        return 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]';
      case 'yellow':
        return 'bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]';
      case 'red':
        return 'bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]';
      default:
        return 'bg-[#F8FAFD] text-[#202124] border-[#E8EAED]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Hero */}
      <div className="gdg-card p-6 md:p-8 bg-white relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={player.avatar}
                alt={player.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-white shadow-xl ring-2 ring-[#4285F4]/40"
              />
              <span className="absolute -bottom-2 -right-1 px-2.5 py-0.5 rounded-full bg-[#4285F4] text-white font-black text-xs shadow-sm">
                LVL {player.level}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-black text-[#202124] tracking-tight">{player.name}</h1>
                <span className="text-xs font-semibold text-[#80868B]">@{player.username}</span>
              </div>

              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1967D2] text-xs font-bold border border-[#D2E3FC]">
                  {player.rank}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FCE8E6] text-[#EA4335] text-xs font-bold border border-[#FAD2CF] flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-[#EA4335]" />
                  {player.streakDays} Day Streak
                </span>
                <span className="text-xs text-[#5F6368] font-medium">
                  Global Rank <strong className="text-[#202124]">#{player.globalRank}</strong>
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/profile/edit"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-[#DADCE0] hover:bg-[#F8FAFD] text-xs font-bold text-[#3C4043] transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </Link>
        </div>

        {/* XP Progress Bar */}
        <div className="mt-6 pt-6 border-t border-[#F1F3F4]">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-[#202124]">Level {player.level} XP Progress</span>
            <span className="text-[#1967D2]">
              {player.currentXp.toLocaleString()} / {player.nextLevelXp.toLocaleString()} XP
            </span>
          </div>
          <div className="w-full h-3 bg-[#F1F3F4] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#4285F4] to-[#34A853]"
              style={{ width: `${Math.round((player.currentXp / player.nextLevelXp) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges Collection Showcase */}
      <div className="gdg-card p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-[#202124] tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FBBC05]" />
              <span>Guardian Badges Collection ({mockBadges.length})</span>
            </h2>
            <p className="text-xs text-[#5F6368]">
              Earned by fulfilling climate quests and verified community contributions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockBadges.map((badge) => {
            const isUnlocked = !!badge.unlockedAt;
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-3xl border transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-white border-[#E8EAED] shadow-xs hover:border-[#4285F4]'
                    : 'bg-[#F8FAFD] border-dashed border-[#DADCE0] opacity-75'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${getBadgeColor(
                    badge.accentColor || 'blue',
                  )}`}
                >
                  {getBadgeIcon(badge.icon || 'Shield')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-[#202124] truncate">{badge.title}</span>
                    {isUnlocked && (
                      <span className="text-[10px] font-bold text-[#34A853]">Unlocked</span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#5F6368] mt-1 leading-snug">
                    {badge.description}
                  </p>
                  {badge.progress && (
                    <div className="mt-2 text-[10px] text-[#80868B] font-semibold">
                      Progress: {badge.progress} / {badge.maxProgress}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div className="gdg-card p-6 bg-white space-y-4">
        <h2 className="text-base font-black text-[#202124] tracking-tight">
          Recent Environmental Deeds
        </h2>

        <div className="space-y-3 divide-y divide-[#F1F3F4]">
          {mockContributions.map((c) => (
            <div key={c.id} className="pt-3 first:pt-0 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#202124] block">{c.title}</span>
                <span className="text-[11px] text-[#5F6368]">{c.location} • {c.date}</span>
              </div>
              <span className="text-xs font-bold text-[#1967D2]">+{c.xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
