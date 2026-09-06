'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGamification } from '@/lib/gamification-context';
import {
  LayoutDashboard,
  Users,
  Target,
  Sparkles,
  Award,
  Gift,
  Calendar,
  Layers,
  Building2,
  TrendingUp,
  CircleDollarSign,
  ShieldCheck,
  ClipboardList,
  AlertTriangle,
  Cpu,
  Wind,
  CloudSun,
  MapPin,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Globe2,
  AlertCircle,
  MessageSquareCheck,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const { role } = useGamification();

  const playerNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, color: 'text-[#4285F4]' },
    { name: 'Community Feed', href: '/community', icon: Users, color: 'text-[#34A853]' },
    { name: 'File Complaint', href: '/complaints', icon: AlertCircle, color: 'text-[#EA4335]' },
    { name: 'Missions & Tasks', href: '/missions', icon: Target, color: 'text-[#EA4335]' },
    { name: 'My Contributions', href: '/contributions', icon: Layers, color: 'text-[#FBBC05]' },
    { name: 'Events & Drives', href: '/events', icon: Calendar, color: 'text-[#4285F4]' },
    { name: 'AirGuard AI', href: '/ai', icon: Sparkles, color: 'text-[#34A853]' },
    { name: 'Leaderboard', href: '/leaderboard', icon: Award, color: 'text-[#FBBC05]' },
    { name: 'Eco Rewards', href: '/rewards', icon: Gift, color: 'text-[#EA4335]' },
  ];

  const companyNavItems = [
    { name: 'Company Overview', href: '/company', icon: Building2, color: 'text-[#34A853]' },
    { name: 'Company Profile', href: '/company/profile', icon: User, color: 'text-[#4285F4]' },
    { name: 'Employee Users', href: '/company/users', icon: Users, color: 'text-[#4285F4]' },
    { name: 'CSR Dashboard', href: '/company/csr', icon: TrendingUp, color: 'text-[#34A853]' },
    { name: 'CSR Ranking', href: '/company/rank', icon: Award, color: 'text-[#FBBC05]' },
    { name: 'CSR Funds & Projects', href: '/company/funds', icon: CircleDollarSign, color: 'text-[#EA4335]' },
    { name: 'Partner Organizations', href: '/organizations', icon: Globe2, color: 'text-[#4285F4]' },
  ];

  const adminNavItems = [
    { name: 'Admin Dashboard', href: '/admin', icon: ShieldCheck, color: 'text-[#EA4335]' },
    { name: 'Community Moderation', href: '/admin/community', icon: MessageSquareCheck, color: 'text-[#34A853]' },
    { name: 'Task Management', href: '/admin/tasks', icon: ClipboardList, color: 'text-[#4285F4]' },
    { name: 'Report Submissions', href: '/admin/reports', icon: AlertTriangle, color: 'text-[#EA4335]' },
    { name: 'AI Decision Center', href: '/admin/ai', icon: Cpu, color: 'text-[#34A853]' },
    { name: 'Air Quality Index', href: '/admin/air-quality', icon: Wind, color: 'text-[#FBBC05]' },
    { name: 'Weather & Zone Maps', href: '/admin/weather', icon: CloudSun, color: 'text-[#4285F4]' },
    { name: 'Zone Management', href: '/admin/zones', icon: MapPin, color: 'text-[#34A853]' },
  ];

  const renderNavGroup = (title: string, items: typeof playerNavItems) => (
    <div className="mb-5">
      {!collapsed && (
        <div className="px-3 mb-2 text-[11px] font-bold text-[#80868B] uppercase tracking-wider">
          {title}
        </div>
      )}
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href) && item.href !== '/dashboard' && item.href !== '/company' && item.href !== '/admin');
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-[#E8F0FE] text-[#1967D2] font-bold shadow-xs'
                  : 'text-[#5F6368] hover:bg-[#F8FAFD] hover:text-[#202124]'
              }`}
              title={collapsed ? item.name : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-[#1967D2]' : item.color
                }`}
              />
              {!collapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs md:hidden"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-50 flex flex-col h-screen bg-white border-r border-[#E8EAED] transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Brand Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#E8EAED]">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
            {/* Original AirGuard 4-color geometric logo */}
            <div className="flex items-center justify-center w-9 h-9 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] shadow-xs shrink-0">
              <div className="grid grid-cols-2 gap-1 p-1.5">
                <div className="w-2 h-2 rounded-full bg-[#4285F4]" />
                <div className="w-2 h-2 rounded-full bg-[#EA4335]" />
                <div className="w-2 h-2 rounded-full bg-[#FBBC05]" />
                <div className="w-2 h-2 rounded-full bg-[#34A853]" />
              </div>
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-black text-base tracking-tight text-[#202124]">
                  Air<span className="text-[#4285F4]">Guard</span>
                </span>
                <span className="text-[9px] font-semibold text-[#80868B] tracking-wide -mt-0.5">
                  PLAY • ACT • BREATHE
                </span>
              </div>
            )}
          </Link>

          {/* Desktop collapse button */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-1.5 rounded-xl hover:bg-[#F1F3F4] text-[#80868B] hover:text-[#202124] transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {role === 'ADMIN' && renderNavGroup('Admin Center', adminNavItems)}
          {role === 'COMPANY_ADMIN' && renderNavGroup('Company & CSR', companyNavItems)}
          {(!role || role === 'PLAYER') && renderNavGroup('Player Space', playerNavItems)}
        </div>

        {/* Footer info & Profile/Settings */}
        <div className="p-3 border-t border-[#E8EAED] space-y-1">
          <Link
            href={role === 'COMPANY_ADMIN' ? '/company/profile' : '/profile'}
            className="flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-semibold text-[#5F6368] hover:bg-[#F8FAFD] hover:text-[#202124] transition-colors"
            title={collapsed ? 'My Profile' : undefined}
          >
            <User className="w-4 h-4 text-[#4285F4] shrink-0" />
            {!collapsed && <span>My Profile</span>}
          </Link>
          {role === 'ADMIN' && (
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-semibold text-[#5F6368] hover:bg-[#F8FAFD] hover:text-[#202124] transition-colors"
              title={collapsed ? 'Settings' : undefined}
            >
              <Settings className="w-4 h-4 text-[#5F6368] shrink-0" />
              {!collapsed && <span>Admin Settings</span>}
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
