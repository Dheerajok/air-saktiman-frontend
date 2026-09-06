'use client';

import React, { useState, useEffect } from 'react';
import { mockAirQuality } from '@/lib/mock-data';
import {
  Wind,
  Flame,
  Clock,
  TrendingUp,
  AlertTriangle,
  Info,
  Radio,
  Zap,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function AirQualityAdminPage() {
  const [secondsLeft, setSecondsLeft] = useState(1398); // ~23 mins 18 secs

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 1800));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `00:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const historicalAqi = [
    { time: '00:00', aqi: 62 },
    { time: '04:00', aqi: 74 },
    { time: '08:00', aqi: 118 },
    { time: '12:00', aqi: 82 },
    { time: '16:00', aqi: 94 },
    { time: '20:00', aqi: 148 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FEF0E6] text-[#C05621] text-xs font-bold border border-[#FED7BE]">
            Telemetry Monitoring & Hotspot Index
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124] mt-1">
            Regional Air Quality Telemetry
          </h1>
          <p className="text-xs text-[#5F6368] mt-0.5">
            Continuous environmental telemetry feeds across urban micro-climates.
          </p>
        </div>
      </div>

      {/* Main Grid: Gauge + Reverse Countdown Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Large Circular Gauge Card */}
        <div className="lg:col-span-6 gdg-card p-6 md:p-8 bg-white flex flex-col items-center justify-center text-center space-y-4">
          <span className="text-xs font-bold text-[#80868B] uppercase tracking-wider">
            CURRENT COMPOSITE AQI INDEX
          </span>

          <div className="relative my-4 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-8 border-[#FA7B17] bg-[#FEF0E6] flex flex-col items-center justify-center shadow-lg">
              <span className="text-6xl font-black text-[#C05621]">148</span>
              <span className="text-xs font-black text-[#C05621] uppercase mt-1">
                UNHEALTHY (SENSITIVE)
              </span>
            </div>
          </div>

          <p className="text-xs text-[#5F6368] max-w-sm">
            High particulate loading detected in Zone 02 & Zone 03. Public advisories active.
          </p>
        </div>

        {/* Reverse Timer Environmental Challenge Component */}
        <div className="lg:col-span-6 gdg-card p-6 md:p-8 bg-white flex flex-col justify-between space-y-6 border-2 border-[#FBBC05]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FEF7E0] text-[#B06000] text-xs font-bold">
                Time-Critical Action Window
              </span>
            </div>
            <h3 className="text-xl font-black text-[#202124]">
              PEAK POLLUTION MITIGATION WINDOW
            </h3>
            <p className="text-xs text-[#5F6368] mt-1 leading-relaxed">
              Atmospheric stagnation layer will intensify over the next 30 minutes. Community dust suppression and anti-idling tasks completed before window closes grant <strong>2x XP multipliers</strong>.
            </p>
          </div>

          {/* Large Countdown Clock */}
          <div className="p-6 rounded-3xl bg-[#FEF7E0] border border-[#FEEFC3] text-center">
            <span className="text-[10px] font-bold text-[#B06000] uppercase tracking-widest block mb-1">
              ZONE ACTION COUNTDOWN WINDOW
            </span>
            <div className="text-4xl sm:text-5xl font-mono font-black text-[#B06000] tracking-wider my-1">
              {formatTimer(secondsLeft)}
            </div>
            <span className="text-[11px] text-[#5F6368]">
              Automated sensor update & mission reset at window expiry
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-[#5F6368] pt-2 border-t border-[#F1F3F4]">
            <span className="font-semibold text-[#1967D2]">Active Bonus: +100 XP / Task</span>
            <span>142 Guardians responding</span>
          </div>
        </div>
      </div>

      {/* Historical AQI Trends Chart */}
      <div className="gdg-card p-6 bg-white space-y-4">
        <h3 className="text-sm font-bold text-[#202124]">24-Hour Regional AQI Curve</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalAqi}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F3F4" />
              <XAxis dataKey="time" stroke="#80868B" fontSize={11} />
              <YAxis stroke="#80868B" fontSize={11} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="aqi"
                stroke="#FA7B17"
                strokeWidth={3}
                dot={{ fill: '#FA7B17', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
