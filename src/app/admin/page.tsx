'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  Target,
  AlertTriangle,
  Wind,
  CircleDollarSign,
  ShieldCheck,
  TrendingUp,
  Cpu,
  MapPin,
  Sparkles,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function AdminDashboardPage() {
  const userGrowthData = [
    { name: 'Mon', players: 840, missions: 320 },
    { name: 'Tue', players: 920, missions: 410 },
    { name: 'Wed', players: 1050, missions: 480 },
    { name: 'Thu', players: 1120, missions: 540 },
    { name: 'Fri', players: 1210, missions: 620 },
    { name: 'Sat', players: 1284, missions: 740 },
    { name: 'Sun', players: 1390, missions: 810 },
  ];

  const reportsByZoneData = [
    { zone: 'Zone 01', reports: 12 },
    { zone: 'Zone 02', reports: 48 },
    { zone: 'Zone 03', reports: 22 },
    { zone: 'Zone 04', reports: 18 },
    { zone: 'Zone 05', reports: 34 },
  ];

  const aqiTrendData = [
    { time: '06:00', aqi: 65 },
    { time: '09:00', aqi: 112 },
    { time: '12:00', aqi: 88 },
    { time: '15:00', aqi: 74 },
    { time: '18:00', aqi: 124 },
    { time: '21:00', aqi: 148 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FCE8E6] text-[#C5221F] text-[11px] font-bold border border-[#FAD2CF]">
            Enterprise Administration
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124] tracking-tight mt-1">
            Platform Command Center
          </h1>
          <p className="text-xs text-[#5F6368] font-medium mt-0.5">
            Real-time telemetry, municipal alerts, AI recommendations, and CSR capital distribution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/ai"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6] text-[#137333] font-bold text-xs hover:bg-[#CEEAD6]/40 transition-colors"
          >
            <Cpu className="w-4 h-4" />
            <span>AI Decision Center</span>
          </Link>
        </div>
      </div>

      {/* 8 Top Enterprise Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="gdg-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#80868B] uppercase block">Total Users</span>
          <span className="text-2xl font-black text-[#202124] block my-1">4,820</span>
          <span className="text-xs text-[#34A853] font-semibold">+14% this month</span>
        </div>

        <div className="gdg-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#80868B] uppercase block">Active Players</span>
          <span className="text-2xl font-black text-[#4285F4] block my-1">1,284</span>
          <span className="text-xs text-[#5F6368]">Online today</span>
        </div>

        <div className="gdg-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#80868B] uppercase block">Reports Today</span>
          <span className="text-2xl font-black text-[#EA4335] block my-1">42 Alerts</span>
          <span className="text-xs text-[#EA4335] font-semibold">14 Pending verification</span>
        </div>

        <div className="gdg-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#80868B] uppercase block">Missions Done</span>
          <span className="text-2xl font-black text-[#34A853] block my-1">814</span>
          <span className="text-xs text-[#34A853] font-semibold">+68 from yesterday</span>
        </div>

        <div className="gdg-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#80868B] uppercase block">Regional Avg AQI</span>
          <span className="text-2xl font-black text-[#FBBC05] block my-1">72 Moderate</span>
          <span className="text-xs text-[#5F6368]">Delhi NCR Eco Nodes</span>
        </div>

        <div className="gdg-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#80868B] uppercase block">Monitored Zones</span>
          <span className="text-2xl font-black text-[#202124] block my-1">5 Key Zones</span>
          <span className="text-xs text-[#5F6368]">42 live sensor nodes</span>
        </div>

        <div className="gdg-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#80868B] uppercase block">CSR Capital Pool</span>
          <span className="text-2xl font-black text-[#34A853] block my-1">₹42.5 Lakhs</span>
          <span className="text-xs text-[#5F6368]">6 Corporate sponsors</span>
        </div>

        <div className="gdg-card p-5 bg-white">
          <span className="text-[10px] font-bold text-[#80868B] uppercase block">Measured Impact</span>
          <span className="text-2xl font-black text-[#1967D2] block my-1">14.8 Tons CO₂</span>
          <span className="text-xs text-[#34A853] font-semibold">94.2% audit score</span>
        </div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* User & Mission Velocity */}
        <div className="lg:col-span-8 gdg-card p-6 bg-white space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#202124]">
                Citizen Engagement & Mission Velocity
              </h3>
              <span className="text-xs text-[#5F6368]">Weekly active player vs tasks trend</span>
            </div>
            <span className="text-xs font-bold text-[#34A853] flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +22% Growth
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorPlayers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4285F4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4285F4" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorMissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34A853" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#34A853" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F3F4" />
                <XAxis dataKey="name" stroke="#80868B" fontSize={11} />
                <YAxis stroke="#80868B" fontSize={11} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="players"
                  stroke="#4285F4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPlayers)"
                />
                <Area
                  type="monotone"
                  dataKey="missions"
                  stroke="#34A853"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorMissions)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reports By Zone Bar Chart */}
        <div className="lg:col-span-4 gdg-card p-6 bg-white space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#202124]">Pollution Alerts by Zone</h3>
            <span className="text-xs text-[#5F6368]">Report incidents frequency</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportsByZoneData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F3F4" />
                <XAxis dataKey="zone" stroke="#80868B" fontSize={10} />
                <YAxis stroke="#80868B" fontSize={10} />
                <Tooltip />
                <Bar dataKey="reports" fill="#EA4335" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
