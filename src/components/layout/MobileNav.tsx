'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Target, Sparkles, Users, Award } from 'lucide-react';

export function MobileNav() {
  const pathname = usePathname();

  const mobileItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, color: 'text-[#4285F4]' },
    { name: 'Missions', href: '/missions', icon: Target, color: 'text-[#EA4335]' },
    { name: 'AI Chat', href: '/ai', icon: Sparkles, color: 'text-[#34A853]' },
    { name: 'Community', href: '/community', icon: Users, color: 'text-[#34A853]' },
    { name: 'Ranks', href: '/leaderboard', icon: Award, color: 'text-[#FBBC05]' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-[#E8EAED] bg-white/95 backdrop-blur-md px-2 md:hidden">
      {mobileItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
              isActive ? 'text-[#1967D2] font-bold' : 'text-[#5F6368]'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-[#4285F4]' : 'text-[#5F6368]'}`} />
            <span className="text-[10px] mt-0.5">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
