'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGamification } from '@/lib/gamification-context';
import {
  Search,
  Bell,
  Flame,
  Zap,
  Shield,
  Building2,
  UserCheck,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Menu,
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { player, role, setRole, airQuality } = useGamification();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const notifications = [
    { id: 1, text: 'Mission completed: +200 XP added!', time: '10m ago', unread: true },
    { id: 2, text: 'You moved up to Global Rank #18 🚀', time: '1h ago', unread: true },
    { id: 3, text: 'New Clean Air Event scheduled in Zone 04', time: '3h ago', unread: false },
    { id: 4, text: 'Your pollution report was verified by Municipal Team', time: '1d ago', unread: false },
  ];

  const aqiColorClass =
    airQuality.aqi <= 50
      ? 'bg-[#E6F4EA] border-[#CEEAD6] text-[#137333]'
      : airQuality.aqi <= 100
      ? 'bg-[#FEF7E0] border-[#FEEFC3] text-[#B06000]'
      : 'bg-[#FCE8E6] border-[#FAD2CF] text-[#C5221F]';

  const aqiDotColor =
    airQuality.aqi <= 50 ? 'bg-[#34A853]' : airQuality.aqi <= 100 ? 'bg-[#FBBC05]' : 'bg-[#EA4335]';

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-[#E8EAED] bg-white px-4 md:px-6">
      {/* Left: Mobile trigger & Search */}
      <div className="flex items-center gap-3 md:gap-4 flex-1 max-w-md">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-[#5F6368] hover:bg-[#F1F3F4] md:hidden transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#80868B]" />
          <input
            type="text"
            placeholder="Search missions, zones, events, or companies..."
            className="w-full h-10 pl-9 pr-4 text-sm bg-[#F8FAFD] hover:bg-[#F1F3F4] focus:bg-white border border-transparent focus:border-[#4285F4] rounded-full outline-none transition-all placeholder:text-[#80868B]"
          />
        </div>
      </div>

      {/* Right: Live AQI, Gamification stats, Notifications, Role Switcher, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live AQI Badge */}
        <Link
          href="/dashboard"
          className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold hover:opacity-90 transition-opacity ${aqiColorClass}`}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${aqiDotColor}`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${aqiDotColor}`}></span>
          </span>
          <span>
            AQI {airQuality.aqi} {typeof airQuality.level === 'string' ? airQuality.level.replace('_', ' ') : 'Live'}
          </span>
        </Link>

        {/* Streak Counter */}
        <div
          title="Active daily mission streak"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#FCE8E6] border border-[#FAD2CF] text-[#EA4335] text-xs font-bold"
        >
          <Flame className="w-3.5 h-3.5 fill-[#EA4335]" />
          <span>{player.streakDays}d</span>
        </div>

        {/* Level & XP Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F0FE] border border-[#D2E3FC] text-[#1967D2] text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 fill-[#4285F4]" />
          <span>LVL {player.level}</span>
          <span className="text-[#4285F4]/70">•</span>
          <span>{player.currentXp.toLocaleString()} XP</span>
        </div>

        {/* Current Role Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#DADCE0] bg-[#F8FAFD] text-xs font-semibold text-[#3C4043]">
          {role === 'PLAYER' && <Shield className="w-3.5 h-3.5 text-[#4285F4]" />}
          {role === 'COMPANY_ADMIN' && <Building2 className="w-3.5 h-3.5 text-[#34A853]" />}
          {role === 'ADMIN' && <UserCheck className="w-3.5 h-3.5 text-[#EA4335]" />}
          <span className="hidden sm:inline">
            {role === 'PLAYER' ? 'Player' : role === 'COMPANY_ADMIN' ? 'Company Admin' : 'Super Admin'}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem('airguard_token');
            localStorage.removeItem('airguard_user');
            window.location.href = '/login';
          }}
          className="px-3 py-1.5 rounded-xl bg-[#FCE8E6] text-[#EA4335] hover:bg-[#FAD2CF] text-xs font-bold transition-colors"
        >
          Logout
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-[#F1F3F4] text-[#5F6368] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EA4335]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#E8EAED] py-3 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-[#F1F3F4]">
                <h4 className="text-sm font-bold text-[#202124]">Notifications</h4>
                <span className="text-[11px] font-medium text-[#4285F4] hover:underline cursor-pointer">
                  Mark all as read
                </span>
              </div>
              <div className="divide-y divide-[#F1F3F4] max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 flex items-start gap-3 hover:bg-[#F8FAFD] transition-colors ${n.unread ? 'bg-[#E8F0FE]/20' : ''}`}
                  >
                    <div className="mt-0.5 p-1.5 rounded-full bg-[#E6F4EA] text-[#34A853]">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="text-[#202124] font-medium leading-relaxed">{n.text}</p>
                      <span className="text-[10px] text-[#80868B]">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <Link href="/profile" className="flex items-center gap-2 pl-1">
          <div className="relative w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-[#4285F4] via-[#34A853] to-[#FBBC05]">
            <img
              src={player.avatar}
              alt={player.name}
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
