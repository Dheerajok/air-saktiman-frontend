'use client';

import React, { useState } from 'react';
import { mockZones } from '@/lib/mock-data';
import { ZoneDetail } from '@/types';
import {
  CloudSun,
  Wind,
  Droplets,
  Thermometer,
  Layers,
  MapPin,
  AlertTriangle,
  Radio,
} from 'lucide-react';

export default function WeatherMapsPage() {
  const [selectedZone, setSelectedZone] = useState<ZoneDetail>(mockZones[0]);
  const [activeLayer, setActiveLayer] = useState<'AQI' | 'TEMP' | 'WIND' | 'HOTSPOTS'>('AQI');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="gdg-card p-6 md:p-8 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#202124]">
            Environmental Weather & Micro-Zone Maps
          </h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Spatial monitoring across urban eco-zones with multi-layer overlays.
          </p>
        </div>

        {/* Layer Switcher Pills */}
        <div className="flex items-center gap-1 p-1 bg-[#F8FAFD] rounded-2xl border border-[#E8EAED]">
          {(['AQI', 'TEMP', 'WIND', 'HOTSPOTS'] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeLayer === layer
                  ? 'bg-white text-[#4285F4] shadow-xs border border-[#D2E3FC]'
                  : 'text-[#5F6368] hover:text-[#202124]'
              }`}
            >
              {layer} Layer
            </button>
          ))}
        </div>
      </div>

      {/* Map Interactive Canvas & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive SVG Zone Map */}
        <div className="lg:col-span-8 gdg-card p-6 bg-white relative min-h-[420px] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold mb-4">
            <span className="text-[#202124] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
              <span>Interactive Zone Telemetry Grid</span>
            </span>
            <span className="text-[#80868B]">Click any zone node to inspect</span>
          </div>

          {/* Map Vector Graphic representation */}
          <div className="relative w-full h-80 bg-[#F8FAFD] rounded-3xl border border-[#E8EAED] p-4 flex flex-wrap items-center justify-around gap-4 overflow-hidden">
            {mockZones.map((z, idx) => {
              const isSelected = selectedZone.id === z.id;
              const aqiBg =
                z.aqi <= 75
                  ? 'bg-[#E6F4EA] border-[#CEEAD6] text-[#137333]'
                  : z.aqi <= 120
                  ? 'bg-[#FEF7E0] border-[#FEEFC3] text-[#B06000]'
                  : 'bg-[#FCE8E6] border-[#FAD2CF] text-[#C5221F]';

              return (
                <div
                  key={z.id}
                  onClick={() => setSelectedZone(z)}
                  className={`cursor-pointer p-4 rounded-3xl border-2 transition-all duration-200 transform hover:scale-105 shadow-sm min-w-[140px] text-center ${
                    isSelected ? 'ring-4 ring-[#4285F4]/30 border-[#4285F4] bg-white' : aqiBg
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 text-[11px] font-bold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{z.name.split('-')[0]}</span>
                  </div>
                  <span className="text-2xl font-black block my-1">
                    {activeLayer === 'AQI' && z.aqi}
                    {activeLayer === 'TEMP' && `${z.temperature}°C`}
                    {activeLayer === 'WIND' && z.wind.split(' ')[0]}
                    {activeLayer === 'HOTSPOTS' && `${z.activeReports} Alerts`}
                  </span>
                  <span className="text-[10px] font-bold uppercase block">
                    {activeLayer === 'AQI' && z.pollutionLevel}
                    {activeLayer === 'TEMP' && `${z.humidity}% Humidity`}
                    {activeLayer === 'WIND' && z.wind}
                    {activeLayer === 'HOTSPOTS' && `${z.activeMissions} Active Quests`}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#5F6368] pt-3">
            <span>Layers: Real-time sensor interpolation</span>
            <span className="font-semibold">Selected: {selectedZone.name}</span>
          </div>
        </div>

        {/* Selected Zone Deep Dive Panel */}
        <div className="lg:col-span-4 gdg-card p-6 bg-white space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#80868B] uppercase">Zone Telemetry</span>
            <span className="px-2 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] font-bold text-[10px]">
              {selectedZone.status}
            </span>
          </div>

          <h3 className="text-lg font-bold text-[#202124]">{selectedZone.name}</h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-[#F8FAFD] rounded-2xl border border-[#E8EAED]">
              <span className="text-[10px] text-[#80868B] block font-semibold">AQI Index</span>
              <strong className="text-xl text-[#202124] block mt-0.5">{selectedZone.aqi}</strong>
              <span className="text-[10px] font-bold text-[#B06000]">{selectedZone.pollutionLevel}</span>
            </div>

            <div className="p-3 bg-[#F8FAFD] rounded-2xl border border-[#E8EAED]">
              <span className="text-[10px] text-[#80868B] block font-semibold">Ambient Temp</span>
              <strong className="text-xl text-[#202124] block mt-0.5">{selectedZone.temperature}°C</strong>
              <span className="text-[10px] text-[#5F6368]">{selectedZone.humidity}% Humidity</span>
            </div>

            <div className="p-3 bg-[#F8FAFD] rounded-2xl border border-[#E8EAED]">
              <span className="text-[10px] text-[#80868B] block font-semibold">Wind Vector</span>
              <strong className="text-xs text-[#202124] block mt-1">{selectedZone.wind}</strong>
            </div>

            <div className="p-3 bg-[#F8FAFD] rounded-2xl border border-[#E8EAED]">
              <span className="text-[10px] text-[#80868B] block font-semibold">Population</span>
              <strong className="text-xs text-[#202124] block mt-1">{selectedZone.population}</strong>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#E6F4EA] border border-[#CEEAD6] text-xs text-[#137333]">
            <strong>Active Citizen Response:</strong> {selectedZone.activeMissions} verified missions underway in this zone with {selectedZone.activeReports} pending municipal alerts.
          </div>
        </div>
      </div>
    </div>
  );
}
