'use client';

import React from 'react';
import Link from 'next/link';
import {
  Wind,
  Zap,
  Flame,
  Shield,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle2,
  Trophy,
  Leaf,
  Globe2,
  Building2,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { mockAirQuality, mockMissions, mockLeaderboard, mockCompany } from '@/lib/mock-data';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-[#E8EAED] bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED] shadow-xs">
              <div className="grid grid-cols-2 gap-1 p-1.5">
                <div className="w-2 h-2 rounded-full bg-[#4285F4]" />
                <div className="w-2 h-2 rounded-full bg-[#EA4335]" />
                <div className="w-2 h-2 rounded-full bg-[#FBBC05]" />
                <div className="w-2 h-2 rounded-full bg-[#34A853]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-[#202124]">
                Air<span className="text-[#4285F4]">Guard</span>
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#5F6368]">
            <a href="#how-it-works" className="hover:text-[#202124] transition-colors">
              How It Works
            </a>
            <a href="#live-aqi" className="hover:text-[#202124] transition-colors">
              Live AQI
            </a>
            <a href="#missions" className="hover:text-[#202124] transition-colors">
              Missions
            </a>
            <a href="#community" className="hover:text-[#202124] transition-colors">
              Community
            </a>
            <a href="#csr" className="hover:text-[#202124] transition-colors">
              Corporate CSR
            </a>
          </nav>

          {/* Auth CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-bold text-[#5F6368] hover:text-[#202124] px-3 py-2 rounded-xl hover:bg-[#F8FAFD] transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <span>Start Playing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-[#F8FAFD] via-white to-white">
        {/* Soft Google color blobs in background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#4285F4]/10 via-[#34A853]/10 to-[#FBBC05]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F4EA] border border-[#CEEAD6] text-[#137333] text-xs font-bold shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-[#34A853]" />
                <span>Next-Gen Environmental Climate Action Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#202124] tracking-tight leading-[1.1]">
                PLAY FOR <br />
                <span className="text-[#4285F4]">CLEANER AIR.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#5F6368] font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Turn everyday environmental actions into measurable impact. Complete clean air missions, report pollution hotspots, earn XP, and unlock corporate CSR funding for your community.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-sm shadow-lg shadow-[#4285F4]/20 transition-all active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Start Playing Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/community"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F8FAFD] border border-[#DADCE0] text-[#3C4043] font-bold text-sm transition-all"
                >
                  <Users className="w-4 h-4 text-[#34A853]" />
                  <span>Explore Community</span>
                </Link>
              </div>

              {/* Live counter strip */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#E8EAED] max-w-md mx-auto lg:mx-0">
                <div>
                  <span className="text-xl sm:text-2xl font-black text-[#202124] block">1,284+</span>
                  <span className="text-xs text-[#5F6368] font-medium">Active Players</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-[#34A853] block">14.8T</span>
                  <span className="text-xs text-[#5F6368] font-medium">CO₂ Mitigated</span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-[#4285F4] block">₹42.5L</span>
                  <span className="text-xs text-[#5F6368] font-medium">CSR Funded</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual (Simulated Gaming Environmental Card) */}
            <div className="lg:col-span-5">
              <div className="gdg-card p-6 bg-white relative max-w-md mx-auto shadow-2xl">
                {/* Top Gamification Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#F1F3F4]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-[#E8F0FE] text-[#1967D2] flex items-center justify-center font-black text-sm border border-[#D2E3FC]">
                      L12
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#202124] block">Air Guardian</span>
                      <span className="text-[10px] text-[#5F6368] font-medium">Zone 04 Defender</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FCE8E6] text-[#EA4335] text-xs font-bold">
                    <Flame className="w-3.5 h-3.5 fill-[#EA4335]" />
                    <span>8 Day Streak</span>
                  </div>
                </div>

                {/* Circular AQI Visual Component */}
                <div className="my-6 p-5 rounded-3xl bg-[#F8FAFD] border border-[#E8EAED] text-center relative overflow-hidden">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#5F6368]">
                    LIVE AMBIENT AIR QUALITY
                  </span>

                  <div className="my-3 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-4 border-[#FBBC05] bg-[#FEF7E0] flex flex-col items-center justify-center shadow-inner">
                      <span className="text-4xl font-black text-[#B06000]">72</span>
                      <span className="text-[11px] font-extrabold text-[#B06000] uppercase">MODERATE</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#5F6368]">
                    <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                    <span>Delhi NCR • Central Eco Belt</span>
                  </div>
                </div>

                {/* Today's Active Mission Pill */}
                <div className="p-4 rounded-2xl bg-[#E8F0FE] border border-[#D2E3FC] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-[#1967D2] uppercase tracking-wider block">
                      TODAY'S MISSION
                    </span>
                    <span className="text-xs font-bold text-[#202124]">Reduce Local Street Dust</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#4285F4] text-white font-black text-xs">
                    +50 XP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white border-t border-[#E8EAED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-[#202124] tracking-tight">
              How AirGuard Works
            </h2>
            <p className="text-sm text-[#5F6368] font-medium mt-2">
              Transform environmental awareness into tangible community action through gamified mechanics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Join & Locate', desc: 'Create your Player profile and connect your local environmental zone.', color: 'border-[#4285F4] text-[#4285F4]' },
              { num: '02', title: 'Accept Missions', desc: 'Pick from daily tasks: tree planting, reporting burning, or anti-dust actions.', color: 'border-[#EA4335] text-[#EA4335]' },
              { num: '03', title: 'Act & Report', desc: 'Execute the quest, snap geo-tagged verification photos, and submit.', color: 'border-[#FBBC05] text-[#FBBC05]' },
              { num: '04', title: 'Earn XP & Ranks', desc: 'Level up from Eco Scout to Air Guardian and unlock badges.', color: 'border-[#34A853] text-[#34A853]' },
              { num: '05', title: 'Unlock CSR Funds', desc: 'Community points trigger matching corporate CSR grants for clean air projects.', color: 'border-[#4285F4] text-[#4285F4]' },
            ].map((step, idx) => (
              <div
                key={idx}
                className="gdg-card p-5 bg-[#F8FAFD] flex flex-col justify-between hover:bg-white transition-colors"
              >
                <div>
                  <span className={`text-2xl font-black block mb-3 ${step.color}`}>
                    {step.num}
                  </span>
                  <h3 className="text-sm font-bold text-[#202124]">{step.title}</h3>
                  <p className="text-xs text-[#5F6368] mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live AQI Preview & Leaderboard */}
      <section id="live-aqi" className="py-20 bg-[#F8FAFD] border-t border-[#E8EAED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Live Air Quality & Active Zones */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-black text-[#202124] tracking-tight">
                  Live Environmental Monitoring
                </h2>
                <Link href="/dashboard" className="text-xs font-bold text-[#4285F4] hover:underline">
                  Full Dashboard →
                </Link>
              </div>

              <div className="gdg-card p-6 bg-white space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#202124] block">Delhi NCR Regional Overview</span>
                    <span className="text-[11px] text-[#5F6368]">Live Sensor Node Network</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#E6F4EA] text-[#137333] font-bold text-xs">
                    42 Active Sensors
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED]">
                    <span className="text-[10px] font-bold text-[#5F6368] block">Current AQI</span>
                    <span className="text-2xl font-black text-[#B06000]">72</span>
                    <span className="text-[10px] font-bold text-[#FBBC05] block">Moderate</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED]">
                    <span className="text-[10px] font-bold text-[#5F6368] block">PM2.5</span>
                    <span className="text-2xl font-black text-[#202124]">32</span>
                    <span className="text-[10px] text-[#5F6368] block">μg/m³</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED]">
                    <span className="text-[10px] font-bold text-[#5F6368] block">Temperature</span>
                    <span className="text-2xl font-black text-[#202124]">31°C</span>
                    <span className="text-[10px] text-[#5F6368] block">Ambient</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F8FAFD] border border-[#E8EAED]">
                    <span className="text-[10px] font-bold text-[#5F6368] block">Wind Speed</span>
                    <span className="text-2xl font-black text-[#202124]">12</span>
                    <span className="text-[10px] text-[#5F6368] block">km/h NW</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Leaderboard Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-black text-[#202124] tracking-tight">
                  Top Air Champions
                </h2>
                <Link href="/leaderboard" className="text-xs font-bold text-[#4285F4] hover:underline">
                  View All →
                </Link>
              </div>

              <div className="gdg-card p-5 bg-white divide-y divide-[#F1F3F4]">
                {mockLeaderboard.slice(0, 4).map((p) => (
                  <div key={p.rank} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-6 text-center font-black text-xs text-[#5F6368]">
                        #{p.rank}
                      </span>
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#E8EAED]"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#202124] block">{p.name}</span>
                        <span className="text-[10px] text-[#34A853] font-semibold">{p.badge}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-[#1967D2] block">{p.xp} XP</span>
                      <span className="text-[10px] text-[#5F6368]">Lvl {p.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate CSR Partners Banner */}
      <section id="csr" className="py-16 bg-white border-t border-[#E8EAED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-[#5F6368] uppercase tracking-widest block mb-6">
            Empowering CSR Programs & Environmental Coalitions
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="text-base font-black text-[#202124]">Tata ESG Tech</span>
            <span className="text-base font-black text-[#202124]">Infosys Foundation</span>
            <span className="text-base font-black text-[#202124]">Wipro EcoEnergy</span>
            <span className="text-base font-black text-[#202124]">Mahindra Rise Green</span>
            <span className="text-base font-black text-[#202124]">Clean Air Asia</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#F8FAFD] border-t border-[#E8EAED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="grid grid-cols-2 gap-0.5 p-1 bg-white rounded-lg border border-[#E8EAED]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
            </div>
            <span className="text-sm font-black text-[#202124]">AirGuard</span>
            <span className="text-xs text-[#5F6368] ml-2">© 2026 AirGuard Climate Action.</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-[#5F6368]">
            <Link href="/dashboard" className="hover:text-[#202124]">Dashboard</Link>
            <Link href="/missions" className="hover:text-[#202124]">Missions</Link>
            <Link href="/company" className="hover:text-[#202124]">Corporate CSR</Link>
            <Link href="/admin" className="hover:text-[#202124]">Admin Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
