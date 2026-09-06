'use client';

import React from 'react';
import { mockZones } from '@/lib/mock-data';
import { MapPin, Plus, Shield, Wind, Users } from 'lucide-react';

export default function AdminZonesPage() {
  return (
    <div className="space-y-6">
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124]">Environmental Zone Management</h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Configure geographic zones, sensor thresholds, and municipal dispatch hubs.
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs shadow-md">
          <Plus className="w-4 h-4" />
          <span>+ Create Eco Zone</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockZones.map((z) => (
          <div key={z.id} className="gdg-card p-6 bg-white space-y-4">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#5F6368]">{z.city}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] text-[10px]">
                {z.status}
              </span>
            </div>

            <h3 className="text-base font-bold text-[#202124]">{z.name}</h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-[#F8FAFD] rounded-xl">
                <span className="text-[10px] text-[#80868B] block">Current AQI</span>
                <strong className="text-[#202124]">{z.aqi} ({z.pollutionLevel})</strong>
              </div>
              <div className="p-2.5 bg-[#F8FAFD] rounded-xl">
                <span className="text-[10px] text-[#80868B] block">Population</span>
                <strong className="text-[#202124]">{z.population}</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#F1F3F4] text-xs">
              <span className="text-[#5F6368]">{z.activeReports} Active Alerts</span>
              <button className="text-xs font-bold text-[#4285F4] hover:underline">
                Edit Boundaries →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
